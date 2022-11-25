//#region constants
// Indexes constants
const ID = 0; // characters/ennemies ID index in arrays
const NAME = 1; // characters/ennemies NAME index in arrays
const HP = 2; // characters/ennemies HP index in arrays
const DMG = 3; // characters/ennemies DMG (pts) index in arrays
const MANA = 4; // characters MANA index in arrays
const SPE = 5; // characters SPECIAL ABILITY index in arrays

// Values constants : characters
const MAX_CHARACTERS_HEALTH = 100; // max characters HP
const MAX_CHARACTERS_MANA = 100; // max characters MANA
const MAX_CHARACTERS_DAMAGE = 20; // maximum damage to deal to the ennemies

// Values constants : ennemies
const MAX_ENNEMIES_HEALTH = 150; // max ennemies HP
const MIN_ENNEMIES_DAMAGE = 10; // minimum damage to deal to the characters
//#endregion

//#region characters & ennemies arrays
// characters are defined as arrays of values, themselves inside another array
var characters = [
    ["character_1", "Giro Smileur", 80, 10, MAX_CHARACTERS_MANA, heal], // html ID, NAME, HP (health pts), DMG (damage pts), MANA, SPE (special ability function)
    ["character_2", "Turbo Incognito", MAX_CHARACTERS_HEALTH, 10, MAX_CHARACTERS_MANA, heal], 
    ["character_3", "Ultra Cowboy", MAX_CHARACTERS_HEALTH, 10, MAX_CHARACTERS_MANA, heal], 
    ["character_4", "Giga Chad", MAX_CHARACTERS_HEALTH, 10, MAX_CHARACTERS_MANA, heal]
];
// ennemies are defined as the characters are
var ennemies = [
    ["ennemy_1", "Clown", MAX_ENNEMIES_HEALTH, 15], // html ID, NAME, HP (health pts), DMG (damage pts),
    ["ennemy_2", "Ogre", MAX_ENNEMIES_HEALTH, 15], 
    ["ennemy_3", "Goblin", MAX_ENNEMIES_HEALTH, 15]
];
//#endregion

//#region characters special abilities
// HEAL: Adds 'amount' hp to the 'target', and returns the action description sentence
function heal(target, amount){
    target[HP] += amount;
    if(target[HP] > MAX_CHARACTERS_HEALTH){
        target[HP] = MAX_CHARACTERS_HEALTH;
    }
    return `${target[NAME]} a reçu ${amount} PV de soin !\n${target[NAME]} a désormais ${target[HP]} PV.`
}

// REDUCE DAMAGE: Removes 'amount' to the 'target' damage pts, and returns the action description sentence
function reduceDamage(target, amount){
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