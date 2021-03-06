function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `e1e6c8a3019898e734beb74bbadbea05`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then( displayForecast);
}

function showSearchValues(response) {
  let country = response.data.sys.country.toLowerCase();

  document.getElementById("country-flag").className += `em em-flag-${country}`;
  document.querySelector("#city-name").innerHTML = `${response.data.name}`;
  document.querySelector("#weather-description").innerHTML = `${response.data.weather[0].description}`;
  document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#weather-icon").setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#temperature-value").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = `Humidity ${response.data.main.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `Wind ${Math.round(response.data.wind.speed * 3.6)}km/h`;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = `e1e6c8a3019898e734beb74bbadbea05`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showSearchValues);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value.toLowerCase().trim();
  searchCity(city);
}

let searchButton = document.querySelector("#search-btn");
searchButton.addEventListener("click", handleSubmit);

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `e1e6c8a3019898e734beb74bbadbea05`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showSearchValues);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentPosition);

searchCity("Windhoek");

let now = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemper",
    "October",
    "November",
    "December"
  ];

  let day = days[date.getDay()];
  let monthDay = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let currentDate = `${day}, ${monthDay} ${month} ${year}`;
  return currentDate;
}

function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = `${hours}:${minutes}`;
  return currentTime;
}

let currentDateTime = document.querySelector("#date-time");
currentDateTime.innerHTML = `Last updated: </br> ${formatDate(now)} </br> ${formatTime(now)}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`
  let days = ["Thu", "Fri", "Sat", "Sun"];
  forecast.forEach(function(forecastDay, index) {
    if (index < 5) {
    forecastHTML = forecastHTML +
    `<div class="col">
      <h5>
        ${formatDay(forecastDay.dt)}
      </h5>
      <img 
        alt=""
        src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
        id="weather-forecast-icon">
      <p>
        <span id="weather-forecast-max-temp">${Math.round(forecastDay.temp.max)}??</span> 
        <span id="weather-forecast-min-temp">${Math.round(forecastDay.temp.min)}??C</span>
        </p>
      </div>`;
    }
  }
)

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
    }