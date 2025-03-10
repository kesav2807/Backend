const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const dbConnect = require("./config/dbConfig");
const Router = require("./router/router");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(Router);
dbConnect;

app.listen(4040, () =>
  console.log(`Server running on port : http://localhost:4040`)
);
