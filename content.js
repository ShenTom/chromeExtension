var currentContent = ""; //user's content in the mail textarea
var textAreaClass = "Am Al editable LW-avf"; //gmail's email textarea class


function insertEmailContent(content) {
    //insert content to the mail textarea
    if (document.getElementsByClassName(textAreaClass).length > 0) {
        console.log(content);
        document.getElementsByClassName(textAreaClass)[0].innerHTML = content;

    }
}


function resetEmailContent() {
    if (document.getElementsByClassName(textAreaClass).length > 0) { 
        document.getElementsByClassName(textAreaClass)[0].innerHTML = currentContent;
    }
}


function saveUserContent() {
    //save the user's content in the var currentContent
    if (document.getElementsByClassName(textAreaClass).length > 0) {
        currentContent = document.getElementsByClassName(textAreaClass)[0].innerHTML;
    }
    console.log(currentContent);
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message[0] == "insert" ) {
      console.log("received insert request!");
      //save what the user has typed before inserting the saved content
      saveUserContent();
      insertEmailContent(request.message[1]);
    }
  }
);


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message == "reset" ) {
      console.log("received reset request!");
      resetEmailContent();
    }
  }
);
