const services = require('services'),
  commonHttp =  services.http.commonHttp;

const parser = require('./parser');
const currencyLimitController = require(__dirname+'/../currencyLimits/controller/currencyUpdater');
module.exports = {
  requestOhlCVData : function (uri, symbol1, symbol2) {
    let options = {
      url: uri,
      method: 'GET',
      body: {}
    }
    return commonHttp.httpGenertor(options).then(function (ohlcvResponse) {
      if(!ohlcvResponse){
        return;
      }
      return parser.ohlcvParser(ohlcvResponse, symbol1, symbol2).then(function (ohlcvInsert) {
        let uriSplitter = uri.split('/');
        let currentDate = uriSplitter[uriSplitter.length - 3];
        let dateStamp = new Date(currentDate.slice(0,4)+'-'+ currentDate.slice(4,6)+'-'+ currentDate.slice(6,8))
        return currencyLimitController.addStartDate(symbol1, symbol2, dateStamp);
      })
    })
  }
}