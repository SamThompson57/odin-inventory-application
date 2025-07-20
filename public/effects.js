
function weightEffect(invWeight, characterStr){
    switch(Math.floor(invWeight/characterStr/5)){
        case 0:
            return "No Effect";
        case 1 :
            return "-10ft Speed";
        case 2 : 
            return "-20ft Speed + Disadvantage to ability checks";
        default:
            return "MAX INVENTORY WEIGHT EXCEEDED";
    }
}

module.exports = {
    weightEffect
}
