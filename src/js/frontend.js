$(function () {
    $("#screenName").keyup(function (e) {
        var screenNameHelp = $("#screenNameHelp");
        var screenName = $(this).val();
        if (screenName === "") {
            screenNameHelp.html("");
            return;
        }
        $.ajax({
            url: "src/php/checkUserExists.php",
            data: {username: screenName}, 
            success: function (data) {
                console.log("hi");
                screenNameHelp.html((data === false) ? "That screen name doesn't exist" : "");
            },
            error: function (a, b, c) {
                document.write(a.responseText);
            },
            dataType: "json"
        });
    });
});