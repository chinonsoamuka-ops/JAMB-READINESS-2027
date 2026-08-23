import { PastQuestion } from '../types';

export const ADDITIONAL_PAST_QUESTIONS: PastQuestion[] = [
  // ENGLISH
  {
    id: 'eng-2024-03',
    subjectId: 'english',
    year: 2024,
    questionNumber: 3,
    question: 'Choose the option that best explains the meaning of the underlined clause:\n"The politician\'s argument was <u>neither here nor there</u>."',
    options: {
      A: 'unimportant and irrelevant to the matter',
      B: 'eloquent and widely accepted',
      C: 'geographically dispersed',
      D: 'ambitious and difficult to follow'
    },
    correctAnswer: 'A',
    explanation: 'The idiom "neither here nor there" denotes something irrelevant, inconsequential, or immaterial to the discussion.',
    topic: 'Idiomatic Expressions',
    difficulty: 'Easy'
  },
  {
    id: 'eng-2023-03',
    subjectId: 'english',
    year: 2023,
    questionNumber: 3,
    question: 'Which of the following words contains the diphthong /aʊ/?',
    options: {
      A: 'drought',
      B: 'thought',
      C: 'bought',
      D: 'rough'
    },
    correctAnswer: 'A',
    explanation: '"Drought" is pronounced /draʊt/, containing the closing diphthong /aʊ/ as in "cow" or "how". "Thought" has /ɔː/, "bought" has /ɔː/, and "rough" has /ʌ/.',
    topic: 'Vowel & Consonant Sounds',
    difficulty: 'Hard'
  },
  {
    id: 'eng-2022-02',
    subjectId: 'english',
    year: 2022,
    questionNumber: 2,
    question: 'The committee members decided to _____ the meeting until next Monday due to the lack of a quorum.',
    options: {
      A: 'adjourn',
      B: 'suspend',
      C: 'dissolve',
      D: 'curtail'
    },
    correctAnswer: 'A',
    explanation: '"Adjourn" specifically means to postpone or break off a meeting with the intention of resuming it at another specified time or date.',
    topic: 'Lexis & Structure',
    difficulty: 'Easy'
  },
  {
    id: 'eng-2020-02',
    subjectId: 'english',
    year: 2020,
    questionNumber: 2,
    question: 'Choose the word that has the primary stress on the FIRST syllable:',
    options: {
      A: 'COM-ment',
      B: 'com-MENT',
      C: 'con-DUCT (verb)',
      D: 're-CORD (verb)'
    },
    correctAnswer: 'A',
    explanation: 'The noun/verb "comment" is stressed on the first syllable: /ˈkɒment/. Two-syllable verbs like conduct /kənˈdʌkt/ and record /rɪˈkɔːd/ are stressed on the second syllable.',
    topic: 'Stress Patterns & Oral English',
    difficulty: 'Medium'
  },
  {
    id: 'eng-2018-02',
    subjectId: 'english',
    year: 2018,
    questionNumber: 2,
    question: 'Choose the correct preposition:\n"The suspect was charged _____ armed robbery and conspiracy."',
    options: {
      A: 'with',
      B: 'for',
      C: 'of',
      D: 'to'
    },
    correctAnswer: 'A',
    explanation: 'The legal verb "charge" in the passive voice collocated with a crime takes the preposition "with" ("charged with murder/robbery"). Contrast with "accused of".',
    topic: 'Lexis & Structure',
    difficulty: 'Easy',
    formulaOrRule: 'Charged WITH a crime | Accused OF a crime'
  },
  {
    id: 'eng-2017-02',
    subjectId: 'english',
    year: 2017,
    questionNumber: 2,
    question: 'Identify the option that correctly replaces the underlined words:\n"Ade said that he <u>is going</u> to school right now" (reported speech).',
    options: {
      A: 'was going',
      B: 'had gone',
      C: 'will go',
      D: 'has been going'
    },
    correctAnswer: 'A',
    explanation: 'Backshift rule in indirect reported speech: Present continuous ("is going") backshifts into Past continuous ("was going").',
    topic: 'Lexis & Structure',
    difficulty: 'Easy'
  },
  {
    id: 'eng-2015-02',
    subjectId: 'english',
    year: 2015,
    questionNumber: 2,
    question: 'Which of the following sentences illustrates the correct use of punctuation with subjunctive mood?',
    options: {
      A: 'I suggest that he go immediately.',
      B: 'I suggest that he goes immediately.',
      C: 'I suggest that he will go immediately.',
      D: 'I suggest that he is going immediately.'
    },
    correctAnswer: 'A',
    explanation: 'The Mandative Subjunctive: Verbs of demanding/suggesting (suggest, insist, demand, recommend) require the base form of the verb (bare infinitive "go") regardless of the subject pronoun (he go, she go).',
    topic: 'Concord & Subject-Verb Agreement',
    difficulty: 'Hard',
    formulaOrRule: 'Suggest/Demand/Recommend that [Subject] + [Bare Infinitive]'
  },

  // MATHEMATICS
  {
    id: 'mth-2024-03',
    subjectId: 'mathematics',
    year: 2024,
    questionNumber: 3,
    question: 'Find the coordinates of the turning point of the curve y = 2x³ - 9x² + 12x + 1 and state its nature.',
    options: {
      A: 'Maximum at (1, 6), Minimum at (2, 5)',
      B: 'Minimum at (1, 6), Maximum at (2, 5)',
      C: 'Maximum at (2, 5), Minimum at (1, 6)',
      D: 'Point of inflexion at (1, 6)'
    },
    correctAnswer: 'A',
    explanation: 'dy/dx = 6x² - 18x + 12 = 0 => x² - 3x + 2 = 0 => (x - 1)(x - 2) = 0 => x = 1 or x = 2.\nAt x = 1: y = 2(1) - 9(1) + 12(1) + 1 = 6.\nAt x = 2: y = 2(8) - 9(4) + 12(2) + 1 = 16 - 36 + 24 + 1 = 5.\nd²y/dx² = 12x - 18.\nFor x = 1: d²y/dx² = 12 - 18 = -6 < 0 (Maximum at (1, 6)).\nFor x = 2: d²y/dx² = 24 - 18 = +6 > 0 (Minimum at (2, 5)).',
    topic: 'Calculus (Differentiation & Integration)',
    difficulty: 'Hard',
    formulaOrRule: 'Turning points: dy/dx = 0; Max if d²y/dx² < 0; Min if d²y/dx² > 0'
  },
  {
    id: 'mth-2023-03',
    subjectId: 'mathematics',
    year: 2023,
    questionNumber: 3,
    question: 'If the variance of a set of scores is 36, what is the standard deviation?',
    options: {
      A: '6',
      B: '18',
      C: '72',
      D: '1296'
    },
    correctAnswer: 'A',
    explanation: 'Standard Deviation (σ) is the positive square root of the Variance (σ²):\nσ = √(Variance) = √36 = 6.',
    topic: 'Statistics & Probability',
    difficulty: 'Easy',
    formulaOrRule: 'Standard Deviation = √(Variance)'
  },
  {
    id: 'mth-2022-02',
    subjectId: 'mathematics',
    year: 2022,
    questionNumber: 2,
    question: 'In how many different ways can the letters of the word "MATHEMATICS" be arranged?',
    options: {
      A: '4,989,600',
      B: '39,916,800',
      C: '1,247,400',
      D: '2,494,800'
    },
    correctAnswer: 'A',
    explanation: 'Total letters n = 11. Repeated letters: M (2 times), A (2 times), T (2 times).\nNumber of arrangements = 11! / (2! * 2! * 2!) = 39,916,800 / 8 = 4,989,600.',
    topic: 'Statistics & Probability',
    difficulty: 'Medium',
    formulaOrRule: 'Permutations with repetitions = n! / (p! * q! * r!)'
  },
  {
    id: 'mth-2020-02',
    subjectId: 'mathematics',
    year: 2020,
    questionNumber: 2,
    question: 'Find the 8th term of the Arithmetic Progression (A.P.): -5, -1, 3, 7, ...',
    options: {
      A: '23',
      B: '27',
      C: '19',
      D: '31'
    },
    correctAnswer: 'A',
    explanation: 'First term a = -5, Common difference d = -1 - (-5) = 4.\nT_n = a + (n - 1)d.\nT₈ = -5 + (8 - 1) * 4 = -5 + (7 * 4) = -5 + 28 = 23.',
    topic: 'Sequences & Series (AP & GP)',
    difficulty: 'Easy',
    formulaOrRule: 'T_n = a + (n - 1)d'
  },
  {
    id: 'mth-2018-02',
    subjectId: 'mathematics',
    year: 2018,
    questionNumber: 2,
    question: 'If the matrix A = [[k, 3], [2, 6]] is singular, find the value of k.',
    options: {
      A: '1',
      B: '4',
      C: '9',
      D: '0'
    },
    correctAnswer: 'A',
    explanation: 'A matrix is singular if its determinant equals zero (|A| = 0).\n|A| = (k * 6) - (3 * 2) = 0 => 6k - 6 = 0 => 6k = 6 => k = 1.',
    topic: 'Matrices & Determinants',
    difficulty: 'Easy',
    formulaOrRule: 'Singular matrix det(A) = 0'
  },
  {
    id: 'mth-2017-02',
    subjectId: 'mathematics',
    year: 2017,
    questionNumber: 2,
    question: 'Solve the simultaneous equations:\n2x + y = 7\n3x - 2y = 7',
    options: {
      A: 'x = 3, y = 1',
      B: 'x = 2, y = 3',
      C: 'x = 1, y = 5',
      D: 'x = 4, y = -1'
    },
    correctAnswer: 'A',
    explanation: 'From (1): y = 7 - 2x. Substitute into (2):\n3x - 2(7 - 2x) = 7 => 3x - 14 + 4x = 7 => 7x = 21 => x = 3.\ny = 7 - 2(3) = 7 - 6 = 1.',
    topic: 'Quadratic Equations & Polynomials',
    difficulty: 'Easy'
  },

  // PHYSICS
  {
    id: 'phy-2024-03',
    subjectId: 'physics',
    year: 2024,
    questionNumber: 3,
    question: 'A simple pendulum has a period of 2.0 s on Earth. If the length of the pendulum is quadrupled (multiplied by 4), what is its new period of oscillation?',
    options: {
      A: '4.0 s',
      B: '8.0 s',
      C: '1.0 s',
      D: '16.0 s'
    },
    correctAnswer: 'A',
    explanation: 'Period of a simple pendulum T = 2π√(L/g). T is proportional to √L.\nIf length is 4L: T_new = 2π√(4L/g) = 2 * (2π√(L/g)) = 2 * T = 2 * 2.0 s = 4.0 s.',
    topic: 'Kinematics, Force & Motion',
    difficulty: 'Medium',
    formulaOrRule: 'T = 2π√(L/g)'
  },
  {
    id: 'phy-2023-03',
    subjectId: 'physics',
    year: 2023,
    questionNumber: 3,
    question: 'The threshold frequency of a photoelectric metal is 5.0 x 10¹⁴ Hz. Calculate the work function of the metal. [Planck\'s constant h = 6.63 x 10⁻³⁴ J·s]',
    options: {
      A: '3.315 x 10⁻¹⁹ J',
      B: '1.326 x 10⁻¹⁹ J',
      C: '6.630 x 10⁻¹⁹ J',
      D: '3.315 x 10⁻²⁰ J'
    },
    correctAnswer: 'A',
    explanation: 'Work function W₀ = h * f₀.\nW₀ = (6.63 x 10⁻³⁴ J·s) * (5.0 x 10¹⁴ s⁻¹) = 33.15 x 10⁻²⁰ J = 3.315 x 10⁻¹⁹ J.',
    topic: 'Atomic & Nuclear Physics',
    difficulty: 'Medium',
    formulaOrRule: 'Photoelectric equation: E = W₀ + KE_max; W₀ = h * f₀'
  },
  {
    id: 'phy-2022-02',
    subjectId: 'physics',
    year: 2022,
    questionNumber: 2,
    question: 'A convex lens of focal length 15 cm produces a real image three times the size of the object. Calculate the distance of the object from the lens.',
    options: {
      A: '20 cm',
      B: '30 cm',
      C: '45 cm',
      D: '10 cm'
    },
    correctAnswer: 'A',
    explanation: 'Magnification m = v / u = 3 => v = 3u (real image, so v is positive).\nLens formula: 1/f = 1/u + 1/v.\n1/15 = 1/u + 1/(3u) = (3 + 1) / (3u) = 4 / (3u).\n3u = 15 * 4 = 60 => u = 20 cm.',
    topic: 'Waves, Sound & Light Optics',
    difficulty: 'Hard',
    formulaOrRule: 'Lens Formula: 1/f = 1/u + 1/v; Magnification m = v/u'
  },
  {
    id: 'phy-2021-02',
    subjectId: 'physics',
    year: 2021,
    questionNumber: 2,
    question: 'Which of the following electromagnetic waves has the shortest wavelength and highest photon energy in the electromagnetic spectrum?',
    options: {
      A: 'Gamma rays',
      B: 'X-rays',
      C: 'Ultraviolet rays',
      D: 'Radio waves'
    },
    correctAnswer: 'A',
    explanation: 'Order of increasing frequency/energy and decreasing wavelength: Radio < Micro < Infrared < Visible < UV < X-rays < Gamma rays. Gamma rays possess the highest energy and shortest wavelength.',
    topic: 'Atomic & Nuclear Physics',
    difficulty: 'Easy',
    formulaOrRule: 'E = hf = hc/λ'
  },
  {
    id: 'phy-2019-02',
    subjectId: 'physics',
    year: 2019,
    questionNumber: 2,
    question: 'A mass of ideal gas occupies 500 cm³ at 27°C and 760 mmHg. What volume will it occupy at 127°C at the same constant pressure?',
    options: {
      A: '666.7 cm³',
      B: '2350 cm³',
      C: '375.0 cm³',
      D: '600.0 cm³'
    },
    correctAnswer: 'A',
    explanation: 'Using Charles\'s Law at constant pressure: V₁ / T₁ = V₂ / T₂.\nConvert Celsius to Kelvin: T₁ = 27 + 273 = 300 K; T₂ = 127 + 273 = 400 K.\n500 / 300 = V₂ / 400 => V₂ = (500 * 400) / 300 = 2000 / 3 ≈ 666.67 cm³.',
    topic: 'Thermal Physics & Gas Laws',
    difficulty: 'Medium',
    formulaOrRule: 'Charles\'s Law: V₁/T₁ = V₂/T₂ (T must be in Kelvin!)'
  },

  // CHEMISTRY
  {
    id: 'chm-2024-03',
    subjectId: 'chemistry',
    year: 2024,
    questionNumber: 3,
    question: 'What is the IUPAC name for the organic compound: CH₃-CH(CH₃)-CH₂-CH=CH₂?',
    options: {
      A: '4-methylpent-1-ene',
      B: '2-methylpent-4-ene',
      C: '2-methylpent-1-ene',
      D: '4,4-dimethylbut-1-ene'
    },
    correctAnswer: 'A',
    explanation: 'IUPAC numbering priority: The double bond (alkene) takes priority over the alkyl substituent. Numbering starts from the right side nearest the double bond: C1=C2-C3-C4(CH₃)-C5. At carbon 4 there is a methyl branch. Hence: 4-methylpent-1-ene.',
    topic: 'Organic Chemistry (Hydrocarbons & Functional Groups)',
    difficulty: 'Medium',
    formulaOrRule: 'Functional groups (double bonds) take numbering precedence over alkyl branches'
  },
  {
    id: 'chm-2022-02',
    subjectId: 'chemistry',
    year: 2022,
    questionNumber: 2,
    question: 'How many Faradays of electricity are required to deposit 54 g of aluminium during the electrolysis of molten aluminium oxide (Al₂O₃)? [Molar mass of Al = 27 g/mol]',
    options: {
      A: '6 F',
      B: '3 F',
      C: '2 F',
      D: '12 F'
    },
    correctAnswer: 'A',
    explanation: 'Half-reaction: Al³⁺ + 3e⁻ -> Al(s).\n1 mole of Al (27 g) requires 3 Faradays (3 F) of electricity.\nMoles of Al deposited = 54 g / 27 g/mol = 2 moles.\nFaradays required = 2 moles * 3 F/mole = 6 F.',
    topic: 'Electrochemistry & Electrolysis',
    difficulty: 'Medium',
    formulaOrRule: 'Faraday\'s 2nd Law: Q = n * z * F'
  },
  {
    id: 'chm-2020-02',
    subjectId: 'chemistry',
    year: 2020,
    questionNumber: 2,
    question: 'Which of the following pairs of elements will form an electrovalent (ionic) bond?',
    options: {
      A: 'Sodium (Na) and Chlorine (Cl)',
      B: 'Carbon (C) and Oxygen (O)',
      C: 'Hydrogen (H) and Chlorine (Cl)',
      D: 'Nitrogen (N) and Hydrogen (H)'
    },
    correctAnswer: 'A',
    explanation: 'Ionic (electrovalent) bonds form through complete transfer of electrons between a reactive electropositive metal (Na, Group 1) and an electronegative non-metal (Cl, Group 17). C-O, H-Cl, and N-H form covalent bonds.',
    topic: 'Atomic Structure & Chemical Bonding',
    difficulty: 'Easy'
  },
  {
    id: 'chm-2018-02',
    subjectId: 'chemistry',
    year: 2018,
    questionNumber: 2,
    question: 'The solubility of a salt at 30°C is 0.5 mol/dm³. What mass of the salt will dissolve in 250 cm³ of water at 30°C? [Molar mass of salt = 58.5 g/mol]',
    options: {
      A: '7.31 g',
      B: '29.25 g',
      C: '14.63 g',
      D: '3.66 g'
    },
    correctAnswer: 'A',
    explanation: 'Volume in dm³ = 250 / 1000 = 0.25 dm³.\nMoles in 0.25 dm³ = Molarity * Volume = 0.5 mol/dm³ * 0.25 dm³ = 0.125 mol.\nMass = Moles * Molar mass = 0.125 * 58.5 = 7.3125 g.',
    topic: 'Acids, Bases, Salts & Redox',
    difficulty: 'Medium'
  },

  // BIOLOGY
  {
    id: 'bio-2024-03',
    subjectId: 'biology',
    year: 2024,
    questionNumber: 3,
    question: 'During photosynthesis in green plants, the photolysis of water occurs in the:',
    options: {
      A: 'Thylakoid membranes (Grana) during the light-dependent stage',
      B: 'Stroma during the dark (Calvin cycle) stage',
      C: 'Mitochondrial matrix',
      D: 'Outer chloroplast membrane'
    },
    correctAnswer: 'A',
    explanation: 'Photolysis (the splitting of water by absorbed photon energy: 2H₂O -> 4H⁺ + 4e⁻ + O₂) occurs within the thylakoid lumen/grana of the chloroplast during the light stage.',
    topic: 'Nutrition & Enzymes',
    difficulty: 'Medium'
  },
  {
    id: 'bio-2023-02',
    subjectId: 'biology',
    year: 2023,
    questionNumber: 2,
    question: 'Which hormone is secreted by the islets of Langerhans in the pancreas to stimulate the conversion of excess glucose to glycogen in the liver?',
    options: {
      A: 'Insulin',
      B: 'Glucagon',
      C: 'Adrenaline',
      D: 'Thyroxine'
    },
    correctAnswer: 'A',
    explanation: 'Beta cells of the pancreatic islets secrete insulin, which lowers blood glucose by promoting cellular glucose uptake and glycogenesis in liver and muscles.',
    topic: 'Nervous & Hormonal Coordination',
    difficulty: 'Easy'
  },
  {
    id: 'bio-2021-02',
    subjectId: 'biology',
    year: 2021,
    questionNumber: 2,
    question: 'The functional unit of the mammalian kidney responsible for ultrafiltration and selective reabsorption is the:',
    options: {
      A: 'Nephron',
      B: 'Neuron',
      C: 'Alveolus',
      D: 'Villus'
    },
    correctAnswer: 'A',
    explanation: 'The nephron (comprising Bowman\'s capsule, glomerulus, proximal convoluted tubule, Loop of Henle, and distal tubule) is the structural and functional filtration unit of the kidney.',
    topic: 'Circulatory, Digestive & Excretory Systems',
    difficulty: 'Easy'
  },

  // ECONOMICS
  {
    id: 'eco-2024-02',
    subjectId: 'economics',
    year: 2024,
    questionNumber: 2,
    question: 'If the Marginal Propensity to Consume (MPC) is 0.8, what is the value of the investment multiplier (k)?',
    options: {
      A: '5',
      B: '1.25',
      C: '4',
      D: '0.2'
    },
    correctAnswer: 'A',
    explanation: 'Investment Multiplier k = 1 / (1 - MPC) = 1 / MPS.\nSince MPC = 0.8 => MPS = 1 - 0.8 = 0.2.\nk = 1 / 0.2 = 5.',
    topic: 'National Income Accounting',
    difficulty: 'Medium',
    formulaOrRule: 'Multiplier k = 1 / (1 - MPC) = 1 / MPS'
  },
  {
    id: 'eco-2021-02',
    subjectId: 'economics',
    year: 2021,
    questionNumber: 2,
    question: 'A market structure characterized by a large number of buyers and sellers, free entry and exit, and differentiated products with non-price competition is called:',
    options: {
      A: 'Monopolistic competition',
      B: 'Perfect competition',
      C: 'Oligopoly',
      D: 'Pure Monopoly'
    },
    correctAnswer: 'A',
    explanation: 'Monopolistic competition features many firms selling differentiated (branded) products with easy entry/exit and high reliance on advertising and product branding.',
    topic: 'Market Structures (Perfect & Monopoly)',
    difficulty: 'Easy'
  },

  // LITERATURE
  {
    id: 'lit-2024-02',
    subjectId: 'literature',
    year: 2024,
    questionNumber: 2,
    question: '"Parting is such sweet sorrow." This quotation is a classic example of:',
    options: {
      A: 'Oxymoron',
      B: 'Simile',
      C: 'Apostrophe',
      D: 'Metonymy'
    },
    correctAnswer: 'A',
    explanation: 'An oxymoron places two seemingly contradictory or opposite terms side by side for poetic effect ("sweet sorrow").',
    topic: 'Literary Devices & Figures of Speech',
    difficulty: 'Easy'
  },
  {
    id: 'lit-2021-02',
    subjectId: 'literature',
    year: 2021,
    questionNumber: 2,
    question: 'A speech delivered by a character alone on stage that reveals their innermost private thoughts and motives to the audience is a:',
    options: {
      A: 'Soliloquy',
      B: 'Monologue',
      C: 'Aside',
      D: 'Dialogue'
    },
    correctAnswer: 'A',
    explanation: 'A soliloquy is a theatrical device where a solitary character expresses their internal feelings aloud to the audience without other characters hearing.',
    topic: 'African & Non-African Drama',
    difficulty: 'Easy'
  },

  // GOVERNMENT
  {
    id: 'gov-2024-02',
    subjectId: 'government',
    year: 2024,
    questionNumber: 2,
    question: 'The organ of the United Nations (UN) that has primary responsibility for the maintenance of international peace and security with 5 permanent veto-wielding members is the:',
    options: {
      A: 'UN Security Council',
      B: 'General Assembly',
      C: 'International Court of Justice',
      D: 'Trusteeship Council'
    },
    correctAnswer: 'A',
    explanation: 'The UN Security Council (UNSC) has 15 members, including 5 permanent members (USA, UK, France, Russia, China) who possess veto power over substantive resolutions.',
    topic: 'Foreign Policy & International Organizations (ECOWAS, UN, AU)',
    difficulty: 'Easy'
  }
];

export const ALL_QUESTIONS: PastQuestion[] = [
  ...ADDITIONAL_PAST_QUESTIONS
];
