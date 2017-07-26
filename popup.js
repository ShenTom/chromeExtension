$(document).ready(function(){
    $('#x').click(function(e){
        sendInsertRequest();
    });
});

function sendInsertRequest() {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    console.log("sent");
  });
    
}

//chrome.tabs.create({ 'url': 'options.html' });
