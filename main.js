const api = {
    key: "1cff1a16da57c22ebdd110d4db28b4fb",
    base:"https://api.openweathermap.org/data/2.5/"
}
const ggApi = {
    key: "AIzaSyD6xYeyLyWvD-oKKkuAm2iQ1rw_q1mz8aw"
}
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress',setQuery);
function setQuery(evt) {
    if(evt.keyCode == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    })
    .then(displayResults)
}
function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText=weather.weather[0].main;
    let hilow= document.querySelector('.hi-low');
    hilow.innerText =`${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];
    let day=days[d.getDay()];
    let date= d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}