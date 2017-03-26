<?php
require_once 'libraries/TwitterAPIExchange.php';

$settings = [
    'oauth_access_token' => '3302732766-tVsVY4btoBs6PCAJNoqnoxsimg7IytB13UF54nv',
    'oauth_access_token_secret' => 'RzujVpYtwBEsKluUQafJDU98Wg20hy9ctmXaeou59oqOm',
    'consumer_key' => 'fGoMl4PyMXGWXfSxJq0e6sNVr',
    'consumer_secret' => 'Vxi3U14ndZXiYMmF6s3jyrzvHLTt0C98MSODJMIRtB2zbHlinD'
];

function getTweets($username = "", $tweetCount = 0, $search = "") {

    $url = 'https://api.twitter.com/1.1/search/tweets.json';

    $requestMethod = "GET";
    $getField = '?q=';
    if ($username !== "") {
        $getField = $getField . urlencode("from:" . $username);
        if ($search !== "") {
            $getField = $getField . urlencode(" " . $search);
        }
    } else if ($search !== "") {
        $getField = $getField . urlencode($search);
    }

    $twitter = new TwitterAPIExchange($GLOBALS['settings']);
    return $twitter->setGetField($getField)
                 ->buildOauth($url, $requestMethod)
                 ->performRequest();

}

echo getTweets('harinef', 1, "men");
?>