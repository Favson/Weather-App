const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () =>{
    const APIKEY ='012fd6ecfa215db82b32c682e4c1cfdd';
    const city = document.querySelector('.search-box input').value;

    if(city == "")
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`).then(Response => Response.json()).then(json=> {

    if(json.cod == 404){
        cityHide.textContent= city;
        container.style.height='400px'; 
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        // error404.classList.add('active')
        return;
    }
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if(cityHide.textContent == city){
            return;
        }else{
            cityHide.textContent = city;
            cityHide.style.display = 'block'
            container.style.height='555px' 
            container.classList.add('active')
            weatherBox.classList.add('active')
            weatherDetails.classList.add('active')
            error404.classList.remove('active')
            // image.style.height = '200px'

            // setTimeout(() => {
            // container.classList.remove('active')
            // }, 2500);

            if(json.weather[0].main == 'Clouds') {
                image.src='Images/clouds.png'
            }else if (json.weather[0].main == 'Clear'){
                image.src='Images/clear sky.png'
            }else if (json.weather[0].main == 'Rain'){
                image.src='Images/rain.png'
            }else if (json.weather[0].main == 'Snow'){
                image.src='Images/snow.png'
            }else if (json.weather[0].main == 'Mists'){
                image.src='Images/mist.png'
            }else if (json.weather[0].main == 'Haze'){
                image.src='Images/haze.png'
            }else if(json.weather[0].main == ''){
                image.src = 'Images/not-found.png'
            }else{
                image.src='Images/default.png'
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
            description.innerHTML = `${json.weather[0].description}`
            humidity.innerHTML =`${json.main.humidity}%`
            wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`

            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity= document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = 'clone-info-weather'
            elCloneInfoWeather.classList.add('active-clone');

            elCloneInfoHumidity.id = 'clone-info-humidity'
            elCloneInfoHumidity.classList.add('active-clone');  

            elCloneInfoWind.id = 'clone-info-wind'
            elCloneInfoWind.classList.add('active-clone');  

            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);

                infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);

                infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
            }, 2200);

            const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            const totalCloneInfoWeather = cloneInfoWeather.length;
            const cloneInfoWeatherFirst = cloneInfoWeather[0];

            const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            const totalCloneInfoHumidity = cloneInfoHumidity.length;
            const cloneInfoHumidityFirst = cloneInfoHumidity[0];

            const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
            const totalCloneInfoWind = cloneInfoWind.length;
            const cloneInfoWindFirst = cloneInfoWind[0];

            if(totalCloneInfoWeather > 0){
                cloneInfoWeatherFirst.classList.remove('active-clone')
                cloneInfoHumidityFirst.classList.remove('active-clone')
                cloneInfoWindFirst.classList.remove('active-clone');

                setTimeout(() => {
                    cloneInfoWeatherFirst.remove();
                    cloneInfoHumidityFirst.remove();
                    cloneInfoWindFirst.remove()
                }, 2200);
            }
        }
        document.querySelector('.search-box input').value = ''

    });
});

const getWeatherWithLocation = document.getElementById('getWeatherWithLocation')
getWeatherWithLocation.addEventListener('click',()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);


                getWeatherByCoordinates(latitude, longitude);
            },
            error => {
                console.error('Error getting location:', error);
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
})

function getWeatherByCoordinates(latitude, longitude) {
    const apiKey = '012fd6ecfa215db82b32c682e4c1cfdd';

    // Make an API request to OpenWeatherMap using coordinates
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            // Extract relevant weather information

            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const description = data.weather[0].description;
            const windSpeed = data.wind.speed;

            // cityHide.textContent = city;
            cityHide.style.display = 'block'
            // cityHide.textContent = `${location}`
            container.style.height='555px' 
            container.classList.add('active')
            weatherBox.classList.add('active')
            weatherDetails.classList.add('active')
            error404.classList.remove('active')

            // Update HTML content
            const temp =document.querySelector('.temperature')
            const des = document.querySelector('.description')
            const winds = document.querySelector('.windDisplay')
            const hum = document.querySelector('.humidityDisplay')

            temp.innerText = `${(data.main.temp).toFixed(1)}°C`
            des.innerHTML = data.weather[0].description
            winds.innerHTML = `${data.wind.speed} km/h`
            hum.innerHTML = `${data.main.humidity} %`
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}