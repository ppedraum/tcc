<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mundo - Ver publicações</title>
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../styles/view_publicacao.css">
    <?php
    require_once('../php_stuff/datab.php');
    require_once('../php_stuff/comentarios.php');
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

<header>
    <div class="mundo" >
        <img src = "../imgs/logo_cut.svg" alt="LOGO" width="200">
        <a href="./index.php">
            <h2>
                Painel de Controle MUNDO
            </h2>
        </a>

    </div>
    <div class="perfil" >
        <?php
        if($_SESSION['inst']['foto_perfil'] != null){
            echo " <img class='foto_perfil' src='data:image/jpeg;base64,".$_SESSION['inst']['foto_perfil']."'> ";
        }
        else{
            echo "<img class='foto_perfil' src='user.png'>";
        }
        ?>
        <div class="nome_inst" >
            <?php echo $_SESSION["inst"]["nome_fantasia"] ?>
        </div>
        <a href="./pg_perfil.php">
            Gerenciar Perfil
        </a>
        <div class="sair" >
            <a href="../php_stuff/logout.php">
                Sair
            </a>
        </div>
    </div>

</header>

<div id="conteudo_publicacao" >
    <div>
        <div class="item_margin" >
            <h2>
                <?php echo $query_publicacao['titulo'] ?>
            </h2>
        </div>

        <div class="item_margin">
            <?php echo $query_publicacao['descricao'] ?>
        </div>
        <hr>
        <div class="item_margin" >
            <b>Tipo de Publicação: </b> <br>
            <?php echo $query_publicacao['tipo_publicacao']; ?>
        </div>
        <div class="scroll_div">
            <div class="comentario" >
            <b>Comentários</b>
            <hr>
            </div>
            <?php 
            $arr = gerar_comentarios($conn, $query_publicacao["id"]); 

            if($arr !== null){
                $pais = $arr["pais"];
                $filhos = $arr["filhos"];

                foreach($pais as $pai){             
                                    
                    echo "
                    <div class='comentario' >
                        <div>
                            <b> ".$pai["nome_usuario"]." - ".$pai["datetime_post"]." </b>
                            <button onclick='showDelComm(".$pai["id"].")' > x </button>
                        </div>
                        <div>
                            ".$pai["conteudo"]."
                        </div>
                    </div>
                    ";
                    foreach($filhos as $filho){
                        if($filho["id_pai"] == $pai["id"]){

                            echo"
                            <div class='comentario_filho' >
                                <div>
                                    <b> ".$filho["nome_usuario"]." - ".$filho["datetime_post"]." </b>
                                    <button onclick='showDelComm(".$filho["id"].")' > x </button>
                                </div>
                                <div>
                                    ".$filho["conteudo"]."
                                </div>
                            </div>
                            
                            ";
                        }
                    }
                }
            }
            else{
                echo "
                <div class='comentario'>
                    Nenhum Comentário foi feito ainda! <br>
                    Quando houver algum, eles aparecerão aqui.
                </div>";
            }
            ?>
        </div>
    </div>
    <div>
        <div class="item_margin" >
            <?php
            if($foto != null){
                echo "<img width='300' src='data:image/jpeg;base64,".$foto['foto']."'>";
            }
            ?>
        </div>
        <div class="evento" >
            <div class="item_margin" >
                <?php
                if($query_publicacao['id_evento'] != null){
                    $query_evento = mysqli_query($conn, "
                    select * from evento as e where e.id = ".$query_publicacao['id_evento']);
                    $query_evento = $query_evento->fetch_assoc();

                    $query_tipo_evento = mysqli_query($conn, "select titulo from tipo_evento where id=".$query_evento['id_tipo_evento']);
                    $query_tipo_evento = $query_tipo_evento->fetch_assoc();

                    $query_inscricoes = mysqli_query($conn, "
                    select usuario.* from inscricao, usuario
                    where inscricao.id_usuario = usuario.id and inscricao.id_evento = ".$query_evento['id']);

                    echo "<b> Tipo do evento: </b><br>";
                    echo $query_tipo_evento['titulo'];
                    echo "<br>";

                    echo "
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='inscricoes' >
                    <b>Inscrições</b>
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

                    echo "
                    </table>
                    <button onclick='openTab()' >Gerar Excel</button>
                    </div>
                    ";
                }

                ?>
            </div>
        </div>
    </div>
</div>
<button onclick='showDelForm(true)' id='bt_del_form' >Deletar Publicação</button>
<div class="item_margin" >
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
                    echo "<script>window.location.assign('./index.php')</script>";
                }
            }

            else{
                echo 'Ocorreu um problema';
            }
        }
        ?>
    </div>
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

    function showDelComm(id){
        if(confirm("Você deseja excluir esse comentário?")){
            window.location.assign("../php_stuff/exc_comentario.php?id_comentario=" + id + "&id_publicacao=<?php echo $id_publicacao ?>");
        }
    }

</script>

<footer>
    <div>
        2022 - MUNDO
    </div>
    <div>
        <b>Criado Por:</b><br>
        Pedro Henrique Martins Virtuozo<br>
        Felipe Rodrigues Rossoni
    </div>
</footer>
</body>
</html>