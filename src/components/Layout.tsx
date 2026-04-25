import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, PieChart, Briefcase, GraduationCap, MessageSquare, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

export const Layout: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Home, label: t('dashboard') },
    { to: '/invest', icon: PieChart, label: t('invest') },
    { to: '/earn', icon: Briefcase, label: t('earn') },
    { to: '/learn', icon: GraduationCap, label: t('learn') },
    { to: '/advisor', icon: MessageSquare, label: t('advisor') },
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background overflow-x-hidden relative shadow-2xl border-x border-border">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-surface border border-border rounded-xl flex items-center justify-center relative shadow-inner">
            <div className="w-2 h-2 bg-brand rounded-full animate-pulse shadow-[0_0_8px_#D4AF37]"></div>
          </div>
          <div className="flex flex-col -gap-1">
            <span className="font-serif italic font-bold tracking-tight text-xl text-white">WorldWealth</span>
            <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-muted">Global Executive</span>
          </div>
        </div>
        <NavLink to="/profile">
          <motion.div whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full bg-surface flex items-center justify-center border border-border text-muted hover:text-brand transition-colors">
            <User size={18} />
          </motion.div>
        </NavLink>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="p-6"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background/90 backdrop-blur-xl border-t border-border px-3 py-4 z-50">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1.5 group transition-all px-2 py-1 relative ${
                  isActive ? 'text-brand' : 'text-muted'
                }`
              }
            >
              <item.icon size={20} className="transition-transform group-active:scale-90" />
              <span className="text-[8px] font-black tracking-[0.1em] uppercase">{item.label}</span>
              {location.pathname === item.to && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 w-8 h-0.5 bg-brand rounded-t-full shadow-[0_0_10px_#D4AF37]"
                />
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};
