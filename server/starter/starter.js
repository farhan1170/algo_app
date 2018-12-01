const express = require("express");
const app = express();
var router = express.Router();
console.log('+++++++++++++++++',__dirname)
var cron = require('./cron')

app.listen(3004, function () {
  console.log("App listening on port 3004!");
})

