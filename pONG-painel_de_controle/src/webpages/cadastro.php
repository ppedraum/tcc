<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
</head>

<?php
    require_once('../php_stuff/datab.php');

    $areas_atuacao = mysqli_query($conn, 'select * from area_atuacao');
    require "../php_stuff/ver_session.php";
    ver_session("../../index.php");
?>

<body>
    <h1>Cadastro</h1>
    <form action="" method="post">

    <h3>Dados de Login</h3>
    Login: <input type="text" name="txt_login" > <br>
    Senha: <input type="text" name='txt_senha' > <br>

    <h3>Dados Gerais</h3>
    CNPJ da Instituição: <input type="text" name='txt_cnpj' > <br>
    Nome Oficial: <input type="text" name="txt_nome" > <br>
    Nome Fantasia: <input type="text" name='txt_nome_fantasia' > <br>
    Telefone para Contato: <input type="text" name='txt_telefone' > <br>
    Área de Atuação : 
    <select name='sel_area_atuacao' >
        <?php
        while($row = $areas_atuacao->fetch_assoc()){
            echo "<option value=".$row['id'].">".$row['titulo']."</option>";
        }
        ?>
    </select>
    Apresentação: <br>
    <textarea rows="5" 
    placeholder="
    Escreva uma apresentação da sua instituição para que outras pessoas possam entender mais sobre o que você faz e por que você existe!
    "
    name='txt_apresentacao'
    ></textarea>
    <h3>Dados da Sede</h3>
    Sede: <input type="text" name='txt_sede' > <br>
    Cidade: <input type="text" name='txt_cidade' > <br>
    Estado: <input type="text" name='sel_uf' > <br>
    CEP: <input type="text" name='txt_cep' > <br>
    Data de Abertura: <input type="date" name='data_abertura' > <br>
    <input type="file" name="blob_perfil" id="blob_perfil" > <br>
    <input type='submit' name='bt_submit' value="Enviar" >
    <input type="reset" value="Resetar">
    </form>

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


