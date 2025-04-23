import { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import ChatWindowLayout from '../components/ChatWindowLayout';
import RoomList from '../components/RoomList';
import OnlineUsersList from '../components/OnlineUsersList';

export default function WelcomePage() {
  const socket = useSocket();
  const [currentRoomId, setCurrentRoomId] = useState<string>('');
  const [currentRoomName, setCurrentRoomName] = useState<string>('');

  useEffect(() => {
    if (!socket) return;
    socket.emit(
      'rpc',
      { method: 'joinRoom', params: { roomName: 'General' } }, // Default general
      (err: any, result: { roomId: string; roomName: string }) => {
        if (!err) {
          setCurrentRoomId(result.roomId);
          setCurrentRoomName(result.roomName);
        }
      }
    );
  }, [socket]);

  if (!socket) return <div>Connecting…</div>;

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <RoomList
        socket={socket}
        onRoomSelected={(id, name) => {
          setCurrentRoomId(id);
          setCurrentRoomName(name);
        }}
      />

      <ChatWindowLayout
        socket={socket}
        roomId={currentRoomId}
        roomName={currentRoomName}
      />

      <OnlineUsersList socket={socket}></OnlineUsersList>
    </div>
  );
}
