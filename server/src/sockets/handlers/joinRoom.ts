import Room from "../../models/Room";
import type { RPCHandler } from "../types";

export const joinRoom: RPCHandler = async (io, socket, params) => {
  const { roomName } = params;
  if (!roomName || typeof roomName !== "string") {
    throw new Error("Invalid or missing roomName");
  }

  //find or create in DB
  let room = await Room.findOne({ name: roomName });
  let isNew = false;
  if (!room) {
    room = await Room.create({ name: roomName });
    isNew = true;
  }

  //join the socket to that room
  const roomId = room._id.toString();
  socket.join(roomId);

  //broadcast roomCreated if it’s new
  if (isNew) {
    io.emit("rpc", {
      method: "roomCreated",
      params: { room: { _id: roomId, name: room.name } },
    });
  }

  //send ack back to this client
  return { roomId, roomName: room.name };
};
