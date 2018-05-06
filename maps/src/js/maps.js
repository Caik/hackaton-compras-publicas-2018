var map;


var inicial = {
    latitude: -23.533773,
    longitude: -46.625290
};

var pontos = [];

var divDoMapa = document.getElementById("map_canvas")
  
var opcoes = { 
    center: new google.maps.LatLng(inicial.latitude, inicial.longitude), 
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
   

};
  
var imagens = {
    pouco: 'http://i.imgur.com/biRJBNL.png',
    medio: 'http://i.imgur.com/eNAvIvr.png',
    muito: 'http://i.imgur.com/bFnWq8k.png'
}

var marcadores = [];

function initialize() {
    map = new google.maps.Map(divDoMapa, opcoes);
}

var criaMarcador = function(marcador, mapa) {
    var posicao = new google.maps.LatLng(marcador.latitude, marcador.longitude);

    var opcoes = {
    position: posicao, 
    title: marcador.titulo, 
    animation: google.maps.Animation.DROP, 
    icon:{
            url: marcador.imagem || 'http://i.imgur.com/eNAvIvr.png', 
            scaledSize: new google.maps.Size(50, 50)
    	},
        map: mapa
    }
    
    var novoMarcador = new google.maps.Marker(opcoes);
    marcadores.push(novoMarcador);
    map.setCenter(novoMarcador.position);
}

//Adaptar conforme o necessário
function adiciona(){
    var marcador = {
      latitude: -23.6813,
      longitude: -46.6205,	
      titulo: 'Pouco Gasto em Diadema - Menos de 10 mil reais por Escola.',
      imagem: imagens.pouco
    }
    
    criaMarcador(marcador, map);
}