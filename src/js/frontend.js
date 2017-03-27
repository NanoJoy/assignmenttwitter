$(function () {
    var screenNameInput = $("#screenName");
    var searchTermsInput = $("#searchTerms");
    var tweetCountInput = $("#tweetCount");
    var resultsDiv = $("#resultsDiv");

    //Check if screen name exists as user types it in
    screenNameInput.keyup(function (e) {
        var screenNameHelp = $("#screenNameHelp");
        var screenName = screenNameInput.val();
        if (screenName === "") {
            screenNameHelp.html("");
            return;
        }
        screenNameHelp.html("Checking screen name...");
        $.ajax({
            url: "src/php/checkUserExists.php",
            data: {username: screenName}, 
            success: function (data) {
                screenNameHelp.html((data.result === false) ? "That screen name doesn't exist" : "");
            },
            dataType: "json"
        });
    });

    $("#submitButton").click(function (e) {
        $("#searchInputsDiv :input").prop("disabled", true);
        var data = {
            screenName: screenNameInput.val(),
            searchTerms: searchTermsInput.val(),
            tweetCount: tweetCountInput.val()
        };
        $.ajax({
            url: "src/php/getTweets.php",
            data: data,
            success: function (data) {
                $("#searchInputsDiv :input").prop("disabled", false);
                resultsDiv.empty();
                $("#errors").empty();
                if (data.error) {
                    for (var i = 0; i < data.messages.length; i++) {
                        $("#errors").append("<p>" + data.messages[i] + "</p>");
                    }
                    return;
                }
                var tweets = data.statuses;
                if (tweets.length === 0) {
                    resultsDiv.append("<p>No tweets found matching search</p>");
                }
                for (var i = 0; i < tweets.length; i++) {
                    resultsDiv.append("<p>" + tweets[i].text + "</p>");
                }
            },
            dataType: "json"
        });
    });
});