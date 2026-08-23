import { Flashcard } from '../types';

export const FLASHCARDS_DATA: Flashcard[] = [
  // MATHEMATICS
  {
    id: 'fc-mth-01',
    subjectId: 'mathematics',
    topic: 'Calculus',
    front: 'Differentiation Product Rule Formula',
    back: 'If y = u * v, then dy/dx = u(dv/dx) + v(du/dx)',
    category: 'Formula'
  },
  {
    id: 'fc-mth-02',
    subjectId: 'mathematics',
    topic: 'Calculus',
    front: 'Differentiation Quotient Rule Formula',
    back: 'If y = u / v, then dy/dx = [v(du/dx) - u(dv/dx)] / v²',
    category: 'Formula'
  },
  {
    id: 'fc-mth-03',
    subjectId: 'mathematics',
    topic: 'Sequences & Series',
    front: 'Sum to Infinity of a Geometric Progression (G.P.)',
    back: 'S_∞ = a / (1 - r), valid strictly when |r| < 1 (common ratio is between -1 and 1)',
    category: 'Formula'
  },
  {
    id: 'fc-mth-04',
    subjectId: 'mathematics',
    topic: 'Trigonometry',
    front: 'Fundamental Trigonometric Identities',
    back: '1. sin²θ + cos²θ = 1\n2. 1 + tan²θ = sec²θ\n3. 1 + cot²θ = cosec²θ',
    category: 'Formula'
  },

  // PHYSICS
  {
    id: 'fc-phy-01',
    subjectId: 'physics',
    topic: 'Mechanics',
    front: 'Equations of Uniformly Accelerated Linear Motion',
    back: '1. v = u + at\n2. s = ut + ½at²\n3. v² = u² + 2as\n4. s = [(u + v)/2] * t',
    category: 'Formula'
  },
  {
    id: 'fc-phy-02',
    subjectId: 'physics',
    topic: 'Optics & Waves',
    front: 'Critical Angle & Total Internal Reflection',
    back: 'sin(c) = 1 / n\nOccurs when light travels from a denser optical medium to a less dense medium with angle of incidence greater than critical angle.',
    category: 'Concept'
  },
  {
    id: 'fc-phy-03',
    subjectId: 'physics',
    topic: 'Electricity',
    front: 'Ohm\'s Law & Electrical Power Formulas',
    back: 'V = I * R\nPower P = I * V = I² * R = V² / R',
    category: 'Formula'
  },

  // CHEMISTRY
  {
    id: 'fc-chm-01',
    subjectId: 'chemistry',
    topic: 'Organic Chemistry',
    front: 'General Molecular Formulas of Hydrocarbons',
    back: 'Alkanes: CₙH₂ₙ₊₂ (Saturated)\nAlkenes: CₙH₂ₙ (Unsaturated with double bond)\nAlkynes: CₙH₂ₙ₋₂ (Unsaturated with triple bond)\nAlkanols: CₙH₂ₙ₊₁OH',
    category: 'Formula'
  },
  {
    id: 'fc-chm-02',
    subjectId: 'chemistry',
    topic: 'Electrochemistry',
    front: 'Electrochemical Series Cation Discharge Order Mnemonic',
    back: '"Popular Scientists Can Make A Zoo In The Low Humid Country More Safely Gold"\nK⁺ > Na⁺ > Ca²⁺ > Mg²⁺ > Al³⁺ > Zn²⁺ > Fe²⁺ > Sn²⁺ > Pb²⁺ > H⁺ > Cu²⁺ > Hg²⁺ > Ag⁺ > Au³⁺ (Ease of discharge increases down the series)',
    category: 'Mnemonic'
  },
  {
    id: 'fc-chm-03',
    subjectId: 'chemistry',
    topic: 'Gas Laws',
    front: 'Ideal Gas Equation',
    back: 'P * V = n * R * T\nWhere P = pressure (atm/Pa), V = volume (dm³/m³), n = moles, R = 8.314 J/mol·K (0.0821 atm·dm³/mol·K), T = temperature in Kelvin.',
    category: 'Formula'
  },

  // ENGLISH
  {
    id: 'fc-eng-01',
    subjectId: 'english',
    topic: 'Oral Forms',
    front: 'Silent Letters in English Words',
    back: '• "b" in doubt, debt, subtle, tomb, comb, plumber\n• "p" in psychology, psalm, pneumonia, receipt\n• "k" in knife, knight, knowledge\n• "l" in palm, calm, salmon, walk',
    category: 'Grammar Rule'
  },
  {
    id: 'fc-eng-02',
    subjectId: 'english',
    topic: 'Concord',
    front: 'The "One of the..." Relative Clause Rule',
    back: '• "He is ONE of the boys who ARE playing" (relative pronoun "who" refers to plural "boys").\n• BUT: "He is the ONLY ONE of the boys who IS playing" (focus is on "the only one").',
    category: 'Grammar Rule'
  },

  // BIOLOGY
  {
    id: 'fc-bio-01',
    subjectId: 'biology',
    topic: 'Cell Biology',
    front: 'Stages of Mitosis Mnemonic',
    back: '"PMAT"\n1. Prophase (Chromosomes condense)\n2. Metaphase (Chromosomes align at equator)\n3. Anaphase (Sister chromatids separate to opposite poles)\n4. Telophase (Nuclear envelopes reform)',
    category: 'Mnemonic'
  },
  {
    id: 'fc-bio-02',
    subjectId: 'biology',
    topic: 'Genetics',
    front: 'Dihybrid Heterozygous Phenotypic Ratio',
    back: 'AaBb x AaBb cross results in a 9 : 3 : 3 : 1 phenotypic ratio in Mendelian inheritance.',
    category: 'Concept'
  },

  // ECONOMICS
  {
    id: 'fc-eco-01',
    subjectId: 'economics',
    topic: 'National Income',
    front: 'Components of Aggregate Expenditure (GDP)',
    back: 'GDP (Y) = C + I + G + (X - M)\nC = Consumption, I = Investment, G = Government Expenditure, X = Exports, M = Imports, (X - M) = Net Exports',
    category: 'Formula'
  }
];
