'use strict'
module.exports = function(models) {
  const allShop = function(req, res, next) {
    models.shops.find({}, {
      _id: 0,
      __v: 0,
      customers: 0,
    }, function(err, allStore) {
      if (err) {
        return next(err);
      } else {
        res.json(allStore)
      }
    })
  };

  // const shopStock = function(req, res, next) {
  //   models.shops.find({}, {
  //     _id: 0,
  //     __v: 0
  //   }, function(err, all_shoes) {
  //     if (err) {
  //       return next(err);
  //     } else {
  //       res.json(all_shoes)
  //     }
  //   })
  // };

  const customerLocation = function(req, res, next) {
    models.shops.find({}, {
      _id: 0,
      __v: 0,
      store_location: 0,
      stock: 0
    }, function(err, possibleLoc) {
      if (err) {
        return next(err);
      } else {
        res.json(possibleLoc)
      }
    })
  }

  const addCustomer = function(req, res, next) {
        var tyre_stores = {
          store_location: req.body.store_location,
          stock: req.body.stock,
          customers_locations: req.body.customers_locations
        }

        models.shops.create(tyre_stores, function(err, addStores) {
          if (err) {
            return next(err)
          } else {
            res.json(addStores)
          }
        })
  }



  return {
    addCustomer,
    customerLocation,
    // shopStock,
    allShop

  }


};
