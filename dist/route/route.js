var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
// Importing the BookingService class to utilize its functions.
// The functions available are:
// 1. createBooking
// 2. getBooking
// 3. getBookingById
// 4. updateBookingById
// 5. partialUpdateBooking
// 6. deleteBookingById
import BookingService from '../bookingController/bookingController.js';
// Creating an instance of the BookingService class with the specified username and password.
const bookingService = new BookingService("admin", "password123");
const router = express.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Attempt to create a new booking using the provided booking data from the request body.
    // Respond with the booked data or an error message if the creation fails.
    try {
        const bookingData = req.body;
        console.log(bookingData);
        const bookedData = yield bookingService.createBooking(bookingData);
        res.status(200).send(bookedData);
    }
    catch (error) {
        const status = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
        const message = ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || 'Failed to create booking.';
        res.status(status).send(message);
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Fetch all bookings based on optional filtering parameters from the query string.
    // Respond with the filtered booking list or an error message if the retrieval fails.
    try {
        const filteredParams = req.query;
        const bookingIdArray = yield bookingService.getBooking(filteredParams);
        res.status(200).send(bookingIdArray);
    }
    catch (error) {
        const status = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
        const message = ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || 'Failed to get booking Details.';
        res.status(status).send(message);
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Retrieve details of a specific booking using its unique identifier from the URL parameters.
    // Respond with the booking details or an error message if the retrieval fails.
    try {
        const bookingId = req.params.id;
        const bookingDetails = yield bookingService.getBookingById(bookingId);
        res.status(200).send(bookingDetails.data);
    }
    catch (error) {
        const status = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
        const message = ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || 'Failed to get booking details of specific booking.';
        res.status(status).send(message);
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Update the details of an existing booking identified by its unique ID from the URL.
    // Respond with the updated booking data or an error message if the update fails.
    try {
        const updatedBookingData = req.body;
        const bookingid = req.params.id;
        const updatedBookedData = yield bookingService.updateBookingById(bookingid, updatedBookingData);
        res.status(200).send(updatedBookedData.data);
    }
    catch (error) {
        const status = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
        const message = ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || 'Failed to Update booking.';
        res.status(status).send(message);
    }
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Partially update the details of an existing booking identified by its unique ID.
    // Respond with the partially updated booking data or an error message if the update fails.
    try {
        const bookingId = req.params.id;
        const partialUpdatedBookingData = req.body;
        const partiallyUpdatedData = yield bookingService.partialUpdateBooking(bookingId, partialUpdatedBookingData);
        res.status(200).send(partiallyUpdatedData);
    }
    catch (error) {
        const status = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
        const message = ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || 'Failed to partial Update booking.';
        res.status(status).send(message);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Delete an existing booking identified by its unique ID from the URL.
    // Respond with a confirmation message or an error message if the deletion fails.
    try {
        const bookingid = req.params.id;
        const deletedBookingdata = yield bookingService.deleteBookingById(bookingid);
        res.status(200).send({ success: true, booking: "booking Deleted successfully", msg: deletedBookingdata });
    }
    catch (error) {
        const status = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
        const message = ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || 'Failed to delete booking.';
        res.status(status).send(message);
    }
}));
export { router as bookingServiceRouter };
