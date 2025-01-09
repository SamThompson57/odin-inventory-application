const pool = require("./pool");

//Get all characters, For the main page
async function getAllCharacters() {
    const { rows } = await pool.query("SELECT * FROM characters")
    return rows;
}

//Add a new character
async function insertCharacter(characterName, str) {
    await pool.query("INSERT INTO characters (charactername, str) VALUES ($1,$2)", [characterName, str] )    
}

//Ammend a characters stats
async function editCharacter(characterID, characterName, str) {
    await pool.query("UPDATE characters SET charactername=$1, str=$2 WHERE characterid=$3", [characterName, str, characterID])    
}

//Delete Character + all Inventory references to that character
async function deleteCharacter(characterID) {
    await pool.query("DELETE FROM characters WHERE characterid=$1", [characterID])
    await pool.query("DELETE FROM inventory WHERE characterid=$1", [characterID])
}

//Get All Item Sets
async function getAllItemSets() {
    const { rows } = await pool.query("SELECT * FROM itemsets")
    return rows
}

//New Item Set
async function addNewItemSet(setName) {
    await pool.query("INSERT INTO itemsets (setname) VALUES ($1)", [setName])
}

//edit Item Set
async function editItemSet(newSetName, setID){
    await pool.query("UPDATE itemsets SET setname=$1 WHERE setid=$2", [newSetName, setID])
}

//Delete item Set + all items from the set
async function deleteItemSet(setID) {
    await pool.query("DELETE FROM itemsets WHERE setid=$1", [setID])
    await pool.query("DELETE FROM itemlist WHERE setid=$1", [setID])
    await pool.query("DELETE FROM inventory WHERE setid=$1", [setID])
}

//Get all items by set
async function getItemsInSet(setID) {
    const { rows } = await pool.query("SELECT * FROM itemlist WHERE setid=$1", [setID])
}

//New item to set
async function newItemIntoSet(setID, itemName, itemType, itemDescription, itemWeight) {
    await pool.query("INSERT INTO itemlist (setid, itemname, itemtype, itemdescription, itemweight) VALUES ($1, $2, $3, $4, $5", [setID, itemName, itemType, itemDescription, itemWeight])
}

//edit item
//delete item


//get inventory lines by character
//add lines to inventory
//edit inventory line
//delete inventory line

module.exports = {
    getAllCharacters,
    insertCharacter,
    editCharacter,
    deleteCharacter
}