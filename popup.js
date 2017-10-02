
$(document).ready(function(){
    $('.options-button').click(function(e){
        chrome.tabs.create({ 'url': 'options.html' });
    });
    
    // gets all emails in database
    chrome.storage.local.get("emails",function(result){
        var r =  JSON.parse(result["emails"]);
        var i = 0;
        // you have to do everything with the emails inside this callback function
        //where i am gonna dynamically build the html
        //for loop, check each item's status before add
        for (key in r){
            if (r[key][1] == true){
                i++;
                var box = document.getElementById("wrapper").innerHTML;
                box += buildBox(key, r[key][0]);
                document.getElementById("wrapper").innerHTML = box;
            }
        }
        if (i == 0) {
            var temp = document.getElementById("wrapper").innerHTML;
            temp += '<div><br></div><p>You do not have any email. Please go to the option page to add a new one or enable saved ones.</p><div><br></div>';
            document.getElementById("wrapper").innerHTML = temp;
        }
        
        
        //can only work for one click
        var click = false;
        $('.box').mouseenter(function(e){
            var content = $(this).find('.mailContent').find('.content').html();
            sendInsertRequest(content);
        });
        $('.box').click(function(e){
            click = true;
        });
        $('.box').mouseleave(function(e){
            if (click == false) {
                sendResetRequest();
            }
            click = false;
        });
    });
})



//Sample box
/*
<div class="box">
    <div class="mailContent">
        <div class="content">
            Hi Tom,<div><br></div><div>Stop sniffing, are you a dog? You nasty dog.</div><div><br></div><div>Best,</div><div>Edward.</div>
        </div>
        <div class="overlay">
            <div class="name">New Email</div>
        </div>
    </div>
</div>
*/


function buildBox(name, content) {
//function that builds the html box
//enter string name, string content, int num
    var result = '<div class="box"><div class="mailContent"><div class="content">' + content + '</div><div class="overlay"><div class="name">' + name + '</div></div></div></div><div><br></div>';
    return result;
}


function sendInsertRequest(content) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //send data to content script
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": ["insert", content]});
    console.log("sent insert");
  });  
}


function sendResetRequest() {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "reset"});
    console.log("sent wipe");
  });  
}
