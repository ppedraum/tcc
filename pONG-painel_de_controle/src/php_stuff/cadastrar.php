<?php

require_once('./datab.php');

$CNPJ = $_POST['txt_cnpj'];
$login = $_POST['txt_login'];
$senha = $_POST['txt_senha'];
$nome = $_POST['txt_nome'];
$nome_fantasia = $_POST['txt_nome_fantasia'];
$apresentacao = $_POST['txt_apresentacao'];
$sede = $_POST['txt_sede'];
$cidade = $_POST['txt_cidade'];
$UF = $_POST['sel_uf'];
$CEP = $_POST['txt_cep'];
$telefone = $_POST['txt_telefone'];
$data_abertura = $_POST['data_abertura'];
$id_area_atuacao = $_POST['sel_area_atuacao'];

if(isset($_POST['bt_submit'])){
    
    $status = $statusMsg = 'erro na imagem'; 
    if(!empty($_FILES["blob_perfil"]["name"])) { 
        // Get file info 
        $fileName = basename($_FILES["blob_perfil"]["name"]); 
        $fileType = pathinfo($fileName, PATHINFO_EXTENSION); 
        
        // Allow certain file formats 
        $allowTypes = array('jpg','png','jpeg'); 
        if(in_array($fileType, $allowTypes)){ 
            $image = $_FILES['blob_perfil']['tmp_name']; 
            $imgContent = addslashes(file_get_contents($image)); 

        }else{ 
            $statusMsg = 'Desculpe, apenas imagens são suportadas.'; 
        } 
    }else{ 
        $statusMsg = 'Por favor, selecione uma imagem para o evento.'; 
    }
    $query = mysqli_query(
        $conn,
        "
        insert into ong_unchecked(CNPJ, login, senha, nome, nome_fantasia, apresentacao, sede, cidade, UF, CEP, telefone, data_abertura, id_area_atuacao, foto_perfil) 
        values(
            $CNPJ,
            '$login',
            '$senha',
            '$nome',
            '$nome_fantasia',
            '$apresentacao',
            '$sede',
            '$cidade',
            '$UF',
            '$CEP',
            '$telefone',
            '$data_abertura:00',
            $id_area_atuacao,
            '$imgContent'
        )
        "
    );
    if($query){
        echo "
        <h2>Inscrição Concluída!</h2>
        Em breve, nossa equipe analisará os dados de sua instituição para validar seu acesso.
        Muito obrigado por participar! Você será redirecionado em breve.
        ";
        echo $statusMsg;
        echo" <script>setTimeout(()=>{window.location.href = '../../index.php'}, 10000)</script> ";
    }
}

?>