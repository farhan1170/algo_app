const Promise = require('bluebird');
const services = require('services'),
  currencyPair = services.db.mongo.cex.currencyPair;


const requestor = require(__dirname+'/../requestor'); 
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
var getData = function (date, symbol1, symbol2) {
  return requestor.requestor.ohlcvRequestor(date,symbol1,symbol2);
}
 
var currentDate = '';
var datevar = new Date();
currentDate = currentDate+datevar.getFullYear().toString();
var month = (datevar.getMonth()+1).toString();
if(month.length === 1){
  month = '0'+month;
}
currentDate = currentDate+month;
var day = datevar.getDate().toString();
if(day.length === 1){
  day = '0'+day;
}
currentDate = currentDate+day;
var currentDateIndex = dates.indexOf(currentDate) -2;
var  findStartDate = function (symbol1, symbol2, date1, date2, lastNull, lastData) {
  console.log(symbol1, symbol2, dates[date1], dates[date2], dates[lastNull], dates[lastData])
  return Promise.props({
    date1Data: getData(dates[date1], symbol1, symbol2),
    date2Data: getData(dates[date2], symbol1, symbol2)
  }).then(function (dateData) {
    console.log('dateData---------------',dateData)
    if(!dateData.date1Data && dateData.date2Data && (date2-date1 === 1) ) {
      return dates[date2];
    }
    else if(dateData.date1Data && dateData.date2Data && (date2-date1 === 1) ) {
      date1 = date1-1;
      date2 = date2-1;
    }
    else if(!dateData.date1Data && !dateData.date2Data && (date2-date1 === 1) ) {
      date1 = date1+1;
      date2 = date2+1;
    }
    else if(!dateData.date1Data && !dateData.date2Data && (date2-date1  >1) ){
      date1 = date2;
      lastNull = date2;
      date2 = Math.ceil( (lastData+ date2)/2 );
    }
    else if(dateData.date1Data && dateData.date2Data && (date2-date1  >1) ){
      lastData = date1;
      date2 = date1
      date1 = Math.floor( (lastNull+ date1)/2 )

    }
    else if(!dateData.date1Data && dateData.date2Data && (date2-date1  >2) ){
      lastData = date2
      lastNull = date1;
      date1 = Math.ceil(((date2+date1)/2)) -1;
    }
    else if(!dateData.date1Data && dateData.date2Data && (date2-date1  ===2) ){
      lastNull = date1;
      lastData = date2;
      date1 = date1+1;
    }
    return findStartDate(symbol1, symbol2, date1, date2,lastNull, lastData)
  }).catch(function (error) {
    console.log(error);
    return null;
  })
}
module.exports = {
  currencyStartDateFinder: function () {
    var  prosessStartDate = function (dbData) {
          console.log('---------currencyStartDateFinder------------------',dbData[0])

      if(dbData.length === 0){
        return;
      }
      if(dbData[0].startDate){
        dbData.shift();
        return prosessStartDate(dbData);
      }
      else{
        return findStartDate(dbData[0].symbol1,dbData[0].symbol2,0, currentDateIndex,0,currentDateIndex).then(function (data) {
          
          let query = {
            symbol1: dbData[0].symbol1,
            symbol2: dbData[0].symbol2
          }
          let updateJSON = {
            startDate: new Date(data.substring(0,4)+'-'+data.substring(4,6)+'-'+data.substring(6,8)),
            ohlcvArchiveDate : new Date(data.substring(0,4)+'-'+data.substring(4,6)+'-'+data.substring(6,8))
          }
          return currencyPair.updateCurrencyPair(query, updateJSON)
        }).then(function (updatedata) {
          dbData.shift();
          return prosessStartDate(dbData)
        })  
      }
    }
    return currencyPair.getAllCurrencyPairs().then(function (dbData) {
      //console.log('dbData>>>>>>>>>>>>>>',dbData)
      if(!dbData){
        dbData = [];
      }
      return prosessStartDate(dbData);
      

    })
  }
}