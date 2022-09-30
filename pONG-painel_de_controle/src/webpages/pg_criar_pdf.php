<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script type="text/javascript" src="../scripts/preview_pdf.js"></script>

    <style type="text/css" >

        .preview{
            display: inline-block;
            text-align: center;
            width: 400px;
            height: 564px;
            scale: 1;
        }

        .prev_header{
            margin: 20px;
        }

        .prev_ctt{
            height: 30vh;
        }

        .prev_footer{
            text-align: center;
        }

        .img{
            margin-top: 20px;
        }


    </style>


</head>
<body>
    <div >
        <form method="GET" action="../pdf/criar_pdf.php" style="display: inline-block;">
            <div>
                <label for="txt_titulo">Título</label><br>
                <input type="text" id="txt_titulo" name="txt_titulo" >
            </div>
            <div>
                <label for="txt_conteudo">Conteúdo</label><br>
                <textarea id="txt_conteudo" name="txt_conteudo" rows="5" cols="30" ></textarea>
            </div>
            <div>
                <label for="blob_poster">Imagem</label>
                <input type="file" id="blob_poster" name="blob_poster" >
            </div>
            <div>
                <input type="submit" value="Gerar" name="bt_gerar_pdf" >
            </div>
        </form>
        <input onclick="alterarValores()" type="submit" value="Aplicar" name="bt_ctt_pdf" >
        <section class="preview" >
            <div class="prev_header" >
                <h2>
                    <p id="pch_titulo" >
                    Aqui vai o título do seu pôster.
                    </p>
                </h2>
            </div>

            <hr>
            <div>
                <p id="pch_conteudo" class="prev_ctt"  >
                Aqui vai o conteúdo do seu pôster.
                </p>
            </div>
            <img src="">
            <hr>
            <div class="prev_footer" >
                <img src="./logo_cut.svg" width="200" class="img" >
                <p>Gerado por - MUNDO App</p> 
            </div>
            
            
        </section>
    </div>

</body>
</html>