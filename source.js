// ######### RPG Battle - Nov/Dec 2022 #########
// 
// ########### Made by AlanOixDeCoco ###########
// 
// /!\ You are totaly free to use my code as an inspiration, please consider
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

// Window / System access variables
var _clientWidth = document.documentElement.clientWidth;

// #region Game constants

// #region Characters & ennemies

// Indexes constants
const ID = 0 // characters/ennemies ID index in arrays
const NAME = 1 // characters/ennemies NAME index in arrays
const HP = 2 // characters/ennemies HP index in arrays
const DMG = 3 // characters/ennemies DMG (pts) index in arrays
const MANA = 4 // characters MANA index in arrays
const SPE = 5 // characters SPECIAL ABILITY index in arrays
const PROTECTED = 6 // characters PROTECTED bool index in arrays
const LAST_ACTION = 7 // characters LAST ACTION index in arrays
const EFFECTS = 8 // characters active EFFECTS index in arrays

// Values constants : characters
const MAX_CHARACTERS_HEALTH = 100 // max characters HP
const MAX_CHARACTERS_MANA = 100 // max characters MANA
const MAX_CHARACTERS_DAMAGE = 20 // maximum damage to deal to the ennemies

// Values constants : ennemies
const MAX_ENNEMIES_HEALTH = 200 // max ennemies HP
const MIN_ENNEMIES_DAMAGE = 10 // minimum damage to deal to the characters

const INNIT_PROTECT_VALUE = false // by default the player can receive full damage

// Actions indexes constants
const ACTION_ATTACK = 0 // Attack capacity index on the capacities list
const ACTION_DEFEND = 1 // Defend capacity
const ACTION_HEAL = 2 // Heal capacity
const ACTION_BOOST = 3 // Boost capacity
const ACTION_POISON = 4 // Poison capacity
const ACTION_CONFUSE = 5 // Confuse capacity

// actions are defined as arrays of values, the last one being the function
var lst_actions = [
    // action 
    [   "Attack", 
        "capacity_attack", 
        Attack
    ],
    [   "Defend", 
        "capacity_defend", 
        Defend
    ],
    [   "Heal", 
        "capacity_heal", 
        Heal
    ]
];

// characters are defined as arrays of values, themselves inside another array
var lst_characters = [
    // html ID, NAME, HP (health pts), DMG (damage pts), MANA, SPE (special ability), PROTECTED bool, LAST ACTION performed, list of active EFFECTS (poisoned, confused, ...)
    [   "character_1", 
        "Giro Smileur", 
        MAX_CHARACTERS_HEALTH, 
        10, 
        MAX_CHARACTERS_MANA, 
        lst_actions[ACTION_HEAL], 
        INNIT_PROTECT_VALUE, 
        null, 
        []
    ],
    [   "character_2", 
        "Turbo Incognito", 
        MAX_CHARACTERS_HEALTH, 
        10, 
        MAX_CHARACTERS_MANA, 
        lst_actions[ACTION_HEAL], 
        INNIT_PROTECT_VALUE, 
        null, 
        []
    ], 
    [   "character_3", 
        "Ultra Cowboy", 
        MAX_CHARACTERS_HEALTH, 
        10, 
        MAX_CHARACTERS_MANA, 
        lst_actions[ACTION_HEAL], 
        INNIT_PROTECT_VALUE, 
        null, 
        []
    ], 
    [   "character_4", 
        "Giga Chad", 
        MAX_CHARACTERS_HEALTH, 
        10, 
        MAX_CHARACTERS_MANA, 
        lst_actions[ACTION_HEAL], 
        INNIT_PROTECT_VALUE, 
        null, 
        []
    ]
];
// ennemies are defined as the characters are
var lst_ennemies = [
    // html ID, NAME, HP (health pts), DMG (damage pts),
    [   "ennemy_1", 
        "Clown", 
        MAX_ENNEMIES_HEALTH, 
        15
    ], 
    [   "ennemy_2", 
        "Ogre", 
        MAX_ENNEMIES_HEALTH, 
        15
    ], 
    [   "ennemy_3", 
        "Goblin", 
        MAX_ENNEMIES_HEALTH, 
        15
    ]
];
//#endregion

// #region Actions

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
    return `${target[NAME]} a reçu ${amount} PV de soin !<br>${target[NAME]} a désormais ${target[HP]} PV.`
}

