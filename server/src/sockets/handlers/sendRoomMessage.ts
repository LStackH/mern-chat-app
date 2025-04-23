import type { RPCHandler } from "../types";
import { Message } from "../../models/Message";

export const sendRoomMessage: RPCHandler = async (io, socket, params) => {
  const { roomId, text } = params;
  if (!roomId || typeof text !== "string") {
    throw new Error("Invalid parameters for sendRoomMessage");
  }

  // Store to db
  const created = await Message.create({
    room: roomId,
    sender: socket.data.user.id,
    text,
  });

  // Populate sender’s username for the broadcast
  await created.populate<{ sender: { username: string } }>(
    "sender",
    "username"
  );

  // the outgoing message
  const message = {
    _id: created.id.toString(),
    text: created.text,
    sender: {
      id: created.sender.id.toString(),
      username: created.sender.username,
    },
    createdAt: created.createdAt.toISOString(),
  };

  // Broadcast only to that room
  io.to(roomId).emit("rpc", {
    method: "newRoomMessage",
    params: { roomId, message },
  });

  // Ack back the saved message
  return message;
};
