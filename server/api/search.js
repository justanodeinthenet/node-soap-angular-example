/* Search API */

/* dependencies */
var soap    = require('soap'),
    soapUrl = 'http://endpoint url';


module.exports = {
  search: function (req, res) {
    /* SOAP call example */
    // var args = {
    //   query: req.params.query
    // };
    // soap.createClient(soapUrl, function(err, client) {
    //   client.search(args, function(err, result) {
    //     /* do your stuff here */
    //   });
    // });
    
    var results = ['Bacon ipsum ' + req.params.query + ' swine shoulder turducken tenderloin pork loin capicola venison.', 'Swine cow boudin, beef ribs, ' + req.params.query + ' loin shoulder ham hock short loin jowl.', 'Kevin boudin pancetta, jowl ' + req.params.query + ' pig meatball ball tip filet mignon andouille bacon jerky pork belly.'];
    res.json(200, {
      results: results
    });
  }
};