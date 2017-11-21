'use strict'
const mongoose = require('mongoose');
module.exports = function(mongoURL) {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoURL);

  const shopsApiSchema = mongoose.Schema({
    store_location: String,
    stock: Number,
    customers_locations: Array
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
