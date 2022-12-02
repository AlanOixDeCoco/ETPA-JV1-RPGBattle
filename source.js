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

// #region Core game variables & functions
// Window / System access variables
var _clientWidth = document.documentElement.clientWidth;

// returns a random int between min and max values
function RandomInt(min, max){
    return (Math.floor(Math.random() * (max-min)) + min);
}
// #endregion

// #region Actions, characters & ennemies

// Characters/ennemies data indexes constants
const ID = 0            // characters/ennemies ID index in arrays
const NAME = 1          // characters/ennemies NAME index in arrays
const HP = 2            // characters/ennemies HP index in arrays
const DMG = 3           // characters/ennemies DMG (pts) index in arrays
const EFFECTS = 4       // characters/ennemies active EFFECTS index in arrays
// --> Character only data indexes
const MANA = 5          // characters MANA index in arrays
const SPE = 6           // characters SPECIAL ABILITY index in arrays
const PROTECTED = 7     // characters PROTECTED bool index in arrays
const LAST_ACTION = 8   // characters LAST ACTION index in arrays

// Values constants : characters
const MAX_CHARACTERS_HEALTH = 100 // max characters HP
const MAX_CHARACTERS_MANA = 100 // max characters MANA
const MAX_CHARACTERS_DAMAGE = 20 // maximum damage to deal to the ennemies
const INNIT_PROTECT_VALUE = false // by default the player can receive full damage

// Values constants : ennemies
const MAX_ENNEMIES_HEALTH = 200 // max ennemies HP
const MIN_ENNEMIES_DAMAGE = 10 // minimum damage to deal to the characters

// Actions indexes constants
const ACTION_ATTACK = 0     // Attack action index in the actions list
const ACTION_DEFEND = 1     // Defend action
const ACTION_HEAL = 2       // Heal action
const ACTION_POISON = 3      // Boost action
const ACTION_BOOST = 4     // Poison action
const ACTION_CONFUSE = 5    // Confuse action

// Actions data indexes constants
const ACTION_NAME = 0       // action NAME value index in the action array
const ACTION_SPRITE = 1     // action SPRITE, "sprite".png / "sprite"_32px.png
const ACTION_FUNCTION = 2   // action FUNCTION

// actions are defined as arrays of values, the last one being the function
var lst_actions = [
    [   "Attack",           // 0: action NAME
        "action_attack",    // 1: action SPRITE
        Attack              // 2: action FUNCTION
    ],
    [   "Defend",           // 0: action NAME
        "action_defend",    // 1: action SPRITE
        Defend              // 2: action FUNCTION
    ],
    [   "Heal",             // 0: action NAME
        "action_heal",      // 1: action SPRITE
        Heal                // 2: action FUNCTION
    ],
    [   "Poison",           // 0: action NAME
        "action_poison",    // 1: action SPRITE
        Poison              // 2: action FUNCTION
    ],
    [   "Boost",           // 0: action NAME
        "action_boost",    // 1: action SPRITE
        Boost              // 2: action FUNCTION
    ],
    [   "Confuse",           // 0: action NAME
        "action_confuse",    // 1: action SPRITE
        Confuse              // 2: action FUNCTION
    ]
];

// #region Actions

// ATTACK : Attacks 'target' for 'damage' pts, sets 'context' = attacker last action and display the action description sentence
function Attack(context, target, damage){
    // if the protected property exists
    if(target.length >= (PROTECTED-1)){
        if(target[PROTECTED]) { // if the target is protected
            target[PROTECTED] = false; // just remove protection
            ShowMessage(`${context[NAME]} a brisé la protection de ${target[NAME]} !<br>Pas cool...`);
        }
        else {
            if((target[HP] - damage) < 0){
                damage = target[HP];
            }
            target[HP] -= damage;
            ShowMessage(`${context[NAME]} a infligé ${damage} pts de dégat à ${target[NAME]} !<br>Il lui reste ${target[HP]} PV.`);
        }
    }
    else { 
        if((target[HP] - damage) < 0){
            damage = target[HP];
        }
        target[HP] -= damage;
        ShowMessage(`${context[NAME]} a infligé ${damage} pts de dégat à ${target[NAME]} !<br>Il lui reste ${target[HP]} PV.`);
    }
    context[LAST_ACTION] = ACTION_ATTACK;
}

