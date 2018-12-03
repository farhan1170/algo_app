const functions = require('functions'),
  rabbitMQ = functions.rabbitMQ;

const config = require('config'),
  cexohlcv = config.cex.queueNames.cexohlcv ;
module.exports = {
  ohlcvConsumer: function(){
    console.log('----------------------------------')
    let channel = rabbitMQ.channel;
    return channel.then(function (ch) {
      return ch.consume(cexohlcv, function(msg) {
        console.log(" [x] Received %s-----", msg.content.toString());
      }, {noAck: true});
    })
  }
}