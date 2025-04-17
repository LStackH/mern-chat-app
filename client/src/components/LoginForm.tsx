import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, LoginCredentials } from '../api/authApi';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const creds: LoginCredentials = { email, password };
    try {
      const { token, user } = await login(creds);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/welcome');
    } catch (err: any) {
      console.error(err);
      // Try to read a server‑sent message, or fallback to generic
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong, please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm mx-auto">
      <h2 className="text-xl mb-4">Login</h2>

      {error && (
        <div className="mb-4 text-red-600 border border-red-200 p-2 rounded">
          {error}
        </div>
      )}

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
        className={`w-full p-2 text-white rounded transition ${
          loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {loading ? 'Logging in…' : 'Login'}
      </button>
    </form>
  );
}