// DEFEND: Protect the target for one attack, sets 'context' last action and display the action description sentence
function Defend(context, target){
    target[PROTECTED] = true;
    ShowMessage(`${context[NAME]} a protégé ${target[NAME]} de sa prochaine attaque !<br>C'est très urbain de sa part.`);
    context[LAST_ACTION] = ACTION_DEFEND;
}

// HEAL: Adds 'amount' hp to the 'target', sets 'context' last action and display the action description sentence
function Heal(context, target, amount){
    // if the healing exeeds character's max HP
    if((target[HP] + amount) > MAX_CHARACTERS_HEALTH){
        amount = MAX_CHARACTERS_HEALTH - target[HP];
    }
    target[HP] += amount;
    ShowMessage(`${target[NAME]} a reçu ${amount} PV de soin de ${context[NAME]} !<br>${target[NAME]} a désormais ${target[HP]} PV.`);
    context[LAST_ACTION] = ACTION_HEAL;
}

// POISON: Poisons 'target' for 'duration' rounds, damaging it by 'damage' hp each round, sets 'context' last action and display the action description sentence
function Poison(context, target, duration, damage){
    // adds the poisonning function to the effects 
    AddEffect(Poisoned, target, lst_actions[ACTION_POISON][ACTION_SPRITE], damage, duration);
    ShowMessage(`${context[NAME]} a empoisonné ${target[NAME]} !<br>${target[NAME]} subira ${damage} pts de dégats pendant ${duration} rounds.`);
    context[LAST_ACTION] = ACTION_POISON;
}

// BOOST: Increase 'target' damage by 'amount', sets 'context' last action and display the action description sentence
function Boost(context, target, amount){
    // if the boost exeeds character's max damage
    if((target[DMG] + amount) > MAX_CHARACTERS_DAMAGE){
        amount = MAX_CHARACTERS_DAMAGE - target[DMG];
    }
    target[DMG] += amount;
    ShowMessage(`${target[NAME]} a reçu un boost de ${context[NAME]} !<br>${target[NAME]} inflige désormais ${target[DMG]} pts de dégat.`);
    context[LAST_ACTION] = ACTION_BOOST;
}

// CONFUSE: Reduces 'target' damage by 'amount' pts, and returns the action description sentence
function Confuse(context, target, amount){
    if((target[DMG] - amount) < MIN_ENNEMIES_DAMAGE){
        amount = target[DMG] - MIN_ENNEMIES_DAMAGE;
    }
    target[DMG] -= amount;
    ShowMessage(`Dégats de ${target[NAME]} réduits de ${amount} par ${context[NAME]} !<br>${target[NAME]} inflige désormais ${target[DMG]} pts de dégat.`);
}
//#endregion

// #region Effects

function AddEffect(effect, target, icon, amount, duration){
    // pushes the effect to the target[effects] array
    target[EFFECTS].push([effect, amount, duration]);

    // then add the coresponding icon to the target
    var effectImg = document.createElement("img");
    effectImg.setAttribute("class", "effect_icon");
    effectImg.setAttribute("src", `Assets/Actions/${icon}.png`);
    document.getElementById(target[ID]).getElementsByClassName("effects_container")[0].appendChild(effectImg);
}

function TakeEffect(context, effectIndex){
    context[EFFECTS][effectIndex][0](context, context[EFFECTS][effectIndex][1]); // executes effect function
    context[EFFECTS][effectIndex][2] -= 1; // then remove 1 round to the counter
    if(context[EFFECTS][effectIndex][2] <= 0) RemoveEffect(context, effectIndex);
}

function RemoveEffect(context, index){
    context[EFFECTS].splice(index, 1); // remove specified effect index from list
    var effectImg = document.getElementById(`${context[ID]}-${index}`);
    document.getElementById(context[ID]).getElementsByClassName("effects_container")[0].children.item(index).remove();
}

// POISONED: Take 'damage' pts each round
function Poisoned(context, damage){
    if((context[HP] - damage) < 0){
        damage = context[HP];
    }
    context[HP] -= damage;
    ShowMessage(`${context[NAME]} a subit ${damage} pts de dégat d'empoisonnement !<br>Il lui reste ${context[HP]} PV.`);
}
// #endregion

