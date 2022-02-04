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

// Adding a function to bring in the 5 day weather forecast for a users chosen city
function fiveDayForecast(city) {
    var forecastfive =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";

  $.ajax({
    url: forecastfive,
    method: "GET",
  }).then(function (response) {

    var response = response.list;

    $(document).ready(function () {
        $("#date").text(`(${moment().format("l")})`);
      for (i = 1; i < 7; i++) {
        var forecastDate = $(`#date${i}`);
        forecastDate.text(moment().add(`${i}`, "d").format("DD/MM/YYYY"));
      }
      for (i = 0; i < response.length; i++) {
        $("#weatherIcon" + i).attr(
          "src",
          "https://openweathermap.org/img/wn/" +
            response[i].weather[0].icon +
            "@2x.png"
        );
        $("#temp" + i).text(
          "Temp: " + Math.round(response[i].main.temp) + " °C"
        );
        $("#humid" + i).text("Humidity: " + response[i].main.humidity + "%");
      }

    });


  });
}

// Adding a function to bring up the UV index
function retrieveUV(lattitude, longitude) {
    var queryURLUV =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lattitude +
    "&lon=" +
    longitude +
    "&exclude=minutely,hourly,alerts&appid=" +
    apiKey +
    "&units=metric";

  $.ajax({
    url: queryURLUV,
    method: "GET",
  }).then(function (responseUV) {
 
    // these if statements are relatively similar to the workday calendar, the index background colour will change based on the uv rating
    $("#current-uvi").removeClass();

    $("#current-uvi").text(responseUV.current.uvi);
    
    if (responseUV.current.uvi < 3) {
      $("#current-uvi").css("background-color", "#3EA72D").css("color", "white");
    } else if (responseUV.current.uvi >= 3 && responseUV.current.uvi < 6) {
      $("#current-uvi").css("background-color", "#FFF300");
    } else if (responseUV.current.uvi >= 6 && responseUV.current.uvi < 8) {
      $("#current-uvi").css("background-color", "#F18B00");
    } else if (responseUV.current.uvi >= 8 && responseUV.current.uvi < 11) {
      $("#current-uvi").css("background-color", "#E53210").css("color", "white");
    } else if (responseUV.current.uvi >= 11) {
      $("#current-uvi").css("background-color", "#B567A4").css("color", "white");
    }

    $("#forecast-today").removeClass("d-none");

  })
}

