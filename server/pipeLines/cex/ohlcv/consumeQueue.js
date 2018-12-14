const functions = require('functions'),
  rabbitMQ = functions.rabbitMQ;

const requestor = require('./requestor');

var processQueue = function (uri) {
  let uris = uri.split('/');
  let symbol2 = uris[uris.length - 1]
  let symbol1 = uris[uris.length - 2]
  return requestor.requestOhlCVData(uri, symbol1, symbol2);
}

const config = require('config'),
  cexohlcv = config.cex.queueNames.cexohlcv ;
module.exports = {
  ohlcvConsumer: function(){
    console.log('ohlcvConsumer came in -------------------------')
    let channel = rabbitMQ.channel;
    let secs = 1;
    return channel.then(function (ch) {
      return ch.consume(cexohlcv, function(msg) {
        console.log(" [x] Received %s-----", msg.content.toString());
        setTimeout(function() {  
           processQueue(msg.content.toString()).then(function (processed) {
             ch.ack(msg)// body...
             console.log(" [x] Done. %s ----- ", msg.content.toString());
           })
        }, secs * 1000);
      }, {noAck: false});
    })
  }
}