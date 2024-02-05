function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude =position.coords.latitude
                const longitude =position.coords.longitude
                console.log('latitude', latitude);
                console.log('longitude', longitude);
    
                getweatherByCordinates(latitude, longitude)
            },
            error => {
                console.error('Error getting location', error);
            }
        )
    } else{
        console.error('geolocation is not suppported by this browser');
    }
}

function getweatherByCordinates(latitude, longitude) {
    const apiKey =
}