const showRouter = require("express").Router();
const {addShow, updateShow, deleteShow, getAllShowsByTheatre, getAllTheatresByMovie, getShowById} = require('../controller/shows');

//add a show
showRouter.post("/",addShow);

//update ashow
showRouter.put("/:id",updateShow);

//get all show

showRouter.post("/get-all-shows-by-theatre",getAllShowsByTheatre);

//get all theatres by movie which have some shows

showRouter.post("/get-all-theatres-by-movie",getAllTheatresByMovie);

//get show by id
showRouter.get("/:id",getShowById);

module.exports = showRouter; 