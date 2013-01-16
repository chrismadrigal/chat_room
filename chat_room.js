var app = require('cantina')
 ,  path = require('path');

app.load(function (err) {
  if (err) return console.error(err);

  require(app.plugins.http);
  require(app.plugins.middleware);
  require('./plugins/body-parser');
  require('./plugins/logger');
  require('./plugins/validator.js');
  require('cantina-views');
  require('cantina-mysql');
  require('cantina-session');
  require('cantina-auth');
  require('./plugins/helpers');
  require('./plugins/user-auth');
  require(app.plugins.static);
  require(app.plugins.controllers);


  app.views.registerPartials(path.resolve(app.root, 'views/partials'));
  app.init();
});

