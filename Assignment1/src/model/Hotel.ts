import mongoose, { Schema } from "mongoose";
import { IHotel } from "../Interfaces/IHotel";

const HotelSchema: Schema = new Schema(
  {
    hotelName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    price: { type: Number, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IHotel>("Hotel", HotelSchema);
