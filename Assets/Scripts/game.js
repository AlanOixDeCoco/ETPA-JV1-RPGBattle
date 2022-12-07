// #region VARIABLES
// characters are defined as arrays of values, themselves inside another array of characters
let lst_characters = [
    // use the constants to access the desired index to make it more clear
    [   "character_1",              // 0: html ID,
        "Giro Smileur",             // 1: NAME,
        MAX_CHARACTERS_HEALTH,      // 2: HP (health pts),
        MAX_CHARACTERS_DAMAGE / 2,  // 3: DMG (damage pts),
        [],                         // 4: list of active EFFECTS (poisoned, confused, ...), 
        MAX_CHARACTERS_MANA,        // 5: MANA,
        ACTION_HEAL,                // 6: SPE (special ability),
        INNIT_PROTECT_VALUE,        // 7: PROTECTED bool,
        null                        // 8: LAST ACTION performed
    ],
    [   "character_2",              // 0: html ID,
        "Turbo Incognito",          // 1: NAME,
        MAX_CHARACTERS_HEALTH,      // 2: HP (health pts),
        MAX_CHARACTERS_DAMAGE / 2,  // 3: DMG (damage pts),
        [],                         // 4: list of active EFFECTS (poisoned, confused, ...), 
        MAX_CHARACTERS_MANA,        // 5: MANA,
        ACTION_HEAL,                // 6: SPE (special ability),
        INNIT_PROTECT_VALUE,        // 7: PROTECTED bool,
        null                        // 8: LAST ACTION performed
    ], 
    [   "character_3",              // 0: html ID,
        "Ultra Cowboy",             // 1: NAME,
        MAX_CHARACTERS_HEALTH,      // 2: HP (health pts),
        MAX_CHARACTERS_DAMAGE / 2,  // 3: DMG (damage pts),
        [],                         // 4: list of active EFFECTS (poisoned, confused, ...), 
        MAX_CHARACTERS_MANA,        // 5: MANA,
        ACTION_HEAL,                // 6: SPE (special ability),
        INNIT_PROTECT_VALUE,        // 7: PROTECTED bool,
        null                        // 8: LAST ACTION performed
    ], 
    [   "character_4",              // 0: html ID,
        "Giga Chad",                // 1: NAME,
        MAX_CHARACTERS_HEALTH,      // 2: HP (health pts),
        MAX_CHARACTERS_DAMAGE / 2,  // 3: DMG (damage pts),
        [],                         // 4: list of active EFFECTS (poisoned, confused, ...), 
        MAX_CHARACTERS_MANA,        // 5: MANA,
        ACTION_HEAL,                // 6: SPE (special ability),
        INNIT_PROTECT_VALUE,        // 7: PROTECTED bool,
        null                        // 8: LAST ACTION performed
    ]
];
// ennemies are defined as the characters are, without some character specific data
let lst_ennemies = [
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
// #endregion

// #region FUNCTIONS

// #endregion

// #region INITIALIZATION
// add mouseover events to display the stats when cursor is over the characters ...
lst_ennemies.forEach(ennemy => {
    let ennemyElement = document.getElementById(ennemy[0]);
    ennemyElement.getElementsByClassName("ennemy_img")[0].addEventListener("mousemove", function(event) {
        ShowHealthTooltip(ennemy, event.clientX, event.clientY);
    })
    ennemyElement.getElementsByClassName("ennemy_img")[0].addEventListener("mouseout", function(event) {
        HideHealthTooltip();
    })
});
// ... same for the ennemies
lst_characters.forEach(character => {
    let characterElement = document.getElementById(character[0])
    characterElement.getElementsByClassName("character_img")[0].addEventListener("mousemove", function(event) {
        ShowHealthTooltip(character, event.clientX, event.clientY);
    })
    characterElement.getElementsByClassName("character_img")[0].addEventListener("mouseout", function(event) {
        HideHealthTooltip();
    })
});
// #endregion

// #region INTRODUCTION

// Tutorial
ShowMessage("Bienvenue dans le monde merveilleux des émojis !", 4);
// #endregion