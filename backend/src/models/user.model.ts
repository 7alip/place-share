import { Document, Schema, model, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import { IPlace } from "./place.model";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  places: Array<IPlace["_id"]>;
}

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  places: [{ type: Types.ObjectId, required: true, ref: "Place" }],
});

User.plugin(uniqueValidator);

export default model<IUser>("User", User);
