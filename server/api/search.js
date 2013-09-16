/*
  * Search API
  *
*/

var _       = require('underscore'),
    soap    = require('soap'),
    soapUrl = 'http://endpoint url';


module.exports = {
  byQuery: function (req, res) {
    var args = {
      query: req.param.query
    };

    // soap.createClient(soapUrl, function(err, client) {
    //   client.search(args, function(err, result) {
    //     /* do your stuff here */
    //   });
    // });
  }
};