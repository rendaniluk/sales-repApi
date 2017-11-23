define(['ojs/ojcore', 'text!./ui-form.html', './ui-form', 'text!./ui-form.json', 'css!./ui-form.css', 'ojs/ojcomposite', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'components/data-search/loader'],
       function (oj, view, viewModel, metadata, css) {
        oj.Composite.register('ui-form', {
            view: {inline: view},
            viewModel: {inline: viewModel},
            metadata: {inline: JSON.parse(metadata)},
            css: {inline: css}
        });
    }
);
