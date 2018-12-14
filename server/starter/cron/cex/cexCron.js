var CronJob = require('cron').CronJob;

const pipeLines = require('pipeLines');

module.exports = {
  // ohlcvPreviousDate : function () {
  //   ohlcvPreviousDateCron = new CronJob('*/10 * * * * *', function() {
  //     console.log('You will see this message every second ohlcvPreviousDate');
  //     }, null, true, 'America/Los_Angeles'
  //   );
  // },
  // ohlcvCurrentDate : function () {
  //   ohlcvCurrentDateCron = new CronJob( '*/20 * * * * *', function () {
  //       //call ohlcv pipeLine
  //       console.log('ohlcvCurrentDate'+'--------------------------------');
  //     } ,null, true, 'America/Los_Angeles')
  // },
  // tickers: function () {
  //   tickersCron = new CronJob('*/30 * * * * *',function () {
  //       //call ohlcv pipeLine
  //       console.log('tickers'+'--------------------------------');

  //     },null, true, 'America/Los_Angeles')
  // },
  // orderBook: function () {
  //   orderBookCron = new CronJob('*/50 * * * * *',function () {
  //       //call ohlcv pipeLine
  //       console.log('orderBook'+'--------------------------------');

  //     },null, true, 'America/Los_Angeles')
  // },
  currencyPairs: function () {
    currencyPairsCron = new CronJob(' */1 * * * *', function () {
      console.log('----------currencyPairs-------');
      pipeLines.cex.currencyLimits.controller.currencyUpdater.currencyPairPipeLine();  
    }, null, true, 'America/Los_Angeles'
    )
  },
  startDateFinder: function () {
    //pipeLines.cex.startDatePipeLine.controller.controller.currencyStartDateFinder();
    startDateFinderCron = new CronJob(' */2 * * * *', function () {
      console.log('----------startDateFinder----------');
      pipeLines.cex.startDatePipeLine.controller.controller.currencyStartDateFinder();
    }, null, true, 'America/Los_Angeles'
    )
  },
  ohlcvFiller: function () {
    pipeLines.cex.ohlcv.insertQueue.createOhlcvQueue();
    startDateFinderCron = new CronJob('*/30 * * * * *', function () {
      console.log('----------ohlcvFiller----------');
      pipeLines.cex.ohlcv.insertQueue.createOhlcvQueue();
    }, null, true, 'America/Los_Angeles'
    )
  },
  ohlcvConsumer: function () {
    pipeLines.cex.ohlcv.consumeQueue.ohlcvConsumer();
    startDateFinderCron = new CronJob('*/30 * * * * *', function () {
      console.log('----------ohlcvFiller----------');
      pipeLines.cex.ohlcv.consumeQueue.ohlcvConsumer();
    }, null, true, 'America/Los_Angeles'
    )
  }

}