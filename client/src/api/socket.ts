import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

/**
 * Connect a socket.io client.
 * Resolves once connected.
 */
export function connectSocket(): Promise<Socket> {
  return new Promise((resolve, reject) => {
    if (socket && socket.connected) {
      return resolve(socket);
    }

    socket = io("http://localhost:5000", {
      withCredentials: true,
      auth: { token: localStorage.getItem("token") },
    });

    socket.on("connect", () => resolve(socket!));
    socket.on("connect_error", (err) => reject(err));
  });
}

/** Cleanly disconnect */
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
