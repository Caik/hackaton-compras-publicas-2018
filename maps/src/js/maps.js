var map;


var inicial = {
    latitude: -23.533773,
    longitude: -46.625290
};

var divDoMapa = document.getElementById("map_canvas")
  
var opcoes = { 
    center: new google.maps.LatLng(inicial.latitude, inicial.longitude), 
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
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