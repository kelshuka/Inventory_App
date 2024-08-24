const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const db = require("../db/queries");
const validateGenre = require("../middleware/validateGenre");
const validateAdminPassword = require('../middleware/validateAdminPassWord');



const getGenres = asyncHandler( async (req, res) => {
    const genres = await db.getAllGenres();
    res.render( 'genres', {title: 'Genres', genres});
});



const getGenresType = asyncHandler( async (req, res) => {


    const genreType = req.params.id;

    const genreInfo = await db.getGenresByID(genreType);
    const genreName = genreInfo[0].name;
   
    const genreGames = await db.getGenresType(genreName);
    
    res.render("genre", {title: 'Genre Games', genreGames });
});

// Create New Genres
const createNewGenreGet = asyncHandler( async (req, res) => {
    res.render("newGenre", {title: 'Genre Form'});
});

const createNewGenrePost = [
    validateGenre,
    validateAdminPassword,
    
    asyncHandler( async (req, res) => {

        const allErrors = validationResult(req);
        if(!allErrors.isEmpty()){
            return res.status(400).render('newGenre',
                {
                    title: "Add Genre", errors: allErrors.array(),                 
                });
        }

        await db.insertGenre(req.body);
        res.redirect("/genres");
    }),
];

// Update a Genre
const updateGenreGet = asyncHandler( async (req,res) => {

    const { id } = req.params;
    const [genre] = await db.getGenresByID(id);
    
    res.render("updateGenre", {title: 'Update Genre', genre});
});

const updateGenrePost = [
    validateGenre,
    validateAdminPassword,
    
    asyncHandler( async (req, res) => {
        const { id } = req.params;
        const [genre] = await db.getGenresByID(id);

        const allErrors = validationResult(req);
        if(!allErrors.isEmpty()){
            return res.status(400).render('updateGenre',
                {
                    title: "Update Genre", errors: allErrors.array(), genre,              
                });
        }
    

        //req.body.id = req.params.id;
        await db.updateGenre(req.body, id);
        res.redirect('/genres');
    }),
];


// Delete a Genre
const deleteGenreGet = asyncHandler( async (req,res) => {

    const { id } = req.params;
    const [genre] = await db.getGenresByID(id);
    
    res.render("deleteGenre", {title: 'Delete Genre', id, genre});
});

const deleteGenrePost = [

    validateAdminPassword,
    
    asyncHandler( async (req, res) => {
        const { id } = req.params;
        const [genre] = await db.getGenresByID(id);

        const allErrors = validationResult(req);
        if(!allErrors.isEmpty()){
            return res.status(400).render('deleteGenre',
                {
                    title: "Delete Genre", errors: allErrors.array(), id, genre,              
                });
        }
    

        await db.deleteGenre(id);
        res.redirect('/genres');
    }),
];

module.exports = {
    getGenres,
    getGenresType,
    createNewGenreGet,
    createNewGenrePost,
    updateGenreGet,
    updateGenrePost,
    deleteGenreGet,
    deleteGenrePost
};