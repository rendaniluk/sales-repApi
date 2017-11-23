define(['knockout'], 
    function(ko) {
        function model(context) {
            var self = this;
            
            self.maincolor = "black";
            self.highlight = "#00ADD7";
            self.name = "Default";
            self.icon = "";
            
            self.count = ko.observable(0);
            
            self.clicked = function() {
                console.error("No route set");
            }
            
            context.props.then(function(properties) {
                if (properties.maincolor) 
                    self.maincolor = properties.maincolor;
                if (properties.highlight) 
                    self.highlight = properties.highlight;
                if (properties.name)
                    self.name = properties.name;
                if (properties.observables) 
                    self.count = properties.observables.count;
                if (properties.clicked)
                    self.clicked = properties.clicked;
                if (properties.icon)
                    self.icon = properties.icon;
            });
        }
        return model;
    }
);
