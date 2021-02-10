import mongoose, { Schema } from "mongoose";
import { IBooking } from "../Interfaces/IBooking";

const BookingSchema: Schema = new Schema(
  {
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookingStart: { type: Schema.Types.Date, required: true },
    bookingEnd: { type: Schema.Types.Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
