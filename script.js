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
    }else{
        const country = data.sys.country; 
        const{name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name,icon,description,temp,humidity,speed)
 
        city.innerText = name +" ,"+ country;
        temprature.innerText =  temp+"°C";
         icond.src = "https://openweathermap.org/img/wn/" + icon + ".png"
         desc.innerText = description;
         humidity.innerText = humidity
         winds.innerText = "speed of wind = "+ speed+ " km/h";
         
     }

}

locationBtn.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSucces, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});

function onSucces(position) {
    const {latitude, longitude} =position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=9d7cde1f6d07ec55650544be1631307e`;
    fetchData(); 
}

function fetchData() {
    fetch(api)
    .then(resp => resp.json())
    .then((data) => displayWeather2(data))
}

function displayWeather2(data){
    const country = data.sys.country; 
    const{name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    console.log(name,icon,description,temp,humidity,speed);

    city.innerText = name +" ,"+ country;
    temprature.innerText =  temp+"°C";
     icond.src = "https://openweathermap.org/img/wn/" + icon + ".png"
     desc.innerText = description;
     humidity.innerText = humidity
     winds.innerText = "speed of wind = "+ speed+ " km/h";

}

function onError(error){
    // if any error occur while getting user location then we'll show it in infoText
    city.innerText = error.message;
    city.classList.add("error");
}

function search(){
    searchButton.addEventListener('click' ,() => {
        getWeather(searchcity.value);
    });
    
}