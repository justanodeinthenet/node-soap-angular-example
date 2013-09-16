/*
  * Routes
  *
*/


var   _         = require('underscore'),
    path        = require('path'),
    passport    = require('passport'),
    AuthCtrl    = require('./api/auth'),
    SearchCtrl  = require('./api/search');

var routes = [
  {
    path      : '/partials/*',
    httpMethod: 'GET',
    middleware: [getView]
  },
  {
    path      : '/login',
    httpMethod: 'POST',
    middleware: [AuthCtrl.login]
  },
  {
    path      : '/logout',
    httpMethod: 'POST',
    middleware: [AuthCtrl.logout]
  },
  {
    path      : '/api/search/query/:query',
    httpMethod: 'GET',
    middleware: [SearchCtrl.byQuery]
  },
  {
    path      : '/*',
    httpMethod: 'GET',
    middleware: [loginRequired]
  }
];

module.exports = function(app) {
  _.each(routes, function(route) {
    var args = _.flatten([route.path, route.middleware]);

      switch(route.httpMethod.toUpperCase()) {
        case 'GET':
          app.get.apply(app, args);
          break;
        case 'POST':
          app.post.apply(app, args);
          break;
        case 'PUT':
          app.put.apply(app, args);
          break;
        case 'DELETE':
          app.delete.apply(app, args);
          break;
        default:
          throw new Error('Invalid HTTP method specified for route ' + route.path);
          break;
      }
  });
};

function getView(req, res) {
  var requestedView = path.join('./', req.url);
  res.render(requestedView);
}

function loginRequired(req, res) {
  var user = '';
  if (req.user) {
    user = req.user;
  }

  res.cookie('user', JSON.stringify(user));
  res.render('index');
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.send(401);
  }
}