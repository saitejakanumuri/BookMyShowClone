const Theatre = require("../models/theatreModel");

exports.addTheatre = async (req,res) =>{
    try{    
        const newTheatre  = new Theatre(req.body);
        await newTheatre.save();

        res.json({
            success:true,
            message:"New theatre has been added",
            data: newTheatre
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })

    }
}

exports.updateTheatre = async (req,res) =>{
    try{
        const {id} = req.params;
        const theatre = await Theatre.findByIdAndUpdate(id,req.body,{"returnDocument":"after"})

        res.json({
            success:true,
            message:"Theatre has been updated",
            data: theatre
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }

}

exports.deleteTheatre = async (req,res) =>{
    try{
        const {id} = req.params;
        await Theatre.findByIdAndDelete(id);

        res.json({
            success:true,
            message:"Theatre has been deleted",
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getAllTheatres = async (req,res) =>{
    try{
        const allTheatres = await Theatre.find().populate("owner");
        res.json({
            success:true,
            message:"All theatres fetched",
            data: allTheatres
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getAllTheatresPartnerOwns = async (req, res) =>{
    try{
        const ownerId = req.userId;
        const allTheatres = await Theatre.find({owner:ownerId});
        res.json({
            success:true,
            message:"All theatres fetched",
            data : allTheatres
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}