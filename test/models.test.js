const assert = require('assert');
const Models = require('../models');
describe('models should be able to: ', function() {
  var models = Models("mongodb://localhost/shops-test");

  beforeEach(function(done) {
    models.shops.remove({}, function(err) {
      done(err);
    })
  })

  it('all stores in mongoDB', function() {
    var tyre_stores = [{
      store_location: 'Khayelitsha',
      stock: 100,
      customers_locations: ['Langa','Mitchelsplain','Langa']
    }, {
      store_location: 'Langa',
      stock: 100,
      customers_locations: ['Goodwood','Gugs','Wetton','Gugs']
    }];

    models.shops
      .create(tyre_stores, function(err) {
        models.shops.find({
          store_location: 'Khayelitsha',
          stock: 100,
          customers: ['Langa','Mitchelsplain','Langa']
        }, function(err, shoes) {
          assert.equal(1, shoes.length);
          done(err)
        })
      });
  })

})
