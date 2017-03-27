<?php
require_once 'libraries/TwitterAPIExchange.php';
require_once 'apisettings.php';


function checkUserExists($username = "") {
    $url = 'https://api.twitter.com/1.1/users/lookup.json';
    $requestMethod = 'GET';
    $getField = 'screen_name=' . $username;

    $twitter = new TwitterAPIExchange($GLOBALS['settings']);
    $result =  $twitter->setGetField($getField)
                       ->buildOauth($url, $requestMethod)
                       ->performRequest();
    $result = json_decode($result);
    return json_encode(['result' => !(array_key_exists('errors', $result))]);
}

$username = $_GET['username'];
echo checkUserExists($username);
?>