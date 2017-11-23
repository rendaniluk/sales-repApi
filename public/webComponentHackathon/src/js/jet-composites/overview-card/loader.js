define(['ojs/ojcore', 'text!./overview-card.html', './overview-card', 'text!./overview-card.json', 'css!./overview-card.css', 'ojs/ojcomposite'], function (oj, view, viewModel, metadata) {
        oj.Composite.register('overview-card', {
            view: {inline: view},
            viewModel: {inline: viewModel},
            metadata: {inline: JSON.parse(metadata)}
        });
    }   
);
