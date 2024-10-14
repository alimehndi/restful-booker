# restful_booker
A CRUD nodejs application to which uses all the API of Booker.

## run the code using these syntax

npm install

npm run start

## Fetch all API from:
 https://restful-booker.herokuapp.com/apidoc 


## API Endpoints
### Create Booking
#### Endpoint: POST 'booking/'

Description: Creates a new booking using the data provided in the request body. Returns the booked data or an error message if the operation fails.

### Get All Bookings
#### Endpoint: GET 'booking/'
Description: Retrieves a list of bookings, optionally filtered by query parameters. Returns the filtered list or an error message if the retrieval fails.

### Get Booking by ID
#### Endpoint: GET 'booking/:id'
Description: Fetches details of a specific booking using its unique ID. Returns the booking details or an error message if the operation fails.

### Update Booking by ID
#### Endpoint: PUT 'booking/:id'
Description: Updates the details of an existing booking identified by its unique ID. Returns the updated booking data or an error message if the update fails.

### Partially Update Booking by ID
#### Endpoint: PATCH 'booking/:id'
Description: Partially updates the details of an existing booking using its unique ID. Returns the partially updated data or an error message if the operation fails.

### Delete Booking by ID
#### Endpoint: DELETE 'booking/:id'
Description: Deletes a booking identified by its unique ID. Returns a confirmation message or an error message if the deletion fails.
