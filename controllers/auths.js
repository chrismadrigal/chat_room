var app = require('cantina')
  , controller = app.controller();

module.exports = controller;

controller.get('/login', login);
controller.post('/login', processLogin);
controller.get('/signup', register);
controller.post('/signup', processRegister);


function login (req, res, next) {
  res.vars.title = 'Login';
  res.vars.styles.push('/css/forms.css');
  res.render('login', res.vars);
}

function processLogin (req, res, next) {
  var users = app.mysql.query("SELECT * FROM users WHERE name = ? AND ");
}

function register (req, res, next) {
  res.vars.title = 'Sign up';
  res.vars.subtitle = 'Create your user account';
  res.vars.styles.push('/css/forms.css');
  res.render('signup', res.vars);
}

function processRegister (req, res, next) {
  if (!req.body) {
    return next(new Error('Invalid post data'));
  }
  // if (req.body.op !== 'register') {
  //   console.error("Operation not valid");
  //   return next();
  // }
  if (!req.body.full) {
    res.formError('full', 'Full name is required.');
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
  if (!req.body.pass) {
    res.formError('password', 'Please choose a password.');
  }
  else if (req.body.pass.length < 5) {
    res.formError('password', 'Password must be at least 5 characters long.');
  }
  if (res.formErrors) {
    return next();
  }
}
