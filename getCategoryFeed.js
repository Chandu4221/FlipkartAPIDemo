var affiliate = require('flipkart-affiliate-client');
var fk = require('./fkdetails.js');
var client = affiliate.createClient({
  FkAffId: fk.id,
  FkAffToken: fk.token,
  responseType: fk.type
});

module.exports = function getCategoryFeedData(callback)
{
client.getCategoryFeed({trackingId:fk.id},function(err,result){
  if(!err)
    return callback(result);
  else
    return callback(err);
});
}