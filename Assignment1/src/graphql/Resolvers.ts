import { IHotelInput } from "../Interfaces/IHotelInput";
import Hotel from "../model/Hotel";
import { IHotel } from "../Interfaces/IHotel";
import User from "../model/User";
import { IUserInput } from "../Interfaces/IUserInput";
import { IUser } from "../Interfaces/IUser";
import { IBookingInput } from "../Interfaces/IBookingInput";
import Booking from "../model/Booking";
import { IBooking } from "../Interfaces/IBooking";

export const HotelResolver = {
  Query: {
    hotels: () => {
      return Hotel.find({});
    },
    hotelByName: (_: any, args: any) => {
      return Hotel.find({ hotelName: args.hotelName });
    },
    hotelByCity: (_: any, args: any) => {
      return Hotel.find({ city: args.city });
    },
  },
  Mutation: {
    addHotel: async (_: any, args: any) => {
      const {
        hotelName,
        street,
        city,
        postalCode,
        price,
        email,
      }: IHotelInput = args.hotelInput;

      const newHotel: IHotel = await Hotel.create({
        hotelName,
        street,
        city,
        postalCode,
        price,
        email,
      });

      return newHotel.save();
    },
  },
};

export const BookingResolver = {
  Query: {
    bookings: (_: any, args: any) => {
      return Booking.find({ user: args.userId });
    },
  },
  Mutation: {
    addBooking: async (_: any, args: any) => {
      const {
        hotelId,
        userId,
        bookingEnd,
        bookingStart,
      }: IBookingInput = args.bookingInput;

      const newBooking: IBooking = await Booking.create({
        hotel: hotelId,
        user: userId,
        bookingEnd,
        bookingStart,
      });

      return newBooking.save();
    },
  },
  Booking: {
    hotel: async (parent: any) => {
      return (await parent.populate("hotel").execPopulate()).hotel;
    },
    user: async (parent: any) => {
      return (await parent.populate("user").execPopulate()).user;
    },
  },
};

export const UserResolver = {
  Query: {
    users: () => {
      return User.find();
    },
  },
  Mutation: {
    addUser: async (_: any, args: any) => {
      const { username, password, email }: IUserInput = args.userInput;

      const newUser: IUser = await User.create({
        username,
        password,
        email,
      });

      return newUser.save();
    },
  },
};
