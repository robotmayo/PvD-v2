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
  target.updateHealth(this.calcDamage());
};

Character.prototype.useMagic = function(target){
  target.updateHealth(this.calcMagicDamage());
};

Character.prototype.defend = function(){

};

Character.prototype.calcDamage = function(){
  return 1;
};

Character.prototype.calcMagicDamage = function(){
  return 1;
};

function Hero(name){
  this.name = name;
}
Hero.prototype = Character.prototype;
Hero.prototype.calcDamage = function(){
  return 999999;
};
var test = new Hero("Dick McPhearson");
console.log(test.calcDamage());