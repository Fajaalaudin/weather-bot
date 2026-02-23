const axios = require("axios");
const http = require("http");
const { Wallet } = require("ethers");
const { ClobClient } = require("@polymarket/clob-client");

// ================= CONFIG =================

const PRIVATE_KEY = process.env.PRIVATE_KEY;

// ================= SETUP =================

if (!PRIVATE_KEY) {
  console.error("PRIVATE_KEY not found!");
  process.exit(1);
}

const wallet = new Wallet(PRIVATE_KEY);

const client = new ClobClient({
  chainId: 137,
  signer: wallet,
});

// ================= TEST CONNECTION =================

async function testConnection() {
  try {
    console.log("----- TEST CLOB CONNECTION -----");

    const markets = await client.getMarkets();

    console.log("Connected.");
    console.log("Total markets fetched:", markets.length);

    // Print first 5 markets
    markets.slice(0, 5).forEach(m => {
      console.log("Market:", m.slug);
    });

  } catch (err) {
    console.error("CLOB ERROR:", err.message);
  }
}

setInterval(testConnection, 120000);
testConnection();

// ================= KEEP RAILWAY ALIVE =================

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Weather auto trade bot running");
});

server.listen(process.env.PORT || 3000);
