define(['ojs/ojcore', 'text!./stock-level.html', './stock-level', 'text!./stock-level.json', 'css!./stock-level.css', 'ojs/ojcomposite'], function (oj, view, viewModel, metadata) {
        oj.Composite.register('stock-level', {
            view: {inline: view},
            viewModel: {inline: viewModel},
            metadata: {inline: JSON.parse(metadata)}
    });
    }
);
