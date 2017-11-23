define(['ojs/ojcore', 'text!./customer-locations.html', './customer-locations', 'text!./customer-locations.json', 'css!./customer-locations.css', 'ojs/ojcomposite'], function (oj, view, viewModel, metadata) {
        oj.Composite.register('customer-locations', {
            view: {inline: view},
            viewModel: {inline: viewModel},
            metadata: {inline: JSON.parse(metadata)}
    });
    }
);
