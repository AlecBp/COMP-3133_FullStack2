import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import {
  BookingResolver,
  HotelResolver,
  UserResolver,
} from "./graphql/Resolvers";
import { schema } from "./graphql/Schema";

dotenv.config({
  path: ".env",
});

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: [HotelResolver, UserResolver, BookingResolver],
});

const app = express();

server.applyMiddleware({ app });

(async (port = process.env.APP_PORT || 4000) => {
  await mongoose
    .connect("mongodb://localhost:27017/fs1", {
      useNewUrlParser: true,
    })
    .then(() => console.log("Connected to DB"))
    .catch(() => console.log("Error connecting to DB"));

  app.listen(port, () => console.log(`> Listening on port ${port}`));
})();
