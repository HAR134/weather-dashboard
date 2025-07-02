const apiKey = "f32cac6d718857fe2686d1225fb89745"; // Replace with your API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                weatherInfo.innerHTML = `<p class="error">City not found. Please try again.</p>`;
                weatherInfo.style.display = "block";
                return;
            }

            const { main, weather, name } = data;
            weatherInfo.innerHTML = `
                <h2>${name}</h2>
                <p>Temperature: ${main.temp}°C</p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Condition: ${weather[0].description}</p>
                <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="Weather Icon">
            `;
            weatherInfo.style.display = "block";
        })
        .catch(() => {
            weatherInfo.innerHTML = `<p class="error">Error fetching data. Please try again later.</p>`;
            weatherInfo.style.display = "block";
        });
});
