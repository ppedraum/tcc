<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste view</title>
    <!-- <link rel="stylesheet" href="estilopubs.css" type="text/css"> -->
    <?php
    require_once('../php_stuff/datab.php');

    require "../php_stuff/ver_session.php";
    ver_session("../../index.php");
    
    $id_publicacao = $_GET['id'];

    $query_publicacao = mysqli_query($conn, "
    select * from publicacao as p where p.id = $id_publicacao
    ");
    $query_publicacao = $query_publicacao->fetch_assoc();

    $foto = mysqli_query($conn, 'select * from foto_publicacao where id_publicacao = '.$query_publicacao['id']);
    $foto = $foto->fetch_assoc();
    ?>

</head>
<body>

    <h3>Título: </h3>
    <?php echo $query_publicacao['titulo'] ?>

    <h3>Descrição: </h3>
    <?php echo $query_publicacao['descricao'] ?>

    <h3>Tipo de publicação: </h3>
    <?php echo $query_publicacao['tipo_publicacao']; ?>


    <?php

    if($foto != null){
        echo "<h3> Mídia: </h3>";
        echo "<img width='750' src='data:image/jpeg;base64,".base64_encode($foto['foto'])."'>";
    }

    if($query_publicacao['id_evento'] != null){
        $query_evento = mysqli_query($conn, "
        select * from evento as e where e.id = ".$query_publicacao['id_evento']);
        $query_evento = $query_evento->fetch_assoc();
        $query_tipo_evento = mysqli_query($conn, "select titulo from tipo_evento where id=".$query_evento['id_tipo_evento']);
        $query_tipo_evento = $query_tipo_evento->fetch_assoc();

        echo "<h3> Tipo do evento: </h3>";
        echo $query_tipo_evento['titulo'];
        echo "<br>";

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

    }

    ?>
    <button onclick='showDelForm(true)' id='bt_del_form' >Deletar Publicação</button>
    <div id='del_form' hidden>
        <form method="POST" >
            <p>Você realmente quer deletar essa publicação? Esse processo não pode ser desfeito!</p>
            <input name='bt_deletar' type='submit' value='Deletar'>
        </form>
        <button onclick='showDelForm(false)'>Não Deletar</button>
        <?php
        
        if(isset($_POST['bt_deletar'])){
            $del_likes = mysqli_query($conn, "delete from `like` where id_publicacao = $id_publicacao");
            if($foto != null){
                $del_foto = mysqli_query($conn, "delete from foto_publicacao where id_publicacao = $id_publicacao");
            }
            $del_publicacao = mysqli_query($conn, "delete from publicacao where id = $id_publicacao");

            if($del_likes){
                if($del_publicacao){
                    echo "<script>window.location.assign('./pg_publicacoes.php')</script>";
                }
            }

            else{
                echo 'Ocorreu um problema';
            }
        }
        ?>
    </div>
    <script>
        <?php
        echo "
        function openTab(){
            window.open('../php_stuff/criar_xlsx.php?id_publi=$id_publicacao&id_evt=".$query_publicacao['id_evento']."');
        }
        ";
        ?>
        function showDelForm(show){
            if(show){
                document.getElementById('del_form').removeAttribute('hidden');
                document.getElementById('bt_del_form').setAttribute('hidden', true);
            }
            else{
                document.getElementById('del_form').setAttribute('hidden', true);
                document.getElementById('bt_del_form').removeAttribute('hidden');
            }
        }
    </script>

</body>
</html>