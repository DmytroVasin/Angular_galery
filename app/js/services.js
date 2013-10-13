'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('Galery.services', ['ngResource'])
.config(['$httpProvider', function($httpProvider){
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.factory('Photos', function($resource, $rootScope) {
  $rootScope.loader = false;
  var params = {
    api_key: '51d0037db1691ef6163859f7f265e0ae',
    method: 'flickr.photos.search',
    format: 'json',
    nojsoncallback: 1,
    per_page: 100,
  };

  var Picture = $resource("http://api.flickr.com/services/rest/", params);

  function getPicture(text){
    text = text || "girls";
    $rootScope.text_query = text;

    return Picture.get({ text: text })
    .$promise
    .then(function (data) {
      $rootScope.loader = true;
      return data.photos.photo
      .map(function (item) {
        return 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_q.jpg';
      });
    });
  }

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
}).factory('Helper', function ($rootScope, Storage) {
  return {
    getTime: function() {
      var d = new Date();
      var curr_month = d.getMonth();
      curr_month++;
      return d.getFullYear() + "-" + curr_month + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();  
    },
    splitation: function(url) {
      return url.split('/').slice(-1)[0].split('.')[0].split('_')[0];
    },
    setPage: function(allPhotos, page){
      var photos_array = [];

      angular.forEach(allPhotos, function (val, index) {
        if ( Math.floor(index / 4) == page - 1){
          photos_array.push(val);
        }
      });
      $rootScope.photos = photos_array;
    },
    closeEditing: function(){
      $rootScope.desktop = Storage.get();
      angular.forEach($rootScope.desktop, function(v, k){
        v.editing = false;
      });
    },
    concl: function(id_s, arr){
      var rootObj = this;
      angular.forEach(arr, function(v,k){
        if (v.parent === id_s){
          rootObj.concl(v.id, arr);
          v.id = '0';
        }
      });
      return arr;
    }
  };
});

// .factory('Photos', function($resource, $rootScope) {
//   $rootScope.loader = false;

//   function getPicture(tag){
//       tag = tag || "girls";
//       $rootScope.text_query = tag;
//       var Flickr = $resource(
//       "http://api.flickr.com/services/feeds/photos_public.gne",
//       {
//         format:  'json',
//         tagmode: 'any',
//         tags:    tag
//       },
//       {
//         get: {
//           method: 'JSONP',
//           params: {
//             jsoncallback: 'JSON_CALLBACK'
//           }
//         }
//       }
//     );
//     return Flickr.get().$promise.then(function (data) {
//       return data.items
//       .map(function (item) {
//         return item.media.m.replace('_m', '_q');
//       });
//     });
//   };
//   return {
//     getPicture: getPicture
//   };
// })
