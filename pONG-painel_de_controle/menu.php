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
<div class="container">
<div class="fundo">
  <?php session_start(); echo "<div class=\"echo\"> <font size=6>",("Olá, ".$_SESSION['login']."!"),"</font></div>"; ?>
    <br><br>
    <div class="fotouser">
    <img src="user.png" width=100 height=100> <!-- aqui vai a foto do usuário  -->
    </div>
    <br><br><br>
    <div class="escrita">
    <b>pONG - Painel de Controle</b>
    </div>
    <br><br><br>
    <div class="botoes">
    <a href="src\webpages\pg_publicacoes.php"><input type="submit" value="Gerenciar Publicações" /></a>
    <a href="src\webpages\pg_ferramentas_ong.php"><input type="submit" value="Ferramentas da instituição" /></a>
    </div><br><br>
    <div class="botaosair">
    <a href="./src/php_stuff/logout.php"><input type="submit" value="Sair" /></a>
</div>
</div>
</div>
</body>
</html>