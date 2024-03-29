let apiKey = "b40b135798f82a05aed08769f9275f50"; //sets API key
let tempUnit = "imperial"; //default faranheight but want to use local memory to remember users prefrence
let currentLatitude = null; //blank because it will be filled in by currentposion function
let currentLongitude = null;

let citySearch = document.querySelector("#cityForm"); //refrencing the search bar from HTML
citySearch.addEventListener("submit", cityDisplay); //waiting for someone to click the search button

function currentPosition(position) {
  //function to find someones current location and set that as the default
  currentLatitude = position.coords.latitude; //pulls users current position
  currentLongitude = position.coords.longitude;
  axios //calls API to return information from the location provided
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&units=${tempUnit}&appid=${apiKey}`
    ) //calls to exact URL of open weather app
    .then(showTemperature) //displays weather information for default location
    .catch((err, err2) => console.log(err, err2)); //catches and displays errors if they pop up
}
navigator.geolocation.getCurrentPosition(currentPosition); //calls the funtion to get and display default location weather

function showTemperature(response) {
  //function to display weather data pulls from API

  let temperature = Math.round(response.data.main.temp); //reads the response, finds the current temp, rounds the number
  let temperatureDisplay = document.querySelector("#tempToday"); // refrences the HTML for where the main temperature is displayed
  temperatureDisplay.innerHTML = `${temperature}`; //changes the HTML to display the pulled temperature
  let h1 = document.querySelector("h1"); //refrences the HTML where the city name is displayed
  h1.innerHTML = response.data.name; //replaces the HTML with default or searched city
  let lowHigh = document.querySelector("#lowHi"); //refrences the spot in the HTML that shows the low and high temp for the day
  let low = Math.round(response.data.main.temp_min); //reads the response, finds the low for the day, rounds the number
  let high = Math.round(response.data.main.temp_max); //reads the response, finds the high for the day, rounds the number
  lowHigh.innerHTML = `${low}°/${high}°`; //replaces the HTML with pulled temperature
  let weatherDescription = document.querySelector("#weatherDescription"); //refrences the HTML where the weather description is displayed
  let description = response.data.weather[0].main; //reads the response for the weather description
  weatherDescription.innerHTML = `${description}`; //replaces the HTML with pulled weather description
  let iconElement = document.querySelector("#icon"); //refrences the HTML where the big weather icon will be displayed
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  ); //changes the source of the icon to a dynamic one from the API
  let humidity = document.querySelector("#currentHumidity"); //refrences where humidity islisted in HTML
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`; //changes to humidity info from the API
  let windSpeed = document.querySelector("#currentWind"); //refrences HTML spot for wind Speed
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}mph`; //Changes wind speed info from the API

  getForecast(response.data.coord); //runs get forecast function
}

function cityDisplay(event) {
  event.preventDefault(); //stops pags from doing a full refresh upon enter
  let input = document.querySelector("#cityInput"); //refrences search bar in HTML
  let h1 = document.querySelector("h1"); //refrences City title in HTML
  h1.innerHTML = input.value; //changes city title to searched city
  let city = input.value; //establishes how to get city title
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempUnit}&appid=${apiKey}`; //calls to API for theinformation needed for the new city
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature); //run the show temperature function to replace relevent termperature info
}

function formatDate() {
  //function to find and silay current date and tim
  let now = new Date(); //defines now with call to find the date
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]; // established all potential dats of the week and how they should be displayed
  let day = days[now.getDay()]; //call to find which day to refrence

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]; // established all potential mmonths of the year and how they should be displayed
  let month = months[now.getMonth()]; //call to find which month to refrence

  let minutes = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "60",
  ]; // established all potential minutes and how they should be displayed
  let minute = minutes[now.getMinutes()]; //call to find which minute to refrence

  let currentTime = document.querySelector("#currentTime"); //find where time is displayed in HTML
  currentTime.innerHTML = `${day}, ${month} ${now.getDate()} ${now.getHours()}:${minute}`; //Changes displayed time using collected data
}
formatDate(); //pulls and displays current time and date

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000); //refrences time stamps from the API
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; //names they days in the array
  return days[day]; //gives day info for display
}

function displayForecast(response) {
  let forecast = response.data.daily; //calls api for info

  let forecastElement = document.querySelector("#forecast"); //refrences HTML block for the forcast section

  let forecastHTML = `<div class="row">`; //surrounding HTML

  forecast.forEach(function (forecastDay, index) {
    //starts a loop that refences days from API
    if (index < 6) {
      //stops loop at 5 so only 6 days come up in the que
      forecastHTML = //defines what HTML we want inserted into the page
        forecastHTML +
        `<div class="col-2" >
              <div class="row text">${formatDay(forecastDay.dt)}</div>
              <div class="row"><img
              class=""
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                width="50px"
            /></div>
              <div class="row text">${Math.round(
                forecastDay.temp.max
              )}°/${Math.round(forecastDay.temp.min)}°</div>
            </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`; //adds closing div
  forecastElement.innerHTML = forecastHTML; //replaces current HTML with this information
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${tempUnit}`; //calls the more in depth api info
  axios.get(apiUrl).then(displayForecast); //gets info and runs display forcast
}
