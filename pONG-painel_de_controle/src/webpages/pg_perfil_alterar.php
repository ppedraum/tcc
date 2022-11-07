<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar perfil</title>
    <?php
    require("../php_stuff/ver_session.php");
    ver_session("../../index.php");
    
    //$curr_errs = ['senha'=>''];

    /* if(isset($_GET['errs'])){
        $errs = $_GET['errs'];
        $errs = explode(',', $errs);
        foreach($errs as $err){
            if($err == 'senha'){
               $curr_errs['senha'] = 'As senhas não coicidem.';
            }
        }
    } */


    ?>
<link rel="stylesheet" href="estiloeditarperfil.css" type="text/css">
</head>
<body>
    <h2>
        MUNDO - Editar perfil<br>
        <a href="../../menu.php"><img src = "../webpages/logo.svg" alt="LOGO" width="300" height="150"></a>
    </h2>
    <div class="container">
    <div class='quadrado'>
    <div class='conteudo'>
    <form action="../php_stuff/alterar_info.php" method="POST" autocomplete="off" enctype="multipart/form-data" >
        <div class="meinho">
        <div id='fotoperfil'>
            <b>Foto de Perfil</b>
            <input onclick="enable('chb_foto_perfil', 'blob_perfil')" type="checkbox" name="chb_foto_perfil" id="chb_foto_perfil">
            <br>
            <input type="file" name="blob_perfil" id="blob_perfil" disabled >
        </div>
        <div>
        <b>Apresentação</b>
            <input onclick="enable('chb_apresentacao', 'txt_apresentacao')" type="checkbox" name="chb_apresentacao" id="chb_apresentacao">
            <br>
            <textarea id="txt_apresentacao" name="txt_apresentacao" id="" cols="30" rows="10" disabled >
                <?php echo $_SESSION["inst"]["apresentacao"] ?>
            </textarea> 
        </div>
        <div>
        <b>Email</b>
            <input onclick="enable('chb_email', 'txt_email')" type="checkbox" name="chb_email" id="chb_email">
            <br>
            <input type="text" name="txt_email" id="txt_email" value="<?php echo $_SESSION["inst"]["e_mail"] ?>" disabled >
        </div>
        <div>
        <b>Login</b>
            <input type="checkbox" onclick="enable('chb_login', 'txt_login')" name="chb_login" id="chb_login">
            <br>
            <input type="text" name="txt_login" id="txt_login" value="<?php echo $_SESSION["inst"]["login"] ?>" disabled >
        </div>
        <div>
        <b>Telefone</b>
            <input type="checkbox" onclick="enable('chb_telefone', 'txt_telefone')" name="chb_telefone" id="chb_telefone">
            <br>
            <input type="text" name="txt_telefone" id="txt_telefone" value="<?php echo $_SESSION["inst"]["telefone"] ?>" disabled >
        </div>
        <div>
            <div>
                <?php /* echo $curr_errs['senha'].'<br>' */ ?>
                <b>Senha</b>
                <input type="checkbox" onclick="show_senha()" name="chb_senha" id="chb_senha">
                <br>
                <input type="password" name="txt_nova_senha" id="txt_nova_senha" disabled >
            </div>
            <div id="confirmar_senha" hidden >
            <b>Confirmar Senha:</b> <br>
                <input type="password" name="txt_confirmar_senha" >
            </div>
            
        </div>
        <div>
        <div>
        <b>Digite sua senha atual para alterar seu perfil</b> <br>
            <input type="password" name="txt_ver_senha" value="" >
            </div>
        </div>
        </div>
        <div class="botaozao">
            <input name="bt_alterar" type="submit" value="Alterar">
            <input type="reset" value="Resetar">
            <input name="bt_cancelar" type="submit" value="Cancelar">
        </div>
        <div>
            Para alterar as demais informações da sua instituição, entre em contato conosco.
        </div>
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
                document.getElementById('txt_confirmar_senha').removeAttribute('disabled');
            }
            else{
                document.getElementById('confirmar_senha').setAttribute('hidden', true);
                document.getElementById('txt_confirmar_senha').setAttribute('disabled', true);
            }
        }

        function match_senha(){
            let nova_senha = document.getElementById('txt_nova_senha').value;
            let ver = document.getElementById('txt_confirmar_senha').value;

            if(nova_senha != ver){

            }

        }

    </script>
</div></div>
</body>
</html>