<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="./src/styles/main.css" type="text/css">
    <link rel="stylesheet" href="./src/styles/login.css" type="text/css">
</head>
<body>
<div id="conteudo_login" >
    <img src = "./src/imgs/logo_cut.svg" alt="LOGO" width="400">
    <form action="" method="get">
        
            <div class="item_margin" >
                <b>Login:</b><br>
                <input type="text" name='login'>
            </div>
            <div class="item_margin" >
                <b>Senha:</b><br><input type="password" name="senha">
            </div>
            <div class="item_margin" >
                <input type="submit" value="Enviar" name='bt_login'>    
            </div>
    </form>
</div>
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

</body>

</html>