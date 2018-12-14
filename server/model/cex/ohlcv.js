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
      timeStampCex:{ 
        type: Number,
        required: true
      },
      timeStamp:{
        type: Number,
        required: true
      },
      dateCex:{
        type: Number,
        required: true
      },
      date:{
        type: Date,
        required: true
      } 
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
      timeStampCex:{ 
        type: Number,
        required: true
      },
      timeStamp:{
        type: Number,
        required: true
      },
      dateCex:{
        type: Number,
        required: true
      },
      date:{
        type: Date,
        required: true
      } 
    })
    //return myDB = mongoose.connection.useDb('algotrade');
    return  db.model('ohlcvOneDay', ohlcvOneDaySchema); 
  },
  ohlcvOneHour: function () {
    ohlcvOneHourSchema = new mongoose.Schema({
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
      timeStampCex:{ 
        type: Number,
        required: true
      },
      timeStamp:{
        type: Number,
        required: true
      },
      dateCex:{
        type: Number,
        required: true
      },
      date:{
        type: Date,
        required: true
      } 
    })
    //return myDB = mongoose.connection.useDb('algotrade');
    return  db.model('ohlcvOneHour', ohlcvOneHourSchema); 
  }

}