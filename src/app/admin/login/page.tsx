'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, AlertCircle, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Authenticate with Supabase
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (!data.user) {
        throw new Error('Erreur de connexion');
      }

      // 2. Verify admin role
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('role, name')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('Profile error:', profileError);
        await supabase.auth.signOut();
        throw new Error('Profil utilisateur non trouvé');
      }

      // 3. Check if user is admin
      if (profile.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error('Accès refusé : vous n\'êtes pas administrateur');
      }

      // 4. Success - redirect to admin dashboard
      router.push('/admin/dashboard');
      router.refresh();
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-500/10 blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg shadow-primary-500/20 mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            Administration
          </h1>
          <p className="text-slate-400 text-lg">
            Connectez-vous pour gérer votre boutique
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-400">Échec de connexion</p>
                    <p className="text-sm text-red-300/90 mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300 ml-1">
                  Email administrateur
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@exemple.com"
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300 ml-1">
                  Mot de passe
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full group relative flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-primary-500 font-semibold text-lg transition-all duration-200 shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {loading ? (
                    <Loader2 className="h-5 w-5 text-primary-300 animate-spin" />
                  ) : (
                    <ArrowRight className="h-5 w-5 text-primary-300 group-hover:translate-x-1 transition-transform" />
                  )}
                </span>
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </form>
          </div>
          
          {/* Footer of Card */}
          <div className="px-8 py-4 bg-slate-900/50 border-t border-white/5 flex justify-center">
             <Link
              href="/"
              className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            >
              ← Retour à la boutique
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-slate-500 mt-8">
          Problème de connexion ? Contactez le support technique.
        </p>
      </div>
    </div>
  );
}
