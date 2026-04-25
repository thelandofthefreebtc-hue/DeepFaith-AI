import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Leaf, Cpu, Globe2, Building2, ChevronRight, TrendingUp } from 'lucide-react';

const CATEGORIES = [
  { id: '1', title: 'Climate Impact', icon: Leaf, return: '8.2%', risk: 'Medium', color: 'text-emerald-500 bg-emerald-50' },
  { id: '2', title: 'Global Tech', icon: Cpu, return: '12.4%', risk: 'High', color: 'text-blue-500 bg-blue-50' },
  { id: '3', title: 'Emerging Markets', icon: Globe2, return: '6.5%', risk: 'High', color: 'text-orange-500 bg-orange-50' },
  { id: '4', title: 'Stable Real Estate', icon: Building2, return: '4.1%', risk: 'Low', color: 'text-stone-500 bg-stone-100' },
];

export const Invest: React.FC = () => {
  const { profile } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-serif font-medium italic text-white italic">Asset Allocation</h2>
        <p className="text-muted text-sm mt-1">Institutional-grade micro-funds tailored for your profile.</p>
      </header>

      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {['Executive', 'Climate', 'Frontier', 'Shield'].map(f => (
          <button key={f} className="px-5 py-2 bg-surface border border-border rounded-lg text-[10px] font-black uppercase tracking-wider text-muted hover:text-brand hover:border-brand/50 transition-all">
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {CATEGORIES.map((cat) => (
          <motion.div
            key={cat.id}
            whileTap={{ scale: 0.98 }}
            className="minimal-card flex items-center justify-between group cursor-pointer bg-surface/40 hover:bg-surface/80"
          >
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity ${cat.color.replace('emerald-50', 'zinc-900').replace('blue-50', 'zinc-900').replace('orange-50', 'zinc-900').replace('stone-100', 'zinc-900')}`}>
                <cat.icon size={28} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-white italic">{cat.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                   <span className="text-[9px] uppercase font-bold tracking-widest text-muted">{cat.risk}</span>
                   <span className="w-1 h-1 bg-border rounded-full"></span>
                   <span className="text-[9px] uppercase font-bold tracking-widest text-brand flex items-center gap-1">
                     <TrendingUp size={10} /> {cat.return}
                   </span>
                </div>
              </div>
            </div>
            <ChevronRight className="text-border group-hover:text-brand transition-colors" size={20} />
          </motion.div>
        ))}
      </div>

      <section className="bg-gradient-to-br from-zinc-900 to-black border border-border text-white rounded-2xl p-7 mt-8 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand mb-3">Wealth Automator</p>
          <h3 className="text-2xl font-serif italic mb-3">Capital Harvest</h3>
          <p className="text-zinc-500 text-sm mb-6 leading-relaxed">Automatically reallocate task dividends and roundups into your primary node.</p>
          <button className="bg-brand text-black px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest active:scale-95 transition-transform shadow-lg shadow-brand/10">
            Activate Shield
          </button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/5 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};
