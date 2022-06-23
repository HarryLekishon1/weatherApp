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
//display the weather on document
function displayWeather(data) {
    //ensure a value is typed and clears form when nothing is typed and enter clicked
    if(searchcity.value === ''){
        city.innerText = 'Please search a city'
          temprature.innerText = '';
        desc.innerText = '';
        icond.src = '';
        humidity.innerText = '';
        winds.innerText = '';
    }//return message if city doesnt exist
    else if(data.cod == "404"){
        city.innerText = `${searchcity.value} isn't a valid city name`;
        temprature.innerText = '';
        desc.innerText = '';
        icond.src = '';
        humidity.innerText = '';
        winds.innerText = '';
    }else{//return data when a valid entry is enterd
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
//event listener for the search button 
function search(){
    searchButton.addEventListener('click' ,() => {
        getWeather(searchcity.value);
    });
    
}
//event listener for enter button
function search2(){
    searchcity.addEventListener('keyup' , (event) => {
        if(event.key === "Enter"){
        getWeather(searchcity.value);
        }
    });
    
}
//event listener to get current location weather
locationBtn.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSucces, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});
//get coordinates if browers supports location
function onSucces(position) {
    const {latitude, longitude} =position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=9d7cde1f6d07ec55650544be1631307e`;
    fetchData(); 
}
//fetch current location weather
function fetchData() {
    fetch(api)
    .then(resp => resp.json())
    .then((data) => displayWeather2(data))
}
//display current location weather
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
    // if any error occur while getting user location then we'll show it in city element
    city.innerText = error.message;
    city.classList.add("error");
}

