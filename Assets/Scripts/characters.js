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
const MAX_CHARACTERS_DAMAGE = 30 // maximum damage to deal to the ennemies
const INNIT_CHARACTERS_DAMAGE = 10 // maximum damage to deal to the ennemies
const INNIT_PROTECT_VALUE = false // by default the player can receive full damage

// Values constants : ennemies
const MAX_ENNEMIES_HEALTH = 150 // max ennemies HP
const MIN_ENNEMIES_DAMAGE = 10 // minimum damage to deal to the characters
const INNIT_ENNEMIES_DAMAGE = 20 // minimum damage to deal to the characters
// #endregion

// #region VARIABLES
// characters are defined as arrays of values, themselves inside another array of characters
let lst_characters = [
    // use the constants to access the desired index to make it more clear
    [   "character_1",              // 0: html ID,
        "Giro Smileur",             // 1: NAME,
        MAX_CHARACTERS_HEALTH,      // 2: HP (health pts),
        INNIT_CHARACTERS_DAMAGE,    // 3: DMG (damage pts),
        [],                         // 4: list of active EFFECTS (poisoned, confused, ...), 
        MAX_CHARACTERS_MANA,        // 5: MANA,
        ACTION_HEAL,                // 6: SPE (special ability),
        INNIT_PROTECT_VALUE,        // 7: PROTECTED bool,
        null                        // 8: LAST ACTION performed
    ],
    [   "character_2",              // 0: html ID,
        "Turbo Incognito",          // 1: NAME,
        MAX_CHARACTERS_HEALTH,      // 2: HP (health pts),
        INNIT_CHARACTERS_DAMAGE,    // 3: DMG (damage pts),
        [],                         // 4: list of active EFFECTS (poisoned, confused, ...), 
        MAX_CHARACTERS_MANA,        // 5: MANA,
        ACTION_POISON,                // 6: SPE (special ability),
        INNIT_PROTECT_VALUE,        // 7: PROTECTED bool,
        null                        // 8: LAST ACTION performed
    ], 
    [   "character_3",              // 0: html ID,
        "Ultra Cowboy",             // 1: NAME,
        MAX_CHARACTERS_HEALTH,      // 2: HP (health pts),
        INNIT_CHARACTERS_DAMAGE,    // 3: DMG (damage pts),
        [],                         // 4: list of active EFFECTS (poisoned, confused, ...), 
        MAX_CHARACTERS_MANA,        // 5: MANA,
        ACTION_BOOST,                // 6: SPE (special ability),
        INNIT_PROTECT_VALUE,        // 7: PROTECTED bool,
        null                        // 8: LAST ACTION performed
    ], 
    [   "character_4",              // 0: html ID,
        "Giga Chad",                // 1: NAME,
        MAX_CHARACTERS_HEALTH,      // 2: HP (health pts),
        INNIT_CHARACTERS_DAMAGE,    // 3: DMG (damage pts),
        [],                         // 4: list of active EFFECTS (poisoned, confused, ...), 
        MAX_CHARACTERS_MANA,        // 5: MANA,
        ACTION_CONFUSE,                // 6: SPE (special ability),
        INNIT_PROTECT_VALUE,        // 7: PROTECTED bool,
        null                        // 8: LAST ACTION performed
    ]
];
// ennemies are defined as the characters are, without some character specific data
let lst_ennemies = [
    [   "ennemy_1",                 // 0: html ID,
        "Clown",                    // 1: NAME,
        MAX_ENNEMIES_HEALTH,        // 2: HP (health pts),
        INNIT_ENNEMIES_DAMAGE,      // 3: DMG (damage pts),
        []                          // 4: list of active EFFECTS (poisoned, confused, ...)
    ], 
    [   "ennemy_2",                 // 0: html ID,
        "Ogre",                     // 1: NAME,
        MAX_ENNEMIES_HEALTH,        // 2: HP (health pts),
        INNIT_ENNEMIES_DAMAGE,      // 3: DMG (damage pts),
        []                          // 4: list of active EFFECTS (poisoned, confused, ...)
    ], 
    [   "ennemy_3",                 // 0: html ID,
        "Goblin",                   // 1: NAME,
        MAX_ENNEMIES_HEALTH,        // 2: HP (health pts),
        INNIT_ENNEMIES_DAMAGE,      // 3: DMG (damage pts),
        []                          // 4: list of active EFFECTS (poisoned, confused, ...)
    ]
];

let character_selectedCharacter = null;
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
    ennemyImage = document.getElementById(ennemy[ID]).getElementsByTagName("img")[0];
    ennemyImage.src = "Assets/Ennemies/ennemy_dead.png";
    ennemyImage.style.cursor = "not-allowed";
    ShowMessage(`${ennemy[NAME]} est mort !<br>Il reste ${lst_ennemies.length - 1} ennemi(s) en vie !`);
    if(ennemy[EFFECTS].length > 0){
        ennemy[EFFECTS].forEach(effect => {
            RemoveEffect(ennemy, ennemy[EFFECTS].indexOf(effect));
        });
    }
    lst_ennemies.splice(lst_ennemies.indexOf(ennemy), 1); // remove specified character from list
}

function SelectContext(context){
    // unselect the current character
    if(character_selectedCharacter) UnselectContext();
    // select the new character
    character_selectedCharacter = context;

    cursorElement = document.getElementById(context[ID]).getElementsByClassName("cursor")[0];
    cursorElement.style.opacity = 1;
    // do this only if we are selecting a character, not an ennemy
    if(lst_characters.includes(context)) {
        UpdateCommandsArea(context);
    }
}

function UnselectContext(){
    cursorElement = document.getElementById(character_selectedCharacter[ID]).getElementsByClassName("cursor")[0];
    cursorElement.style.opacity = 0;
    character_selectedCharacter = null;
}
// #endregion