var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var getCategories = require('../getCategoryFeed.js');
var getProducts = require('../getProductsFeed.js');
var url = "https://affiliate-api.flipkart.net/affiliate/1.0/feeds/krishnacc/category/tyy-n0e.json?expiresAt=1482524098510&sig=e8aaf87a779e953e8413a8fb93b92a52";


var categories = [];
var products = [];


	getCategories(function(data){
		var jsonCategories = JSON.parse(data);
   		var categoriesList = Object.keys(jsonCategories.apiGroups.affiliate.apiListings);
      	for(var i=0;i<categoriesList.length;i++){
    		var a = {
    			resourceName:jsonCategories.apiGroups.affiliate.apiListings[categoriesList[i]].availableVariants["v1.1.0"].resourceName,
    			get:jsonCategories.apiGroups.affiliate.apiListings[categoriesList[i]].availableVariants["v1.1.0"].get,
    			deltaGet:jsonCategories.apiGroups.affiliate.apiListings[categoriesList[i]].availableVariants["v1.1.0"].deltaGet
    		  };
          categories.push(a);
      }
	});

router.get('/',function(req,res){
		res.render("categories",{categories:categories});
});

router.get('/products/:id',function(req,res){
	for(i=0;i<categories.length;i++)
	{
		if(categories[i].resourceName === req.params.id)
		{
			getProducts(categories[i].get,function(data){
				if(!data)
					res.sendStatus(404);
				else
				{
					rawData = JSON.parse(data);
					res.render("products",{products:rawData});
					//res.send(rawData);
				}
			});
		}
	}
});
module.exports = router;
