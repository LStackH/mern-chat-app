import type { RPCHandler } from "./types";
import { sendRoomMessage } from "./handlers/sendRoomMessage";

export const rpcDispatcher: Record<string, RPCHandler> = {
  sendRoomMessage,
  // joinRoom,
  // sendDM,
  // …other methods…
};
