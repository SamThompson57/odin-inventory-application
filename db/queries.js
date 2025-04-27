const pool = require("./pool");

//Get all characters, For the main page
async function getAllCharacters() {
    const { rows } = await pool.query("SELECT * FROM characters")
    return rows;
}

//Add a new character
async function insertCharacter(charactername, str) {
    await pool.query("INSERT INTO characters (charactername, str) VALUES ($1, $2)", [charactername, str]);    
}

//Get Character by ID
async function getCharacterById(characterid) {
    const {rows} = await pool.query("SELECT * FROM characters WHERE characterid=$1", [characterid]);
    return rows[0];
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

async function getSetById(setID) {
    const {rows} = await pool.query("SELECT * FROM itemsets WHERE setid=$1", [setID])
    return rows[0]
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
    return rows;
}

//New item to set
async function newItemIntoSet(setID, itemName, itemType, itemDescription, itemWeight) {
    await pool.query("INSERT INTO itemlist (setid, itemname, itemtype, itemdescription, weight) VALUES ($1, $2, $3, $4, $5)", 
        [setID, itemName, itemType, itemDescription, itemWeight])
}

//get item
async function getItemById(itemID) {
    const { rows } = await pool.query("SELECT * FROM itemlist WHERE itemid=$1", [itemID])
    return rows;
}

//edit item
async function editItemDetail(itemID, setID, itemName, itemType, itemDescription, itemWeight) {
    await pool.query("UPDATE itemlist SET setid=$2, itemname=$3, itemtype=$4, itemdescription=$5, weight=$6 WHERE itemid=$1", 
        [itemID, setID, itemName, itemType, itemDescription, itemWeight])
}

//mass edit item - NOT SURE IF NEEDED
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
    const { rows } = await pool.query("SELECT inventory.id, inventory.itemid, itemlist.itemname, itemlist.itemtype, itemlist.itemdescription, itemlist.weight, inventory.quantity FROM inventory INNER JOIN itemlist ON inventory.itemid=itemlist.itemid WHERE inventory.characterid = $1", [characterID])
    return rows
}

//add lines to inventory
async function addInventoryLine(setID, itemID, quantity, characterID) {
    await pool.query("INSERT INTO inventory (setid, itemid, quantity, characterid) VALUES ($1, $2, $3, $4)", 
        [setID, itemID, quantity, characterID])
    
}

//edit inventory TO BE USED AS A MASS EDIT
async function editInventory( ammendedItems ) {
    Object.keys(ammendedItems).forEach(async function(key){
        if(Number(ammendedItems[key])>0){
            await pool.query("UPDATE inventory SET quantity=$2 WHERE id=$1", 
                [Number(key), Number(ammendedItems[key])])
        }else{
            await pool.query("DELETE FROM inventory WHERE id=$1",
                [Number(key)]
            )
        }
    
    })
}

//delete inventory line
async function deleteInventoryLine(id) {
    await pool.query("DELETE FROM inventory WHERE id=$1", [id])
}

async function getItemTypesInSet(id) {
    const { rows } = await pool.query("SELECT DISTINCT itemtype FROM itemlist WHERE setid=$1", [id] );
    return rows;
}

//Return Total Weight of inventory
async function totalInventoryWeight(characterID) {
    const { rows } = await pool.query("SELECT SUM(weight * quantity) FROM inventory LEFT JOIN itemlist ON inventory.itemid = itemlist.itemid WHERE characterid = $1", [characterID]);
    return rows;
}

//Return items in a search query
async function itemSearch(query, characterId) {
    const queryArray = []
    if (query.set){queryArray.push(query.set)};
    if (query.search){queryArray.push('%'+decodeURIComponent(query.search).toLowerCase()+'%')}
    queryArray.push(characterId)
    
    const { rows } = await pool.query(`SELECT * FROM itemlist WHERE 
        ${query.set?`setid=$1 `:''}
        ${query.set && query.search ? 'AND ':''}
        ${query.search?`LOWER(itemname) LIKE ${query.set?'$2':'$1'}`:''}
        AND itemid NOT IN(SELECT itemid FROM inventory WHERE characterid=$${queryArray.length}) LIMIT 25`,queryArray)
        return rows;
}

module.exports = {
    getAllCharacters,
    insertCharacter,
    getCharacterById,
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
    editInventory,
    deleteInventoryLine,
    getSetById,
    getItemTypesInSet,
    getItemById,
    totalInventoryWeight,
    itemSearch
}