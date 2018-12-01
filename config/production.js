var config  = {
  constants: {
    production: 1,
    db: {
      mongo:{
        server: '127.0.0.1:27017',
        db: 'algotrade'
      },
      rabbitMQ: {
        server: 'localhost:5672',
      }
    }
  },
  cex: {
    url: 'https://cex.io',
    currencyLimits:{
      ext: '/api/currency_limits',
      method: 'GET'
    },
    ticker:{
      ext: '/api/ticker',
      method: 'GET'
    },
    tickers:{
      ext: '/api/tickers',
      method: 'GET' 
    },
    lastPrice: {
      ext : '/api/last_price',
      method: 'GET'
    },
    lastPriceGivenMarket: {
      ext:'/api/last_prices',
      method: 'GET'
    },
    converter: {
      ext: '/api/convert',
      method: 'GET'
    },
    ohlcv:{
      ext: '/api/ohlcv/hd',
      method: 'GET'
    },
    orderBook:{
      ext: '/api/order_book',
      method: 'GET'
    },
    tradeHistory:{
      ext: '/api/trade_history',
      method: 'GET' 
    },
    accountBalance: {
      ext: '/api/balance',
      method: 'POST'
    },
    openOrders: {
      ext: '/api/open_orders',
      method: 'POST'
    },
    openOrderAllOrders: {
      ext: '/api/open_orders/',
      method: 'POST'
    },
    activeOrderStatus: {
      ext: '/api/active_orders_status',
      method: 'POST'
    },
    archivedOrders: {
      ext: '/api/archived_orders',
      method: 'POST'
    },
    cancelOrder: {
      ext: '/api/cancel_order',
      method: 'POST'
    },
    cancelOrderPairWise: {
      ext: '/api/cancel_orders',
      method: 'POST'
    },
    placeOrder: {
      ext: '/api/place_order',
      method: 'POST'
    },
    orderDetails: {
      ext: '/api/get_order',
      method: 'POST'
    },
    orderTransaction: {
      ext: '/api/get_order_tx',
      method: 'POST'
    },
    getCryptoAddress: {
      ext: '/api/get_address',
      method: 'POST'
    },
    getMyFee: {
      ext: '/api/get_myfee/',
      method: 'POST'
    },
    cancelReplaceOrder: {
      ext: '/api/cancel_replace_order',
      method: 'POST'
    },
    openPosition: {
      ext: '/api/open_position',
      method: 'POST'
    },
    getPosition: {
      ext: '/api/get_position',
      method: 'POST'
    },
    openPositionPairWise: {
      ext: '/api/open_positions',
      method: 'POST'
    },
    closePositionPairWise: {
      ext: '/api/close_position',
      method: 'POST'
    },
    archivedPostionPairWise: {
      ext: '/archived_positions/',
      method: 'POST'
    },
    getMarginalFeePairWise: {
      ext: '/api/get_marginal_fee',
      method: 'POST'
    },
    queues: ['cexohlcv'],
    queueNames: {
      cexohlcv: 'cexohlcv'
    }
  }
}

module.exports = config;