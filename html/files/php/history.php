<?php
 
    #文字コード指定
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
    
    #JSON 読込処理
    function showJson($referer) {
        
        $jsonname = 'history.json';
        $json = file_get_contents($jsonname);
        $pluscnt = json_decode($json, true);
        $cnt = 0;
        foreach($pluscnt as $rkey => $row) {
            foreach($row as $key => $val) {
                if ($key == $referer) {
                    $cnt = $val;
                    break 2;
                }
            }
            break;
        }
        
        return $cnt;
    }
    
    #JSON 更新処理
    function writeJson($referer) {
        
        $jsonname = 'history.json';
        $json     = file_get_contents($jsonname);
        $output   = json_decode($json, true);

        foreach ($output as $key => $value) {
            echo $value;
            foreach ($value as $key => $value) {

                if ($key = 'id') {
                    echo $key.':'.$value;
                }

            }
        }

        date_default_timezone_set('Asia/Tokyo');

        $output = array(
            "user" => array(
                "id"    => $_SERVER["REMOTE_ADDR"],
                "data"  => date("Y/m/d G:i:s"),
                "param" => $_POST['param'],
                //"agent" => $_SERVER["HTTP_USER_AGENT"],
            )
        );
        
        #JSONへ変換＆上書き保存
        $handle = fopen($jsonname, 'w');
        fwrite($handle, json_encode($output,JSON_PRETTY_PRINT ));
        fclose($handle);
        
        return $cnt;
    }
?>