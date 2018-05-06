var map, heatmap;

var valorDoZoom = 7;

var estyloDeMapa = [{
	"featureType": "all",
	"elementType": "all",
	"stylers": [{
			"hue": "#ff0000"
		},
		{
			"saturation": -100
		},
		{
			"lightness": -30
		}
	]
},
{
	"featureType": "all",
	"elementType": "labels.text.fill",
	"stylers": [{
		"color": "#ffffff"
	}]
},
{
	"featureType": "all",
	"elementType": "labels.text.stroke",
	"stylers": [{
		"color": "#353535"
	}]
},
{
	"featureType": "landscape",
	"elementType": "geometry",
	"stylers": [{
		"color": "#656565"
	}]
},
{
	"featureType": "poi",
	"elementType": "geometry.fill",
	"stylers": [{
		"color": "#505050"
	}]
},
{
	"featureType": "poi",
	"elementType": "geometry.stroke",
	"stylers": [{
		"color": "#808080"
	}]
},
{
	"featureType": "road",
	"elementType": "geometry",
	"stylers": [{
		"color": "#454545"
	}]
},
{
	"featureType": "transit",
	"elementType": "labels",
	"stylers": [{
			"hue": "#000000"
		},
		{
			"saturation": 100
		},
		{
			"lightness": -40
		},
		{
			"invert_lightness": true
		},
		{
			"gamma": 1.5
		}
	]}];

function initializeData() {
	data = data.map(function(x){x.taxaMeta = ( x.totalEscolas == 0 ? 0 : x.idebMeta/x.totalEscolas); return x;});
	data = data.map(function(x){x.metaPorCusto = (x.taxaMeta/(x.total+1)); return x});
}

  function initMap() {
initializeData();
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: valorDoZoom,
	  center: {lng: -49.121008, lat: -22.0668726},
	  styles:estyloDeMapa
	});


	heatmap = new google.maps.visualization.HeatmapLayer({
	  data: getPointsTotal(),
	  map: map,
  radius: 60
	});
  }


  function metas() {

	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: valorDoZoom,
	  center: {lng: -49.121008, lat: -22.0668726},
	  styles:estyloDeMapa
  });

	heatmap = new google.maps.visualization.HeatmapLayer({
	  data: getPointsMetas(),
	  map: map,
		radius: 60
	});
  }

 function gastos() {
//        heatmap.set('radius', heatmap.get('radius') ? 20 : 40);
//	heatmap.set('data', getPoints2());

  map = new google.maps.Map(document.getElementById('map'), {
		zoom: valorDoZoom,
		center: {lng: -49.121008, lat: -22.0668726},
		styles:estyloDeMapa

  });

heatmap = new google.maps.visualization.HeatmapLayer({
	  data: getPointsGastos(),
	  map: map,
  radius: 60
	});
  }

function metaPorGasto() {
//        heatmap.set('radius', heatmap.get('radius') ? 20 : 40);
//	heatmap.set('data', getPoints2());

map = new google.maps.Map(document.getElementById('map'), {
	  zoom: valorDoZoom,
	  center: {lng: -49.121008, lat: -22.0668726},
	  styles:estyloDeMapa
	});

heatmap = new google.maps.visualization.HeatmapLayer({
	  data: getPointsMetaPorGastos(),
	  map: map,
  radius: 60
	});
  }

function melhoras() {

map = new google.maps.Map(document.getElementById('map'), {
	  zoom: valorDoZoom,
	  center: {lng: -49.121008, lat: -22.0668726},
	  styles:estyloDeMapa

	});

heatmap = new google.maps.visualization.HeatmapLayer({
	  data: getPointsMelhoras(),
	  map: map,
  radius: 60
	});
  }

  function totalEscolas() {
map = new google.maps.Map(document.getElementById('map'), {
	  zoom: valorDoZoom,
	  center: {lng: -49.121008, lat: -22.0668726},
	  styles:estyloDeMapa
	});

heatmap = new google.maps.visualization.HeatmapLayer({
	  data: getPointsTotal(),
	  map: map,
  radius: 60
	});
}

  function changeOpacity() {
	heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
  }

  // Heatmap data: 500 Points
  function getPointsTotal() {
data = data.filter(function(x){return x.location.lat && x.location.lng});

var heatMapData = data.map(function(x){return {location: new google.maps.LatLng(x.location.lat , x.location.lng), weight: Math.log(x.totalEscolas + 1)} });
	
return heatMapData;
  }

function getPointsGastos() {
data = data.filter(function(x){return x.location.lat && x.location.lng});

var heatMapData = data.map(function(x){return {location: new google.maps.LatLng(x.location.lat , x.location.lng), weight: Math.log(x.total+1)} });
	
return heatMapData;
  }

function getPointsMetaPorGastos() {
data = data.filter(function(x){return x.location.lat && x.location.lng});

var heatMapData = data.map(function(x){return {location: new google.maps.LatLng(x.location.lat , x.location.lng), weight: x.metaPorCusto} });
	
return heatMapData;
  }

  function getPointsMelhoras() {
data = data.filter(function(x){return x.location.lat && x.location.lng});

var heatMapData = data.map(function(x){return {location: new google.maps.LatLng(x.location.lat , x.location.lng), weight: x.idebMelhoras/x.totalEscolas} });
	
return heatMapData;
  }


 function getPointsMetas() {
data = data.filter(function(x){return x.location.lat && x.location.lng});

var heatMapData = data.map(function(x){return {location: new google.maps.LatLng(x.location.lat , x.location.lng), weight: x.taxaMeta} });
	
return heatMapData;


  }