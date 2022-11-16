<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil</title>

    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../styles/perfil.css">
    <?php
    require_once('../php_stuff/datab.php');
    require('../php_stuff/ver_session.php');
    
    ver_session('../../index.php');


    ?>

    <link rel="stylesheet" href="estiloperfil.css" type="text/css">
</head>
<body>

<header>
    <div class="mundo" >
        <a href="./index.php">
            <img src = "../imgs/logo_cut.svg" alt="LOGO" width="200">
            <h2>
                Painel de Controle MUNDO
            </h2>
        </a>

    </div>
</header>

<div id="conteudo_perfil" >

        <h2>
            Seu Perfil
        </h2>
    <div class="perfil" >
        <div class="item" >
            <?php
            if($_SESSION['inst']['foto_perfil'] != null){
                echo " <img class='foto_perfil' src='data:image/jpg;base64,".$_SESSION['inst']['foto_perfil']."'> ";
            }
            else{
                echo " class='foto_perfil' <img src='../../user.png'";
            }
            ?>
        </div>

        <div class="item" >
            <a href="pg_perfil_alterar.php">
                <button>Alterar Informações...</button>
            </a> 
        </div>
    </div>

        <table>

            <tr>
                <td>
                    Login:
                </td> 
                <td>
                    <?php
                    echo $_SESSION["inst"]["login"];
                    ?>
                </td>

            </tr>

            <tr>
                <td>
                    E-Mail:
                </td> 
                <td>
                    <?php
                    echo $_SESSION["inst"]["e_mail"];
                    ?>
                </td>

            </tr>

            <tr>
                <td>
                    Telefone:
                </td>
                <td>
                    <?php
                    echo $_SESSION["inst"]["telefone"];
                    ?>
                </td>

            </tr>

            <tr>
                <td>
                    Apresentação do Perfil:
                </td>
                <td>
                    <?php
                    echo $_SESSION["inst"]["apresentacao"];
                    ?>
                </td>

            </tr>

            <tr>
                <td>
                    CNPJ:
                </td> 
                <td>
                    <?php
                    echo $_SESSION["inst"]["CNPJ"];
                    ?>
                </td>

            </tr>

            <tr>
                <td>
                    Nome:
                </td>
                <td>
                    <?php
                    echo $_SESSION["inst"]["nome"]
                    ?>
                </td>

            </tr>

            <tr>
                <td>
                    Nome Fantasia:
                </td> 
                <td>
                    <?php
                    echo $_SESSION["inst"]["nome_fantasia"]
                    ?>
                </td>

            </tr>

            <tr>
                <td>
                    Sede:
                </td> 
                <td>
                    <?php
                    echo $_SESSION["inst"]["sede"]." - ".$_SESSION["inst"]["cidade"].", ".$_SESSION["inst"]["UF"];
                    echo " - CEP ".$_SESSION["inst"]["CEP"];
                    ?>
                </td>

            </tr>
        </table>
</div>

<footer>
    <div>
        2022 - MUNDO
    </div>
    <div>
        <b>Criado Por:</b><br>
        Pedro Henrique Martins Virtuozo<br>
        Felipe Rodrigues Rossoni
    </div>
</footer>
</body>
</html>