$(document).ready(function(){
	if(document.title == "Categories")
	{
		$("#CategoryFeeds").addClass("active");
		console.log("#CategoryFeeds");
	}
	else if(document.title == "Deals of the Day")
	{
		$("#TodaysDeals").addClass("active");
	}
	else
	{
		$("#CategoryFeeds").removeClass("active");
		$("#TodaysDeals").removeClass("active");
	}
});