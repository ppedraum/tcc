<?php

require("./ver_session.php");
require_once("./datab.php");

ver_session('../../index.php');

if(isset($_POST["bt_cancelar"])){
    header('Location: ../../menu.php');
}

if(isset($_POST["bt_alterar"])){
    $email = $_POST["txt_email"];
    $apresentacao = $_POST["txt_apresentacao"];
    $ver_senha = $_POST["txt_ver_senha"];
    $nova_senha = $_POST["txt_nova_senha"];
    $foto = $_FILES["blob_perfil"];

    if($ver_senha == $_SESSION["inst"]["senha"]){

        if(strlen($nova_senha) == 0 or strlen(trim($nova_senha)) == 0 ){
            $nova_senha = $_SESSION["inst"]["senha"];
        }

/*         $update = mysqli_query($conn, "
        update table ong set e_mail = $email , senha = $nova_senha, apresentacao = $apresentacao
        where id = ".$_SESSION["inst"]["id"]."
        "); */

        echo "
        update table ong set e_mail = '$email' , senha = '$nova_senha', apresentacao = '$apresentacao'
        where id = ".$_SESSION["inst"]["id"]."
        ";


    }





}