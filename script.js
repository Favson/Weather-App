function getWeather() {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const cityInput = document.getElementById('city-input').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherResult = document.getElementById('weather-result');
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const cityName = data.name;

            const resultText = `Current weather in ${cityName}: ${temperature}°C, ${description}`;
            weatherResult.textContent = resultText;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const weatherResult = document.getElementById('weather-result');
            weatherResult.textContent = 'Error fetching weather data. Please try again.';
        });
}
