'use strict';

/* Controllers */

angular.module('Galery.controllers', [])
  .controller('GaleryCtrl', ['$scope', 'Photos', 'Finder',
                    function( $scope,   Photos,   Finder ) {

    $scope.photos = ["http://placehold.it/250x250", "http://placehold.it/250x250", "http://placehold.it/250x250", "http://placehold.it/250x250"];
    $scope.photos = Photos.getPicture('girls', 1).then(function (data) { $scope.photos = data; })

    $scope.ajax_loading = false;
    $scope.current_page = 1;
    $scope.isDisabled   = false;

    $scope.searchPhotos = function(){
      $scope.ajax_loading = true;
      Photos.getPicture($scope.search, $scope.current_page).then(function(data){
        $scope.ajax_loading = false;
        $scope.photos = data;
      });
      $scope.search = '';
    };

    $scope.rotateCarusel = function(direction){
      if (direction == 'right') {
        $scope.current_page += 1;
        $scope.searchPhotos();
      } else {
        if ($scope.isDisabled) {
          $scope.current_page -= 1;
          $scope.searchPhotos();
        }
      };
      if ($scope.current_page == 1) {
        $scope.isDisabled = false;
      } else {
        $scope.isDisabled = true;
      }
    }

    $scope.addToFolder = function(photo){
      // console.log(photo);
      $scope.login = Finder.add(photo)
      // LocalStorage.set =
    };
    // $watch(Finder.active). => перерисовать папку
  }]);
