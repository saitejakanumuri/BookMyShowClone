const express = require("express");
require("dotenv").config();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const connectToDB = require("./config/dbConfig");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoutes");
const showsRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const app = express();

// CORS configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(express.json());
app.set("trust proxy", 1);
app.use(helmet({
    xPoweredBy: false,
}));
app.disable("x-powered-by");
app.use((req, res ,next) => {
    res.header("X-powered-by", 'No-entry');
    next();
})
//rate limitting middleware
const apiLimiter = rateLimit({
    windowMs: 15*60*1000, //15minutes
    max: 100, //lmit each IP to 100 requests per 15min
    message: "Too Many requestsfrom this IP, please try again after 15min",
    legacyHeaders: false
})
app.use("/api/", apiLimiter);
app.use(mongoSanitize({
  onSanitize: ({ key }) => {
    console.warn(`This request had a sanitized key: ${key}`);
  }
}));
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showsRouter);
app.use("/api/bookings", bookingRouter);

app.listen(8082, ()=>{
    console.log("Server is running and listening at 8082");
})
connectToDB();