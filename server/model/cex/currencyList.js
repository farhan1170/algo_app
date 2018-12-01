var Promise = require('bluebird');
var mongoose = require('mongoose');
const functions = require('functions'),
  db = functions.mongo.mongoConnection;
module.exports = {
  currencyPair: function () {
      currencyPairSchema = new mongoose.Schema({
        symbol1: {
          type: String,
          required: true
        },
        symbol2:{
          type: String,
          required: true
        },
        minLotSize:{
          type: Number,
          required: true
        },
        maxLotSize: {
          type: Number,
          required: true
        },
        startDate: Date,
        ohlcvArchiveDate: Date
      })
      //return myDB = mongoose.connection.useDb('algotrade');
      return  db.model('currencyPair', currencyPairSchema); 
    
  },
}