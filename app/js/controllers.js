'use strict';

/* Controllers */

angular.module('Galery.controllers', [])
  .controller('GaleryCtrl', ['$scope', 'Photos', 'Finder',
                    function( $scope,   Photos,   Finder ) {

    $scope.photos = Photos.getPicture('girls', 1);
    $scope.ajax_loading = false;

    $scope.searchPhotos = function(){
      $scope.ajax_loading = true;
      Photos.getPicture($scope.search, 1).then(function(data){
        $scope.ajax_loading = false;
        $scope.photos = data;
      });
      $scope.search = '';
    };

    $scope.addToFolder = function(photo){
      // console.log(photo);
      $scope.login = Finder.add(photo)
      // LocalStorage.set =


    };
    // $watch(Finder.active). => перерисовать папку
  }]);
