import type { Socket } from 'socket.io-client';
import ChatWindow from './ChatWindow';
import ChatInput  from './ChatInput';

interface Props {
  socket: Socket;
  roomId: string;
  roomName: string;
}

export default function ChatWindowLayout({ socket, roomId, roomName }: Props) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* room header */}
      <div className="flex-none p-4 text-xl font-semibold border-b bg-gray-100">
        {roomName || '— Select a room —'}
      </div>

      {/* scrollable chat history */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <ChatWindow socket={socket} roomId={roomId} />
      </div>

      {/* input area */}
      <div className="flex-none">
        <ChatInput socket={socket} roomId={roomId} />
      </div>
    </div>
  );
}
