const pool = require("./pool");

//Get all characters, For the main page
async function getAllCharacters() {
    const { rows } = await pool.query("SELECT * FROM characters")
    return rows;
}

//Add a new character
async function insertCharacter(charactername, str) {
    await pool.query("INSERT INTO characters (charactername, str) VALUES ($1, $2)", [charactername, str] )    
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
    await pool.query("INSERT INTO itemlist (setid, itemname, itemtype, itemdescription, itemweight) VALUES ($1, $2, $3, $4, $5)", 
        [setID, itemName, itemType, itemDescription, itemWeight])
}

//edit item
async function editItemDetail(itemID, setID, itemName, itemType, itemDescription, itemWeight) {
    await pool.query("UPDATE itemlist SET setid=$2, itemname=$3, itemtype=$4, itemdescription=$5, itemweight=$6 WHERE itemid=$1", 
        [itemID, setID, itemName, itemType, itemDescription, itemWeight])
}

//mass edit item
async function massEditItemDetail(itemArray) {
    await itemArray.forEach(element => {
        editItemDetail(element.itemID, element.setID, element.itemName, element.itemType, element.itemDescription, element.itemWeight)
    });
}

//delete item
async function deleteItem(itemID) {
    await pool.query("DELETE FROM itemlist WHERE itemid=$1", [itemID])
}

//get inventory lines by character
async function getInventorybyCharacter(characterID) {
    await pool.query("SELECT * FROM inventory WHERE characterid=$1", [characterID])
}

//add lines to inventory
async function addInventoryLine(setID, itemID, quantity, characterID) {
    await pool.query("INSERT INTO inventory (setid, itemid, quantity, characterid) VALUES ($1, $2, $3, $4)", 
        [setID, itemID, quantity, characterID])
    
}

//edit inventory line
async function editInventoryLine(id, quantity, characterID) {
    await pool.query("UPDATE inventory SET quantity=$2, characterid=$3 WHERE id=$1", 
        [id, quantity, characterID])    
}

//delete inventory line
async function deleteInventoryLine(id) {
    await pool.query("DELETE FROM inventory WHERE id=$1", [id])
}


module.exports = {
    getAllCharacters,
    insertCharacter,
    editCharacter,
    deleteCharacter,
    getAllItemSets,
    addNewItemSet,
    editItemSet,
    deleteItemSet,
    getItemsInSet,
    newItemIntoSet,
    editItemDetail,
    massEditItemDetail,
    deleteItem,
    getInventorybyCharacter,
    addInventoryLine,
    editInventoryLine,
    deleteInventoryLine
}