<?php

// Include the database configuration file  
require_once './datab.php'; 
 
// If file upload form is submitted 
$status = $statusMsg = ''; 
if(isset($_POST["bt_submit"])){ 
    $status = 'error'; 
    if(!empty($_FILES["foto"]["name"])) { 
        // Get file info 
        $fileName = basename($_FILES["foto"]["name"]); 
        $fileType = pathinfo($fileName, PATHINFO_EXTENSION); 
         
        // Allow certain file formats 
        $allowTypes = array('jpg','png','jpeg','gif'); 
        if(in_array($fileType, $allowTypes)){ 
            $image = $_FILES['foto']['tmp_name']; 
            $imgContent = addslashes(file_get_contents($image)); 
         
            // Insert image content into database 
            $insert = mysqli_query($conn, 
            "insert into image values (
               '$fileName' , '$imgContent'
            )");
             
            if($insert){ 
                $status = 'success'; 
                $statusMsg = "File uploaded successfully."; 
            }else{ 
                $statusMsg = "File upload failed, please try again."; 
            }  
        }else{ 
            $statusMsg = 'Sorry, only JPG, JPEG, PNG, & GIF files are allowed to upload.'; 
        } 
    }else{ 
        $statusMsg = 'Please select an image file to upload.'; 
    } 
} 
 
// Display status message 
echo $statusMsg; 
?>
