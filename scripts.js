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

            const infoWeather = document
        }
        document.querySelector('.search-box input').value = ''

    });
});
