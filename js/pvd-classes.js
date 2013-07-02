// The start of something great!
function Character(){

}
Character.prototype.health = 0;
Character.prototype.maxHealth = 0;
Character.prototype.mana = 0;
Character.prototype.maxMana = 0;
Character.prototype.power = 0;
Character.prototype.magic = 0;
Character.prototype.critRate = 10;
Character.prototype.critMul = 1.4;
Character.prototype.alive = true;
Character.prototype.name = "Character";
Character.prototype.desc = "Base Class";
Character.prototype.maxAtb = 100;
Character.prototype.atb = 0;
Character.prototype.atbRecRate = 25;
Character.prototype.canAction = false;
Character.prototype.minDamage = 0;
Character.prototype.maxDamage = 1;
Character.prototype.minMagicDamage = 0;
Character.prototype.maxMagicDamage = 1;
Character.prototype.updateHealth = function(value){
  this.health += value;
  if(this.health < 0) {
    this.health = 0;
    this.alive = false;
  }
  if(this.health > this.maxHealth) this.health = this.maxHealth;
};

Character.prototype.updateMana = function(value){
  this.mana += value;
  if(this.mana < 0) this.mana = 0;
  if(this.mana > this.maxMana) this.mana = this.maxMana;
};

Character.prototype.useAttack = function(target){
  if(!this.canAction) return;
  target.updateHealth(this.calcDamage());
  this.resetAtb();
};

Character.prototype.useMagic = function(target){
  target.updateHealth(this.calcMagicDamage());
};

Character.prototype.defend = function(){

};

Character.prototype.calcDamage = function(){
  return -Math.ceil(getRandom(this.minDamage,this.maxDamage) * this.rollCrit());
};

Character.prototype.calcMagicDamage = function(){
  return -Math.ceil(getRandom(this.minMagicDamage,this.maxMagicDamage) * this.rollCrit());
};

Character.prototype.update = function(){
  
};

Character.prototype.updateAtb = function(){
  if(!this.alive) return;
  this.atb += this.atbRecRate * elapsed;
  if(this.atb > this.maxAtb){
    this.atb = this.maxAtb;
    this.canAction = true;
  }
};

Character.prototype.resetAtb = function(){
  this.atb = 0;
  this.canAction = false;
}
Character.prototype.reset = function(){
  this.health = this.maxHealth;
  this.mana = this.maxMana;
  this.atb = 0;
  this.alive = true;
  this.canAction = false;
  this.clearCanvas();
}
// Expects a canvas context
Character.prototype.render = function(context){
  // Overide and render
};
Character.prototype.clearCanvas = function(){
  this.canvasContext.clearRect(0,0,this.canvas.width,this.canvas.height);
}
Character.prototype.canvas = false;
Character.prototype.canvasContext = false;
Character.prototype.setCanvas = function(canvas){
  this.canvas = canvas;
  this.canvasContext = canvas.getContext("2d");
  this.canvasContext.font = "20px arial";
  this.canvasContext.textBaseline = "bottom";
}
Character.prototype.getBar = function(min,max,width){
  return Math.floor((min/max)*width);
}
Character.prototype.rollCrit = function(){
  var chance = getRandom(0,100);
  if(chance <= this.critRate){
    console.log("CRIT");
    return this.critMul;
  }
  return 1;
}

function Knight(name,data){
  this.name = name;
  this.desc = data.desc;
  this.health = this.maxHealth = data.hp;
  this.mana = this.maxMana = data.mp;
  this.atb = 0;
  this.maxAtb = data.matb;
  this.atbRecRate = data.atbc;
  this.critMul = data.critMul;
  this.critRate = data.critRate;
  this.minDamage = data.minDamage;
  this.maxDamage = data.maxDamage;
  this.render = function(){
    this.clearCanvas();

    // Bar Drawing
    this.canvasContext.fillStyle = "#AA0042";
    this.canvasContext.fillRect(0,5,this.getBar(this.health,this.maxHealth,200),25);

    this.canvasContext.fillStyle = "#4200AA";
    this.canvasContext.fillRect(0,45,this.getBar(this.mana,this.maxMana,200),25);

    this.canvasContext.fillStyle = "rgb(119,144,255)";
    this.canvasContext.fillRect(0,85,this.getBar(this.atb,this.maxAtb,200),25);

    // Text Drawing 
    // Text rendering is really shitty. REALLY SHITTY.
    this.canvasContext.fillStyle = "#FFF";
    this.canvasContext.fillText(this.health,100,30);

    this.canvasContext.fillText(this.mana,100, 70);

    
  };
  this.update = function(){
    this.updateAtb();
  }
  this.useMagic = function(target){
    if(!this.canAction || this.mana < 50) return;
    this.mana -= 50;
    target.updateHealth(this.calcDamage() + -Math.floor(this.health * .05));
    this.resetAtb();
  }

}
Knight.prototype = new Character();

/**
Name {String} Enemy name
Desc {String} Enemy description
Hp {Int} Max Health
MP {Int} Max Mana
satb {Int} Starting ATB charge
matb {Int} Maximum ATB charge
atbc {Int} ATB Charge rate in x per seconds
*/
function Enemy(obj){
  this.name = obj.name;
  this.desc = obj.desc;
  this.health = this.maxHealth = obj.hp;
  this.mana = this.maxMana = obj.mp;
  this.atb = obj.satb || getRandom(0,obj.matb);
  this.maxAtb = obj.matb;
  this.atbRecRate = getRandom(Math.floor(obj.atbc / 2),obj.atbc);
  this.critMul = obj.critMul;
  this.critRate = obj.critRate;
  this.minDamage = obj.minDamage;
  this.maxDamage = obj.maxDamage;
  
  this.render = function(){
    this.canvasContext.clearRect(0,0,this.canvas.width,this.canvas.height);

    this.canvasContext.fillStyle = "#AA0042";
    this.canvasContext.fillRect(0,5,this.getBar(this.health,this.maxHealth,200),25);

    this.canvasContext.fillStyle = "#4200AA";
    this.canvasContext.fillRect(0,45,this.getBar(this.mana,this.maxMana,200),25);

    this.canvasContext.fillStyle = "rgb(119,144,255)";
    this.canvasContext.fillRect(0,85,this.getBar(this.atb,this.maxAtb,200),25);

    this.canvasContext.fillStyle = "#FFF";
    this.canvasContext.fillText(this.health,100,30);

    this.canvasContext.fillText(this.mana,100, 70);
    
  };
  this.update = function(){
    this.updateAtb();
    this.updateAi();
  }
  this.updateAi = function(){
    if(!this.canAction || !this.alive) return;
    this.useAttack(player);
  }

}
Enemy.prototype = new Character();
