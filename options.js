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
                var enabled_text_style = "hidden";
                var enable_text_style = "hidden";
                if(enabled) {
                    check_box_value = "checked";
                    enabled_text_style = "visible";
                } else {
                    enable_text_style = "visible";
                }

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
                                        <span class=\"enabled-text\" style=\"visibility:"+enabled_text_style+";\">Enabled</span>\
                                        <span class=\"enable-text\" style=\"visibility:"+enable_text_style+";\">enable</span>\
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
            update_email_status(true, $(this).parent().parent().parent().parent().attr('id'))
        } else {
            console.log("not checked");
            $(this).parent().find('.enable-checkbox-text').find('.enabled-text').css('visibility','hidden');
            $(this).parent().find('.enable-checkbox-text').find('.enable-text').css('visibility','visible');
            update_email_status(false, $(this).parent().parent().parent().parent().attr('id'))
        }
    });
    $('.main-email-content').click(function(e){
        if($(this).height() == 165) {
            var t = $(this);
            if($(".done-editing-button")[0]){
                var a = $(".done-editing-button").parent().find('.email-field').animate({
                    height: 100,
                    scrollTop: 0
                }, { duration: 200, queue: false }).promise();
                var b = $(".done-editing-button").parent().animate({
                    height: 165
                }, { duration: 200, queue: false }).promise();
                $.when(a,b).then(function() {
                    $(".done-editing-button").parent().find('.email-field').attr('contentEditable','false');
                    $(".done-editing-button").parent().find('.email-field').attr('overflow','hidden');
                    $(".done-editing-button").find('.email-title').attr('contentEditable','false');
                    $(".done-editing-button").remove();
                    updateEmails();
                });
            } else {
                var a = $(this).animate({
                    height: 465
                }, { duration: 200, queue: false }).promise();
                var b = $(this).find('.email-field').animate({
                    height: 350
                }, { duration: 200, queue: false }).promise();
                var c = $('html, body').animate({
                    scrollTop: $(this).parent().offset().top - 59
                }, { duration: 200, queue: false }).promise();
                $.when(a,b,c).then(function() {
                    t.find('.email-field').attr('contentEditable','true');
                    t.find('.email-field').attr('overflow','scroll');
                    t.append("<div class=\"done-editing-button\">Save</div>");
                    t.find('.email-title').attr('contentEditable','true');

                    $('.done-editing-button').click(function(e){
                        edit_email($(this).parent().find('.email-field').html(),$(this).parent().parent().attr('id'), $(this).parent().find('.email-title').html());
                        var a = $(this).parent().find('.email-field').animate({
                            height: 100,
                            scrollTop: 0
                        }, { duration: 200, queue: false }).promise();
                        var b = $(this).parent().animate({
                            height: 165
                        }, { duration: 200, queue: false }).promise();
                        $.when(a,b).then(function() {
                            $(this).parent().find('.email-field').attr('contentEditable','false');
                            $(this).parent().find('.email-field').attr('overflow','hidden');
                            $(this).find('.email-title').attr('contentEditable','false');
                            $(this).remove();
                            updateEmails();
                        });
                    });
                });
            }
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
    $('.enabled-check-box').change(function(){
        if(this.checked) {
            console.log("checked");
        } else {
            console.log("not checked");
        }
    });
    $('.email-title').on('keydown paste', function(event) { //Prevent on paste as well

        if($(this).text().length === 50 && event.keyCode != 8) {
            event.preventDefault();
        }
        if($(this).text().length === 0 && event.keyCode == 8) {
            event.preventDefault();
        }
    });
}

function update_email_status(status,email_name){
    console.log(email_name,status);
    chrome.storage.local.get("emails",function(result){
        var d = JSON.parse(result["emails"]);
        d[email_name][1] = status;
        d = JSON.stringify(d);
        chrome.storage.local.set({"emails" :d},function(){
            updateEmails();
        });
    });
}

function edit_email(content,name,updated_name){
    //console.log(name,updated_name,content);
    chrome.storage.local.get("emails",function(result){
        var d = JSON.parse(result["emails"]);
        d[name] = [content, d[name][1]];
        if (name != updated_name) {
            d[updated_name] = d[name];
            delete d[name];
        }
        d = JSON.stringify(d);
        chrome.storage.local.set({"emails" :d},function(){
            updateEmails();
            $( "#myPopup" ).popup( "close" );
        });
    });
}
