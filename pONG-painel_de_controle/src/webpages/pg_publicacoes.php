<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mundo - Gerenciar Publicações</title>

    <?php
    require_once('../php_stuff/datab.php');

    $inst = mysqli_query($conn, 'select nome_fantasia, id from ONG');

    ?>
    <!-- <link rel="stylesheet" href="./styles.css"> -->
    <script type="text/javascript" src="../scripts/pg_publicacoes.js"></script>
</head>
<body>
    <header>
        <p><a href="../../menu.php"> Mundo </a>- Gerenciar Publicações</p>
    </header>
    <div id='conteudo'>
        <div id='sct_ger_publicacoes'>
            <form method='get'>

                <div id='sct_txt_pesquisa'>
                    Pesquisar <input type="text" name='txt_pesquisar_publicacoes' id='txt_pesquisar_publicacoes'>
                </div>
                
                <div class='filtros' >
                    <div id='filtro_tipo'>

                        <input type="checkbox" name="ch_filtro_tipo" id="ch_filtro_tipo" onclick="isFiltroChecked( this['id'], 'sel_tipo_publicacao')">
                        <label for="ch_filtro_tipo">Tipo</label>
                        <select name="sel_tipo_publicacao" id="sel_tipo_publicacao" hidden>
                            <option value="PUBLICACAO">PUBLICAÇÃO</option>
                            <option value="REQUISICAO">REQUISIÇÃO</option>
                            <option value="EVENTO">EVENTO</option>
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
                <input type="submit" value="Pesquisar" name='bt_pesquisar_publicacao' id='bt_pesquisar_publicacao'>
            </form>
        </div>
        <a href="pg_add_publicacao.php"><button>Adicionar Publicação...</button></a>
        <div id='sct_view_publicacoes'>
                <table id='table_publi'>
                    <tr>
                        <th>Título</th>
                        <th>Likes</th>
                        <th>Compart.</th>
                        <th>Tipo</th>
                        <th>Data</th>
                        
                        
                    </tr>
                    <?php

                        if(!isset($_GET['bt_pesquisar_publicacao'])){
                            $query = mysqli_query($conn, "select * from Publicacao order by datetime_publicacao desc");
                            
                            while($row = $query->fetch_assoc()){
                                echo "
                                <tr name='publi-".$row['id']."' id='publi-".$row['id']."'>
                                    <td>"
                                        .$row['titulo']."
                                    </td>
                                    <td>"
                                        .$row['qtd_likes']."
                                    </td>
                                    <td>"
                                        .$row['qtd_compartilhamentos']."
                                    </td>
                                    <td>"
                                        .$row['tipo_publicacao']."
                                    </td>
                                    <td>"
                                        .$row['datetime_publicacao']."
                                    </td> 
                                    <td onclick='alert(\"Você precisa aprender:\n
                                                        Como passar parâmetros via GET request\n
                                                        (redes) \")' >
                                    Excluir
                                    </td>   
                                </tr>";
                            }
                        }
                        else{
                            $txt_titulo = $_GET['txt_pesquisar_publicacoes'];
                            $query = "select * from Publicacao where titulo like '%$txt_titulo%' ";
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
                            $query .= "order by datetime_publicacao DESC";
                            $query = mysqli_query($conn, $query);
                        
                            while($row = $query->fetch_assoc()){
                                echo "
                                <tr name='publi-".$row['id']."' id='publi-".$row['id']."'>
                                    <td>"
                                        .$row['titulo']."
                                    </td>
                                    <td>"
                                        .$row['qtd_likes']."
                                    </td>
                                    <td>"
                                        .$row['qtd_compartilhamentos']."
                                    </td>
                                    <td>"
                                        .$row['tipo_publicacao']."
                                    </td>
                                    <td>"
                                        .$row['datetime_publicacao']."
                                    </td>

                                    <td onclick='alert(\"Você precisa aprender:
                                                        Como passar parâmetros via GET request
                                                        (redes) \")' >
                                    Excluir
                                    </td>
                                    
                                </tr>";
                            }
                        }
                        
                        
                    ?>
            </table>
        </div>
    </div>



    <script>keyBindAll()</script>
</body>
</html>