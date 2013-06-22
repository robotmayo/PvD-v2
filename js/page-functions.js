var charSelect;
var nameInput;
var goBtn;
function updateCharState(){

}

function init(){
    charSelect = document.getElementsByClassName("char-select");
    nameInput = document.getElementById("name-input");
    goBtn = document.getElementById("go");
    console.log(charSelect);
    for(var i = 0; i < charSelect.length; i++){
        if(charSelect[i].addEventListener){
            charSelect[i].addEventListener("click",select,false);
        }else if(charSelect[i].attachEvent){
            charSelect[i].attachEvent("click",select,false);
        }
    }
    setInterval(validateInput,100);
}
function select(evt){
    // Old versions of IE use srcElement....
    var caller = event.target || event.srcElement;
    var hasClassList = (caller.classList);
    if(hasClassList && caller.classList.contains("selected")) {return;}
    for(var i = 0; i < charSelect.length; i++){
        if(hasClassList){
            if(charSelect[i].classList.contains("selected")){
                charSelect[i].classList.remove("selected")
            }
        }
    }
    if(hasClassList){
        caller.classList.add("selected");
    }
    console.log(caller);
}
function validateInput(){
    if(nameInput.value.length < 5){
        if( !(nameInput.className == "error") ){
            nameInput.className = "error";
        }
        if( !(goBtn.className == "hidden") ){
            goBtn.className = "hidden";
        }
    }else{
        if( nameInput.className == "error" ){
            nameInput.className = "";
        }
        if(goBtn.className == "hidden"){
            goBtn.className = "";
        }
    }
}
window.onload = function(){
    init();
};
