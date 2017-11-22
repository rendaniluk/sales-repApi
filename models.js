'use strict'
const mongoose = require('mongoose');
module.exports = function(mongoURL) {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoURL);

  const shopsApiSchema = mongoose.Schema({
    store_location: String,
    stock: Number,
    customer_locations : [{
      name : String,
      counter : Number
    }]
    //locations_counter: Number
  });

  shopsApiSchema.index({
    store_location: 1
  }, {
    unique: true
  });

  const shops = mongoose.model('tyre_stores', shopsApiSchema);

  return {
    shops
  };
};
