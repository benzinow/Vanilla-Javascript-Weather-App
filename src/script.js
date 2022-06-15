

let citySearch = document.querySelector("#cityForm");
citySearch.addEventListener("submit", cityDisplay);

function cityDisplay(event) {
    event.preventDefault();
    let input = document.querySelector("#cityInput");
    let h1 = document.querySelector("h1");
    h1.innerHTML = input.value;

}

function formatDate() {
    
    let now = new Date();
    let days = [
      "Sun",
      "Mon",
      "Tues",
      "Wed",
      "Thurs",
      "Fri",
      "Sat"
    ];
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
      "Dec"
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
        "You discovered my magical time easter egg",
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
        "60"
    ]

    //fix to <10 ad 0 to time lol 

    let minute = minutes[now.getMinutes()];

  let currentTime = document.querySelector("#currentTime");
  currentTime.innerHTML = `${day}, ${month} ${now.getDate()} ${now.getHours()}:${minute}`;
}
 
  formatDate();


  function flipTempScale() {
let tempScaleImage = document.getElementById("tempScale");
if (tempScaleImage.src.match("images/svg/004-farenheit.svg")){
    let tempNumber = document.getElementById("tempToday");
    tempNumber.innerHTML = ("30&deg;");
    tempScaleImage.src = "images/svg/003-celsius.svg";
} else {
    tempScaleImage.src = "images/svg/004-farenheit.svg";
    let tempNumber = document.getElementById("tempToday");
    tempNumber.innerHTML = ("100&deg;");
}
  }


