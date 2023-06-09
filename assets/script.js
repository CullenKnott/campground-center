var myDiv = document.getElementById("myDiv");
var counter = 1;

// appends the information by applying the specified data to the card and modal template and then injects it into the HTML
function renderCamps(data) {
  console.log(data);
  var campName = data.name;
  var description = data.description;
  var link = data.reservationUrl;
  var totalSites = data.campsites.totalSites
  var showers = data.amenities.showers
  var toilets = data.amenities.toilets
  var water = data.amenities.potableWater
  var reception = data.amenities.cellPhoneReception
  var internet = data.amenities.internetConnectivity
  var image = data.images[0].url

  var div = `<div class="row" id="cards">
    <div class="col s12 m3">
      <div class="card  brown darken-1" id="card">
        <div class="card-content white-text">
          <span class="card-title">${campName}</span>
          <p>${description}</p>
        </div>
        <div class="card-action">
          <button class="amber darken-2 waves-effect waves-light btn modal-trigger" data-target="modal${counter}" onclick="modalclickhandler()">Info</button>
          <a href="${link}" target="_blank">Campground website</a>
        </div>
        <div id="modal${counter}" class="modal" tabindex="0" style="z-index: 1003; display: none; opacity: 0; top: 4%; transform: scaleX(0.8) scaleY(0.8);">
          <div class="modal-content">
            <h4>Information panel</h4>
            <p>
            🏕️ Total campsites: ${totalSites}
            <p>
            <ul>
              <li>🚿 Showers: ${showers}<li>
              <li>🚽 Toilets: ${toilets}<li>
              <li>🫗 Potable water: ${water}<li>
              <li>📶 Phone reception: ${reception}<li>
              <li>🌐 Internet connectivity: ${internet}<li>
            <ul>
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
          </div>
        </div>
      </div>
    </div>
    <div class="col s12 m8">
      <div class="card">
        <div class="card-image">
          <img class="materialboxed" width="200" src="${image}">
          <span class="card-title">${campName}</span>
        </div>
      </div>
    </div>
  </div>`;

  counter++;

  myDiv.innerHTML += div;
}

// triggers the modal for its specified card after the information has been appended
function modalclickhandler() {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);
}

const submitButton = document.getElementById("submitButton");

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Call the function to perform the desired action
    apiCall();
  }
});

("developer.nps.gov/api/v1/campgrounds?q=test&api_key=sM8twcHp55GYlyfrURIQHjdmfOQ6au6qTedVbSya");

// event listener on search button
document.querySelector(".search").addEventListener("click", apiCall);

// fetches api data
function apiCall() {
  var search = document.querySelector(".autocomplete").value;
  var apiKey = "e58651ace7cb758478db04f768206e08";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" +
    search +
    "&appid=" +
    apiKey +
    "&units=imperial";
  campgroundData(search);

  getWeatherdata(queryURL)
    .then(function (response) {
      var data = response.json();
      return data;
    })
    .then(function (data) {
      //var clouds = data.clouds.all;
      console.log(data);
      // var display = document.querySelector('#displayTemp');
      // var temperature = data.main.temp
      //display.textContent = temperature
      weathernametemp(data);
    });

  saveCityHistory(search);
  renderSearchHistory();
}
function weathernametemp(data) {
  var weatherCityName = data.name;
  var cityNameelement = document.querySelector(".weatherCardCityName");
  cityNameelement.textContent = weatherCityName;
  var actualTemp = data.main.temp;
  var tempElement = document.querySelector(".weatherCardTemp");
  tempElement.textContent =
    weatherCityName + " is currently " + actualTemp + "°F ";
}

function saveCityHistory() {
  var searchedCity = document.querySelector(".autocomplete");
  var actualCity = searchedCity.value.trim();
  if (actualCity !== "") {
    var cityHistory =
      JSON.parse(window.localStorage.getItem("cityHistory")) || [];
    cityHistory.push(actualCity);
    window.localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
  }
}

function renderSearchHistory() {
  var cityHistory = JSON.parse(window.localStorage.getItem("cityHistory"));
  var historyEl = document.querySelector("#sortable");
  historyEl.innerHTML = "";
  for (var i = 0; i < cityHistory.length && i < 10; i++) {
    console.log(cityHistory[i]);
    var displayedHistory = cityHistory[i];
    var listHistory = document.createElement("li");
    listHistory.textContent = displayedHistory;
    listHistory.setAttribute("id", `list${i}`);
    listHistory.setAttribute("class", "card-panel amber darken-2 lighten-2");
    // historyEl.appendChild(displayedHistory);
    historyEl.appendChild(listHistory);
  }
}

function getWeatherdata(url) {
  var response = fetch(url);
  return response;
}

function campgroundData(search) {
  var url =
    "https://developer.nps.gov/api/v1/campgrounds?limit=10&q=" +
    search +
    "&api_key=sM8twcHp55GYlyfrURIQHjdmfOQ6au6qTedVbSya";
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      $("#myDiv").empty();

      for (var i = 0; i < data.data.length; i++) {
        renderCamps(data.data[i]);
      }
    });
}

// Clear Search History
$("#clearButton").on("click", function () {
  localStorage.clear();
  renderSearchHistory();
});


// weather API
// API KEY: e58651ace7cb758478db04f768206e08
/*
var apiKey = "e58651ace7cb758478db04f768206e08";
var search = "Los Angeles";
var queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  search +
  "&appid=" +
  apiKey;

function getWeatherdata(url) {
  var response = fetch(url);
  return response;
}

getWeatherdata(queryURL).then(function (response) {
  var data = response.json();
  console.log(data);
});
//  https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} */

// figure out how the api works to extract the url from data
// if we can retrieve the link in the data
// variable
// href is equal to data. <a href="#">${link}</a>
//  <a href="#">${link}</a> change to view campground site
//  <a href="${link}" target = "_blank">Campsite</a>
