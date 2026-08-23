import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Loader2, BookOpen, Lightbulb, HelpCircle } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestionContext?: string;
  initialSubject?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  initialQuestionContext,
  initialSubject = 'General JAMB UTME'
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `👋 Hello! I am **JAMB Master AI**, your personal UTME preparation mentor. 

I can help you:
• Break down difficult past questions step-by-step
• Clarify tricky concepts in Math, Physics, Chemistry, Biology, English & more
• Teach high-yield mnemonics and memory hacks
• Provide speed shortcuts for the JAMB CBT 8-key examination

What would you like to master today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If initial context is passed (e.g. from an active question explanation request)
  useEffect(() => {
    if (initialQuestionContext && isOpen) {
      handleSendPrompt(`Please explain this past question thoroughly: "${initialQuestionContext}"`);
    }
  }, [initialQuestionContext, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSendPrompt = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    playClickSound();
    const userMsg: Message = {
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          subject: initialSubject,
          history: messages.slice(-6)
        })
      });

      if (!res.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await res.json();
      const aiMsg: Message = {
        role: 'assistant',
        content: data.reply || 'Here is what you need to know for JAMB.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e: any) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ I had a brief network interruption. Please try asking your question again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'How do I calculate price elasticity of demand quickly?',
    'Explain the rule of concord for "Neither... Nor"',
    'What are the most repeated Physics formulas in JAMB?',
    'Give me a mnemonic for the reactivity series of metals'
  ];

  return (
    <div id="ai-tutor-backdrop" className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div id="ai-tutor-container" className="bg-[#FFF9F2] border-[3px] border-black rounded-3xl w-full max-w-2xl h-[85vh] flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-3.5 border-b-2 border-black flex items-center justify-between bg-[#6D28D9] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD100] text-black border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-base text-white">JAMB Master AI Tutor</h2>
                <span className="bg-[#FFD100] text-black text-[10px] uppercase font-black px-2 py-0.5 rounded border border-black">
                  Online
                </span>
              </div>
              <p className="text-xs font-bold text-purple-200">UTME Syllabus & Past Questions Specialist</p>
            </div>
          </div>
          <button
            id="btn-close-ai-tutor"
            onClick={onClose}
            className="text-white hover:bg-[#5B21B6] bg-[#4C1D95] border border-black p-2 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#FFF9F2]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-[#6D28D9] text-white border-2 border-black flex items-center justify-center shrink-0 mt-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed border-2 border-black ${
                  m.role === 'user'
                    ? 'bg-[#FFD100] text-[#1A1A1A] rounded-br-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-[#1A1A1A] rounded-bl-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                <div className="whitespace-pre-line prose prose-sm max-w-none text-[#1A1A1A] font-medium">
                  {m.content}
                </div>
                <div className={`text-[10px] font-bold mt-1.5 text-right ${m.role === 'user' ? 'text-slate-800' : 'text-slate-500'}`}>
                  {m.timestamp}
                </div>
              </div>
              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-[#FFD100] text-black border-2 border-black flex items-center justify-center shrink-0 mt-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-slate-700 text-xs">
              <div className="w-8 h-8 rounded-lg bg-[#6D28D9] text-white border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border-2 border-black px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold">
                <Loader2 className="w-4 h-4 animate-spin text-[#6D28D9]" />
                <span>JAMB AI is thinking and formulating step-by-step answer...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions (if conversation is fresh) */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 bg-white border-t-2 border-black flex items-center gap-2 overflow-x-auto text-xs scrollbar-thin">
            <span className="text-slate-700 shrink-0 flex items-center gap-1 font-black text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-orange-500 fill-orange-500" /> Suggested:
            </span>
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendPrompt(p)}
                className="whitespace-nowrap px-2.5 py-1 bg-[#FFF9F2] hover:bg-[#FFD100] text-[#1A1A1A] font-bold rounded-lg border-2 border-black transition text-[11px] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 border-t-2 border-black bg-white flex items-center gap-2">
          <input
            id="input-ai-tutor-message"
            type="text"
            placeholder="Ask about any JAMB question, formula, or exam strategy..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendPrompt();
            }}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-[#FFF9F2] border-2 border-black rounded-xl text-[#1A1A1A] font-bold focus:outline-none focus:ring-2 focus:ring-[#6D28D9]"
          />
          <button
            id="btn-send-ai-message"
            onClick={() => handleSendPrompt()}
            disabled={!input.trim() || loading}
            className="px-5 py-2.5 bg-[#6D28D9] hover:bg-[#5B21B6] disabled:opacity-50 text-white rounded-xl font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition flex items-center justify-center"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
