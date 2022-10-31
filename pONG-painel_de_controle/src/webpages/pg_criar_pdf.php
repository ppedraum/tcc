<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mundo - Criar PDF</title>
    <link rel="stylesheet" href="./estiloaddpub.css" type="text/css" >
    <script type="text/javascript" src="../scripts/preview_pdf.js"></script>
    <?php
    require "../php_stuff/ver_session.php";
    ver_session("../../index.php");
    ?>
</head>
<body>
    <div>
    <h2>
        MUNDO - Criar PDF<br>
        <a href="../../menu.php">
            <img src = "./logo.svg" alt="LOGO" width="300" height="150">
        </a>
        
    </h2>
    </div>

    <div class="border_container" >
        <form method="post" enctype="multipart/form-data" action="../pdf/criar_pdf.php" class="cell">
            <div>
                <label for="txt_titulo">Título*</label><br>
                <input type="text" id="txt_titulo" name="txt_titulo" required >
            </div>
            <div>
                <label for="txt_conteudo">Conteúdo*</label><br>
                <textarea id="txt_conteudo" name="txt_conteudo" rows="15" cols="50" required ></textarea>
            </div>
            <div>
                <label for="blob_poster">Imagem</label>
                <input type="file" id="blob_poster" name="blob_poster" >
            </div>
            <div>
                <input type="submit" value="Gerar" name="bt_gerar_pdf" >
                <input type="reset" value="Resetar">
            </div>
        </form>
        <div class="cell" >
        </div>
        
    </div>
</body>
</html>