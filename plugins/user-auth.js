var app = require('cantina');

app.on('init', function() {

  // Listen for serialization requests.
  app.on('auth:serialize', function (user) {
    return user.id;
  });

  app.on('auth:deserialize', function(id, done) {
    app.mysql.query('SELECT * FROM users WHERE id = ? ', id, function (err, user) {
      if (err) return console.error(err, 'from deserialize');
      done(err, user);
    });
  });
})

