const Promise = require('bluebird');
const models = require('model'),
  currencyPairModel = models.cex.currencyList.currencyPair();
 
module.exports = {
  addCurrencyPair: function (currencyPairArray) {
      return new Promise(function (resolve, reject) {
        currencyPairModel.collection.insertMany(currencyPairArray, function (err, data) {
          if(err){
            console.log('**********error',err)
            reject(err);
          }else{
            resolve(data);
          }
        })
      })
    
    
  },
  getAllCurrencyPairs : function(){
      return currencyPairModel.find().then(function (data) {
        //console.log('+++++++++++++data',data)
        return data
      })
    
  },
  updateCurrencyPair: function (query,updateJSON ) {
    return currencyPairModel.findOneAndUpdate(query,updateJSON ).then(function (updateData) {
      return updateData;
    })
  }
}
