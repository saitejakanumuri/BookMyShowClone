const Movie = require("../models/movieModel");

exports.addMovie = async (req,res)=>{
    try{
        const movie = req.body;
        const newMovie = new Movie(movie);
        await newMovie.save();
        res.send({
            success:true,
            message:"new movies has been added"
        })
    }catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

exports.getAllMovies = async (req,res) =>{
    try{
        const allMovies = await Movie.find();
        res.send({
            success:true,
            message:"all movies have been retrieved",
            data:allMovies
        })
    }catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

exports.updateMovie = async (req,res) =>{
    try{
        const {id:movieId} = req.params
        const update = req.body;
        const updatedMovie = await Movie.findByIdAndUpdate(movieId,update,{"returnDocument":"after"});
        res.send({
            success: true,
            message: "movie updated successfully",
            data: updatedMovie
        })
    }catch(err){

        res.send({
            success:false,
            message:err.message
        })
    }
}
exports.deleteMovie = async (req, res) => {
    try{
        const {id:movieId} = req.params;
        await Movie.findByIdAndDelete(movieId);
        res.send({
            success: true,
            message: "movie deleted successfully",
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
}
exports.movieById = async (req, res) => {
    try{
        const {id:movieId} = req.params;
        const movie = await Movie.findById(movieId);
        res.send({
            success: true,
            message: "movie retrieved successfully",
            data: movie
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
}