import { Server, Socket } from "socket.io";
import type { RPCHandler } from "../types";
import ChatRoom from "../../models/Room";

export const renameRoom: RPCHandler = async (io, socket, params) => {
  const { roomId, newName } = params;
  if (!roomId || typeof newName !== "string" || !newName.trim()) {
    throw new Error("Invalid parameters for renameRoom");
  }

  // Update the room name
  const room = await ChatRoom.findByIdAndUpdate(
    roomId,
    { name: newName.trim() },
    { new: true }
  ).lean();
  if (!room) {
    throw new Error("Room not found");
  }

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
