const services = require('services'),
  commonHttp =  services.http.commonHttp;
module.exports = {
  requestOhlCVData : function (uri) {
    let options = {
      url: uri,
      method: 'GET',
      body: {}
    }
    return commonHttp.httpGenertor(options).then(function (ohlcvResponse) {
      console.log('ohlcvResponse =====================',ohlcvResponse)
    })
  }
}