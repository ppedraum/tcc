
<?php

require_once("./datab.php");

$id_publicacao = $_GET["id_publicacao"];
$id_comentario = $_GET["id_comentario"];

$query_filhos = mysqli_query($conn, "select * from comentario where id_pai= $id_comentario");

if(sizeof($query_filhos->fetch_all(MYSQLI_NUM)) != 0){
    mysqli_query($conn, "delete from comentario where id_pai = $id_comentario");
}

$query_exc = mysqli_query($conn, "delete from comentario where id = $id_comentario");

if($query_exc){
    header("Location: ../webpages/pg_view_publicacao.php?id=$id_publicacao");
}
