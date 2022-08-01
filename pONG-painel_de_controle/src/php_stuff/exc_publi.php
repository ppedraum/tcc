<?php
    require_once('../php_stuff/datab.php');
    $url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] 
                === 'on' ? "https" : "http") . 
                "://" . $_SERVER['HTTP_HOST'] . 
                $_SERVER['REQUEST_URI'];

    $params = parse_url($url);
    parse_str($url['query'], $params);
    echo($params['n']);
?>