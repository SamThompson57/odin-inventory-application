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

module.exports = {
    characterListGet,
    newCharacterGet,
    newCharacterPost,
    deleteCharacterPost
}