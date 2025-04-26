import type { RPCHandler } from "./types";
import { sendRoomMessage } from "./handlers/sendRoomMessage";
import { joinRoom } from "./handlers/joinRoom";
import { getRoomList } from "./handlers/getRoomList";
import { getRoomHistory } from "./handlers/getRoomHistory";
import { getOnlineUsersList } from "./handlers/getOnlineUsersList";
import { renameRoom } from "./handlers/renameRoom";
import { deleteRoom } from "./handlers/deleteRoom";

// Defines the different functions that can happen from an rpc call, defined by the method attached
export const rpcDispatcher: Record<string, RPCHandler> = {
  sendRoomMessage,
  joinRoom,
  getRoomList,
  getRoomHistory,
  getOnlineUsersList,
  renameRoom,
  deleteRoom,
  //other methods…
};
