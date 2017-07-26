$( document ).ready(function() {
    chrome.storage.local.get("emails",function(result){
        if (!result["emails"]) {
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
    updateEmails();
    $('.done-button').click(function(e) {
        chrome.storage.local.get('email_count', function (result) {
            var x = result["email_count"]+1;
                chrome.storage.local.set({'email_count':x }, function(){
                    chrome.storage.local.get("emails",function(result){
                        var d = JSON.parse(result["emails"]);
                        if (!($('.email-name-input').html() in d)) {
                            d[$('.email-name-input').html()] = $('.email-input').html();
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
    $('.delete-button').click(function(e) {
        var id = $(this).parent().parent().attr('id');
        chrome.storage.local.get('email_count', function (result) {
            var x = result["email_count"]-1;
                chrome.storage.local.set({'email_count':x }, function(){
                    chrome.storage.local.get("emails",function(result){
                        var d = JSON.parse(result["emails"]);
                        console.log(d);
                        delete d[id];

                        d = JSON.stringify(d);
                        chrome.storage.local.set({"emails" :d},function(){
                            updateEmails();
                        });
                    });
                });
        });
    });
});

function updateEmails(){
    chrome.storage.local.get('email_count', function (result) {
        var s = result["email_count"];
        console.log(s);
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
                $("#main-content").append("\
                    <div class=\"email-container\" id=\""+i+"\" >\
                        <div class=\"main-email-content\">\
                            <div class=\"email-title\">"+ i+"</div>\
                            <div class=\"email-field\">" +  d[i] +"</div>\
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
                            <div class=\"delete-button\" ></div>\
                        </div>\
                    </div>\
                ");
            }
            $('.delete-button').click(function(e) {
                var id = $(this).parent().parent().attr('id');
                chrome.storage.local.get('email_count', function (result) {
                    var x = result["email_count"]-1;
                        chrome.storage.local.set({'email_count':x }, function(){
                            chrome.storage.local.get("emails",function(result){
                                var d = JSON.parse(result["emails"]);
                                console.log(id);
                                delete d[id];
                                d = JSON.stringify(d);
                                chrome.storage.local.set({"emails" :d},function(){
                                    updateEmails();
                                });
                            });
                        });
                });
            });
        });

        console.log("updated");
    });
}
