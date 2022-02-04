var apiKey ="742e1e6ab34a390c2330f87279037795";

// using JSON parse we can covert data into string form into JS objects, get item gets the stored items
var savedSearch = JSON.parse(localStorage.getItem("ForecastHistory")) || [];

// creating a for loop
for (i = 0; i < savedSearch.length; i++) {
    var cityBtn = $(
    '<button class="list-group-item" data-city="${savedSearch[i]}">${savedSearch[i]}</button>'
    );
}

function weatherDisplay(city) {
    var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";
$.ajax({
    url: queryURL,
    method: "GET",
}).then(function (response) {

    
}
);

}