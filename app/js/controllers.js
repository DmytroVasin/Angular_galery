'use strict';

/* Controllers */

angular.module('Galery.controllers', [])
  .controller('GaleryCtrl', ['$scope', 'Photos', 'Finder', 'Storage',
                    function( $scope,   Photos,   Finder,  Storage ) {

    var desctop = $scope.desctop = Storage.get()

    if (desctop.length == 1) {
      var ids = 0;
      var parent_id = 0;
      // var parent_id = 0;
      localStorage.setItem('parent_id', 0);
    }

    $scope.photos = Photos.getPicture('girls', 1);
    $scope.current_page = 1;
    $scope.isDisabled = false;

    function splitation(name){
      return name.split('/').slice(-1)[0].split('.')[0].slice(0, -2);
    }



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
      ids += 1;

      desctop.push({
        id:     ids,
        type:   'file',
        parent: parent_id,
        name:   splitation(photo),
        src:    photo
      });
      Storage.put(desctop);


  // factory.active = LocalStorage.get(active) || 0  // into LocalStorage
  // factory.active = id





      // var root = [ { type: 'folder', id: 1, parent: null, name: 'HOME' } ];
      // localStorage.setItem("galery", JSON.stringify(root) );


      // localStorage.getItem("root")

      // console.log(photo);
      // localStorage.setItem("file", photo);
      // console.log(localStorage.getItem("todoList"));




    // desctop.push({
    //   title: newTodo,
    //   completed: false
    // });
    // Storage.put(desctop);



      // [
      //  { type: 'folder', id: 1, parent: null, name: 'HOME' },
      //  { type: 'file',   id: 2, parent: 1,    name: 'screenshot_1.jpg', src: 'http://fa...' }
      //  { type: 'file',   id: 3, parent: 1,    name: 'screenshot_2.jpg', src: 'http://fa...' }
      //  { type: 'folder', id: 4, parent: 1,    name: 'SEA' },
      //  { type: 'file',   id: 5, parent: 4,    name: 'screenshot_3.jpg', src: 'http://fa...' }
      // ]





      // $scope.login = Finder.add(photo)
      // LocalStorage.set =
    };
    // $watch(Finder.active). => перерисовать папку
  }]);
