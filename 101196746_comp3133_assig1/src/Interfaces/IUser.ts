import { Document } from "mongoose";

export interface IUser extends Document {
  id: String;
  username: String;
  password: String;
  email: String;
}
