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
            Apresentação
            <input onclick="enable('chb_apresentacao', 'txt_apresentacao')" type="checkbox" name="chb_apresentacao" id="chb_apresentacao">
            <br>
            <textarea id="txt_apresentacao" name="txt_apresentacao" id="" cols="30" rows="10" disabled >
                <?php echo $_SESSION["inst"]["apresentacao"] ?>
            </textarea> 
        </div>
        <div>
            
            Email
            <input onclick="enable('chb_email', 'txt_email')" type="checkbox" name="chb_email" id="chb_email">
            <br>
            <input type="text" name="txt_email" id="txt_email" value="<?php echo $_SESSION["inst"]["e_mail"] ?>" disabled >
        </div>
        <div>
            Login
            <input type="checkbox" onclick="enable('chb_login', 'txt_login')" name="chb_login" id="chb_login">
            <br>
            <input type="text" name="txt_login" id="txt_login" value="<?php echo $_SESSION["inst"]["login"] ?>" disabled >
        </div>
        <div>
            Telefone
            <input type="checkbox" onclick="enable('chb_telefone', 'txt_telefone')" name="chb_telefone" id="chb_telefone">
            <br>
            <input type="text" name="txt_telefone" id="txt_telefone" value="<?php echo $_SESSION["inst"]["telefone"] ?>" disabled >
        </div>
        <div>
            <div>
                Senha
                <input type="checkbox" onclick="show_senha()" name="chb_senha" id="chb_senha">
                <br>
                <input type="password" name="txt_nova_senha" id="txt_nova_senha" disabled >
            </div>
            <div id="confirmar_senha" hidden >
                Confirmar Senha: <br>
                <input type="password" name="txt_confirmar_senha" >
            </div>
            
        </div>
        <div>
        <div>
            Digite sua senha atual para alterar seu perfil <br>
            <input type="password" name="txt_ver_senha" value="" >
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

        function enable(id, target){
            if(document.getElementById(id).checked){
                document.getElementById(target).removeAttribute('disabled');
            }
            else{
                document.getElementById(target).setAttribute('disabled', true);
            }
        }

        function show_senha(){

            enable('chb_senha', 'txt_nova_senha');
            if(document.getElementById('chb_senha').checked){
                document.getElementById('confirmar_senha').removeAttribute('hidden');
            }
            else{
                document.getElementById('confirmar_senha').setAttribute('hidden', true);
            }
        }
    </script>

</body>
</html>