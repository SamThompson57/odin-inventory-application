const pool = require("./pool");

async function getAllCharacters() {
    const { rows } = await pool.query("SELECT * FROM characters")
    return rows;
}

async function insertCharacter(characterName, str) {
    await pool.query("INSERT INTO characters (charactername, str) VALUES ($1,$2)", [characterName, str] )    
}

async function editCharacter(characterID, characterName, str) {
    await pool.query("UPDATE characters SET charactername=$1, str=$2 WHERE characterid=$3", [characterName, str, characterID])    
}

//Delete Character + all Inventory references to that character

//Get All Item Sets
//New Item Set
//edit Item Set
//Delete item Set + all items from the set

//Get all items by set
//New item to set
//edit item
//delete item


//get inventory lines by character
//add lines to inventory
//edit inventory line
//delete inventory line

module.exports = {
    getAllCharacters,
    insertCharacter,
    editCharacter
}