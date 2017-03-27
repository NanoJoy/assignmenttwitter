$(function () {
    var screenNameInput = $("#screenName");
    var searchTermsInput = $("#searchTerms");
    var tweetCountInput = $("#tweetCount");
    var resultsDiv = $("#resultsDiv");
    var latitude = $("#latitude");
    var longitude = $("#longitude");
    var radius = $("#radius");
    var unit = $("#unit");

    function makeTweetDisplay(text) {
        var html =  '<div class="tweetDisplay">'
                +      '<p>' + text + '</p>'
                +      '<button class="hideTweet">Hide</button>'
                +  '</div>';
        return html;
    }

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

    $("#useMyLocation").click(function (e) {
        function positionGotten(position) {
            latitude.val(position.coords.latitude);
            longitude.val(position.coords.longitude);
        }

        if (this.checked) {
            if (navigator.geolocation) {
                latitude.prop("disabled", true);
                longitude.prop("disabled", true);
                navigator.geolocation.getCurrentPosition(positionGotten);
            } else {
                $(this).prop("disabled", true);
                $("label [for='useMyLocation']").html("Geolocation not supported by this browser");
            }
        } else {
            latitude.prop("disabled", false);
            longitude.prop("disabled", false);

        }
    });

    $("#latitude").keyup(function (e) {
        var value = parseInt($(this).val(), 10);
        if (value < -90) {
            $(this).val(-90);
        }
        if (value > 90) {
            $(this).val(90);
        }
    });

    $("#longitude").keyup(function (e) {
        var value = parseInt($(this).val(), 10);
        if (value < -180) {
            $(this).val(-180);
        }
        if (value > 180) {
            $(this).val(180);
        }
    });

    $("#usingLocation").change(function (e) {
        $("#locationInputs").toggle(this.checked);
    }).change();

    $("#submitButton").click(function (e) {
        $("#errors").empty();
        resultsDiv.empty();
        var makeSearch = true;
        var data = {
            screenName: screenNameInput.val(),
            searchTerms: searchTermsInput.val(),
            tweetCount: tweetCountInput.val()
        };

        if ($("#usingLocation").is(":checked")) {
            if (latitude.val() === "") {
                makeSearch = false;
                $("#errors").append("<p>Please enter a latitude</p>")
            }
            if (longitude.val() === "") {
                makeSearch = false;
                $("#errors").append("<p>Please enter a longitude</p>")
            }
            if (latitude.val() === "") {
                makeSearch = false;
                $("#errors").append("<p>Please enter a radius</p>")
            }
            data.location = {
                latitude: latitude.val(),
                longitude: longitude.val(),
                radius: radius.val(),
                unit: unit.val()
            }
        }

        if (makeSearch) {
            $("#searchInputsDiv :input").prop("disabled", true);
            $.ajax({
                url: "src/php/getTweets.php",
                data: data,
                error: function (a, b, c) {
                    console.log(a);
                },
                success: function (data) {
                    $("#searchInputsDiv :input").prop("disabled", false);
                    if ($("#useMyLocation").is(":checked")) {
                        $("#latitude, #longitude").prop("disabled", true);
                    }
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
                        resultsDiv.append(makeTweetDisplay(tweets[i].text));
                    }
                    $(".hideTweet").unbind("click");

                    $(".hideTweet").click(function (e) {
                        $(this).parent().remove();
                    });
                },
                dataType: "json"
            });
        }
    });
});