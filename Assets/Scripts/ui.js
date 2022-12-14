// #region VARIABLES
let lst_MessagesQueue = []; // stores the queue of messages to display to the user
let bool_isBusy = false; // state of the message popup
// #endregion

// #region FUNCTIONS
// refreshes commands to the desired character
function UpdateCommandsArea(character){
    document.getElementById("character_frame").getElementsByTagName("img")[0].src = `Assets/Characters/${character[ID]}.png`;
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
    
    // reset every button
    attackButtonElement = document.getElementById("attack_button");
    defendButtonElement = document.getElementById("defend_button");
    specialButtonElement = document.getElementById("special_button");
    attackButtonElement.style.opacity = 1;
    attackButtonElement.style.pointerEvents = "all";
    defendButtonElement.style.opacity = 1;
    defendButtonElement.style.pointerEvents = "all";
    specialButtonElement.style.opacity = 1;
    specialButtonElement.style.pointerEvents = "all";
    // change the buttons text
    attackButtonElement.innerHTML = `<img src="Assets/Actions/action_attack.png">\nAttaquer (-${character[DMG]}HP)`;
    specialButtonElement.innerHTML = `<img src="Assets/Actions/${character[SPE][ACTION_SPRITE]}.png">\n${character[SPE][ACTION_NAME]} (-${ACTION_MANA_CONSUMPTION}MP)`;
    // then apply necessary modifications
    if(character[MANA] < ACTION_MANA_CONSUMPTION){
        specialButtonElement.style.opacity = 0.5;
        specialButtonElement.style.pointerEvents = "none";
    }
    else {
        specialButtonElement.style.opacity = 1;
        specialButtonElement.style.pointerEvents = "all";
    }
    switch(character[LAST_ACTION]){
        case ACTION_ATTACK:
            attackButtonElement.style.opacity = 0.5;
            attackButtonElement.style.pointerEvents = "none";
            break;
        case ACTION_DEFEND:
            defendButtonElement.style.opacity = 0.5;
            defendButtonElement.style.pointerEvents = "none";
            break;
        case character[SPE]:
            specialButtonElement.style.opacity = 0.5;
            specialButtonElement.style.pointerEvents = "none";
            break;
    }
}

// display a message in the dialog area for 'duration' seconds (5s by default) and calls 'fallback' function after displaying
function ShowMessage(message, duration = 2, fallback = null){
    if(message){
        lst_MessagesQueue.push([() => {
            ShowDialogArea(message);
            setTimeout(CloseMessage, duration * 1000);
        }, fallback]);
    }
    if(!bool_isBusy && (lst_MessagesQueue.length > 0)){
        bool_isBusy = true;
        lst_MessagesQueue[0][0]();
    }
}
function CloseMessage(){
    HideDialogArea();
    if(lst_MessagesQueue[0][1]) lst_MessagesQueue[0][1]();
    lst_MessagesQueue.shift();
    bool_isBusy = false;
    setTimeout(ShowMessage, 600);
}

// Show / Hide dialog popup and fill with 'text'
function ShowDialogArea(text){
    dialogAreaElement = document.getElementById("dialog_area");
    dialogAreaElement.innerHTML = `<div>${text}</div>`;
    dialogAreaElement.style.top = `-${dialogAreaElement.offsetHeight}px`; // use the message box dimensions to properly show it
    dialogAreaElement.style.visibility = "visible";
    dialogAreaElement.style.top = "2vh";
}
function HideDialogArea(){
    dialogAreaElement = document.getElementById("dialog_area");
    dialogAreaElement.style.top = `-${dialogAreaElement.offsetHeight}px`; // use the message box dimensions to properly hide it
    dialogAreaElement.style.visibility = "hidden";
}

// Show / Hide health popup and replace text accordingly
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

// Activate / Deactivate command
function ActivateCommands(){
    commandsElement = document.getElementById("commands_area");
    commandsElement.style.opacity = 1;
    commandsElement.style.pointerEvents = "all";
}
function DeactivateCommands(){
    commandsElement = document.getElementById("commands_area");
    commandsElement.style.opacity = 0.5;
    commandsElement.style.pointerEvents = "none";
}

// Set mouse cursor image
function SetMouseCursor(id, sprite = null){
    element = document.getElementById(id);
    if(sprite) element.style.cursor = `url(Assets/Actions/${sprite}_32px.png) 16 16, pointer`;
    else element.style.cursor = "default";
}
// #endregion