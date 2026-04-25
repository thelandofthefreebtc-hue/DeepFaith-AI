import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ShieldCheck, ArrowUpRight, Plus, Globe, Sparkles } from 'lucide-react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';

const data = [
  { name: 'Mon', val: 1200 },
  { name: 'Tue', val: 1210 },
  { name: 'Wed', val: 1205 },
  { name: 'Thu', val: 1230 },
  { name: 'Fri', val: 1250 },
  { name: 'Sat', val: 1245 },
  { name: 'Sun', val: 1250.42 },
];

export const Home: React.FC = () => {
  const { profile, loading, verifyWorldId, user } = useAuth();
  const { t } = useLanguage();

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div>;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-8">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center border border-border shadow-2xl relative">
           <Globe size={48} className="text-brand opacity-80" />
           <div className="absolute inset-0 bg-brand/5 blur-2xl rounded-full"></div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold tracking-tight text-white italic">World Wealth</h1>
          <p className="text-muted text-sm max-w-[280px] leading-relaxed">Micro-investments and AI tasks for everyone, everywhere.</p>
        </div>
        <button 
          onClick={() => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider).catch(err => console.error("Sign-in failed:", err));
          }}
          className="bg-brand text-black px-10 py-3.5 rounded-full font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all active:scale-95"
        >
          Access Terminal
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Hero Balance */}
      <section className="relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand/5 blur-3xl rounded-full pointer-events-none"></div>
        <p className="text-muted text-[10px] font-bold tracking-[0.2em] uppercase mb-2">{t('balance')}</p>
        <div className="flex items-baseline gap-3">
          <h2 className="text-5xl font-serif font-medium tracking-tighter text-white italic">${profile?.totalBalance.toLocaleString()}</h2>
          <span className="text-brand text-sm font-bold flex items-center bg-brand/10 px-2 py-0.5 rounded">
            +4.25%
          </span>
        </div>
      </section>

      {/* Chart Section */}
      <section className="h-44 w-full bg-surface/30 rounded-3xl border border-border/50 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="val" stroke="#D4AF37" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </section>

      {/* World ID Callout */}
      {!profile?.worldIdVerified && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-surface border border-brand/20 p-6 rounded-2xl relative overflow-hidden group"
        >
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand/10 rounded-lg">
                <ShieldCheck className="text-brand" size={20} />
              </div>
              <h3 className="font-serif text-lg text-white">Elite Verification</h3>
            </div>
            <p className="text-muted text-xs leading-relaxed">
              Verify with <span className="text-white font-medium">World ID</span> to unlock institutional-grade limits and premium AI tasks.
            </p>
            <button 
              onClick={verifyWorldId}
              className="w-full bg-white text-black py-3 rounded-full text-xs font-black uppercase tracking-widest active:scale-95 transition-transform"
            >
              Verify Identity
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand/5 rounded-full blur-2xl"></div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <section className="grid grid-cols-2 gap-4">
        <div className="minimal-card flex flex-col justify-between h-36 bg-surface/50">
          <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-border">
            <Plus size={18} className="text-brand" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Portfolio</p>
            <p className="font-serif text-white italic">Add Assets</p>
          </div>
        </div>
        <div className="minimal-card flex flex-col justify-between h-36 border-brand/10">
          <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center border border-brand/20">
            <Sparkles size={18} className="text-brand" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">AI Hub</p>
            <p className="font-serif text-white italic">Start Task</p>
          </div>
        </div>
      </section>
    </div>
  );
};
