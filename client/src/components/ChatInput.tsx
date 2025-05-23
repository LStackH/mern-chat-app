import { useState } from 'react';
import type { Socket } from 'socket.io-client';

interface ChatInputProps {
  socket: Socket;
  roomId: string;
}

export default function ChatInput({ socket, roomId }: ChatInputProps) {
  const [text, setText] = useState('');

  const send = () => {
    if (!text.trim()) return;
    socket.emit(
      'rpc',
      { method: 'sendRoomMessage', params: { roomId, text } },
      (err: any) => {
        if (err) console.error(err);
      }
    );
    setText('');
  };

  return (
    <div className="flex-none p-4 border-t flex bg-gray-100 ">
      <input
        className="flex-1 min-w-0 border p-2 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && send()}
        placeholder="Type a message…"
      />
      <button
        className="flex-shrink-0 min-w-0 ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={send}
      >
        Send
      </button>
    </div>
  );
}
