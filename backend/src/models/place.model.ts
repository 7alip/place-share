import { Document, Schema, model, Types } from "mongoose";
import { IUser } from "./user.model";

export interface IPlace extends Document {
  title: string;
  description: string;
  coordinates: { lat: number; lng: number };
  address: string;
  creator: IUser["_id"];
  image: string;
}

const Place = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: Types.ObjectId, required: true, ref: "User" },
});

export default model<IPlace>("Place", Place);
