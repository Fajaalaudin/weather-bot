const axios = require("axios");
const http = require("http");

// =============================
// WEATHER + MARKET CHECK
// =============================

async function checkWeatherAndMarket() {
  try {
    console.log("----- SCAN START -----");

    // 1️⃣ NOAA Weather (NYC grid)
    const weather = await axios.get(
      "https://api.weather.gov/gridpoints/OKX/33,35/forecast"
    );

    const today = weather.data.properties.periods[0];
    const forecastTemp = today.temperature;

    console.log("NOAA Temperature:", forecastTemp);
    console.log("Forecast:", today.shortForecast);

    // 2️⃣ Fetch EVENTS instead of markets
const events = await axios.get(
  "https://gamma-api.polymarket.com/events?active=true&limit=100"
);

console.log("=== WEATHER EVENTS ===");

events.data
  .filter(e => {
    if (!e.title) return false;

    const title = e.title.toLowerCase();

    return (
      title.includes("temperature") ||
      title.includes("high temperature") ||
      title.includes("weather") ||
      title.includes("new york") ||
      title.includes("chicago") ||
      title.includes("boston")
    );
  })
  .forEach(e => {
    console.log("Weather Event:", e.title);
    console.log("-------------------");
  });
    
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
