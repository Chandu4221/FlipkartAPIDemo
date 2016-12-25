var affiliate = require('flipkart-affiliate-client');
var fk = require('./fkdetails.js');
var client = affiliate.createClient({
  FkAffId: fk.id,
  FkAffToken: fk.token,
  responseType: fk.type
});

module.exports = function getProducts(data,callback){

  var products = [];

	client.getProductsFeed({url: data},function(err, result){
      if(!err)
      {
        var jProductFeed = JSON.parse(result);
        var productInfoListSize = Object.keys(jProductFeed.productInfoList);
        for(var i=0;i<productInfoListSize.length;i++){
          var a = {
              title:jProductFeed.productInfoList[i].productBaseInfoV1.title,
              image:jProductFeed.productInfoList[i].productBaseInfoV1.imageUrls["200x200"],
              description:jProductFeed.productInfoList[i].productBaseInfoV1.productDescription,
              productUrl:jProductFeed.productInfoList[i].productBaseInfoV1.productUrl,
              flipkartSellingPrice:jProductFeed.productInfoList[i].productBaseInfoV1.flipkartSellingPrice.amount,
              maximumRetailPrice:jProductFeed.productInfoList[i].productBaseInfoV1.maximumRetailPrice.amount,
              productBrand:jProductFeed.productInfoList[i].productBaseInfoV1.productBrand,
              inStock:jProductFeed.productInfoList[i].productBaseInfoV1.inStock
            };
          products.push(a);
        }
        return callback(products);
      }
      else
        return callback(err);
  });


};

