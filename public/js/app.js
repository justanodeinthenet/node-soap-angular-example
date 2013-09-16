/* App config */

'use strict';

var app = angular.module('demoApp' , ['ngCookies']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

  $routeProvider.when('/',
    {
      templateUrl:    '/partials/home',
      controller:     'HomeCtrl'
    });
  $routeProvider.when('/search/:query',
    {
      templateUrl:    '/partials/search',
      controller:     'SearchCtrl'
    });
  $routeProvider.when('/login',
    {
      templateUrl:    '/partials/login',
      controller:     'LoginCtrl'
    });
  $routeProvider.when('/404',
    {
      templateUrl:    '/partials/404'
    });
  $routeProvider.otherwise({redirectTo:'/404'});

  var interceptor = ['$location', '$q', function($location, $q) {
    function success(response) {
      return response;
    }

    function error(response) {
      if(response.status === 401) {
          $location.path('/login');
          return $q.reject(response);
      }
      else {
          return $q.reject(response);
      }
    }

    return function(promise) {
      return promise.then(success, error);
    };
  }];

  $locationProvider.html5Mode(true);
  $httpProvider.responseInterceptors.push(interceptor);

}]).run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {

  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    $rootScope.error = null;
    $rootScope.loggedIn = true;

    if (_.isEmpty(Auth.isLoggedIn())) {
      $location.path('/login');
      $rootScope.loggedIn = false;
    }
  });

  $rootScope.appInitialized = true;
}]);