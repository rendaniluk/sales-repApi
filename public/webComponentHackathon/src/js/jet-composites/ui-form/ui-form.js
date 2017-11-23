define(['knockout', 'knockoutSwitch','ojs/ojknockout', 'ojs/ojknockout-validation'],
    function(ko, koSwitch) {
        function model(context) {
            var self = this;

            self.sections = ko.observableArray([{
                title: "No sections"
            }]);

            self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
                                               createConverter(
                                                {
                                                  pattern : "MM/dd/yyyy"
                                                }));

            function setDefaultValuesOnFields(fields) {
                for (var j = fields.length - 1; j >= 0; j--) {
                    var field = fields[j];
                    if(!field.flexItem) {
                        field.flexItem = 'oj-sm-6';
                    }

                    if (field.type && field.type === "group") {
                        setDefaultValuesOnFields(field.inputfields);
                    }
                    else {
                        if(!field.type) {
                            field.type = 'text';
                        }
                        if(!field.placeholder) {
                            field.placeholder = field.label;
                        }
                        if(!field.disabled) {
                            field.disabled = false;
                        }
                        if(!field.isRequired) {
                            field.isRequired = ko.observable(false);
                        }
                    }
                }
            }

            context.props.then(function(properties) {
                if (properties.sections) {
                    var sections = properties.sections;
                    self.sections(sections);
                    for (var i = sections.length - 1; i >= 0; i--) {
                        setDefaultValuesOnFields(sections[i].fields);
                    }
                }
                if (properties.validation) {
                    self.validation = properties.validation;
                    self.validationComponentTracker = properties.validation.tracker;
                    self.validationEmailFormat = properties.validation.emailFormat;
                }
            });
        }
        return model;
    }
);
