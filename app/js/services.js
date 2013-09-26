'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('Galery.services', ['ngResource'])
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .factory('Photos', function($resource, $rootScope) {
    $rootScope.loader = false;

    var Picture = $resource("http://api.flickr.com/services/rest/", params);
    var params = {
      api_key: '51d0037db1691ef6163859f7f265e0ae',
      method: 'flickr.photos.search',
      format: 'json',
      nojsoncallback: 1,
      per_page: 4,
    };


    function getPicture(query, page){
      query = query || "girls";
      page  = page  || 1;

      return Picture.get({ text: query, page: page })
        .$promise
        .then(function (data) {
          $rootScope.loader = true;
          console.log('!!!');
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
  .factory('Finder', function() {
    var factory = {};
    // factory.active = LocalStorage.get(active) || 0  // into LocalStorage
    factory.add = function(file){
      console.log(file);
    };
    factory.setActive = function(id){
      factory.active = id
    }
    return factory;
  });
