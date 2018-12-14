const services = require('services');
  archivedData = services.db.mongo.cex.archivedData;
const Promise = require('bluebird');

var  findAndInsert = function (dataArr, type) {
  console.log('dataArr==================>',dataArr.length, type)
  if(dataArr.length === 0){
    return new Promise( (resolve, reject) =>{
      resolve('ok');
    } );
  }
  else{
    console.log('+++++++++>>>>>>>>>>',dataArr[0]);
    let data = dataArr[0];
    let findJSON = {
      dateCex: data.time,
      timeStampCex: data.timeStamp,
      symbol1: data.symbol1,
      symbol2: data.symbol2
    }
    let resultdata = null;
    if (type === '1m'){
      resultdata = archivedData.ohlcv1mGet(findJSON);  
    }
    if( type === '1h' ){
      resultdata = archivedData.ohlcv1hGet(findJSON); 
    }
    if( type === '1d' ){
      resultdata = archivedData.ohlcv1dGet(findJSON); 
    }

    return resultdata.then(function (data1m) {
      if(!data1m){
        return new Promise( (resolve, reject) =>{
          resolve('error')
        })
      }
      else if(data1m.length){
        return new Promise( (resolve, reject) =>{
          resolve('ok')
        })
      }
      else{
        if (type === '1m'){
            return archivedData.ohlcv1mAdd(dataArr[0]);  
        }
        if( type === '1h' ){
          return archivedData.ohlcv1hAdd(dataArr[0]); 
        }
        if( type === '1d' ){
          return archivedData.ohlcv1dAdd(dataArr[0]); 
        }
      }
    }).then( (something) =>{
      dataArr.shift();
      console.log('came in then ...........',something);
      console.log('calling ...........',dataArr.length, type);
      
      return findAndInsert(dataArr, type);
    } ).catch( (  error ) =>{
      dataArr.shift();
      console.log('calling ...........',dataArr.length, type);
      console.log('came in catch ...........',error);
      return findAndInsert(dataArr,type);
    } )
  }
} 
module.exports = {
  insertOhlcv1mController: function (dataArr) {
    return findAndInsert(dataArr , '1m');
  },
  insertOhlcv1hController: function (dataArr) {
    return findAndInsert(dataArr , '1h');
  },
  insertOhlcv1dController: function (dataArr) {
    return findAndInsert(dataArr , '1d');
  }
}