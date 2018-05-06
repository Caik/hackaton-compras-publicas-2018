<?php
/*
	apenas limpa os CEPs (tirar os -), fiquei com preguiça de alterar o script anterior e executar tudo de novo etc etc.

*/
$str = file_get_contents('escolas_location.json');
$escolas = json_decode($str, true);

$novo = [];
foreach($escolas as $key => $escola) {
    $cep = $escola['basicas']['cep'];
    
    $cep = explode("-", $cep);
    
    $cep = $cep[0].$cep[1];
    
    $escola['basicas']['cep'] = $cep;
            
    $novo[] = $escola;
}

echo json_encode($novo);
