const config = require('config'); 
const mongoose = require('mongoose');
const Promise = require('bluebird');

//let usernamePassword = config.constants.database.mongo.username+':'+config.constants.database.mongo.password+'@'
let mongoUrl = config.constants.database.mongo.server;

var db =  mongoose.createConnection(mongoUrl);

module.exports = {
  mongoConnection: db
}




