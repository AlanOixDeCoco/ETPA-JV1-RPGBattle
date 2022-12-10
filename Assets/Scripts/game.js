// #region VARIABLES
let bool_isAiming = false;
let action_selectedAction = null;
let target_availableTargets = null;
let bool_hasAttacked = false;
// #endregion

// PROGRAM STARTS HERE
// At first we want to disable command inputs
DeactivateCommands();

// Player decides if s.he wants to play the introduction
document.getElementById("skip_tutorial_button").onclick = () => {
    document.getElementById("tutorial_popup").remove();
    Game();
};
document.getElementById("play_tutorial_button").onclick = () => {
    document.getElementById("tutorial_popup").remove();
    Introduction();
};

// Plays the introduction then call the game (assigning the listeners to the desired events)
function Introduction(){
    // Context
    ShowMessage("Bienvenue dans le monde des <b>émojis</b> !", 2);
    ShowMessage("<b>Micrasuft</b> a laissé s'échapper sa horde de vilains et il est de votre devoir de les arrêter !", 3);
    ShowMessage("Exploitez la bravoure et les compétences de votre équipe pour vaincre les créatures de Micrasuft.", 3);
    ShowMessage("Laissez-moi vous les présenter...", 2, () => {SelectContext(lst_characters[0]);});
    ShowMessage("<b>GIRO SMILEUR</b>", 2);
    ShowMessage("Le plus grand smileur que cette terre ai porté, il peut exploiter son <b><i>GIRO SMILE</i></b> pour soigner ses alliés.", 4, () => {SelectContext(lst_characters[1]);});
    ShowMessage("<b>TURBO INCOGNITO</b>", 2);
    ShowMessage("Turbo chelou, il peut <b><i>EMPOISONNER</i></b> ses ennemis à l'aide de sa turbo potion, ce mec est très douteux...", 4, () => {SelectContext(lst_characters[2]);});
    ShowMessage("<b>ULTRA COWBOY</b>", 2);
    ShowMessage("Heureux de vivre, reposé, probablement pas un joueur LoL, en plus d'être l'ami des bêtes il a le pouvoir de <b><i>GIGA BOOSTER</i></b> ses alliés.", 6, () => {SelectContext(lst_characters[3]);});
    ShowMessage("<b>GIGA CHAD</b>", 2);
    ShowMessage("Le boug est chadesque, une légende urbaine, son <b><i>GIGA STYLE</i></b> peut à lui seul déboussoler ses ennemis et les rendre giga naze.", 6, () => {UnselectContext();});

    // Tuto
    ShowMessage("Place aux <b>règles</b> !", 3);
    ShowMessage("A chaque tour, vous jouerez vos membres de l'équipe en vie à tour de rôle", 3);
    ShowMessage("Pour chaque personnage, vous choisirez une action à effectuer", 2);
    ShowMessage("Vous pourrez <b>ATTAQUER</b> un ennemi, <b>DEFENDRE</b> un allié ou vous-même, ou utiliser une capacité <b>SPECIALE</b>", 4);
    ShowMessage("Cette capacité spéciale consommera une partie de votre <b>MANA</b>, vous pouvez suivre l'état de votre mana une fois le personnage sélectionné", 5);
    ShowMessage("Une fois la capacité selectionnée, vous pourrez cibler les personnages ou ennemis correspondants", 3);
    ShowMessage("Prettez attention au <b>curseur</b> de votre souris...", 2, () => {SetMouseCursor("game_viewport", "action_attack");});
    ShowMessage("Il indique actuellement que vous pouvez attaquer (ce n'est pas le cas, un peu de patience)",3);
    ShowMessage("Vous pourrez alors sélectionner un ennemi qui perdra donc des points de vie selon les dégats du personnage", 3, () => {SetMouseCursor("game_viewport");});
    ShowMessage("Pour les autres capacités, c'est pareil, le curseur vous montre la voie...", 3);
    ShowMessage("Vous avez l'air prêt...", 3);
    ShowMessage("<b>BATTEZ-VOUS !!!</b>", 3, Game);
    // #endregion
}

