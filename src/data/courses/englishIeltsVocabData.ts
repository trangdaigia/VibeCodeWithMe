export interface IeltsVocabItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  topic: 'Environment' | 'Workplace' | 'Technology' | 'Education' | 'Society' | 'Health';
  cefrLevel: 'C1' | 'C2';
  vietnameseMeaning: string;
  definitionEn: string;
  collocations: string[];
  exampleSentence: string;
  ieltsBandContext: string;
}

export const ieltsTopicVocabularies: IeltsVocabItem[] = [
  // 1. ENVIRONMENT & SUSTAINABILITY
  {
    id: 'env-1',
    word: 'Exacerbate',
    phonetic: '/ɪɡˈzæs.ə.beɪt/',
    partOfSpeech: 'verb',
    topic: 'Environment',
    cefrLevel: 'C1',
    vietnameseMeaning: 'Làm trầm trọng thêm, khiến tình hình tồi tệ hơn',
    definitionEn: 'To make a bad situation, problem, or disease even worse.',
    collocations: ['exacerbate the environmental crisis', 'further exacerbate climate degradation', 'severely exacerbate air pollution'],
    exampleSentence: 'Unchecked greenhouse gas emissions will severely exacerbate the global climate catastrophe.',
    ieltsBandContext: 'Thường dùng trong Writing Task 2 khi nói về tác động tiêu cực của ô nhiễm và đô thị hóa.'
  },
  {
    id: 'env-2',
    word: 'Biodiversity depletion',
    phonetic: '/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti dɪˈpliː.ʃən/',
    partOfSpeech: 'noun phrase',
    topic: 'Environment',
    cefrLevel: 'C2',
    vietnameseMeaning: 'Sự suy kiệt đa dạng sinh học',
    definitionEn: 'The reduction and extinction of species worldwide and the loss of natural ecosystems.',
    collocations: ['stem biodiversity depletion', 'halt catastrophic biodiversity depletion', 'irreversible biodiversity depletion'],
    exampleSentence: 'Habitat fragmentation caused by highway construction is a primary catalyst for biodiversity depletion.',
    ieltsBandContext: 'Cụm từ C2 đắt giá thay thế cho "animals dying out".'
  },
  {
    id: 'env-3',
    word: 'Mitigation measures',
    phonetic: '/ˌmɪt.ɪˈɡeɪ.ʃən ˈmeʒ.əz/',
    partOfSpeech: 'noun phrase',
    topic: 'Environment',
    cefrLevel: 'C1',
    vietnameseMeaning: 'Các biện pháp giảm thiểu rủi ro/thiệt hại',
    definitionEn: 'Actions taken to reduce the severity, seriousness, or painfulness of an environmental hazard.',
    collocations: ['implement mitigation measures', 'stringent mitigation measures', 'proactive climate mitigation measures'],
    exampleSentence: 'Governments must enforce proactive mitigation measures rather than merely reacting to natural disasters.',
    ieltsBandContext: 'Chuẩn tiêu chí Solution trong các đề bài Problem - Solution về biến đổi khí hậu.'
  },

  // 2. WORKPLACE & PROFESSIONAL LIFE
  {
    id: 'work-1',
    word: 'Work-life equilibrium',
    phonetic: '/ˌwɜːk.laɪf ˌek.wɪˈlɪb.ri.əm/',
    partOfSpeech: 'noun phrase',
    topic: 'Workplace',
    cefrLevel: 'C1',
    vietnameseMeaning: 'Trạng thái cân bằng giữa công việc và đời sống riêng',
    definitionEn: 'A state of balance where an individual prioritizes professional duties and lifestyle demands equally.',
    collocations: ['achieve work-life equilibrium', 'disrupt work-life equilibrium', 'strive for healthy equilibrium'],
    exampleSentence: 'Remote employment models afford personnel superior flexibility to preserve work-life equilibrium.',
    ieltsBandContext: 'Thay thế cực tốt cho cụm "work-life balance" trong GT Task 2 và Speaking Part 3.'
  },
  {
    id: 'work-2',
    word: 'Burnout syndrome',
    phonetic: '/ˈbɜːn.aʊt ˈsɪn.drəʊm/',
    partOfSpeech: 'noun phrase',
    topic: 'Workplace',
    cefrLevel: 'C1',
    vietnameseMeaning: 'Hội chứng kiệt sức nghề nghiệp',
    definitionEn: 'A state of physical, emotional, and mental exhaustion caused by excessive and prolonged workplace stress.',
    collocations: ['succumb to burnout syndrome', 'combat occupational burnout', 'mitigate employee burnout'],
    exampleSentence: 'Demanding round-the-clock email responsiveness frequently precipitates occupational burnout syndrome.',
    ieltsBandContext: 'Thích hợp phân tích hậu quả của văn hóa làm việc quá giờ (Overtime work culture).'
  },
  {
    id: 'work-3',
    word: 'Professional autonomy',
    phonetic: '/prəˈfeʃ.ən.əl ɔːˈtɒn.ə.mi/',
    partOfSpeech: 'noun phrase',
    topic: 'Workplace',
    cefrLevel: 'C2',
    vietnameseMeaning: 'Quyền tự chủ trong công việc chuyên môn',
    definitionEn: 'The freedom and discretion granted to workers to determine how they execute their daily obligations.',
    collocations: ['grant greater professional autonomy', 'exercise professional autonomy', 'foster workplace autonomy'],
    exampleSentence: 'When personnel are endowed with professional autonomy, productivity metrics witness marked enhancements.',
    ieltsBandContext: 'Rất đắt giá khi tranh luận về ưu thế của làm việc từ xa (telecommuting).'
  },

  // 3. TECHNOLOGY & ARTIFICIAL INTELLIGENCE
  {
    id: 'tech-1',
    word: 'Autonomous neural systems',
    phonetic: '/ɔːˈtɒn.ə.məs ˈnjʊə.rəl ˈsɪs.təmz/',
    partOfSpeech: 'noun phrase',
    topic: 'Technology',
    cefrLevel: 'C2',
    vietnameseMeaning: 'Các hệ thống nơ-ron nhân tạo tự trị',
    definitionEn: 'Advanced artificial intelligence architectures capable of independent decision-making without continuous human input.',
    collocations: ['deploy autonomous neural systems', 'governance of autonomous systems', 'proliferation of neural models'],
    exampleSentence: 'The deployment of autonomous neural systems in clinical diagnosis has sparked intense bioethical debates.',
    ieltsBandContext: 'Từ vựng C2 thay thế cho cụm từ "AI robots" trong Writing Task 2 về công nghệ.'
  },
  {
    id: 'tech-2',
    word: 'Digital surveillance',
    phonetic: '/ˈdɪdʒ.ɪ.təl sɜːˈveɪ.ləns/',
    partOfSpeech: 'noun phrase',
    topic: 'Technology',
    cefrLevel: 'C1',
    vietnameseMeaning: 'Sự giám sát kỹ thuật số, theo dõi qua mạng',
    definitionEn: 'The continuous monitoring of people’s behavior, communications, or personal data using digital devices.',
    collocations: ['pervasive digital surveillance', 'subject to unwarranted surveillance', 'infringe privacy via digital surveillance'],
    exampleSentence: 'Pervasive digital surveillance by tech conglomerates raises legitimate questions regarding citizen confidentiality.',
    ieltsBandContext: 'Dùng trong các bài thảo luận về quyền riêng tư trên internet và mạng xã hội.'
  },
  {
    id: 'tech-3',
    word: 'Algorithmic bias',
    phonetic: '/ˌæl.ɡəˈrɪð.mɪk ˈbaɪ.əs/',
    partOfSpeech: 'noun phrase',
    topic: 'Technology',
    cefrLevel: 'C2',
    vietnameseMeaning: 'Định kiến thuật toán, thiên kiến trong thuật toán AI',
    definitionEn: 'Systematic and repeatable errors in computer systems that create unfair outcomes, such as privileging one group.',
    collocations: ['eliminate algorithmic bias', 'perpetuate systemic algorithmic bias', 'scrutinize algorithms for bias'],
    exampleSentence: 'Automated recruitment algorithms frequently replicate historical workforce biases against minority applicants.',
    ieltsBandContext: 'Thể hiện góc nhìn học thuật sâu sắc về mặt trái của tự động hóa tuyển dụng.'
  },

  // 4. EDUCATION & LIFELONG LEARNING
  {
    id: 'edu-1',
    word: 'Pedagogical methodology',
    phonetic: '/ˌped.əˈɡɒdʒ.ɪ.kəl ˌmeθ.əˈdɒl.ə.dʒi/',
    partOfSpeech: 'noun phrase',
    topic: 'Education',
    cefrLevel: 'C2',
    vietnameseMeaning: 'Phương pháp luận sư phạm giảng dạy',
    definitionEn: 'The principles, theories, and instructional methods applied by educators to cultivate student comprehension.',
    collocations: ['innovative pedagogical methodology', 'overhaul traditional pedagogical methodologies', 'student-centric pedagogy'],
    exampleSentence: 'Rigid rote memorization is being superseded by interactive, inquiry-based pedagogical methodologies.',
    ieltsBandContext: 'Cụm từ chuẩn Band 8.5+ thay cho "teaching methods".'
  },
  {
    id: 'edu-2',
    word: 'Cognitive development',
    phonetic: '/ˈkɒɡ.nə.tɪv dɪˈvel.əp.mənt/',
    partOfSpeech: 'noun phrase',
    topic: 'Education',
    cefrLevel: 'C1',
    vietnameseMeaning: 'Sự phát triển nhận thức và tư duy',
    definitionEn: 'The construction of thought processes, including remembering, problem-solving, and decision-making from childhood.',
    collocations: ['stimulate cognitive development', 'impair early cognitive development', 'crucial milestone in cognitive growth'],
    exampleSentence: 'Excessive early screen immersion is empirically shown to retard linguistic cognitive development in toddlers.',
    ieltsBandContext: 'Thường dùng trong bài tranh luận về việc trẻ em dùng điện thoại/máy tính bảng sớm.'
  },

  // 5. SOCIETY & URBANIZATION
  {
    id: 'soc-1',
    word: 'Metropolitan congestion',
    phonetic: '/ˌmet.rəˈpɒl.ɪ.tən kənˈdʒes.tʃən/',
    partOfSpeech: 'noun phrase',
    topic: 'Society',
    cefrLevel: 'C1',
    vietnameseMeaning: 'Ùn tắc giao thông đô thị lớn',
    definitionEn: 'Severe overcrowding of roadways and vehicular transit within major capital cities and urban conurbations.',
    collocations: ['alleviate metropolitan congestion', 'choking metropolitan congestion', 'toll fees to curb congestion'],
    exampleSentence: 'Subsidizing rapid electric metro rail transit is the sole sustainable remedy for metropolitan congestion.',
    ieltsBandContext: 'Từ vựng C1 thay cho "traffic jams in big cities".'
  },
  {
    id: 'soc-2',
    word: 'Social stratification',
    phonetic: '/ˈsəʊ.ʃəl ˌstræt.ɪ.fɪˈkeɪ.ʃən/',
    partOfSpeech: 'noun phrase',
    topic: 'Society',
    cefrLevel: 'C2',
    vietnameseMeaning: 'Sự phân tầng xã hội, khoảng cách giàu nghèo',
    definitionEn: 'The hierarchical arrangement of individuals into social classes or strata based on wealth and socio-economic status.',
    collocations: ['widen social stratification', 'entrenched social stratification', 'mitigate wealth stratification'],
    exampleSentence: 'Inequitable access to prestigious university education inevitably entrenches generational social stratification.',
    ieltsBandContext: 'Dùng trong các bài nghị luận về khoảng cách giàu nghèo và cơ hội học tập bình đẳng.'
  }
];
