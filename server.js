require('dotenv').config();
const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const path = require("path");
const cors = require('cors');
const app = express();
app.use(cors());
const config = require("./config");
const port = process.env.PORT || 3000;
app.use("/", express.static("dist/my-canary-ui"));

const headers = {
  apikey: config.attomApiKey,
  Accept: 'application/json'
};

app.get("/propertydetailwithschools", async (req, res, next) => {
  const attomid = req.query.attomid;

  const response = await fetch(
    "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detailwithschools?" +
      new URLSearchParams({
        attomid,
      }),
    {
      headers,
    }
  )
    .then((res) => {
      return res.json();
    });

  res.json(response);
});

app.get("/propertydetail", async (req, res, next) => {
  const address = req.query.address;

  const response = await fetch(
    "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?" +
      new URLSearchParams({
        address,
      }),
    {
      headers,
    }
  ).then((res) => {
    return res.json();
  });

  res.json(response);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, `dist/my-canary-ui/index.html`));
});

app.listen(port, () => {
  console.log("app is started and listening to the port: ", port);
});
