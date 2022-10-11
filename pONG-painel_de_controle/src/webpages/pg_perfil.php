<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php
    require_once('../php_stuff/datab.php');
    require('../php_stuff/ver_session.php');
    
    ver_session('../../index.php');


    ?>


</head>
<body>
    <h2>
        MUNDO - Painel de Controle<br>
        <a href="../../menu.php"><img src = "../webpages/logo.svg" alt="LOGO" width="300" height="150"></a>
    </h2>
    <h1>Seu Perfil</h1>
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
    
    <div>
        Login: <br>
        <?php
        echo $_SESSION["inst"]["login"];
        ?>
    </div>
    <div>
        E-Mail: <br>
        <?php
        echo $_SESSION["inst"]["e_mail"];
        ?>
    </div>
    <div>
        Telefone: <br>
        <?php
        echo $_SESSION["inst"]["telefone"];
        ?>
    </div>
    <div id="apresentacao" >
        Apresentação do Perfil: <br>
        <?php
        echo $_SESSION["inst"]["apresentacao"];
        ?>
    </div>
    <div>
        CNPJ: <br>
        <?php
        echo $_SESSION["inst"]["CNPJ"];
        ?>
    </div>
    <div>
        Nome: <br>
        <?php
        echo $_SESSION["inst"]["nome"]
        ?>
    </div>
    <div>
        Nome Fantasia: <br>
        <?php
        echo $_SESSION["inst"]["nome_fantasia"]
        ?>
    </div>
    <div>
        Sede: <br>
        <?php
        echo $_SESSION["inst"]["sede"]." - ".$_SESSION["inst"]["cidade"].", ".$_SESSION["inst"]["UF"];
        echo "<br>CEP ".$_SESSION["inst"]["CEP"];
        ?>
    </div>

       


</body>
</html>