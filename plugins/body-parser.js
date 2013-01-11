var app = require('cantina'),
    qs = require('querystring');

app.middleware.first(function (req, res, next) {
  req.body = '';
  req.on('data', function (chunk) {
    req.body += chunk;
  });
  req.once('end', function () {
    var err = null;
    if (req.headers['content-type']) {
      var parse;
      if (req.headers['content-type'].match(/^application\/json/)) {
        parse = JSON.parse;
      }
      else if (req.headers['content-type'].match(/^application\/x\-www\-form\-urlencoded/)) {
        parse = qs.parse;
      }
      if (parse) {
        try {
          req.body = parse(req.body);
        }
        catch (e) {
          err = e;
        }
      }
    }
    next(err);
  });
});
