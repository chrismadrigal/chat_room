var app = require('cantina')
 ,  path = require('path');

app.load(function (err) {
  if (err) return console.error(err);

  require(app.plugins.http);
  require(app.plugins.middleware);
  require('./plugins/body-parser');
  require('./plugins/logger');
  require('./plugins/helpers');
  require(app.plugins.static);
  require(app.plugins.controllers);
  require('cantina-views');
  require('cantina-auth');

  app.views.registerPartials(path.resolve(app.root, 'views/partials'));
  app.init();
});

