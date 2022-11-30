// ######### RPG Battle - Nov/Dec 2022 #########
// 
// ########### Made by AlanOixDeCoco ###########
// 
// /!\ You are totally free to use my code as an inspiration, please consider
// mentioning this repo if you use it as a base for your code! *pray* /!\
//
// ### INFORMATIONS ###
// 
// === NAMING ===
// I am using hungarian case to name my global variables
// camelCase is used for function variables
// UpperCase for functions
// Capital letters for constants
// ==============
// 

//#region characters & ennemies arrays

//#region constants
// Indexes constants
const ID = 0 // characters/ennemies ID index in arrays
const NAME = 1 // characters/ennemies NAME index in arrays
const HP = 2 // characters/ennemies HP index in arrays
const DMG = 3 // characters/ennemies DMG (pts) index in arrays
const MANA = 4 // characters MANA index in arrays
const SPE = 5 // characters SPECIAL ABILITY index in arrays

// Values constants : characters
const MAX_CHARACTERS_HEALTH = 100 // max characters HP
const MAX_CHARACTERS_MANA = 100 // max characters MANA
const MAX_CHARACTERS_DAMAGE = 20 // maximum damage to deal to the ennemies

// Values constants : ennemies
const MAX_ENNEMIES_HEALTH = 150 // max ennemies HP
const MIN_ENNEMIES_DAMAGE = 10 // minimum damage to deal to the characters

const INNIT_PROTECT_VALUE = false // by default the player can receive full damage
//#endregion

// characters are defined as arrays of values, themselves inside another array
var lst_characters = [
    // html ID, NAME, HP (health pts), DMG (damage pts), MANA, SPE (special ability function), list of active capacities (poisoned, confused, ...)
    ["character_1", "Giro Smileur", MAX_CHARACTERS_HEALTH, 10, MAX_CHARACTERS_MANA, Heal, INNIT_PROTECT_VALUE, []],
    ["character_2", "Turbo Incognito", MAX_CHARACTERS_HEALTH, 10, MAX_CHARACTERS_MANA, Heal, INNIT_PROTECT_VALUE, []], 
    ["character_3", "Ultra Cowboy", MAX_CHARACTERS_HEALTH, 10, MAX_CHARACTERS_MANA, Heal, INNIT_PROTECT_VALUE, []], 
    ["character_4", "Giga Chad", MAX_CHARACTERS_HEALTH, 10, MAX_CHARACTERS_MANA, Heal, INNIT_PROTECT_VALUE, []]
];
// ennemies are defined as the characters are
var lst_ennemies = [
    ["ennemy_1", "Clown", MAX_ENNEMIES_HEALTH, 15], // html ID, NAME, HP (health pts), DMG (damage pts),
    ["ennemy_2", "Ogre", MAX_ENNEMIES_HEALTH, 15], 
    ["ennemy_3", "Goblin", MAX_ENNEMIES_HEALTH, 15]
];
//#endregion

//#region capacities

//#region constants
// Indexes constants
const CAP_ATTACK = 0 // Attack capacity index on the capacities list
const CAP_DEFEND = 1 // Defend capacity
const CAP_HEAL = 2 // Heal capacity
const CAP_BOOST = 3 // Boost capacity
const CAP_POISON = 4 // Poison capacity
const CAP_CONFUSE = 5 // Confuse capacity
//#endregion

var lst_capacities = [
    ["Attack", "capacity_attack", Attack],
    ["Defend", "capacity_defend", Defend],
    ["Heal", "capacity_heal", Heal]
];

//#region 
// ATTACK
function Attack(target, amount){
    target[HP] -= amount;
    if(target[HP] <= 0){
        target[HP] = 0;
    }
}

// DEFEND
function Defend(target){
}

// HEAL: Adds 'amount' hp to the 'target', and returns the action description sentence
function Heal(target, amount){
    target[HP] += amount;
    if(target[HP] > MAX_CHARACTERS_HEALTH){
        target[HP] = MAX_CHARACTERS_HEALTH;
    }
    return `${target[NAME]} a reçu ${amount} PV de soin !\n${target[NAME]} a désormais ${target[HP]} PV.`
}

// CONFUSE: Reduces 'target' damage by 'amount' pts, and returns the action description sentence
function Confuse(target, amount){
    target[DMG] -= amount;
    if(target[DMG] < MIN_ENNEMIES_DAMAGE){
        target[DMG] = MIN_ENNEMIES_DAMAGE;
    }
    return `Dégats de ${target[NAME]} réduits de ${amount} !\n${target[NAME]} inflige désormais ${target[DMG]} pts de dégat.`
}
//#endregion

//#region Visual refreshing functions
// refreshes stats to the desired character
function RefreshStatsArea(character){
    if(character[HP] > 0){
        document.getElementById("stats_container").getElementsByClassName("health_bar")[0].style.marginRight = `${100 - ((character[HP]/MAX_CHARACTERS_HEALTH) * 100)}%`; // changes the filling of the health bar
    }
    else {
        document.getElementById("stats_container").getElementsByClassName("health_bar")[0].style.background = "none";
        document.getElementById("stats_container").getElementsByClassName("health_bar")[0].style.boxShadow = "none";
    }
    document.getElementById("stats_container").getElementsByClassName("health_bar")[0].innerHTML = `${character[HP]}/${MAX_CHARACTERS_HEALTH}` // changes the health bar text
    
    if(character[MANA] > 0){
        document.getElementById("stats_container").getElementsByClassName("mana_bar")[0].style.marginRight = `${100 - ((character[MANA]/MAX_CHARACTERS_MANA) * 100)}%`; // changes the filling of the mana bar
    }
    else {
        document.getElementById("stats_container").getElementsByClassName("mana_bar")[0].style.background = "none";
        document.getElementById("stats_container").getElementsByClassName("mana_bar")[0].style.boxShadow = "none";
    }
    document.getElementById("stats_container").getElementsByClassName("mana_bar")[0].innerHTML = `${character[MANA]}/${MAX_CHARACTERS_MANA}` // changes the mana bar text
}

function RefreshCharacter(character){
    // hide whole character container if dead
    if(character[HP] <= 0){
        document.getElementById(character[ID]).style.visibility = "hidden";
    }
    // else edit health bar value
    else {
        document.getElementById(character[0]).getElementsByClassName("health_bar")[0].style.marginRight = `${100 - ((character[HP]/MAX_CHARACTERS_HEALTH) * 100)}%`;
    }
    
}
//#endregion