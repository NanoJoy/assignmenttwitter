<?php
require_once 'TwitterAPIExchange.php';

$settings = [
    'oauth_access_token' => '3302732766-tVsVY4btoBs6PCAJNoqnoxsimg7IytB13UF54nv',
    'oauth_access_token_secret' => 'RzujVpYtwBEsKluUQafJDU98Wg20hy9ctmXaeou59oqOm',
    'consumer_key' => 'fGoMl4PyMXGWXfSxJq0e6sNVr',
    'consumer_secret' => 'Vxi3U14ndZXiYMmF6s3jyrzvHLTt0C98MSODJMIRtB2zbHlinD'
];

$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

$requestMethod = "GET";
$getField = '?screen_name=iagdotme&count=20';

$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetField($getField)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
?>