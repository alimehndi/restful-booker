import axios from 'axios';
// Import the interfaces BookingData, FilteredSearchElement, and PartialBookingData for use in type definitions and data validation.
import { BookingData, filteredSearchElement, PartialBookingData } from '../types/bookingData.interface.js';
import dotenv from 'dotenv';
//env file is used so that without changing the production code we can change the fetching(API URL) address if required in future.
dotenv.config();

// Class representing the Booking Service, implementing object-oriented programming principles.
class BookingService {

    // Private variables are utilized to restrict access from outside the class.
    private apiURL: string | null;
    private token: string | null;

    // The constructor automatically initializes the values of apiUrl and token.
    constructor(username: string, password: string) {
        this.apiURL = process.env.API_URL || null;
        this.token = null;
        this.autheticate(username, password);
    }
    // To minimize code duplication.
    private getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(this.token && { 'Cookie': `token=${this.token}` }), // Include token if available
        };
    }

    // Function to authenticate the user and generate an access token.
    public async autheticate(username: string, password: string): Promise<any> {
        try {

            const authResponse: any = await axios.post(`${this.apiURL}/auth`, {
                username: username, password: password, headers: this.getHeaders()
            });
            this.token = authResponse.data.token;
            console.log("Successfully autheticated and Token Generated")
        } catch (error: any) {
            console.log('Error during authentication :', error.response ? error.response.data : error.message);
            throw {
                message: error.response?.data?.message || 'Failed to authenticate',
                status: error.response?.status || 500
            };
        }
    }

    // Function to create a booking using the provided booking data.
    public async createBooking(bookingData: BookingData): Promise<any> {
        try {
            const createdBookingResponse: any = await axios.post(`${this.apiURL}/booking`,
                bookingData,
                {
                    headers: this.getHeaders()
                });

            console.log('Booking Created Successfully');
            return createdBookingResponse.data;
        } catch (error: any) {
            console.log('Error during booking  :', error.response ? error.response.data : error.message);
            throw {
                message: error.response?.data?.message || 'Failed to create Booking',
                status: error.response?.status || 500
            };
        }
    }

    // Function to retrieve all booking IDs. 
    // Optionally, it can filter results by querying based on first name, last name, check-in date, or check-out date.

    public async getBooking(filteredParams: filteredSearchElement): Promise<any> {
        try {
            const BookingDetails: any = await axios.get(`${this.apiURL}/booking`, {
                params: filteredParams,
                headers: this.getHeaders()
            });
            return BookingDetails.data;
        } catch (error: any) {
            console.log('Error getting booking  :', error.response ? error.response.data : error.message);
            throw {
                message: error.response?.data?.message || 'Failed to getBookings',
                status: error.response?.status || 500
            };
        }
    }

    // Function to retrieve the details of a specific booking using its unique booking ID.
    public async getBookingById(bookingId: string): Promise<any> {
        try {
            const BookingDetails: any = await axios.get(`${this.apiURL}/booking/${bookingId}`, {
                headers: this.getHeaders()
            });
            return BookingDetails;
        } catch (error: any) {
            console.log('Error getting booking  :', error.response ? error.response.data : error.message);
            throw {
                message: error.response?.data?.message || 'Failed to getBooking by specific Id',
                status: error.response?.status || 500
            };
        }
    }

    // Function to update all booking details by providing the complete set of booking information along with the unique booking ID.
    public async updateBookingById(bookingId: string, updatedBookingData: BookingData): Promise<any> {
        try {
            console.log(bookingId)
            console.log(updatedBookingData)
            const updatingBookingDataResponse = await axios.put(`${this.apiURL}/booking/${bookingId}`, updatedBookingData,
                {
                    headers: this.getHeaders()
                })
            console.log('Booking Updated Successfully');
            return updatingBookingDataResponse;
        } catch (error: any) {
            console.log('Error during updating  :', error.response ? error.response.data : error.message);
            throw {
                message: error.response?.data?.message || 'Failed to update Booking',
                status: error.response?.status || 500
            };
        }
    }


    //function to update partially booking details providing some of  the booking deatails with updation and by providng unique bookingid
    public async partialUpdateBooking(bookingId: string, partialUpdatedData: PartialBookingData): Promise<any> {
        try {
            const partialUpdatedDataResponse = await axios.patch(`${this.apiURL}/booking/${bookingId}`, partialUpdatedData, {
                headers: this.getHeaders()
            })
            console.log("Booking Data successfully Upadated");
            return partialUpdatedDataResponse.data;
        } catch (error: any) {
            console.log('Error during partial updating  :', error.response ? error.response.data : error.message);
            throw {
                message: error.response?.data?.message || 'Failed to partially update the booking',
                status: error.response?.status || 500
            };
        }


    }

    // Deleting a specific booking using the associated booking ID
    public async deleteBookingById(bookingId: string): Promise<any> {
        try {
            const deletingBookingResponse = await axios.delete(`${this.apiURL}/booking/${bookingId}`, {
                headers: this.getHeaders()
            })
            console.log(`Booking Deleted successfully of ${bookingId}`);
            return deletingBookingResponse.data;

        } catch (error: any) {
            console.log('Error during deleting  :', error.response ? error.response.data : error.message);
            throw {
                message: error.response?.data?.message || 'Failed to delete the booking',
                status: error.response?.status || 500
            };
        }
    }

}
export default BookingService;