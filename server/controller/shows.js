const Show = require("../models/showModel");
const mongoose = require("mongoose");

exports.addShow = async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "new show has been added",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.updateShow = async (req, res) => {
  try {
    const { id } = req.params;
    const newShow = await Show.findByIdAndUpdate(id, req.body);
    res.send({
      success: true,
      message: "show has been updated",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteShow = async (req, res) => {
  try {
    const { id } = req.params;
    const newShow = await Show.findByIdAndDelete(id);
    res.send({
      success: true,
      message: "show has been deleted",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllShowsByTheatre = async (req, res) => {
  try {
    const shows = await Show.find({ theatre: req.body.theatreId }).populate(
      "movie"
    );
    res.send({
      success: true,
      message: "All shows fetched",
      data: shows,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllTheatresByMovie = async (req, res) => {
  try {
    const { movie, date } = req.body;
    //get all the shows of the selected date
    console.log("request params are ", req.body);
    
    // Convert string date to Date object and compute LOCAL day boundaries
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);
    console.log("movieID::",movie,"start of the day:",startOfDay," end of the day: ",endOfDay);
    const movieId = movie
    const shows = await Show.find({ 
      movie:movieId, 
      date: { 
        $gte: startOfDay, 
        $lte: endOfDay 
      } 
    })
      .populate("theatre")
      .populate("movie");
    console.log("shows are ::: ",shows);
    //filter out unique theatres nwo
    let uniqueTheatres = [];
    shows.forEach((show) => {
      let isTheatre = uniqueTheatres.find(
        (theatre) => String(theatre._id) === String(show.theatre._id)
      );
      if (!isTheatre) {
        let showsOfThisTheatre = shows.filter(
          (showObj) => String(showObj.theatre._id) === String(show.theatre._id)
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfThisTheatre,
        });
      }
    });

    res.send({
      success: true,
      message: "All theatres fetched",
      data: uniqueTheatres,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate("movie")
      .populate("theatre");
    res.send({
      success: true,
      message: "All shows fetched",
      data: show,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
