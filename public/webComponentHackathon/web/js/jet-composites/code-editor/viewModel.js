

/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ace/ace','monokai','acejs', 'acehtml','acecss','acelight','acejson', 'acesql', 'ojs/ojinputtext'], function (oj, ko, $, ace, monokai) {
    'use strict';
    
    function ExampleComponentModel(context) {
        var self = this;
        self.composite = context.element;
        //Example observable
        self.composite.mode = "ace/mode/javascript"; 
        self.composite.theme = "ace/theme/monokai"; 
        self.actiontext = ko.observable("ACTION");
        self.composite.editor = ko.observable();
        self.filename = ko.observable("");

        self.handleClear = function(){
            self.composite.editor.setValue("");
        }
        self.handleaction = function(){
            if(typeof self.composite.cb === "function"){
                // fire the callback with the data
                self.composite.cb(self.composite.editor.getValue())
            }
        }
        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;
            
            //Parse your component properties here 

            console.log("self.properties.mode == "+self.properties.mode)
            console.log("self.properties.theme == "+self.properties.theme)

            console.log("self.properties.actiontext == "+self.composite.actiontext)
            if(self.properties.mode){
                self.composite.mode = self.properties.mode
            }
            if(self.properties.theme) {
                self.composite.theme = self.properties.theme
            }
            if(self.properties.actiontext){
                self.actiontext(self.properties.actiontext);
            }
            if(self.properties.cb){
                self.composite.cb(self.properties.cb);
            }



        });
    };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    ExampleComponentModel.prototype.attached = function(context){
            context.element.editor = ace.edit("editor");
            context.element.editor.setTheme(context.element.theme);
            context.element.editor.getSession().setMode(context.element.mode);        
    };

    ExampleComponentModel.prototype.bindingsApplied = function(context){
    
       
    
    };

    //ExampleComponentModel.prototype.detached = function(context){
    //};

    return ExampleComponentModel;
});