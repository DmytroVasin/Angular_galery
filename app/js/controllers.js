'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('MyCtrl_galery', ['$scope', '$routeParams', 'carusel', function($scope, $routeParams, carusel) {
    $scope.query = carusel.getPicture('birds',2);
    
    // $scope.item = 'some item'
    //$scope.setImage = function(imageUrl) {
		//   $scope.mainImageUrl = imageUrl;
		// }
  	// $scope.phoneId = $routeParams.phoneId;
  }]);
