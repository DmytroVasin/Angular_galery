'use strict';

/* Controllers */

angular.module('Galery.controllers', [])
  .controller('GaleryCtrl', ['$scope', 'Photos',
                    function( $scope,   Photos ) {

    $scope.photos = Photos.getPicture('girls',2);
  }]);
