const express = require("express");
const app = express();
const redis = require("redis");

const client = redis.createClient();
client.connect();
client.on("error", (err) => console.log("Redis Client Error", err));

app.get("/jobs", async (req, res) => {
  const allJobsString = await client.get("himalaya");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(JSON.parse(allJobsString));
  // await client.disconnect();
});

const port = 4000;
app.listen(port, () => {
  console.log(`server is now running on port ${port}...`);
});
