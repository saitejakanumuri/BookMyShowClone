const theatreRouter = require("express").Router();
const { addTheatre, updateTheatre, deleteTheatre, getAllTheatres, getAllTheatresPartnerOwns } = require("../controller/theatre");

theatreRouter.post("/", addTheatre);
theatreRouter.put("/:id", updateTheatre)
theatreRouter.delete("/:id", deleteTheatre)

//get all theatres so that admin can approve or deny request
theatreRouter.get("/get-all-theatres", getAllTheatres)

//get theatres for the partner that he owns
theatreRouter.get("/get-all-theatres-by-owner", getAllTheatresPartnerOwns)



module.exports = theatreRouter;