<?php

$servername = "127.0.0.1";
$database = "teste_file";
$username = "root";
$password = "";
$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
        die("Erro de conexão: " . mysqli_connect_error());
    }

?>