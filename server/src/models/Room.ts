import mongoose from "mongoose";
export interface IRoom {
  name: string;
}
const RoomSchema = new mongoose.Schema<IRoom>({
  name: { type: String, required: true, unique: true },
});
export default mongoose.model<IRoom>("Room", RoomSchema);
