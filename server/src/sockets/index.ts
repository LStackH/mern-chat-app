import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  RPCMessage,
} from "./types";
import { rpcDispatcher } from "./rpcDispatcher";
import { addOnlineUser, removeOnlineUser } from "./onlineUsers";

export function initializeSockets(
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) {
  // — auth middleware —
  io.use((socket, next) => {
    const token = socket.handshake.auth.token as string | undefined;
    if (!token) return next(new Error("Auth token missing"));
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
      socket.data.user = { id: payload.userId, username: payload.username };
      return next();
    } catch {
      return next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id, socket.data.user.username);
    const me = { id: socket.data.user.id, username: socket.data.user.username };
    addOnlineUser(me);
    io.emit("rpc", {
      method: "userStatus",
      params: { userId: me.id, username: me.username, status: "online" },
    });

    // On rpc call from client, send the msg.method to rpcDispatcher to figure out what to do
    socket.on(
      "rpc",
      async (
        msg: RPCMessage,
        reply: (err: string | null, res?: any) => void
      ) => {
        const handler = rpcDispatcher[msg.method];
        if (!handler) {
          return reply(`Unknown RPC method: ${msg.method}`);
        }
        try {
          const result = await handler(io, socket, msg.params);
          return reply(null, result);
        } catch (err: any) {
          console.error("RPC handler error", err);
          return reply(err.message || "Internal error");
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      removeOnlineUser(me.id);
      io.emit("rpc", {
        method: "userStatus",
        params: { userId: me.id, status: "offline" },
      });
    });
  });
}
