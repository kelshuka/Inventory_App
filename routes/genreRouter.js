const { Router } = require("express");

const genreController = require("../controllers/genreController");
const gameController = require("../controllers/gameController");
const genreRouter = Router();


genreRouter.get("/", genreController.getGenres);

genreRouter.get("/:id", genreController.getGenresType);



genreRouter.get("/genreGame/:id", gameController.getGamesID);


genreRouter.get("/:id/update", genreController.updateGenreGet);
genreRouter.post("/:id/update", genreController.updateGenrePost);

genreRouter.get("/:id/delete", genreController.deleteGenreGet);
genreRouter.post("/:id/delete", genreController.deleteGenrePost);


module.exports = genreRouter;