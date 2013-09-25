'use strict';

/* Controllers */

angular.module('Galery.controllers', [])
  .controller('GaleryCtrl', ['$scope', 'Photos', 'Finder',
                    function( $scope,   Photos,   Finder ) {

    $scope.photos = Photos.getPicture('girls', 1);
    $scope.searchPhotos = function(){
      $scope.loader = true
      Photos.getPicture($scope.search, 1).then(function(data){
        $scope.photos = data;
        $scope.loader = false
      });
      $scope.search = '';
    };
    $scope.addToFolder = function(photo){
      // console.log(photo);
      $scope.login = Finder.add(photo)
      // LocalStorage.set =


    }
    // $watch(Finder.active). => перерисовать папку
  }]);
