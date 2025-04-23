
export default function Footer() {
  return (
    <footer className="w-full bg-gray-200 text-gray-700 p-4 text-center absolute bottom-0">
      <p>{new Date().getFullYear()} MERN Chat</p>
    </footer>
  );
}