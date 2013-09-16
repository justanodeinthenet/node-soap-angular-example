/* Search API */

/* dependencies */
var soap    = require('soap'),
    soapUrl = 'http://endpoint url';


module.exports = {
  search: function (req, res) {
    var args = {
      query: req.params.query
    };

    /* SOAP call example */
    // soap.createClient(soapUrl, function(err, client) {
    //   client.search(args, function(err, result) {
    //     /* do your stuff here */
    //   });
    // });
    res.json(200, {
      query: req.params.query,
      result: "Results related to " + req.params.query
    });
  }
};