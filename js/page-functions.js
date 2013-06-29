
var charSelect;
var nameInput;
var goBtn;
var start;
var inputIntervalId;
var nameValid;
function updateCharState(){

}

// Sets up variables and event listeners
function init(){
    charSelect = $(".char-select");
    nameInput = $("#name-input");
    goBtn = $("#go");
    start = $("#start");
    nameInput.on("keyup",checkKey);
    charSelect.on("click",function(){
        $(this).closest("#character-selection")
        .find(".char-select").removeClass("selected");
        $(this).addClass("selected");
    });
    goBtn.on("click",function(){
        if(nameValid){clearAndBegin();}
    });
    nameValid = false;
    inputIntervalId = setInterval(validateInput,100);
}
function checkKey(evt){
    if(evt.keyCode == 13 && nameValid == true){
        clearAndBegin();
    }
}
function clearAndBegin(){
    start.addClass("hide");
    clearInterval(inputIntervalId);
    startGame(nameInput.val());
}
function validateInput(){
    if(nameInput.val().length < 5){
        if( nameInput.hasClass("error") == false ){
            nameInput.addClass("error");
        }
        if( goBtn.hasClass("hidden") == false ){
            goBtn.addClass("hidden");
        }
    }else{
        if(!nameValid){nameValid=true;}
        if( nameInput.hasClass("error")){
            nameInput.removeClass("error");
        }
        if(goBtn.hasClass("hidden")){
            goBtn.removeClass("hidden");
        }
    }
}

$(document).ready(init());