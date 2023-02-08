const cityEl = document.getElementById('city')
const currentDateEl = document.getElementById('currentDate')
const currentTimeEl = document.getElementById('currentTime')
const currentTempEl = document.getElementById('currentTemp')
const currentWindEl = document.getElementById('currentWind')
const currentHumidityEl = document.getElementById('currentHumidity')
const searchInput = document.getElementById('searchInput')
const buttonPress = document.getElementById('search-btn')

const api = {
    Key : '70cc22f0365dbc4f648e95a12545c9d9',
    base : 'https://api.openweathermap.org/data/2.5/'
}

buttonPress.addEventListener ('click', setQuery);

function setQuery(evt) {
        evt.preventDefault();
        getResults(searchInput.value);
        console.log(searchInput.value);
        var previousSearch = JSON.parse(localStorage.getItem("city")) || []
        // if (previousSearch.indexOf(searchInput.value)===-1){
        previousSearch.push(searchInput.value)   
             localStorage.setItem("city",JSON.stringify(previousSearch))
        showSearchCity();
        // }
    }

    showSearchCity()

function showSearchCity() {
    var previousSearch = JSON.parse(localStorage.getItem("city")) || []    
    var searchedCities = '';
    if (previousSearch.length>10){
        var n = 10;
    } else {var n = previousSearch.length-1}
    for (i=n; i>= 0; i--) {
        searchedCities+=`<button class="searchbtn1">${previousSearch[i]}</button>`;
    }
    document.getElementById('searchedCity').innerHTML = searchedCities;
}

function getResults (query) {
    const url2 = api.base + 'weather?q=' + query + '&units=metric&APPID=' + api.Key;
    const url = `${api.base}weather?q=${query}&units=metric&APPID=${api.Key}`;
    console.log(url);
    fetch(url)
        .then(weather => {
            return weather.json();
          }).then(displayResults);
      }

function displayResults (weather) {
        console.log(weather);
        cityEl.innerText = `${weather.name}, ${weather.sys.country}`;
        console.log(cityEl);
        let now = new Date();
        let date = document.querySelector('.location .date');
        currentDateEl.innerText = dateBuilder(now);
        currentTempEl.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;
        currentWindEl.innerHTML = `${Math.round(weather.wind.speed)}<span>mph</span>`;
        currentHumidityEl.innerHTML = `${Math.round(weather.main.humidity)}<span>%</span>`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

//5 Day Forecast
buttonPress.addEventListener ('click', setQuery1)
function setQuery1 (e){
    e.preventDefault();
    getResults(searchInput.value);
}

function getResults (query) {
    const url1 = api.base + 'forecast?q=' + query + '&units=metric&APPID=' + api.Key;
    console.log(url1);
    fetch(url1)
        .then(data => {
            return data.json();
          }).then(displayResults1);
      }

      function displayResults1 (data) {
        console.log(data);
        for(i = 0; i<5; i++){
            document.getElementById("temp" + (i+1)).innerHTML = "Temp: " + Number(data.list[i].main.temp + 273.15).toFixed(1)+ "°F";
           
        }
    
        for(i = 0; i<5; i++){
            document.getElementById("humid" + (i+1)).innerHTML = "Humidity: " + Number(data.list[i].main.humidity).toFixed(0) + "%";
        }
        
        for(i = 0; i<5; i++){
            document.getElementById("wind" + (i+1)).innerHTML = "Wind: " + Number(data.list[i].main.humidity).toFixed(0) + "mph";
        }
        
         for(i = 0; i<5; i++){
            document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
            data.list[i].weather[0].icon
            +".png";
        }
        ;
}