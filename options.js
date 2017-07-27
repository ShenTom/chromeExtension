$( document ).ready(function() {
    // check if this is the first time that the extension is being used
    chrome.storage.local.get("email_count",function(result){
        if (!result["email_count"]) {
            chrome.storage.local.set({'email_count':0}, function(){
            });
        }
    });
    chrome.storage.local.get("emails",function(result){
        if(!result["emails"]) {
            var d = {}
            chrome.storage.local.set({"emails" :JSON.stringify(d)},function(){
            });
        }
    });
    // update the page
    updateEmails();
    // add hnadler to done-button
    done_button_handler();
    // add handler to delete-button
    delete_button_handler();
    $('.enabled-check-box').change(function(){
        if(this.checked) {
            console.log("checked");
        } else {
            console.log("not checked");
        }
    });
});

function updateEmails(){
    chrome.storage.local.get('email_count', function (result) {
        var s = result["email_count"];
        if(s == 0) {
            document.getElementById("no-email-message").style.visibility = "visible";
        } else {
            document.getElementById("no-email-message").style.visibility = "hidden";
        }

        $("#main-content").css("height",s*165);
        $("#main-content").html("");
        chrome.storage.local.get("emails",function(result){
            var d = JSON.parse(result["emails"]);
            for (i in d) {
                var enabled = d[i][1];
                var check_box_value = "";
                if(enabled) check_box_value = "checked";
                $("#main-content").append("\
                    <div class=\"email-container\" id=\""+i+"\" >\
                        <div class=\"main-email-content\">\
                            <div class=\"email-title\">"+ i+"</div>\
                            <div class=\"email-field\">" +  d[i][0] +"</div>\
                        </div>\
                        <div class=\"email-options\">\
                            <div class=\"enable-checkbox\">\
                                <label>\
                                    <input class=\"enabled-check-box\" type=\"checkbox\" focus-type=\"enabled\" "+check_box_value +"></input>\
                                    <span class=\"enable-checkbox-text\" >\
                                        <span class=\"enabled-text\">Enabled</span>\
                                        <span class=\"enable-text\">enable</span>\
                                    </span>\
                                </label>\
                            </div>\
                            <div class=\"delete-button\" ></div>\
                        </div>\
                    </div>\
                ");
            }
            delete_button_handler();
        });
    });
}

function done_button_handler(){
    $('.done-button').click(function(e) {
        chrome.storage.local.get('email_count', function (result) {
            var x = result["email_count"]+1;
                chrome.storage.local.set({'email_count':x }, function(){
                    chrome.storage.local.get("emails",function(result){
                        var d = JSON.parse(result["emails"]);
                        if (!($('.email-name-input').html() in d)) {
                            d[$('.email-name-input').html()] = [$('.email-input').html(), true];
                        }
                        d = JSON.stringify(d);
                        chrome.storage.local.set({"emails" :d},function(){
                            updateEmails();
                            $( "#myPopup" ).popup( "close" );
                        });
                    });
                });
        });
    });
}

function delete_button_handler(){
    $('.enabled-check-box').change(function(){
        if(this.checked) {
            console.log("checked");
            $(this).parent().find('.enable-checkbox-text').find('.enable-text').css('visibility','hidden');
            $(this).parent().find('.enable-checkbox-text').find('.enabled-text').css('visibility','visible');
        } else {
            console.log("not checked");
            $(this).parent().find('.enable-checkbox-text').find('.enabled-text').css('visibility','hidden');
            $(this).parent().find('.enable-checkbox-text').find('.enable-text').css('visibility','visible');
        }
    });
    $('.delete-button').click(function(e) {
        var id = $(this).parent().parent().attr('id');
        chrome.storage.local.get('email_count', function (result) {
            var x = result["email_count"]-1;
                chrome.storage.local.set({'email_count':x }, function(){
                    chrome.storage.local.get("emails",function(result){
                        var d = JSON.parse(result["emails"]);
                        delete d[id];
                        d = JSON.stringify(d);
                        chrome.storage.local.set({"emails" :d},function(){
                            updateEmails();
                        });
                    });
                });
        });
    });
}
