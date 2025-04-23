import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ChatLayout() {
  return (
    <div className="relative h-screen flex flex-col">
        {/* TOP */}
        <Navbar />

        {/* Main area: flex-grow to fill, hide overflow */}
        <main className="flex-grow flex overflow-hidden pb-16">
        <Outlet />
        </main>

        {/* BOTTOM */}
        <Footer />
    </div>
  );
}
