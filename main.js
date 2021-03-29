// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoibGF1dGpvIiwiYSI6ImNrbWtuNGpkZTEybW4zMXMxOWs5OGU5emEifQ.T-W2nMiijybGzqWiQ6tCXg';

// Initialate map
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [4.322840, 52.067101],
	zoom: 12,
});

var popup = new mapboxgl.Popup().setHTML('<h3>De Haagse Hogeschool</h3><p>Is momenteel dicht.</p>');

var marker = new mapboxgl.Marker()
.setLngLat([4.324439, 52.067200])
.setPopup(popup)
.addTo(map);

var marker1 = new mapboxgl.Marker({color: "red"})
.setLngLat([4.866883848739579, 52.310576770207135])
.addTo(map);

var marker2 = new mapboxgl.Marker({color: "red"})
.setLngLat([85.30993453506457, 27.688210579644643])
.addTo(map);

var marker3 = new mapboxgl.Marker({color: "red"})
.setLngLat([23.479962884083793, 41.83851201722553])
.addTo(map);

//------------Onclicks voor d eknoppen
document.getElementById('knop1').onclick = function() {
		// Fly to a random location by offsetting the point -74.50, 40
		// by up to 5 degrees.
		map.flyTo({
		center: [4.866883848739579, 52.310576770207135],
		speed: 0.5,
		essential: true // this animation is considered essential with respect to prefers-reduced-motion
		});
};

document.getElementById('knop2').onclick = function() {
	map.flyTo({
		center: [85.30993453506457, 27.688210579644643],
		speed: 0.5,
		essential: true // this animation is considered essential with respect to prefers-reduced-motion
		});
};

document.getElementById('knop3').onclick = function() {
	map.flyTo({
		center: [0,10],
		zoom: 2,
		speed: 0.5,
		essential: true // this animation is considered essential with respect to prefers-reduced-motion
		});
};

//------------Geocoder--------------

// var geocoder = new MapboxGeocoder({
// 	accessToken: mapboxgl.accessToken,
// 	mapboxgl: mapboxgl
// 	});
	 
// 	document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

		var geocoder = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			types: 'country,region,place,postcode,locality,neighborhood'
			});
			
			
			
			geocoder.addTo('#geocoder');
			
			
			
			geocoder.on('result', function(response) {
			document.getElementById('longSpan').innerHTML = response.result.center[0];
			document.getElementById('latSpan').innerHTML = response.result.center[1];

			map.flyTo({
				center: [response.result.center[0],response.result.center[1]],
				zoom: 12.5,
				speed: 0.5,
				essential: true // this animation is considered essential with respect to prefers-reduced-motion
				});
			
				var request = 'https://api.openweathermap.org/data/2.5/weather?lat=' + response.result.center[1] + '&lon=' + response.result.center[0] + '&appid=8a5c23272e8e2a20d548f968db21b5ee'
				// get current weather
				fetch(request)

				// parse response to JSON format
				.then(function(responseWeather) {
				return responseWeather.json();
				})

				// do something with response
				.then(function(responseWeather) {
				// show full JSON object
				var weatherBox = document.getElementById('weather');

				var degC = Math.floor(responseWeather.main.temp - 273.15);
				weatherBox.innerHTML = degC + '&#176;C <br>' + responseWeather.weather[0].description;
                
                weatherBox.innerHTML = response.wind.speed + responseWeather.weather[0].description;
				});
			});

//--------------------Open weather API--------------------