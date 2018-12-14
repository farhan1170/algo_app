const controller = require('./controller');

const Promise = require('bluebird');

var splitter = function (arr, str,time, symbol1, symbol2) {
  let bracketSplitted = arr.split(str);
  if(bracketSplitted.length >= 1){

    bracketSplitted[0] = bracketSplitted[0].slice(2,bracketSplitted[0].length -1);
    bracketSplitted[bracketSplitted.length -1] = bracketSplitted[bracketSplitted.length -1].slice(0, -2);
  }
  let dataObjects = [];
  bracketSplitted.forEach(function (dataStr) {
    var dataArr = dataStr.split(',');
    if(dataArr.length === 6){
      let dataObject = {
        symbol1: symbol1,
        symbol2: symbol2,
        dateCex: time,
        timeStampCex: Number(dataArr[0]),
        open: Number(dataArr[1]),
        high: Number(dataArr[2]),
        low: Number(dataArr[3]),
        close: Number(dataArr[4]),
        volume: Number(dataArr[5]),
        date: new Date(time.toString().substring(0,4)+'-'+time.toString().substring(4,6)+'-'+time.toString().substring(6,8)),
        timeStamp:  Number(dataArr[0])*1000
      }
      dataObjects.push(dataObject);
    }
  })
  return dataObjects;
}

module.exports = {
  ohlcvParser: function (data, symbol1, symbol2) {
    if(!data.responseBody){
      return;
    }
    data = data.responseBody;

    try{
      data = JSON.parse(data);

    }catch(error){
      return;
    }
    let time = '';
    if(data.time){
      time = data.time;
    }
    else{
      return;
    }
    let data1mStr = '';
    let data1hStr = '';
    let data1dStr = '';
    let oneMPromise = null;
    let oneHPromise = null;
    let oneDPromise = null;
    if(data.data1m){
      data1mStr = data.data1m;
      data1mStr = splitter(data1mStr, '],[',time, symbol1, symbol2);
      oneMPromise = controller.insertOhlcv1mController(data1mStr)
    }
    if(data.data1h){
      data1hStr = data.data1h;
      data1hStr = splitter(data1hStr, '],[',time ,symbol1, symbol2);
      oneHPromise = controller.insertOhlcv1hController(data1hStr)
    }
    if(data.data1d){
      data1dStr = data.data1d;
      data1dStr = splitter(data1dStr, '],[',time, symbol1, symbol2);
      oneDPromise = controller.insertOhlcv1dController(data1dStr)
    }
    return Promise.props({
      m1: oneMPromise,
      h1: oneHPromise,
      d1: oneDPromise
    }).then( (data) => {
      console.log('++++++++++++++came in promise props++++++++++++++',data)
      return data;
    } ).catch( (error) => {
      console.log('error happend ...  ',error);
      return ;
    } )
  }
}