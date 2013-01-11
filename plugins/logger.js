var app = require('cantina');

app.on('init', function () {
  app.middleware.add(function (req, res, next) {
    if (req.url === '/favicon.ico') {
      res.writeHead(404);
      res.end();
    }
    else {
      next();
    }
  });

  app.middleware.add(function (req, res, next) {
    console.log(req.method + ': ' + req.url);
    next();
  });
});
