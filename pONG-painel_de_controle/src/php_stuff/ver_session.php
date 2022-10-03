<?php

function ver_session($dir){
    if(!isset($_SESSION)){
        session_start();
        if(!isset($_SESSION["inst"])){
            header("Location: $dir");
        }
    }
}

