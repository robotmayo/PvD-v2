// Page Elements
var gameDiv;
var enemyBlock;
var enemyBlockList;
// Game
var lastTime;
var curTime;
var elapsed; // Current frame time (delta) last frame time
var chars; // List of all active characters

// Player
var player; // The player object
// Enemy
var enemy;


// Creates all the needed variables and then calls the game loop.
function startGame(playerName){
	gameDiv = $("#game");
	gameDiv.removeClass("hide");
	enemyBlock = $("#enemies");
	setUpGame(playerName);
	gameLoop();
}
function setUpGame(playerName){
	lastTime = Date.now();
	curTime = 0;
	player = new Hero(playerName);
	enemy = new Enemy(enemy_data.goblinKing);
	var eb = createEnemyBlock(enemy);
	enemyBlockList = [];
	enemyBlockList.push(eb);
	enemyBlock.append(eb);
	enemy.setCanvas(eb.find("canvas")[0]);
	ctx = eb.find("canvas")[0].getContext("2d");
	chars = [];
	chars.push(player,enemy);
}
function gameLoop(){
	curTime = Date.now();
	elapsed = (curTime - lastTime) / 1000;
	update();
	render();
	setTimeout(gameLoop,33);
	lastTime = curTime;
}
function update(){
	for(var e in chars){
		chars[e].update();
	}
}
function render(){
	for(var e in chars){
		chars[e].render();
	}
}
function updateEnemyBlock(blockName){
}
// Its better...
function createEnemyBlock(enemy){
	var eBlock = $("<div/>");
	eBlock.addClass("enemy block-1-3");
	eBlock.append($("<img/>").attr("src","#"));
	eBlock.append($("<h2/>").text(enemy.name));
	var p = $("</p>").addClass("desc");
	var em = $("<em/>").text(enemy.desc);
	p.append(em);
	eBlock.append(p);
	eBlock.append("<canvas/>");
	enemyBlock.append(eBlock);
	p = em = null;
	return eBlock;
}