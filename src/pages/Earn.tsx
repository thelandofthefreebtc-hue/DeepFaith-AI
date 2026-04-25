import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Briefcase, CheckCircle2, Star, Clock, AlertCircle } from 'lucide-react';
import { EarningTask } from '../types';

const MOCK_TASKS: EarningTask[] = [
  { id: '1', title: 'Spanish Sentiment Analysis', description: 'Label emotional tone in client support emails from Mexico dialect.', reward: 12.50, type: 'linguistics', difficulty: 'Easy' },
  { id: '2', title: 'Medical Text Annotation', description: 'Highlight symptoms and diagnoses in anonymized patient notes.', reward: 45.00, type: 'annotation', difficulty: 'Hard' },
  { id: '3', title: 'Logo Rating & Feedback', description: 'Provide qualitative ratings for new micro-banking brand logos.', reward: 5.25, type: 'rating', difficulty: 'Easy' },
  { id: '4', title: 'Technical Doc Translation (DE-EN)', description: 'Translate investment terms from German to high-level English.', reward: 28.00, type: 'linguistics', difficulty: 'Medium' },
];

export const Earn: React.FC = () => {
  const { profile } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-serif font-medium italic text-white">Task Terminal</h2>
        <p className="text-muted text-sm mt-1">Monetize linguistic precision for global AI nodes.</p>
      </header>

      {!profile?.worldIdVerified && (
        <div className="bg-zinc-900 border border-brand/20 p-5 rounded-2xl flex gap-4 items-start shadow-inner">
          <div className="p-2 bg-brand/10 rounded-full">
            <AlertCircle className="text-brand shadow-[0_0_10px_#D4AF37]" size={20} />
          </div>
          <div className="text-xs">
            <p className="font-bold text-white mb-1 uppercase tracking-widest">Verification Required</p>
            <p className="text-muted leading-relaxed">Identity verification via <span className="text-brand">World ID</span> is mandatory for high-tier linguistic nodes.</p>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {MOCK_TASKS.map((task) => (
          <motion.div
            key={task.id}
            whileTap={{ scale: 0.98 }}
            className="minimal-card relative group cursor-pointer bg-surface/40 hover:bg-surface border-border/50"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className={`text-[8px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded border ${
                    task.difficulty === 'Easy' ? 'border-brand text-brand' : 
                    task.difficulty === 'Medium' ? 'border-muted text-muted' : 
                    'border-red-900/50 text-red-500'
                  }`}>
                    {task.difficulty}
                  </span>
                  <span className="text-[8px] font-black tracking-[0.2em] uppercase text-muted">
                    {task.type}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-white italic">{task.title}</h3>
              </div>
              <div className="text-right">
                <p className="font-serif text-xl text-brand italic tracking-tight">+${task.reward.toFixed(2)}</p>
                <p className="text-[8px] font-bold text-muted uppercase tracking-widest mt-1">Per Execution</p>
              </div>
            </div>
            
            <p className="text-muted text-xs leading-relaxed mb-6 border-l border-border pl-4 italic">{task.description}</p>
            
            <div className="flex items-center gap-5 text-muted text-[9px] font-black uppercase tracking-[0.1em]">
              <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand/50" /> 12 MINS</span>
              <span className="flex items-center gap-1.5"><Star size={12} className="text-brand/50" /> 4.9 AVG</span>
            </div>
            
            <div className="absolute right-6 bottom-6 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
              <div className="bg-brand text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand/20">Execute</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
