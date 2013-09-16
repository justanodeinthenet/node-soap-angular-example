/* Controllers */

'use strict';

/* Global app controller */
app.controller('AppCtrl',
['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {

  $scope.title = 'Site title';
  $scope.hidden = 'Hidden content';

/* Login view controller, handle login and display the hint */
}]).controller('LoginCtrl',
['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {

  $scope.hint = 'Username: user / Password: password';
  $scope.rememberme = false;

  $scope.login = function() {
    $scope.loader = true;
    Auth.login({
      username  : $scope.username,
      password  : $scope.password,
      rememberme: $scope.rememberme
    },
    function(res) {
      $location.path('/');
    },
    function(err) {
      $rootScope.error = 'Failed to login';
    });
  };

/* Home controller, display greeting and handle logout */
}]).controller('HomeCtrl',
['$rootScope', '$scope', '$location', 'Auth', 'API', function($rootScope, $scope, $location, Auth, API) {

  $scope.greeting = 'Hello ' + $rootScope.user;
  $scope.showlog = false;

  $scope.logout = function() {
    Auth.logout(function() {
      $location.path('/login');
    }, function() {
      $rootScope.error = 'Failed to logout';
    });
  };

  $scope.search = function() {
    API.search($scope.query, function (data) {
      $scope.log = $scope.query;
      $scope.results = data.results;
      $scope.showlog = true;
    }, function(){
      $rootScope.error = 'Search error';
    });
  }

}]);
