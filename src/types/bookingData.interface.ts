// Interface representing the dates for a booking
export interface BookingDates {
  checkin: Date;
  checkout: Date;
}
// Interface representing the complete booking data all fields are required
export interface BookingData {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}
// Interface representing a partial set of booking data for partial updating
export interface PartialBookingData {
  firstname?: string;
  lastname?: string;
  totalprice?: number;
  depositpaid?: boolean;
  bookingdates?: BookingDates;
  additionalneeds?: string;
}
// Interface for filtering search results based on booking information any element can be optional
export interface filteredSearchElement {
  firstname?: string;
  lastname?: string;
  bookingdates?: BookingDates;
}