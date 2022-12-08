// #region VARIABLES

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
    ShowMessage("Laissez-moi vous les présenter...", 2, () => {SelectCharacter(lst_characters[0]);});
    ShowMessage("<b>GIRO SMILEUR</b>", 2);
    ShowMessage("Le plus grand smileur que cette terre ai porté, il peut exploiter son <b><i>GIRO SMILE</i></b> pour soigner ses alliés.", 4, () => {SelectCharacter(lst_characters[1]);});
    ShowMessage("<b>TURBO INCOGNITO</b>", 2);
    ShowMessage("Turbo chelou, il peut <b><i>EMPOISONNER</i></b> ses ennemis à l'aide de sa turbo potion, ce mec est très douteux...", 4, () => {SelectCharacter(lst_characters[2]);});
    ShowMessage("<b>ULTRA COWBOY</b>", 2);
    ShowMessage("Joie de vivre, reposé, probablement pas un joueur LoL, en plus d'être l'ami des bêtes il a le pouvoir de <b><i>GIGA BOOSTER</i></b> ses alliés.", 6, () => {SelectCharacter(lst_characters[3]);});
    ShowMessage("<b>GIGA CHAD</b>", 2);
    ShowMessage("Le boug est chadesque, une légende urbaine, son <b><i>GIGA STYLE</i></b> peut à lui seul déboussoler ses ennemis et les rendre giga naze.", 6, () => {UnselectCharacter();});

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
    
    // Player begins
    PlayerTurn();
}

// This initializes the player turn
function PlayerTurn(){
    // Select the first available character
    SelectCharacter(lst_characters[0]);

    // Then re-activate the player commands
    ActivateCommands();
}