function Game(){
    // #region INITIALIZATION
    // add mouseover listeners to display the stats when cursor is over the ennemies ...
    lst_ennemies.forEach(ennemy => {
        let ennemyElement = document.getElementById(ennemy[0]);
        ennemyElement.getElementsByClassName("ennemy_img")[0].addEventListener("mousemove", function(event) {
            ShowHealthTooltip(ennemy, event.clientX, event.clientY);
        })
        ennemyElement.getElementsByClassName("ennemy_img")[0].addEventListener("mouseout", function(event) {
            HideHealthTooltip();
        })
    });
    // ... same for the characters
    lst_characters.forEach(character => {
        let characterElement = document.getElementById(character[0])
        characterElement.getElementsByClassName("character_img")[0].addEventListener("mousemove", function(event) {
            ShowHealthTooltip(character, event.clientX, event.clientY);
        })
        characterElement.getElementsByClassName("character_img")[0].addEventListener("mouseout", function(event) {
            HideHealthTooltip();
        })
    });

    // add onclick listeners to trigger the ennemies buttons...
    lst_ennemies.forEach(ennemy => {
        let ennemyElement = document.getElementById(ennemy[0]);
        ennemyElement.getElementsByClassName("ennemy_img")[0].onclick = () => ClickOnTarget(ennemy);
    });
    // ... same for the characters
    lst_characters.forEach(character => {
        let characterElement = document.getElementById(character[0]);
        characterElement.getElementsByClassName("character_img")[0].onclick = () => ClickOnTarget(character);
    });

    // add onclick events to the action buttons
    attackButtonElement = document.getElementById("attack_button");
    defendButtonElement = document.getElementById("defend_button");
    specialButtonElement = document.getElementById("special_button");

    attackButtonElement.onclick = () => {
        Aim(ACTION_ATTACK, lst_ennemies);
    };
    defendButtonElement.onclick = () => {
        Aim(ACTION_DEFEND, lst_characters);
    };
    specialButtonElement.onclick = () => {
        switch(character_selectedCharacter[SPE]){
            case ACTION_HEAL:
            case ACTION_BOOST:
                Aim(character_selectedCharacter[SPE], lst_characters);
                break;
            case ACTION_POISON:
            case ACTION_CONFUSE:
                Aim(character_selectedCharacter[SPE], lst_ennemies);
                break;
        }
    };

    playAgainButtonElement = document.getElementById("play_again_button");
    playAgainButtonElement.onclick = () => {
        console.log("Play again!");
        location.reload();
    };
    // #endregion
    
    // Player begins
    ShowMessage("<b>C'est à vous !</b>", 2, PlayerTurn);
}

// This initializes the player turn
function PlayerTurn(){
    // Select the first available character
    ShowMessage(`Au tour de ${lst_characters[0][NAME]}`, 2, () => {
        SelectContext(lst_characters[0]);
    });

    // Then re-activate the player commands
    ActivateCommands();
}

function EnnemiesTurn(){
    // First apply active effects
    lst_ennemies.forEach(ennemy => {
        if(ennemy[EFFECTS].length > 0){
            for(effectIndex = 0; effectIndex < ennemy[EFFECTS].length; effectIndex++){
                TakeEffect(ennemy, effectIndex);
            }
        }
    });

    // then for each living ennemy
    lst_ennemies.forEach(ennemy => {
        AttackRandomCharacter(ennemy);
        CheckCharactersHealth();
    });
    ShowMessage("<b>C'est à vous !</b>", 2, PlayerTurn);
}

// context ennemy attacks random living character
function AttackRandomCharacter(context){
    ACTION_ATTACK[ACTION_FUNCTION](context, lst_characters[RandomInt(0, lst_characters.length)]);
}

