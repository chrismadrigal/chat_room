var app = require('cantina')
  , crypto  = require('crypto')
  , controller = app.controller();

module.exports = controller;

controller.get('/', function (req, res, next) {
  res.vars.title = 'Chat Room';
  res.vars.body = 'Sup beaches';
  res.vars.subtitle = 'A Super awesome chatroom build on node.js';
  res.vars.styles.push('/css/forms.css');
  res.render('home', res.vars);
});


