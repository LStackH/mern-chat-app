import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 filter blur-3xl opacity-700 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #a4c6b8 0%, #5e435d 70%, #d1d5db 100%)',
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="z-10 flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}