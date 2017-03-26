<?php
require_once 'libraries/TwitterAPIExchange.php';

$settings = [
    'oauth_access_token' => '3302732766-tVsVY4btoBs6PCAJNoqnoxsimg7IytB13UF54nv',
    'oauth_access_token_secret' => 'RzujVpYtwBEsKluUQafJDU98Wg20hy9ctmXaeou59oqOm',
    'consumer_key' => 'fGoMl4PyMXGWXfSxJq0e6sNVr',
    'consumer_secret' => 'Vxi3U14ndZXiYMmF6s3jyrzvHLTt0C98MSODJMIRtB2zbHlinD'
];

function addError(&$errors, $message) {
    $errors['error'] = true;
    array_push($errors['messages'], $message); 
}

function checkUserExists($username = "") {
    $url = 'https://api.twitter.com/1.1/users/lookup.json';
    $requestMethod = 'GET';
    $getField = 'screen_name=' . $username;

    $twitter = new TwitterAPIExchange($GLOBALS['settings']);
    $result =  $twitter->setGetField($getField)
                       ->buildOauth($url, $requestMethod)
                       ->performRequest();
    $result = json_decode($result);
    return !(array_key_exists('errors', $result));
}

function getTweets($username = "", $search = "", $location = null, $tweetCount = 20) {

    $errors = [
        'error' => false,
        'messages' => []
    ];

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
    } else {
        addError($errors, "Username and search field cannot both be blank");
    }

    if (is_array($location)) {
        if (array_key_exists('latitude', $location) && is_numeric($location['latitude'])) {
            $location['latitude'] = floatval($location['latitude']);
            if ($location['latitude'] < -90 || $location['latitude'] > 90) {
                addError($errors, "Latitude out of range");
            }
        } else {
            addError($errors, "Latitude not valid");
        }
        if (array_key_exists('longitude', $location) && is_numeric($location['longitude'])) {
            $location['longitude'] = floatval($location['longitude']);
            if ($location['longitude'] < -180 || $location['longitude'] > 180) {
                addError($errors, "Longitude out of range");
            }
        } else {
            addError($errors, "Longitude not valid");
        }
        if (array_key_exists('radius', $location) && is_numeric($location['radius'])) {
            $location['radius'] = intval($location['radius']);
        } else {
            $location['radius'] = 1;
        }
        if (!array_key_exists('unit', $location) || !($location['unit'] === 'mi' || $location['unit'] === 'km')) {
            addError($errors, 'Units not valid');
        }
        $getField = $getField . '&geocode=' . urlencode($location['latitude'] . ',' . $location['longitude']
                              . ',' . $location['radius'] . $location['unit']);
    }

    $getField = $getField . "&count=" . urlencode($tweetCount);

    if ($errors['error']) {
        return json_encode($errors);
    }

    $twitter = new TwitterAPIExchange($GLOBALS['settings']);
    return $twitter->setGetField($getField)
                 ->buildOauth($url, $requestMethod)
                 ->performRequest();
}

$location = [
    'latitude' => 41.3712,
    'longitude' => -73.4140,
    'radius' => 10,
    'unit' => 'mi'
];

echo var_dump(checkUserExists('harinef'));
echo var_dump(checkUserExists('hellothereidonotexist3434343'));
?>