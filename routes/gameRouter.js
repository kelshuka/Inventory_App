const { Router } = require("express");

const gameController = require("../controllers/gameController");
const gameRouter = Router();


gameRouter.get("/", gameController.getGames);

gameRouter.get("/:id", gameController.getGamesID);

gameRouter.get("/:id/update", gameController.updateGameGet);
gameRouter.post("/:id/update", gameController.updateGamePost);

gameRouter.get("/:id/delete", gameController.deleteGameGet);
gameRouter.post("/:id/delete", gameController.deleteGamePost);


module.exports = gameRouter;