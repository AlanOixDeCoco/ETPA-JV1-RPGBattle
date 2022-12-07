// #region VARIABLES
let lst_MessagesQueue = []; // stores the queue of messages to display to the user
let func_MessageFallback = null; // stores the current message fallback function (if skipping)
let bool_isBusy = false; // state of the message popup
// #endregion

// #region FUNCTIONS
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

// display a message in the dialog area for 'duration' seconds (5s by default)
function ShowMessage(message, duration = 5, fallback = null){
    if(message){
        lst_MessagesQueue.push(function() {
            ShowDialogArea(message);
            setTimeout(HideDialogArea, duration * 1000);
            if(fallback){
                func_MessageFallback = fallback;
                setTimeout(function() {
                    if(func_MessageFallback) func_MessageFallback;
                }, (duration + 1) * 1000);
            }
        });
    }
    if(!bool_isBusy && (lst_MessagesQueue.length > 0)){
        lst_MessagesQueue[0]();
        lst_MessagesQueue.shift();
    }
}

// Show & Hide dialog popup and fill with 'text'
function ShowDialogArea(text){
    bool_isBusy = true;
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
    bool_isBusy = false;
    setTimeout(ShowMessage, 600);
}

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