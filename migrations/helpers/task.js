var app = require('cantina'),
    fs = require('fs'),
    path = require('path');

module.exports = function (plugins, task) {
  if (typeof plugins === 'function') {
    task = plugins;
    plugins = [];
  }
  return function doTask (next) {
    // Reload app.
    app = require('cantina');
    app.load(function(err) {
      if (err) throw err;

      app.conf.set('mysql:pool', 1);

      plugins = ['cantina-mysql'].concat(plugins).map(function (p) {
        if (p.charAt(0) === '.') p = path.resolve(app.root, 'migrations', p);
        return p;
      });

      app.conf.set('mysql:multipleStatements', true);
      plugins.forEach(require);

      app.init(function(err) {
        if (err) throw err;
        task(app, function (err) {
          if (err) throw err;
            Object.keys(require.cache).forEach(function (key) {
              delete require.cache[key];
            });
          next();
        });
      });
    });
  };
};
