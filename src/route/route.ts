import express, { Request, Response } from 'express';
// Import the interfaces BookingData, FilteredSearchElement, and PartialBookingData for use in type definitions and data validation.
import { BookingData, filteredSearchElement, PartialBookingData } from '../types/bookingData.interface.js';
// Importing the BookingService class to utilize its functions.
// The functions available are:
// 1. createBooking
// 2. getBooking
// 3. getBookingById
// 4. updateBookingById
// 5. partialUpdateBooking
// 6. deleteBookingById

import BookingService from '../bookingController/bookingController.js'
// Creating an instance of the BookingService class with the specified username and password.
const bookingService = new BookingService("admin", "password123");

const router = express.Router();


router.post('/', async (req: Request, res: Response) => {
    // Attempt to create a new booking using the provided booking data from the request body.
    // Respond with the booked data or an error message if the creation fails.
    try {
        const bookingData: BookingData = req.body;
        console.log(bookingData);
        const bookedData = await bookingService.createBooking(bookingData);
        res.status(200).send(bookedData);
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Failed to create booking.';
        res.status(status).send(message);
    }
})
router.get('/', async (req: Request, res: Response) => {
    // Fetch all bookings based on optional filtering parameters from the query string.
    // Respond with the filtered booking list or an error message if the retrieval fails.
    try {
        const filteredParams: filteredSearchElement = req.query;
        const bookingIdArray = await bookingService.getBooking(filteredParams);
        res.status(200).send(bookingIdArray);
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Failed to get booking Details.';
        res.status(status).send(message);
    }
})
router.get('/:id', async (req: Request, res: Response) => {
    // Retrieve details of a specific booking using its unique identifier from the URL parameters.
    // Respond with the booking details or an error message if the retrieval fails.
    try {
        const bookingId: string = req.params.id;
        const bookingDetails = await bookingService.getBookingById(bookingId);
        res.status(200).send(bookingDetails.data);
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Failed to get booking details of specific booking.';
        res.status(status).send(message);
    }
})
router.put('/:id', async (req: Request, res: Response) => {
    // Update the details of an existing booking identified by its unique ID from the URL.
    // Respond with the updated booking data or an error message if the update fails.
    try {
        const updatedBookingData: BookingData = req.body;
        const bookingid: string = req.params.id;
        const updatedBookedData = await bookingService.updateBookingById(bookingid, updatedBookingData);
        res.status(200).send(updatedBookedData.data);
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Failed to Update booking.';
        res.status(status).send(message);
    }
})
router.patch('/:id', async (req: Request, res: Response) => {
    // Partially update the details of an existing booking identified by its unique ID.
    // Respond with the partially updated booking data or an error message if the update fails.
    try {
        const bookingId: string = req.params.id;
        const partialUpdatedBookingData: PartialBookingData = req.body;
        const partiallyUpdatedData = await bookingService.partialUpdateBooking(bookingId, partialUpdatedBookingData);
        res.status(200).send(partiallyUpdatedData);
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Failed to partial Update booking.';
        res.status(status).send(message);
    }
})
router.delete('/:id', async (req: Request, res: Response) => {
    // Delete an existing booking identified by its unique ID from the URL.
    // Respond with a confirmation message or an error message if the deletion fails.
    try {
        const bookingid: string = req.params.id;
        const deletedBookingdata = await bookingService.deleteBookingById(bookingid);
        res.status(200).send({success:true,booking:"booking Deleted successfully",msg:deletedBookingdata});
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Failed to delete booking.';
        res.status(status).send(message);
    }
})
export { router as bookingServiceRouter };