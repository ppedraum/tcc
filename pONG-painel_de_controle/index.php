<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="estilo.css" type="text/css">
</head>
<body>
<div class="container">
<div class="login">
<div class="logo">
<img src = "./src/webpages/logo.svg" alt="LOGO" width="600" height="300">
</div>
<div class ="form">
    <form action="" method="get">
    Login: <input type="text" name='login'> <br>
    <br>
    Senha: <input type="password" name="senha"> <br>
    <br><br>
    <div class="botao">
    <input type="submit" value="Enviar" name='bt_login'>    
    </div>

<!--     <a href='./src/webpages/cadastro.php'>
        Não possui conta? Cadastre-se
    </a> -->

    </form>
</div>
<br><br><br>
    <div class="plz">
    <?php
    require_once './src/php_stuff/datab.php';

    if(isset($_GET['bt_login'])){
        $login = $_GET['login'];
        $senha = $_GET['senha'];
        $query = mysqli_query($conn, "select * from ONG where login = '$login' and senha = '$senha' ");
        if(mysqli_num_rows($query) != 0){
            $query = $query->fetch_assoc();
            session_start();
            $_SESSION['inst'] = $query;
            header('Location:./src/webpages/index.php');
        }else{
            echo('Login ou senha inválidos!');
        }
    }


    ?>
    </div>

    </div>
    </div>
</body>
</html>