const { Router } = require("express");

const gameController = require("../controllers/gameController");
const newGameRouter = Router();



newGameRouter.get("/", gameController.createNewGameGet);
newGameRouter.post("/", gameController.createNewGamePost);

module.exports = newGameRouter;