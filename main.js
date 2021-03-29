// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoibGF1dGpvIiwiYSI6ImNrbWtuNGpkZTEybW4zMXMxOWs5OGU5emEifQ.T-W2nMiijybGzqWiQ6tCXg';

// Initialate map
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [4.322840, 52.067101],
	zoom: 12,
});