<?php

/*
	Faz o compilado de todas as informações de uma Unidade de Compra, já somando quantas escolas estão associadas a ela, quantas bateram a meta e quantas não bateram ou melhoraram de notas
*/
$str = file_get_contents("join.json");
$ucs = json_decode($str, true);

function resumo($uc) {
    $resumo['location'] = $uc['location'];
    $resumo['nome'] = $uc['UGE'];
    
    $resumo['total'] = $uc['total'];

    $totalEscolas = 0;
    $melhorasIdeb = 0;
    $meta = 0;
    foreach ($uc['escolas'] as $escola) {
        if (!$escola['basicas']['location']) {
            
            continue;
        }
        foreach ($escola['ideb'] as $ideb) {
            $totalEscolas++;
            $ideb = $ideb['Ideb'];
            if ($ideb['2015']['1'] > $ideb['2013']['1']) {
                $melhorasIdeb++;
            }

            if ($ideb['2015']['1'] > $ideb['2015']['0']) {
                $meta++;
            }
        }
    }
    $resumo['idebMelhoras'] = $melhorasIdeb;
    $resumo['idebMeta'] = $meta;
    $resumo['totalEscolas'] = $totalEscolas;


    return $resumo;
}

$cont = 0;
$resumo = [];
foreach ($ucs as $uc) {
    if (isset($uc['escolas']) && $uc['escolas']) {
        $cont++;
        printf("%s - %d (%f)\n", $uc['UGE'], sizeof($uc['escolas']), $uc['total']);
        $resumo[] = resumo($uc);
    }
}

echo json_encode($resumo);
