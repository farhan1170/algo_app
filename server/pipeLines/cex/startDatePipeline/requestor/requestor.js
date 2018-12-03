const services = require('services');
const config = require('config');
const parser = require(__dirname+'/../parser')
module.exports = {
  ohlcvRequestor : function (date, symbol1, symbol2) {
    let options = {
      url: 'https://cex.io/api/ohlcv/hd/'+date+'/'+symbol1+'/'+symbol2,
      method : 'GET',
      body: {}
    }
    //console.log(options.url)
    return services.http.commonHttp.httpGenertor(options).then(function (resData) {

      if(resData.responseBody){
        if(typeof resData.responseBody === 'string'){
          if(resData.responseBody === 'null' || resData.responseBody === '[]'){
            return false
          }
          else{
            return true
          }
        }
      }else{
        return false
      }
    })
  }
}