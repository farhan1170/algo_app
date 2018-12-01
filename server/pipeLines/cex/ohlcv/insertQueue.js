const services = require('services'),
  currencyPairs = services.db.mongo.cex.currencyPair;

const config = require('config'),
  ohlcv = config.cex.url+ config.cex.ohlcv.ext,
  queueName = config.cex.queueNames.cexohlcv;

const functions = require('functions'),
  rabbitMQ = functions.rabbitMQ; 

var leapYear = function (year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

var getMaxDate = function(month, year){
  if([1,3,5,7,8,10,12].indexOf(month) >=0){
    return 31
  }
  else if([4,6,9,11].indexOf(month) >=0){
    return 30
  }
  else if(month === 2 && leapYear( year)){
    return 29
  }
  else{
    return 28
  }
}


let dateCreator = function () {
  let monthArray = [1,2,3,4,5,6,7,8,9,10,11,12];
  let yearArray = [];
  let dates = [];
  for(let i = 2008;i <= new Date().getFullYear(); i++){
    for(let j = 1; j<= 12; j++){
      for(let k = 1; k<=getMaxDate(j); k++){
        let yearString = i.toString();
        let monthString = j.toString();
        if(monthString.length === 1){
          monthString = '0'+monthString;
        }
        let day = k.toString();
        if(day.length === 1){
          day = '0'+day;
        }
        dates.push(yearString+monthString+day);
      } 
    }
  }
  return dates;
}
var createDate = function (dateObj) {
  let dateStr = '';
  let year = dateObj.getFullYear().toString();
  let month = dateObj.getMonth()+1;
  let monthString = month < 10? '0'+month : month.toString();
  let date = dateObj.getDate()+1;
  let dateString = date < 10? '0'+date : date.toString();
  dateStr = year + monthString+dateString;
  return dateStr;
}


var processSingleCurrency = function (currency) {
  let d = new Date();
  let yesterdayDate = new Date(d.getDate() - 1 );
  let yesterdayStr = createDate(yesterdayDate);
  let startDate = new Date(currency.startDate);
  let startDateStr = createDate(startDate);
  let dates = createDate();
  let yesterdayIndex = dates.indexOf(yesterdayStr);
  let startDateIndex = dates.indexOf(startDateStr);
  for (let i = startDateIndex; i <= yesterdayIndex; i++){
    let dataToQueue = ohlcv+'/'+dates[i]+'/'+currencyPair.symbol1+'/'+currencyPair.symbol2;
    rabbitMQ.inserToQueue(queueName, dataToQueue)
  }
} 

var processCurrencies = function (currencies) {
  if(currencies.length === 0){
    return;
  }
  let currency = currencies[0];
  return processSingleCurrency(currency).then(function (singleCurrencyData) {
    currencies.shift();
    return processCurrencies(currencies);
  }).catch(function (error) {
    return processCurrencies(currencies);
  })
}
module.exports = {
  createOhlcvQueue: function () {
    currencyPair.getAllCurrencyPairs().then(function (currencies) {
      return processCurrencies(currencies);    
    })
  }
}