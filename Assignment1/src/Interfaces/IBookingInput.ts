import { IHotel } from "./IHotel";
import { IUser } from "./IUser";

export interface IBookingInput {
  bookingStart: String;
  bookingEnd: String;
  hotelId: IHotel["id"];
  userId: IUser["id"];
}
