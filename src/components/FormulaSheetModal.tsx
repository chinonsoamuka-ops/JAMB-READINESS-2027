import React, { useState } from 'react';
import { X, Search, BookOpen, Atom, Calculator, TrendingUp, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface FormulaSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormulaItem {
  subject: 'Mathematics' | 'Physics' | 'Chemistry' | 'Economics';
  category: string;
  title: string;
  formula: string;
  explanation: string;
  units?: string;
}

const FORMULAS_DATA: FormulaItem[] = [
  // MATHEMATICS
  {
    subject: 'Mathematics',
    category: 'Algebra & Calculus',
    title: 'Quadratic Formula (Roots)',
    formula: 'x = [-b ± √(b² - 4ac)] / (2a)',
    explanation: 'Finds roots of ax² + bx + c = 0. Discriminant Δ = b² - 4ac (Δ > 0: two real roots; Δ = 0: one real root; Δ < 0: complex roots).'
  },
  {
    subject: 'Mathematics',
    category: 'Sequences & Series',
    title: 'nth Term & Sum of AP',
    formula: 'T_n = a + (n - 1)d\nS_n = n/2 [2a + (n - 1)d]',
    explanation: 'a = first term, d = common difference (T_n - T_(n-1)), n = number of terms.'
  },
  {
    subject: 'Mathematics',
    category: 'Sequences & Series',
    title: 'nth Term & Sum of GP',
    formula: 'T_n = a * r^(n - 1)\nS_n = a(r^n - 1) / (r - 1) for r > 1\nS_∞ = a / (1 - r) for |r| < 1',
    explanation: 'a = first term, r = common ratio (T_n / T_(n-1)).'
  },
  {
    subject: 'Mathematics',
    category: 'Calculus',
    title: 'Differentiation Rules',
    formula: 'Power: d/dx (axⁿ) = n·a·xⁿ⁻¹\nProduct: (uv)\' = u·v\' + v·u\'\nQuotient: (u/v)\' = (v·u\' - u·v\') / v²\nChain: dy/dx = (dy/du) * (du/dx)',
    explanation: 'Standard differentiation identities for polynomials and composite functions.'
  },
  {
    subject: 'Mathematics',
    category: 'Trigonometry',
    title: 'Sine Rule & Cosine Rule',
    formula: 'Sine: a/sin(A) = b/sin(B) = c/sin(C) = 2R\nCosine: a² = b² + c² - 2bc·cos(A)',
    explanation: 'Used for solving non-right angled triangles. Area = ½ab·sin(C).'
  },

  // PHYSICS
  {
    subject: 'Physics',
    category: 'Kinematics & Dynamics',
    title: 'Linear Motion Equations',
    formula: '1. v = u + at\n2. s = ut + ½at²\n3. v² = u² + 2as\n4. s = [(u + v)/2] * t',
    explanation: 'u = initial velocity, v = final velocity, a = acceleration, t = time, s = distance/displacement.',
    units: 'm/s, m/s², s, m'
  },
  {
    subject: 'Physics',
    category: 'Mechanics',
    title: 'Work, Energy & Power',
    formula: 'Work = Force * displacement * cos(θ)\nKE = ½mv²\nPE = mgh\nPower = Work / time = F * v',
    explanation: 'Energy is conserved: Total Mechanical Energy E = KE + PE.',
    units: 'Joules (J), Watts (W)'
  },
  {
    subject: 'Physics',
    category: 'Waves & Optics',
    title: 'Wave Equation & Lens Formula',
    formula: 'v = f * λ\n1/f = 1/u + 1/v\nMagnification m = v / u = Image Height / Object Height',
    explanation: 'v = wave speed (m/s), f = frequency (Hz), λ = wavelength (m). For lenses: f > 0 for convex (converging), f < 0 for concave (diverging).',
    units: 'm/s, Hz, m, cm'
  },
  {
    subject: 'Physics',
    category: 'Electricity',
    title: 'Ohm\'s Law & Resistance Combinations',
    formula: 'V = I * R\nSeries: R_total = R₁ + R₂ + R₃\nParallel: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃',
    explanation: 'V = potential difference (Volts), I = current (Amperes), R = resistance (Ohms Ω).',
    units: 'V, A, Ω'
  },
  {
    subject: 'Physics',
    category: 'Modern Physics',
    title: 'Photoelectric Equation & Radioactivity',
    formula: 'E = hf = W₀ + KE_max\nN(t) = N₀ * (½)^(t / T_half)',
    explanation: 'h = 6.63 x 10⁻³⁴ J·s (Planck\'s constant), f = frequency, W₀ = work function = hf₀.',
    units: 'Joules (J), Electron-volts (eV)'
  },

  // CHEMISTRY
  {
    subject: 'Chemistry',
    category: 'Physical Chemistry',
    title: 'Mole Concept & Gas Volumes',
    formula: 'Moles n = Mass / Molar Mass = N / N_A\nGas Volume at STP = n * 22.4 dm³\nMolarity M = Moles / Volume (dm³)',
    explanation: 'N_A = Avogadro\'s constant (6.02 x 10²³ entities/mol). Standard molar volume = 22.4 dm³ (22,400 cm³) at 0°C and 1 atm.',
    units: 'mol, g/mol, dm³, mol/dm³'
  },
  {
    subject: 'Chemistry',
    category: 'Physical Chemistry',
    title: 'Ideal Gas Law & Combined Gas Law',
    formula: 'P * V = n * R * T\n(P₁ * V₁) / T₁ = (P₂ * V₂) / T₂',
    explanation: 'R = 8.314 J/(mol·K) or 0.0821 atm·dm³/(mol·K). Temperature MUST always be in Kelvin (K = °C + 273).',
    units: 'atm/Pa, dm³/m³, K'
  },
  {
    subject: 'Chemistry',
    category: 'Electrochemistry',
    title: 'Faraday\'s Laws of Electrolysis',
    formula: '1st Law: m = Z * I * t\n2nd Law: Q = n * z * F\nF = 96,500 Coulombs/mol',
    explanation: 'm = mass deposited (g), Z = electrochemical equivalent, I = current (A), t = time (s), z = charge of ion, F = 1 Faraday.',
    units: 'g, A, s, C'
  },

  // ECONOMICS
  {
    subject: 'Economics',
    category: 'Microeconomics',
    title: 'Elasticity of Demand & Supply',
    formula: 'PED = (% Change in Q_d) / (% Change in Price) = (ΔQ/Q) * (P/ΔP)\nPES = (% Change in Q_s) / (% Change in Price)',
    explanation: '|PED| > 1: Elastic; |PED| < 1: Inelastic; |PED| = 1: Unitary; PED = 0: Perfectly Inelastic; PED = ∞: Perfectly Elastic.'
  },
  {
    subject: 'Economics',
    category: 'Macroeconomics',
    title: 'National Income & Investment Multiplier',
    formula: 'GDP = C + I + G + (X - M)\nMultiplier k = 1 / (1 - MPC) = 1 / MPS',
    explanation: 'MPC (Marginal Propensity to Consume) + MPS (Marginal Propensity to Save) = 1.'
  }
];

export const FormulaSheetModal: React.FC<FormulaSheetModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Mathematics' | 'Physics' | 'Chemistry' | 'Economics'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredFormulas = FORMULAS_DATA.filter((item) => {
    const matchesTab = activeTab === 'All' || item.subject === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div id="formula-sheet-modal-backdrop" className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div id="formula-sheet-container" className="bg-white border-[3px] border-black rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b-2 border-black flex items-center justify-between bg-[#6D28D9] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD100] text-black border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">JAMB High-Yield Formula & Rule Reference</h2>
              <p className="text-xs font-bold text-purple-200">Essential equations, laws, and identities frequently tested in UTME</p>
            </div>
          </div>
          <button
            id="btn-close-formula-sheet"
            onClick={onClose}
            className="text-white hover:bg-[#5B21B6] bg-[#4C1D95] border border-black p-2 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 border-b-2 border-black bg-[#FFF9F2] flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-thin">
            {(['All', 'Mathematics', 'Physics', 'Chemistry', 'Economics'] as const).map((tab) => (
              <button
                key={tab}
                id={`tab-formula-${tab.toLowerCase()}`}
                onClick={() => {
                  playClickSound();
                  setActiveTab(tab);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition border-2 border-black ${
                  activeTab === tab
                    ? 'bg-[#6D28D9] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#FFD100]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              id="input-search-formulas"
              type="text"
              placeholder="Search formula, rule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border-2 border-black rounded-xl text-[#1A1A1A] font-bold focus:outline-none focus:ring-2 focus:ring-[#6D28D9]"
            />
          </div>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-[#FFF9F2]">
          {filteredFormulas.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Calculator className="w-12 h-12 mx-auto mb-3 opacity-40 text-slate-400" />
              <p className="font-bold text-sm text-[#1A1A1A]">No formulas found matching "{searchTerm}"</p>
              <p className="text-xs text-slate-600 font-medium mt-1">Try another keyword or switch subjects</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFormulas.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#FFD100] text-black border border-black">
                      {item.subject} • {item.category}
                    </span>
                    {item.units && (
                      <span className="text-[11px] text-slate-600 font-mono font-bold">
                        [{item.units}]
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-black text-[#1A1A1A] mb-2">{item.title}</h3>
                  <div className="bg-[#1A1A1A] text-[#FFD100] p-3 rounded-lg font-mono text-xs mb-2 whitespace-pre-line border border-black overflow-x-auto font-bold">
                    {item.formula}
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">{item.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t-2 border-black bg-white flex justify-between items-center text-xs font-bold text-slate-700">
          <span>Showing {filteredFormulas.length} formulas</span>
          <button
            id="btn-formula-close-footer"
            onClick={onClose}
            className="px-5 py-2 bg-[#FFD100] hover:bg-[#FDE047] text-black rounded-xl font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
