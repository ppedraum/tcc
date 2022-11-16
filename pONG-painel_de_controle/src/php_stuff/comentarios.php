<?php


function gerar_comentarios($conn, $id_publicacao){
    $pais = [];
    $filhos = [];
    
    $query_comms = mysqli_query($conn, "
        select * from comentario where id_publicacao = $id_publicacao
    ");

    while($row = $query_comms->fetch_assoc()){
        $usuario = mysqli_query($conn, "select * from usuario where id = ".$row['id_usuario']);
        $usuario = $usuario->fetch_assoc();

        if($row['id_pai'] == null ){
            $pais[] = [
                "id"            => $row["id"],
                "nome_usuario"  => $usuario['nome'], 
                "conteudo"      => $row['conteudo'], 
                "datetime_post" => $row['datetime_post']
            ];
        }
        else{
            $filhos[] = [
                "id"            => $row["id"],
                "nome_usuario"  => $usuario['nome'], 
                "conteudo"      => $row['conteudo'], 
                "datetime_post" => $row['datetime_post'],
                "id_pai"        => $row['id_pai']
            ]; 
        }
    }

    if(sizeof($pais) != 0)
        return [
            "pais" => $pais,
            "filhos" => $filhos
        ];
    else
        return null;
}

