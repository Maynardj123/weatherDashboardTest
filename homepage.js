var apiKey = "00707101834c4622f9ebb2e26b8610a6";
var temp = document.querySelector ('.temp');
var wind = document.querySelector ('.wind');
var humidity = document.querySelector ('.humidity');
var temp2 = document.querySelector ('.temp2');
var wind2 = document.querySelector ('.wind2');
var humidity2 = document.querySelector ('.humidity2');
var temp3 = document.querySelector ('.temp3');
var wind3 = document.querySelector ('.wind3');
var humidity3 = document.querySelector ('.humidity3');
var temp4 = document.querySelector ('.temp4');
var wind4 = document.querySelector ('.wind4');
var humidity4 = document.querySelector ('.humidity4');
var temp5 = document.querySelector ('.temp5');
var wind5 = document.querySelector ('.wind5');
var humidity5 = document.querySelector ('.humidity5');
var temp6 = document.querySelector ('.temp6');
var wind6 = document.querySelector ('.wind6');
var humidity6 = document.querySelector ('.humidity6');

// select the search button
var searchbtn = document.querySelector ('#searchbtn');

// select for atlanta button
// var atlantabtn = document.querySelector ('#atlanta');

var cityArray = JSON.parse(localStorage.getItem('cities') )|| [];

var  cityHistory = document.querySelector('.searchHistorys');

function getCurrent (currentData) {
console.log(currentData);
temp.textContent = currentData.list[0].main.temp;
wind.textContent = currentData.list[0].wind.speed;
humidity.textContent = currentData.list[0].main.humidity;
}
// function getF(currentK) {
//   temp.textContent =((temp-273.15)*1.8)+32;
// } 

// declaring the getForecast function 
function getForecast (forecastData){
  console.log(forecastData);
  for (i=0; i< forecastData.list.length; i+=8){
    console.log(forecastData.list[i]);

    temp2.textContent = forecastData.list[7].main.temp;
    wind2.textContent = forecastData.list[7].wind.speed;
    humidity2.textContent = forecastData.list[7].main.humidity;
    
    temp3.textContent = forecastData.list[15].main.temp;
    wind3.textContent = forecastData.list[15].wind.speed;
    humidity3.textContent = forecastData.list[15].main.humidity;

    temp4.textContent = forecastData.list[23].main.temp;
    wind4.textContent = forecastData.list[23].wind.speed;
    humidity4.textContent = forecastData.list[23].main.humidity;

    temp5.textContent = forecastData.list[31].main.temp;
    wind5.textContent = forecastData.list[31].wind.speed;
    humidity5.textContent = forecastData.list[31].main.humidity;

    temp6.textContent = forecastData.list[39].main.temp;
    wind6.textContent = forecastData.list[39].wind.speed;
    humidity6.textContent = forecastData.list[39].main.humidity;
    
  }
}
// function temperatureConverter(valNum) {
//   valNum = parseFloat(valNum);
//   temp =((temp-273.15)*1.8)+32;
// }


// create function to return lat and lon
function getGeo (city){

    var geoUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

    fetch(geoUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            // console.log(data);
            getCurrent(data);
            getForecast(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      });
}
// runs a function called from the searchbutton listener, it will create a button from the information from the local storage making them clickable
 function historyButtons () {
  cityHistory.innerHTML = ''
  for (var i = 0; i < cityArray.length; i++){
    var cityBtn = document.createElement('li');
    cityBtn.setAttribute('class', 'btnC')
    cityBtn.innerHTML = cityArray[i];
    cityHistory.appendChild(cityBtn);
  }
}

$(document).on('click', '.btnC', function(){
  getGeo($(this).text())

})

// function searchCity(city){
// console.log(city)
// getGeo()
// }

// create click event on the search btn
searchbtn.addEventListener('click',function(event){
    event.preventDefault();
    // select the inputField from the html
    var inputField = document.querySelector ('#search');
    // get the value user type into the inputField
    var inputValue = inputField.value; 
    // if(cityArray.indexof(inputValue)== -1){
    cityArray.push(inputValue)
    localStorage.setItem('cities', JSON.stringify(cityArray));
    historyButtons();
    // call get geo function and pass the value of the city name into that function
    getGeo(inputValue);
});



// atlantabtn.addEventListener('click',function(event){
//   event.preventDefault();
//   // var geoUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${atlanta}&appid=${apiKey}`
//   var btnClick = document.querySelector ('#atlanta');
//   var atlanta1 = btnClick.value;

//   getGeo(atlanta1);
// });

historyButtons();

