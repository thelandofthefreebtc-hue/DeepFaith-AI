import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getFinancialAdvice } from '../services/geminiService';
import { motion } from 'motion/react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const Advisor: React.FC = () => {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hello ${profile?.displayName || 'Global Pioneer'}. I am your dedicated GlobalWealth AI. How can I assist with your wealth growth today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const advice = await getFinancialAdvice(userMessage, profile);
      setMessages(prev => [...prev, { role: 'assistant', content: advice }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "System error: Unable to Reach Advisor. Please check network." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <header className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">AI Wealth Advisor</h2>
        <p className="text-stone-500 text-sm">Personalized strategy powered by Gemini Intelligence.</p>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 pb-4 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
               <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${m.role === 'user' ? 'bg-black text-white border-black' : 'bg-white text-stone-400 border-stone-200'}`}>
                 {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
               </div>
               <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-stone-100 text-black rounded-tr-none' : 'bg-white border border-stone-200 shadow-sm rounded-tl-none'}`}>
                 <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                 </div>
               </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
               <div className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-400">
                 <Bot size={16} />
               </div>
               <div className="p-4 bg-white border border-stone-200 shadow-sm rounded-2xl rounded-tl-none flex gap-1">
                 <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-stone-300 rounded-full" />
                 <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-stone-300 rounded-full" />
                 <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-stone-300 rounded-full" />
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 relative">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about your portfolio..."
          className="w-full bg-white border border-stone-200 rounded-2xl px-5 py-4 pr-14 text-sm focus:outline-none focus:border-black transition-colors shadow-lg"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="absolute right-2 top-2 bottom-2 w-10 bg-black text-white rounded-xl flex items-center justify-center disabled:bg-stone-200 transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};
