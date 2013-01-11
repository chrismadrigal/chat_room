var app = require('cantina')
  , controller = app.controller();

module.exports = controller;

controller.get('/blog/:id', function (req, res, next) {
  var blog = {
    1: {
      title: 'Yo YO YO',
      body: 'This post is the best'
    },
    2: {
      title: 'Wuzzip',
      body: 'Happy new year!'
    }
  };
  var post = blog[req.params.id];
  if (post) {
    res.vars.title = post.title;
    res.vars.body = post.body;
    res.vars.styles.push('/blog.css');
    res.render('blog', res.vars);
  }
  else {
    next();
  }
});
