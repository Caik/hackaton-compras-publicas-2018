<?php

/*
	Varre as informações de escolas e Unidades de Compra de SP, e associa cada escola à Unidade de Compra mais próxima
*/

$str = file_get_contents("juncaoUC.json");
$ucs = json_decode($str, true);


$str = file_get_contents("escolas_completo.json");
$escolas = json_decode($str, true);

function distancia2($l1, $l2) {
    if(!$l1 || !$l2) {
        return 10000000000;
    }
    $dlat = $l1['lat'] - $l2['lat'];
    $dlong = $l1['lng'] - $l2['lng'];
    return $dlat*$dlat + $dlong*$dlong;
}

foreach($escolas as $kesc => $escola) {
    $nearestKey = null;
    $nearest = null;
    $nearestDist = null;
    fwrite(STDERR, $cont++ . " " . $kesc . "\n" );
    foreach($ucs as $key => $uc) {        
        $dist = distancia2($uc['location'], $escola['basicas']['location']);
        if($nearestKey == null || $dist < $nearestDist) {
            $nearestKey = $key;
            $nearest = $uc;
            $nearestDist = $dist ;
            continue;
        }
    }
    $ucs[$nearestKey]['escolas'][] = $escola;
}

//print_r($ucs);
echo json_encode($ucs);


