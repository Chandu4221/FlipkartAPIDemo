var affiliate = require('flipkart-affiliate-client');
var fk = require('./fkdetails.js');
var client = affiliate.createClient({
  FkAffId: fk.id,
  FkAffToken: fk.token,
  responseType: fk.type
});

module.exports = function keywordSearch(query,callback)
{
client.keywordSearch({query: query,resultCount: "1"}, function(err, results){
    if(err)
      return callback(err);
    else
      return callback(results);
});
}