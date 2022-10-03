<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mundo - Adicionar Publicação</title>
    <link rel="stylesheet" href="./estiloaddpub.css" type="text/css">
    <script>

        function mudarForm(){
            let evt_elements = 
            [
                'sel_tipo_evento', 
                'txt_endereco_evento', 
                'txt_cidade_evento', 
                'sel_estado_evento', 
                'date_inicio_evento', 
                'date_fim_evento',
                'blob_evento'
            ];
            
            if(document.getElementById('rd_tipo_publicacao_publicacao').checked){
                for(let i = 0; i< evt_elements.length; i++){
                    document.getElementById(evt_elements[i]).removeAttribute('required');
                }
                
            }

            if(document.getElementById('rd_tipo_publicacao_evento').checked){
                document.getElementById('div_form_evento').removeAttribute('hidden');
                for(let i = 0; i< evt_elements.length; i++){
                    document.getElementById(evt_elements[i]).setAttribute('required', true);
                }
            }else{
                document.getElementById('div_form_evento').setAttribute('hidden', true);
            }
            /*  
            if(document.getElementById('rd_tipo_publicacao_requisicao').checked){
                document.getElementById('div_form_requisicao').removeAttribute('hidden');
            }else{
                document.getElementById('div_form_requisicao').setAttribute('hidden', true);
            }
             */

            
        }

    </script>

    <?php
    
    require_once('../php_stuff/datab.php');

    require "../php_stuff/ver_session.php";
    ver_session("../../index.php");

    $sel_tipo_evento = mysqli_query($conn, 'select * from tipo_evento');
    $sel_cargo_voluntario = mysqli_query($conn, 'select * from cargo_voluntario')
    ?>

    <style>
        #sct_tipo_publicacao span{
            margin-inline: 10px;
        }
    </style>
</head>


<body onload="mudarForm()">
<h2>MUNDO - Adicionar Publicações<br><a href="../../menu.php"><img src = "logo.svg" alt="LOGO" width="300" height="150"></a></h2>
            <form method="post" enctype="multipart/form-data" action="../php_stuff/add_publicacao.php">
                <div class="border_container" >
                    <div class='cell' >
                        <div class='cell'>
                            <label for="txt_titulo">Título*</label><br>
                            <input type="text" id="txt_titulo" name='txt_titulo' required ><br>
                        </div>
                        <div class='cell'>
                            <label for="txt_descricao">Descrição*</label><br>
                            <textarea name="txt_descricao" id="txt_descricao" cols="30" rows="10" style='resize:none;' required ></textarea>
                        </div>
                        <section id="sct_tipo_publicacao">
                            <span>
                                <label for="rd_tipo_publicacao_publicacao">Publicação</label>
                                <input type="radio" name="rd_tipo_publicacao" id="rd_tipo_publicacao_publicacao" value="publicacao" onclick="mudarForm()" checked>
                            </span>
                            <span>
                                <label for="rd_tipo_publicacao_evento">Evento</label>
                                <input type="radio" name="rd_tipo_publicacao" id="rd_tipo_publicacao_evento" value="evento" onclick="mudarForm()">
                            </span>
                            
                            <!-- 
                            <span>
                                <label for="rd_tipo_publicacao_requisicao">Requisição</label>
                                <input type="radio" name="rd_tipo_publicacao" id="rd_tipo_publicacao_requisicao" value="requisicao" onclick="mudarForm()">
                            </span> 
                            -->
                            <div class='cell'>
                                <label for="blob_publicacao">Foto*</label><br>
                                <input type="file" name="blob_publicacao" id="blob_publicacao">
                            </div>


                        </section>
                        <div>
                            <input type="submit" name="bt_submit_publicacao" id="bt_submit_publicacao" value="Enviar">
                            <input type="reset" name="bt_submit_publicacao" id="bt_reset_publicacao" value="Resetar" onclick="">
                        </div>
                        <p>Entradas com * no final são obrigatórias.</p>
                    </div>
                    <div id="div_form_evento" class='cell' hidden>
                        <div class='cell' >
                            <label for="sel_tipo_evento">Tipo de Evento*</label><br>
                            <select name="sel_tipo_evento" id="sel_tipo_evento" default=''>
                                <option value=''>Selecione</option>
                                <?php
                                
                                while($row = $sel_tipo_evento->fetch_assoc()){
                                    echo "<option value=".$row['id'].">".$row['titulo']."</option>";
                                }
                                ?>

                            </select>
                        </div>
                        <div class='cell'>
                            <label for="txt_endereco_evento">Endereço*</label><br>
                            <input type="text" name="txt_endereco_evento" id="txt_endereco_evento" placeholder="Rua, Número, Bairro, Referência">
                        </div>
                        <div class='cell'>
                            <label for="txt_cidade_evento">Cidade*</label><br>
                            <input type="text" name="txt_cidade_evento" id="txt_cidade_evento" placeholder="Cidade">
                        </div>
                        <div class='cell'>
                            <label for="sel_estado_evento">Estado*</label><br>
                            <div class="select">
                            <select name="sel_estado_evento" id="sel_estado_evento">
                                <option value="nl" selected>Selecione...</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espírito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                                <option value="EX">Estrangeiro</option>
                            </select>
                            </div>
                        </div>
                        <div class='cell'>
                            <label for="date_inicio_evento">Data e Hora do Início*</label><br>
                            <input type="date" name="date_inicio_evento" id="date_inicio_evento">
                            <input type="time" name="time_inicio_evento" id="time_inicio_evento">
                        </div>
                        <div class='cell'>
                            <label for="date_fim_evento">Data e Hora do Fim*</label><br>
                            <input type="date" name="date_fim_evento" id="date_fim_evento">
                            <input type="time" name="time_fim_evento" id="time_fim_evento">
                        </div>
                    </div>
                </div>
                <!-- 
                <div id="div_form_requisicao" hidden>
                    Qtd. de requisições: <input type="text" name="txt_qtd_requisicoes" id="txt_qtd_requisicoes"><br>
                    Cargo Procurado:
                    <select name="sel_cargo_voluntario" id="sel_cargo_voluntario">
                        <?php
                            /* 
                            while($row = $sel_cargo_voluntario->fetch_assoc()){
                                echo "<option value=".$row['id'].">".$row['nome']."</option>";
                            } 
                            */
                        ?>
                    </select>
                </div> 
                -->
            </form>
</div>
</body>
</html>