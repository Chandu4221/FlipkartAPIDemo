var affiliate = require('flipkart-affiliate-client');
var fk = require('./fkdetails.js');
var client = affiliate.createClient({
  FkAffId: fk.id,
  FkAffToken: fk.token,
  responseType: fk.type
});

module.exports = function getDeals(callback){
	var Deals = [];
	client.getDealsOfDay(null,function(err, resp){
  	if(!err)
  	{
  		var jDeals = JSON.parse(resp);
  		var jDealsSize = Object.keys(jDeals.dotdList);
  		for(var i=0;i<jDealsSize.length;i++){
  			var a = {
  				title:jDeals.dotdList[i].title,
  				url:jDeals.dotdList[i].url,
  				imageUrl:jDeals.dotdList[i].imageUrls[i%4].url,
  			};
  			Deals.push(a);
  		}
    	return callback(Deals);
  	}
  	else
    	return callback(err);
});
}