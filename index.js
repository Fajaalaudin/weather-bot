const axios = require("axios");

async function checkWeatherAndMarket() {
  try {
    // 1️⃣ NOAA
    const weather = await axios.get(
      "https://api.weather.gov/gridpoints/OKX/33,35/forecast"
    );

    const today = weather.data.properties.periods[0];
    const forecastTemp = today.temperature;

    // 2️⃣ Polymarket example (NYC temp market)
    const market = await axios.get(
      "https://gamma-api.polymarket.com/markets"
    );

    // Cari market yang ada NYC
    const nycMarket = market.data.find(m =>
      m.question && m.question.includes("NYC")
    );

    console.log("NOAA Temperature:", forecastTemp);

    if (nycMarket) {
      console.log("Market Question:", nycMarket.question);
      console.log("Market Price:", nycMarket.outcomePrices);
    } else {
      console.log("NYC market not found");
    }

    console.log("----------------------------");

  } catch (err) {
    console.error("Error:", err.message);
  }
}

setInterval(checkWeatherAndMarket, 120000);
checkWeatherAndMarket();
const http = require("http");

http.createServer((req, res) => {
  res.write("Bot is running");
  res.end();
}).listen(process.env.PORT || 3000);
