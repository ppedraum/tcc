<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php
    require("../php_stuff/ver_session.php");
    ver_session("../../index.php");
    
    ?>
</head>
<body>
    <form action="../php_stuff/alterar_info.php" method="POST" autocomplete="off" >
        <div>
            Apresentação <br>
            <textarea id="txt_apresentacao"name="txt_apresentacao" id="" cols="30" rows="10" >
                <?php echo $_SESSION["inst"]["apresentacao"] ?>
            </textarea> 
        </div>
        <div>
            Email <br>
            <input type="text" name="txt_email" value="<?php echo $_SESSION["inst"]["e_mail"] ?>" >
        </div>
        <div>
            Login <br>
            <input type="text" name="txt_login" value="<?php echo $_SESSION["inst"]["login"] ?>" >
        </div>
        <div>
            <div>
                Senha Atual <br>
                <input type="password" name="txt_ver_senha" value="" >
            </div>
            <div onclick="show_senha()">
                Senha <br>
                <input type="password" name="txt_nova_senha">
            </div>
            <div id="confirmar_senha" hidden >
                Confirmar Senha: <br>
                <input type="password" name="txt_confirmar_senha" >
            </div>
            
        </div>
        <div>
            <input name="bt_alterar" type="submit" value="Alterar">
            <input type="reset" value="Resetar">
            <input name="bt_cancelar" type="submit" value="Cancelar">
        </div>
        <div>
            Para alterar as demais informações da sua instituição, entre em contato conosco.
        </div>
    </form>
    <script type="text/javascript">
        function show_senha(){
            document.getElementById("confirmar_senha").removeAttribute("hidden");
        }
    </script>

</body>
</html>