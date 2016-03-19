var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/home.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: false}
    })
    .when('/main', {
      templateUrl: '/partials/main.html',
      controller: 'githubController',
      access: {restricted: true}
    })
    .otherwise({redirectTo: '/'});
});

myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && !AuthService.getUserStatus()) {
      $location.path('/');
    }
  });
});
