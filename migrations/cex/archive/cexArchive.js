const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const cexStartDate = mongoose.model('cexStartDate', { symbol1: String, symbol2: String,startDate: Date});


