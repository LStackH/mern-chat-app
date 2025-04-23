import { useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';

export interface Message {
  _id: string;
  text: string;
  sender: { id: string, username: string };
  createdAt: string;
}

interface ChatWindowProps {
  socket: Socket;
  roomId: string;
}

export default function ChatWindow({ socket, roomId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!socket || !roomId) {
      setMessages([]);
      return;
    }
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

  const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id;

  return (
    <div className="p-4 flex flex-col space-y-2 border-gray-500 scroll-">
      {messages.map((msg) => {
        const isMine = msg.sender.id === currentUserId;
        const alignment = isMine ? 'justify-start' : 'justify-end' ;
        const bgColor   = isMine ? 'bg-blue-200 border border-black' : 'bg-slate-200 border border-black' ;

        // format HH:MM
        const date = new Date(msg.createdAt).toLocaleDateString([], {
        });

        const time = new Date(msg.createdAt).toLocaleTimeString([], {
          hour:   '2-digit',
          minute: '2-digit',
          second: "2-digit",
        });


        return (
          <div key={msg._id} className={`flex ${alignment}`}>
            <div className={`${bgColor} p-2 rounded min-w-[10%] break-words whitespace-pre-wrap`}>
              <div className="flex border border-t-0 border-l-0 border-r-0 border-gray-500 items-baseline mb-2 space-x-2">
                <span className="text-lg font-semibold">{msg.sender.username}</span>
                <div className='flex-col items-baseline space-x-0.5'>
                  <span className="text-xs text-gray-500">( {date}</span>
                  <span className="text-xs text-gray-400">/</span>
                  <span className="text-xs text-gray-500">{time} )</span>
                </div>
              </div>
              <div className='mt-2 mb-1'>{msg.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
