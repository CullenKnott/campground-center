var myDiv = document.getElementById("myDiv");
var counter = 1;

function clearResults() {
  // Remove all child elements from the container
  while (myDiv.firstChild) {
    myDiv.removeChild(myDiv.firstChild);
  }
};

function renderCamps(campName, description, link, amenities, fees) {
  var div = `<div class="row">
    <div class="col s12 m3">
      <div class="card blue-grey darken-1" id="card">
        <div class="card-content white-text">
          <span class="card-title">${campName}</span>
          <p>${description}</p>
        </div>
        <div class="card-action">
          <button class="waves-effect waves-light btn modal-trigger" data-target="modal${counter}" onclick="modalclickhandler()">Info</button>
          <a href="#">${link}</a>
        </div>
        <div id="modal${counter}" class="modal" tabindex="0" style="z-index: 1003; display: none; opacity: 0; top: 4%; transform: scaleX(0.8) scaleY(0.8);">
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

  counter++

  myDiv.innerHTML += div;
}

// triggers the modal for its specified card
function modalclickhandler() {
  
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems);
}


function renderWeather() {

}

//fetch data

//loop through data

//renderCamp with data



("developer.nps.gov/api/v1/campgrounds?q=test&api_key=sM8twcHp55GYlyfrURIQHjdmfOQ6au6qTedVbSya");

document.querySelector(".search").addEventListener("click", apiCall, clearResults);

function apiCall() {
  var search = document.querySelector(".autocomplete").value;

  var apiKey = "e58651ace7cb758478db04f768206e08";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" +
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
      //var clouds = data.clouds.all;
      console.log(data);
      var display = document.querySelector('#displayTemp');
      var temperature = data.main.temp
      display.textContent = temperature
      renderWeather(data);
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
      for (var i = 0; i < data.data.length; i++) {
        renderCamps(data.data[i].name, data.data[i].description)
      }
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
