import { Document, Schema, model, Types } from "mongoose";
import { IUser } from "./user.model";

export interface IPlace extends Document {
  title: string;
  description: string;
  coordinates: { lat: number; lng: number };
  address: string;
  creator: IUser["_id"];
  imageUrl: string;
}

const Place = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: Types.ObjectId, required: true, ref: "User" },
});

export default model<IPlace>("Place", Place);
