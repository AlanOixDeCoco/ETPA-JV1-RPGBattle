const ACTION_MANA_CONSUMPTION = 40 // MANA consumed at each special action performed
const ACTION_MANA_INCREMENT = 10 // MANA consumed at each special action performed

// Actions data indexes constants
const ACTION_NAME = 0       // action NAME value index in the action array
const ACTION_SPRITE = 1     // action SPRITE, "sprite".png / "sprite"_32px.png
const ACTION_FUNCTION = 2   // action FUNCTION

const ACTION_ATTACK = [    // Attack action
    "Attaquer",            // 0: action NAME
    "action_attack",       // 1: action SPRITE
    Attack                 // 2: action FUNCTION
];
const ACTION_DEFEND = [     // Defend action
    "Défendre",              // 0: action NAME
    "action_defend",        // 1: action SPRITE
    Defend                  // 2: action FUNCTION
];
const ACTION_HEAL = [       // Heal action
    "Giro Smile",           // 0: action NAME
    "action_heal",          // 1: action SPRITE
    Heal                    // 2: action FUNCTION
];
const ACTION_POISON = [     // Poison action
    "Empoisonner",          // 0: action NAME
    "action_poison",        // 1: action SPRITE
    Poison                  // 2: action FUNCTION
];
const ACTION_BOOST = [  // Boost action
    "Ultra Boost",      // 0: action NAME
    "action_boost",     // 1: action SPRITE
    Boost               // 2: action FUNCTION
];
const ACTION_CONFUSE = [    // Confuse action
    "Giga Style",            // 0: action NAME
    "action_confuse",       // 1: action SPRITE
    Confuse                 // 2: action FUNCTION
];

// ATTACK : Attacks 'target' for 'damage' pts, sets 'context' = attacker last action and display the action description sentence
function Attack(context, target){
    let damage = context[DMG];
    // if the protected property exists
    if(target.length >= (PROTECTED-1)){
        if(target[PROTECTED]) { // if the target is protected
            RemoveShield(target); // just remove protection
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
    AddShield(target);
    ShowMessage(`${context[NAME]} a protégé ${target[NAME]} de sa prochaine attaque !<br>C'est très urbain de sa part.`);
    context[LAST_ACTION] = ACTION_DEFEND;
}

// HEAL: Adds 'amount' hp to the 'target', sets 'context' last action and display the action description sentence
function Heal(context, target){
    amount = RandomInt(10, context[DMG]); // heal power depends on player attack (can be boosted)
    character_selectedCharacter[MANA] -= ACTION_MANA_CONSUMPTION;
    // if the healing exeeds character's max HP
    if((target[HP] + amount) > MAX_CHARACTERS_HEALTH){
        amount = MAX_CHARACTERS_HEALTH - target[HP];
    }
    target[HP] += amount;
    ShowMessage(`${target[NAME]} a reçu ${amount} PV de soin de ${context[NAME]} !<br>${target[NAME]} a désormais ${target[HP]} PV.`);
    context[LAST_ACTION] = ACTION_HEAL;
}

// POISON: Poisons 'target' for 'duration' rounds, damaging it by 'damage' hp each round, sets 'context' last action and display the action description sentence
function Poison(context, target){
    duration = RandomInt(2, 5)
    damage = RandomInt(5, context[DMG]); // poison effect power depends on player attack (can be boosted)
    character_selectedCharacter[MANA] -= ACTION_MANA_CONSUMPTION;
    // adds the poisonning function to the effects 
    AddEffect(Poisoned, target, ACTION_POISON[ACTION_SPRITE], damage, duration);
    ShowMessage(`${context[NAME]} a empoisonné ${target[NAME]} !<br>${target[NAME]} subira ${damage} pts de dégats pendant ${duration} rounds.`);
    context[LAST_ACTION] = ACTION_POISON;
}

// BOOST: Increase 'target' damage by 'amount', sets 'context' last action and display the action description sentence
function Boost(context, target){
    amount = RandomInt(5, parseInt(context[DMG]/2)); // boost power depends on player attack (can be boosted)
    character_selectedCharacter[MANA] -= ACTION_MANA_CONSUMPTION;
    // if the boost exeeds character's max damage
    if((target[DMG] + amount) > MAX_CHARACTERS_DAMAGE){
        amount = MAX_CHARACTERS_DAMAGE - target[DMG];
    }
    target[DMG] += amount;
    ShowMessage(`${target[NAME]} a reçu un boost de ${context[NAME]} !<br>${target[NAME]} inflige désormais ${target[DMG]} pts de dégat.`);
    context[LAST_ACTION] = ACTION_BOOST;
}

// CONFUSE: Reduces 'target' damage by 'amount' pts, and returns the action description sentence
function Confuse(context, target){
    amount = RandomInt(5, parseInt(context[DMG]/2)); // confuse power depends on player attack (can be boosted)
    character_selectedCharacter[MANA] -= ACTION_MANA_CONSUMPTION;
    if((target[DMG] - amount) < MIN_ENNEMIES_DAMAGE){
        amount = target[DMG] - MIN_ENNEMIES_DAMAGE;
    }
    target[DMG] -= amount;
    ShowMessage(`Dégats de ${target[NAME]} réduits de ${amount} par ${context[NAME]} !<br>${target[NAME]} inflige désormais ${target[DMG]} pts de dégat.`);
    context[LAST_ACTION] = ACTION_CONFUSE;
}

// #region Effects
function AddEffect(effect, target, icon, amount, duration){
    // pushes the effect to the target[effects] array
    target[EFFECTS].push([effect, amount, duration]);

    // then add the coresponding icon to the target
    let effectImg = document.createElement("img");
    effectImg.setAttribute("class", "effect_icon");
    effectImg.setAttribute("src", `Assets/Actions/${icon}.png`);
    document.getElementById(target[ID]).getElementsByClassName("effects_container")[0].appendChild(effectImg);
}

function TakeEffect(context, effectIndex){
    context[EFFECTS][effectIndex][0](context, context[EFFECTS][effectIndex][1]); // executes effect function
    context[EFFECTS][effectIndex][2] -= 1; // then remove 1 round to the counter
    if(context[EFFECTS][effectIndex][2] <= 0) RemoveEffect(context, effectIndex); // if needed, remove the effect from list
}

function RemoveEffect(context, index){
    context[EFFECTS].splice(index, 1); // remove specified effect index from list
    let effectImg = document.getElementById(`${context[ID]}-${index}`);
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

// #region Shield effect
function AddShield(context){
    // don't add a shield if already protected
    if(!context[PROTECTED]){
        context[PROTECTED] = true; // set the protected state
        // then add the icon to the character
        let shieldImg = document.createElement("img");
        shieldImg.setAttribute("class", "effect_icon");
        shieldImg.setAttribute("src", `Assets/Actions/action_defend.png`);
        document.getElementById(context[ID]).getElementsByClassName("effects_container")[0].appendChild(shieldImg);
    }
}

function RemoveShield(context){
    context[PROTECTED] = false; // set the protected state
    // then remove the icon from the character
    let shieldImg = document.getElementById(context[ID]).getElementsByClassName("effects_container")[0].children[0];
    shieldImg.remove();
}
// #endregion