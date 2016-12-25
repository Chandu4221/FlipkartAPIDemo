var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var getCategories = require('../getCategoryFeed.js');
var getProducts = require('../getProductsFeed.js');
var keywordSearch = require('../keywordSearch.js');
/*var getAllOffers = require('../getAllOffers');*/


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
		res.render("categories",{title:"Categories",categories:categories});
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
					res.render("products",{title:req.params.id,products:data});
				}
			});
		}
	}
});
/*
router.get('/products/alloffers',function(req,res){
	getAllOffers(function(offers)
	{
		res.send("offers");
		console.log(offers);
	});
});
*/

router.post('/products/search',function(req,res){
	keywordSearch(req.body.keyword,function(searchResult)
	{
		res.render("products",{title:req.body.keyword,products:searchResult});
	});
});

module.exports = router;
