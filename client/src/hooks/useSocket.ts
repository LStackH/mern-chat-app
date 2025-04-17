import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../api/socket";
import type { Socket } from "socket.io-client";

export function useSocket(): Socket | null {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    let mounted = true;
    connectSocket()
      .then((s) => {
        if (mounted) setSocket(s);
      })
      .catch((err) => {
        console.error("Socket connection failed", err);
      });

    return () => {
      mounted = false;
      disconnectSocket();
    };
  }, []);

  return socket;
}
