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
    <h1>Seu Perfil</h1>
    <a href="pg_perfil_alterar.php"><button>Alterar Informações...</button></a> 
    <p>
        <?php
        echo $_SESSION["inst"]["nome"]
        ?>
    </p>
    <p>
        <?php
        echo $_SESSION["inst"]["nome_fantasia"]
        ?>
    </p>
    <div id="apresentacao" >
        <?php
        echo $_SESSION["inst"]["apresentacao"];
        ?>
    </p>

       


</body>
</html>