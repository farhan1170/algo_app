const models = require('model'),
  ohlcv = models.cex.ohlcv;

const  ohlcv1MModel = ohlcv.ohlcvOneMinute(),
  ohlcv1HModel = ohlcv.ohlcvOneHour(),
  ohlcv1DModel = ohlcv.ohlcvOneDay();

module.exports = {
  ohlcv1mAdd: function (ohlcvJSON) {
    console.log('toStore---------------',ohlcvJSON);
    let inputData = new ohlcv1MModel(ohlcvJSON);
    return inputData.save().then( (inputted)=>{
      console.log('inputted');
      return inputted;
    } );
  },
  ohlcv1mUpdate: function (ohlcvJSON) {

  },
  ohlcv1mGet: function (ohlcvJSON) {
    console.log('came to find one minute')
    return ohlcv1MModel.find(ohlcvJSON).then(function (data) {
      console.log('+++++++++++++oneminutedata',data)
      return data
    })
  },
  ohlcv1hAdd: function (ohlcvJSON) {
    console.log('toStore---------------',ohlcvJSON);
    let inputData = new ohlcv1HModel(ohlcvJSON);
    return inputData.save().then( (inputted)=>{
      console.log('inputted');
      return inputted;
    } );
  },
  ohlcv1hUpdate: function (ohlcvJSON) {

  },
  ohlcv1hGet: function (ohlcvJSON) {
    return ohlcv1HModel.find(ohlcvJSON).then(function (data) {
      //console.log('+++++++++++++data',data)
      return data
    })
  },
  ohlcv1dAdd: function (ohlcvJSON) {
    console.log('toStore---------------',ohlcvJSON);
    let inputData = new ohlcv1DModel(ohlcvJSON);
    return inputData.save().then( (inputted)=>{
      console.log('inputted');
      return inputted;
    } );
  },
  ohlcv1dUpdate: function (ohlcvJSON) {

  },
  ohlcv1dGet: function (ohlcvJSON) {
    return ohlcv1DModel.find(ohlcvJSON).then(function (data) {
      //console.log('+++++++++++++data',data)
      return data
    })
  }
}