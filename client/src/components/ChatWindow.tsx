import { useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';

export interface Message {
  _id: string;
  text: string;
  sender: { username: string };
}

interface ChatWindowProps {
  socket: Socket;
  roomId: string;
}

export default function ChatWindow({ socket, roomId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!socket) return;
  
    // fetch history once
    socket.emit(
      'rpc',
      { method: 'getRoomHistory', params: { roomId } },
      (err: any, history: Message[]) => {
        if (!err) setMessages(history);
      }
    );

    // listen for new messages
    const handler = ({ method, params }: any) => {
      if (method === 'newRoomMessage' && params.roomId === roomId) {
        setMessages((prev) => [...prev, params.message]);
      }
    };
    socket.on('rpc', handler);

    return () => {
      socket.off('rpc', handler);
    };
  }, [socket, roomId]);

  return (
    <div className="overflow-auto h-80 p-4 border">
      {messages.map((msg) => (
        <div key={msg._id} className="mb-2">
          <strong>{msg.sender.username}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
}
