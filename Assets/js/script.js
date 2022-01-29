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

