var myDiv = document.getElementById('myDiv')
var modalDiv = document.querySelector('.modal-container')
var cardBtn = document.querySelector('.modal-trigger')



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
  </div>`

    myDiv.innerHTML += div
};

renderCamps('Hello', 'sdfasdfasdfasdf', 'google')
renderCamps('mycamp', 'sdfasdfasdfasdf', 'google')

function renderWeather() {

};


//fetch data

//loop through data

//renderCamp with data







document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });