var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var utils = require('./utils.js');
var Sequelize = require('sequelize');
var config = require('./config.json');
var util = require('util');

var sequelize = new Sequelize(config.db.uri, {
    logging: function(str) {}
});

var Paste = sequelize.import(__dirname + "/models");
sequelize.sync();

function Fetcher() {
}

util.inherits(Fetcher, EventEmitter);

Fetcher.prototype.start = function() {
    var self = this;
    utils.fetchArchive()
          .then(function(result) {
                self.emit('archive.pasteid', result);
                _.each(result, function(item) {
                    Paste.count({
                        where: {
                            pastebin_id: item
                        }
                    })
                    .then(function(c) {
                        if( c < 1 ) {
                            utils.getAll(item, function(error, data) {
                                self.emit('new', data);
                            });
                        }
                    });
                });
          })
          .catch(function(error) {
                this.emit('error', error);
                console.log(error);
          });
};

module.exports = Fetcher;