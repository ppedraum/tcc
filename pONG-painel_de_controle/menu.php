<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel de Controle - Mundo</title>
</head>
<body>
    <?php session_start(); echo("olá, ".$_SESSION['login']); ?>
    <br><br>
    <p>Mundo - Painel de Controle</p>
    <br><br><br>
    <a href="src\webpages\pg_publicacoes.php"><button>Gerenciar Publicações</button></a>
    <a href="src\webpages\pg_ferramentas_ong.php"><button>Ferramentas da Instituição</button></a>
    <br><br><br>
    <a href="./src/php_stuff/logout.php"><button>Sair</button></a>
</body>
</html>