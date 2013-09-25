'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])
  .factory('carusel', function($q, $timeout, $resource) {
  	var params = {
			api_key: '51d0037db1691ef6163859f7f265e0ae',
			method: 'flickr.photos.search',
			format: 'json',
			nojsoncallback: 1,
			per_page: 4,
		};

  	var Picture = $resource("http://api.flickr.com/services/rest/", {
  		get: {method: "GET", params: params}
  	});

		function getPicture(query, page){
			query = query || "birds";
	    page  = page  || 1

	    return Picture.get({ text: query, page: page });
		}

	  return {
	    getPicture: getPicture
	  };
	});
