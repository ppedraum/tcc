<html>
    <head>
        <title>Teste Files</title>
    </head>
    <body>
        <form action="./upload.php" method="post" enctype="multipart/form-data">
            Mandar Foto<input type="file" name="foto" id="">
            <input type="submit" value="enviar" name='bt_submit'>
        </form>
    </body>
</html>



<?php
    require_once('./datab.php');


?>