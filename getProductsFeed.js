var affiliate = require('flipkart-affiliate-client');
var fk = require('./fkdetails.js');
var client = affiliate.createClient({
  FkAffId: fk.id,
  FkAffToken: fk.token,
  responseType: fk.type
});

module.exports = function getProducts(data,callback){
	client.getProductsFeed({url: data},function(err, result){
      if(!err)
      {
        return callback(result);
      }
      else
        return callback(err);
  });
};

