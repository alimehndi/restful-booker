import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { bookingServiceRouter } from "./route/route.js"; //// Importing the booking service routes
// Set the port to the value from environment variables or default to 8000
const port = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Use the bookingServiceRouter for any routes starting with '/booking'
app.use('/booking', bookingServiceRouter);
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running successfully at port ${port}`);
});
