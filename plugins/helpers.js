var app = require('cantina');

app.on('init', function () {
  app.middleware.add(function (req, res, next) {
    res.vars = res.vars || {};
    res.vars.site_title = app.conf.get('title');
    res.vars.styles = ['/vendor/bootstrap.min.css','/vendor/bootstrap-responsive.css', '/vendor/font-awesome/css/font-awesome.min.css' , '/css/main.css', 'http://fonts.googleapis.com/css?family=Droid+Sans:400,700|Lato:400,700'];
    res.vars.scripts = ['http://code.jquery.com/jquery-latest.js', 'vendor/bootstrap.js'];

    // Set messages on the response.
    res.setMessage = function(message, type) {
      type = type || 'warning';
      req.session.messages || (req.session.messages = {});
      req.session.messages[type] || (req.session.messages[type] = []);
      req.session.messages[type].push(message);
    };

    // Set errors on form elements.
    var formErrors = formErrors || {};
    res.formError = function(name, message) {
      res.setMessage(message, 'error');
      formErrors[name] = message;
      res.formErrors = res.vars.formErrors = formErrors;
    };

    next();
  });

  app.views.helper(function (req, res, callback) {
    var vars = {};
    vars.messages = req.session.messages;
    delete req.session.messages;
    callback(null, vars);
  })
});
