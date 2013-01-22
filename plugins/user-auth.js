var app = require('cantina');

app.on('init', function() {
  // Listen for serialization requests.
  app.on('auth:serialize', function (user) {
    return user.id;
  });

  app.on('auth:deserialize', function(id, done) {
    app.mysql.query('SELECT * FROM users WHERE id = ? ', id, function (err, results) {
      if (err) return console.error(err, 'from deserialize');
      done(err, results[0]);
    });
  });

  app.views.helper(function (req, res, callback) {
    var vars = {};
    if (req.isAuthenticated()) {
      vars.user = req.user
      console.log(vars.user);
    }
    callback(null, vars);
  })
})

