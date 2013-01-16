var app = require('cantina')
  , controller = app.controller();

module.exports = controller;




controller.get('/', function (req, res, next) {
  console.log('isAuthenticated => ' + req.isAuthenticated());

  res.vars.title = 'Chat Room';
  res.vars.subtitle = 'A Super awesome chatroom build on node.js';
  res.vars.styles.push('/css/forms.css');

  console.log(req);
  res.render('home', res.vars);
  // if (req.cookies.user == undefined || req.cookies.pass == undefined){
  //   res.render('login', res.vars);
  // }
  // else {
  //   res.render('home', res.vars);
  // }

});


