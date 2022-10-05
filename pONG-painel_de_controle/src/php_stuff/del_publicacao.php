<?php

require_once('./datab.php');

$id_publicacao = $_POST['id_publicacao'];

$del = mysqli_query($conn, "delete from publicacao where id=$id_publicacao");


?>