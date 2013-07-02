
var charSelect;
var nameInput;
var goBtn;
var start;
var inputIntervalId;
var nameValid;
var selected;
function updateCharState(){

}

// Sets up variables and event listeners
function init(){
    addCharDesc();
    charSelect = $(".char-select");
    nameInput = $("#name-input");
    goBtn = $("#go");
    start = $("#start");
    nameInput.val("Violent Asperagus");
    nameInput.on("keyup",checkKey);
    charSelect.on("click",function(){
        $(this).closest("#character-selection")
        .find(".char-select").removeClass("selected");
        $(this).addClass("selected");
        if(nameInput.hasClass("hidden")){
            nameInput.removeClass("hidden");
        }
        selected = $(this);
    });
    goBtn.on("click",function(){
        if(nameValid){clearAndBegin();}
    });
    nameValid = false;
    inputIntervalId = setInterval(validateInput,100);
}
function addCharDesc(){
    var i = 0;
    var charSelect = $(".char-select").each(function(){
        $(this).children("h2").text(heroDesc[i].name);
        $(this).children("p.info").text(heroDesc[i].desc);
        $(this).data("class",heroDesc[i].name.toLowerCase());
        i++;
    });
}
function checkKey(evt){
    if(evt.keyCode == 13 && nameValid == true){
        clearAndBegin();
    }
}
function clearAndBegin(){
    start.addClass("hide");
    clearInterval(inputIntervalId);
    nameInput.off("keyup");
    goBtn.off("click");
    //selected.data().class
    startGame({name : nameInput.val(), class : "knight"});
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