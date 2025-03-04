const { Router } = require("express");
const masterController = require("../controllers/masterController");
const masterRouter = Router();

masterRouter.get("/", masterController.characterListGet);
masterRouter.get("/new", masterController.newCharacterGet);
masterRouter.post("/new", masterController.newCharacterPost);
masterRouter.post("/:id/delete", masterController.deleteCharacterPost);
masterRouter.get("/:id/update", masterController.updateCharacterGet);
masterRouter.post("/:id/update", masterController.updateCharacterPost);

module.exports = masterRouter