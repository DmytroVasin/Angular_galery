function getPicture(query, page){
		var apiKey = '51d0037db1691ef6163859f7f265e0ae'; // angular_galery_app ( this is key ) => ( secret is 741e9bc074f26180)
		query = query || "birds";
    page  = page  || 1

		$.getJSON(
			"http://api.flickr.com/services/rest/",
			{
				method: 'flickr.photos.search',
				api_key: apiKey,
				text: query,
				format: 'json',
				nojsoncallback: 1,
				per_page: 4,
				page: page
			},
			function(data){
				console.log(data);
				if(data.stat == 'ok'){
					if(data.photos.pages != 0) {
						$.each( data.photos.photo, function( i, item ) {
							$( ".carousel_img_"+i ).attr( "src", "http://farm"+item.farm+".staticflickr.com/"+item.server+"/"+item.id+"_"+item.secret+"_q.jpg" ).attr('data-id', item.id)
						});
					} else {
						console.log('incorreqt query')
					}
				} else {
					console.log(" The request to get the array was not good => ");
				}
			});
	}
