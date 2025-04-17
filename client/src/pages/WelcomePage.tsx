
import { useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';

export default function WelcomePage() {
  const socket = useSocket();
  const [currentRoom] = useState<string>('General'); // default "General"

  if (!socket) return <div>Connecting…</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Welcome to the chat!</h1>
      <ChatWindow socket={socket} roomId={currentRoom} />
      <ChatInput socket={socket} roomId={currentRoom} />
    </div>
  );
}
