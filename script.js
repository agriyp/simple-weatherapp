const api = {
    key: "fd292dd799b5d68e61f749a5879dee4a",
    base: "https://api.openweathermap.org/data/2.5/"    
}

const searchboxEl = document.querySelector('.search-box');
searchboxEl.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchboxEl.value);
        console.log(searchboxEl.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let cityEl = document.querySelector('.location .city');
    cityEl.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let dateEl = document.querySelector('.location .date');
    dateEl.innerText = dateBuilder(now);

    let tempEl = document.querySelector('.current .temp');
    tempEl.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weatherEl = document.querySelector('.current .weather');
    weatherEl.innerText = weather.weather[0].main;

    let hilowEl = document.querySelector('.hi-low');
    hilowEl.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}