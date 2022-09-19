<?php



function criarCsv($arq, $dados, $delimitador=','){

    $csv = fopen($arq, 'w');

    foreach($dados as $linha){
        fputcsv($csv, $linha, $delimitador);

    }

    fclose($csv);
}

?>


