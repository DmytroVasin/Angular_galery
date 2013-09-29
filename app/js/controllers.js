'use strict';

/* Controllers */

angular.module('Galery.controllers', [])
  .controller('GaleryCtrl', ['$scope', 'Photos', 'Finder', 'Storage',
                    function( $scope,   Photos,   Finder,  Storage ) {

    var desctop = $scope.desctop = Storage.get();

    if (desctop.length == 0) {
      localStorage.setItem('parent_id',  0);
      localStorage.setItem('current_id', 0);
    }
    // $scope.breadcrumbs = [{ id: 0, name: 'Home' }];

    var parent_id   = $scope.parent_id   = parseInt(localStorage.getItem('parent_id'), 10);
    var current_id  = $scope.current_id  = parseInt(localStorage.getItem('current_id'), 10);
    console.log(desctop);


    $scope.photos = Photos.getPicture('girls', 1);
    $scope.current_page = 1;
    $scope.isDisabled = false;

    function splitation(name){
      // return name.split('/').slice(-1)[0].split('.')[0].slice(0, -2);
      return name.split('/').slice(-1)[0].split('.')[0].split('_')[0];
    };

// BREAD CRUMBS END
    function prepareBreadCrumbs(){
      $scope.breadcrumbs = [];
      if ($scope.parent_id === 0 ) {
        return false;
      };

      var con;

      function breadCrumbs(parent_id, arr){
        angular.forEach(arr, function(v, k){
          if (v.id === parent_id && v.type === 'folder'){
            con = v.parent;
            $scope.breadcrumbs.unshift(v);
          }
        });
        if (con !== 0) {
          breadCrumbs(con, arr);
        }
      };

      breadCrumbs($scope.parent_id, JSON.parse(localStorage.getItem("angular-js-storage")));
    };

    prepareBreadCrumbs();
    $scope.consoleLog = function(){
      console.log('!!!');
    };

// BREAD CRUMBS END


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

    $scope.addToFile = function(photo){
      current_id += 1;

      desctop.push({
        id:     current_id,
        type:   'file',
        parent: parent_id,
        name:   splitation(photo),
        src:    photo
      });
      Storage.put(desctop);
      localStorage.setItem('current_id', current_id);
    };

    $scope.addFolder = function(){
      current_id += 1;
      desctop.push({
        id:     current_id,
        type:   'folder',
        parent: parent_id,
        name:   "Folder " + current_id,
      });
      Storage.put(desctop);
      localStorage.setItem('current_id', current_id);
    };

    $scope.chageFolder = function(id){
      parent_id  = $scope.parent_id  = id;
      localStorage.setItem('parent_id', id);
      prepareBreadCrumbs();
    };
  }]);
