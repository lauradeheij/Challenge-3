// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoibGF1dGpvIiwiYSI6ImNrbWtuNGpkZTEybW4zMXMxOWs5OGU5emEifQ.T-W2nMiijybGzqWiQ6tCXg';

// Initialate map
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-10, 30],
	zoom: 1.7,
});
//marker toevoegen aan de 3 locaties van de knoppen
var marker1 = new mapboxgl.Marker({color: "red"})
.setLngLat([-81.79478782648586, 26.142056163543323])
.addTo(map);

var marker2 = new mapboxgl.Marker({color: "red"})
.setLngLat([27.20927575397039, 35.50932310617226])
.addTo(map);

var marker3 = new mapboxgl.Marker({color: "red"})
.setLngLat([-80.12782550949463, 25.78517228837048])
.addTo(map);

//------------Onclicks voor de knoppen om het weer te weergeven

document.getElementById('knop1').addEventListener("click", myWeer1);

function myWeer1(){
		map.flyTo({
			center: [-81.79478782648586, 26.142056163543323],
			speed: 0.5,
			essential: true // this animation is considered essential with respect to prefers-reduced-motion
			});
	
	var request = 'https://api.openweathermap.org/data/2.5/weather?lat=26.142056163543323&lon=-81.79478782648586&appid=8a5c23272e8e2a20d548f968db21b5ee';
	fetch(request)
	// parse response to JSON format
	.then(function(response) {
		return response.json();
		})

		// do something with response
		.then(function(response) {
		// show full JSON object
		console.log(response);
		var weatherBox = document.getElementById('weather');
	
		var degC = Math.floor(response.main.temp - 273.15);
		weatherBox.innerHTML = degC + '&#176;C <br>' + response.weather[0].description + '<br>' + 'Wind ' + response.wind.speed + ' m/s' + '<br>' + 'Windrichting ' + response.wind.deg + '&#176';
		
		});
	
};
document.getElementById('knop2').addEventListener("click", myWeer2);

function myWeer2(){
	map.flyTo({
		center: [27.20927575397039, 35.50932310617226],
		speed: 0.5,
		essential: true // this animation is considered essential with respect to prefers-reduced-motion
		});
	
	var request = 'https://api.openweathermap.org/data/2.5/weather?lat=35.50932310617226&lon=27.20927575397039&appid=8a5c23272e8e2a20d548f968db21b5ee';
	fetch(request)
	// parse response to JSON format
	.then(function(response) {
		return response.json();
		})

		// do something with response
		.then(function(response) {
		// show full JSON object
		console.log(response);
		var weatherBox = document.getElementById('weather');
	
		var degC = Math.floor(response.main.temp - 273.15);
		weatherBox.innerHTML = degC + '&#176;C <br>' + response.weather[0].description + '<br>' + 'Wind ' + response.wind.speed + ' m/s' + '<br>' + 'Windrichting ' + response.wind.deg + '&#176';
		
		});
	
};
	document.getElementById('knop3').addEventListener("click", myWeer3);

	function myWeer3(){
		map.flyTo({
			center: [-80.12782550949463, 25.78517228837048],
			speed: 0.5,
			essential: true // this animation is considered essential with respect to prefers-reduced-motion
			});
		
		var request = 'https://api.openweathermap.org/data/2.5/weather?lat=25.78517228837048&lon=-80.12782550949463&appid=8a5c23272e8e2a20d548f968db21b5ee';
		fetch(request)
		// parse response to JSON format
		.then(function(response) {
			return response.json();
			})

			// do something with response
			.then(function(response) {
			// show full JSON object
			console.log(response);
			var weatherBox = document.getElementById('weather');
		
			var degC = Math.floor(response.main.temp - 273.15);
			weatherBox.innerHTML = degC + '&#176;C <br>' + response.weather[0].description + '<br>' + 'Wind ' + response.wind.speed + ' m/s' + '<br>' + 'Windrichting ' + response.wind.deg + '&#176';
			
			});
		
	};


//------------Geocoder en openweather api--------------

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
			
				var request = 'https://api.openweathermap.org/data/2.5/weather?lat=' + response.result.center[1] + '&lon=' + response.result.center[0] + '&appid=8a5c23272e8e2a20d548f968db21b5ee';
				// get current weather
				fetch(request)

				// parse response to JSON format
				.then(function(response) {
				return response.json();
				})

				// do something with response
				.then(function(response) {
				// show full JSON object
				console.log(response);
				var weatherBox = document.getElementById('weather');
			
				var degC = Math.floor(response.main.temp - 273.15);
				weatherBox.innerHTML = degC + '&#176;C <br>' + response.weather[0].description + '<br>' + 'Wind ' + response.wind.speed + ' m/s' + '<br>' + 'Windrichting ' + response.wind.deg + '&#176';
                
				});
			});