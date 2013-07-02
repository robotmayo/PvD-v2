// Page Elements
var gameDiv;
var enemyBlock;
var heroBlock;
// Game
var lastTime;
var curTime;
var elapsed; // Current frame time (delta) last frame time
var chars; // List of all active characters
var enemyList; // List of all enemys
var enemyBlockList; // List of all enemy blocks
var dead; // Number of dead enemies

// Player
var player; // The currently active player
var players; // All players
var target; // The currently selected enemy
// Enemy
var enemy;


// Creates all the needed variables and then calls the game loop.
function startGame(playerData){
	gameDiv = $("#game");
	gameDiv.removeClass("hide");
	enemyBlock = $("#enemies");
	heroBlock = $("#heroes");
	lastTime = Date.now();
	curTime = 0;
	setUpEnemies();
	setUpPlayer(playerData);
	chars = [];
	chars.push(player);
	for(var i = 0; i < enemyList.length; i++){chars.push(enemyList[i])};
	target = enemyList[0];
	enemyBlockList[0].addClass("selected-red");
	gameLoop();
}
function setUpEnemies(){
	enemyList = [];
	enemyBlockList = [];
	enemyList.push(new Enemy(enemyData.goblinKing));
	enemyList.push(new Enemy(enemyData.goblin));
	enemyList.push(new Enemy(enemyData.goblin));
	var eb;
	for(var i = 0; i < enemyList.length; i++){
		eb = createEnemyBlock(enemyList[i]);
		eb[0].id = i;
		enemyList[i].setCanvas(eb.find("canvas")[0]);
		enemyBlockList.push(eb);
		enemyBlock.append(eb);
	}
	$(".enemy").on("click",function(){
		$(this).closest("#enemies")
        .find(".enemy").removeClass("selected-red");
        $(this).addClass("selected-red");
        target = enemyList[$(this)[0].id];
	});
}
function setUpPlayer(playerData){
	player = new Knight(playerData.name,heroData[playerData.class.toLowerCase()]);
	heroBlock.append(createHeroBlock(player));
}
function restart(){
	for(var i = 0; i < chars.length; i++){
		chars[i].reset();
	}
}
function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
function gameLoop(){
	curTime = Date.now();
	elapsed = (curTime - lastTime) / 1000;
	update();
	render();
	lastTime = curTime;
	setTimeout(gameLoop,33);
}
function update(){
	for(var i = 0; i < chars.length; i++){
		chars[i].update();
	}
}
function render(){
	for(var i = 0; i < chars.length; i++){
		chars[i].render();
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
// Kill it with fire!
function createHeroBlock(hero){
	var container = $("<div></div>");
	container.addClass("hero block-1-3");
	container.append($("<img/>"));
	var info = $("<div></div>");
	info.addClass("info");
	var temp = $("<h2></h2>");
	temp.addClass("name");
	temp.text(hero.name);
	info.append(temp);
	temp = $("<p></p>");
	temp.addClass("desc");
	var temp2 = $("<em></em>");
	temp2.text(hero.desc);
	temp.append(temp2);
	info.append(temp);
	container.append(info);
	temp = $("<canvas></canvas>")
	hero.setCanvas(temp[0]);
	container.append(temp);
	temp = $("<div></div>");
	temp.addClass("inputs");
	temp2 = $("<button></button>");
	temp2[0].id = "attack";
	temp2.text("Attack");
	temp.append(temp2);
	temp2 = $("<button></button>");
	temp2[0].id = "magic";
	temp2.text("Magic");
	temp.append(temp2);
	container.append(temp);
	temp = info = temp2 = null;
	container.find("#attack").on("click",function(){hero.useAttack(target)});
	container.find("#magic").on("click",function(){hero.useMagic(target)});
	return container;
}