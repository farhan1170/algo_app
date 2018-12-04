const config = require('config');
const Promise =  require('bluebird');
const amqp = Promise.promisifyAll(require('amqplib/callback_api'));

module.exports = createQueueChannel;

var createQueueChannel = ( function () {
  return amqp.connectAsync('amqp://'+config.constants.database.rabbitMQ.server).then(function (conn) {
    return conn.createChannel();
  }).then(function (ch) {
    let queueNames = config.cex.queues;
    ch.prefetch(1);
    queueNames.forEach(function (queueName) {
      ch.assertQueue(queueName, {durable: false});
    })
    return ch
  }).catch(function (error) {
    return error;
  })
})();

var insertToQueue = function(queueName, data) {
  return createQueueChannel.then(function (ch) {
    return ch.sendToQueue(queueName, data)
  })
}


module.exports = {
  channel: createQueueChannel,
  insertToQueue: insertToQueue
}
