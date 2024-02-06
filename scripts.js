const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector('.weather-details');
// const container = document.querySelector(".container");
// const container = document.querySelector(.container);

search.addEventListener('click', () =>{
    const APIKEY ='012fd6ecfa215db82b32c682e4c1cfdd';
    const city = document.querySelector('.search-box input').value;

    if(city == "")
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`).then(Response => Response.json()).then(json=> {

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        // const image = document.querySelector('.weather-details img')

        switch (json.weather[0].main) {
            case 'Clear':
                image.src='images/clear sky.png'
                break;

            case 'Rain':
                image.src='images/rain.png'
                break;
            case 'Snow':
                image.src='images/snow.png'
                break;
            case 'clouds':
                image.src='images/clouds.png'
                break;
            case 'Mist':
                image.src='images/mist.png'
                break;
            case 'Haze':
                image.src='images/haze.png'
                break;
            default:
                image.src='images/not-found.png'
        }
    });
});
