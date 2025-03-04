const { Router } = require("express");
const masterController = require("../controllers/masterController");
const masterRouter = Router();

masterRouter.get("/", masterController.characterListGet);
masterRouter.get("/new", masterController.newCharacterGet);
masterRouter.post("/new", masterController.newCharacterPost);
masterRouter.post("/:id/delete", masterController.deleteCharacterPost);

module.exports = masterRouter