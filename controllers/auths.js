var app = require('cantina')
  , controller = app.controller()
  , crypto = require('crypto');



module.exports = controller;

controller.get('/login', login);
controller.post('/login', processLogin, login);
controller.get('/signup', values, register);
controller.post('/signup', values, processRegister);

function values (req, res, next) {
  res.vars.values = req.body || {};
  next();
}

function login (req, res, next) {
  res.vars.title = 'Login';
  res.vars.styles.push(
    '/css/forms.css',
    'vendor/bootstrap/css/bootstrap-toggle-buttons.css'
  );
  res.vars.scripts.push(
    '/vendor/jquery/jquery.form.js',
    '/vendor/bootstrap/js/jquery.toggle.buttons.js'
    // '/js/form-validators/loginValidator.js',
    // '/js/login.js'
  );
  res.render('login', res.vars);
}

function processLogin (req, res, next) {

  if (!req.body.username) {
    res.formError('username', 'Please enter a username.');
  }
  if (!req.body.password) {
    res.formError('password', 'Please enter a password.');
  }
  if (res.formErrors) {
    res.vars.subtitle = 'Opps we found some errors :-(';
    next();
  }
  else {
    var values = [req.body.username, hashPass(req.body.password)];

    app.mysql.query('SELECT id, username, password FROM users WHERE username = ? AND password = ? ', values, function (err, res) {
      if (err) console.error(err);

      var user = res[0];

      if (!user) {
        // res.setMessage('Wrong usename and password combination', 'error');
        return next();
      }

      req.login(user, function(err){
        //if (err) return console.error(err, "Error before the redirect on req.logIn callback");
        return res.redirect('/');
      });
    });
  }

}

function register (req, res, next) {
  res.vars.title = 'Sign up';
  res.vars.subtitle = 'Create your user account';
  res.vars.styles.push('/css/forms.css');
  res.vars.scripts.push(
    '/vendor/jquery/jquery.form.js',
    '/js/form-validators/account-validator.js',
    '/js/signup.js'
  );
  res.render('signup', res.vars);
}

function processRegister (req, res, next) {
  if (!req.body) {
    return next(new Error('Invalid post data'));
  }
  if (!req.body.name) {
    res.formError('name', 'Name is required.');
  }
  if (!req.body.email) {
    res.formError('email', 'Email is required.');
  }
  else if (!app.validators.isEmail(req.body.email)) {
    res.formError('email', 'Invalid email address.');
  }
  if (!req.body.username) {
    res.formError('username', 'Please choose a username.');
  }
  else if (req.body.username.length < 3 || req.body.username.length > 32) {
    res.formError('username', 'Username must be between 3 and 32 characters long.');
  }
  else if (!req.body.username.match(/^[a-zA-Z0-9_]+$/)) {
    res.formError('username', 'Username must contain letters, numbers, and underscores only.');
  }
  if (!req.body.password) {
    res.formError('password', 'Please choose a password.');
  }
  else if (req.body.password.length < 5) {
    res.formError('password', 'Password must be at least 5 characters long.');
  }
  if (res.formErrors) {
    console.log(res.formErrors);
    res.vars.title = 'Sign up';
    res.vars.subtitle = 'Opps';
    res.vars.styles.push('/css/forms.css');
    res.render('signup', res.vars);
  }
  else {
    var user = {
      name : req.body.name,
      email : req.body.email,
      username : req.body.username,
      password : hashPass(req.body.password),
      //created : new Date().getTime()
    }

    app.mysql.query("INSERT INTO users SET ? ", user, function(err, result) {
      if (err) console.error(err);
      res.setMessage('Success fucker!', 'success');
      res.redirect('/login');
    });
  }
}

function hashPass (pass) {
  return crypto.createHash('sha1').update(pass).digest('hex');
}

