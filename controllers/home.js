var app = require('cantina')
  , controller = app.controller();

module.exports = controller;


controller.get('/', authUser);
controller.get('/home', [authUser, homePage]);


function authUser (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.url === '/home') return next();
    res.redirect('/home');
  }
  else {
    res.redirect('/login');
  }
}

function homePage (req, res, next) {
  res.vars.title = 'Chat Room';
  res.vars.subtitle = 'A Super awesome chatroom build on node.js';
  res.vars.styles.push('/css/forms.css');
  res.render('home', res.vars);
}