// Change the cursor accordingly and define a selection set of characters/ennemies
function Aim(action, availableTargets){
    if(!bool_hasAttacked){
        bool_isAiming = true;
        action_selectedAction = action;
        target_availableTargets = availableTargets;
        lst_characters.concat(lst_ennemies).forEach(allTargets => {
            SetMouseCursor(`${allTargets[ID]}`, "action_prohibited");
        });
        target_availableTargets.forEach(availableTarget => {
            SetMouseCursor(`${availableTarget[ID]}`, action[ACTION_SPRITE]);
        });
    }
}

// called when clicking on a character or an ennemy
function ClickOnTarget(target){
    console.log(`Click on ${target[NAME]}`);
    if(bool_isAiming && target_availableTargets.includes(target)){
        PerformAction(target);
    }
}

// perform the action and check if we need to switch character or let the ennmies play
function PerformAction(target){
    // perform selected action using parameters (context & target)
    action_selectedAction[ACTION_FUNCTION](character_selectedCharacter, target);
    character_selectedCharacter[MANA] += ACTION_MANA_INCREMENT; // add mana to the character amount
    if(character_selectedCharacter[MANA] > 100) character_selectedCharacter[MANA] = 100;
    // reset cursor
    lst_characters.concat(lst_ennemies).forEach(allTargets => {
        SetMouseCursor(`${allTargets[ID]}`);
    });
    bool_hasAttacked = true;
    bool_isAiming = false; // reset aiming state
    action_selectedAction = null; // reset selected action
    target_availableTargets = null; // reset available targets

    CheckEnnemiesHealth();

    let selectedCharacterIndex = lst_characters.indexOf(character_selectedCharacter);
    if((selectedCharacterIndex + 1) >= lst_characters.length){
        // First deactivate the player commands && unselect last character
        DeactivateCommands();
        UnselectContext();
        // Ennemies turn
        ShowMessage("<b>Au tour des ennemis !</b>", 2, EnnemiesTurn);
        bool_hasAttacked = false;
    }
    else {
        // select next character
        ShowMessage(`Au tour de ${lst_characters[selectedCharacterIndex + 1][NAME]}`, 2, () => {
            SelectContext(lst_characters[selectedCharacterIndex + 1]);
            bool_hasAttacked = false;
        });
    }
}

// check ennemies health
function CheckEnnemiesHealth(){
    // Kill every ennemy at 0hp
    lst_ennemies.forEach(ennemy => {
        if(ennemy[HP] <= 0){
            KillEnnemy(ennemy);
        }
    });
    // Victory if no ennemy left
    if(lst_ennemies.length == 0){
        lst_MessagesQueue = null;
        Win();
    }
}

function CheckCharactersHealth(){
    // Kill every character at 0hp
    lst_characters.forEach(character => {
        if(character[HP] <= 0){
            KillCharacter(character);
        }
    });
    // Defeat if no character left
    if(lst_characters.length == 0){
        lst_MessagesQueue = null;
        Loose();
    }
}

function Win(){
    // deactivate game viewport interactions and lower opacity
    gameViewportElement = document.getElementById("game_viewport");
    gameViewportElement.style.opacity = 0.5;
    gameViewportElement.style.pointerEvents = "none";

    // then open the play again popup with the correct message
    gameEndScreenElement = document.getElementById("game_end_screen");
    gameEndTextElement = document.getElementById("game_end_text");
    gameEndTextElement.innerHTML = "<b>Gagné ! (GG)</b>"
    gameEndScreenElement.style.display = "flex";
}

function Loose(){
    // deactivate game viewport interactions and lower opacity
    gameViewportElement = document.getElementById("game_viewport");
    gameViewportElement.style.opacity = 0.5;
    gameViewportElement.style.pointerEvents = "none";

    // then open the play again popup with the correct message
    gameEndScreenElement = document.getElementById("game_end_screen");
    gameEndTextElement = document.getElementById("game_end_text");
    gameEndTextElement.innerHTML = "<b>Perdu... (GR)</b>"
    gameEndScreenElement.style.display = "flex";
}