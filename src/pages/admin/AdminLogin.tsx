import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Building2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function AdminLogin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal-950 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm bg-gold-500/10 border border-gold-500/20 mb-6">
            <Building2 size={28} className="text-gold-500" />
          </div>
          <h1 className="font-serif text-3xl font-light text-ivory-50 tracking-wide">
            Admin Access
          </h1>
          <p className="mt-3 text-sm font-sans font-light text-ivory-200/50">
            Sign in to manage your hotel website
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-charcoal-900 rounded-sm p-8 shadow-2xl border border-charcoal-700">
          {error && (
            <div className="mb-6 px-4 py-3 rounded-sm bg-red-500/10 border border-red-500/20 text-sm font-sans text-red-400">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/50 mb-3">
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory-200/30" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hotel.com"
                className="w-full pl-11 pr-4 py-3.5 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-xs font-sans font-medium uppercase tracking-wide-lg text-ivory-200/50 mb-3">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory-200/30" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-charcoal-800 border border-charcoal-700 rounded-sm text-ivory-50 font-sans font-light text-sm placeholder:text-ivory-200/20 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gold-500 text-white text-sm font-sans font-medium tracking-wide-lg rounded-sm hover:bg-gold-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? 'Signing in...' : 'Sign In'}
            {!loading && (
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs font-sans font-light text-ivory-200/30">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
