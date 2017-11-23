define(['ojs/ojcore', 'text!./data-search.html', './data-search', 'text!./data-search.json', 'css!./data-search.css',
        'ojs/ojcomposite', 'ojs/ojinputtext', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojselectcombobox'],
    function (oj, view, viewModel, metadata, css) {
        oj.Composite.register('data-search', {
            view: {inline: view},
            viewModel: {inline: viewModel},
            metadata: {inline: JSON.parse(metadata)},
            css: {inline: css}
        });
    }
);
