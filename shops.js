'use strict'
module.exports = function(models) {
  const allShop = function(req, res, next) {
    models.shops.find({}, {
      _id: 0,
      __v: 0,
      customers_locations: 0
    }, function(err, allStore) {
      if (err) {
        return next(err);
      } else {
        res.json(allStore)
      }
    })
  };

  const deductStock = function(req, res, next) {
    var shop_name = req.params.shop_name;
    models.shops.findOne({
      store_location: shop_name
    }, function(err, tyres) {
      if (err) {
        return next(err)
      } else if (tyres.stock > 0 && tyres.stock > 4) {
        tyres.stock -= 4;
        tyres.save()
        res.json(tyres)
      } else if (tyres.stock > 0 && tyres.stock < 4) {
        res.json("Sorry we only have " + tyres.stock +
          " tyres in stock")
      } else {
        tyres.stock = 0;
        tyres.save()
        res.json("No stock available")
      }
    })
  };

  const customerLocation = function(req, res, next) {
    models.shops.find({}, {
      _id: 0,
      __v: 0,
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

  const upDateStock = function(req, res, next) {
    var shop_name = req.params.shop_name;
    var qty = req.params.stockadd;
    models.shops.findOne({
      store_location: shop_name
    }, function(err, tyres) {
      if (err) {
        return next(err)
      } else {
        tyres.stock += Number(qty);
        tyres.save()
        res.json(tyres)
      }
    });
  }



  return {
    addCustomer,
    customerLocation,
    deductStock,
    upDateStock,
    // shopStock,
    allShop

  }


};
