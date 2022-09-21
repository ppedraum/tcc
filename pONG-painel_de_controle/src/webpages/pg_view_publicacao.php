<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste view</title>
    <link rel="stylesheet" href="estilopubs.css" type="text/css">
    <?php
    require_once('../php_stuff/datab.php');
    
    $id_publicacao = $_GET['id'];

    $query = mysqli_query($conn, "
    select * from publicacao as p where p.id = $id_publicacao
    ");
    $query = $query->fetch_assoc();

    






    ?>

</head>
<body>

    <h3>Título: </h3>
    <?php echo $query['titulo'] ?>

    <h3>Descrição: </h3>
    <?php echo $query['descricao'] ?>

    <h3>Tipo de publicação: </h3>
    <?php 
    echo $query['tipo_publicacao'];
    
    if($query['id_evento'] != null){
        $query_evento = mysqli_query($conn, "
        select * from evento as e where e.id = ".$query['id_evento']);
        $query_evento = $query_evento->fetch_assoc();
        $query_tipo_evento = mysqli_query($conn, "select titulo from tipo_evento where id=".$query_evento['id_tipo_evento']);
        $query_tipo_evento = $query_tipo_evento->fetch_assoc();

        echo "<h3> Tipo do evento: </h3>";
        echo $query_tipo_evento['titulo'];
        echo "<br>";

        echo "<h3> Mídia: </h3>";
        echo " <img src='data:image/jpeg;base64,".base64_encode($query_evento['foto'])."'> ";

        $query_inscricoes = mysqli_query($conn, "
        select usuario.* from inscricao, usuario
        where inscricao.id_usuario = usuario.id and inscricao.id_evento = ".$query_evento['id']);

        echo "<h3>Inscrições</h3>";

        echo "
        <table>

        <th></th>
        <th>Nome</th>
        <th>E-Mail</th>
        <th>Telefone</th>
        <th>Data de Nascimento</th>
        <th>Profissão</th>
        <th>Sexo</th>
        <th>Cidade</th>
        <th>Estado</th>
        ";

        $num = 1;
        while($row = $query_inscricoes->fetch_assoc()){
            
            echo "<tr>";
            echo "<td>".$num."</td>";
            echo "<td>".$row['nome']."</td>";
            echo "<td>".$row['e_mail']."</td>";
            echo "<td>".$row['telefone']."</td>";
            echo "<td>".$row['data_nasc']."</td>";
            echo "<td>".$row['profissao']."</td>";
            echo "<td>".$row['sexo']."</td>";
            echo "<td>".$row['cidade']."</td>";
            echo "<td>".$row['UF']."</td>";
            echo "</tr>";
            $num++;

            if($num == 10){
                break;
            }
        }

        echo "</table>";
        echo "<button onclick='openTab()' >Gerar Excel</button>";

        echo "
        
        <script>

        function openTab(){
            window.open('../php_stuff/criar_csv.php?id=$id_publicacao');
        }

        </script>

        ";

    }

    ?>

    


</body>
</html>