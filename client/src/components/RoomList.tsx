// src/components/RoomList.tsx
import React, { useState, useEffect } from 'react';
import type { Socket } from 'socket.io-client';

interface Room {
  _id: string;
  name: string;
}

interface RoomListProps {
  socket: Socket;
  onRoomSelected: (roomId: string, roomName: string) => void;
}

const RoomList: React.FC<RoomListProps> = ({ socket, onRoomSelected }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoomName, setNewRoomName] = useState('');

  useEffect(() => {
    //Fetch initial room list
    socket.emit(
      'rpc',
      { method: 'getRoomList', params: {} },
      (err: any, result: Room[]) => {
        if (err) console.error('Failed to load rooms:', err);
        else setRooms(result);
      }
    );

    //Listen for new rooms created by anyone
    const handleRpc = (msg: any) => {
      if (msg.method === 'roomCreated') {
        const room = msg.params.room as Room;
        setRooms((prev) => {
          // avoid dupes
          if (prev.some((r) => r._id === room._id)) return prev;
          return [...prev, room];
        });
      }
    };
    socket.on('rpc', handleRpc);

    return () => {
      socket.off('rpc', handleRpc);
    };
  }, [socket]);

  const handleJoin = (roomName: string) => {
    if (!roomName.trim()) return;
    socket.emit(
      'rpc',
      { method: 'joinRoom', params: { roomName: roomName} },
      (err: any, result: { roomId: string; roomName: string }) => {
        if (!err) {
          onRoomSelected(result.roomId, result.roomName);
          setNewRoomName('');
        }
      }
    );
  };

  return (
    <div className="flex flex-col w-1/6 min-w-[100px] h-full border-r overflow-hidden">
      {/* header */}
      <div className="flex-none p-4 text-xl font-semibold border-b bg-gray-100">
        Rooms
      </div>

      {/* scrollable list */}
      <ul className="flex-1 overflow-auto px-4 space-y-1 bg-gray-50">
        {rooms.map(r => (
          <li key={r._id}>
            <button
              className="w-full text-left p-2 hover:bg-gray-200 rounded"
              onClick={() => handleJoin(r.name)}
            >
              {r.name}
            </button>
          </li>
        ))}
      </ul>

      {/* footer (input) */}
      <div className="flex-none p-4 pr-2 border-t flex bg-gray-100">
        <input
          className="flex-1 min-w-0 border p-2 rounded-l"
          placeholder="New room…"
          value={newRoomName}
          onChange={e => setNewRoomName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleJoin(newRoomName)}
        />
        <button
          className="flex-shrink-0 ml-1 pl-2 pr-2 bg-blue-500 text-white rounded-r"
          onClick={() => handleJoin(newRoomName)}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default RoomList;
