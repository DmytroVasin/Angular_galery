function getPicture(query, page){
		var apiKey = 'fd3e8e3d32dd0534ed29da7f9404bd2e'; // replace this with your API key
		query = query || "birds";
    page  = page  || 1

		$.getJSON(
			"http://api.flickr.com/services/rest/",
			{
				method: 'flickr.photos.search',
				api_key: apiKey,
				tags: query,
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
