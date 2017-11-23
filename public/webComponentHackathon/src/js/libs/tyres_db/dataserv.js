define(['knockout', 'jquery'], function (ko, $, ais) {



  function getItemsAPI() {
    // use a promise for async data
    const df = $.Deferred();
    var headers = {
      'store_location': 'Store',
      'name': 'Customer Locations',
      'counter': 'No. of customers'
    };

    // var table2 = {
    //   'customer-locations': 'Customer Locations',
    //   'number_Customers': 'No. of customers'
    // }



    return df.promise()
  }

  function getItemsStatic() {
    // filter-table requires an observable for the rows
    // let stockLevel = ko.observableArray();
    let storeLocation = ko.observableArray();

    let headers = []
    // let table2 = []
    var items;
//     $.ajax({url: "https://tyre-api.herokuapp.com/api/shops", type: 'get', success: function(result){
// //            let brands = [];
//     items = result
//     let cnt = 0; // var for our rowIndex prop
//     // add the rowIndex
//     items.forEach(function (oneItem) {
//       oneItem.rowIndex = cnt; // add rowIndex since our rows do not have unique keys
//       cnt++
//     })
//         // for (var i in result) {
//         //     self.storeData.push(result[i]);
//         // }
//         // console.log(result);
//         // add the mutated rows to our observable
//         stockLevel(result);
// //
//     }})
var items;

    $.ajax({
         url: "https://tyre-api.herokuapp.com/api/shops/",
         type: 'get',
         success: function(result) {

           // console.log("get Locations"+result);
           var allLocations = []
           for (var i = 0; i < result.length; i++) {
            //  allLocations.push(result[i].store_location)
             for (var j = 0; j < result[j].customer_locations.length; j++) {
              //  array[i]
               allLocations.push(result[i].customer_locations[j])
              //  console.log(result[i].store_location, result[i].customer_locations[j]);
             }

           }
             items = allLocations

          let cnt = 0; // var for our rowIndex prop
          // add the rowIndex
          items.forEach(function (oneItem) {
            oneItem.rowIndex = cnt; // add rowIndex since our rows do not have unique keys
            cnt++
          })
                      storeLocation(allLocations)
                      console.log(allLocations);
            }
       })
       .fail(function(jqXHR) {
         console.log(jqXHR)
       });

        // set our headers object
        // key is used to fetch the data from rows
        // value is displayed as the filter-table headers
        headers = {
          // 'store_location': 'Store',
          'name': 'Customer Locations',
          'counter': 'No. of customers'
        };

        //  table2 = {
        //   'customer-locations': 'Customer Locations',
        //   'number_Customers': 'No. of customers'
        // };

        // return an object we can use in filter-table
        return {
          rows: storeLocation,
          headers: headers
        }
      }

      return {
        getItemsStatic: getItemsStatic,
        getItemsAPI: getItemsAPI
      }
    });
