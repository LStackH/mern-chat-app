import { useState, useRef, useEffect } from 'react';
import type { Room } from './RoomList';

interface Props {
  room: Room;
  onSelect: (room: Room) => void;
  onRename: (room: Room) => void;
  onDelete: (room: Room) => void;
}

export default function RoomListItem({ room, onSelect, onRename, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // close menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-200 rounded">
      <button
        className="flex-1 text-left"
        onClick={() => onSelect(room)}
      >
        {room.name}
      </button>

      <div className="relative" ref={menuRef}>
        <button
          className="p-1 hover:bg-gray-300 rounded"
          onClick={() => setOpen(o => !o)}
        >
          <button className="h-4 w-4"/>
        </button>

        {open && (
          <div className="absolute right-0 mt-1 w-28 bg-white border rounded shadow-lg z-10">
            <button
              className="block w-full text-left px-3 py-1 hover:bg-gray-100"
              onClick={() => { setOpen(false); onRename(room); }}
            >
              Rename
            </button>
            <button
              className="block w-full text-left px-3 py-1 hover:bg-gray-100 text-red-600"
              onClick={() => { setOpen(false); onDelete(room); }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
