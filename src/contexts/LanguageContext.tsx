import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es' | 'zh' | 'fr' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: 'Wealth Dashboard',
    invest: 'Portfolio',
    earn: 'AI Tasks',
    learn: 'Gamified Academy',
    advisor: 'AI Advisor',
    profile: 'Security',
    balance: 'Net Worth',
    opportunities: 'Micro-Investments',
    recentTasks: 'Available Rewards',
    riskLevel: 'Risk Profile',
    worldIdVerified: 'World ID Verified',
    startLearning: 'Continue Learning Path',
  },
  es: {
    dashboard: 'Panel de Riqueza',
    invest: 'Portafolio',
    earn: 'Tareas de IA',
    learn: 'Academia Gamificada',
    advisor: 'Asesor IA',
    profile: 'Seguridad',
    balance: 'Patrimonio Neto',
    opportunities: 'Micro-Inversiones',
    recentTasks: 'Recompensas Disponibles',
    riskLevel: 'Perfil de Riesgo',
    worldIdVerified: 'World ID Verificado',
    startLearning: 'Continuar Ruta de Aprendizaje',
  },
  zh: {
    dashboard: '财富看板',
    invest: '投资组合',
    earn: 'AI 任务',
    learn: '游戏化学院',
    advisor: 'AI 顾问',
    profile: '安全',
    balance: '净资产',
    opportunities: '微型投资',
    recentTasks: '可用奖励',
    riskLevel: '风险评估',
    worldIdVerified: 'World ID 已验证',
    startLearning: '继续学习路径',
  },
  fr: {
    dashboard: 'Tableau de bord',
    invest: 'Portefeuille',
    earn: 'Tâches IA',
    learn: 'Académie Ludique',
    advisor: 'Conseiller IA',
    profile: 'Sécurité',
    balance: 'Valeur Nette',
    opportunities: 'Micro-Investissements',
    recentTasks: 'Récompenses Disponibles',
    riskLevel: 'Profil de Risque',
    worldIdVerified: 'World ID Vérifié',
    startLearning: 'Continuer le Parcours',
  },
  de: {
    dashboard: 'Vermögen Dashboard',
    invest: 'Portfolio',
    earn: 'KI Aufgaben',
    learn: 'Spielerische Akademie',
    advisor: 'KI Berater',
    profile: 'Sicherheit',
    balance: 'Nettovermögen',
    opportunities: 'Mikro-Investitionen',
    recentTasks: 'Verfügbare Belohnungen',
    riskLevel: 'Risikoprofil',
    worldIdVerified: 'World ID Verifiziert',
    startLearning: 'Lernpfad fortsetzen',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
