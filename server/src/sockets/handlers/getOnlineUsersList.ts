import type { RPCHandler } from "../types";
import { getOnlineUsers } from "../onlineUsers";

export const getOnlineUsersList: RPCHandler = async (_io, _socket, _params) => {
  return getOnlineUsers();
};
