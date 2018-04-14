<?php
    $auth = $_POST['key'];
    $url = $auth."/user/notification/message?format=json";
    $ch = curl_init($url);
    $options = array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => array('Content-type: application/json'),
        CURLOPT_TIMEOUT => 0,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0
    );

    curl_setopt_array($ch, $options);
    $reponse = curl_exec($ch);
    if (!curl_errno($ch)) {
        switch ($http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE)) {
            case 200:
                $json = json_decode($reponse);
                $i=0;
                foreach ($json as $key) {
                    echo "<img src='".$json[$i]->user->picture."' id='img-message-epi'>";
                    echo "<span id='message-epi'>".$json[$i]->title." • ".$json[$i]->date."</span>";
                    echo "<br><hr id='hr-separator'><br>";
                    $i++;
                }
                break;
            default:
                echo "Error";
                exit();
        }
    }

?>