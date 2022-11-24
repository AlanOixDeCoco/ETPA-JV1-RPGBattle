var characters = ["character_1", "character_2", "character_3", "character_4"];
var ennemies = [["ennemy_1", ""], "ennemy_2", "ennemy_3"];

document.getElementById("mana_bar").style.width = "40%"; // changer le remplissage de la barre

document.getElementById(characters[3]).getElementsByClassName("cursor")[0].style.visibility = "visible"; // pour afficher un curseur

document.getElementById("character_frame").getElementsByTagName('img')[0].src="Assets/" + characters[3] + ".png"; // pour placer un personnage dans le cadre

