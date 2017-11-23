define(['knockout'],
function (ko) {
    function model(context) {
        var self = this;

        self.storeData = ko.observableArray([]);
        self.locationData = ko.observableArray([]);


//         self.shoe = ko.observableArray([
//                {brand: "Nike"}
//            ]);


        $.ajax({url: "https://tyre-api.herokuapp.com/api/shops", type: 'get', success: function(result){
//            let brands = [];

            for (var i in result) {
                self.storeData.push(result[i]);
            }
            console.log(self.storeData);
//
        }})

        $.ajax({url: "https://tyre-api.herokuapp.com/api/shops/customers/location", type: 'get', success: function(result){
//            let brands = [];

            for (var i in result) {
                self.locationData.push(result[i]);
            }
            // console.log(locationData);
//
        }})
            .fail(function(jqXHR){
                console.log(jqXHR)
        });

//        ko.applyBindings(self);

        self.exampleObservable = ko.observable("smart-shop");
    }
    return model;
})
