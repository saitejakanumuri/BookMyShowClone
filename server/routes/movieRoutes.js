const movieRouter = require("express").Router();
const {addMovie, getAllMovies, updateMovie, deleteMovie, movieById} = require("../controller/movie");

//add a movie
movieRouter.post("/",addMovie);

//get all movies
movieRouter.get("/", getAllMovies);

//update a movie
movieRouter.put("/:id",updateMovie)

//del a movie
movieRouter.delete("/:id", deleteMovie)

//fetch movie by id
movieRouter.get("/:id", movieById)


module.exports = movieRouter;
