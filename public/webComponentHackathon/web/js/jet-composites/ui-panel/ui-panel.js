define(['knockout'],
function(ko) {
    function model(context) {
        var self = this;

        context.props.then(function(properties) {
            if (properties.title) {
                self.title = properties.title;
            }
            else {
                self.title = null;
            }

            if (properties.progressId) {
                self.progressId = properties.progressId;
            }
            else {
                self.progressId = null;
            }

            if (properties.titleClass) {
                self.titleClass = properties.titleClass;
                if (properties.progressId) {
                    self.titleClass += " ui-panel-has-progressbar";
                }
            }
            else {
                self.titleClass = null;
            }

            if (properties.mainClass) {
                self.mainClass = properties.mainClass;
            }
            else {
                self.mainClass = null;
            }
        });
    }
    return model;
});
