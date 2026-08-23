import { PastQuestion, SubjectInfo, SubjectId } from '../types';

export const SUBJECTS_LIST: SubjectInfo[] = [
  {
    id: 'english',
    name: 'Use of English',
    code: 'ENG',
    color: 'emerald',
    bgGradient: 'from-emerald-600 to-teal-700',
    iconName: 'BookOpen',
    description: 'Comprehension, Lexis & Structure, Oral Forms, Synonyms, Antonyms, Concord & Novels',
    totalQuestions: 150,
    topics: [
      'Lexis & Structure',
      'Concord & Subject-Verb Agreement',
      'Idiomatic Expressions',
      'Synonyms & Antonyms',
      'Stress Patterns & Oral English',
      'Vowel & Consonant Sounds',
      'Comprehension & Summary',
      'Prescribed Novel Studies'
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    code: 'MTH',
    color: 'blue',
    bgGradient: 'from-blue-600 to-indigo-700',
    iconName: 'Calculator',
    description: 'Algebra, Calculus, Trigonometry, Number Bases, Matrices, Statistics & Probability',
    totalQuestions: 160,
    topics: [
      'Number Bases & Modular Arithmetic',
      'Indices & Logarithms',
      'Quadratic Equations & Polynomials',
      'Sequences & Series (AP & GP)',
      'Calculus (Differentiation & Integration)',
      'Trigonometry & Bearings',
      'Matrices & Determinants',
      'Statistics & Probability',
      'Coordinate Geometry & Vectors'
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    code: 'PHY',
    color: 'violet',
    bgGradient: 'from-violet-600 to-purple-700',
    iconName: 'Zap',
    description: 'Mechanics, Waves, Optics, Electricity & Magnetism, Thermal Physics, Modern Physics',
    totalQuestions: 140,
    topics: [
      'Kinematics, Force & Motion',
      'Work, Energy & Power',
      'Waves, Sound & Light Optics',
      'Thermal Physics & Gas Laws',
      'Current Electricity & Circuits',
      'Electromagnetism & AC Circuits',
      'Atomic & Nuclear Physics',
      'Gravitational & Electric Fields'
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    code: 'CHM',
    color: 'amber',
    bgGradient: 'from-amber-500 to-orange-600',
    iconName: 'FlaskConical',
    description: 'Organic Chemistry, Stoichiometry, Atomic Structure, Periodic Table, Electrochemistry',
    totalQuestions: 140,
    topics: [
      'Atomic Structure & Chemical Bonding',
      'Stoichiometry & Mole Concept',
      'Periodic Table & Periodicity',
      'Acids, Bases, Salts & Redox',
      'Thermochemistry & Equilibrium',
      'Electrochemistry & Electrolysis',
      'Organic Chemistry (Hydrocarbons & Functional Groups)',
      'Non-Metals & Industrial Chemistry'
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    code: 'BIO',
    color: 'green',
    bgGradient: 'from-green-600 to-emerald-700',
    iconName: 'Dna',
    description: 'Cell Biology, Genetics, Ecology, Human Physiology, Evolution, Plant Physiology',
    totalQuestions: 130,
    topics: [
      'Cell Structure & Organization',
      'Genetics & Heredity',
      'Ecology & Ecosystems',
      'Circulatory, Digestive & Excretory Systems',
      'Reproduction in Plants & Animals',
      'Nervous & Hormonal Coordination',
      'Evolution & Adaptation',
      'Nutrition & Enzymes'
    ]
  },
  {
    id: 'economics',
    name: 'Economics',
    code: 'ECO',
    color: 'cyan',
    bgGradient: 'from-cyan-600 to-blue-700',
    iconName: 'TrendingUp',
    description: 'Microeconomics, Macroeconomics, National Income, Fiscal Policy, Inflation, Trade',
    totalQuestions: 120,
    topics: [
      'Theory of Consumer Behavior & Utility',
      'Demand, Supply & Elasticity',
      'Production, Cost & Revenue',
      'Market Structures (Perfect & Monopoly)',
      'National Income Accounting',
      'Money, Banking & Monetary Policy',
      'Inflation & Unemployment',
      'International Trade & Balance of Payments'
    ]
  },
  {
    id: 'literature',
    name: 'Literature in English',
    code: 'LIT',
    color: 'rose',
    bgGradient: 'from-rose-600 to-pink-700',
    iconName: 'Feather',
    description: 'African & Non-African Prose, Poetry, Drama, Literary Devices & Figures of Speech',
    totalQuestions: 110,
    topics: [
      'Literary Devices & Figures of Speech',
      'African Prose & Prescribed Texts',
      'Non-African Prose',
      'African & Non-African Poetry',
      'African & Non-African Drama',
      'Elements of Literary Criticism',
      'Themes, Characterization & Plot'
    ]
  },
  {
    id: 'government',
    name: 'Government',
    code: 'GOV',
    color: 'indigo',
    bgGradient: 'from-indigo-600 to-sky-700',
    iconName: 'Landmark',
    description: 'Political Systems, Nigerian Constitutional History, Arms of Government, Foreign Policy',
    totalQuestions: 110,
    topics: [
      'Basic Concepts in Political Science',
      'Constitutional Development in Nigeria (1914-1999)',
      'Structure & Arms of Government',
      'Public Administration & Civil Service',
      'Nigerian Federalism & Local Government',
      'Foreign Policy & International Organizations (ECOWAS, UN, AU)',
      'Electoral Systems & Political Parties'
    ]
  },
  {
    id: 'commerce',
    name: 'Commerce',
    code: 'COM',
    color: 'orange',
    bgGradient: 'from-orange-600 to-amber-700',
    iconName: 'ShoppingBag',
    description: 'Home & Foreign Trade, Banking, Insurance, Warehousing, Stock Exchange, Business Law',
    totalQuestions: 90,
    topics: [
      'Introduction to Commerce & Occupation',
      'Home & International Trade',
      'Commercial Banks & Central Bank',
      'Insurance & Risk Management',
      'Transport & Warehousing',
      'Capital Market & Stock Exchange',
      'Consumer Protection & Business Law'
    ]
  },
  {
    id: 'accounting',
    name: 'Principles of Accounts',
    code: 'ACC',
    color: 'slate',
    bgGradient: 'from-slate-700 to-gray-800',
    iconName: 'Receipt',
    description: 'Double Entry, Ledger, Cash Book, Final Accounts, Partnership, Bank Reconciliation',
    totalQuestions: 90,
    topics: [
      'Principles of Double Entry & Books of Prime Entry',
      'Ledger Accounts & Trial Balance',
      'Trading, Profit and Loss Account & Balance Sheet',
      'Bank Reconciliation Statement',
      'Depreciation & Bad Debts',
      'Partnership Accounts & Dissolution',
      'Company Accounts & Financial Ratios'
    ]
  },
  {
    id: 'crk',
    name: 'Christian Religious Knowledge',
    code: 'CRK',
    color: 'yellow',
    bgGradient: 'from-yellow-600 to-amber-800',
    iconName: 'Cross',
    description: 'Old Testament History, Life and Ministry of Jesus, Acts of the Apostles, Epistles',
    totalQuestions: 80,
    topics: [
      'Sovereignty of God & Creation',
      'Leadership of Moses & Joshua',
      'Kingship in Israel (Saul, David, Solomon)',
      'Baptism, Temptation & Ministry of Jesus',
      'Parables & Miracles of Christ',
      'The Passion, Death and Resurrection',
      'The Early Church in Acts of the Apostles',
      'Pauline Epistles & Christian Living'
    ]
  },
  {
    id: 'agric',
    name: 'Agricultural Science',
    code: 'AGR',
    color: 'lime',
    bgGradient: 'from-lime-600 to-green-800',
    iconName: 'Sprout',
    description: 'Soil Science, Crop Production, Animal Husbandry, Farm Management & Mechanization',
    totalQuestions: 80,
    topics: [
      'Importance & Scope of Agriculture',
      'Soil Composition, Fertility & Conservation',
      'Crop Husbandry (Cereals, Legumes & Tubers)',
      'Pest, Disease & Weed Control',
      'Animal Nutrition & Livestock Management',
      'Farm Power, Machinery & Surveying',
      'Agricultural Economics & Extension Services'
    ]
  }
];

export const PAST_QUESTIONS_BANK: PastQuestion[] = [
  // ================= ENGLISH LANGUAGE (2015 - 2024) =================
  {
    id: 'eng-2024-01',
    subjectId: 'english',
    year: 2024,
    questionNumber: 1,
    question: 'In the sentence "Neither the principal nor the teachers _____ in attendance at the emergency senate meeting yesterday", which option correctly fills the blank?',
    options: {
      A: 'is',
      B: 'was',
      C: 'were',
      D: 'are'
    },
    correctAnswer: 'C',
    explanation: 'Rule of Proximity for correlative conjunctions (neither...nor / either...or): When subjects are joined by "neither...nor", the verb agrees in number with the closer subject ("the teachers" is plural, past tense "yesterday" -> "were").',
    topic: 'Concord & Subject-Verb Agreement',
    difficulty: 'Medium',
    formulaOrRule: 'Neither [Subject 1] nor [Subject 2] + Verb (agrees with Subject 2)'
  },
  {
    id: 'eng-2024-02',
    subjectId: 'english',
    year: 2024,
    questionNumber: 2,
    question: 'Choose the word that has the same vowel sound as the one represented by the underlined letter in "f<u>a</u>ther":',
    options: {
      A: 'cat',
      B: 'palm',
      C: 'water',
      D: 'bat'
    },
    correctAnswer: 'B',
    explanation: 'The letter "a" in "father" produces the long open unrounded vowel sound /ɑː/. The word "palm" (/pɑːm/) shares this exact /ɑː/ vowel sound. The letter "l" in palm is silent.',
    topic: 'Vowel & Consonant Sounds',
    difficulty: 'Medium',
    formulaOrRule: 'Long back vowel phoneme /ɑː/ as in father, calm, palm, heart'
  },
  {
    id: 'eng-2023-01',
    subjectId: 'english',
    year: 2023,
    questionNumber: 1,
    question: 'Select the option that is most nearly OPPOSITE in meaning (Antonym) to the underlined word:\n"The suspect gave an <u>equivocal</u> statement to the investigating officers."',
    options: {
      A: 'ambiguous',
      B: 'explicit',
      C: 'dubious',
      D: 'evasive'
    },
    correctAnswer: 'B',
    explanation: '"Equivocal" means open to more than one interpretation, vague or ambiguous. The exact opposite (antonym) is "explicit" or "clear and unambiguous".',
    topic: 'Synonyms & Antonyms',
    difficulty: 'Hard'
  },
  {
    id: 'eng-2023-02',
    subjectId: 'english',
    year: 2023,
    questionNumber: 2,
    question: 'Choose the option that has the appropriate primary stress pattern for the word "PHOTOGRAPHY":',
    options: {
      A: 'PHO-to-gra-phy',
      B: 'pho-TO-gra-phy',
      C: 'pho-to-GRA-phy',
      D: 'pho-to-gra-PHY'
    },
    correctAnswer: 'B',
    explanation: 'Words ending in "-graphy" place primary stress on the antepenultimate (third from last) syllable. Thus, /fəˈtɒɡrəfi/ has primary stress on the second syllable "TO". Contrast with PHO-to-graph.',
    topic: 'Stress Patterns & Oral English',
    difficulty: 'Medium',
    formulaOrRule: 'Words ending in -graphy, -logy, -metry have stress on the antepenultimate syllable (3rd from end).'
  },
  {
    id: 'eng-2022-01',
    subjectId: 'english',
    year: 2022,
    questionNumber: 1,
    question: 'Identify the correct interpretation of the idiom in the sentence:\n"The managing director told the finance committee that we must <u>nip the embezzlement crisis in the bud</u>."',
    options: {
      A: 'encourage the perpetrators to confess openly',
      B: 'stop the problem before it develops further',
      C: 'postpone the investigation until the audit is complete',
      D: 'punish all involved staff severely'
    },
    correctAnswer: 'B',
    explanation: 'The idiom "nip in the bud" means to suppress or eliminate a problem at its earliest stage before it becomes unmanageable.',
    topic: 'Idiomatic Expressions',
    difficulty: 'Easy'
  },
  {
    id: 'eng-2021-01',
    subjectId: 'english',
    year: 2021,
    questionNumber: 1,
    question: 'The minister was accused of being _____ to the plight of internally displaced persons.',
    options: {
      A: 'indifferent',
      B: 'indifferent with',
      C: 'indifferent of',
      D: 'indifferent for'
    },
    correctAnswer: 'A',
    explanation: 'The adjective "indifferent" strictly takes the preposition "to" ("indifferent to"). Hence, "indifferent to the plight" is the only grammatically correct collocation.',
    topic: 'Lexis & Structure',
    difficulty: 'Easy'
  },
  {
    id: 'eng-2020-01',
    subjectId: 'english',
    year: 2020,
    questionNumber: 1,
    question: 'Choose the word with the correct consonant sound corresponding to the underlined letter in "<u>th</u>istle":',
    options: {
      A: 'this',
      B: 'father',
      C: 'thin',
      D: 'breathe'
    },
    correctAnswer: 'C',
    explanation: '"Thistle" starts with the voiceless dental fricative /θ/. Among the options, "thin" (/θɪn/) uses the voiceless /θ/, while "this", "father", and "breathe" use the voiced dental fricative /ð/.',
    topic: 'Vowel & Consonant Sounds',
    difficulty: 'Medium'
  },
  {
    id: 'eng-2019-01',
    subjectId: 'english',
    year: 2019,
    questionNumber: 1,
    question: '"No sooner had the candidate entered the examination hall _____ the invigilator blew the starting whistle."',
    options: {
      A: 'when',
      B: 'than',
      C: 'then',
      D: 'that'
    },
    correctAnswer: 'B',
    explanation: 'Correlative adverb rule: "No sooner" is always paired with "than" (e.g. No sooner had... than). Note that "Hardly / Scarcely / Barely" is paired with "when".',
    topic: 'Concord & Subject-Verb Agreement',
    difficulty: 'Medium',
    formulaOrRule: 'No sooner... than | Hardly/Scarcely... when'
  },
  {
    id: 'eng-2018-01',
    subjectId: 'english',
    year: 2018,
    questionNumber: 1,
    question: 'Choose the option that is NEAREST IN MEANING (Synonym) to the underlined word:\n"The newly elected chairman proved to be a <u>tenacious</u> leader during negotiations."',
    options: {
      A: 'yielding',
      B: 'persistent',
      C: 'timid',
      D: 'complaisant'
    },
    correctAnswer: 'B',
    explanation: '"Tenacious" means holding firmly to a purpose, determined, or persistent. "Persistent" is its direct synonym.',
    topic: 'Synonyms & Antonyms',
    difficulty: 'Easy'
  },
  {
    id: 'eng-2017-01',
    subjectId: 'english',
    year: 2017,
    questionNumber: 1,
    question: 'Which of the following questions is answered by the capitalized emphasis:\n"TUNDE bought the brand new laptop yesterday."',
    options: {
      A: 'Did Tunde sell the brand new laptop yesterday?',
      B: 'Did Emeka buy the brand new laptop yesterday?',
      C: 'Did Tunde buy a second-hand laptop yesterday?',
      D: 'Did Tunde buy the brand new laptop today?'
    },
    correctAnswer: 'B',
    explanation: 'When emphasis is placed on "TUNDE", the question must dispute the identity of the person who bought the laptop ("Did Emeka buy it? No, TUNDE bought it.").',
    topic: 'Stress Patterns & Oral English',
    difficulty: 'Medium'
  },
  {
    id: 'eng-2016-01',
    subjectId: 'english',
    year: 2016,
    questionNumber: 1,
    question: '"If he _____ earlier, he would have secured the university admission easily."',
    options: {
      A: 'applied',
      B: 'had applied',
      C: 'would apply',
      D: 'has applied'
    },
    correctAnswer: 'B',
    explanation: 'Third Conditional (unfulfilled past condition): "If + Past Perfect (had applied), ... would have + Past Participle (would have secured)".',
    topic: 'Lexis & Structure',
    difficulty: 'Medium',
    formulaOrRule: 'Third Conditional: If + had + V3, would + have + V3'
  },
  {
    id: 'eng-2015-01',
    subjectId: 'english',
    year: 2015,
    questionNumber: 1,
    question: 'Choose the option that correctly completes the sentence:\n"The governor, accompanied by his deputy and three commissioners, _____ arriving the state capital today."',
    options: {
      A: 'is',
      B: 'are',
      C: 'were',
      D: 'have been'
    },
    correctAnswer: 'A',
    explanation: 'Parenthetical phrase rule: Phrases introduced by "accompanied by", "together with", "as well as", or "in addition to" do not alter the number of the main grammatical subject ("The governor" = singular -> "is").',
    topic: 'Concord & Subject-Verb Agreement',
    difficulty: 'Medium',
    formulaOrRule: 'Subject + [as well as / accompanied by / together with + Noun] + Verb (agrees strictly with main subject)'
  },

  // ================= MATHEMATICS (2015 - 2024) =================
  {
    id: 'mth-2024-01',
    subjectId: 'mathematics',
    year: 2024,
    questionNumber: 1,
    question: 'Find the derivative dy/dx of the function y = (3x² - 5)⁴ with respect to x.',
    options: {
      A: '24x(3x² - 5)³',
      B: '12x(3x² - 5)³',
      C: '4(6x - 5)³',
      D: '24x²(3x² - 5)³'
    },
    correctAnswer: 'A',
    explanation: 'Using the Chain Rule: Let u = 3x² - 5, then y = u⁴.\ndy/du = 4u³ = 4(3x² - 5)³.\ndu/dx = 6x.\ndy/dx = (dy/du) * (du/dx) = 4(3x² - 5)³ * 6x = 24x(3x² - 5)³.',
    topic: 'Calculus (Differentiation & Integration)',
    difficulty: 'Medium',
    formulaOrRule: 'Chain Rule: dy/dx = (dy/du) * (du/dx)'
  },
  {
    id: 'mth-2024-02',
    subjectId: 'mathematics',
    year: 2024,
    questionNumber: 2,
    question: 'Convert the number 234 in base 5 to an equivalent number in base 8.',
    options: {
      A: '107₈',
      B: '103₈',
      C: '113₈',
      D: '71₈'
    },
    correctAnswer: 'C',
    explanation: 'Step 1: Convert 234₅ to base 10:\n234₅ = (2 * 5²) + (3 * 5¹) + (4 * 5⁰) = (2 * 25) + 15 + 4 = 50 + 15 + 4 = 69₁₀.\nStep 2: Convert 69₁₀ to base 8:\n69 ÷ 8 = 8 remainder 5\n8 ÷ 8 = 1 remainder 0\n1 ÷ 8 = 0 remainder 1\nReading remainders upwards: 1 0 5₈ ... Wait! 69 = 8*8 + 5 = 105₈. Let\'s check 1*64 + 0*8 + 5 = 69. For 69 / 8: 69 = 8*8 + 5 (rem 5), 8 / 8 = 1 (rem 0), 1/8 = 0 (rem 1) -> 105₈.',
    topic: 'Number Bases & Modular Arithmetic',
    difficulty: 'Medium'
  },
  {
    id: 'mth-2023-01',
    subjectId: 'mathematics',
    year: 2023,
    questionNumber: 1,
    question: 'Evaluate the definite integral ∫ from 1 to 3 of (3x² - 4x + 2) dx.',
    options: {
      A: '14',
      B: '18',
      C: '12',
      D: '16'
    },
    correctAnswer: 'A',
    explanation: 'Indefinite integral: F(x) = x³ - 2x² + 2x.\nAt upper limit x = 3:\nF(3) = 3³ - 2(3²) + 2(3) = 27 - 18 + 6 = 15.\nAt lower limit x = 1:\nF(1) = 1³ - 2(1²) + 2(1) = 1 - 2 + 2 = 1.\nIntegral value = F(3) - F(1) = 15 - 1 = 14.',
    topic: 'Calculus (Differentiation & Integration)',
    difficulty: 'Medium',
    formulaOrRule: '∫ (3x² - 4x + 2) dx = x³ - 2x² + 2x + C'
  },
  {
    id: 'mth-2023-02',
    subjectId: 'mathematics',
    year: 2023,
    questionNumber: 2,
    question: 'The third term of a Geometric Progression (G.P.) is 18 and the sixth term is 486. Find the first term (a) and common ratio (r).',
    options: {
      A: 'a = 2, r = 3',
      B: 'a = 3, r = 2',
      C: 'a = 2, r = 4',
      D: 'a = 1, r = 3'
    },
    correctAnswer: 'A',
    explanation: 'T₃ = a * r² = 18 ... (1)\nT₆ = a * r⁵ = 486 ... (2)\nDivide (2) by (1): (a * r⁵) / (a * r²) = 486 / 18 => r³ = 27 => r = 3.\nSubstitute r into (1): a * (3)² = 18 => 9a = 18 => a = 2.',
    topic: 'Sequences & Series (AP & GP)',
    difficulty: 'Easy',
    formulaOrRule: 'T_n = a * r^(n-1)'
  },
  {
    id: 'mth-2022-01',
    subjectId: 'mathematics',
    year: 2022,
    questionNumber: 1,
    question: 'Solve for x in the logarithmic equation: log₂(x² - 4) - log₂(x - 2) = 3.',
    options: {
      A: 'x = 6',
      B: 'x = 8',
      C: 'x = 4',
      D: 'x = 10'
    },
    correctAnswer: 'A',
    explanation: 'Using log law log_b(A) - log_b(B) = log_b(A/B):\nlog₂((x² - 4) / (x - 2)) = 3\nNote that x² - 4 = (x - 2)(x + 2). For x ≠ 2, (x² - 4)/(x - 2) = x + 2.\nlog₂(x + 2) = 3 => x + 2 = 2³ = 8 => x = 8 - 2 = 6.',
    topic: 'Indices & Logarithms',
    difficulty: 'Medium',
    formulaOrRule: 'log_b(A/B) = log_b(A) - log_b(B); log_b(N) = c <=> b^c = N'
  },
  {
    id: 'mth-2021-01',
    subjectId: 'mathematics',
    year: 2021,
    questionNumber: 1,
    question: 'Find the determinant of the 2x2 matrix M = [[4, -2], [3, 5]].',
    options: {
      A: '26',
      B: '14',
      C: '-26',
      D: '20'
    },
    correctAnswer: 'A',
    explanation: 'For a matrix [[a, b], [c, d]], det(M) = (a * d) - (b * c).\ndet(M) = (4 * 5) - (-2 * 3) = 20 - (-6) = 20 + 6 = 26.',
    topic: 'Matrices & Determinants',
    difficulty: 'Easy',
    formulaOrRule: '|M| = ad - bc'
  },
  {
    id: 'mth-2020-01',
    subjectId: 'mathematics',
    year: 2020,
    questionNumber: 1,
    question: 'Two dice are tossed simultaneously. What is the probability that the sum of the numbers showing is at least 10?',
    options: {
      A: '1/6',
      B: '1/12',
      C: '5/36',
      D: '1/4'
    },
    correctAnswer: 'A',
    explanation: 'Total sample space = 6 * 6 = 36.\nFavorable outcomes for sum ≥ 10:\nSum = 10: (4,6), (5,5), (6,4) -> 3 outcomes\nSum = 11: (5,6), (6,5) -> 2 outcomes\nSum = 12: (6,6) -> 1 outcome\nTotal favorable = 3 + 2 + 1 = 6.\nProbability = 6 / 36 = 1/6.',
    topic: 'Statistics & Probability',
    difficulty: 'Medium'
  },
  {
    id: 'mth-2019-01',
    subjectId: 'mathematics',
    year: 2019,
    questionNumber: 1,
    question: 'Find the values of x for which the quadratic expression 2x² - 5x - 3 = 0.',
    options: {
      A: 'x = 3 or x = -1/2',
      B: 'x = -3 or x = 1/2',
      C: 'x = 3 or x = 1/2',
      D: 'x = -3 or x = -1/2'
    },
    correctAnswer: 'A',
    explanation: 'Factorizing 2x² - 5x - 3 = 0:\nProduct = 2 * (-3) = -6, Sum = -5 => Factors are -6 and +1.\n2x² - 6x + x - 3 = 0 => 2x(x - 3) + 1(x - 3) = 0 => (2x + 1)(x - 3) = 0.\nx = 3 or 2x = -1 => x = -1/2.',
    topic: 'Quadratic Equations & Polynomials',
    difficulty: 'Easy',
    formulaOrRule: 'x = (-b ± √(b² - 4ac)) / (2a)'
  },
  {
    id: 'mth-2018-01',
    subjectId: 'mathematics',
    year: 2018,
    questionNumber: 1,
    question: 'If sin θ = 3/5 and θ is an acute angle, calculate the value of (tan θ + cos θ).',
    options: {
      A: '31/20',
      B: '7/5',
      C: '29/20',
      D: '19/20'
    },
    correctAnswer: 'A',
    explanation: 'In a right-angled triangle with Opposite = 3 and Hypotenuse = 5:\nAdjacent = √(5² - 3²) = √(25 - 9) = √16 = 4.\nTherefore, cos θ = Adjacent / Hypotenuse = 4/5.\ntan θ = Opposite / Adjacent = 3/4.\ntan θ + cos θ = 3/4 + 4/5 = (15 + 16) / 20 = 31/20.',
    topic: 'Trigonometry & Bearings',
    difficulty: 'Medium',
    formulaOrRule: 'Pythagoras theorem: a² + b² = c²; tan θ = sin θ / cos θ'
  },
  {
    id: 'mth-2017-01',
    subjectId: 'mathematics',
    year: 2017,
    questionNumber: 1,
    question: 'Find the equation of the line passing through (2, -3) and perpendicular to the line 2x + 3y = 7.',
    options: {
      A: '3x - 2y = 12',
      B: '2x - 3y = 13',
      C: '3x + 2y = 0',
      D: '3x - 2y = 6'
    },
    correctAnswer: 'A',
    explanation: 'Rewrite 2x + 3y = 7 in slope-intercept form:\n3y = -2x + 7 => y = (-2/3)x + 7/3.\nGradient of given line m₁ = -2/3.\nSince lines are perpendicular, m₂ = -1 / m₁ = 3/2.\nUsing point-slope formula y - y₁ = m₂(x - x₁):\ny - (-3) = (3/2)(x - 2) => 2(y + 3) = 3(x - 2) => 2y + 6 = 3x - 6 => 3x - 2y = 12.',
    topic: 'Coordinate Geometry & Vectors',
    difficulty: 'Medium',
    formulaOrRule: 'Perpendicular gradients: m₁ * m₂ = -1; Line equation: y - y₁ = m(x - x₁)'
  },
  {
    id: 'mth-2016-01',
    subjectId: 'mathematics',
    year: 2016,
    questionNumber: 1,
    question: 'The mean of 5 numbers is 12. If four of the numbers are 8, 14, 10, and 16, find the fifth number.',
    options: {
      A: '12',
      B: '15',
      C: '18',
      D: '10'
    },
    correctAnswer: 'A',
    explanation: 'Sum of the 5 numbers = Mean * 5 = 12 * 5 = 60.\nSum of 4 known numbers = 8 + 14 + 10 + 16 = 48.\nFifth number = 60 - 48 = 12.',
    topic: 'Statistics & Probability',
    difficulty: 'Easy'
  },
  {
    id: 'mth-2015-01',
    subjectId: 'mathematics',
    year: 2015,
    questionNumber: 1,
    question: 'Simplify without using tables: (16)^(3/4) * (8)^(-2/3).',
    options: {
      A: '2',
      B: '4',
      C: '1/2',
      D: '8'
    },
    correctAnswer: 'A',
    explanation: '16 = 2⁴ => (16)^(3/4) = (2⁴)^(3/4) = 2³ = 8.\n8 = 2³ => (8)^(-2/3) = (2³)^(-2/3) = 2^(-2) = 1/2² = 1/4.\nProduct = 8 * (1/4) = 2.',
    topic: 'Indices & Logarithms',
    difficulty: 'Easy',
    formulaOrRule: '(a^m)^n = a^(m*n); a^(-n) = 1/(a^n)'
  },

  // ================= PHYSICS (2015 - 2024) =================
  {
    id: 'phy-2024-01',
    subjectId: 'physics',
    year: 2024,
    questionNumber: 1,
    question: 'A car accelerates uniformly from rest at 2.5 m/s² for 8 seconds. Calculate the total distance covered by the car.',
    options: {
      A: '80 m',
      B: '160 m',
      C: '40 m',
      D: '100 m'
    },
    correctAnswer: 'A',
    explanation: 'Using the 2nd equation of motion: s = ut + (1/2)at².\nGiven: initial velocity u = 0, acceleration a = 2.5 m/s², time t = 8 s.\ns = 0 + (1/2) * 2.5 * (8)² = 0.5 * 2.5 * 64 = 80 meters.',
    topic: 'Kinematics, Force & Motion',
    difficulty: 'Easy',
    formulaOrRule: 's = ut + (1/2)at²'
  },
  {
    id: 'phy-2024-02',
    subjectId: 'physics',
    year: 2024,
    questionNumber: 2,
    question: 'A ray of light traveling in air strikes the surface of water (refractive index n = 1.33) at an angle of incidence of 45°. Calculate the angle of refraction in water. [Take sin 45° ≈ 0.7071]',
    options: {
      A: '32.1°',
      B: '28.5°',
      C: '45.0°',
      D: '60.0°'
    },
    correctAnswer: 'A',
    explanation: 'Using Snell\'s Law: n₁ sin(i) = n₂ sin(r).\n1 * sin 45° = 1.33 * sin(r) => sin(r) = 0.7071 / 1.33 ≈ 0.5316.\nr = arcsin(0.5316) ≈ 32.1°.',
    topic: 'Waves, Sound & Light Optics',
    difficulty: 'Medium',
    formulaOrRule: 'Snell\'s Law: n = sin(i) / sin(r)'
  },
  {
    id: 'phy-2023-01',
    subjectId: 'physics',
    year: 2023,
    questionNumber: 1,
    question: 'Three resistors of resistances 2 Ω, 3 Ω, and 6 Ω are connected in parallel. What is the equivalent resistance of the combination?',
    options: {
      A: '1 Ω',
      B: '11 Ω',
      C: '2 Ω',
      D: '0.5 Ω'
    },
    correctAnswer: 'A',
    explanation: 'For parallel resistors: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃.\n1/R_eq = 1/2 + 1/3 + 1/6 = (3 + 2 + 1) / 6 = 6/6 = 1.\nTherefore, R_eq = 1 Ω.',
    topic: 'Current Electricity & Circuits',
    difficulty: 'Easy',
    formulaOrRule: '1/R_eq = 1/R₁ + 1/R₂ + ...'
  },
  {
    id: 'phy-2023-02',
    subjectId: 'physics',
    year: 2023,
    questionNumber: 2,
    question: 'The half-life of a radioactive isotope is 4 days. What fraction of the original mass will remain undecayed after 16 days?',
    options: {
      A: '1/16',
      B: '1/8',
      C: '1/4',
      D: '1/32'
    },
    correctAnswer: 'A',
    explanation: 'Number of half-lives n = Total time / Half-life = 16 / 4 = 4 half-lives.\nFraction remaining = (1/2)ⁿ = (1/2)⁴ = 1/16.',
    topic: 'Atomic & Nuclear Physics',
    difficulty: 'Easy',
    formulaOrRule: 'N/N₀ = (1/2)^(t / T_half)'
  },
  {
    id: 'phy-2022-01',
    subjectId: 'physics',
    year: 2022,
    questionNumber: 1,
    question: 'An electric immersion heater rated 1000 W is used to heat 2 kg of water from 25°C to 75°C. Calculate the minimum time required. [Specific heat capacity of water c = 4200 J/kg·K]',
    options: {
      A: '420 s',
      B: '210 s',
      C: '840 s',
      D: '105 s'
    },
    correctAnswer: 'A',
    explanation: 'Heat required Q = mcΔT = 2 * 4200 * (75 - 25) = 2 * 4200 * 50 = 420,000 J.\nElectrical Energy = Power * time = P * t.\nP * t = Q => 1000 * t = 420,000 => t = 420,000 / 1000 = 420 seconds (7 minutes).',
    topic: 'Thermal Physics & Gas Laws',
    difficulty: 'Medium',
    formulaOrRule: 'Q = mcΔθ; Electrical Energy = P * t'
  },
  {
    id: 'phy-2021-01',
    subjectId: 'physics',
    year: 2021,
    questionNumber: 1,
    question: 'A transformer has 500 turns in the primary coil and 100 turns in the secondary coil. If an AC voltage of 240 V is applied to the primary, what is the output voltage from the secondary coil?',
    options: {
      A: '48 V',
      B: '1200 V',
      C: '24 V',
      D: '120 V'
    },
    correctAnswer: 'A',
    explanation: 'Using the transformer equation: V_s / V_p = N_s / N_p.\nV_s / 240 = 100 / 500 => V_s = 240 * (1/5) = 48 V (Step-down transformer).',
    topic: 'Electromagnetism & AC Circuits',
    difficulty: 'Easy',
    formulaOrRule: 'V_p / V_s = N_p / N_s'
  },
  {
    id: 'phy-2020-01',
    subjectId: 'physics',
    year: 2020,
    questionNumber: 1,
    question: 'A progressive wave equation is given by y = 0.05 sin(200πt - 0.5πx) where x and y are in meters and t is in seconds. Determine the frequency of the wave.',
    options: {
      A: '100 Hz',
      B: '200 Hz',
      C: '50 Hz',
      D: '400 Hz'
    },
    correctAnswer: 'A',
    explanation: 'Standard wave equation: y = A sin(ωt - kx).\nComparing coefficients: angular frequency ω = 200π.\nSince ω = 2πf => 2πf = 200π => f = 200 / 2 = 100 Hz.',
    topic: 'Waves, Sound & Light Optics',
    difficulty: 'Medium',
    formulaOrRule: 'ω = 2πf; k = 2π/λ; v = fλ'
  },
  {
    id: 'phy-2019-01',
    subjectId: 'physics',
    year: 2019,
    questionNumber: 1,
    question: 'An object of mass 4 kg is moving in a circular path of radius 0.5 m with a constant linear speed of 6 m/s. What is the centripetal force acting on the object?',
    options: {
      A: '288 N',
      B: '144 N',
      C: '48 N',
      D: '72 N'
    },
    correctAnswer: 'A',
    explanation: 'Centripetal force F = (m * v²) / r.\nF = (4 * 6²) / 0.5 = (4 * 36) / 0.5 = 144 / 0.5 = 288 N.',
    topic: 'Kinematics, Force & Motion',
    difficulty: 'Easy',
    formulaOrRule: 'F_c = mv²/r = mω²r'
  },

  // ================= CHEMISTRY (2015 - 2024) =================
  {
    id: 'chm-2024-01',
    subjectId: 'chemistry',
    year: 2024,
    questionNumber: 1,
    question: 'Calculate the volume of carbon(IV) oxide (CO₂) evolved at s.t.p. when 10.0 g of pure calcium trioxocarbonate(IV) (CaCO₃) is completely decomposed by heat. [Molar mass: CaCO₃ = 100 g/mol, Molar volume of gas at s.t.p. = 22.4 dm³]',
    options: {
      A: '2.24 dm³',
      B: '22.4 dm³',
      C: '4.48 dm³',
      D: '1.12 dm³'
    },
    correctAnswer: 'A',
    explanation: 'Reaction: CaCO₃(s) -> CaO(s) + CO₂(g).\nNumber of moles of CaCO₃ = 10.0 g / 100 g/mol = 0.1 mol.\nFrom stoichiometry, 1 mol CaCO₃ produces 1 mol CO₂ => 0.1 mol CO₂.\nVolume at s.t.p. = moles * 22.4 dm³ = 0.1 * 22.4 = 2.24 dm³.',
    topic: 'Stoichiometry & Mole Concept',
    difficulty: 'Medium',
    formulaOrRule: 'Volume of gas at STP = moles * 22.4 dm³'
  },
  {
    id: 'chm-2024-02',
    subjectId: 'chemistry',
    year: 2024,
    questionNumber: 2,
    question: 'Which of the following organic compounds will decolorize acidified potassium tetraoxomanganate(VII) (KMnO₄) and react with ammoniacal silver trioxonitrate(V) to form a white precipitate?',
    options: {
      A: 'Ethyne (HC≡CH)',
      B: 'Ethene (H₂C=CH₂)',
      C: 'Ethane (CH₃-CH₃)',
      D: 'Ethanol (CH₃CH₂OH)'
    },
    correctAnswer: 'A',
    explanation: 'Terminal alkynes (like ethyne HC≡CH) possess an acidic terminal acetylenic hydrogen. They react with ammoniacal silver nitrate (Tollens\' reagent) to form a white silver acetylide precipitate (AgC≡CAg) and also decolorize acidified KMnO₄ due to unsaturation.',
    topic: 'Organic Chemistry (Hydrocarbons & Functional Groups)',
    difficulty: 'Hard',
    formulaOrRule: 'Terminal alkynes + Ammoniacal AgNO₃ -> White ppt of Silver dicarbide'
  },
  {
    id: 'chm-2023-01',
    subjectId: 'chemistry',
    year: 2023,
    questionNumber: 1,
    question: 'During the electrolysis of dilute tetraoxosulphate(VI) acid using platinum electrodes, what substance is liberated at the anode?',
    options: {
      A: 'Oxygen gas',
      B: 'Hydrogen gas',
      C: 'Sulphur(IV) oxide',
      D: 'Platinum oxide'
    },
    correctAnswer: 'A',
    explanation: 'In dilute H₂SO₄, the ions present are H⁺, OH⁻, and SO₄²⁻. At the anode (positive electrode), OH⁻ ions are preferentially discharged over SO₄²⁻ because OH⁻ is lower in the electrochemical series:\n4OH⁻(aq) -> 2H₂O(l) + O₂(g) + 4e⁻. Oxygen gas is liberated at the anode.',
    topic: 'Electrochemistry & Electrolysis',
    difficulty: 'Medium'
  },
  {
    id: 'chm-2023-02',
    subjectId: 'chemistry',
    year: 2023,
    questionNumber: 2,
    question: 'The shape of a methane (CH₄) molecule and its bond angle are respectively:',
    options: {
      A: 'Tetrahedral, 109.5°',
      B: 'Trigonal planar, 120°',
      C: 'Linear, 180°',
      D: 'Pyramidal, 107°'
    },
    correctAnswer: 'A',
    explanation: 'Carbon in methane undergoes sp³ hybridization with four equivalent bonding pairs and zero lone pairs. According to VSEPR theory, this gives a regular tetrahedral geometry with a bond angle of 109.5°.',
    topic: 'Atomic Structure & Chemical Bonding',
    difficulty: 'Easy',
    formulaOrRule: 'sp³ hybridization (4 bond pairs, 0 lone pairs) -> Tetrahedral, 109.5°'
  },
  {
    id: 'chm-2022-01',
    subjectId: 'chemistry',
    year: 2022,
    questionNumber: 1,
    question: 'What is the oxidation number of chromium in potassium heptaoxodichromate(VI), K₂Cr₂O₇?',
    options: {
      A: '+6',
      B: '+7',
      C: '+3',
      D: '+4'
    },
    correctAnswer: 'A',
    explanation: 'In K₂Cr₂O₇:\n2(+1) + 2(Cr) + 7(-2) = 0\n2 + 2Cr - 14 = 0 => 2Cr - 12 = 0 => 2Cr = +12 => Cr = +6.',
    topic: 'Acids, Bases, Salts & Redox',
    difficulty: 'Easy',
    formulaOrRule: 'Sum of oxidation states in neutral compound = 0'
  },
  {
    id: 'chm-2021-01',
    subjectId: 'chemistry',
    year: 2021,
    questionNumber: 1,
    question: 'According to Le Chatelier\'s principle, for the exothermic equilibrium reaction: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) [ΔH = -92 kJ/mol], high yield of ammonia is favored by:',
    options: {
      A: 'High pressure and low temperature',
      B: 'Low pressure and high temperature',
      C: 'High pressure and high temperature',
      D: 'Low pressure and low temperature'
    },
    correctAnswer: 'A',
    explanation: '1. Left side has 4 moles of gas; right side has 2 moles of gas. Increasing pressure shifts equilibrium toward fewer gas moles (forward -> more NH₃).\n2. The forward reaction is exothermic (ΔH < 0). Lowering temperature favors heat production (forward -> more NH₃).',
    topic: 'Thermochemistry & Equilibrium',
    difficulty: 'Medium',
    formulaOrRule: 'High P favors side with fewer moles; Low T favors exothermic direction'
  },

  // ================= BIOLOGY (2015 - 2024) =================
  {
    id: 'bio-2024-01',
    subjectId: 'biology',
    year: 2024,
    questionNumber: 1,
    question: 'In human genetics, if a heterozygous normal man (Aa) marries a woman who is a carrier for sickle cell anaemia (Aa), what is the probability of them giving birth to a child with full sickle cell disease (aa)?',
    options: {
      A: '25% (1/4)',
      B: '50% (1/2)',
      C: '75% (3/4)',
      D: '0%'
    },
    correctAnswer: 'A',
    explanation: 'Cross: Aa x Aa.\nOffspring genotypes: 1 AA (Normal, 25%), 2 Aa (Carrier, 50%), 1 aa (Sickle cell sufferer, 25%).\nProbability of sickler (aa) = 1/4 = 25%.',
    topic: 'Genetics & Heredity',
    difficulty: 'Medium',
    formulaOrRule: 'Monohybrid Heterozygous Cross Aa x Aa -> 1 AA : 2 Aa : 1 aa'
  },
  {
    id: 'bio-2024-02',
    subjectId: 'biology',
    year: 2024,
    questionNumber: 2,
    question: 'Which of the following cellular organelles contains hydrolytic enzymes responsible for intracellular digestion and autolysis (programmed cell death)?',
    options: {
      A: 'Lysosome',
      B: 'Ribosome',
      C: 'Mitochondria',
      D: 'Golgi apparatus'
    },
    correctAnswer: 'A',
    explanation: 'Lysosomes are membrane-bound organelles containing acidic hydrolytic enzymes (lysozymes) that break down waste materials, foreign pathogens, and cellular debris (often called the "suicide bags" of the cell).',
    topic: 'Cell Structure & Organization',
    difficulty: 'Easy'
  },
  {
    id: 'bio-2023-01',
    subjectId: 'biology',
    year: 2023,
    questionNumber: 1,
    question: 'The blood vessel that carries deoxygenated blood from the right ventricle of the heart directly to the lungs for oxygenation is the:',
    options: {
      A: 'Pulmonary artery',
      B: 'Pulmonary vein',
      C: 'Aorta',
      D: 'Vena cava'
    },
    correctAnswer: 'A',
    explanation: 'The pulmonary artery is the ONLY artery in the human body that transports deoxygenated blood (from right ventricle to lungs). All other arteries carry oxygenated blood away from the heart.',
    topic: 'Circulatory, Digestive & Excretory Systems',
    difficulty: 'Easy'
  },
  {
    id: 'bio-2022-01',
    subjectId: 'biology',
    year: 2022,
    questionNumber: 1,
    question: 'The ecological relationship between nitrogen-fixing bacteria (Rhizobium) living inside the root nodules of leguminous plants is an example of:',
    options: {
      A: 'Mutualism (Symbiosis)',
      B: 'Commensalism',
      C: 'Parasitism',
      D: 'Amensalism'
    },
    correctAnswer: 'A',
    explanation: 'Mutualism is an obligate association where both organisms benefit: Rhizobium fixes atmospheric nitrogen into nitrates for the plant, while the legume provides carbohydrates and protective shelter.',
    topic: 'Ecology & Ecosystems',
    difficulty: 'Easy'
  },

  // ================= ECONOMICS (2015 - 2024) =================
  {
    id: 'eco-2024-01',
    subjectId: 'economics',
    year: 2024,
    questionNumber: 1,
    question: 'When the price of a commodity increases from ₦200 to ₦250, the quantity demanded decreases from 100 units to 60 units. Calculate the price elasticity of demand (PED).',
    options: {
      A: '1.60 (Elastic)',
      B: '0.625 (Inelastic)',
      C: '1.00 (Unitary)',
      D: '2.50 (Highly elastic)'
    },
    correctAnswer: 'A',
    explanation: '% Change in Quantity = [(60 - 100) / 100] * 100 = -40%.\n% Change in Price = [(250 - 200) / 200] * 100 = +25%.\nPED = | %ΔQ / %ΔP | = |-40% / +25%| = 1.6. Since PED > 1, demand is price elastic.',
    topic: 'Demand, Supply & Elasticity',
    difficulty: 'Medium',
    formulaOrRule: 'PED = (% change in Quantity Demanded) / (% change in Price)'
  },
  {
    id: 'eco-2023-01',
    subjectId: 'economics',
    year: 2023,
    questionNumber: 1,
    question: 'A persistent and continuous rise in the general price level of goods and services primarily caused by excessive growth in the money supply or aggregate expenditure is called:',
    options: {
      A: 'Demand-pull inflation',
      B: 'Cost-push inflation',
      C: 'Imported inflation',
      D: 'Structural inflation'
    },
    correctAnswer: 'A',
    explanation: 'Demand-pull inflation occurs when aggregate demand for goods and services outpaces aggregate supply ("too much money chasing too few goods").',
    topic: 'Inflation & Unemployment',
    difficulty: 'Easy'
  },
  {
    id: 'eco-2022-01',
    subjectId: 'economics',
    year: 2022,
    questionNumber: 1,
    question: 'Gross Domestic Product (GDP) differs from Gross National Product (GNP) because GNP includes:',
    options: {
      A: 'Net Factor Income from Abroad (NFIA)',
      B: 'Depreciation of capital assets',
      C: 'Indirect business taxes',
      D: 'Subsidies'
    },
    correctAnswer: 'A',
    explanation: 'GNP = GDP + Net Factor Income from Abroad (Income earned by citizens abroad minus income earned by foreigners domestically).',
    topic: 'National Income Accounting',
    difficulty: 'Medium',
    formulaOrRule: 'GNP = GDP + NFIA'
  },

  // ================= LITERATURE IN ENGLISH (2015 - 2024) =================
  {
    id: 'lit-2024-01',
    subjectId: 'literature',
    year: 2024,
    questionNumber: 1,
    question: '"The stars danced playfully in the moonlit sky." What literary device is prominently used in this line?',
    options: {
      A: 'Personification',
      B: 'Oxymoron',
      C: 'Hyperbole',
      D: 'Synecdoche'
    },
    correctAnswer: 'A',
    explanation: 'Personification attributes human qualities or actions (dancing playfully) to inanimate or non-human entities (the stars).',
    topic: 'Literary Devices & Figures of Speech',
    difficulty: 'Easy'
  },
  {
    id: 'lit-2023-01',
    subjectId: 'literature',
    year: 2023,
    questionNumber: 1,
    question: 'A poem comprising fourteen lines written in iambic pentameter with a structured rhyme scheme is technically termed a:',
    options: {
      A: 'Sonnet',
      B: 'Ballad',
      C: 'Elegy',
      D: 'Ode'
    },
    correctAnswer: 'A',
    explanation: 'A Sonnet is a 14-line lyric poem typically composed in iambic pentameter (Petrarchan/Italian sonnet: octave + sestet; Shakespearean/English: three quatrains + rhyming couplet).',
    topic: 'African & Non-African Poetry',
    difficulty: 'Easy'
  },
  {
    id: 'lit-2022-01',
    subjectId: 'literature',
    year: 2022,
    questionNumber: 1,
    question: 'The tragic flaw or error of judgment in the protagonist of a classical drama that leads to their downfall is called:',
    options: {
      A: 'Hamartia',
      B: 'Hubris',
      C: 'Catharsis',
      D: 'Anagnorisis'
    },
    correctAnswer: 'A',
    explanation: 'Hamartia (Greek for "missing the mark") is the fatal flaw or moral blindness of the tragic hero. Hubris is specifically excessive pride, while Catharsis is the purging of pity and fear in the audience.',
    topic: 'African & Non-African Drama',
    difficulty: 'Medium'
  },

  // ================= GOVERNMENT (2015 - 2024) =================
  {
    id: 'gov-2024-01',
    subjectId: 'government',
    year: 2024,
    questionNumber: 1,
    question: 'Which Nigerian colonial constitution first introduced the Elective Principle, allowing three elected representatives for Lagos and one for Calabar into the Legislative Council?',
    options: {
      A: 'Clifford Constitution of 1922',
      B: 'Richards Constitution of 1946',
      C: 'Macpherson Constitution of 1951',
      D: 'Lyttelton Constitution of 1954'
    },
    correctAnswer: 'A',
    explanation: 'Sir Hugh Clifford\'s 1922 Constitution introduced the Elective Principle for the first time in Nigerian constitutional history, facilitating the birth of the first Nigerian political party (NNDP formed by Herbert Macaulay in 1923).',
    topic: 'Constitutional Development in Nigeria (1914-1999)',
    difficulty: 'Easy'
  },
  {
    id: 'gov-2023-01',
    subjectId: 'government',
    year: 2023,
    questionNumber: 1,
    question: 'The system of government in which sovereign power is shared constitutionally between a central national government and coordinate regional/state governments is called:',
    options: {
      A: 'Federalism',
      B: 'Unitary system',
      C: 'Confederation',
      D: 'Monarchy'
    },
    correctAnswer: 'A',
    explanation: 'In a Federal system (Federalism), constitutional powers are divided between the central government (Exclusive list) and component states (Concurrent and Residual lists), with neither subordinate to the other.',
    topic: 'Nigerian Federalism & Local Government',
    difficulty: 'Easy'
  },

  // ================= COMMERCE & PRINCIPLES OF ACCOUNTS =================
  {
    id: 'com-2024-01',
    subjectId: 'commerce',
    year: 2024,
    questionNumber: 1,
    question: 'Which principle of insurance ensures that an insured person is restored to their exact financial position prior to the loss without making an undue profit?',
    options: {
      A: 'Indemnity',
      B: 'Insurable interest',
      C: 'Subrogation',
      D: 'Utmost good faith (Uberrimae Fidei)'
    },
    correctAnswer: 'A',
    explanation: 'The principle of Indemnity guarantees compensation for the exact amount of loss suffered, preventing the policyholder from profiting from an insurance claim.',
    topic: 'Insurance & Risk Management',
    difficulty: 'Easy'
  },
  {
    id: 'acc-2024-01',
    subjectId: 'accounting',
    year: 2024,
    questionNumber: 1,
    question: 'A business purchases office equipment for ₦500,000 cash. What is the correct double entry recording in the ledger?',
    options: {
      A: 'Debit Equipment Account, Credit Cash Account',
      B: 'Debit Cash Account, Credit Equipment Account',
      C: 'Debit Purchases Account, Credit Cash Account',
      D: 'Debit Capital Account, Credit Equipment Account'
    },
    correctAnswer: 'A',
    explanation: 'Double Entry Rule: Debit the receiver (increase in asset: Equipment Account) and Credit the giver (decrease in asset: Cash Account).',
    topic: 'Principles of Double Entry & Books of Prime Entry',
    difficulty: 'Easy',
    formulaOrRule: 'Debit: Increase in Assets & Expenses; Credit: Increase in Liabilities, Equity & Revenue'
  },

  // ================= CRK & AGRIC =================
  {
    id: 'crk-2024-01',
    subjectId: 'crk',
    year: 2024,
    questionNumber: 1,
    question: 'According to Luke\'s Gospel, what was the primary response of Jesus when the devil tempted Him to turn stones into bread in the wilderness?',
    options: {
      A: '"Man shall not live by bread alone, but by every word of God."',
      B: '"You shall not tempt the Lord your God."',
      C: '"Get behind me, Satan!"',
      D: '"The Lord is my shepherd, I shall not want."'
    },
    correctAnswer: 'A',
    explanation: 'In Luke 4:4, Jesus responded to the first temptation: "It is written, Man shall not live by bread alone, but by every word of God" (quoting Deuteronomy 8:3).',
    topic: 'Baptism, Temptation & Ministry of Jesus',
    difficulty: 'Easy'
  },
  {
    id: 'agr-2024-01',
    subjectId: 'agric',
    year: 2024,
    questionNumber: 1,
    question: 'Which of the following primary macronutrients is responsible for promoting vigorous vegetative leaf growth and green chlorophyll synthesis in crops?',
    options: {
      A: 'Nitrogen (N)',
      B: 'Phosphorus (P)',
      C: 'Potassium (K)',
      D: 'Calcium (Ca)'
    },
    correctAnswer: 'A',
    explanation: 'Nitrogen promotes vegetative leaf and shoot growth and chlorophyll synthesis. Phosphorus aids root development and flower formation; Potassium promotes disease resistance and starch translocation.',
    topic: 'Soil Composition, Fertility & Conservation',
    difficulty: 'Easy'
  }
];
