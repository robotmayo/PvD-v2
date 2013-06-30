// The start of something great!
function Character(){

}
Character.prototype.health = 0;
Character.prototype.maxHealth = 0;
Character.prototype.mana = 0;
Character.prototype.maxMana = 0;
Character.prototype.power = 0;
Character.prototype.magic = 0;
Character.prototype.critRate = 0;
Character.prototype.critMul = 0;
Character.prototype.alive = true;
Character.prototype.name = "Character";
Character.prototype.desc = "Base Class";
Character.prototype.maxAtb = 100;
Character.prototype.atb = 0;
Character.prototype.atbRecRate = 25; 

Character.prototype.updateHealth = function(value){
  this.health += value;
  if(this.health < 0) this.health = 0;
  if(this.health > this.maxHealth) this.health = this.maxHealth;
};

Character.prototype.updateMana = function(value){
  this.mana += value;
  if(this.mana < 0) this.mana = 0;
  if(this.mana > this.maxMana) this.mana = this.maxMana;
};

Character.prototype.useAttack = function(target){
  if(this.atb < this.maxAtb) return;
  target.updateHealth(this.calcDamage());
  this.resetAtb();
};

Character.prototype.useMagic = function(target){
  target.updateHealth(this.calcMagicDamage());
};

Character.prototype.defend = function(){

};

Character.prototype.calcDamage = function(){
  return 0;
};

Character.prototype.calcMagicDamage = function(){
  return 0;
};

Character.prototype.update = function(){
  
};

Character.prototype.updateAtb = function(){
  this.atb += this.atbRecRate * elapsed;
  if(this.atb > this.maxAtb){
    this.atb = this.maxAtb;
  }
};

Character.prototype.resetAtb = function(){
  this.atb = 0;
}
// Expects a canvas context
Character.prototype.render = function(context){
  // Overide and render
};
Character.prototype.canvas = false;
Character.prototype.canvasContext = false;
Character.prototype.setCanvas = function(canvas){
  this.canvas = canvas;
  this.canvasContext = canvas.getContext("2d");
  this.canvasContext.font = "24px arial bold";
  this.canvasContext.textBaseline = "bottom";
}
Character.prototype.getBar = function(min,max,width){
  return Math.floor((min/max)*width);
}

function Knight(name){
  this.name = name;
  this.desc = "The valiant knight"
  this.health = this.maxHealth = 2400;
  this.mana = this.maxMana = 200;
  this.render = function(){
    this.canvasContext.clearRect(0,0,this.canvas.width,this.canvas.height);

    // Bar Drawing
    this.canvasContext.fillStyle = "#AA0042";
    this.canvasContext.fillRect(0,5,this.getBar(this.health,this.maxHealth,200),25);

    this.canvasContext.fillStyle = "#4200AA";
    this.canvasContext.fillRect(0,45,this.getBar(this.mana,this.maxMana,200),25);

    this.canvasContext.fillStyle = "rgb(119,144,255)";
    this.canvasContext.fillRect(0,85,this.getBar(this.atb,this.maxAtb,200),25);

    // Text Drawing 
    // Text rendering is really shitty. REALLY SHITTY.
    //this.canvasContext.fillStyle = "#4200AA";
    //this.canvasContext.fillText("HP",220,30);

    //this.canvasContext.fillStyle = "#4200AA";
    //this.canvasContext.fillText("MP " + this.mana,210, 45);

    
  };
  this.update = function(){
    this.updateAtb();
  }
  this.calcDamage = function(){
    return -500;
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
function Enemy(obj,name,desc,hp,mp,satb,matb,atbc){
  this.name = obj.name || name;
  this.desc = obj.desc || desc;
  this.health = this.maxHealth = obj.hp || hp;
  this.mana = this.maxMana = obj.mp || mp;
  this.atb = obj.satb || satb;
  this.maxAtb = obj.matb || matb;
  this.atbRecRate = obj.atbc || atbc;
  
  this.render = function(){
    this.canvasContext.clearRect(0,0,this.canvas.width,this.canvas.height);

    this.canvasContext.fillStyle = "#AA0042";
    this.canvasContext.fillRect(0,5,this.getBar(this.health,this.maxHealth,200),25);

    this.canvasContext.fillStyle = "#4200AA";
    this.canvasContext.fillRect(0,45,this.getBar(this.mana,this.maxMana,200),25);

    this.canvasContext.fillStyle = "rgb(119,144,255)";
    this.canvasContext.fillRect(0,85,this.getBar(this.atb,this.maxAtb,200),25);

    
  };
  this.update = function(){
    this.updateAtb();
  }

}
Enemy.prototype = new Character();
