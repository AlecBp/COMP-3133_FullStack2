import { gql } from "apollo-server-core";

export const schema = gql`
  type Hotel {
    id: ID
    hotelName: String!
    street: String!
    city: String!
    postalCode: String!
    price: Float!
    email: String!
    createdAt: String!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    createdAt: String!
  }

  type Booking {
    id: ID!
    bookingStart: String!
    bookingEnd: String!
    user: User!
    hotel: Hotel!
    createdAt: String!
  }

  input HotelInput {
    hotelName: String!
    street: String!
    city: String!
    postalCode: String!
    price: Float!
    email: String!
  }

  input UserInput {
    username: String!
    password: String!
    email: String!
  }

  input BookingInput {
    userId: ID!
    hotelId: ID!
    bookingStart: String!
    bookingEnd: String!
  }

  type Query {
    hotels: [Hotel]
    hotelByName(hotelName: String!): [Hotel]
    hotelByCity(city: String!): [Hotel]
    bookings(userId: ID!): [Booking]
    users: [User]
  }

  type Mutation {
    addHotel(hotelInput: HotelInput!): Hotel
    addUser(userInput: UserInput!): User
    addBooking(bookingInput: BookingInput!): Booking
  }
`;
