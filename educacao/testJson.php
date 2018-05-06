<?php


// Script auxiliar para ficar testando o resultado dos JSONS

$str = file_get_contents('escolas_location.json');
$escolas = json_decode($str, true);


print_r($escolas);
die;
$ceps = [];

foreach($escolas as $escola) {
    $cep = $escola['basicas']['cep'];
    $cep = explode("-", $cep);
    $ceps[$cep[0]] = true;
//    if($escola['basicas']['cidade'] != "São Paulo") {
//        $ceps[$escola['basicas']['cep']] = true;
//    }
    
    
    
}

echo sizeof($ceps);
