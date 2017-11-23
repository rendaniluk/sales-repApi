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


    console.log(req.body);

    var locationFrom = req.body.customer_locations;

    var theLocation = {
      name : locationFrom,
      counter : 1
    };

    var tyre_store = {
      store_location: req.body.store_location,
      stock: req.body.stock,
      customer_locations: [theLocation]
      //locations_counter: 1
    }

    models.shops.findOne({
      store_location: tyre_store.store_location,
      // stock: tyre_store.stock,
      // customers_locations: tyre_store.customers_locations
    }, function(err, findResult) {

      console.log("=====");
      console.log(findResult);
      console.log("=====");

      if (err) {
        console.log(err);
        return next(err);
      } else if (findResult !== null) {
          console.log(findResult);

        var currentLocation = findResult.customer_locations
          .find(function(loc){
            return loc.name === locationFrom;
          });

        if (currentLocation){
          currentLocation.counter++;
        }
        else{
          findResult.customer_locations.push(theLocation);
        }

        /*
        console.log(findResult);
        findResult.locations_counter = findResult.locations_counter + 1;
        */

        findResult.save(function (err, results) {
          if (err){
            return next(err);
          }
          //console.log(err);
          //console.log(results);

          res.json(results);

        });

      } else {

        models.shops.create(tyre_store, function (err, results) {
          if (err){
            return next(err);
          }
          //console.log(err);
          //console.log(results);

          res.json(results);

        });

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
