    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel de Controle - Mundo</title>
    <link rel="stylesheet" href="estilomenu.css" type="text/css">
    <?php
    require "./src/php_stuff/ver_session.php";

    ver_session("./index.php");
    ?>
</head>
<body>
    <header class='header_logo'>
        <img src = "./src/webpages/logo.svg" alt="LOGO" width="300" height="150">
        <h2>MUNDO - Painel de Controle</h2>
    </header>
    
<div class="fundo">
    <?php echo "<div class=\"echo\"> <font size=6>",("Olá, ".$_SESSION['inst']['nome_fantasia']."!"),"</font></div>"; ?>
    <div>
        <a href="./src/webpages/pg_perfil.php">
        <?php
        if($_SESSION['inst']['foto_perfil'] != null){
            echo " <img width='100' src='data:image/jpeg;base64,".$_SESSION['inst']['foto_perfil']."'> ";
        }
        else{
            echo "<img src='user.png' width=100 height=100>";
        }
        ?>
        </a>
    </div>
    <div class="botoes">
        <a href="src\webpages\pg_publicacoes.php"><button>Gerenciar Publicações</button></a>
        <a href="src\webpages\pg_ferramentas_ong.php"><button>Ferramentas da instituição</button></a>
    </div>
    <div class="botoes">
        <a href="./src/php_stuff/logout.php"><button>Sair</button></a>
    </div>
</div>
</body>
</html>