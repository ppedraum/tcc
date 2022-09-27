<?php
require_once('../php_stuff/datab.php');

$img = mysqli_query($conn, 'select foto_perfil from ong where id = 2');

$img = $img->fetch_assoc();
$img = base64_encode($img['foto_perfil']);


header( 'Content-Transfer-Encoding: base64' );
header("Content-Type: image/jpeg");


fpassthru($img);
exit;