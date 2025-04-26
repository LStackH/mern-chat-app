import { Server, Socket } from "socket.io";
import type { RPCHandler } from "../types";
import ChatRoom from "../../models/Room";
import { Message } from "../../models/Message";

export const deleteRoom: RPCHandler = async (io, socket, params) => {
  const { roomId } = params;
  if (!roomId || typeof roomId !== "string") {
    throw new Error("Invalid parameters for deleteRoom");
  }

  // Delete the room
  const res = await ChatRoom.findByIdAndDelete(roomId);
  if (!res) {
    throw new Error("Room not found");
  }

  await Message.deleteMany({ room: roomId });

  const all = await ChatRoom.find().lean();
  const rooms = all.map((r) => ({
    _id: r._id.toString(),
    name: r.name,
  }));

  io.emit("rpc", {
    method: "roomsUpdated",
    params: { rooms },
  });

  return { success: true };
};
