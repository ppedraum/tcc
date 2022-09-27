<?php

require '../../vendor/autoload.php';
// reference the Dompdf namespace
use Dompdf\Dompdf;
use Dompdf\Options;

$options = new Options();

//seta a root padrão do dompdf para que ele possa pegar arquivos (qualquer arquivo fora da pasta não vai poder ser renderizada)
$options->setChroot(__DIR__);

//Autoriza arquivos pegados via req http serem renderizados
$options->setIsRemoteEnabled(true);

// instantiate and use the dompdf class
$dompdf = new Dompdf($options);

$dompdf->loadHtmlFile(__DIR__.'/pg_pdf.html');

// (Optional) Setup the paper size and orientation
$dompdf->setPaper('A4', 'landscape');

// Render the HTML as PDF
$dompdf->render();

header('Content-type: application/pdf');

// Só mostra no browser
echo $dompdf->output();

//Baixa o arquivo no computador
//$dompdf->stream();
?>