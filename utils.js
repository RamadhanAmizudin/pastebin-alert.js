var _ = require('lodash');
var request = require('request');
var config = require('./config.json');
var PastebinAPI = require('pastebin-js');
var pastebin = new PastebinAPI(config.pastebin);
var Q = require('q');

var self = module.exports = {
    fetchArchive: function () {
        var deferred = Q.defer();
        request('http://pastebin.com/archive', function(error, response, body) {
            if(error) {
                deferred.reject(new Error(error));
            }

            var status = response.statusCode;
            if (status === 404) {
                deferred.reject(new Error('Error 404, paste not found!'));
            }

            if (status !== 200) {
                deferred.reject(new Error('Unknown error, status: ' + status));
            }

            if (body.length === 0) {
                deferred.reject(new Error('Empty response'));
            }

            if (body.indexOf('Blocked') !== -1) {
                deferred.reject(new Error("Blocked by PasteBin"));
            }

            var r = /class="i_p0" alt="" border="0" \/><a href="(.*)">(.*)<\/a>/gi;
            var matches = [];
            while( match = r.exec(body) ) {
                matches.push(
                    _.trim(match[1], '/')
                );
            }
            matches = _.uniq(matches).reverse();
            deferred.resolve(matches);
        });

        return deferred.promise;
    },

    fetchMeta: function (pastebin_id) {
        var deferred = Q.defer();
        request('http://pastebin.com/' + pastebin_id, function(error, response, body) {

            if(error) {
                deferred.reject(new Error(error));
            }

            var status = response.statusCode;
            if (status === 404) {
                deferred.reject(new Error('Error 404, paste not found!'));
            }

            if (status !== 200) {
                deferred.reject(new Error('Unknown error, status: ' + status));
            }

            if (body.length === 0) {
                deferred.reject(new Error('Empty response'));
            }

            if (body.indexOf('Blocked') !== -1) {
                deferred.reject(new Error("Blocked by PasteBin"));
            }

            var metadata = {};
            metadata.pastebin_id = pastebin_id;
            metadata.title = /class="paste_box_line1" title="(.*)">/i.exec(body)[1];
            metadata.created = /on <span title="(.*?)"/i.exec(body)[1];
            var r = /By: (a guest|<a href="(.*?)">(.*?)<\/a>)/.exec(body);
            metadata.author = (typeof r[3] == 'undefined') ? 'guest' : r[3];
            metadata.ispro_account = /<a href="\/pro" title="PRO User!">/i.test(body);
            metadata.size = /size: (.*?) &nbsp;/i.exec(body)[1];
            metadata.expires = /expires: (.*?)<\/div>/i.exec(body)[1];
            metadata.syntax = /syntax: <a href="(.*?)">(.*?)<\/a> &nbsp;/i.exec(body)[2];
            deferred.resolve(metadata);
        });

        return deferred.promise;
    },

    getPaste: function(pastebin_id, cb) {
        pastebin.getPaste(pastebin_id)
                      .then(function(data) {
                        cb(null, data);
                      })
                      .fail(cb);
    },

    getAll: function(pastebin_id, cb) {
        self.getPaste(pastebin_id, function(error, data) {
            if(error) {
                cb(error);
            } else {
                self.fetchMeta(pastebin_id)
                     .then(function(metadata) {
                        metadata.content = data;
                        cb(null, metadata);
                     }).catch(cb);
            }
        });
    }
};
