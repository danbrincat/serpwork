// MAIN SCRIPT FOR COPY/PASTE SEO PAGE GRADER
// LAST UPDATED: 13-09-21


// expand additional keyword section
function sectionSpan() {
  var spanElement = document.getElementById("second-keyword-section");
  spanElement.classList.add("open");
  var addKeywordButton = document.getElementById("add-keyword-button");
  addKeywordButton.classList.add("hide");
};


// SEO analyser, rules and scoring
function getInputValue(){

  // Selecting the input elements and get its values 
  let primaryKeyword = document.getElementById("primary-keyword").value;
  let secondaryKeyword = document.getElementById("secondary-keyword").value;
  let pageTitle = document.getElementById("page-title").value;
  let metaDescription = document.getElementById("meta-description").value;
  let pageUrl = document.getElementById("page-url").value;
  let pageContents = document.getElementById("page-content").value;

  // in case of pre-results area
  var resultItems = document.getElementById("improv-items");
  resultItems.innerHTML = "";

  // show results section
  var results = document.getElementById("improv-section");
  if (primaryKeyword!=="" && pageTitle!=="" && pageUrl!=="" && pageContents!=="") {
    results.classList.add("show");
    document.getElementById("improv-section").scrollIntoView();  
  }
  //results.classList.add("show");


  // Show url above results
 // document.getElementById("page-url-display").innerHTML = pageUrl;


  /* --------------------- OPERATIONS --------------------------------- */

  // Character count of page title
  var titleLen = document.getElementById("page-title").value.length;

  // Keyword count page title
  var regEscape = v => v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  var titleCount = (pageTitle.split(new RegExp(regEscape(primaryKeyword), "ig"))).length-1;

  //keyword at front of title
  var titleKeywordFront = new RegExp('^' + primaryKeyword, "ig").test(pageTitle);

  // keyword count page body
  var contentCount = (pageContents.split(new RegExp(regEscape(primaryKeyword), "ig"))).length-1;

  // h1 count
  var h1Count = (pageContents.split(new RegExp(`<h1`,"ig"))).length-1;

  // keyword in heading
  var h1Heading = (pageContents.split(new RegExp('<h1.*'+primaryKeyword+'.*</h1>', "ig"))).length-1;

  // image count
  var imageCount = (pageContents.split(new RegExp('<img',"ig"))).length-1;

  //images with alt
  var altCount = (pageContents.split(new RegExp(/<img(.*)alt="([^" ]\w*)/gi))).length-1;

  //image alts with keyword
  var altKeywordCount = (pageContents.split(new RegExp('alt=.*'+primaryKeyword, "gi"))).length-1;

  // page domain
  var domain = (new URL(pageUrl)).hostname;

   /*// page slug
  var pageSlug = (pageUrl.split(new RegExp(/(?<=  (copy domain extensions here)   )(.*)/i)));
  document.getElementById("page-slug-display").innerText = pageSlug; */

  // https check
  var httpsCheck = new RegExp('^' + 'https://').test(pageUrl);

  // url directory check
  var directoryCount = (pageUrl.split(new RegExp(/\//ig))).length-1;

  // keyword with -
  var keywordDash = primaryKeyword.replace(/\s/g, '-');

  // url keyword check
  var urlKeyword = new RegExp(regEscape(keywordDash), "ig").test(pageUrl);

  // content check any links
  var anyLinks = (pageContents.split(new RegExp(/<a href=/gi))).length-1;

  // keyword count meta description
  var metaKeyword = (metaDescription.split(new RegExp(primaryKeyword, "ig"))).length-1;

  // meta description length
  var metaLen = document.getElementById("meta-description").value.length;

  // h2/3/4/5/6 headings conatin keyword
  var headingsKeyword = (pageContents.split(new RegExp('<h[2-6].*>.*'+primaryKeyword+'.*</h[2-6]>', "ig"))).length-1;

  // total word count
  var totalwordCount = (pageContents.split(" ")).length;


  /* --------------------- TEST SCORES --------------------------------- */

  // [Rule 1] Keyword in Title
  let ruleOne = [0];
  if (titleCount > 0) {
    ruleOne = 6.66666666;
    var ruleOneStatus = true;
  } else {
    resultItems.insertAdjacentHTML("beforeend", "<div class=\"improv-item\"><p class=\"improv-title\">Missing keyword in page title</p><p class=\"improv-main\">Insert your keyword at least once into your title to help both search engines and users know what your page is about.</p><img src=\"/images/page-title-demo.png\" class=\"improv-img\"/></div>");
    var ruleOneStatus = false;
  };

  // [Rule 2] Keyword at start of title
  let ruleTwo = [0];
  if (titleKeywordFront === true) {
    ruleTwo = 6.66666666;
  } else if (ruleOneStatus === true) {
    resultItems.insertAdjacentHTML("beforeend","<div class=\"improv-item\"><p class=\"improv-title\">Keyword not featured at front of page title</p><p class=\"improv-main\">Putting your primary keyword at the front of the page title increases it's chances of visability by the user, and not being cut-off display within the browser.</p><img src=\"/images/page-title-front-demo.png\" class=\"improv-img\"/></div>");
  };

  // [Rule 3] One  <H1> Tag
  let ruleThree = [0];
  if (h1Count === 1) {
    ruleThree = 6.66666666;
    var ruleThreeStatus = true;
  } else if (h1Count === 0) {
    resultItems.insertAdjacentHTML("beforeend","<div class=\"improv-item\"><p class=\"improv-title\">Need one &lt;H1&gt; tag per page</p><p class=\"improv-main\">You should have only one set of &lt;h1&gt;...&lt;/h1&gt; tags per page. Add necessary &lt;h1&gt; tags where needed, and remember to keep your &lt;h1&gt; tag as near to the top of the page content as poosible.</p><img src=\"/images/h1-demo-3.png\" class=\"improv-img\"/></div>");
    var ruleThreeStatus = false;
  } else if (h1Count > 1) {
    resultItems.insertAdjacentHTML("beforeend","<div class=\"improv-item\"><p class=\"improv-title\">Only one &lt;H1&gt; tag per page</p><p class=\"improv-main\">You should have only one set of &lt;h1&gt;...&lt;/h1&gt; tags per page. Remove unnecessary &lt;h1&gt; tags and replace them with &lt;h2&gt;,&lt;h3&gt; or &lt;h4&gt; where needed. Remember to keep your &lt;h1&gt; tag as near to the top of the page content as poosible.</p><img src=\"/images/h1-demo-3.png\" class=\"improv-img\"/></div>");
    var ruleThreeStatus = true;
  };

  // [Rule 4] Keyword in  <h1>
  let ruleFour = [0];
  if (h1Heading > 0) {
    ruleFour = 6.66666666;
  } else if (ruleThreeStatus === true) {
    resultItems.insertAdjacentHTML("beforeend","<div class=\"improv-item\"><p class=\"improv-title\">Keyword missing from &lt;H1&gt; heading</p><p class=\"improv-main\">To help search engines and users recognize what your page is about, your primary keyword <strong>'" + primaryKeyword + "'</strong> should be included within your &lt;h1&gt; heading.</p><img src=\"/images/keyword-heading-demo.png\" class=\"improv-img\"/></div>");
  };

  // [Rule 5] images in body
  let ruleFive = [0];
  if (imageCount > 0) {
    ruleFive = 6.66666666;
    var ruleFiveStatus = true;
  } else {
    resultItems.insertAdjacentHTML("beforeend","<div class=\"improv-item\"><p class=\"improv-title\">Are there any images within the page content?</p><p class=\"improv-main\">Images within the page content help make your content look attractive and inviting to the user. High quality images can also help improve user trust and satisfaction, keeping them longer on your page and site.</p><img src=\"/images/image-demo.png\" class=\"improv-img\"/></div>");
    var ruleFiveStatus = false;
  };

  // [Rule 6] image alt tags
  let ruleSix = [0];
  if (altCount > 0) {
    ruleSix = 6.66666666;
    var ruleSixStatus = true;
  } else if (ruleFiveStatus === true) {
    resultItems.insertAdjacentHTML("beforeend","<div class=\"improv-item\"><p class=\"improv-title\">Do the images have relevant alt tags?</p><p class=\"improv-main\">Adding alt tags can help search engines identify the images on your page and how they relate to the rest of the content. Also, if an image fails to load for a user, alt text helps inform the user what image should be displaying.</p><img src=\"/images/image-alt-demo-2.png\" class=\"improv-img\"/></div>");
    var ruleSixStatus = false;
  };

  // [Rule 7] keyword in alt tags
  let ruleSeven = [0];
  if (altKeywordCount > 0) {
    ruleSeven = 6.66666666;
  } else if (ruleSixStatus === true) {
    resultItems.insertAdjacentHTML("beforeend","<div class=\"improv-item\"><p class=\"improv-title\">Primary keyword not in alt text</p><p class=\"improv-main\">Having your primary keyword within image alt text on the page, helps further identify your page as relevant to that keyword.</p><img src=\"/images/image-alt-demo-2.png\" class=\"improv-img\"/></div>");
  };

  // [Rule 8] page url contains keyword
  let ruleEight = [0];
  if (urlKeyword === true) {
    ruleEight = 6.66666666;
  } else {
    resultItems.insertAdjacentHTML("beforeend","<div class=\"improv-item\"><p class=\"improv-title\">Keyword not in page URL</p><p class=\"improv-main\">Make sure you primary keyword is contained within the page url slug.</p><img src=\"/images/url-demo.png\" class=\"improv-img\"/></div>");
  };

  // [Rule 9] url length
  let ruleNine = [0];
  if (directoryCount > 1 && directoryCount < 6) {
    ruleNine = 6.66666666;
  } else {
    resultItems.insertAdjacentHTML("beforeend","<div class=\"improv-item\"><p class=\"improv-title\">Your page is located quite far from your root domain</p><p class=\"improv-main\">Search engines can identify the importance of a page based on how close it sits to the root domain. (e.g. domain.com\/). If this is an important page you want to rank highly organically, think of placing under a directory closer to the site root.</p><img src=\"/images/url-root-demo.png\" class=\"improv-img\"/></div>");
  };

  // [Rule 10] Meta Description Length
  let ruleTen = [0];
  if (metaLen > 50 && metaLen < 160) {
    ruleTen = 6.66666666;
  } else {
    resultItems.insertAdjacentHTML("beforeend","<div class=\"improv-item\"><p class=\"improv-title\">The meta description is too short or long</p><p class=\"improv-main\">Search engines will not always choose to use a meta description within search listings if it determines it as less ideal. Make sure your your meta description is not too short, but also not too long; otherwise it will be cut-off within the SERP. We recommend between 50 and 160 characters.</p><img src=\"/images/meta-description-demo.png\" class=\"improv-img\"/></div>");
  };

  // [Rule 11] Meta Description Contains Keyword
  let ruleEleven = [0];
  if (metaKeyword > 0) {
    ruleEleven = 6.66666666;
  } else {
    resultItems.insertAdjacentHTML("beforeend","<div class=\"improv-item\"><p class=\"improv-title\">Keyword not contained in meta description</p><p class=\"improv-main\">To best rank for keywords, and encourage users to click on your organin listings, the primary keyword(s) should be contained within your meta description at least once.</p><img src=\"/images/meta-description-demo.png\" class=\"improv-img\"/></div>");
  };

  // [Rule 12] Heading tags (H*) contain keywords
  let ruleTwelve = [0];
  if (headingsKeyword > 0) {
      ruleTwelve = 6.66666666;
  } else {
    resultItems.insertAdjacentHTML("beforeend","<div class=\"improv-item\"><p class=\"improv-title\">Subheadings do not contain keyword</p><p class=\"improv-main\">Including keywords in your subheadings helps show further relevance to your page content as well as promoting good readable structure for the page user.</p><img src=\"/images/sub-heading-demo.png\" class=\"improv-img\"/></div>");
  };

  // [Rule 13] Page body word count
  let ruleThirteen = [0];
  if (totalwordCount > 350) {
    ruleThirteen = 6.66666666;
  } else {
    resultItems.insertAdjacentHTML("beforeend","<div class=\"improv-item\"><p class=\"improv-title\">Page content is too short</p><p class=\"improv-main\">To make your page appear more valuable (and therefore rankable), you should have a suitable amount of readable content on your page. Make sure your content is not too thin, and add some more written content where needed.</p><img src=\"/images/page-length-demo.png\" class=\"improv-img\"/></div>");
  };

  // [Rule 14] Page body contains keyword
  let ruleFourteen = [0];
  if (contentCount > 0) {
    ruleFourteen = 6.66666666;
  } else {
    resultItems.insertAdjacentHTML("beforeend","<div class=\"improv-item\"><p class=\"improv-title\">Keyword not found in main content</p><p class=\"improv-main\">Make sure you have your keyword(s) featured within your page content. We recommend having the keyword included once every 100 to 150 words if possible.</p><img src=\"/images/keyword-content-demo.png\" class=\"improv-img\"/></div>");
  };

  // [Rule 15] Are there internal links
  let ruleFithteen = [0];
  if (anyLinks > 0) {
    ruleFithteen = 6.66666666;
  } else {
    resultItems.insertAdjacentHTML("beforeend","<div class=\"improv-item\"><p class=\"improv-title\">No links contained within the page content</p><p class=\"improv-main\">Search engines like relevant and valuable (good quality) internal and external links within page content. This helps them find relationships between your content and others; as well as improving its own ranking values.</p><img src=\"/images/page-links-demo.png\" class=\"improv-img\"/></div>");
  };


  
  //Score Set
  if (primaryKeyword === "") {
    var scoreTest = 0;
  } else {
    var scoreTest = Number(ruleOne) + Number(ruleTwo) + Number(ruleThree) + Number(ruleFour) + Number(ruleFive) + Number(ruleSix) + Number(ruleSeven) + Number(ruleEight) + Number(ruleNine) + Number(ruleTen) + Number(ruleEleven) + Number(ruleTwelve) + Number(ruleThirteen) + Number(ruleFourteen) + Number(ruleFithteen);
  };

  if (scoreTest > 99) {
    resultItems.insertAdjacentHTML("beforeend","<div><p class=\"congrats\">Congratulations!<br>You have a perfect score for optimizing your page for your desired keyword.</p></div>");
  };


  /* ---------------------------------score bar--------------------------------- */

  // score bar operation
  var circle = document.querySelector('circle');
  var radius = circle.r.baseVal.value;
  var circumference = radius * 2 * Math.PI;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  function setProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
  }

  document.getElementById("score-display").innerText = Math.ceil(scoreTest);

  const input = scoreTest;
  setProgress(input);


  /*input.addEventListener('change', function(e) {
    if (input.value < 101 && input.value > -1) {
      setProgress(input.value);
    }  
  });  */

  // score result variable
  var scoreDisplay = document.getElementById("score-display");

  // score bar colours
  if (scoreTest > 89) {
    document.getElementsByClassName("progress-ring__circle")[0].setAttribute("stroke", "#0cce6b");
    document.getElementsByClassName("progress-ring__circle")[0].setAttribute("fill", "#e7faf0");
    scoreDisplay.classList.add("green", false);
    scoreDisplay.classList.remove("yellow", false);
    scoreDisplay.classList.remove("red", true);
  } else if (scoreTest > 49 && scoreTest < 90) {
    document.getElementsByClassName("progress-ring__circle")[0].setAttribute("stroke", "#ffa400");
    document.getElementsByClassName("progress-ring__circle")[0].setAttribute("fill", "#fff6e6");
    scoreDisplay.classList.remove("green", false);
    scoreDisplay.classList.add("yellow", false);
    scoreDisplay.classList.remove("red", true);
  } else {
    document.getElementsByClassName("progress-ring__circle")[0].setAttribute("stroke", "#ff4e42");
    document.getElementsByClassName("progress-ring__circle")[0].setAttribute("fill", "#ffedec");
    scoreDisplay.classList.remove("green", false);
    scoreDisplay.classList.remove("yellow", false);
    scoreDisplay.classList.add("red", true);
  };

}