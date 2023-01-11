// MAIN SCRIPT FOR KEYWORD RESEARCH TOOL
// LAST UPDATED: 21-01-22

// global variables

async function getVal () {
	/*
    // status reset
    var status = "OK";

    // form input values only
    let keywordInput = document.getElementById("keyword-input").value;

    // show loading animation
    var loading = document.getElementById("loading");
    loading.classList.add("show");

    // keyword api fetch
    var fetchUrl = `https://twinword-keyword-suggestion-v1.p.rapidapi.com/suggest/?phrase=${keywordInput}`;
    return fetch(fetchUrl, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "twinword-keyword-suggestion-v1.p.rapidapi.com",
			"x-rapidapi-key": "a457a55158mshc65a31831200484p17de4cjsna2c4192c7641"
		}
	})
	.then(response => {
		//console.log(response);
		var apiStatus = response.status;
		if (apiStatus !== 200) {
        var status = "ERROR";
      };
      return response.json();
    })
    .then (data => {
      console.log(data.keywords);
    })
	.catch(err => {
		console.error(err);
		var status = "ERROR";
	})

	.then (getResults => {

		// hide loading animation function
    	loading.classList.remove("show");

	});*/

	//test api
	/*const api_url = "https://seo-tool-mule.com/scripts/example.JSON";
	const response = await fetch(api_url);
	const data = await response.json();
	console.log(data.keywords);*/

	// test api
	const api_url =
		{ 
			"keywords":
			 {
			 	"test": {similarity: "0.5151567408317742", search_volume: "10", cpc: "1.228663", paid_competition: "0.6031746031746"},
				"2 nd hand books": {similarity: "0.5151567408317742", search_volume: "10", cpc: "1.228663", paid_competition: "0.6031746031746"},
				"2nd hand books": {similarity: "0.5151567408317742", search_volume: "880", cpc: "1.077432", paid_competition: "0.57614138438881"},
				"2nd hand books for sale": {similarity: "0.41212539266541937", search_volume: "10", cpc: "1.58172", paid_competition: "1"},
				"2nd hand books online": {similarity: "0.5151567408317742", search_volume: "50", cpc: "1.243352", paid_competition: "0.91948051948052"},
				"2nd hand bookstore near me": {similarity: "0.02549409114749914", search_volume: "720", cpc: "1.219367", paid_competition: "0.13864927414265"},
				"2nd hand manga": {similarity: "0.020208987775698958", search_volume: "10", cpc: "0.18495", paid_competition: "0.88571428571429"}
			}

		};

		var myBooks = [
            {
                "Book ID": "1",
                "Book Name": "Computer Architecture",
                "Category": "Computers",
                "Price": "125.60"
            },
            {
                "Book ID": "2",
                "Book Name": "Asp.Net 4 Blue Book",
                "Category": "Programming",
                "Price": "56.00"
            },
            {
                "Book ID": "3",
                "Book Name": "Popular Science",
                "Category": "Science",
                "Price": "210.40"
            }
        ]

	// from code bushi video
	const results = api_url.keywords;
	(result => {
		//return `<tr><td></td><td>${result.similarity}</td><td>${result.search_volume}</td><td>${result.cpc}</td><td>${result.paid_competion}</td></tr>`;
		//return `<p>${result.similarity}</p>`;

		// test area
		//console.log(results);
		var similarity = JSON.stringify(result.similarity);
		var searchVolume = JSON.stringify(result.search_volume);
		document.getElementById("test-area").innerHTML = results + similarity + "," + searchVolume;

	});
	//.join("");
	//console.log(results);

	// print results
	const table_print = document.getElementById("results-area");
	table_print.insertAdjacentHTML("beforeend", results);


	// test 2
	var stringTest = JSON.stringify(api_url);
	//var test2 = JSON.parse(api_url);
	//var test3 = JSON.map(api_url);
	console.log(stringTest);
	//console.log(test2);
	//console.log(test3);
	//console.log(test);
    //myTest = JSON.parse(test.cpc);
    //console.log(myTest);
    //obj = Object.keys(myTest).length;
    //console.log(obj);
    console.log("testing...1...2...");

	function getResults (item) {
		return [item.keywords];
	};

	function template(result) {
		return `
		<p>${result.similarity}</p>
		`
	};

	var cpcResults = JSON.stringify(api_url.keywords.cpc);
	document.getElementById("test-area-two").innerHTML = results + "," + results.test + results.cpc + "," + results.similarity + "," + cpcResults;
	console.log("final tests...");
	console.log(api_url);
	console.log(api_url.keywords);
	console.log(api_url.test);
	console.log(api_url.cpc);
	//console.log(stringTest.test);
	//const myObj = JSON.parse(api_url);
	//console.log(myObj.cpc);

	console.log("keep going...");
	let reports = Object.values(api_url.keywords);
	console.log(reports);
	let keyInfo = Object.keys(api_url.keywords);
	console.log("Keywords: " + keyInfo);
	let similarity = reports.map(obj => parseFloat(obj.similarity).toFixed(2));
	console.log("Similarity: " + similarity);
	let comp = reports.map(obj => parseFloat(obj.paid_competition).toFixed(2));
	console.log("Competition: " + comp);
	let searchVol = reports.map(obj => obj.search_volume);
	console.log("Search Volume: " + searchVol);
	let cpc = reports.map(obj => parseFloat(obj.cpc).toFixed(2));
	console.log("CPC: " + cpc);

	document.getElementById("results-area").innerHTML = `<tr><td>${keyInfo}</td><td>${similarity}</td><td>${searchVol}</td><td>${cpc}</td><td>${comp}</td></tr>`;

	//document.getElementById("test-area-two").innerHTML = `${api_url.map(template).join(" ")}`

	console.log("table test");
	 // EXTRACT VALUE FOR HTML HEADER.
	var api_keywords = myBooks; 
	// ('Book ID', 'Book Name', 'Category' and 'Price')
	var col = [];
	for (var i = 0; i < api_keywords.length; i++) {
	    for (var key in api_keywords[i]) {
	        if (col.indexOf(key) === -1) {
	            col.push(key);
	        }
	    }
	};

	 // CREATE DYNAMIC TABLE.
	var table = document.createElement("table");

	// CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

	var tr = table.insertRow(-1);                   // TABLE ROW.

	for (var i = 0; i < col.length; i++) {
	    var th = document.createElement("th");      // TABLE HEADER.
	    th.innerHTML = col[i];
	    tr.appendChild(th);
	};

	// ADD JSON DATA TO THE TABLE AS ROWS.
	for (var i = 0; i < api_keywords.length; i++) {

	    tr = table.insertRow(-1);

	    for (var j = 0; j < col.length; j++) {
	        var tabCell = tr.insertCell(-1);
	        tabCell.innerHTML = api_keywords[i][col[j]];
		};

	// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
	var divContainer = document.getElementById("showData");
	divContainer.innerHTML = "";
	divContainer.appendChild(table);

	};
	console.log("test over?");

};