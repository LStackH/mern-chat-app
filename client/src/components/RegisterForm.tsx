import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, RegisterData } from '../api/authApi';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const registerData: RegisterData = { username, email, password };
    try {
      await register(registerData);
      navigate('/login');
    } catch (err: any) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm mx-auto">
      <h2 className="text-xl mb-4">Register</h2>

      {error && (
        <div className="mb-4 text-red-600 border border-red-200 p-2 rounded">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-2 text-white rounded ${
          loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
        } transition`}
      >
        {loading ? 'Registering…' : 'Register'}
      </button>
    </form>
  );
}
