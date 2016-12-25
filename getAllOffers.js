var affiliate = require('flipkart-affiliate-client');
var fk = require('./fkdetails.js');
var client = affiliate.createClient({
  FkAffId: fk.id,
  FkAffToken: fk.token,
  responseType: fk.type
});

module.exports = function getOffersData(callback){
  var offers = [];
	client.getAllOffers(null,function(err, resp){
  	if(!err)
  	{
      var offersData = JSON.parse(resp);
    	return callback(offersData);
  	}
  	else
    	return callback(err);
});
}