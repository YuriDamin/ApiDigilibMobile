const express = require('express');
const cors = require('cors');

const app = express();
//var mongoose = require('mongoose');
var db = require('./db');

const dotenv = require("dotenv").config();
const routes = require("./routes");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/uploads", express.static(__dirname + "/uploads"));

// request, response
app.get("/", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ ok: true });
});

// initialize app routes 
routes(app);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
