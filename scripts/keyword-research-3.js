// MAIN SCRIPT FOR KEYWORD RESEARCH TOOL
// LAST UPDATED: 20-01-23

//global variables
var status;

// expand additional keyword section
async function getVal () {

  // status reset
  status = "OK";

  // form input values only
  let keyword = document.getElementById("keyword-inpput").value;
  let location = document.getElementById("location-input").value;
  let language = document.getElementById("language-input").value;

  // show loading animation
  var loading = document.getElementById("loading");
  loading.classList.add("show");
  
  /*// SEO API Fetch
  const getSEOData = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live",
    "method": "POST",
    "redirect": "follow",
    "headers": {
      //"Access-Control-Allow-Headers": "POST, GET, PUT, DELETE, OPTIONS, HEAD, authorization",
      "Authorization": "Basic ZGFuLmJyaW5jYXQwN0BnbWFpbC5jb206YTY5MzI2YzNmODRjNjEzZA==",
      "Content-Type": "application/json"
    },
   "body": {
      "keywords": "used books",
      "language_name": "English",
      "location_name": "London,England,United Kingdom",
      "search_partners": "false",
      "date_from": "2022-01-01",
      "date_to": "2022-12-31",
      "search_by": "search_volume"
   },
  };*/

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Basic ZGFuLmJyaW5jYXQwN0BnbWFpbC5jb206YTY5MzI2YzNmODRjNjEzZA==");

  var raw = JSON.stringify([
    {
      "language_code": "en",
      "location_code": 2840,
      "keywords": [
        "buy laptop",
        "cheap laptops for sale",
        "purchase laptop"
      ],
      "date_from": "2021-08-01"
    }
  ]);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  // SEO API Resulting Data Variables
  $.ajax(getSEOData).done(response => {
    const data = response;
    console.log(response);
    //pageTitle = data.title;
  })
  .catch(err => {
    console.error(err);
    status = "ERROR";
  })

  /*// Word Count API Fetch
  .then(getWordCountAPI => {
    let wordCountUrl = `https://text-extract7.p.rapidapi.com/?url=${urlReview}`;
    return fetch(wordCountUrl, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "text-extract7.p.rapidapi.com",
          "x-rapidapi-key": "a457a55158mshc65a31831200484p17de4cjsna2c4192c7641"
        }
      })
    .then(response => {
      console.log(response);
      var apiStatus = response.status;
      console.log(apiStatus);
      if (apiStatus !== 200) {
        status = "ERROR";
      };
      return response.json();
    })
    .then (data => {
      //console.log(data);
      pageContents = data['raw-text'];
      totalwordCount = data['word-count'];
    })
    .catch(err => {
      console.error(err);
      status = "ERROR";
    });
  })*/

  /*// Image Data API Fetch
  .then (getImageMetaAPI => {
    const imageData = {
      "async": true,
      "crossDomain": true,
      "url": "https://seo-image.p.rapidapi.com/",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "x-rapidapi-host": "seo-image.p.rapidapi.com",
        "x-rapidapi-key": "a457a55158mshc65a31831200484p17de4cjsna2c4192c7641"
      },
      "data": {
        "url": urlReview
      }
    };

    return $.ajax(imageData).done(response => {
      console.log(response.images);
      pageImages = JSON.stringify(response.images);
      imageObj = JSON.parse(pageImages);
      console.log(imageObj);
      imageCount = Object.keys(imageObj).length;
      console.log(Object.keys(imageObj));
    })
    .catch(err => {
      console.error(err);
      status = "ERROR";
    });
  })*/

  .then (getResults => {

    // hide loading animation function
    loading.classList.remove("show");

    // in case of pre-api call area
    var apiData = document.getElementById("api-info");
    apiData.innerHTML = "";

    // in case of pre-results area
    var results = document.getElementById("improv-section");
    var resultItems = document.getElementById("improv-items");
    resultItems.innerHTML = "";

    // status check
    if (status  == "ERROR") {
      apiData.classList.add("show");
      results.classList.remove("show");
      apiData.insertAdjacentHTML("beforeend", "<p><span>ERROR - PAGE NOT FOUND!</span></p>");
    } else {

    // show results section
    if (primaryKeyword!=="" && urlReview!=="") {
      results.classList.add("show");
      document.getElementById("api-info").classList.add("show");
      document.getElementById("improv-section").scrollIntoView();  
    }

  }})

};



