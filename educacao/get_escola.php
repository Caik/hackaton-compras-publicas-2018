<?php

// Dado um codigo de Cidade, daa um POST no site da idebescola.inp.gov.br para consultar as escolas daquela cidade, e faz o tratamento do HTML para pegar as informações

//


function getEscolas($cidade) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, "http://idebescola.inep.gov.br/ideb/consulta-publica");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, "pkCodEstado=35&pkCodMunicipio=$cidade");

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $server_output = curl_exec($ch);

    $doc = new DOMDocument();
    $doc->loadHTML($server_output);

    $classname = 'coluna';
    $finder = new DomXPath($doc);
    $nodes = $finder->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $classname ')]");

    $escolas = [];

    foreach ($nodes as $node) {
        $escolas[] = trim($node->childNodes[0]->textContent);
    }

    curl_close($ch);
    
    return $escolas;
}

$str = file_get_contents('cidades.json');
$cidades = json_decode($str, true);

echo sizeof($cidades);
die;

$escolas = [];
$cont = 0;
foreach($cidades as $cidade) {
    fwrite(STDERR, $cidade['text']);
    $escolas = array_merge($escolas, getEscolas($cidade['value']));
    
    
}
echo json_encode($escolas);
