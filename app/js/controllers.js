'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('MyCtrl_galery', ['$scope', '$routeParams', 'getPicture', function($scope, $routeParams, getPicture) {
    console.log(getPicture());
  	$scope.setImage = function(imageUrl) {
		  $scope.mainImageUrl = imageUrl;
		}
		// $scope.data = getPicture('birds', 4);
  	// $scope.phoneId = $routeParams.phoneId;
  }]);
