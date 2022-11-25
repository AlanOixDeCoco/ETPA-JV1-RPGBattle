var characters = [
    ["character_1", "Giro Smileur", 100, 10], // id html, nom, points de vie, dégats
    ["character_2", "Turbo Incognito", 100, 10], 
    ["character_3", "Ultra Cowboy", 100, 10], 
    ["character_4", "Giga Chad", 100, 10]
];

var ennemies = [
    ["ennemy_1", "Clown", 200, 20], // id html, nom, points de vie, dégats
    ["ennemy_2", "Ogre", 200, 20], 
    ["ennemy_3", "Goblin", 200, 20]
];

document.getElementById("mana_bar").style.width = "40%"; // changer le remplissage de la barre

document.getElementById(characters[3]).getElementsByClassName("cursor")[0].style.visibility = "visible"; // pour afficher un curseur

document.getElementById("character_frame").getElementsByTagName('img')[0].src="Assets/" + characters[3] + ".png"; // pour placer un personnage dans le cadre

