const config = require('config'); 
const mongoose = require('mongoose');
const Promise = require('bluebird');

let mongoUrl = config.constants.database.mongo.server+'/'+config.constants.database.mongo.db ;

var db =  mongoose.createConnection(mongoUrl);

module.exports = {
  mongoConnection: db
}




