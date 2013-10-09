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
});

// .factory('Photos', function($resource, $rootScope) {
//   $rootScope.loader = false;

//   function getPicture(tag){
//       tag = tag || "girls";
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