// characters are defined as arrays of values, themselves inside another array
var lst_characters = [
    // use the constants to access the desired index to make it more clear
    [   "character_1",              // 0: html ID,
        "Giro Smileur",             // 1: NAME,
        MAX_CHARACTERS_HEALTH,      // 2: HP (health pts),
        MAX_CHARACTERS_DAMAGE / 2,  // 3: DMG (damage pts),
        [],                         // 4: list of active EFFECTS (poisoned, confused, ...), 
        MAX_CHARACTERS_MANA,        // 5: MANA,
        lst_actions[ACTION_HEAL],   // 6: SPE (special ability),
        INNIT_PROTECT_VALUE,        // 7: PROTECTED bool,
        null                        // 8: LAST ACTION performed
    ],
    [   "character_2",              // 0: html ID,
        "Turbo Incognito",          // 1: NAME,
        MAX_CHARACTERS_HEALTH,      // 2: HP (health pts),
        MAX_CHARACTERS_DAMAGE / 2,  // 3: DMG (damage pts),
        [],                         // 4: list of active EFFECTS (poisoned, confused, ...), 
        MAX_CHARACTERS_MANA,        // 5: MANA,
        lst_actions[ACTION_HEAL],   // 6: SPE (special ability),
        INNIT_PROTECT_VALUE,        // 7: PROTECTED bool,
        null                        // 8: LAST ACTION performed
    ], 
    [   "character_3",              // 0: html ID,
        "Ultra Cowboy",             // 1: NAME,
        MAX_CHARACTERS_HEALTH,      // 2: HP (health pts),
        MAX_CHARACTERS_DAMAGE / 2,  // 3: DMG (damage pts),
        [],                         // 4: list of active EFFECTS (poisoned, confused, ...), 
        MAX_CHARACTERS_MANA,        // 5: MANA,
        lst_actions[ACTION_HEAL],   // 6: SPE (special ability),
        INNIT_PROTECT_VALUE,        // 7: PROTECTED bool,
        null                        // 8: LAST ACTION performed
    ], 
    [   "character_4",              // 0: html ID,
        "Giga Chad",                // 1: NAME,
        MAX_CHARACTERS_HEALTH,      // 2: HP (health pts),
        MAX_CHARACTERS_DAMAGE / 2,  // 3: DMG (damage pts),
        [],                         // 4: list of active EFFECTS (poisoned, confused, ...), 
        MAX_CHARACTERS_MANA,        // 5: MANA,
        lst_actions[ACTION_HEAL],   // 6: SPE (special ability),
        INNIT_PROTECT_VALUE,        // 7: PROTECTED bool,
        null                        // 8: LAST ACTION performed
    ]
];
// ennemies are defined as the characters are
var lst_ennemies = [
    [   "ennemy_1",                 // 0: html ID,
        "Clown",                    // 1: NAME,
        MAX_ENNEMIES_HEALTH,        // 2: HP (health pts),
        MIN_ENNEMIES_DAMAGE * 2,    // 3: DMG (damage pts),
        []                          // 4: list of active EFFECTS (poisoned, confused, ...)
    ], 
    [   "ennemy_2",                 // 0: html ID,
        "Ogre",                     // 1: NAME,
        MAX_ENNEMIES_HEALTH,        // 2: HP (health pts),
        MIN_ENNEMIES_DAMAGE * 2,    // 3: DMG (damage pts),
        []                          // 4: list of active EFFECTS (poisoned, confused, ...)
    ], 
    [   "ennemy_3",                 // 0: html ID,
        "Goblin",                   // 1: NAME,
        MAX_ENNEMIES_HEALTH,        // 2: HP (health pts),
        MIN_ENNEMIES_DAMAGE * 2,    // 3: DMG (damage pts),
        []                          // 4: list of active EFFECTS (poisoned, confused, ...)
    ]
];

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
    characterImage.style.opacity = 0.5;
    characterImage.style.pointerEvents = "none";
    ShowMessage(`${character[NAME]} nous a quitté...<br>Il te reste ${lst_characters.length} personnage(s) en vie !`);
    lst_characters.splice(lst_characters.indexOf(character), 1); // remove specified character from list
}
function KillEnnemy(ennemy){
    // replace ennemy image with ennemy dead one and change the mouse cursor when hovering
    ennemyImage = document.getElementById(ennemy[ID]).getElementsByTagName("img")[1];
    ennemyImage.src = "Assets/Ennemies/ennemy_dead.png";
    ennemyImage.style.cursor = "not-allowed";
    lst_ennemies.splice(lst_ennemies.indexOf(ennemy), 1); // remove specified character from list
    ShowMessage(`${ennemy[NAME]} est mort !<br>Il reste ${lst_ennemies.length} ennemi(s) en vie !`);
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

// #endregion