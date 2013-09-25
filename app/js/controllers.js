'use strict';

/* Controllers */

angular.module('Galery.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('MyCtrl_galery', ['$scope', '$routeParams', 'Photos',
                      function(  $scope,   $routeParams,   Photos ) {

    $scope.photos = Photos.getPicture('girls',2);

    // $scope.item = 'some item'
    //$scope.setImage = function(imageUrl) {
		//   $scope.mainImageUrl = imageUrl;
		// }
  	// $scope.phoneId = $routeParams.phoneId;
  }]);
