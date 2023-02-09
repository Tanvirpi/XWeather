const cityEl = document.getElementById('city')
const currentHumidityEl = document.getElementById('currentHumidity')
const searchInput = document.getElementById('searchInput')
const buttonPress = document.getElementById('search-btn')

const api = {
    key: '70cc22f0365dbc4f648e95a12545c9d9',
    base: 'https://api.openweathermap.org/data/2.5/'
}

buttonPress.addEventListener('click', setQuery);

const numberOfDays = 6;

const localStorageKey = 'previousSearches';

function setQuery(evt) {
    evt.preventDefault();
    getResults(searchInput.value);
    var previousSearch = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    previousSearch.push(searchInput.value);
    if (previousSearch.length > 10) {
        previousSearch.shift();
    }
    localStorage.setItem(localStorageKey, JSON.stringify(previousSearch))
    showSearchCity();
}

function showSearchCity() {
    var previousSearch = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    var searchedCities = '';
    if (previousSearch.length > 10) {
        var n = 10;
    } else {
        var n = previousSearch.length - 1;
    }
    for (i = n; i >= 0; i--) {
        searchedCities +=
            `<button class="searchbtn1" onclick="getResults(this.innerHTML)">${previousSearch[i]}</button>`;
    }
    document.getElementById('searchedCity').innerHTML = searchedCities;
}

function getResults(query) {
    const url = api.base + 'forecast?q=' + query + '&units=imperial&APPID=' + api.key;
    console.log(url);
    cityEl.innerText = query;
    fetch(url)
        .then(data => data.json())
        .then(dataJson => displayResults(dataJson));
}

function displayResults(data) {
    console.log(data);
    for (i = 0; i < numberOfDays; i++) {
        document.getElementById("temp" + (i + 1)).innerHTML = "Temp: " + Number(data.list[i].main.temp).toFixed(1) + " °F";
        document.getElementById("humid" + (i + 1)).innerHTML = "Humidity: " + Number(data.list[i].main.humidity).toFixed(0) + " %";
        document.getElementById("wind" + (i + 1)).innerHTML = "Wind: " + Number(data.list[i].wind.speed).toFixed(0) + " mph";
        document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
    }
}

function showDate() {
    var targetDate = new Date();
    targetDate.setDate(targetDate.getDate());

    var dd = targetDate.getDate();
    var mm = targetDate.getMonth() + 1;
    var yyyy = targetDate.getFullYear();

    for (i = 0; i < numberOfDays; i++) {
        const dayOfMonth = dd + i;
        document.getElementById("date" + (i + 1)).innerHTML = mm + "/" + dayOfMonth + "/" + yyyy;
    }
}

showSearchCity();
showDate();