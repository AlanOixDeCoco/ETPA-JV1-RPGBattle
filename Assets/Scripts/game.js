// #region VARIABLES

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

// Context
DeactivateCommands();
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

// #endregion