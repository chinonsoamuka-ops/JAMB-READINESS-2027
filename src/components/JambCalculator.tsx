import React, { useState } from 'react';
import { X, Delete, RefreshCcw } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface JambCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JambCalculator: React.FC<JambCalculatorProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number>(0);
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(false);

  if (!isOpen) return null;

  const handleNumber = (num: string) => {
    playClickSound();
    if (overwrite || display === '0') {
      setDisplay(num);
      setOverwrite(false);
    } else {
      if (display.length < 12) {
        setDisplay(display + num);
      }
    }
  };

  const handleDecimal = () => {
    playClickSound();
    if (overwrite) {
      setDisplay('0.');
      setOverwrite(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    playClickSound();
    setDisplay('0');
    setPrevVal(null);
    setOperation(null);
    setOverwrite(false);
  };

  const handleBackspace = () => {
    playClickSound();
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleOp = (op: string) => {
    playClickSound();
    const current = parseFloat(display);
    if (prevVal === null) {
      setPrevVal(current);
    } else if (operation) {
      const result = compute(prevVal, current, operation);
      setPrevVal(result);
      setDisplay(String(result));
    }
    setOperation(op);
    setOverwrite(true);
  };

  const compute = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEquals = () => {
    playClickSound();
    if (operation && prevVal !== null) {
      const current = parseFloat(display);
      const result = compute(prevVal, current, operation);
      // Limit decimal places for display
      const formatted = Number.isInteger(result) ? String(result) : parseFloat(result.toFixed(6)).toString();
      setDisplay(formatted);
      setPrevVal(null);
      setOperation(null);
      setOverwrite(true);
    }
  };

  const handleSquareRoot = () => {
    playClickSound();
    const current = parseFloat(display);
    if (current >= 0) {
      const result = Math.sqrt(current);
      const formatted = Number.isInteger(result) ? String(result) : parseFloat(result.toFixed(6)).toString();
      setDisplay(formatted);
      setOverwrite(true);
    }
  };

  const handleSquare = () => {
    playClickSound();
    const current = parseFloat(display);
    const result = current * current;
    setDisplay(String(result));
    setOverwrite(true);
  };

  const handlePercent = () => {
    playClickSound();
    const current = parseFloat(display);
    setDisplay(String(current / 100));
    setOverwrite(true);
  };

  // Memory Functions
  const handleMemoryAdd = () => {
    playClickSound();
    setMemory(memory + parseFloat(display));
    setOverwrite(true);
  };

  const handleMemorySub = () => {
    playClickSound();
    setMemory(memory - parseFloat(display));
    setOverwrite(true);
  };

  const handleMemoryRecall = () => {
    playClickSound();
    setDisplay(String(memory));
    setOverwrite(true);
  };

  const handleMemoryClear = () => {
    playClickSound();
    setMemory(0);
  };

  return (
    <div id="jamb-calculator-modal" className="fixed bottom-6 right-6 z-50 w-80 bg-[#FFF9F2] text-[#1A1A1A] rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-[3px] border-black overflow-hidden select-none animate-in fade-in slide-in-from-bottom-5 duration-200">
      {/* Header */}
      <div className="bg-[#6D28D9] px-3.5 py-2.5 flex items-center justify-between border-b-2 border-black text-white">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FFD100] border border-black"></div>
          <span className="text-xs font-black uppercase tracking-wider">JAMB CBT Calculator</span>
        </div>
        <button
          id="btn-close-calc"
          onClick={onClose}
          className="text-white hover:bg-[#5B21B6] p-1 rounded-lg border border-black bg-[#4C1D95] transition"
          aria-label="Close calculator"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Screen */}
      <div className="p-3.5 bg-white border-b-2 border-black">
        <div className="flex items-center justify-between text-[11px] font-black text-slate-500 mb-1">
          <span>{memory !== 0 ? 'M' : ''}</span>
          <span>{prevVal !== null && operation ? `${prevVal} ${operation}` : ''}</span>
        </div>
        <div className="font-mono text-2xl font-black text-right text-[#1A1A1A] tracking-wider truncate py-1">
          {display}
        </div>
      </div>

      {/* Keys Grid */}
      <div className="p-3 grid grid-cols-4 gap-2 bg-[#FFF9F2] text-sm">
        {/* Row 1: Memory */}
        <button id="calc-mc" onClick={handleMemoryClear} className="bg-white hover:bg-[#FEF3C7] text-black font-black py-1.5 rounded-lg border-2 border-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">MC</button>
        <button id="calc-mr" onClick={handleMemoryRecall} className="bg-white hover:bg-[#FEF3C7] text-black font-black py-1.5 rounded-lg border-2 border-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">MR</button>
        <button id="calc-mplus" onClick={handleMemoryAdd} className="bg-white hover:bg-[#FEF3C7] text-black font-black py-1.5 rounded-lg border-2 border-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">M+</button>
        <button id="calc-mminus" onClick={handleMemorySub} className="bg-white hover:bg-[#FEF3C7] text-black font-black py-1.5 rounded-lg border-2 border-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">M-</button>

        {/* Row 2: Special Ops */}
        <button id="calc-sqrt" onClick={handleSquareRoot} className="bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#6D28D9] font-black py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">√</button>
        <button id="calc-sqr" onClick={handleSquare} className="bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#6D28D9] font-black py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">x²</button>
        <button id="calc-pct" onClick={handlePercent} className="bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#6D28D9] font-black py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">%</button>
        <button id="calc-c" onClick={handleClear} className="bg-[#FFE4E6] hover:bg-[#FECDD3] text-rose-950 font-black py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">C</button>

        {/* Row 3: 7 8 9 / */}
        <button id="calc-7" onClick={() => handleNumber('7')} className="bg-white hover:bg-slate-100 text-[#1A1A1A] font-black py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">7</button>
        <button id="calc-8" onClick={() => handleNumber('8')} className="bg-white hover:bg-slate-100 text-[#1A1A1A] font-black py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">8</button>
        <button id="calc-9" onClick={() => handleNumber('9')} className="bg-white hover:bg-slate-100 text-[#1A1A1A] font-black py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">9</button>
        <button id="calc-div" onClick={() => handleOp('÷')} className="bg-[#FFD100] hover:bg-[#FDE047] text-[#1A1A1A] font-black py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">÷</button>

        {/* Row 4: 4 5 6 * */}
        <button id="calc-4" onClick={() => handleNumber('4')} className="bg-white hover:bg-slate-100 text-[#1A1A1A] font-black py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">4</button>
        <button id="calc-5" onClick={() => handleNumber('5')} className="bg-white hover:bg-slate-100 text-[#1A1A1A] font-black py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">5</button>
        <button id="calc-6" onClick={() => handleNumber('6')} className="bg-white hover:bg-slate-100 text-[#1A1A1A] font-black py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">6</button>
        <button id="calc-mul" onClick={() => handleOp('×')} className="bg-[#FFD100] hover:bg-[#FDE047] text-[#1A1A1A] font-black py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">×</button>

        {/* Row 5: 1 2 3 - */}
        <button id="calc-1" onClick={() => handleNumber('1')} className="bg-white hover:bg-slate-100 text-[#1A1A1A] font-black py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">1</button>
        <button id="calc-2" onClick={() => handleNumber('2')} className="bg-white hover:bg-slate-100 text-[#1A1A1A] font-black py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">2</button>
        <button id="calc-3" onClick={() => handleNumber('3')} className="bg-white hover:bg-slate-100 text-[#1A1A1A] font-black py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">3</button>
        <button id="calc-sub" onClick={() => handleOp('-')} className="bg-[#FFD100] hover:bg-[#FDE047] text-[#1A1A1A] font-black py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">-</button>

        {/* Row 6: 0 . BS + */}
        <button id="calc-0" onClick={() => handleNumber('0')} className="bg-white hover:bg-slate-100 text-[#1A1A1A] font-black py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">0</button>
        <button id="calc-dot" onClick={handleDecimal} className="bg-white hover:bg-slate-100 text-[#1A1A1A] font-black py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">.</button>
        <button id="calc-bs" onClick={handleBackspace} className="bg-white hover:bg-slate-100 text-slate-700 font-black py-2 rounded-lg border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">
          <Delete className="w-4 h-4" />
        </button>
        <button id="calc-add" onClick={() => handleOp('+')} className="bg-[#FFD100] hover:bg-[#FDE047] text-[#1A1A1A] font-black py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">+</button>

        {/* Row 7: Equals */}
        <button id="calc-eq" onClick={handleEquals} className="col-span-4 bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-black py-2 rounded-lg mt-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition">
          =
        </button>
      </div>
    </div>
  );
};
