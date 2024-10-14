var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import dotenv from 'dotenv';
//env file is used so that without changing the production code we can change the fetching(API URL) address if required in future.
dotenv.config();
// Class representing the Booking Service, implementing object-oriented programming principles.
class BookingService {
    // The constructor automatically initializes the values of apiUrl and token.
    constructor(username, password) {
        this.apiURL = process.env.API_URL || null;
        this.token = null;
        this.autheticate(username, password);
    }
    // To minimize code duplication.
    getHeaders() {
        return Object.assign({ 'Content-Type': 'application/json', 'Accept': 'application/json' }, (this.token && { 'Cookie': `token=${this.token}` }));
    }
    // Function to authenticate the user and generate an access token.
    autheticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const authResponse = yield axios.post(`${this.apiURL}/auth`, {
                    username: username, password: password, headers: this.getHeaders()
                });
                this.token = authResponse.data.token;
                console.log("Successfully autheticated and Token Generated");
            }
            catch (error) {
                console.log('Error during authentication :', error.response ? error.response.data : error.message);
                throw {
                    message: ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Failed to authenticate',
                    status: ((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) || 500
                };
            }
        });
    }
    // Function to create a booking using the provided booking data.
    createBooking(bookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const createdBookingResponse = yield axios.post(`${this.apiURL}/booking`, bookingData, {
                    headers: this.getHeaders()
                });
                console.log('Booking Created Successfully');
                return createdBookingResponse.data;
            }
            catch (error) {
                console.log('Error during booking  :', error.response ? error.response.data : error.message);
                throw {
                    message: ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Failed to create Booking',
                    status: ((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) || 500
                };
            }
        });
    }
    // Function to retrieve all booking IDs. 
    // Optionally, it can filter results by querying based on first name, last name, check-in date, or check-out date.
    getBooking(filteredParams) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const BookingDetails = yield axios.get(`${this.apiURL}/booking`, {
                    params: filteredParams,
                    headers: this.getHeaders()
                });
                return BookingDetails.data;
            }
            catch (error) {
                console.log('Error getting booking  :', error.response ? error.response.data : error.message);
                throw {
                    message: ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Failed to getBookings',
                    status: ((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) || 500
                };
            }
        });
    }
    // Function to retrieve the details of a specific booking using its unique booking ID.
    getBookingById(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const BookingDetails = yield axios.get(`${this.apiURL}/booking/${bookingId}`, {
                    headers: this.getHeaders()
                });
                return BookingDetails;
            }
            catch (error) {
                console.log('Error getting booking  :', error.response ? error.response.data : error.message);
                throw {
                    message: ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Failed to getBooking by specific Id',
                    status: ((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) || 500
                };
            }
        });
    }
    // Function to update all booking details by providing the complete set of booking information along with the unique booking ID.
    updateBookingById(bookingId, updatedBookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                console.log(bookingId);
                console.log(updatedBookingData);
                const updatingBookingDataResponse = yield axios.put(`${this.apiURL}/booking/${bookingId}`, updatedBookingData, {
                    headers: this.getHeaders()
                });
                console.log('Booking Updated Successfully');
                return updatingBookingDataResponse;
            }
            catch (error) {
                console.log('Error during updating  :', error.response ? error.response.data : error.message);
                throw {
                    message: ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Failed to update Booking',
                    status: ((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) || 500
                };
            }
        });
    }
    //function to update partially booking details providing some of  the booking deatails with updation and by providng unique bookingid
    partialUpdateBooking(bookingId, partialUpdatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const partialUpdatedDataResponse = yield axios.patch(`${this.apiURL}/booking/${bookingId}`, partialUpdatedData, {
                    headers: this.getHeaders()
                });
                console.log("Booking Data successfully Upadated");
                return partialUpdatedDataResponse.data;
            }
            catch (error) {
                console.log('Error during partial updating  :', error.response ? error.response.data : error.message);
                throw {
                    message: ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Failed to partially update the booking',
                    status: ((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) || 500
                };
            }
        });
    }
    // Deleting a specific booking using the associated booking ID
    deleteBookingById(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const deletingBookingResponse = yield axios.delete(`${this.apiURL}/booking/${bookingId}`, {
                    headers: this.getHeaders()
                });
                console.log(`Booking Deleted successfully of ${bookingId}`);
                return deletingBookingResponse.data;
            }
            catch (error) {
                console.log('Error during deleting  :', error.response ? error.response.data : error.message);
                throw {
                    message: ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Failed to delete the booking',
                    status: ((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) || 500
                };
            }
        });
    }
}
export default BookingService;
