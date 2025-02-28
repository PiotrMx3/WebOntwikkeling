import express from "express";

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");

interface BitcoinData {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  chartName: string;
  bpi: {
    USD: Currency;
    GBP: Currency;
    EUR: Currency;
  };
}

interface Currency {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

async function fetchBitcoin(): Promise<BitcoinData> {
  const response = await fetch(
    "https://sampleapis.assimilate.be/bitcoin/current"
  );
  const data: BitcoinData = await response.json();
  console.log(data);
  return data;
}

app.get("/", async (req, res) => {
  const bitcoin = await fetchBitcoin();
  const html = `
 
 <!DOCTYPE html>
<html lang="nl-Be">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/style.css">
    <title>Bitcoin Price Website</title>
</head>
<body>
     <h1>Bitcoin Current Price</h1>
     <h2>Update at: ${bitcoin.time.updated}</h2>
         <ul>
        <li><strong>${bitcoin.bpi.USD.code}</strong> ${bitcoin.bpi.USD.rate_float}</li>
        <li><strong>${bitcoin.bpi.GBP.code}</strong> ${bitcoin.bpi.GBP.rate_float}</li>
        <li><strong>${bitcoin.bpi.EUR.code}</strong> ${bitcoin.bpi.EUR.rate_float}</li>
    </ul>
</body>
</html>

 `;

  res.type("text/html");
  res.send(html);
});

app.listen(app.get("port"), () => {
  console.log("Applicatie gestart at http://localhost:" + app.get("port"));
});
