'use strict';


// Declare app level module which depends on filters, and services
angular.module('Galery', ['ngRoute', 'Galery.controllers', 'Galery.services'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/partial_galery.html', controller: 'MyCtrl_galery'});
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
