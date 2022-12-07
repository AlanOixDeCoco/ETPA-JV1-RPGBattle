// #region CONSTANTS
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
// #endregion

// #region FUNCTIONS
// Kill character / ennemy when called
function KillCharacter(character){
    // replace character image with character dead one and change the mouse cursor when hovering
    characterImage = document.getElementById(character[ID]).getElementsByTagName("img")[1];
    characterImage.src = "Assets/Characters/character_dead.png";
    characterImage.style.opacity = 0.5;
    characterImage.style.pointerEvents = "none";
    ShowMessage(`${character[NAME]} nous a quitté...<br>Il te reste ${lst_characters.length - 1} personnage(s) en vie !`);
    lst_characters.splice(lst_characters.indexOf(character), 1); // remove specified character from list
}
function KillEnnemy(ennemy){
    // replace ennemy image with ennemy dead one and change the mouse cursor when hovering
    ennemyImage = document.getElementById(ennemy[ID]).getElementsByTagName("img")[1];
    ennemyImage.src = "Assets/Ennemies/ennemy_dead.png";
    ennemyImage.style.cursor = "not-allowed";
    ShowMessage(`${ennemy[NAME]} est mort !<br>Il reste ${lst_ennemies.length - 1} ennemi(s) en vie !`);
    lst_ennemies.splice(lst_ennemies.indexOf(ennemy), 1); // remove specified character from list
}
// #endregion