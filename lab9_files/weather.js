function fetchWeather() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=43.0481&longitude=-76.1474&current=temperature_2m,precipitation,cloud_cover&temperature_unit=fahrenheit&precipitation_unit=inch";
    
    fetch(url).then(response => response.json()).then(data => {
        if (data && data.current) {
            document.getElementById("temperature").textContent = data.current.temperature_2m;
            document.getElementById("precipitation").textContent = data.current.precipitation;
            
            const cloudCover = data.current.cloud_cover;
            if (cloudCover > 50) {
                document.getElementById("cloud-icon").textContent = "☁️";
            } else {
                document.getElementById("cloud-icon").textContent = "☀️";
            }
        }
    });
}

fetchWeather();