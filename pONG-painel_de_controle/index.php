<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <form action="" method="get">
    login: <input type="text" name='login'> <br>
    senha: <input type="password" name="senha"> <br>
    <input type="submit" value="Enviar" name='bt_login'>

    </form>
    <?php
    require_once './src/php_stuff/datab.php';

    if(isset($_GET['bt_login'])){
        $login = $_GET['login'];
        $senha = $_GET['senha'];
        $query = mysqli_query($conn, "select * from ONG where login = '$login' and senha = '$senha' ");
        if(mysqli_num_rows($query) != 0){
            session_start();
            $_SESSION['login'] = $login;
            $_SESSION['senha'] = $senha;
            $_SESSION['id_ong'] = $query->fetch_assoc();
            header('Location:menu.php');
        }else{
            echo('Login ou senha inválidos!');
        }
    }


    ?>
</body>
</html>