const stripe = require('stripe')(process.env.stripe_key);
const Booking = require("../models/bookingModel");
const Show = require('../models/showModel');
const emailHelper = require('../utils/emailHelper');
exports.makePayment = async(req, res) => {
    console.log("visited makePayment -------------")
    try{
        const {paymentMethodId,amount} = req.body;
        console.log("paymentMethod == ",paymentMethodId,"====","amount ",amount);
        // const customer = await stripe.customers.create({
        //     email: token.email,
        //     source: token.id
        // })
        // log.info("Customer:: ",customer);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            // customer: customer.id,
            payment_method: paymentMethodId,
            description: "payment for movie ticket."
        })

        const transactionId = paymentIntent.id;
        console.log("transactionID:: ", transactionId)
        res.send({
            success: true,
            message: 'payment successfull! ticket(s) booked !',
            data: transactionId
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })

    }
}

exports.bookShow = async (req, res) => {
    try{
        console.log("bookingshow -------------")
        const newBooking = new Booking(req.body);
        await newBooking.save();
        console.log("show booked and updated-----------")
        const show = await Show.findById(req.body.show).populate("movie");
        const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
        await Show.findByIdAndUpdate(req.body.show, {bookedSeats:updatedBookedSeats});

        const populatedBooking = await Booking.findById(newBooking._id).populate("user").populate("show").populate({
            path: "show",
            populate : {
                path: "movie",
                model: "movie"
            }
        })
        .populate({
            path: "show",
            populate : {
                path: "theatre",
                model: "theatre"
            }
        })

        res.send({
            success: true,
            message: 'new booking done !',
            data: populatedBooking
        })
        console.log("-----before sending email after booking ticket data --->-----",populatedBooking);
        await emailHelper("ticket.html", "saitejakanumuri29565@gmail.com", {
            name: populatedBooking.user.name,
            movie: populatedBooking.show.movie.name,
            theatre: populatedBooking.show.theatre.name,
            date: populatedBooking.show.date,
            time: populatedBooking.show.time,
            seats: populatedBooking.seats,
            amount: populatedBooking.seats.length*populatedBooking.show.ticketPrice,
            transactionId: populatedBooking.transactionId
        })
        console.log("----after sending email to booked user ----------")
        
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
}

exports.getAllBookings = async (req, res) => {
    try{
        const bookings = await Booking.find({ user: req.userId})
        .populate("user")
        .populate("show")
            .populate({
                path: "show",
                populate : {
                    path: "movie",
                    model: "movie"
                }
            })
            .populate({
                path: "show",
                populate : {
                    path: "theatre",
                    model: "theatre"
                }
            })
            res.send({
                success: true,
                message: 'booking fetched !',
                data: bookings
            })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
}