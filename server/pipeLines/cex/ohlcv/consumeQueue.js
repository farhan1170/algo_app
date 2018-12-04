const functions = require('functions'),
  rabbitMQ = functions.rabbitMQ;

const requestor = require('./requestor');

var processQueue = function (uri) {
  return requestor.requestOhlCVData(uri)
}

const config = require('config'),
  cexohlcv = config.cex.queueNames.cexohlcv ;
module.exports = {
  ohlcvConsumer: function(){
    console.log('----------------------------------')
    let channel = rabbitMQ.channel;
    let secs = 1;
    return channel.then(function (ch) {
      return ch.consume(cexohlcv, function(msg) {
        //return processQueue(msg.content.toString());
        console.log(" [x] Received %s-----", msg.content.toString());
        setTimeout(function() {
          console.log(" [x] Done. %s ----- ", msg.content.toString());
          ch.ack(msg)
        }, secs * 10);
     
      }, {noAck: false});
    })
  }
}