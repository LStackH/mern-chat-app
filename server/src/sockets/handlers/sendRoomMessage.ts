import { Server, Socket } from "socket.io";
import type { RPCHandler } from "../types";

export const sendRoomMessage: RPCHandler = async (io, socket, params) => {
  const { roomId, text } = params;
  if (!roomId || typeof text !== "string") {
    throw new Error("Invalid parameters for sendRoomMessage");
  }

  // Build (and in the future, persist) the message
  const message = {
    _id: Date.now().toString(),
    text,
    sender: socket.data.user, // word of caution: socket.data.user must be set in your auth middleware
    createdAt: new Date(),
  };

  // Broadcast to that room
  io.to(roomId).emit("rpc", {
    method: "newRoomMessage",
    params: { roomId, message },
  });

  // Return anything you want the sender’s ack to receive
  return { success: true };
};
