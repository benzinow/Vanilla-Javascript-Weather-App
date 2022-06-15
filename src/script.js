let apiKey = "7b7e5e8848a93cc4470c8304aa9f56a5";
let tempUnit = "metric";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempUnit}&appid=${apiKey}`;

let citySearch = document.querySelector("#cityForm");
citySearch.addEventListener("submit", cityDisplay);

function currentPosition(position) {
  currentLatitude = position.coords.latitude;
  currentLongitude = position.coords.longitude;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&units=${tempUnit}&appid=${apiKey}`
    )
    .then(showTemperature)
    .catch((err, err2) => console.log(err, err2));
}
navigator.geolocation.getCurrentPosition(currentPosition);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector("#tempToday");
  temperatureDisplay.innerHTML = `${temperature}°`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let lowHigh = document.querySelector("#lowHi");
  let low = Math.round(response.data.main.temp_min);
  let high = Math.round(response.data.main.temp_max);
  lowHigh.innerHTML = `${low}°/${high}°`;
  let weatherDescription = document.querySelector("#weatherDescription");
  let description = response.data.weather[0].main;
  weatherDescription.innerHTML = `${description}`;
}

function cityDisplay(event) {
  event.preventDefault();
  let input = document.querySelector("#cityInput");
  let h1 = document.querySelector("h1");
  h1.innerHTML = input.value;
  let city = input.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempUnit}&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function formatDate() {
  let now = new Date();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[now.getDay()];

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
  ];

  let month = months[now.getMonth()];

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
  ];

  //fix to <10 ad 0 to time lol

  let minute = minutes[now.getMinutes()];

  let currentTime = document.querySelector("#currentTime");
  currentTime.innerHTML = `${day}, ${month} ${now.getDate()} ${now.getHours()}:${minute}`;
}

formatDate();

function flipTempScale() {
  let tempScaleImage = document.getElementById("tempScale");
  if (tempScaleImage.src.match("images/svg/004-farenheit.svg")) {
    let tempNumber = document.getElementById("tempToday");
    tempNumber.innerHTML = "30&deg;";
    tempScaleImage.src = "images/svg/003-celsius.svg";
  } else {
    tempScaleImage.src = "images/svg/004-farenheit.svg";
    let tempNumber = document.getElementById("tempToday");
    tempNumber.innerHTML = "100&deg;";
  }
}

//extra
//city prediction, as typing??
//api pull update weather description/icon?
//api pull update sunset/sunrise time?
