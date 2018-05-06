<?php
/*
	Função que recebe um CEP e retorna a localização desse CEP através da API do Google.
	
	Serva para rodar em cima das informações das escolas "escolas_info.json" e buscar a sua localização
/*

$str = file_get_contents('escolas_info.json');
$escolas = json_decode($str, true);


function getEscolas($cep) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, "https://maps.googleapis.com/maps/api/geocode/json?address=$cep&key=KEY");
    

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $server_output = curl_exec($ch);

    $values = json_decode($server_output, true);
    if($values['status'] == 'OK') {
        return $values['results'][0]['geometry']['location'];
    } else {
        return null;
    }
    
}

$locations = [];
$novo = [];
foreach($escolas as $key =>$escola) {
    fwrite(STDERR, "$key\n");
    $cep = $escola['basicas']['cep'];
    if(!isset($locations[$cep])) {
        $locations[$cep] = getEscolas($cep);  
    } 
    $escola['basicas']['location'] = $locations[$cep];
    $novo[] = $escola;
    
            
}

echo json_encode($novo);

