var Promise = require('bluebird');
var mongoose = require('mongoose');
const functions = require('functions'),
  db = functions.mongo.mongoConnection;
module.exports = {
  ohlcvOneMinute: function () {
    ohlcvOneMinuteSchema = new mongoose.Schema({
      symbol1: {
        type: String,
        required: true
      },
      symbol2:{
        type: String,
        required: true
      },
      open:{
        type: Number,
        required: true
      },
      high: {
        type: Number,
        required: true
      },
      low: {
        type: Number,
        required: true
      },
      close: {
        type: Number,
        required: true
      },
      volume: {
        type: Number,
        required: true
      },
      timeInMinute: Number,
      dayDate: Date
    })
    //return myDB = mongoose.connection.useDb('algotrade');
    return  db.model('ohlcvOneMinute', ohlcvOneMinuteSchema); 
  },
  ohlcvOneDay: function () {
    ohlcvOneDaySchema = new mongoose.Schema({
      symbol1: {
        type: String,
        required: true
      },
      symbol2:{
        type: String,
        required: true
      },
      open:{
        type: Number,
        required: true
      },
      high: {
        type: Number,
        required: true
      },
      low: {
        type: Number,
        required: true
      },
      close: {
        type: Number,
        required: true
      },
      volume: {
        type: Number,
        required: true
      },
      timeInDay: Number,
      dayDate: Date
    })
    //return myDB = mongoose.connection.useDb('algotrade');
    return  db.model('ohlcvOneDay', ohlcvOneDaySchema); 
  }

}