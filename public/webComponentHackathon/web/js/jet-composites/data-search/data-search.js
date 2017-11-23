define(['knockout', 'jquery', 'crm/ais', 'crm/datamanager', 'crm/datatransforms', 'ojs/ojknockout', 'ojs/ojknockout-validation'],
    function(ko, $, ais, datamanager, datatransforms) {
        function model(context) {
          var self = this;
          var selectedName = "";

          self.data = JSON.parse(sessionStorage.getItem("customersData"));
          self.searchName = ko.observable();
          self.selectedAddress = ko.observable("");
          self.datasource = ko.observable();
          self.headerArray = ko.observable([]);
          self.id = ko.observable();
          self.filledTable = ko.observable(false);
          self.alphaName = ko.observable("");
          self.observable = ko.observable();
          self.label = ko.observable();
          self.addressNumberID = "";
          self.numberResult = "mnAddressNumber_7";
          self.nameResult = "sAlphaName_8";
          self.isRequired = false;
          self.tracker = ko.observable();

          self.addressBookMasterData = {
            jdeListForm: "P0101S_W0101SA",
            jdeListFormSearchAction: 13,
            sections: [
              {
                fields: [
                  {
                    id: "search-name",
                    label: "Name",
                    jdeListId: 28,
                    observable: self.searchName,
                  },
                  {
                    id: "search-type",
                    label: "Type",
                    jdeListId: 5,
                    observable: ko.observable("*")
                  }
                ]
              }
            ],
            headers: {
              mnAddressNumber_7: "Address Number",
              sAlphaName_8: "Name",
              sLongAddress_16: "Long Address",
              sIndustryClass_17: "Industry Class",
              sSchTyp_25: "Sch Type",
              sTaxID_18: "Tax ID"
            }
          }

          self.addressContactData = {
            jdeListForm: "P0111S_W0111SA",
            jdeListFormSearchAction: 14,
            sections: [
              {
                fields: [
                  {
                    id: "search-name",
                    label: "Name",
                    jdeListId: 29,
                    observable: self.searchName,
                  }
                ]
              }
            ],
            headers: {
              sMailingName_15: "Mailing Name",
              sAlphaName_17: "Alpha Name",
              sGivenName_18: "Given Name",
              sSurname_19: "Surname",
              sProfessionalTitle_16: "Professional Title",
              chTypeCode_22: "Type Code",
              mnAddressNumber_21: "Address Number",
              mnLineID_20: "Line ID",
              mnDisplaySequence_27: "Display Sequence"
            }
          }

          self.validate = {
            tracker: ko.observable()
          }

          self.addressBookData = self.addressBookMasterData;

          self.searchAddress = function() {
            ais.fetchData(self.addressBookData).then(function(data){
              var formattedData = datatransforms.formatData(data["fs_" + self.addressBookData.jdeListForm]);
              self.headerArray([]);
              for(var prop in self.addressBookData.headers) {
                self.headerArray().push({headerText: self.addressBookData.headers[prop], field: prop});
              }
              self.datasource(new oj.ArrayTableDataSource(formattedData.rows));
              self.filledTable(true);
            }).catch(function(err) {
                console.log(err);
            });
          }

          self.selectRow = function(event, ui) {
            var selectedRow = ui.currentRow;;
            self.datasource().at(selectedRow['rowIndex']).
              then(function (obj) {
                self.selectedAddress([obj.data[self.numberResult]]);
                selectedName = obj.data[self.nameResult];
              });
          }

          self.confirmAddress = function() {
            self.observable(self.selectedAddress());
            self.alphaName(selectedName);
            $("#" + self.id()).val(self.selectedAddress());
            $("#" + self.id() + "-dialog").ojDialog("close");
          }

          self.openAddressBook = function() {
            if(self.addressBookData == self.addressContactData) {
              self.searchName($("#" + self.addressNumberID).val());
              self.searchAddress();
            }
            $("#" + self.id() + "-dialog").ojDialog("open");
          }

          self.customerOptions = function(context) {

            return new Promise(function(fulfill, reject){
              var term = " ";
              var options = [];

              if(context.term)
                term = context.term.toLowerCase();

              for(var i = 0; i < self.data.length; i++) {
                var option = {};
                option.addressNum = self.data[i]["mnCustomerNumber_19"] + "";
                option.addressName = self.data[i]["sName_18"];
                var searchTerm = option.addressNum + " " + option.addressName.toLowerCase();

                if(searchTerm.indexOf(term) !== -1) {
                  option.value = option.addressNum;
                  option.label = option.value;
                  options.push(option);
                }
              }
              fulfill(options);
            })
          }

          self.displayName = function(event, ui){
            if(ui.value) {
              if($.isNumeric(ui.value)) {
                for(var i = 0; i < self.data.length; i++) {
                  if(self.data[i]["mnCustomerNumber_19"] == ui.value)
                    self.alphaName(self.data[i]["sName_18"]);
                }
              }
            }
          }




          context.props.then(function(properties) {
            if(properties.addressbook) {
              var prop = properties.addressbook;
              self.id(prop.id);
              self.label(prop.label);
              self.observable = prop.observable;
              if (prop.isRequired) {
                self.isRequired = prop.isRequired;
              }
              self.disabled = prop.disabled;

              if(prop.numberID) {
                self.addressNumberID = prop.numberID;
                self.numberResult = "mnLineID_20";
                self.nameResult = "sAlphaName_17";
                self.addressBookData = self.addressContactData;
              } else {
                self.addressBookData = self.addressBookMasterData;
              }
              if (properties.validation) {
                self.validation = properties.validation;
              }

              prop.observable.subscribe(function() {
                self.alphaName("");
              });
            }
          });
        }
        return model;
    });
