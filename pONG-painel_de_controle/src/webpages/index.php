<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mundo - Gerenciar Publicações</title>
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../styles/painel.css">
    <?php
    require_once('../php_stuff/datab.php');
    
    require "../php_stuff/ver_session.php";
    ver_session("../../index.php");
    $id_inst = $_SESSION['inst']['id'];

    ?>
    <script type="text/javascript" src="../scripts/pg_publicacoes.js"></script>
</head>
<body>

<header>
    <div class="mundo" >
        <img src = "../imgs/logo_cut.svg" alt="LOGO" width="200">
        <h2>
            Painel de Controle MUNDO
        </h2>
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


<div>
    <div id="conteudo_painel">
        <div>
            <h2>
                Publicações
            </h2>
            <div id='sct_ger_publicacoes'>
                <form method='get'>
                    <div id='pesquisa' class="item" >
                        <input type="text" name='txt_pesquisar_publicacoes' id='txt_pesquisar_publicacoes' placeholder="Pesquisar">
                        <input type="submit" value="Pesquisar" name='bt_pesquisar_publicacao' id='bt_pesquisar_publicacao'>
                    </div>
                    
                    <div id="filtros" >
                        <div id='filtro_tipo'>
                            <input type="checkbox" name="ch_filtro_tipo" id="add" onclick="isFiltroChecked( this['id'], 'sel_tipo_publicacao')">
                            <label for="ch_filtro_tipo">Tipo</label>
                            <select name="sel_tipo_publicacao" id="sel_tipo_publicacao" hidden>
                                <option value="PUBLICACAO">Publicação</option>
                                <!-- <option value="REQUISICAO">Requisição</option> -->
                                <option value="EVENTO">Evento</option>
                            </select>
                        </div>
                        <div id='filtro_data'>
                            <div>
                                <input type="checkbox" name="ch_filtro_data" id="ch_filtro_data" onclick="isFiltroChecked('ch_filtro_data', 'dt_publicacao')">
                                <select name="sel_filtro_data" id="sel_filtro_data">
                                    <option value="depois" default>Depois de...</option>
                                </select>
                                <input type="date" name="dt_publicacao" id="dt_publicacao" hidden>
                            </div>
                        </div>
                    </div>
                </form>
                
            </div>
            <div id='sct_view_publicacoes' >
                <div>
                    <a href="pg_add_publicacao.php"><button>Adicionar Publicação</button></a>
                </div>
                <table id='table_publi'>
                    <tr>
                        <th>Título</th>
                        <th>Likes</th>
                        <!-- <th>Compart.</th> -->
                        <th>Tipo</th>
                        <th>Data</th>
                        
                        
                    </tr>
                    <?php

                        if(!isset($_GET['bt_pesquisar_publicacao'])){
                            $query = mysqli_query($conn, "select * from Publicacao where id_ong=$id_inst order by datetime_publicacao desc");
                            
                            while($row = $query->fetch_assoc()){
                                $query_like = mysqli_query($conn, 
                                "select count(1) as ct from `like` where `like`.id_publicacao=".$row['id']);
                                $query_like = $query_like->fetch_assoc();

                                echo "
                                <tr name='publi-".$row['id']."' id='publi-".$row['id']."'>
                                    <td><a href='pg_view_publicacao.php?id=".$row['id']."' >"
                                    .$row['titulo']
                                    ."</a>
                                    </td>
                                    <td>"
                                        .$query_like['ct']."
                                    </td>
                                    <!--<td>"
                                        .$row['qtd_compartilhamentos']."
                                    </td>-->
                                    <td>"
                                        .$row['tipo_publicacao']."
                                    </td>
                                    <td>"
                                        .$row['datetime_publicacao']."
                                    </td> 
                                </tr>";
                            }
                        }
                        else{
                            $txt_titulo = $_GET['txt_pesquisar_publicacoes'];
                            $query = "select * from Publicacao where titulo like '%$txt_titulo%'";
                            $ch_filtro_tipo = isset($_GET['ch_filtro_tipo']) ? true : false ;
                            $ch_filtro_data = isset($_GET['ch_filtro_data']) ? true : false ;
                            
                            $sel_tipo_publicacao = $_GET['sel_tipo_publicacao'];
                            $dt_publicacao = $_GET['dt_publicacao'];

                            if($dt_publicacao == ''){
                                $dt_publicacao = date('0000-00-00');
                            }

                            if($ch_filtro_tipo and $ch_filtro_data){
                                $query .= "and tipo_publicacao like '$sel_tipo_publicacao' and datetime_publicacao > '$dt_publicacao'";
                        
                            }
                            elseif($ch_filtro_tipo){
                                $query .= "and tipo_publicacao like '$sel_tipo_publicacao'";
                            }
                            elseif($ch_filtro_data){
                                $query .= "and datetime_publicacao > '$dt_publicacao'";
                            }
                            $query .= "and id_ong=$id_inst order by datetime_publicacao DESC";
                            $query = mysqli_query($conn, $query);
                            
                            while($row = $query->fetch_assoc()){
                                $query_like = mysqli_query($conn, 
                                "select count(1) as ct from `like` where `like`.id_publicacao=".$row['id']);
                                $query_like = $query_like->fetch_assoc();
                                echo "
                                <tr name='publi-".$row['id']."' id='publi-".$row['id']."'>
                                    <td><a href='pg_view_publicacao.php?id=".$row['id']."' >"
                                    .$row['titulo']
                                    ."</a>
                                    </td>
                                    <td>"
                                        .$query_like['ct']."
                                    </td>
                                    <!--<td>"
                                        .$row['qtd_compartilhamentos']."
                                    </td>-->
                                    <td>"
                                        .$row['tipo_publicacao']."
                                    </td>
                                    <td>"
                                        .$row['datetime_publicacao']."
                                    </td> 
                                </tr>";
                            }
                        }
                    
                        
                    ?>
                </table>
                <br>
            </div>
        </div>
        <div class="separador" ></div>
        <div>
            <h2>
                Ferramentas
            </h2>
            <ul class="lista_ferramentas" >
                <li>
                    <a href="./pg_criar_pdf.php">
                    <button>Gerar PDF</button>
                    </a>
                </li>
                <li>
                    Mais em breve...
                </li>
            </ul>
        </div>
    </div>
</div>


    <script>keyBindAll()</script>
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