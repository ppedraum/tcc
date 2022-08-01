
<?php

date_default_timezone_set('America/Sao_Paulo');

require_once ('datab.php');

session_start();
$id_ONG = 1;

$titulo = $_POST['txt_titulo'];
$descricao = $_POST['txt_descricao'];

$rd_tipo_publicacao = $_POST['rd_tipo_publicacao'];
$datetime_atual = date("Y-m-d H:i:s");

$query_publicacao = '';

if (!$conn) {
    die("Erro de conexão: " . mysqli_connect_error());
}


if(isset($_POST['bt_submit_publicacao'])){

    if($rd_tipo_publicacao == 'publicacao'){
        $query_publicacao = "insert into Publicacao (
            titulo, descricao, qtd_likes, qtd_compartilhamentos, datetime_publicacao,
            tipo_publicacao, id_ONG
        ) values (
            '$titulo',
            '$descricao',
            0,
            0,
            '$datetime_atual',
            'PUBLICACAO',
            $id_ONG
        )";

    }elseif($rd_tipo_publicacao == 'evento'){

        $endereco_evento = $_POST['txt_endereco_evento'];
        $cidade_evento = $_POST['txt_cidade_evento'];
        $estado_evento = $_POST['sel_estado_evento'];
        $date_inicio_evento = $_POST['date_inicio_evento'];
        $date_fim_evento = $_POST['date_fim_evento'];
        $hor_inicio_evento = $_POST['time_inicio_evento'];
        $hor_fim_evento = $_POST['time_fim_evento'];

        $status = $statusMsg = 'erro na imagem'; 
        if(!empty($_FILES["blob_evento"]["name"])) { 
            // Get file info 
            $fileName = basename($_FILES["blob_evento"]["name"]); 
            $fileType = pathinfo($fileName, PATHINFO_EXTENSION); 
            
            // Allow certain file formats 
            $allowTypes = array('jpg','png','jpeg'); 
            if(in_array($fileType, $allowTypes)){ 
                $image = $_FILES['blob_evento']['tmp_name']; 
                $imgContent = addslashes(file_get_contents($image)); 

            }else{ 
                $statusMsg = 'Desculpe, apenas imagens são suportadas.'; 
            } 
        }else{ 
            $statusMsg = 'Por favor, selecione uma imagem para o evento.'; 
        }

        $id_tipo_evento = $_POST['sel_tipo_evento'];

        $query_evento = "insert into Evento 
        (endereco, cidade, UF, datetime_inicio, datetime_fim,
        qtd_inscricoes, foto, id_tipo_evento, id_ONG)

        values (
            '$endereco_evento',
            '$cidade_evento',
            '$estado_evento',
            '$date_inicio_evento $hor_inicio_evento:00 ',
            '$date_fim_evento $hor_fim_evento:00',
            0,
            '$imgContent',
            $id_tipo_evento,
            $id_ONG
        ) ";

        if (mysqli_query($conn, $query_evento)) {
            debug_log( "Evento criado!");
        } else {
            debug_log( "Erro: ".$query_evento."<br>".mysqli_error($conn));
        }
        debug_log( $statusMsg); 

        
        $id_evento = $conn->insert_id;

        $query_publicacao = "insert into Publicacao (
            titulo, descricao, qtd_likes, qtd_compartilhamentos, datetime_publicacao,
            tipo_publicacao, id_ONG, id_evento
        ) values (
            '$titulo',
            '$descricao',
            0,
            0,
            '$datetime_atual',
            'EVENTO',
            $id_ONG,
            $id_evento
        )";
    }elseif($rd_tipo_publicacao == 'requisicao'){

        $id_cargo_voluntario = $_POST['sel_cargo_voluntario'];
        $qtd_requisicoes = $_POST['txt_qtd_requisicoes'];

        $query_requisicao = "insert into Requisicao_Voluntariado(
            qtd_requisicoes, 
            qtd_requisicoes_preenchidas,
            qtd_requisicoes_vagas,
            id_cargo_voluntario
        ) values (
            $qtd_requisicoes,
            0,
            $qtd_requisicoes,
            $id_cargo_voluntario
        )";

        if (mysqli_query($conn, $query_requisicao)) {
            debug_log( "Valores alterados com sucesso!");
        } else {
            debug_log( "Erro: ".$query_requisicao."<br>".mysqli_error($conn));
        }

        $id_requisicao = $conn->insert_id;

        $query_publicacao = "insert into Publicacao (
            titulo, descricao, qtd_likes, qtd_compartilhamentos, datetime_publicacao,
            tipo_publicacao, id_ONG, id_req_voluntariado
        ) values (
            '$titulo',
            '$descricao',
            0,
            0,
            '$datetime_atual',
            'REQUISICAO',
            $id_ONG,
            $id_requisicao
        )";
    }
}


if (mysqli_query($conn, $query_publicacao)) {
    debug_log( "Valores alterados com sucesso!");
} else {
    debug_log( "Erro: ".$query_publicacao."<br>".mysqli_error($conn));
}
mysqli_close($conn); 
echo "<script>window.location.assign('../webpages/pg_publicacoes.php')</script>";

?>

