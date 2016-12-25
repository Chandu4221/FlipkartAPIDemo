var affiliate = require('flipkart-affiliate-client');
var fk = require('./fkdetails.js');
var client = affiliate.createClient({
  FkAffId: fk.id,
  FkAffToken: fk.token,
  responseType: fk.type
});

module.exports = function getOffersData(callback){
	client.getAllOffers(null,function(err, resp){
  	if(!err)
  	{
    	return callback(resp);
  	}
  	else
    	return callback(err);
});
}