const apiKey = "9d7cde1f6d07ec55650544be1631307e";

const city = document.querySelector(".city");
const temprature = document.querySelector('.temp');
const icond = document.querySelector(".icon");
const humidity = document.querySelector(".humidity")
const winds = document.querySelector(".wind")
const desc = document.querySelector(".description")
const searchcity = document.querySelector(".search-bar")
const searchButton = document.querySelector(".search button")
const locationBtn = document.querySelector(".locationBtn")

search();
search2()

const getWeather = function(city){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="
    + city + "&units=metric&appid=" 
    +apiKey)
   .then((resp) => resp.json())
   .then((data) => displayWeather(data))
}

getWeather(city);
function displayWeather(data) {
    if(searchcity.value === ''){
        city.innerText = 'Please search a city'
    }
    else if(data.cod == "404"){
        city.innerText = `${searchcity.value} isn't a valid city name`;
        temprature.innerText = '';
        desc.innerText = '';
        icond.src = '';
        humidity.innerText = '';
        winds.innerText = '';
    }

}