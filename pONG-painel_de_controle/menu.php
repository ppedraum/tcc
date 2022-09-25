<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel de Controle - Mundo</title>
    <link rel="stylesheet" href="estilomenu.css" type="text/css">
</head>
<body>
    <h2>pONG - Adicionar Publicações<br><a href="../../menu.php"><img src = "./src/webpages/logo.svg" alt="LOGO" width="300" height="150"></a></h2>

<div class="container"> 
<div class="fundo">
  <?php session_start(); echo "<div class=\"echo\"> <font size=6>",("Olá, ".$_SESSION['login']."!"),"</font></div>"; ?>
    <br><br>
    <div class="fotouser">
    <img src="user.png" width=100 height=100> <!-- aqui vai a foto do usuário  -->
    </div>
    <br><br>
    <div class="botoes">
    <a href="src\webpages\pg_publicacoes.php"><button>Gerenciar Publicações</button></a>
    <a href="src\webpages\pg_ferramentas_ong.php"><button>Ferramentas da instituição</button></a>
    </div><br><br>
    <div class="botoes">
    <a href="./src/php_stuff/logout.php"><button>Sair</button></a>
</div>
</div>
</div>
</body>
</html>