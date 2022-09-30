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

$dompdf->loadHtml('
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Poster</title>

    <style type="text/css" >

        #pch_titulo{
            font-weight: bold;
            font-size: 26px;
        }

        #pch_conteudo{
            font-size: 18px;
        }

        html{
        margin: 0px;
        padding: 0px;
        }

        body{
            text-align:center;
            background-color: #afd3eb;
            padding-left:20px;
            padding-right:20px;
            
        }

        hr{
        }

        .preview{
            display: inline-block;
            text-align: center;
            width: 100%;
            height: auto;
        }

        .prev_header{
            height: 5%;
        }

        .prev_ctt{
            height: 70%;
        }

        .prev_ctt p{
            text-align: left;
        }

        .prev_footer{
            text-align: center;
            height: 10%;
        }

        .img{
            margin-top: 20px;
        }


    </style>

</head>
<body>
    <section class="preview" >
        <div class="prev_header" >
                <p id="pch_titulo" >
                Aqui vai o título do seu pôster.
                </p>
        </div>

        <hr>
        <div class="prev_ctt" >
            <p id="pch_conteudo">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
            </p>
            <img src="./isalinda.jpg" >
        </div>
        <img src="">
        <hr>
        <div class="prev_footer" >
            <img src="./logo_cut.svg" width=200 >
            <p>Gerado por - MUNDO App</p> 
        </div>
    </section>
</body>
</html>
');

// (Optional) Setup the paper size and orientation
$dompdf->setPaper('A4', 'portrait');

// Render the HTML as PDF
$dompdf->render();

header('Content-type: application/pdf');

// Só mostra no browser
echo $dompdf->output();

//Baixa o arquivo no computador
//$dompdf->stream();
?>