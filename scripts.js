const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector('.weather-details');
// const container = document.querySelector(".container");
// const container = document.querySelector(.container);

search.addEventListener('click', () =>{

    const APIKEY ='012fd6ecfa215db82b32c682e4c1cfdd';
    const city = document.querySelector('.search-box input').value;

    if(city == ""){
        return;

    fetch(``)
});
