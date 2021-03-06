'use strict';

/* Controllers */

angular.module('Galery.controllers', [])
  .controller('GaleryCtrl', ['$scope', '$location', 'Photos', 'Storage', 'Helper',
                    function( $scope,   $location,   Photos,   Storage,   Helper ) {

    $scope.desktop = Storage.get();
    $scope.copied  = false;
    var copied_object = [];
    var allPhotos;

    if ($scope.desktop.length == 0) {
      localStorage.setItem('parent_id',  0);
      localStorage.setItem('current_id', 0);
    }

    var parent_id   = $scope.parent_id   = parseInt(localStorage.getItem('parent_id'), 10);
    var current_id  = $scope.current_id  = parseInt(localStorage.getItem('current_id'), 10);
                      $scope.openedImage = JSON.parse(localStorage.getItem('opened_image'));

    $scope.currentPage = 1;
    $scope.isDisabled = false;
    Photos.getPicture().then(function (pictures) {
      $scope.loader = true;
      allPhotos = pictures;
      Helper.setPage(allPhotos, $scope.currentPage);
    });

// BREAD CRUMBS END
    function prepareBreadCrumbs(){
      $scope.breadcrumbs = [];
      if ($scope.parent_id === 0 ) {
        return false;
      };

      breadCrumbs($scope.parent_id, $scope.desktop);
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
      var element = $scope.breadcrumbs.length-2;
      var object  = (element == -1) ?  0 : $scope.breadcrumbs[element]
      $scope.changeFolder(object);
    };

// BREAD CRUMBS END


    $scope.searchPhotos = function(){
      $scope.ajax_loading = true;
      $scope.currentPage = 1;
      Photos.getPicture($scope.search).then(function(pictures){
        $scope.ajax_loading = false;
        allPhotos = pictures;
        Helper.setPage(allPhotos, $scope.currentPage);
        $scope.search = '';
      });
    };

    $scope.rotateCarusel = function(direction){
      // max fetched pictures: 100 => 4 per page => 25
        // 25 for first method
        // 5 for second method

      if ($scope.currentPage >= 25) {
        $scope.currentPage = 0;
      };
      if (direction == 'right') {
        $scope.currentPage += 1;
        Helper.setPage(allPhotos, $scope.currentPage);
      } else {
        if ($scope.isDisabled) {
          $scope.currentPage -= 1;
          Helper.setPage(allPhotos, $scope.currentPage);
        }
      };
      if ($scope.currentPage == 1) {
        $scope.isDisabled = false;
      } else {
        $scope.isDisabled = true;
      }
    }

    $scope.addToFile = function(photo){
      current_id += 1;

      $scope.desktop.push({
        id:     current_id,
        type:   'file',
        parent: parent_id,
        name:   Helper.splitation(photo),
        editing: false,
        copied: false,
        date:   Helper.getTime(),
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
        copied: false,
      };

      $scope.desktop.push(cur_obj);

      saveAll();
      localStorage.setItem('current_id', current_id);
    };

    $scope.changeFolder = function(id){
      Helper.closeEditing();
      parent_id  = $scope.parent_id  = id;
      localStorage.setItem('parent_id', id);
      prepareBreadCrumbs();
    };

    $scope.editingName = function(id, flag){
      angular.forEach($scope.desktop, function(v, k){
        if (v.id === id){
          v.name = v.name.trim();
          if (v.name) {
            v.editing = flag;
            saveAll();
          } else {
            Helper.closeEditing();
          }
        };
      });
    };

    $scope.removeFile = function(file){
      $scope.desktop.splice($scope.desktop.indexOf(file), 1);
      saveAll();
    };

    $scope.removeFolder = function(folder){
      $scope.desktop = Helper.concl(folder.id, $scope.desktop).filter( function(item){
        if (item.id !== '0' && item.id !== folder.id ){ return item; }
      });
      saveAll();
    };

    $scope.showImage = function(file){
      if ($scope.copied && !file.copied ) {
        current_id += 1;
        var obj = {};
        angular.extend(obj, file);

        obj.id = current_id;
        copied_object.push(obj);

        file.copied = true;

        localStorage.setItem('current_id', current_id);
        saveAll();
      } else {
        localStorage.setItem('opened_image', JSON.stringify(file));
        $scope.openedImage = angular.copy(file);
      };
    };

    $scope.checkKeyCode = function(event, id){
      if (event.keyCode == 13){
        $scope.editingName(id, false);
      }
    };

    function saveAll(){
      Storage.put($scope.desktop);
    };


//  Export <=> Import

    $scope.export_popup = function(){
      var el = {};
      var json_export = Storage.get();
      el.code = $('#export-json');

      el.code.html( JSON.stringify(json_export, undefined, 4));
      Prism.highlightElement( el.code.get(0) );
    };

    $scope.import_popup = function(){
      $scope.desktop = JSON.parse($scope.importingJson);
      Storage.put($scope.desktop);
      localStorage.setItem('parent_id', 0);

      var id_max = Math.max.apply(null, $scope.desktop.map(return_ids))
      localStorage.setItem('current_id', id_max);

      $scope.importingJson = '';
    };

    function return_ids(obj) {
      return obj.id;
    };

// Copy <=> Paste

    $scope.copy = function(){
      if ($scope.copied) {
        $scope.copied = false;
      } else {
        $scope.copied = true;
      }
    };

    $scope.paste = function(){
      angular.forEach(copied_object, function(val, k){
        val.parent = parent_id;
      });

      $scope.desktop = $scope.desktop.concat(copied_object);
      completeСopy();
    };

    function completeСopy(){
      angular.forEach($scope.desktop, function(val, k){
        val.copied = false;
      });

      $scope.copied  = false;
      copied_object = [];
      saveAll();
      prepareBreadCrumbs();
    };
  }]);