// CONFUSE: Reduces 'target' damage by 'amount' pts, and returns the action description sentence
function Confuse(target, amount){
    target[DMG] -= amount;
    if(target[DMG] < MIN_ENNEMIES_DAMAGE){
        target[DMG] = MIN_ENNEMIES_DAMAGE;
    }
    return `Dégats de ${target[NAME]} réduits de ${amount} !<br>${target[NAME]} inflige désormais ${target[DMG]} pts de dégat.`
}
//#endregion

// #region Update elements grahics / values
// refreshes stats to the desired character
function UpdateStatsArea(character){
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

// Kill character / ennemy when called
function KillCharacter(character){
    // replace character image with character dead one and change the mouse cursor when hovering
    characterImage = document.getElementById(character[ID]).getElementsByTagName("img")[1];
    characterImage.src = "Assets/Characters/character_dead.png";
    characterImage.style.cursor = "not-allowed";
    lst_characters.splice(lst_characters.indexOf(character), 1); // remove specified character from list
    ShowMessage(`${character[NAME]} nous a quitté...<br>Il te reste ${lst_characters.length} personnages en vie !`);
}
function KillEnnemy(ennemy){
    // replace ennemy image with ennemy dead one and change the mouse cursor when hovering
    ennemyImage = document.getElementById(ennemy[ID]).getElementsByTagName("img")[1];
    ennemyImage.src = "Assets/Ennemies/ennemy_dead.png";
    ennemyImage.style.cursor = "not-allowed";
    lst_ennemies.splice(lst_ennemies.indexOf(ennemy), 1); // remove specified character from list
    ShowMessage(`${ennemy[NAME]} est mort !<br>Il reste ${lst_ennemies.length} ennemis en vie !`);
}
// #endregion

// #region Dialog popup
// display a message in the dialog area for 'duration' seconds (5s by default)
function ShowMessage(message, duration = 5){
    ShowDialogArea(message);
    setTimeout(HideDialogArea, duration * 1000);
}
// Show & Hide dialog popup and fill with 'text'
function ShowDialogArea(text){
    dialogAreaElement = document.getElementById("dialog_area");
    dialogAreaElement.innerHTML = text;
    dialogAreaElement.style.top = `-${dialogAreaElement.offsetHeight}px`; // use the message box dimensions to properly show it
    dialogAreaElement.style.visibility = "visible";
    dialogAreaElement.style.top = "2vh";
}
function HideDialogArea(){
    dialogAreaElement = document.getElementById("dialog_area");
    dialogAreaElement.style.top = `-${dialogAreaElement.offsetHeight}px`; // use the message box dimensions to properly hide it
    dialogAreaElement.style.visibility = "hidden";
}
// #endregion

// #region Health tooltip
// Show & Hide health popup and replace text accordingly
function ShowHealthTooltip(target, x, y){
    statsPopupElement = document.getElementById("stats_popup");
    if(x < (_clientWidth - 120)) {
        statsPopupElement.style.removeProperty("right");
        statsPopupElement.style.left = `${x + 16}px`;
    }
    else {
        statsPopupElement.style.removeProperty("left");
        statsPopupElement.style.right = `${_clientWidth - (x - 16)}px`;
    }
    statsPopupElement.style.top = `${y + 16}px`;
    statsPopupElement.style.visibility = "visible";
    statsPopupElement.innerHTML = `<b>${target[1]}</b><br>${target[2]} HP`;
    
}
function HideHealthTooltip(){
    statsPopupElement = document.getElementById("stats_popup");
    statsPopupElement.style.visibility = "hidden";
}
// #endregion

// #region GAME
// #region Initialization
// add mouseover events to display the stats when hovering an ennemy
lst_ennemies.forEach(ennemy => {
    var ennemyElement = document.getElementById(ennemy[0]);
    ennemyElement.getElementsByClassName("ennemy_img")[0].addEventListener("mousemove", function(event) {
        ShowHealthTooltip(ennemy, event.clientX, event.clientY);
    })
    ennemyElement.getElementsByClassName("ennemy_img")[0].addEventListener("mouseout", function(event) {
        HideHealthTooltip();
    })
});
lst_characters.forEach(character => {
    var characterElement = document.getElementById(character[0])
    characterElement.getElementsByClassName("character_img")[0].addEventListener("mousemove", function(event) {
        ShowHealthTooltip(character, event.clientX, event.clientY);
    })
    characterElement.getElementsByClassName("character_img")[0].addEventListener("mouseout", function(event) {
        HideHealthTooltip();
    })
});
// #endregion

//tests
KillEnnemy(lst_ennemies[2]);

// #endregion