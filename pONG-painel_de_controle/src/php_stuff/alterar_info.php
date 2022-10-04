<?php

use FontLib\Table\Type\head;

require("./ver_session.php");
require_once("./datab.php");

ver_session('../../index.php');

if(isset($_POST["bt_cancelar"])){
    header('Location: ../../menu.php');
}

if(isset($_POST["bt_alterar"])){

    $ver_senha = $_POST['txt_ver_senha'];

    if($ver_senha == $_SESSION["inst"]["senha"]){
        $update = 'update ong set ';

        if(isset($_POST['chb_apresentacao'])){
            $update .= "apresentacao = '".$_POST['txt_apresentacao']."', "  ;
        }

        if(isset($_POST['chb_email'])){
            $update .= "e_mail = '".$_POST['txt_email']."', "  ;
        }

        if(isset($_POST['chb_telefone'])){
            $update .= "telefone = '".$_POST['txt_telefone']."', "  ;
        }

        if(isset($_POST['chb_login'])){
            $update .= "login = '".$_POST['txt_login']."', "  ;
        }

        if(isset($_POST['chb_senha'])){
            $update .= "senha = '".$_POST['txt_nova_senha']."', "  ;
        }

        if($update == 'update ong set '){
            echo 'nada foi alterado';
        }
        else{
            $update = substr_replace($update, '', -2, -1);

            $update .= 'where id = '.$_SESSION["inst"]["id"];

            echo $update;

            $query = mysqli_query($conn, $update);

            if($query){
                echo '<br>';
                echo $update;
                $inst = mysqli_query($conn, 'select * from ong where id = '.$_SESSION['inst']['id']);
                $inst = $inst->fetch_assoc();
                echo 'saindao';
                $_SESSION['inst'] = $inst;
                header('Location: ../webpages/pg_perfil.php');
            }
            else{
                echo 'Algo deu errado, desculpe.';
            }
        }


        
    }
    else{
        header('Location: ../webpages/pg_perfil_alterar.php');
    }





}