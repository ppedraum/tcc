    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel de Controle - Mundo</title>
    <link rel="stylesheet" href="./src/styles/main.css">
    <?php
    require "./src/php_stuff/ver_session.php";
    ver_session("./index.php");
    ?>
</head>
<body>
<<<<<<< HEAD
    <header class='header_logo'>
        <img src = "./src/webpages/logo.svg" alt="LOGO" width="300" height="150">
        <h2>MUNDO - Painel de Controle</h2>
    </header>
    
<div class="fundo">
    <?php echo "<div class=\"echo\"> <font size=6>",("Olá, ".$_SESSION['inst']['nome_fantasia']."!"),"</font></div>"; ?>
    <div>
=======
<header>
    <div class="mundo" >
        <h1>MUNDO</h1>
        <img src = "./src/imgs/logo.svg" alt="LOGO" width="300" height="150">
    </div>
    
    <div class="perfil" >
>>>>>>> ca9272cc29c0fa9c85dea9e4c0c43436144abdaa
        <a href="./src/webpages/pg_perfil.php">
            <?php
            if($_SESSION['inst']['foto_perfil'] != null){
                echo " <img class='foto_perfil' src='data:image/jpeg;base64,".$_SESSION['inst']['foto_perfil']."'> ";
            }
            else{
                echo "<img class='foto_perfil' src='user.png'>";
            }
            ?>
        </a>
        <div>
            <?php echo $_SESSION["inst"]["nome_fantasia"] ?>
        </div>
        <a href="./src/webpages/pg_perfil.php">
            Gerenciar Perfil
        </a>
    </div>
<<<<<<< HEAD
    <div class="botoes">
        <a href="src\webpages\pg_publicacoes.php"><button>Gerenciar Publicações</button></a>
        <a href="src\webpages\pg_ferramentas_ong.php"><button>Ferramentas da instituição</button></a>
    </div>
    <div class="botoes">
        <a href="./src/php_stuff/logout.php"><button>Sair</button></a>
    </div>
=======

</header>


<div> 

    <div class="botoes">

        <a href="src\webpages\pg_publicacoes.php">
            <button>Gerenciar Publicações</button>
        </a>

        <a href="src\webpages\pg_ferramentas_ong.php">
            <button>Ferramentas da instituição</button>
        </a>

    </div>
    <div class="botoes" >
        <a href="./src/php_stuff/logout.php">
            <button>Sair</button>
        </a>
    </div>

>>>>>>> ca9272cc29c0fa9c85dea9e4c0c43436144abdaa
</div>
</body>



</html>