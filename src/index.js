function formattedDate(date) {
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHours = `0${currentHour};`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay} ${currentHour}:${currentMinutes}`;
}

let currentTimeAndDate = document.querySelector("#current-time");
let currentTime = new Date();

currentTimeAndDate.innerHTML = formattedDate(currentTime);

function searchCity(city) {
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=999c20f99932bf48ce2906868ec3c37f
&&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let feelsLike = Math.round(response.data.main.feels_like);
  document.querySelector("#currently-feels-like").innerHTML = `${feelsLike}°`;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=999c20f99932bf48ce2906868ec3c37f&&units=metric`;
  axios.get(apiUrl).then(currentLocationTemperature);
}

function currentLocationTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let feelsLike = Math.round(response.data.main.feels_like);
  document.querySelector("#currently-feels-like").innerHTML = `${feelsLike}°`;
}

let changeCityForm = document.querySelector("#change-city-form");
changeCityForm.addEventListener("submit", changeCity);

let currentLocationSearch = document.querySelector("#current-location-search");
currentLocationSearch.addEventListener("click", getCurrentLocation);

searchCity("Toronto");
