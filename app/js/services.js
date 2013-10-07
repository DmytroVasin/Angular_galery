'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('Galery.services', ['ngResource'])
.config(['$httpProvider', function($httpProvider){
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.factory('Photos', function($resource, $rootScope) {
// $rootScope.loader = false;
  function getPicture(x, y){
    return $resource("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", { tags:'girls', tagmode:"any", format:"json" }).get()
    .$promise
    .then(function (data) {
      console.log(data);
      return data.items 
      .map(function (item) {
        item.media.m
      });
    });
  };
  return {
    getPicture: getPicture
  };
})
.factory('Storage', function () {
  var STORAGE_ID = 'angular-js-storage';

  return {
    get: function () {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || "[]");
    },
    put: function (item) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(item));
    }
  };
});
