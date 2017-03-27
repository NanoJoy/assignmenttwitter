"# assignment twitter" 

For this coding assignment I chose to make the Twitter app. Though I have always had some desire to learn now to use the Twitter API I never had before. This seemed like a good opportunity to motivate myself to learn a new technology. This assignment also seemed like it would give a good balance between frontend and backend coding.

The application requires PHP 5. You may have to add a certificate authority package file in order to get the authentication working as shown here:
 http://stackoverflow.com/questions/28858351/php-ssl-certificate-error-unable-to-get-local-issuer-certificate/35051707#35051707.

I have also hosted the application at http://caterpill.com/assignmenttwitter

To use the application you can enter a twitter user's screen name, some search terms, or both, as well as the number of tweets you want returned. If no number is specified, 20 tweets will be returned.

A user can also choose to filter results by location. The location can be entered manually as coordinates, or the user can check "use my current location" and the coordinates will be filled in to their own coordinates. This will not work on Chrome version 50 or higher on the hosted version.

The user can also specify a radius around the coordinates within which to include results.

Results can be refreshed using the Search button. Once results are displayed they can be removed by pressing the hide button.

I chose to have the application check the validity of the screen name as it is typed so the user can avoid the frustration of filling out all fields then realizing they made a typo.

For this application I used the Twitter-API-PHP API wrapper by James Mallison, version 1.0.4 under the MIT License: http://github.com/j7mbo/twitter-api-php. I used this to make url encoding and authentication easier for myself. I also used jQuery version 3.1.0 under this license: https://github.com/jquery/jquery/blob/master/LICENSE.txt. Website: https://jquery.com/. I used jQuery to simplify event handling and DOM manipulation. I also used css code from this formstack answer http://stackoverflow.com/a/10179810 to make the input fields look a little nicer.

If I were to develop this application further, I would first focus on removing the threat of XSS attacks. Then I would focus on improving the style and UI.

I hope you enjoy trying out this application and I look forward to hearing from you.