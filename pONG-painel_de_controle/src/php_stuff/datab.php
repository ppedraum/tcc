<?php

$servername = "127.0.0.1";
$database = "pONG";
$username = "root";
$password = "";
$conn = mysqli_connect($servername, $username, $password, $database);

/* function connect(){
    $conn = mysqli_connect($servername, $username, $password, $database);
    if (!$conn) {
        die("Erro de conexão: " . mysqli_connect_error());
    }
    echo "Conectado com sucesso! <br>";
} */

function debug_log($data){
    echo "<script>console.log('$data')</script>";
}

?>