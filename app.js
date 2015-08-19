var _ = require('lodash');
var Sequelize = require('sequelize');
var config = require('./config.json');
var utils = require('./utils');
var Fetcher = require('./fetcher');
var fetch = new Fetcher();

process.on('uncaughtException', function(err) {
  console.log('[Error] ' + err);
});

var sequelize = new Sequelize(config.db.uri, {
    logging: function(str) {
        // console.log(str);
    }
});

var Paste = sequelize.import(__dirname + "/models");

console.log('[Status] Synchronizing Database..');

sequelize.sync()
              .then(function() {
                   console.log('[Status] Done Synchronizing Database.');
              })
              .catch(function(error) {
                   console.log('[Error] Error Synchronizing Database. ' + error);
              });

fetch.on('error', function(data) {
  console.log('[Error] ' + data);
});

fetch.on('archive.pasteid', function(data) {

});

fetch.on('new', function(data) {
    Paste.create(data);
    _.each(config.keywords, function(keyword) {
        if(data.content.indexOf(keyword) > -1) {
            console.log("[Keyword Found] Keyword '" + keyword + "' found on pastebin content: http://pastebin.com/" + data.pastebin_id);
        }
    });
});

fetch.start();
setInterval(fetch.start, config.delay);
