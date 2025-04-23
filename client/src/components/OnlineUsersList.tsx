import React, { useState, useEffect } from 'react';
import type { Socket } from 'socket.io-client';

interface OnlineUser {
  id: string;
  username: string;
}

interface Props {
  socket: Socket;
}

const OnlineUsersList: React.FC<Props> = ({ socket }) => {
  const [users, setUsers] = useState<OnlineUser[]>([]);

  useEffect(() => {
    // 1) Fetch initial online users
    socket.emit(
      'rpc',
      { method: 'getOnlineUsersList', params: {} },
      (err: any, list: OnlineUser[]) => {
        if (!err) setUsers(list);
      }
    );

    // 2) Listen for online/offline pushes
    const handler = (msg: any) => {
      if (msg.method === 'userStatus') {
        const { userId, username, status } = msg.params as {
          userId: string;
          username?: string;
          status: 'online' | 'offline';
        };

        setUsers((prev) => {
          if (status === 'online') {
            if (prev.some((u) => u.id === userId)) return prev;
            return [...prev, { id: userId, username: username! }];
          } else {
            return prev.filter((u) => u.id !== userId);
          }
        });
      }
    };
    socket.on('rpc', handler);
    return () => {
      socket.off('rpc', handler);
    };
  }, [socket]);

  return (
    <div className="flex flex-col w-1/5 min-w-[150px] h-full border-l overflow-hidden">
      <div className="flex-none p-4 text-xl font-semibold border-b">
        Online Users
      </div>
      <ul className="flex-1 overflow-auto px-4 space-y-1">
        {users.map((u) => (
          <li
            key={u.id}
            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
          >
            <span>{u.username}</span>
            <span className="text-green-500 text-sm">●</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnlineUsersList;