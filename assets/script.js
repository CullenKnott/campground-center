var myDiv = document.getElementById("myDiv");

function renderCamps(campName, description, link) {
  var div = `<div class="row">
    <div class="col s12 m3">
    <div class="card blue-grey darken-1">
        <div class="card-content white-text">
        <span class="card-title">${campName}</span>
        <p>${description}</p>
        </div>
        <div class="card-action">
        <button class="btn blue-grey">More information</button>
        <a href="#">${link}</a>
        </div>
    </div>
    </div>
    </div>`;

  myDiv.innerHTML += div;
}

renderCamps("mycamp", "sdfasdfasdfasdf", "google");
renderCamps("mycamp", "sdfasdfasdfasdf", "google");
renderCamps("mycamp", "sdfasdfasdfasdf", "google");

//fetch data

//loop through data

//renderCamp with data
("developer.nps.gov/api/v1/campgrounds?q=test&api_key=sM8twcHp55GYlyfrURIQHjdmfOQ6au6qTedVbSya");

document.querySelector(".search").addEventListener("click", apiCall);

function apiCall() {
  var search = document.querySelector(".autocomplete").value;

  var apiKey = "e58651ace7cb758478db04f768206e08";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    search +
    "&appid=" +
    apiKey;

  campgroundData(search);

  getWeatherdata(queryURL)
    .then(function (response) {
      var data = response.json();
      return data;
    })
    .then(function (data) {
      var clouds = data.clouds.all;
      console.log(data);
    });
}

function getWeatherdata(url) {
  var response = fetch(url);
  return response;
}

function campgroundData(search) {
  var url =
    "https://developer.nps.gov/api/v1/campgrounds?q=" +
    search +
    "&api_key=sM8twcHp55GYlyfrURIQHjdmfOQ6au6qTedVbSya";
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

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
