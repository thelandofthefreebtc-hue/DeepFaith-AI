import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Settings, Shield, Globe, LogOut, ChevronRight, Fingerprint } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export const Profile: React.FC = () => {
  const { profile, updateRisk, verifyWorldId } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const handleLogout = () => signOut(auth);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'zh', label: '中文' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
  ];

  const risks = [
    { level: 'low', label: 'Conservative' },
    { level: 'medium', label: 'Balanced' },
    { level: 'high', label: 'Aggressive' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-3xl bg-stone-100 flex items-center justify-center border border-stone-200 text-stone-400">
           <Fingerprint size={32} />
        </div>
        <div>
           <h2 className="text-xl font-bold tracking-tight">{profile?.displayName || 'Pioneer User'}</h2>
           <p className="text-stone-400 text-xs font-medium uppercase tracking-wider">{profile?.email}</p>
        </div>
      </header>

      {/* Security & Access */}
      <section className="space-y-3">
        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Security & Access</p>
        <div className="minimal-card flex items-center justify-between group cursor-pointer" onClick={verifyWorldId}>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center border border-stone-200">
                <Shield size={16} />
             </div>
             <span className="text-sm font-medium">World ID Verification</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${profile?.worldIdVerified ? 'bg-brand/10 text-brand' : 'bg-stone-100 text-stone-400'}`}>
              {profile?.worldIdVerified ? 'VERIFIED' : 'PENDING'}
            </span>
            <ChevronRight size={14} className="text-stone-300" />
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="space-y-4">
        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Preferences</p>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-500 ml-1">App Language</label>
          <div className="flex flex-wrap gap-2">
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  language === l.code ? 'bg-black text-white border-black' : 'bg-white text-stone-500 border-stone-200'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-500 ml-1">Risk Tolerance ({t('riskLevel')})</label>
          <div className="flex gap-2">
            {risks.map(r => (
              <button
                key={r.level}
                onClick={() => updateRisk(r.level as any)}
                className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${
                  profile?.riskTolerance === r.level ? 'bg-brand text-white border-brand' : 'bg-white text-stone-500 border-stone-200'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-4">
         <button 
           onClick={handleLogout}
           className="w-full py-4 border border-red-100 text-red-500 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 active:bg-red-50 transition-colors"
          >
           <LogOut size={16} /> Sign Out of Platform
         </button>
      </section>

      <p className="text-center text-[10px] text-stone-300 font-medium">GlobalWealth v1.0.4 • Secure Encryption Active</p>
    </div>
  );
};
