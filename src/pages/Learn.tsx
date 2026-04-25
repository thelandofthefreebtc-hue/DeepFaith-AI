import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { BookOpen, Trophy, Target, Zap, ChevronRight } from 'lucide-react';

const MODULES = [
  { id: '1', title: 'The Power of Compounding', xp: 120, completed: true, color: 'border-brand' },
  { id: '2', title: 'Diversification 101', xp: 200, completed: false, color: 'border-stone-200' },
  { id: '3', title: 'Market Sentiment Analysis', xp: 350, completed: false, color: 'border-stone-200' },
  { id: '4', title: 'Global Macro Trends', xp: 500, completed: false, color: 'border-stone-200' },
];

export const Learn: React.FC = () => {
  const { profile } = useAuth();

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end border-b border-border pb-6">
        <div>
          <h2 className="text-3xl font-serif font-medium italic text-white italic">Knowledge Vault</h2>
          <p className="text-muted text-sm mt-1">Strategic mastery of global markets.</p>
        </div>
        <div className="text-right">
           <p className="text-[8px] font-black uppercase tracking-[0.3em] text-brand mb-1">Elite Level</p>
           <p className="text-2xl font-serif italic text-white tracking-tighter">{profile?.xp || 840} <span className="text-[10px] font-sans font-black text-muted not-italic uppercase ml-1">XP</span></p>
        </div>
      </header>

      {/* Progress Path */}
      <div className="space-y-8 relative">
        <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-brand/50 to-transparent z-0 opacity-30"></div>
        {MODULES.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-7 relative z-10`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-4 border-background shadow-2xl transition-all duration-500 ${m.completed ? 'bg-brand text-black shadow-brand/20' : 'bg-surface text-muted border-border'}`}>
               {m.completed ? <Trophy size={24} /> : <BookOpen size={24} />}
            </div>
            
            <div className={`flex-1 minimal-card !p-5 flex justify-between items-center bg-surface/50 border-border/50 hover:border-brand/40 transition-colors ${m.completed ? 'opacity-50' : ''}`}>
               <div>
                  <h3 className="font-serif text-base text-white italic">{m.title}</h3>
                  <p className="text-[9px] font-black text-brand uppercase tracking-[0.2em] mt-1.5 underline decoration-brand/30 underline-offset-4">UNLOCKS {m.xp} XP</p>
               </div>
               {!m.completed && <ChevronRight size={18} className="text-brand/50" />}
               {m.completed && <Zap size={18} className="text-brand" />}
            </div>
          </motion.div>
        ))}
      </div>

      <section className="bg-surface/30 border border-border rounded-2xl p-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <Target className="absolute -right-6 -bottom-6 text-brand/5 h-40 w-40" />
        <div className="relative z-10">
          <h4 className="font-serif text-xl text-white italic mb-3">Daily Strategic Simulation</h4>
          <p className="text-muted text-xs leading-relaxed mb-6 max-w-[80%]">Optimize a 100k portfolio for stagnation phase. Success triggers a <span className="text-brand">Linguistic Multiplier</span> for 24 hours.</p>
          <button className="text-[10px] font-black uppercase tracking-[0.2em] text-white border-b-2 border-brand pb-1 transition-all hover:text-brand">Initialize Simulation</button>
        </div>
      </section>
    </div>
  );
};
