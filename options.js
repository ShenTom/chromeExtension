$( document ).ready(function() {
    console.log(localStorage["email_count"] );
    if (!localStorage["email_count"] ) {
        localStorage["email_count"]  = 0;
    }
    updateEmails();

    $('#add-button').click(function(e) {

        updateEmails();
    });
    $('.done-button').click(function(e) {
        $( "#myPopup" ).popup( "close" );
    });

    console.log("ready");
    $('.delete-button').click(function(e) {
        localStorage["email_count"]--;
        updateEmails();
    });
});

function updateEmails(){
    if (localStorage["email_count"]  ==  0) {
        document.getElementById("no-email-message").style.visibility = "visible";
    } else {
        document.getElementById("no-email-message").style.visibility = "hidden";
    }
    $("#main-content").css("height",localStorage["email_count"]*165);
    $("#main-content").html("");
    for(var i = 0; i <localStorage["email_count"]; i++) {
        $("#main-content").append("\
            <div class=\"email-container\" >\
                <div class=\"main-email-content\">\
                    <div class=\"email-title\">"+ JSON.parse(localStorage.getItem(i+1))["name"]+"</div>\
                    <div class=\"email-field\">" +  JSON.parse(localStorage.getItem(i+1))["text"] +"</div>\
                </div>\
                <div class=\"email-options\">\
                    <div class=\"enable-checkbox\">\
                        <label>\
                            <input type=\"checkbox\" focus-type=\"enabled\"></input>\
                            <span class=\"enable-checkbox-text\">\
                                <span class=\"enabled-text\">Enabled</span>\
                                <span class=\"enable-text\">enable</span>\
                            </span>\
                        </label>\
                    </div>\
                    <div class=\"delete-button\"></div>\
                </div>\
            </div>\
        ");
    }
    $('.delete-button').click(function(e) {
        localStorage["email_count"]--;
        updateEmails();
    });
    console.log("updated");
}
