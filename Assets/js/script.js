var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q="
var openWeatherOneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?"
var excludeString = "&exclude=minutely,hourly,alerts"
var weatherUnits = "&units=imperial"
var apiKey = "&appid=47cc7111aeaa92ded720903e4f89338c"
var iconURL = "https://openweathermap.org/img/wn/"
var searchCityList = [];
var lastSearch = '';
var lastSearchDefault = '';
var cityNameOK = true;

function saveSearchHistory() {
    localStorage.setItem("lastSearch", lastSearch)
    localStorage.setItem("searchCityList", JSON.stringify(searchCityList));
}

function loadSearchHistory() {
    lastSearch = localStorage.getItem("lastSearch") || lastSearchDefault;
    searchCityList = JSON.parse(localStorage.getItem("searchCityList")) || [];
}

function updateCityButtons() {
    var searchHistoryEl = document.getElementById('search-history');
    searchHistoryEl.innerHTML = '';

    for (var i = 0; i < searchCityList.length; i++) {
        var newButton = document.createElement("button");
        newButton.textContent = searchCityList[i];
        newButton.setAttribute("class", "city-button")
        searchHistoryEl.appendChild(newButton);
    }
}

function addCityName (city) {
    if (!searchCityList.includes(city)) {
        searchCityList.push(city);
    }
}