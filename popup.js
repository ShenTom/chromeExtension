
$(document).ready(function(){
    //can only work for one click
    var click = false;
    $('.box').mouseenter(function(e){
        sendInsertRequest();
    });
    $('.box').click(function(e){
        click = true;
    });
    $('.box').mouseleave(function(e){
        if (click == false) {
            sendWipeRequest();
        }
    });
    $('.options-button').click(function(e){
        chrome.tabs.create({ 'url': 'options.html' });
    });
    // gets all emails in database

    chrome.storage.local.get("emails",function(result){
        var r =  JSON.parse(result["emails"]);
        
        for(i in r){
            console.log(r[i]);
        }
        // you have to do everything with the emails inside this call back function
        //where i am gonna dynamically build the html
        //for loop, check each item's status before add
    });
})


//function that builds the html box
function buildBox(name, content) {
    
}

function sendInsertRequest() {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //send data to content script
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "insert"});
    console.log("sent insert");
  });  
}


function sendWipeRequest() {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "wipe"});
    console.log("sent wipe");
  });  
}
