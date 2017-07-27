
$(document).ready(function(){
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
})

function sendInsertRequest() {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
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
