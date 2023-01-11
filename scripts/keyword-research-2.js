// MAIN SCRIPT FOR KEYWORD RESEARCH TOOL
// LAST UPDATED: 21-01-22

// global variables

async function getVal () {
	
    // status reset
    var status = "OK";

    // form input values only
    let keywordInput = document.getElementById("keyword-input").value;

    // show loading animation
    var loading = document.getElementById("loading");
    loading.classList.add("show");


	/*const getTrends = {
	  method: 'POST',
	  url: 'https://api.dataforseo.com/v3/serp/google/organic/task_post',
	  data: {
	  	//keywords: ["weather forecast"],
	  	"language_code": "en",
	  	"location_code": 2840,
	  	"keyword": "albert einstein",
	  	"target": "wikipedia.org"
	  },
	  headers: {
	    'content-type': 'application/json',
	    Authorization: 'Basic ZGFuLmJyaW5jYXQwN0BnbWFpbC5jb206YTY5MzI2YzNmODRjNjEzZA=='
	  }
	};

	// SEO API Resulting Data Variables
	$.ajax(getTrends).done(response => {
	const data = response;
	console.log(response);
	})*/

	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://dataforseo-search-volume1.p.rapidapi.com/v3/keywords_data/google/search_volume/live",
		"method": "POST",
		"headers": {
			"content-type": "application/json",
			"authorization": "Basic ZGFuLmJyaW5jYXQwN0BnbWFpbC5jb206YTY5MzI2YzNmODRjNjEzZA==",
			"x-rapidapi-host": "dataforseo-search-volume1.p.rapidapi.com",
			"x-rapidapi-key": "a457a55158mshc65a31831200484p17de4cjsna2c4192c7641"
		},
		"processData": false,
		"data": [
			{
				"keywords": [
					"average page rpm adsense",
					"adsense blank ads how long",
					"leads and prospects"
				],
				"language_name": "English",
				"location_name": "United States",
				"search_partners": true,
				"sort_by": "search_volume"
			}
		]
	};

	$.ajax(settings).done(function (response) {
		console.log(response);
	})


	.then (getResults => {

		// hide loading animation function
    	loading.classList.remove("show");
    	console.log("Complete Success!");

	});

};