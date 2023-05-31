var myDiv = document.getElementById("myDiv");


renderCamps("Hello", "sdfasdfasdfasdf", "google");
renderCamps("mycamp", "sdfasdfasdfasdf", "google");

function renderWeather() {}

//fetch data

//loop through data

//renderCamp with data

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);
});

("developer.nps.gov/api/v1/campgrounds?q=test&api_key=sM8twcHp55GYlyfrURIQHjdmfOQ6au6qTedVbSya");

document.querySelector(".search").addEventListener("click", apiCall);

function apiCall() {
  var search = document.querySelector(".autocomplete").value;

  var apiKey = "e58651ace7cb758478db04f768206e08";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    search +
    "&appid=" +
    apiKey + "&units=imperial";

  campgroundData(search);

  getWeatherdata(queryURL)
    .then(function (response) {
      var data = response.json();
      return data;
    })
    .then(function (data) {
     // var clouds = data.clouds.all;
      console.log(data);

      weathernametemp(data)
    });

}

function weathernametemp(data) {
  var weatherCityName = data.name;
  var cityNameelement = document.querySelector(".weatherCardCityName")
  cityNameelement.textContent = "City: "+ weatherCityName;

var actualTemp = data.main.temp;
var tempElement = document.querySelector(".weatherCardTemp");
tempElement.textContent= "Tempature is " + actualTemp;



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
      renderCamps(data);
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

function renderCamps(campName, description, link, amenities, fees) {
  var div = `<div class="row">
    <div class="col s12 m3">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">${campName}</span>
          <p>${description}</p>
        </div>
        <div class="card-action">
          <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Info</a>
          <a href="#">${link}</a>
        </div>
        <div id="modal1" class="modal" tabindex="0" style="z-index: 1003; display: none; opacity: 0; top: 4%; transform: scaleX(0.8) scaleY(0.8);">
          <div class="modal-content">
            <h4>Modal Header</h4>
            <p>
              Amenities: ${amenities}, Fees: ${fees}, 
            </p>
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  myDiv.innerHTML += div;
}