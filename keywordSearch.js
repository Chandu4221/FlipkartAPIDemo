var affiliate = require('flipkart-affiliate-client');
var fk = require('./fkdetails.js');
var client = affiliate.createClient({
  FkAffId: fk.id,
  FkAffToken: fk.token,
  responseType: fk.type
});

module.exports = function keywordSearchData(query,callback)
{
  var keywordSearchs = [];
client.keywordSearch({query: query}, function(err, results){
    if(err)
      return callback(err);
    else
    {
    	var jKeywordSearch = JSON.parse(results);
      var productInfoListSize = Object.keys(jKeywordSearch.productInfoList);
      for(var i=0;i<productInfoListSize.length;i++){
        var a = {
          title:jKeywordSearch.productInfoList[i].productBaseInfo.productAttributes.title,
          image:jKeywordSearch.productInfoList[i].productBaseInfo.productAttributes.imageUrls["200x200"],
          productUrl:jKeywordSearch.productInfoList[i].productBaseInfo.productAttributes.productUrl,
          flipkartSellingPrice:jKeywordSearch.productInfoList[i].productBaseInfo.productAttributes.sellingPrice.amount,
          maximumRetailPrice:jKeywordSearch.productInfoList[i].productBaseInfo.productAttributes.maximumRetailPrice.amount,
          productBrand:jKeywordSearch.productInfoList[i].productBaseInfo.productAttributes.productBrand,
          inStock:jKeywordSearch.productInfoList[i].productBaseInfo.productAttributes.inStock
        };
        keywordSearchs.push(a);
      }
      return callback(keywordSearchs);
    }
});
}