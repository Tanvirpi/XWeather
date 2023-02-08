const cityEl = document.getElementById('city')
const currentHumidityEl = document.getElementById('currentHumidity')
const searchInput = document.getElementById('searchInput')
const buttonPress = document.getElementById('search-btn')

const api = {
    Key: '70cc22f0365dbc4f648e95a12545c9d9',
    base: 'https://api.openweathermap.org/data/2.5/'
}

buttonPress.addEventListener('click', setQuery);

function setQuery(evt) {
    evt.preventDefault();
    getResults(searchInput.value);
    console.log(searchInput.value);
    var previousSearch = JSON.parse(localStorage.getItem("city")) || []
    if (previousSearch.indexOf(searchInput.value) === -1) {
        previousSearch.push(searchInput.value)
        localStorage.setItem("city", JSON.stringify(previousSearch))
        showSearchCity();
    }
}

showSearchCity()

function showSearchCity() {
    var previousSearch = JSON.parse(localStorage.getItem("city")) || []
    var searchedCities = '';
    if (previousSearch.length > 10) {
        var n = 10;
    } else { var n = previousSearch.length - 1 }
    for (i = n; i >= 0; i--) {
        searchedCities += `<button class="searchbtn1">${previousSearch[i]}</button>`;
    }
    document.getElementById('searchedCity').innerHTML = searchedCities;
}

function getResults(query) {
    const url = api.base + 'forecast?q=' + query + '&units=imperial&APPID=' + api.Key;
    console.log(url);
    fetch(url)
        .then(data => {
            return data.json();
        }).then(displayResults);
}

function displayResults(data) {
    console.log(data);
    cityEl.innerText = searchInput.value;

    for (i = 0; i < 6; i++) {
        document.getElementById("temp" + (i + 1)).innerHTML = "Temp: " + Number(data.list[i].main.temp).toFixed(1) + "°F";

    }

    for (i = 0; i < 6; i++) {
        document.getElementById("humid" + (i + 1)).innerHTML = "Humidity: " + Number(data.list[i].main.humidity).toFixed(0) + "%";
    }

    for (i = 0; i < 6; i++) {
        document.getElementById("wind" + (i + 1)).innerHTML = "Wind: " + Number(data.list[i].wind.speed).toFixed(0) + "mph";
    }

    for (i = 0; i < 6; i++) {
        document.getElementById("img" + (i + 1)).src="http://openweathermap.org/img/wn/" +
            data.list[i].weather[0].icon
            + ".png";
    }
}

var targetDate = new Date();
targetDate.setDate(targetDate.getDate());

var dd = targetDate.getDate();
var mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
var yyyy = targetDate.getFullYear();

for (i = 0; i < 6; i++) {
    document.getElementById("date" + (i + 1)).innerHTML = mm+ "/" + dd + "/" + yyyy;

}