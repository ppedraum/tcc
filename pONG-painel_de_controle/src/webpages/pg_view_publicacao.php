<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste view</title>
    <?php
    require_once('../php_stuff/datab.php');

    $id_usuario = 1;
    $id_evento = 13;

    $query_publi = mysqli_query($conn, "
    select pb.titulo as pb_titulo, pb.descricao, te.titulo as te_titulo, ong.nome_fantasia, evt.datetime_inicio, evt.datetime_fim, pb.datetime_publicacao, pb.qtd_likes, pb.qtd_compartilhamentos, pb.tipo_publicacao
    from evento as evt, publicacao as pb, tipo_evento as te, ong 
    where evt.id = $id_evento
    and evt.id = pb.id_evento 
    and te.id = evt.id_tipo_evento
    and pb.id_ong = ong.id
    ;
    ");

    $query_inscritos = mysqli_query($conn, "
    select u.nome, u.e_mail, u.telefone, u.cidade, u.UF, u.cpf 
    from usuario as u, inscricao as i 
    where i.id_evento = $id_evento
    ;
    ");



    /* $url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] 
                === 'on' ? "https" : "http") . 
                "://" . $_SERVER['HTTP_HOST'] . 
                $_SERVER['REQUEST_URI'];

    $params = parse_url($url);
    parse_str($url['query'], $params);
    echo($params['n']); */
    ?>

</head>
<body>

    <h1>Teste</h1>

    <?php

    while($row = $query_publi->fetch_assoc()){
        echo "ONG: ".$row['nome_fantasia']."<br>";
        echo "Tipo de Publicação: ".$row['tipo_publicacao']."<br>";
        echo "Título: ".$row['pb_titulo']."<br>";
        echo "Desc: ".$row['descricao']."<br>";
        echo "Início: ".$row['datetime_inicio']."<br>";
        echo "Fim: ".$row['datetime_fim']."<br>";
        echo "Tipo de Evento: ".$row['te_titulo']."<br>";
        echo "Likes: ".$row['qtd_likes']."<br>";
        echo "Compartilhamentos: ".$row['qtd_compartilhamentos']."<br>";
    }
    echo "<br><br>";

    ?>

    <table>
        <th>Nome</th>
        <th>E-Mail</th>
        <th>Telefone</th>
        <th>Cidade</th>
        <th>UF</th>
        <th>CPF</th>

        <?php
        while($row = $query_inscritos->fetch_assoc()){
            echo '<tr>';
            echo "<td>".$row['nome']."</td>";
            echo "<td>".$row['e_mail']."</td>";
            echo "<td>".$row['telefone']."</td>";
            echo "<td>".$row['cidade']."</td>";
            echo "<td>".$row['UF']."</td>";
            echo "<td>".$row['cpf']."</td>";
        }
        ?>

    </table>





</body>
</html>