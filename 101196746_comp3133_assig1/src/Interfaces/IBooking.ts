import { Document } from "mongoose";
import { IHotel } from "./IHotel";
import { IUser } from "./IUser";

export interface IBooking extends Document {
  id: String;
  bookingStart: String;
  bookingEnd: String;
  hotel: IHotel["id"];
  user: IUser["id"];
}
