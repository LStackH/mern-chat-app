import mongoose from "mongoose";
export interface IMessage {
  from: mongoose.Types.ObjectId;
  toRoom?: mongoose.Types.ObjectId;
  toUser?: mongoose.Types.ObjectId;
  content: string;
  timestamp: Date;
}
const MessageSchema = new mongoose.Schema<IMessage>({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  toRoom: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
export default mongoose.model<IMessage>("Message", MessageSchema);
