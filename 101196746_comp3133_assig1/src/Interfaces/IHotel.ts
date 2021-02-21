import { Document } from "mongoose";

export interface IHotel extends Document {
  id: string;
  hotelName: String;
  street: String;
  city: String;
  postalCode: String;
  price: Number;
  email: String;
}
