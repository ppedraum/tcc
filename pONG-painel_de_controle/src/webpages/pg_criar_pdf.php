<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mundo - Criar PDF</title>
    <link rel="stylesheet" href="../styles/main.css">
    <?php
    require "../php_stuff/ver_session.php";
    ver_session("../../index.php");
    ?>
    <script type="text/javascript" src="../scripts/preview_pdf.js"></script>
</head>
<body>
<header>
    <div class="mundo" >
        <img src = "../imgs/logo_cut.svg" alt="LOGO" width="200">
        <a href="./index.php">
            <h2>
                Painel de Controle MUNDO
            </h2>
        </a>

    </div>
    <div class="perfil" >
        <?php
        if($_SESSION['inst']['foto_perfil'] != null){
            echo " <img class='foto_perfil' src='data:image/jpeg;base64,".$_SESSION['inst']['foto_perfil']."'> ";
        }
        else{
            echo "<img class='foto_perfil' src='user.png'>";
        }
        ?>
        <div class="nome_inst" >
            <?php echo $_SESSION["inst"]["nome_fantasia"] ?>
        </div>
        <a href="./pg_perfil.php">
            Gerenciar Perfil
        </a>
        <div class="sair" >
            <a href="../php_stuff/logout.php">
                Sair
            </a>
        </div>
    </div>

</header>

<form method="post" enctype="multipart/form-data" action="../pdf/criar_pdf.php" class="cell">
    <div class="item_margin" >
        <label for="txt_titulo">Título*</label><br>
        <input type="text" id="txt_titulo" name="txt_titulo" required >
    </div>
    <div class="item_margin" >
        <label for="txt_conteudo">Conteúdo*</label><br>
        <textarea id="txt_conteudo" name="txt_conteudo" rows="15" cols="50" required ></textarea>
    </div>
    <div class="item_margin" >
        <label for="blob_poster">Imagem</label>
        <input type="file" id="blob_poster" name="blob_poster" >
    </div>
    <div class="item_margin" >
        <input type="submit" value="Gerar" name="bt_gerar_pdf" >
        <input type="reset" value="Resetar">
    </div>
</form>
<footer>
    <div>
        2022 - MUNDO
    </div>
    <div>
        <b>Criado Por:</b><br>
        Pedro Henrique Martins Virtuozo<br>
        Felipe Rodrigues Rossoni
    </div>
</footer>
</body>
</html>