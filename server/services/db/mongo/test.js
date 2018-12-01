var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected');
  // define a schema
  var animalSchema = new Schema({ name: String, type: String });

  // assign a function to the "methods" object of our animalSchema
  animalSchema.methods.findSimilarTypes = function(cb) {
    return this.model('Animal').find({ type: this.type }, cb);
  };
  var Animal = mongoose.model('Animal', animalSchema);
   var dog = new Animal({ type: 'dog' });

   dog.findSimilarTypes(function(err, dogs) {
     console.log(dogs); // woof
   });
});