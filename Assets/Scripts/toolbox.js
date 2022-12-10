// Window / System access variables
let _clientWidth = document.documentElement.clientWidth;

// returns a random int between min and max values
function RandomInt(min, max){
    return (Math.floor(Math.random() * (max-min)) + min);
}