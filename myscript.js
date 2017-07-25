var shouldChange = true;
function checkDOMChange()
{
    if (document.getElementsByClassName("Am Al editable LW-avf").length > 0) {
        if(shouldChange == true) {
            document.getElementsByClassName("Am Al editable LW-avf")[0].innerHTML = "helloworld";
            shouldChange = false;
        }

    }
    console.log(shouldChange);
    setTimeout( checkDOMChange, 100 );
}

checkDOMChange();
