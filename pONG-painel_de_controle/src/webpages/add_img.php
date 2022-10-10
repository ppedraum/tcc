<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="" method="POST" >
        <input type="file" name="img_publicacao" id="">
        <?php $statusMsg ?>
        <input type="submit" name="bt_enviar">
    </form>
    <?php
    if(isset($_POST["bt_enviar"])){
        $statusMsg = 'erro na imagem'; 
        if(!empty($_FILES["blob_publicacao"]["name"])) { 
            
            $id_publicacao = $conn->insert_id;

            $fileName = basename($_FILES["blob_publicacao"]["name"]); 
            $fileType = pathinfo($fileName, PATHINFO_EXTENSION); 
            
            // Allow certain file formats 
            $allowTypes = array('jpg','png','jpeg'); 
            if(in_array($fileType, $allowTypes)){ 
                $image = $_FILES['blob_publicacao']['tmp_name']; 
                $imgContent = addslashes(file_get_contents($image)); 

            }else{ 
                $statusMsg = 'Desculpe, apenas imagens são suportadas.'; 
            }
            $img_base = base64_encode($imgContent);

            echo $imgContent;

            /* $query_foto = mysqli_query($conn, "insert into foto_publicacao(foto, descricao, id_publicacao) values (
                '$img_base',
                'Uma Foto',
                24
            )
            ");
 */
        }else{ 
            $statusMsg = 'Por favor, selecione uma imagem para o evento.'; 
        }
    }
    
    ?>
</body>
</html>