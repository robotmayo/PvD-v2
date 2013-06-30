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

// Player
var player; // The player object
var target; // The currently selected enemy
// Enemy
var enemy;


// Creates all the needed variables and then calls the game loop.
function startGame(playerName){
	gameDiv = $("#game");
	gameDiv.removeClass("hide");
	enemyBlock = $("#enemies");
	heroBlock = $("#heroes");
	setUpGame(playerName);
	gameLoop();
}
function setUpGame(playerName){
	lastTime = Date.now();
	curTime = 0;
	player = new Knight(playerName);
	heroBlock.append(createHeroBlock(player));
	enemy = new Enemy(enemy_data.goblinKing);
	enemyList = [];
	enemyList.push(enemy);
	var eb = createEnemyBlock(enemy);
	eb[0].id = enemyList.length-1;
	eb.on("click",function(){
		$(this).closest("#enemies")
        .find(".enemy").removeClass("selected-red");
        $(this).addClass("selected-red");
        target = enemyList[$(this)[0].id];
	});
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
	container.append(temp);
	temp = info = temp2 = null;
	container.find("#attack").on("click",function(){hero.useAttack(target)});
	return container;
}