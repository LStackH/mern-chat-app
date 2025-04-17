
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">
        <Link to="/welcome">MERN Chat</Link>
      </div>
      <div className='space-x-4'>
        <Link to="/login">login</Link>
        <Link to="/register">Register</Link>
      </div>
      <div className="space-x-4">
        <LogoutButton />
      </div>
    </nav>
  );
}