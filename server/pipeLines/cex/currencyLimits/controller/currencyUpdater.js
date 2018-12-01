const Promise = require('bluebird');
const requestor = require(__dirname+'/../requestor');
const services = require('services');

function getCurrencyFromDb() {
  return services.db.mongo.cex.currencyPair.getAllCurrencyPairs();
}

function requestCurrency() {
  return requestor.currencyUpdater.requestCurrencies(); 
}
module.exports = {
  //get currencies from db
  //request currency from api
  //match currencies
  //if new currency then add currency
  
  currencyPairPipeLine: function () {
    return Promise.props({
      db: getCurrencyFromDb(),
      cex: requestCurrency()
    }).then(function (currencyResult) {
      let dbResult = currencyResult.db;
      let cexResult = currencyResult.cex;
      let newCurrencies = [];
      if(dbResult.ops){
        dbResult = dbResult.ops;
      }
      for (let i = 0; i< cexResult.length; i++){
        for (let j = 0; j< dbResult.length; j++){
          if((cexResult[i]['symbol1'] == dbResult[j]['symbol1']) && (cexResult[i]['symbol2'] == dbResult[j]['symbol2']) ){
            cexResult.splice(i, 1);

          }
        } 
      }
      if(cexResult.length > 0){
        return services.db.mongo.cex.currencyPair.addCurrencyPair(cexResult);
      }
    }).catch(function (error) {
      console.log(error,'***************error',error)
    })
  }
}