const db = require("../db/queries");

//Get Character List
async function characterListGet(req, res) {
    const characters = await db.getAllCharacters();
    res.render("characterList", {
        title: "Character List",
        characters: characters
    })

}

//Get New Character
async function newCharacterGet(req, res) {
    res.render("newCharacter", {
        title: "New Character"
    })
}

//Post New Character
async function newCharacterPost(req, res) {
    const name = req.body.characterName;
    const str = req.body.characterStr;
    console.log(`New Character: ${name}, Strength score: ${str}`)
    await db.insertCharacter(name,str);
    res.redirect("/");
}

//Delete Character
async function deleteCharacterPost(req, res) {
    console.log("Deleting Character with ID: "+req.params.id)
    await db.deleteCharacter(req.params.id)
    res.redirect("/")
}

//Update Character Get
async function updateCharacterGet(req, res) {
    const character = await db.getCharacterById(req.params.id)
    res.render("updateCharacter", {
        title: "Update Character",
        character: character
    })
}

//Update Character Post
async function updateCharacterPost(req, res) {
    const { characterName, characterStr } = req.body;
    await db.editCharacter(req.params.id, characterName, characterStr)
    res.redirect("/")
}

//Get a characters itemlist.
async function getItemList(req, res) {
    const character = await db.getCharacterById(req.params.id)
    const items = await db.getInventorybyCharacter(req.params.id)
    const totalInvWeight = await db.totalInventoryWeight(req.params.id)
    res.render("characterInventory",{
        character: character,
        items: items,
        totalInvWeight: totalInvWeight[0]
    })
}

//Get Setlist
async function getSetList(req, res) {
    const itemSets = await db.getAllItemSets();
    res.render("itemSets", {
        itemsets: itemSets
    })
}

// New Set Get
async function newSetGet(req, res) {
    res.render("newSet", {
        title: "New Item Set"
    });

}

// New Set Post
async function newSetPost(req, res) {
    const setName = req.body.setName;
    await db.addNewItemSet(setName)
    res.redirect("/itemSets")
}

// Update Set Get
async function updateSetGet(req, res) {
    const set = await db.getSetById(req.params.id)
    res.render("updateItemSet", {
        title: "Update Set",
        set: set
    })
}

// Update Set Post
async function updateSetPost(req, res) {
    const {setName} = req.body;
    await db.editItemSet(setName, req.params.id)
    res.redirect("/itemsets")
}

// Delete Set
async function deleteItemSet(req, res) {
    console.log("Deleting Item Set")
    await db.deleteItemSet(req.params.id)
    res.redirect("/itemsets")
}

// Get Items from set
async function getItemsInSet(req, res) {
    const set = await db.getSetById(req.params.id)
    const items = await db.getItemsInSet(req.params.id)
    res.render("setDetail", {
        set: set,
        items: items
    })
}

//Add Item Get
async function addItemGet(req, res) {
    const set = await db.getSetById(req.params.id);
    const uniqueTypes = await db.getItemTypesInSet(req.params.id)
    res.render("newItem", {
        set: set,
        itemtypes: uniqueTypes
    })
}

//Add Item Post
async function addItemPost(req, res) {
    const itemName = req.body.itemName;
    const itemType = req.body.itemType;
    const itemDescription = req.body.itemDescription;
    const itemWeight = req.body.itemWeight;
    await db.newItemIntoSet(req.params.id, itemName, itemType, itemDescription, itemWeight)
    res.redirect(`/${req.params.id}/itemlist`)
}

//Edit Item Get
async function editItemGet(req, res) {
    console.log(`Set ID:${req.params.setid}, Item ID:${req.params.itemid}` )
    const item = await db.getItemById(req.params.itemid)
    const uniqueTypes = await db.getItemTypesInSet(req.params.setid)
    const set = await db.getSetById(req.params.setid)
    res.render("updateItem", {
        set: set,
        itemTypes: uniqueTypes,
        item: item[0]
    })
}

//Edit Item Post
async function editItemPost(req, res) {    
    await db.editItemDetail(
        req.params.itemid, 
        req.params.setid, 
        req.body.itemName, 
        req.body.itemType, 
        req.body.itemDescription, 
        req.body.itemWeight
    )

    res.redirect(`/${req.params.setid}/itemlist`)
}


//Delete Item
async function deleteItemPost(req, res) {
    await db.deleteItem(req.params.itemid);
    res.redirect(`/${req.params.setid}/itemlist`)
}

//Edit Inventory GET
async function editInventoryGet(req, res) {
    // get character current inventory
    const character = await db.getCharacterById(req.params.id)
    const items = await db.getInventorybyCharacter(req.params.id)
    const itemsets = await db.getAllItemSets();
    // get item list from the search parameters
    let itemSearch = req.query.set || req.query.search? await db.itemSearch(req.query) : null 

    /*if (req.query.set || req.query.search){
        itemSearch = await db.itemSearch(req.query)
    }*/

    
    
    res.render("inventoryEdit", {
        title: `Edit ${character.charactername}'s inventory`,
        character: character,
        items: items,
        itemsets: itemsets,
        itemsearch: itemSearch
    })
}

//Edit Inventory POST
async function editInventoryPost(req, res) {
    console.log("Inventory Updated")
    Object.keys(req.body).forEach(key => {
        console.log(`Key: ${key}, Value: ${req.body[key]}`)
    });
    await db.editInventory(req.body)
    res.redirect(`/${req.params.id}/inventory`)
}

async function addAddSingleLineToInv(req, res) {
    //Form will be submitted with a single Item ID,
    //Get item getItemById(itemID) 
    const item = await db.getItemById(Object.keys(req.body)[0])
    //addInventoryLine(setID, itemID, quantity, characterID)
    console.log(`adding ${req.body[0]} x ${item.itemname}`)
    res.redirect(`/${req.params.id}/editinventory`)
}

async function newSearch(req,res) {

    res.redirect(`/${req.params.id}/editinventory?${req.body.set?`set=${req.body.set}&`:""}${req.body.searchtext?`search=${encodeURIComponent(req.body.searchtext)}`:""}`)
}

module.exports = {
    characterListGet,
    newCharacterGet,
    newCharacterPost,
    deleteCharacterPost,
    updateCharacterGet,
    updateCharacterPost,
    getItemList,
    getSetList,
    newSetGet,
    newSetPost,
    updateSetGet,
    updateSetPost,
    deleteItemSet,
    getItemsInSet,
    addItemGet,
    addItemPost,
    editItemGet,
    editItemPost,
    deleteItemPost,
    editInventoryGet,
    editInventoryPost,
    addAddSingleLineToInv,
    newSearch
}