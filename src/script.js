// NEW CODE (WEEK 5)
function showSearchValues(response) {
    let celciusValue = document.querySelector("#celcius-link");
    let fahrenheitValue = document.querySelector("#fahrenheit-link");
    let country = response.data.sys.country.toLowerCase();
  
    function fahrenheitToCelcius(event) {
      event.preventDefault();
      let convertedTemperature = document.querySelector("#temperature-value");
      convertedTemperature.innerHTML = Math.round(response.data.main.temp);
    }
  
    celciusValue.addEventListener("click", fahrenheitToCelcius);
  
    function celciusToFahrenheit(event) {
      event.preventDefault();
      let convertedTemperature = document.querySelector("#temperature-value");
      convertedTemperature.innerHTML = Math.round(
        (response.data.main.temp * 9) / 5 + 32
      );
    }
  
    fahrenheitValue.addEventListener("click", celciusToFahrenheit);
  
    document.querySelector("h3").innerHTML = `${response.data.name}`;
    document.querySelector("#temperature-value").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector(
      "#weather-description"
    ).innerHTML = `${response.data.weather[0].description}`.toLowerCase();
    document.getElementById("country-flag").className += `em em-flag-${country}`;
    document.querySelector(
      "#min-max"
    ).innerHTML = `<em><strong>Min/Max value </br> under construction</strong></em>`;
    document.querySelector(
      "#humidity"
    ).innerHTML = `Humidity ${response.data.main.humidity}%`;
    document.querySelector(
      "#precipitation"
    ).innerHTML = `<em><strong>Precipitation value </br> under construction</strong></em>`;
    document.querySelector("#wind-speed").innerHTML = `Wind ${Math.round(
      response.data.wind.speed * 3.6
    )}km/h`;
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
  
  // OLD CODE (WEEK 4)
  
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
  currentDateTime.innerHTML = `${formatDate(now)} <br/> ${formatTime(now)}`;
  