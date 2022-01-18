console.log("test");
const url = "http://api.weatherapi.com/v1/forecast.json";
const key = "8225d687450c470ea91213831221701";
const days = ["Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota","Niedziela"];
const months = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];

// http://api.weatherapi.com/v1/forecast.json?key=twoj_klucz                     &q=nazwa_miasta_lub_auto:ip&days=5
// http://api.weatherapi.com/v1/forecast.json?key=8225d687450c470ea91213831221701&q=auto:ip                 &days=5

const weatherContainer = document.querySelector(".weather-container");

const weather = getData();



async function getData(location = "auto:ip") {
  try {
    let data = await fetch(request(location));
    data = await data.json();
    console.log(data);
    printWeather(data);
   } catch (err) {
     console.warn(err);
  }
}

function request(location) {
  // const req = `${url}?key=${key}&q=07112&days=7`;
  const req = `${url}?key=${key}&q=${location}&hour=12&lang=pl&days=7`;
  console.log(req);
  return req;
}

function printWeather(data){
  let date = new Date();

  const weather = document.createElement('div');
  weather.classList.add("weather");
  console.log(data);
  // weather.innerText="zad";




weather.innerHTML=`
<div class="weather-btn-cont"><button class="weather-btn"><i class="fas fa-times"></i></button></div>
<div class="weather-date">${days[date.getUTCDay()]}, ${date.getUTCDate()} ${months[date.getUTCMonth()]}</div>
<div class="weather-hour">${date.getUTCHours()} : ${date.getUTCMinutes().toLocaleString('en-US',{minimumIntegerDigits:2}) }</div>
<div class="weather-location">${data.location.name}</div>
<img class="weather-svg" src="${getSVG(data)}">

<div class="weather-current-temp">${data.current.temp_c + '&#8451;'}</div>
<div class="weather-current">${data.current.condition.text}</div>
<hr class="weather-division"><hr>`
weather.appendChild(forecast(data.forecast.forecastday));
weatherContainer.appendChild(weather);
const removeBtn = document.querySelector('.weather-btn-cont');
removeBtn.addEventListener('click',removeResult);

}


function forecast(data){
 const div = document.createElement('div');
 div.classList.add("weather-forecast");
for(let i=0; i<data.length;i++){
  const innerDiv = document.createElement('div');
  innerDiv.classList.add("weather-forecast-day");
  const date = new Date(data[i].date_epoch*1000);
  innerDiv.innerHTML=`
  <div class="weather-date">${days[date.getDay()]}</div>
  <img class="weather-svg" src="${getSVG(data[i].day.condition.code)}">
  <div class="weather-current">${data[i].day.avgtemp_c + '&#8451;'}</div>  
  `;
  div.appendChild(innerDiv);

 }
 return div;
}

function getSVG(data){
  return "https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg"
}

function removeResult(){
  console.log(this);
this.parentElement.parentElement.remove();
};