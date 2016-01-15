<?php
 
    setlocale(LC_ALL,'ja_JP.UTF-8');
    
    #Ajax通信ではなく、直接URLを叩かれた場合は処理をしないようにしたい
    if (!(isset($_SERVER['HTTP_X_REQUESTED_WITH']) 
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest')
        && (!empty($_SERVER['SCRIPT_FILENAME']) 
            && basename($_SERVER['SCRIPT_FILENAME']) === 'index.php')
       ) {
        die();
    }
    
    #リファラーを使いたいので、入っていなければノーカウント
    $referer = htmlspecialchars($_SERVER['HTTP_REFERER'], ENT_QUOTES, 'UTF-8');
    if (!(isset($referer))) {
        exit;
    }
    
    #処理を判別(GET)
    $action = htmlspecialchars($_POST['act'], ENT_QUOTES, 'UTF-8');
    switch ($action) {
        case 'write':
            writeJson($referer);
            break;
        default:
            exit;
    }
    exit;
    
    function writeJson($referer) {
        
        $jsonname = 'history.json';
        $json     = file_get_contents($jsonname);
        $output   = json_decode($json, true);
        $userId   = $_SERVER["REMOTE_ADDR"];

        foreach($output as $value){
            $members[] = (array)$value;
        }

        $output = matchArray($members,$userId);
        
        $handle = fopen($jsonname, 'w');
        fwrite($handle, json_encode($output,JSON_PRETTY_PRINT ));
        fclose($handle);
        
    }

    function matchArray($array,$userId) {

        $current = null;
        $i = 0;

        foreach ($array as $key => $value) {

            if ($value['id'] == $userId) {

                $point = $value['point'];
                $current = $i;

            }
            $i++;
        }

        date_default_timezone_set('Asia/Tokyo');

        $new_array = array(
                "id"    => $userId,
                "utm"   => $_POST["user"],
                "point" => $point + 1,
                "data"  => date("Y/m/d G:i:s"),
                "param" => $_POST['param'],
        );

        if ($current == null) {

            $array[] = $new_array;

        } else {

            $array[$current] = $new_array;

        }

        return $array;

    }
?>