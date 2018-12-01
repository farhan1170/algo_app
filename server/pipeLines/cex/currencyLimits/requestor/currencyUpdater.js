const config= require('config');
const services = require('services');
const parser = require(__dirname+'/../parser');
module.exports = {
  requestCurrencies: function () {
    let options =  {
      url:  config.cex.url + config.cex.currencyLimits.ext,
      method: config.cex.currencyLimits.method,
      body: {}
    }
    return services.http.commonHttp.httpGenertor(options).then(function (responseData) {
      let parsedData =  parser.currencyUpdater.currencyPairParser(responseData);
      if(parsedData){
        return parsedData
      } 
      else{
        return [];
      }     
    }).catch(function (error) {
      throw error;
    })

  }
}