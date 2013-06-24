// Page Elements
var gameDiv;
var enemyBlock;
var enemyBlockList;
// Game

// Player
var player; // The player object
// Enemy
var enemy;


// Creates all the needed variables and then calls the game loop.
function startGame(){
	gameDiv = document.getElementById("game");
	gameDiv.classList.remove("hide");
	enemyBlock = document.getElementById("enemies");
	var eb = createEnemyBlock(new Enemy("The Goblin King",
		"Despite what the name goblin implies, the Goblin King is a fearsome, hulking giant."));
	enemyBlockList = [];
	enemyBlockList.push(eb);
	enemyBlock.appendChild(eb);

}
function updateEnemyBlock(blockName){
}
// There has to be a way to make this function less convoluted...
function createEnemyBlock(enemy){
	var eBlock = document.createElement("div");
	eBlock.className = "enemy block-1-3";
	eBlock.appendChild(document.createElement("img"));
	var temp = document.createElement("h2");
	temp.className = "name";
	temp.innerHTML = enemy.name;
	eBlock.appendChild(temp);
	temp = [];
	temp[0] = document.createElement("p");
	temp[1] = document.createElement("em");
	temp[0].className = "desc";
	temp[1].innerHTML = enemy.desc;
	temp[0].appendChild(temp[1]);
	temp = temp[0];
	eBlock.appendChild(temp);
	eBlock.appendChild(document.createElement("canvas"));
	temp = null;
	return eBlock;
}