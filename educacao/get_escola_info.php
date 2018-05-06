<?php
/*
	Busca informações sobre a escola dada como parâmetro.

	o getInfoBasica faz um GET numa página HTML e trata o resultado para pegar informações como nome, CEP, endereço.

	o getIdeb faz um GEZ num JSON para pegar informações sobre o IDEB
*/
$str = file_get_contents('escolas.json');
$escolas = json_decode($str, true);

function getInfoBasica($escola) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, "http://idebescola.inep.gov.br/ideb/escola/dadosEscola/$escola");

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $server_output = curl_exec($ch);


    $doc = new DOMDocument();
    $doc->loadHTML($server_output);

    $classname = 'table-dados-escola';
    $finder = new DomXPath($doc);
    $nodes = $finder->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $classname ')]");

    $info = [];



    foreach ($nodes as $node) {

        $info["codigo"] = $node->childNodes[0]->childNodes[2]->textContent;
        $info["endereco"] = $node->childNodes[1]->childNodes[2]->textContent;
        $info["cep"] = $node->childNodes[3]->childNodes[2]->textContent;
        $info["cidade"] = $node->childNodes[4]->childNodes[2]->textContent;
    }

    curl_close($ch);

    return $info;
}

function getIdeb($escola) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, "http://idebescola.inep.gov.br/ideb/escola/indiceDeDesenvolvimentoDaEducacaoBasica/$escola");

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $server_output = curl_exec($ch);
    $vars = json_decode($server_output, true);
    $vars['arrGraficoLinhaFinal'] = null;
    unset($vars['arrGraficoLinhaFinal']);
    unset($vars['arrGraficoLinhaInicial']);
    return $vars;
}

function getInfoEscola($escola) {
    $basicas = getInfoBasica($escola);
    $ideb = getIdeb($escola);
    return ['basicas' => $basicas, 'ideb' => $ideb];
}

$informations = [];
foreach ($escolas as $key => $escola) {

//$escola = 35079911;
    fwrite(STDERR, "$key\n");
    $informations[] = getInfoEscola($escola);
}

echo json_encode($informations);


