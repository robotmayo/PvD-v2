var charSelect;
var nameInput;
var goBtn;
var start;
function updateCharState(){

}

// Sets up variables and event listeners
function init(){
    charSelect = document.getElementsByClassName("char-select");
    nameInput = document.getElementById("name-input");
    goBtn = document.getElementById("go");
    start = document.getElementById("start");
    if(nameInput.addEventListener){
            nameInput.addEventListener("keyup",checkKey,false);
        }else if(nameInput.attachEvent){
            nameInput.attachEvent("keyup",checkKey,false);
    }

    for(var i = 0; i < charSelect.length; i++){
        if(charSelect[i].addEventListener){
            console.log(charSelect[i]);
            charSelect[i].addEventListener("click",select,false);
        }else if(charSelect[i].attachEvent){
            charSelect[i].attachEvent("click",select,false);
        }
    }
    setInterval(validateInput,100);
}
function checkKey(evt){
    if(evt.keyCode == 13){
        if(document.readyState === "complete"){
            start.classList.add("hide");
            setInterval(startGame()); // Don't want it to block
        }
    }
}
function select(evt){
    // Old versions of IE use srcElement....
    var caller = event.target || event.srcElement;
    // For some reason the select event is being called by the children
    // Of the div instead of only the div itself.
    if(caller.tagName != "DIV") caller = caller.parentNode;
    if(caller.classList.contains("selected")) {return;}
    for(var i = 0; i < charSelect.length; i++){
        if(charSelect[i].classList.contains("selected")){
            charSelect[i].classList.remove("selected")
        }
    }
    caller.classList.add("selected");
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
