'use strict';

/* Controllers */

angular.module('Galery.controllers', [])
  .controller('GaleryCtrl', ['$scope', '$location', 'Photos', 'Finder', 'Storage',
                    function( $scope,   $location,   Photos,   Finder,   Storage ) {

    $scope.desctop = Storage.get();



// Trick to change url START
    var loc = $location.url().split('/');
    var id_link = loc[loc.length - 1];
    angular.forEach($scope.desctop, function(v, k){
      if (v.id.toString() == id_link && v.type == 'folder'){
        parent_id  = $scope.parent_id  = id_link;
        localStorage.setItem('parent_id', id_link);
      };
    });
// Trick to change url END





    if ($scope.desctop.length == 0) {
      localStorage.setItem('parent_id',  0);
      localStorage.setItem('current_id', 0);
    }

    var parent_id   = $scope.parent_id   = parseInt(localStorage.getItem('parent_id'), 10);
    var current_id  = $scope.current_id  = parseInt(localStorage.getItem('current_id'), 10);
                      $scope.openedImage = JSON.parse(localStorage.getItem('opened_image'));

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

      breadCrumbs($scope.parent_id, $scope.desctop);
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

    prepareBreadCrumbs();

    $scope.breadCrumbsBack = function(){
      if ($scope.breadcrumbs.length == 0) {return false}
      var element    = $scope.breadcrumbs.length-2;
      var object = (element == -1) ?  0 : $scope.breadcrumbs[element]
      $scope.chageFolder(object);
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

      $scope.desctop.push({
        id:     current_id,
        type:   'file',
        parent: parent_id,
        name:   splitation(photo),
        src:    photo
      });
      saveAll();
      localStorage.setItem('current_id', current_id);
    };

    $scope.addFolder = function(){
      current_id += 1;
      
      var navigation = '';
      angular.forEach($scope.breadcrumbs, function(v, k){
        navigation +=  '/' + v.id;
      });
      navigation += '/' + current_id;

      var cur_obj = {
        id:     current_id,
        type:   'folder',
        parent: parent_id,
        name:   "Folder " + current_id,
        editing: false,
        locat: navigation
      };

      $scope.desctop.push(cur_obj);

      saveAll();
      localStorage.setItem('current_id', current_id);
    };

    $scope.chageFolder = function(object){
      var id = 0;
      if ( object === 0 ) {
        $location.path('/');
      } else {
        $location.path(object.locat);
        id = object.id;
      }

      closeEditingFolder();
      parent_id  = $scope.parent_id  = id;
      localStorage.setItem('parent_id', id);
      prepareBreadCrumbs();
    };

    $scope.editFolderName = function(id, flag){
      angular.forEach($scope.desctop, function(v, k){
        if (v.id === id && v.type === 'folder'){
          v.editing = flag;

          v.name = v.name.trim();
          if (!v.name) {
            $scope.removeFolder(v);
          }
        saveAll();
        };
      });
    };

    function saveAll(){
      Storage.put($scope.desctop);
    };

    function closeEditingFolder(){
      angular.forEach($scope.desctop, function(v, k){
        if (v.type === 'folder'){
          v.editing = false;
        };
      });
    };


    $scope.removeFile = function(file){
      $scope.desctop.splice($scope.desctop.indexOf(file), 1);
      saveAll();
    };

    $scope.removeFolder = function(folder){
      $scope.desctop = concl(folder.id, $scope.desctop).filter( function(item){
        if (item.id !== '0' && item.id !== folder.id ){ return item; }
      });
      saveAll();
    };

    function concl(id_s, arr){
      angular.forEach(arr, function(v,k){
        if (v.parent === id_s){
          concl(v.id, arr);
          v.id = '0';
        }
      });
      return arr;
    };

    $scope.showImage = function(file){
      localStorage.setItem('opened_image', JSON.stringify(file));
      $scope.openedImage = file;
    };

    $scope.checkKeyCode = function(event, id){
      if (event.keyCode == 13){
        $scope.editFolderName(id, false);
      }
    };

//  Export

    $scope.export_popup = function(){
      var el = {};
      var json_export = Storage.get();
      el.code = $('#export-json');

      el.code.html( JSON.stringify(json_export, undefined, 4));
      Prism.highlightElement( el.code.get(0) );
    };

    $scope.import_popup = function(){
      $scope.desctop = JSON.parse($scope.importingJson);
      Storage.put($scope.desctop);
      localStorage.setItem('parent_id', 0);

      var id_max = Math.max.apply(null, $scope.desctop.map(return_ids))
      localStorage.setItem('current_id', id_max);

      $scope.importingJson = '';
    };
    function return_ids(obj) {
      return obj.id;
    };

  }]);
