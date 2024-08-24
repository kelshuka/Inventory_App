const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const db = require("../db/queries");
const validateGame = require('../middleware/validateGame');
const validateAdminPassword = require('../middleware/validateAdminPassWord');



const getGames = asyncHandler( async (req, res) => {
    const games = await db.getAllGames();
    res.render( 'games', {title: 'Games', games});
});


const getGamesID = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const [game] = await db.getGamesByID(id);

    /* game.publishingDate = "" + game.publishingDate;
    game.publishingDate = game.publishingDate.toString().slice(4,15); */
    
    //console.log(game.publishingDate);
    
    res.render("game", {title: 'Game', game });
});



// Create New Games
const createNewGameGet = asyncHandler( async (req,res) => {
    res.render("newGame", {title: 'Game Form'});
});

const createNewGamePost = [
    validateGame,
    validateAdminPassword,
    
    asyncHandler( async (req, res) => {
    
        const allErrors = validationResult(req);
        if(!allErrors.isEmpty()){
            return res.status(400).render('newGame',
                {
                    title: "Add Game", errors: allErrors.array(),                 
                });
        }

        await db.insertGame(req.body);
        res.redirect("/games");
    }),
];

// Update a Game
const updateGameGet = asyncHandler( async (req,res) => {

    const { id } = req.params;
    const [game] = await db.getGamesByID(id);
    
    res.render("updateGame", {title: 'Update Game', game});
});

const updateGamePost = [
    validateGame,
    validateAdminPassword,
    
    asyncHandler( async (req, res) => {
        const { id } = req.params;
        const [game] = await db.getGamesByID(id);

        const allErrors = validationResult(req);
        if(!allErrors.isEmpty()){
            return res.status(400).render('updateGame',
                {
                    title: "Update Game", errors: allErrors.array(), game,              
                });
        }
    

        req.body.id = req.params.id;
        await db.updateGame(req.body);
        res.redirect(`/games/${req.params.id}`);
    }),
];

// Delete a Game
const deleteGameGet = asyncHandler( async (req,res) => {

    const { id } = req.params;
    const [game] = await db.getGamesByID(id);
    
    res.render("deleteGame", {title: 'Delete Game', id, game});
});

const deleteGamePost = [

    validateAdminPassword,
    
    asyncHandler( async (req, res) => {
        const { id } = req.params;
        const [game] = await db.getGamesByID(id);

        const allErrors = validationResult(req);
        if(!allErrors.isEmpty()){
            return res.status(400).render('deleteGame',
                {
                    title: "Delete Game", errors: allErrors.array(), id, game,              
                });
        }
    

        await db.deleteGame(id);
        res.redirect('/games');
    }),
];



module.exports = {
    getGames,
    getGamesID,
    createNewGameGet,
    createNewGamePost,
    updateGameGet,
    updateGamePost,
    deleteGameGet,
    deleteGamePost
};