var apiKey ="742e1e6ab34a390c2330f87279037795";

// using JSON parse we can covert data into string form into JS objects, get item gets the stored items
var savedSearch = JSON.parse(localStorage.getItem("ForecastHistory")) || [];

// creating a for loop
for (i = 0; i < savedSearch.length; i++) {
    var cityBtn = $(
    '<button class="list-group-item" data-city="${savedSearch[i]}">${savedSearch[i]}</button>'
    );
}

// function to display the weather in users chosen city
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

    var tempC = response.main.temp;
    var todayDate = moment().format("DD-MM-YY");
    var weatherIcon = response.weather[0].icon;
    var weatherURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
 
    $('#display-city').html("<h3>" + response.name + " " + todayDate + "</h3>");
    $("#current-weather-icon").attr("src", weatherURL);
    $("#current-temp").text("Temperature: " + tempC.toFixed(2) + " °C");
    $("#current-humidity").text("Humidity: " + response.main.humidity + "%");
    $("#current-wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
    retrieveUV(response.coord.lat, response.coord.lon);
    

});
}

