import type { RPCHandler } from "../types";
import { Message } from "../../models/Message";

export const getRoomHistory: RPCHandler = async (io, socket, params) => {
  const { roomId } = params;
  if (!roomId) {
    return;
  }
  if (typeof roomId !== "string") {
    throw new Error("Invalid roomId");
  }

  // Fetch and populate sender usernames, sorted oldest→newest
  const msgs = await Message.find({ room: roomId })
    .sort("createdAt")
    .populate<{ sender: { username: string; id: string } }>(
      "sender",
      "username"
    )
    .lean();

  return msgs.map((m) => ({
    _id: m._id.toString(),
    text: m.text,
    sender: {
      id: (m.sender as any)._id.toString(),
      username: m.sender.username,
    },
    createdAt: m.createdAt.toISOString(),
  }));
};
