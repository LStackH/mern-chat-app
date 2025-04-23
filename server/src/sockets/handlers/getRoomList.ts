import { Server, Socket } from "socket.io";
import Room from "../../models/Room";
import type { RPCHandler } from "../types";

export const getRoomList: RPCHandler = async (
  io: Server,
  socket: Socket,
  params: any
) => {
  const rooms = await Room.find().lean();
  return rooms.map((r) => ({
    _id: r._id.toString(),
    name: r.name,
  }));
};
