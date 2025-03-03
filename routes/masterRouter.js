const { Router } = require("express");
const masterController = require("../controllers/masterController");
const masterRouter = Router();

masterRouter.get ("/", masterController.characterListGet);
masterRouter.get ("/new", masterController.newCharacterGet);

module.exports = masterRouter