define(['ojs/ojcore', 'text!./ui-panel.html', './ui-panel', 'text!./ui-panel.json', 'css!./ui-panel.css', 
        'ojs/ojcomposite', 'ojs/ojcollapsible'], function (oj, view, viewModel, metadata, css) {
        oj.Composite.register('ui-panel', {
            view: {inline: view},
            viewModel: {inline: viewModel},
            metadata: {inline: JSON.parse(metadata)},
            css: {inline: css}
        });
    }   
);
