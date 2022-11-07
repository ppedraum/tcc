<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil</title>
    <?php
    require_once('../php_stuff/datab.php');
    require('../php_stuff/ver_session.php');
    
    ver_session('../../index.php');


    ?>

<link rel="stylesheet" href="estiloperfil.css" type="text/css">
</head>
<body>

<h2>MUNDO - Perfil<br><a href="../../menu.php"><img src = "logo.svg" alt="LOGO" width="300" height="150"></a></h2>
    <div class="container">
        <div id='quadrado'>
        <div id='conteudo'>
        <div id='words'>
        <text><b>Seu Perfil</b></text>
        </div>
        <div>
        <?php
        if($_SESSION['inst']['foto_perfil'] != null){
            echo " <img width='100' src='data:image/jpg;base64,".$_SESSION['inst']['foto_perfil']."'> ";
        }
        else{
            echo "<img src='../../user.png' width=100 height=100>";
        }
        ?>
        </div>

        <a href="pg_perfil_alterar.php"><button>Alterar Informações...</button></a> 
        <div id='quadrado2'>
        <div>
            <b>Login:</b> <br>
            <?php
            echo $_SESSION["inst"]["login"];
            ?>
        </div>
        _______________________________________________________
        <div>
        <b>E-Mail:</b> <br>
            <?php
            echo $_SESSION["inst"]["e_mail"];
            ?>
        </div>
        _______________________________________________________
        <div>
        <b> Telefone:</b> <br>
            <?php
            echo $_SESSION["inst"]["telefone"];
            ?>
        </div>
        _______________________________________________________
        <div id="apresentacao" >
        <b>Apresentação do Perfil:</b> <br>
            <?php
            echo $_SESSION["inst"]["apresentacao"];
            ?>
        </div>
        _______________________________________________________
        <div>
        <b>CNPJ:</b> <br>
            <?php
            echo $_SESSION["inst"]["CNPJ"];
            ?>
        </div>
        _______________________________________________________
        <div>
        <b> Nome:</b> <br>
            <?php
            echo $_SESSION["inst"]["nome"]
            ?>
        </div>
        _______________________________________________________
        <div>
        <b>  Nome Fantasia:</b> <br>
            <?php
            echo $_SESSION["inst"]["nome_fantasia"]
            ?>
        </div>
        _______________________________________________________
        <div>
        <b>Sede:</b> <br>
            <?php
            echo $_SESSION["inst"]["sede"]." - ".$_SESSION["inst"]["cidade"].", ".$_SESSION["inst"]["UF"];
            echo "<br>CEP ".$_SESSION["inst"]["CEP"];
            ?>
        </div></div></div>   
    </div>

       


</body>
</html>