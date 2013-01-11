var app = require('cantina')
  , controller = app.controller();

module.exports = controller;

controller.get('/chat/:id', function (req, res, next) {
  var chat = {
    1: {
      body: 'This post is the best'
    },
    2: {
      body: 'Happy new year!'
    }
  };

  var post = chat[req.params.id];
  if (post) {
    res.vars.title = chat[req.params.id];
    res.vars.body = post.body;
    //res.vars.styles.push('/chat.css');
    res.render('chat', res.vars);
  }
  else {
    next();
  }
});
