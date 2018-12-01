const request = require('request');
const Promise = require('bluebird');

module.exports = {
  httpGenertor: function (options) {
    
    return new Promise(function (resolve, reject) {
      if(!options.method){
        throw new Error('Please specify method');
      }
      if(!options.url){
        throw new Error('Please specify URL');
      }
      if(options.method = 'GET'){
        let qs = '';
        let count = 0
        Object.keys(options.body).forEach(function (key) {
          if(count === 0){
            count++;
            qs = qs+'?'+key+'='+options.body[key];
          }else{
            qs = qs+'&'+key+'='+options.body[key];
          }
        })
        delete options.body;
        options.url = options.url+qs;
        return request(options, function (error, res, body) {
          if(error){
            reject(error);
          }else{
            if(body){
              resolve({responseBody: body, status: res.statusCode});
            }
            else{
              resolve({})
            }
          }
        })
      }  
    })
  }
}