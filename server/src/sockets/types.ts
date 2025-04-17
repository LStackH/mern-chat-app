import { Server, Socket } from "socket.io";

export interface RPCMessage {
  method: string;
  params: any;
}
export interface JWTData {
  userId: string;
  username: string;
  isAdmin: boolean;
}

/**
 * Signature for every handler:
 *  - io: the Server instance (so you can broadcast, etc.)
 *  - socket: the current client socket
 *  - params: RPC params payload
 * Returns either a value (to send via reply) or throws on error.
 */
export type RPCHandler = (
  io: Server,
  socket: Socket,
  params: any
) => Promise<any>;

// The four type parameters for Server<EvtsFromClient, EvtsToClient, Inter, Data>:
export interface ClientToServerEvents {
  rpc: (
    msg: RPCMessage,
    reply: (err: string | null, result?: any) => void
  ) => void;
}
export interface ServerToClientEvents {
  rpc: (msg: RPCMessage) => void;
}
export interface InterServerEvents {}
export interface SocketData {
  user: { id: string; username: string };
}
