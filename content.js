var currentContent = ""; //user's content in the mail textarea


function saveUserContent() {
    //save the user's content in the var currentContent
    if (document.getElementsByClassName("Am Al editable LW-avf").length > 0) {
        currentContent = document.getElementsByClassName("Am Al editable LW-avf")[0].innerHTML;
    }
    console.log(currentContent);
}


function insertEmailContent(content) {
    //insert content to the mail textarea
    if (document.getElementsByClassName("Am Al editable LW-avf").length > 0) {
        //chop the message into different divisions based on "/n"
        //for loop to add div tag to message
        /*
        var isFirst = true;
        var res = "";
        var numDiv =0;
        for (i = 0; i < content.length; i++) {
            if (content[i] == "/" && content[i+1] == "n") {
                if (isFirst == true) {
                    res = content.slice(0, i) + "<div>" + content.slice(i+2,);
                    isFirst = false;
                    numDiv += 3;

                } else {

                    if (content[i-2] == "/" && content[i-1] == "n"){
                        res = res.slice(0, i+numDiv) + "<br>" + "</div>" + "<div>" + content.slice(i+2,);
                        numDiv += 13;
                    } else {
                        res = res.slice(0, i+numDiv) + "</div>" + "<div>" + content.slice(i+2,);
                        numDiv += 9;
                    }
                }
            }

            if (i == content.length -1 && isFirst!= true) {
                res += "</div>";
            }
        }
        */
        console.log(content);
        document.getElementsByClassName("Am Al editable LW-avf")[0].innerHTML = content;

    }
}

function resetEmailContent() {
    if (document.getElementsByClassName("Am Al editable LW-avf").length > 0) { 
        document.getElementsByClassName("Am Al editable LW-avf")[0].innerHTML = currentContent;
    }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("fd");
    if(request.message[0] == "insert" ) {
      console.log("received insert request!");
      saveUserContent();
      insertEmailContent(request.message[1]);
    }
  }
);


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message == "wipe" ) {
      console.log("received reset request!");
      resetEmailContent();
    }
  }
);
