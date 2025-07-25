const { Router } = require("express");
const masterController = require("../controllers/masterController");
const masterRouter = Router();

masterRouter.get("/", masterController.characterListGet);
masterRouter.get("/new", masterController.newCharacterGet);
masterRouter.post("/new", masterController.newCharacterPost);
masterRouter.post("/:id/delete", masterController.deleteCharacterPost);
masterRouter.get("/:id/update", masterController.updateCharacterGet);
masterRouter.post("/:id/update", masterController.updateCharacterPost);
masterRouter.get("/:id/inventory", masterController.getItemList);
masterRouter.get("/itemsets", masterController.getSetList);
masterRouter.get("/newset", masterController.newSetGet);
masterRouter.post("/newset", masterController.newSetPost)
masterRouter.get("/:id/edit", masterController.updateSetGet);
masterRouter.post("/:id/edit", masterController.updateSetPost);
masterRouter.post("/:id/setdelete", masterController.deleteItemSet);
masterRouter.get("/:id/itemlist", masterController.getItemsInSet);
masterRouter.get("/:id/additem", masterController.addItemGet);
masterRouter.post("/:id/additem", masterController.addItemPost)
masterRouter.get("/:setid/:itemid/itemedit", masterController.editItemGet)
masterRouter.post("/:setid/:itemid/itemedit", masterController.editItemPost)
masterRouter.post("/:setid/:itemid/itemdelete", masterController.deleteItemPost)
masterRouter.get("/:id/editinventory", masterController.editInventoryGet)
masterRouter.post("/:id/editinventory", masterController.editInventoryPost)
masterRouter.post("/:id/addIntoInventory", masterController.addAddSingleLineToInv)
masterRouter.post("/:id/editinventory/search", masterController.newSearch)
masterRouter.post("/:id/addintoinventory", masterController.addAddSingleLineToInv)

module.exports = masterRouter