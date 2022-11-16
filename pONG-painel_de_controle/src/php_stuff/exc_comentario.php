
<?php

require_once("./datab.php");

$id_publicacao = $_GET["id_publicacao"];
$id_comentario = $_GET["id_comentario"];

$query_exc = mysqli_query($conn, "delete from comentario where id = $id_comentario");

if($query_exc){
    header("Location: ../webpages/pg_view_publicacao.php?id=$id_publicacao");
}
