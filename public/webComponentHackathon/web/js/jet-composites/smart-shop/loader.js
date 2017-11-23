define(['ojs/ojcore', 'text!./smart-shop.html', './smart-shop', 'text!./smart-shop.json', 'ojs/ojcomposite'], function (oj, view, viewModel, metadata) {
        oj.Composite.register('smart-shop', {
            view: {inline: view},
            viewModel: {inline: viewModel},
            metadata: {inline: JSON.parse(metadata)}
    });
    }
);
