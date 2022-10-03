<?php

require '../../vendor/autoload.php';
// reference the Dompdf namespace
use Dompdf\Dompdf;
use Dompdf\Options;

$titulo = $_POST["txt_titulo"];
$conteudo = $_POST["txt_conteudo"];
$blob_poster = $_FILES['blob_poster']['tmp_name'];

$placeholders = [
    "PLACEHOLDER_TITULO", 
    "PLACEHOLDER_CONTEUDO",
    "PLACEHOLDER_IMG_TAG"
];

$conteudos = [
    $titulo, 
    $conteudo,
    ""
];

if(!empty($blob_poster)){
    $blob_poster = file_get_contents($blob_poster);
    $blob_poster = base64_encode($blob_poster);

    $conteudos[2] = "<img src='data:image/jpeg;base64,$blob_poster' width='700' >";
}


$ctt = file_get_contents('./layout.html');

$options = new Options();

//seta a root padrão do dompdf para que ele possa pegar arquivos (qualquer arquivo fora da pasta não vai poder ser renderizada)
$options->setChroot(__DIR__);

//Autoriza arquivos pegados via req http serem renderizados
$options->setIsRemoteEnabled(true);


// instantiate and use the dompdf class
$dompdf = new Dompdf($options);

$ctt = str_replace(
    $placeholders,
    $conteudos,
    $ctt );

$dompdf->loadHtml($ctt);

// (Optional) Setup the paper size and orientation
$dompdf->setPaper('A4', 'portrait');

// Render the HTML as PDF
$dompdf->render();

header('Content-type: application/pdf');
// Só mostra no browser
//echo $dompdf->output();

//Baixa o arquivo no computador
$dompdf->stream('poster.pdf');
?>