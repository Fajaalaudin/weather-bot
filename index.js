const axios = require("axios");

async function checkWeather() {
  try {
    const response = await axios.get(
      "https://api.weather.gov/gridpoints/OKX/33,35/forecast"
    );

    const today = response.data.properties.periods[0];

    console.log("City: NYC");
    console.log("Temperature:", today.temperature);
    console.log("Forecast:", today.shortForecast);
    console.log("Time:", new Date().toLocaleString());
    console.log("---------------------------");

  } catch (error) {
    console.error("Error:", error.message);
  }
}

setInterval(checkWeather, 60000);
checkWeather();
