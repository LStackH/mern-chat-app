import { IUser, User } from "./User";
import { Schema, model, Document, Types } from "mongoose";

export interface IMessage extends Document {
  room: Types.ObjectId;
  sender: IUser;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    room: { type: Schema.Types.ObjectId, ref: "ChatRoom", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message = model<IMessage>("Message", messageSchema);
