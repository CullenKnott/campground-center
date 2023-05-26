var myDiv = document.getElementById('myDiv')

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
    </div>`

    myDiv.innerHTML += div
}

renderCamps('mycamp', 'sdfasdfasdfasdf', 'google')
renderCamps('mycamp', 'sdfasdfasdfasdf', 'google')
renderCamps('mycamp', 'sdfasdfasdfasdf', 'google')


//fetch data

//loop through data

//renderCamp with data
"developer.nps.gov/api/v1/campgrounds?q=test&api_key=sM8twcHp55GYlyfrURIQHjdmfOQ6au6qTedVbSya"

document.querySelector(".search").addEventListener("click", function(){
    var search = document.querySelector(".autocomplete").value
    var url = "https://developer.nps.gov/api/v1/campgrounds?q="+search+"&api_key=sM8twcHp55GYlyfrURIQHjdmfOQ6au6qTedVbSya"
    fetch(url)
    .then(function(res){
        return res.json()
    }).then(function(data){
        console.log(data)
    })
})
