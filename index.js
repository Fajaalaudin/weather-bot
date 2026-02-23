const axios = require("axios");
const http = require("http");

// =============================
// WEATHER + MARKET CHECK
// =============================

async function checkWeatherAndMarket() {
  try {
    console.log("----- SCAN START -----");

    // 1️⃣ NOAA Weather
    const weather = await axios.get(
      "https://api.weather.gov/gridpoints/OKX/33,35/forecast"
    );

    const today = weather.data.properties.periods[0];
    const forecastTemp = today.temperature;

    console.log("NOAA Temperature:", forecastTemp);
    console.log("Forecast:", today.shortForecast);

    // 2️⃣ Polymarket Markets
    const market = await axios.get(
      "https://gamma-api.polymarket.com/markets"
    );

    const nycMarket = market.data.find(m =>
      m.question && m.question.includes("NYC")
    );

    if (nycMarket) {
      console.log("Market Question:", nycMarket.question);
      console.log("Outcome Prices:", nycMarket.outcomePrices);
    } else {
      console.log("NYC market not found");
    }

    console.log("----- SCAN END -----");
    console.log("");

  } catch (err) {
    console.error("Error:", err.message);
  }
}

// Run every 2 minutes
setInterval(checkWeatherAndMarket, 120000);
checkWeatherAndMarket();

// =============================
// KEEP RAILWAY ALIVE (WEB SERVER)
// =============================

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Weather bot is running");
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server listening on port", process.env.PORT || 3000);
});
