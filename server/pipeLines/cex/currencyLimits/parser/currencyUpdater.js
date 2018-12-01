module.exports = {
  currencyPairParser: function (responseData) {let parsedData = '';
    if(typeof responseData['responseBody'] === 'string'){
      responseData['responseBody'] = JSON.parse(responseData['responseBody']);
    }
    if(responseData['responseBody']){
      if(responseData['responseBody']['data']){
        if(responseData['responseBody']['data']['pairs']){
          let pairs = [];
          responseData.responseBody.data.pairs.forEach(function (pair) {
            let obj = {
              symbol1: pair.symbol1,
              symbol2: pair.symbol2,
              minLotSize: pair.minLotSize,
              maxLotSize: pair.maxLotSize,
              maxPrice: pair.maxPrice,
              minPrice: pair.minPrice
            }
            pairs.push(pair);
          })
          return pairs;
        }else{
          return false;
        }  
      }else{
        return false;
      }
    }else{
      return false
    }
  }
}