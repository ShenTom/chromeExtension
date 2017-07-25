var shouldChange = true;
function checkDOMChange()
{
    if (document.getElementById(":n6")) {
        if(shouldChange == true) {
            document.getElementById(":n6").innerHTML = "helloworld";
            shouldChange = false;
        }

    }
    console.log(shouldChange);
    setTimeout( checkDOMChange, 100 );
}

checkDOMChange();
