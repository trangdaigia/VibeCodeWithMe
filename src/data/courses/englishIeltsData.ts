import { ExamQuestion, WritingModelPrompt, SpeakingCueCard } from '../curriculum';

export const ieltsQuestions: ExamQuestion[] = [
  {
    id: 'ielts-l1',
    skill: 'listening',
    sectionOrPart: 'Listening Section 1 (Form Completion & Number Trap)',
    question: 'IELTS Listening Section 1: Customer booking an international conference hotel. What is the correct direct extension number for the group reservation coordinator?',
    audioScript: 'Receptionist: "Thank you for holding. That is 020 7946, followed by extension 841... Oh wait, my sincere apologies! The facilities team updated our internal routing yesterday; the group coordinator is actually on extension 814." Caller: "Right, 8-1-4. Thank you."',
    options: ['814', '841', '840', '020'],
    correctAnswer: '814',
    bandTarget: 'Band 7.0 - 8.0',
    trapAnalysis: 'Bẫy số đảo ngược (Number Reversal Trap) kèm từ hiệu đính (Correction marker): "Oh wait, my sincere apologies... actually on extension 814". Thí sinh vội vàng sẽ chép ngay 841.',
    explanationInVietnamese: 'Người nói ban đầu đưa ra số 841 nhưng ngay sau đó đính chính bằng cụm "Oh wait, my sincere apologies... actually on extension 814". Đáp án chính xác là 814.'
  },
  {
    id: 'ielts-l2',
    skill: 'listening',
    sectionOrPart: 'Listening Section 2 (Campus Facility Tour & Distractor Trap)',
    question: 'IELTS Listening Section 2: Which university facility requires advance online reservation prior to admission?',
    audioScript: 'Campus Tour Guide: "Welcome to the central athletic hub. The Olympic-sized swimming pool and fitness mezzanine are freely accessible to all registered students during standard opening hours without prior scheduling. However, due to exceptional demand, the glass squash courts must be reserved at least 24 hours in advance via the student intranet portal."',
    options: ['The squash courts', 'The Olympic swimming pool', 'The fitness mezzanine', 'All athletic facilities'],
    correctAnswer: 'The squash courts',
    bandTarget: 'Band 7.5 - 8.5',
    trapAnalysis: 'Bẫy đánh lạc hướng bằng thông tin liệt kê (Distractor Trap): Hướng dẫn viên nhắc đến bể bơi và phòng gym trước và khẳng định không cần đặt trước, sau đó dùng liên từ chuyển hướng "However" để nêu cơ sở cần đặt trước là "the squash courts".',
    explanationInVietnamese: 'Bể bơi và phòng gym mở cửa tự do không cần hẹn trước ("freely accessible... without prior scheduling"). Chỉ có sân bóng quần ("the glass squash courts") bắt buộc phải đặt trước 24 giờ qua cổng thông tin sinh viên.'
  },
  {
    id: 'ielts-l3',
    skill: 'listening',
    sectionOrPart: 'Listening Section 3 (Academic Research Methodology Tutorial)',
    question: 'IELTS Listening Section 3: Why did the student research group abandon the web-based questionnaire methodology?',
    audioScript: 'Tutor: "So why did you decide against utilizing online surveys for your marine conservation analysis?" Student: "Initially, we anticipated a massive sample size within days. However, when we piloted the digital form, our completion rate stalled at under 11%, and severe demographic clustering meant the responses lacked statistical validity across age cohorts."',
    options: [
      'The completion rate was abysmal and demographic skewing invalidated the data.',
      'The software server experienced persistent technical crashes.',
      'The survey questions violated student ethical privacy guidelines.',
      'The tutor ordered them to conduct personal face-to-face interviews only.'
    ],
    correctAnswer: 'The completion rate was abysmal and demographic skewing invalidated the data.',
    bandTarget: 'Band 8.0 - 9.0',
    trapAnalysis: 'Bẫy Paraphrase học thuật: "completion rate stalled at under 11%" được viết lại thành "completion rate was abysmal", và "demographic clustering meant responses lacked statistical validity" tương đương với "demographic skewing invalidated the data".',
    explanationInVietnamese: 'Nhóm nghiên cứu từ bỏ khảo sát trực tuyến vì tỷ lệ hoàn thành quá thấp dưới 11% ("abysmal") và dữ liệu bị thiên lệch nhân khẩu học không đảm bảo giá trị thống kê ("demographic skewing").'
  },
  {
    id: 'ielts-l4',
    skill: 'listening',
    sectionOrPart: 'Listening Section 4 (Anthropology & Environmental Science Lecture)',
    question: "IELTS Listening Section 4: What constituted the primary engineering hurdle when replicating the Namib beetle's moisture-harvesting carapace?",
    audioScript: 'Professor: "Contrary to initial assumptions, condensing water vapor from morning fog proved remarkably straightforward. The genuine engineering bottleneck lay in fabricating micro-scale hydrophilic peaks upon a super-hydrophobic wax substrate that could endure abrasive desert sandstorms without mechanical degradation."',
    options: [
      'Fabricating durable hydrophilic peaks on a wax substrate resistant to sandstorms',
      'Condensing atmospheric water vapor in low-humidity environments',
      'Sourcing biological wax extracts from desert insects sustainably',
      'Measuring the temperature differential between morning fog and sand dunes'
    ],
    correctAnswer: 'Fabricating durable hydrophilic peaks on a wax substrate resistant to sandstorms',
    bandTarget: 'Band 8.5 - 9.0',
    trapAnalysis: 'Bẫy phủ định giả định ban đầu: "Contrary to initial assumptions, condensing water vapor was straightforward" (loại bỏ phương án ngưng tụ hơi nước). Khó khăn thực sự nằm sau từ khóa "genuine engineering bottleneck".',
    explanationInVietnamese: 'Khó khăn then chốt là chế tạo các đỉnh vi mô ưa nước trên nền sáp siêu kỵ nước có khả năng chống chọi được bão cát sa mạc mài mòn mà không bị hư hại.'
  },
  {
    id: 'ielts-r1',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 1 (True / False / Not Given & Scientific Proof)',
    question: 'IELTS Reading Passage 1: "The author implies that mycorrhizal fungi assist vulnerable saplings entirely out of evolutionary altruism with no metabolic compensation."',
    passage: "For decades, classical forestry textbooks conceptualized woodland trees as relentless competitors vying for scarce sunlight and pedological nutrients. However, recent isotopic carbon-tracing experiments pioneered by Dr. Suzanne Simard demonstrate that subterranean mycorrhizal networks orchestrate bidirectional resource transfers between mature canopy trees and shaded saplings. Crucially, this symbiotic barter is far from altruistic: fungal colonies actively commandeer up to 30% of the host trees' photosynthetic sugar output in exchange for mineralized phosphorus delivery.",
    options: ['False', 'True', 'Not Given'],
    correctAnswer: 'False',
    bandTarget: 'Band 7.5 - 8.5',
    trapAnalysis: "Bẫy True/False/Not Given kinh điển: Mệnh đề khẳng định \"entirely out of evolutionary altruism with no metabolic compensation\" trực tiếp mâu thuẫn đối nghịch với văn bản (\"far from altruistic: fungal colonies actively commandeer up to 30% of host trees' sugar output\").",
    explanationInVietnamese: 'Đoạn văn khẳng định sự trao đổi này không hề vị tha ("far from altruistic") mà nấm thu giữ tới 30% lượng đường quang hợp của cây để đổi lấy khoáng chất. Do đó nhận định là FALSE.'
  },
  {
    id: 'ielts-r2',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 1 (Sentence Completion - No More Than Two Words)',
    question: 'IELTS Reading Passage 1: "Hub trees transmit biochemical distress signals through mycelial pathways, inducing adjacent plants to synthesize ______ prior to insect herbivory."',
    passage: 'When veteran canopy hub trees sustain localized pest incursions or virulent beetle infestations, they dispatch airborne volatiles and subterranean biochemical distress signals via mycelial conduits. Upon receiving these biochemical cues, adjacent flora proactively upregulate protective tannins and defensive enzymes hours before direct herbivore contact occurs, demonstrating collective ecological resilience.',
    options: ['protective tannins', 'mycelial conduits', 'airborne volatiles', 'defensive beetles'],
    correctAnswer: 'protective tannins',
    bandTarget: 'Band 7.5 - 8.5',
    trapAnalysis: 'Bẫy tìm danh từ ghép chính xác trong văn bản: Sau động từ "synthesize", bài đọc viết "proactively upregulate protective tannins" ("upregulate" đồng nghĩa với "synthesize/produce").',
    explanationInVietnamese: 'Cụm từ gốc trong bài là "protective tannins" (chất tannin bảo vệ). Thí sinh cần giữ nguyên vẹn dạng từ gốc không thêm bớt.'
  },
  {
    id: 'ielts-r3',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 2 (Matching Headings - Cognitive Neuroscience)',
    question: 'IELTS Reading Passage 2: Which heading best captures the central thesis of the following research excerpt?',
    passage: 'The stabilization of episodic memories relies indispensable on slow-wave sleep rhythms. During these quiescent nocturnal intervals, hippocampal neural ensembles replay daytime learning sequences at ten-fold acceleration, systematically coordinating info transfer to neocortical regions for durable structural consolidation. Targeted acoustic disruption of slow-wave oscillations systematically suppresses subsequent factual recall by upwards of 45%, proving that memory permanence is not passive retention, but an active, metabolically demanding offline computation.',
    options: [
      'The active neurological role of slow-wave sleep in long-term memory consolidation',
      'The catastrophic hazards of chronic daytime insomnia in working adults',
      'How hippocampal neurons permanently store memories without neocortical aid',
      'Diagnostic technologies for detecting early episodic memory impairment'
    ],
    correctAnswer: 'The active neurological role of slow-wave sleep in long-term memory consolidation',
    bandTarget: 'Band 8.0 - 9.0',
    trapAnalysis: 'Bẫy chọn tiêu đề chứa từ đơn lẻ (Insomnia, Diagnostic tech) nhưng không phản ánh ý tưởng bao quát toàn đoạn. Đoạn văn tập trung chứng minh giấc ngủ sóng chậm là quá trình xử lý thần kinh tích cực để củng cố trí nhớ dài hạn.',
    explanationInVietnamese: 'Tiêu đề chính xác tóm lược được toàn bộ luận điểm: Vai trò sinh học thần kinh tích cực của giấc ngủ sóng chậm trong việc củng cố trí nhớ dài hạn vào vỏ não.'
  },
  {
    id: 'ielts-r4',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 3 (Yes / No / Not Given - Authorial Perspective)',
    question: 'IELTS Reading Passage 3: "The author concedes that contemporary computational language models are capable of experiencing the deep cultural nuances embedded within idiomatic speech."',
    passage: "Techno-evangelists frequently herald algorithmic large language models as the ultimate panacea that will render human polyglotism antiquated. Yet this reductive viewpoint fatally conflates syntactic pattern parsing with authentic pragmatic semantics. An algorithm may reliably translate vernacular idioms verbatim or cross-reference contextual probabilities; however, it fundamentally lacks the lived socio-historical embodiment that animates cultural linguistic constructs such as the Danish 'hygge' or the Portuguese 'saudade'. Without phenomenological sentience, machine translation remains an echo chamber of statistics rather than an empathy bridge.",
    options: ['No', 'Yes', 'Not Given'],
    correctAnswer: 'No',
    bandTarget: 'Band 8.5 - 9.0',
    trapAnalysis: 'Bẫy Yes/No/Not Given về quan điểm tác giả: Câu hỏi nhận định tác giả thừa nhận AI có thể trải nghiệm sắc thái văn hóa ("capable of experiencing"), trong khi tác giả khẳng định AI hoàn toàn thiếu sự trải nghiệm bản thể xã hội-lịch sử ("fundamentally lacks the lived socio-historical embodiment").',
    explanationInVietnamese: 'Tác giả bác bỏ nhận định này và khẳng định mô hình máy tính hoàn toàn thiếu trải nghiệm sống và nhận thức bản thể học. Do đó câu trả lời là NO.'
  },
  {
    id: 'ielts-w1',
    skill: 'writing',
    sectionOrPart: 'Writing Task 1 (Overview Paragraph Construction & Salience)',
    question: 'IELTS Writing Task 1: Which of the following sentences represents an exemplary Band 9.0 "Overview" statement for a comparative chart depicting renewable electricity output across 4 European nations from 2000 to 2024?',
    options: [
      'Overall, all four surveyed nations experienced an upward trajectory in renewable electricity output, with Norway maintaining undisputed dominance throughout, whereas the United Kingdom registered the most dramatic percentage surge.',
      'Overall, some countries went up and some went down and people used a lot of electricity in Europe during the past two decades.',
      'In conclusion, Germany produced 50 terawatt-hours in 2000, which increased to 120 terawatt-hours in 2024, showing that energy is useful.',
      'Overall, the United Kingdom used coal in the beginning and then stopped using it because of environmental pollution.'
    ],
    correctAnswer: 'Overall, all four surveyed nations experienced an upward trajectory in renewable electricity output, with Norway maintaining undisputed dominance throughout, whereas the United Kingdom registered the most dramatic percentage surge.',
    bandTarget: 'Band 8.5 - 9.0',
    trapAnalysis: 'Bẫy viết số liệu cụ thể vào đoạn Tổng quan (Overview): Tiêu chí Task Achievement yêu cầu Overview chỉ nêu các xu hướng khái quát chính (General Trends) và các điểm nổi bật nhất (Salient Features), tuyệt đối không liệt kê các con số chi tiết.',
    explanationInVietnamese: 'Đoạn Overview Band 9.0 chỉ ra đúng 2 đặc điểm bao quát cốt lõi: xu hướng đi lên chung của cả 4 quốc gia và 2 điểm cực trị nổi bật (Na Uy dẫn đầu áp đảo, Anh có tốc độ tăng trưởng bứt phá mạnh nhất).'
  },
  {
    id: 'ielts-w2',
    skill: 'writing',
    sectionOrPart: 'Writing Task 1 (Lexical Precision for Volatile Trends)',
    question: 'IELTS Writing Task 1: Select the description that demonstrates Band 8.5+ Academic Lexical Resource when reporting erratic market fluctuations:',
    options: [
      'Between March and September, domestic wholesale energy prices exhibited wild fluctuations, oscillating erratically between €45 and €110 per megawatt-hour before stabilizing towards the fourth quarter.',
      'Between March and September, domestic energy prices went up and down like a crazy roller coaster and made companies panic.',
      'Between March and September, domestic energy prices changed very strongly and had many different numbers.',
      'Between March and September, domestic energy prices had a jumping movement which was very unpredictable.'
    ],
    correctAnswer: 'Between March and September, domestic wholesale energy prices exhibited wild fluctuations, oscillating erratically between €45 and €110 per megawatt-hour before stabilizing towards the fourth quarter.',
    bandTarget: 'Band 8.5 - 9.0',
    trapAnalysis: 'Bẫy dùng văn phong khẩu ngữ (informal language) như "crazy roller coaster" hay "jumping movement". Văn phong học thuật chuẩn yêu cầu các colocation trang trọng: "exhibited wild fluctuations", "oscillating erratically between X and Y", "stabilizing towards...".',
    explanationInVietnamese: 'Câu chứa các cụm colocation học thuật đắt giá: exhibited wild fluctuations (thể hiện biến động dữ dội), oscillating erratically (dao động thất thường giữa hai mốc), stabilizing towards (ổn định dần về phía quý 4).'
  },
  {
    id: 'ielts-w3',
    skill: 'writing',
    sectionOrPart: 'Writing Task 2 (Thesis Statement & Nuanced Positioning)',
    question: 'IELTS Writing Task 2: For the prompt: "Some believe higher education curricula should focus exclusively on workforce skills, while others argue universities should prioritize theoretical knowledge. Discuss both views and give your opinion." Which thesis statement achieves Band 8.5+ Task Achievement?',
    options: [
      'While vocational pragmatism is crucial for immediate graduate employability, I contend that cultivating theoretical inquiry and critical acumen remains the paramount purpose of higher education, as it equips individuals to navigate long-term technological disruption.',
      'Higher education has both advantages and disadvantages, so I will discuss both perspectives in this essay and give my personal view at the conclusion.',
      'I completely agree that universities should only teach coding and business because theoretical degrees are a total waste of money.',
      'In my opinion, students should go to school and listen to their professors to get good grades.'
    ],
    correctAnswer: 'While vocational pragmatism is crucial for immediate graduate employability, I contend that cultivating theoretical inquiry and critical acumen remains the paramount purpose of higher education, as it equips individuals to navigate long-term technological disruption.',
    bandTarget: 'Band 8.5 - 9.0',
    trapAnalysis: 'Bẫy viết mở bài "ba phải" sáo rỗng: "This essay will discuss both views and give opinion" bị trừ điểm tiêu chí Task Achievement vì không nêu rõ lập trường của tác giả (Clear position throughout).',
    explanationInVietnamese: 'Mở bài mẫu mực Band 8.5+ công nhận một phần tính thực tiễn nghề nghiệp ("vocational pragmatism") nhưng khẳng định dứt khoát lập trường ưu tiên tư duy lý thuyết phản biện ("theoretical inquiry and critical acumen") để thích ứng với biến đổi công nghệ.'
  },
  {
    id: 'ielts-w4',
    skill: 'writing',
    sectionOrPart: 'Writing Task 2 (PEEL Paragraph Logical Explanation)',
    question: 'IELTS Writing Task 2: In a PEEL paragraph supporting investments in renewable energy, which sentence serves as an exemplary "Explanation" directly bridging the Point ("Renewable energy infrastructure catalyzes long-term macroeconomic stability") to real-world Evidence?',
    options: [
      'By decoupling national power grids from volatile fossil fuel import markets, sovereign economies insulate domestic industries from geopolitical commodity shocks and inflationary spikes.',
      'Because solar panels look very modern on building rooftops and save electricity.',
      'For instance, Germany installed millions of solar modules in Bavaria last decade.',
      'Therefore, politicians must sign climate agreements immediately.'
    ],
    correctAnswer: 'By decoupling national power grids from volatile fossil fuel import markets, sovereign economies insulate domestic industries from geopolitical commodity shocks and inflationary spikes.',
    bandTarget: 'Band 8.5 - 9.0',
    trapAnalysis: 'Bẫy nhầm lẫn giữa câu Giải thích (Explain) và câu Dẫn chứng (Evidence - có "For instance"): Câu Giải thích phải phân tích cơ chế nhân quả (Causal mechanism) trả lời câu hỏi "Tại sao điều đó lại thúc đẩy ổn định kinh tế vĩ mô?".',
    explanationInVietnamese: 'Câu văn giải thích sâu sắc cơ chế kinh tế: Việc tách lưới điện khỏi thị trường nhập khẩu nhiên liệu hóa thạch dễ biến động sẽ giúp bảo vệ nền công nghiệp nội địa trước các cú sốc địa chính trị và lạm phát.'
  },
  {
    id: 'ielts-w5',
    skill: 'writing',
    sectionOrPart: 'Writing Task 2 (Academic Register Transformation)',
    question: 'IELTS Writing Task 2: Which option most elegantly upgrades the informal sentence: "Governments need to spend a lot of cash to fix poor public transit systems in big cities"?',
    options: [
      'National authorities ought to allocate substantial fiscal capital toward modernizing dilapidated public transit networks in metropolitan centers.',
      'Governments must throw big money into fixing broken bus systems in crowded towns.',
      'State officials have to pay out massive dollars so city subways stop breaking down.',
      'Leaders should cough up plenty of finances for urban bus roads.'
    ],
    correctAnswer: 'National authorities ought to allocate substantial fiscal capital toward modernizing dilapidated public transit networks in metropolitan centers.',
    bandTarget: 'Band 8.5 - 9.0',
    trapAnalysis: 'Bẫy khẩu ngữ thương mại/đời thường (throw big money, pay out massive dollars, cough up). Từ vựng C1/C2 học thuật chuẩn mực sử dụng: "allocate substantial fiscal capital", "modernizing dilapidated public transit networks", "metropolitan centers".',
    explanationInVietnamese: 'Nâng cấp toàn diện cấu trúc từ vựng: "spend a lot of cash" -> "allocate substantial fiscal capital"; "poor/broken" -> "dilapidated"; "big cities" -> "metropolitan centers".'
  },
  {
    id: 'ielts-s1',
    skill: 'speaking',
    sectionOrPart: 'Speaking Part 1 (A.R.E.A Formula & Discourse Cohesion)',
    question: 'IELTS Speaking Part 1: Examiner asks: "Do you enjoy reading non-fiction literature?" Which response achieves Band 8.5+ Fluency, Lexical Resource, and Cohesion?',
    options: [
      'Unquestionably. Delving into non-fiction serves as an intellectual sanctuary for me (Answer), largely because it broadens my cognitive horizons and de-stresses my mind from daily screen fatigue (Reason). Recently, I was profoundly engrossed in a treatise on evolutionary biology (Example). Were I deprived of a bedtime reading routine, I would find it remarkably difficult to unwind (Alternative).',
      'Yes, I like reading non-fiction because it gives me many useful knowledge and I read books every Saturday afternoon at the library.',
      'I read non-fiction sometimes when my teacher tells me to, but I definitely prefer scrolling on social media apps.',
      'Non-fiction books are printed with black ink on white paper, which is very traditional.'
    ],
    correctAnswer: 'Unquestionably. Delving into non-fiction serves as an intellectual sanctuary for me (Answer), largely because it broadens my cognitive horizons and de-stresses my mind from daily screen fatigue (Reason). Recently, I was profoundly engrossed in a treatise on evolutionary biology (Example). Were I deprived of a bedtime reading routine, I would find it remarkably difficult to unwind (Alternative).',
    bandTarget: 'Band 8.5 - 9.0',
    trapAnalysis: 'Bẫy trả lời cụt lủn (Short answer) hoặc lặp từ vựng đơn giản (I like reading because it gives me useful knowledge). Mô hình A.R.E.A mở rộng câu trả lời mạch lạc 4 tầng ý mà không hề bị lan man.',
    explanationInVietnamese: 'Áp dụng hoàn hảo công thức A.R.E.A kèm các colocation đẳng cấp: "intellectual sanctuary", "broaden cognitive horizons", "screen fatigue", "profoundly engrossed in a treatise", cấu trúc đảo ngữ điều kiện loại 2 "Were I deprived of...".'
  },
  {
    id: 'ielts-s2',
    skill: 'speaking',
    sectionOrPart: 'Speaking Part 2 (Narrative Tense Modulation & Storytelling)',
    question: 'IELTS Speaking Part 2: When presenting a 2-minute monologue describing a challenging project you successfully navigated, what structural technique guarantees top marks for Grammatical Range and Cohesion?',
    options: [
      'Modulating naturally across Past Perfect (establishing initial context), Past Continuous (depicting ongoing friction), Simple Past (key pivotal action), and Present Perfect (evaluating enduring personal legacy).',
      'Restricting all verb conjugations exclusively to Simple Past to minimize any risk of tense slippage.',
      'Speaking as rapidly as possible without pausing for breath to simulate high fluency.',
      'Reciting a pre-memorized speech on environmental pollution regardless of the card prompt.'
    ],
    correctAnswer: 'Modulating naturally across Past Perfect (establishing initial context), Past Continuous (depicting ongoing friction), Simple Past (key pivotal action), and Present Perfect (evaluating enduring personal legacy).',
    bandTarget: 'Band 8.5 - 9.0',
    trapAnalysis: 'Sai lầm phổ biến của thí sinh là chỉ dùng một thì quá khứ đơn (Simple Past) suốt 2 phút độc thoại. Tiêu chí Grammatical Range Band 8.0+ đòi hỏi sự luân chuyển linh hoạt giữa các thì quá khứ hoàn thành, quá khứ tiếp diễn và hiện tại hoàn thành.',
    explanationInVietnamese: 'Kỹ thuật kể chuyện đỉnh cao đòi hỏi kết hợp linh hoạt: Quá khứ hoàn thành cho bối cảnh ban đầu, Quá khứ tiếp diễn cho xung đột đang diễn ra, Quá khứ đơn cho hành động bước ngoặt và Hiện tại hoàn thành để đúc kết bài học.'
  },
  {
    id: 'ielts-s3',
    skill: 'speaking',
    sectionOrPart: 'Speaking Part 3 (Two-way Philosophical Debate & Nuance)',
    question: 'IELTS Speaking Part 3: Examiner asks: "Should historic architectural landmarks be demolished to accommodate modern affordable housing?" Which response illustrates Band 9.0 dialectical argumentation?',
    options: [
      "That presents a profound societal conundrum. On the one hand, rapid urbanization exerts undeniable strain on affordable housing reserves. Nevertheless, to raze irreplaceable historical landmarks is to sever a civilization's living connection with its heritage. A judicious synthesis lies in adaptive reuse—preserving historic facades while architecturally retrofitting interior structures for high-density modern habitation.",
      'We should knock down all old houses immediately because poor people need apartments and old buildings have no Wi-Fi.',
      'Nobody should ever touch historic landmarks because tourists spend money to take selfies in front of them.',
      'It is impossible to answer this question because governments are corrupt.'
    ],
    correctAnswer: "That presents a profound societal conundrum. On the one hand, rapid urbanization exerts undeniable strain on affordable housing reserves. Nevertheless, to raze irreplaceable historical landmarks is to sever a civilization's living connection with its heritage. A judicious synthesis lies in adaptive reuse—preserving historic facades while architecturally retrofitting interior structures for high-density modern habitation.",
    bandTarget: 'Band 9.0',
    trapAnalysis: 'Bẫy đưa ra quan điểm phiến diện cực đoan (One-sided extreme view) thiếu tư duy phản biện. Giám khảo chấm Part 3 đánh giá năng lực xem xét vấn đề đa chiều và đưa ra giải pháp tổng hợp hài hòa (Judicious synthesis / Adaptive reuse).',
    explanationInVietnamese: 'Câu trả lời thể hiện tư duy học thuật sắc sảo: Nhận diện thế tiến thoái lưỡng nan xã hội ("profound societal conundrum"), cân nhắc cả 2 mặt và đưa ra giải pháp "adaptive reuse" (bảo tồn mặt ngoài di sản nhưng cải tạo công năng bên trong để làm nhà ở hiện đại).'
  },
  {
    id: 'ielts-s4',
    skill: 'speaking',
    sectionOrPart: 'Speaking Part 3 (Hypothetical & Speculative Language)',
    question: 'IELTS Speaking Part 3: Examiner asks: "How might pervasive artificial intelligence transform classroom education over the next fifty years?" Which linguistic construction delivers the strongest grammatical impact under GRA Band 8.5+?',
    options: [
      'Were autonomous neural tutoring systems to become universally ubiquitous, we would likely bear witness to a fundamental decentralization of traditional brick-and-mortar academies toward hyper-tailored individualized learning.',
      'AI will definitely replace all human teachers in fifty years and students will only look at computer screens.',
      'Maybe classrooms in fifty years will have flying robots that talk to children.',
      'AI is getting smarter every day so schools will be different.'
    ],
    correctAnswer: 'Were autonomous neural tutoring systems to become universally ubiquitous, we would likely bear witness to a fundamental decentralization of traditional brick-and-mortar academies toward hyper-tailored individualized learning.',
    bandTarget: 'Band 9.0',
    trapAnalysis: 'Sử dụng cấu trúc đảo ngữ câu điều kiện loại 2 giả định tương lai: "Were + Subject + to-Infinitive, Subject + would likely bear witness to...". Đây là cấu trúc ngữ pháp học thuật thượng thừa gây ấn tượng tuyệt đối với giám khảo bản xứ.',
    explanationInVietnamese: 'Cấu trúc đảo ngữ giả định: "Were autonomous neural tutoring systems to become universally ubiquitous..." (Nếu hệ thống gia sư nơ-ron tự chủ trở nên phổ biến ở khắp mọi nơi...) thể hiện sự kiểm soát ngữ pháp điêu luyện và khả năng dự phóng tương lai học thuật.'
  }
];

export const ieltsWritingPrompts: WritingModelPrompt[] = [
  {
    id: 'ielts-wp-task1',
    taskType: 'Task 1',
    title: 'IELTS Academic Writing Task 1: Renewable Electricity Generation Trends',
    prompt: 'The chart below illustrates the percentage of national electricity generated from renewable sources in four European countries (Germany, the UK, Norway, and Spain) between 2000 and 2024.',
    chartDescription: 'Comparative line graph showing Norwegian renewables dominating at 95%-98%, Spain rising steadily from 18% to 54%, Germany expanding from 7% to 58%, and the UK experiencing an exponential surge from 3% to 49% over the 24-year period.',
    bandScore: 'Band 9.0 Model Report',
    modelAnswer: `The line graph delineates the proportion of electricity produced from renewable resources in four European nations across a 24-year timeframe from 2000 to 2024.

Overall, all four surveyed countries experienced substantial upward trajectories in their clean energy shares. Norway maintained undisputed dominance throughout the entire duration, while the United Kingdom exhibited the most striking relative expansion.

In 2000, Norway stood in a league of its own, generating approximately 95% of its power from renewables—predominantly hydroelectricity—and this figure plateaued at an extraordinary 98% by 2024. In stark contrast, the remaining three nations began the millennium at markedly modest baselines: Spain stood at 18%, Germany at 7%, and the UK at an almost negligible 3%.

Over the ensuing two decades, Germany and Spain underwent consistent and parallel growth, both crossing the 30% threshold by 2012. By 2024, Germany had ascended to 58%, narrowly outstripping Spain's final figure of 54%. Meanwhile, the United Kingdom recorded an exponential surge after 2010, spurred by offshore wind installations, culminating at 49% by the conclusion of the period—a more than sixteen-fold increase from its starting value.`,
    outline: [
      { point: 'Introduction & Paraphrase', explanation: 'Delineates the proportion of electricity produced from renewable resources across a 24-year timeframe.' },
      { point: 'Overview (Salient Features)', explanation: "Upward trajectory across all nations; Norway's undisputed dominance; UK's dramatic relative surge." },
      { point: 'Body Paragraph 1 (Leader vs Low Starters)', explanation: 'Norway plateauing at 98% vs modest millennium baselines of Spain (18%), Germany (7%), and UK (3%).' },
      { point: 'Body Paragraph 2 (Growth & Endpoints)', explanation: "Parallel rise of Germany (58%) overtaking Spain (54%), and UK's sixteen-fold explosion to 49%." }
    ],
    keyVocabulary: [
      { word: 'Delineate', meaning: 'Khắc họa, phác thảo rõ ràng chi tiết dữ liệu', phonetic: '/dɪˈlɪn.i.eɪt/' },
      { word: 'Undisputed dominance', meaning: 'Vị thế thống trị không thể tranh cãi', phonetic: '/ˌʌn.dɪˈspjuː.tɪd ˈdɒm.ɪ.nəns/' },
      { word: 'Plateaued at', meaning: 'Đi ngang ổn định ở mức cao sau khi tăng', phonetic: '/ˈplæt.əʊd æt/' },
      { word: 'Markedly modest baseline', meaning: 'Mức xuất phát điểm khiêm tốn rõ rệt', phonetic: '/ˈmɑː.kɪd.li ˈmɒd.ɪst ˈbeɪs.laɪn/' },
      { word: 'Outstrip', meaning: 'Vượt mặt, bỏ xa đối thủ cạnh tranh', phonetic: '/aʊtˈstrɪp/' },
      { word: 'Exponential surge', meaning: 'Sự tăng vọt bùng nổ theo cấp số nhân', phonetic: '/ˌek.spəˈnen.ʃəl sɜːdʒ/' }
    ],
    examinerComment: 'Task Achievement 9.0: Toàn bộ thông tin trọng tâm được tóm tắt xuất sắc, Overview sắc bén không chứa số liệu thừa. Coherence & Cohesion 9.0: Phân đoạn logic, liên kết tự nhiên (meanwhile, in stark contrast, over the ensuing decades). Lexical Resource 9.0: Sử dụng kho từ vựng mô tả xu hướng cao cấp. Grammatical Range 9.0: Phối hợp hoàn hảo mệnh đề phân từ, câu ghép phức tạp.'
  },
  {
    id: 'ielts-wp-task2',
    taskType: 'Task 2',
    title: 'IELTS Academic Writing Task 2: Higher Education Purpose Debate',
    prompt: 'Some people believe that universities should focus solely on imparting practical skills and knowledge required for workplace employment, while others argue that the core purpose of higher education is to foster theoretical inquiry and critical intellect regardless of immediate economic utility. Discuss both views and give your own opinion.',
    bandScore: 'Band 9.0 Model Essay',
    modelAnswer: `A contentious debate persists regarding whether tertiary education should operate primarily as a vocational training ground aligned with marketplace requirements or function as an intellectual crucible dedicated to theoretical inquiry. While vocational pragmatism undeniably bolsters short-term graduate employability, I contend that cultivating theoretical intellect and critical acumen remains the paramount societal mission of universities, as it fosters the foundational adaptability required in an era of rapid technological disruption.

Advocates of employment-oriented higher education emphasize economic expediency. In an increasingly competitive global economy, students and families commit substantial capital to academic tuition with the justified expectation of financial return. When degree curricula prioritize industry-aligned proficiencies—such as data science, financial engineering, or project management—graduates seamlessly transition into the labor market, minimizing youth underemployment and directly addressing corporate skills shortages. Under this paradigm, universities serve as economic accelerators that translate academic rigor into immediate industrial productivity.

Nevertheless, subordinating higher education exclusively to ephemeral market demands is profoundly short-sighted. Commercial job descriptions evolve rapidly; technical skill sets prized today may be rendered entirely obsolete tomorrow by automated artificial intelligence. Conversely, rigorous exposure to theoretical frameworks—spanning philosophy, advanced mathematics, and sociological critique—cultivates first-principles thinking, cognitive resilience, and the capacity to synthesize abstract concepts. A graduate grounded in deep theoretical methodology can systematically master new technological paradigms throughout a forty-year career, whereas one trained strictly in narrow procedural routines risks premature professional stagnation.

In conclusion, while practical vocational competencies hold undeniable utility for initial career entry, they should complement rather than supplant theoretical enlightenment. The quintessential objective of a university is not merely to train compliant functionaries for current vacancies, but to nurture autonomous, analytical minds capable of innovating future paradigms.`,
    outline: [
      { point: 'Introduction & Clear Thesis', explanation: 'Acknowledge vocational pragmatism but assert that theoretical inquiry fosters lifelong cognitive adaptability.' },
      { point: 'Body 1: The Case for Practical Skills', explanation: 'Economic expediency, return on tuition investment, and seamless labor market absorption.' },
      { point: 'Body 2: The Primacy of Theoretical Intellect', explanation: 'Risk of skills obsolescence due to AI; first-principles thinking enables mastery over evolving paradigms.' },
      { point: 'Conclusion & Synthesis', explanation: 'Practical skills should complement rather than supplant theoretical enlightenment.' }
    ],
    keyVocabulary: [
      { word: 'Vocational pragmatism', meaning: 'Chủ nghĩa thực dụng nghề nghiệp', phonetic: '/vəʊˈkeɪ.ʃən.əl ˈpræɡ.mə.tɪ.zəm/' },
      { word: 'Intellectual crucible', meaning: 'Lò luyện trí tuệ hàn lâm tôi luyện bản lĩnh', phonetic: '/ˌɪn.təˈlek.tʃu.əl ˈkruː.sɪ.bəl/' },
      { word: 'Paramount mission', meaning: 'Sứ mệnh tối thượng, quan trọng bậc nhất', phonetic: '/ˈpær.ə.maʊnt ˈmɪʃ.ən/' },
      { word: 'Ephemeral market demands', meaning: 'Nhu cầu thị trường chóng vánh sớm nở tối tàn', phonetic: '/ɪˈfem.ər.əl ˈmɑː.kɪt dɪˈmɑːndz/' },
      { word: 'First-principles thinking', meaning: 'Tư duy từ nguyên lý gốc nền tảng', phonetic: '/fɜːst ˈprɪn.sə.pəlz ˈθɪŋ.kɪŋ/' },
      { word: 'Supplant', meaning: 'Chiếm chỗ, thay thế và triệt tiêu giá trị cốt lõi', phonetic: '/səˈplɑːnt/' }
    ],
    examinerComment: 'Task Achievement 9.0: Lập luận đanh thép, giải quyết thấu đáo cả hai mặt của đề bài, giữ vững lập trường xuyên suốt. Coherence & Cohesion 9.0: Đoạn văn phát triển chuẩn xác theo mô hình PEEL với từ nối chuyển ý điêu luyện. Lexical Resource 9.0: Vốn từ học thuật đỉnh cao, chính xác tuyệt đối về sắc thái ngữ nghĩa. Grammatical Range 9.0: Kết hợp nhuần nhuyễn câu phức, cấu trúc tương phản nhượng bộ và mệnh đề quan hệ.'
  }
];

export const ieltsSpeakingCueCards: SpeakingCueCard[] = [
  {
    id: 'ielts-spk-part1',
    part: 1,
    topic: 'Work, Studies & Leisure Balance (Phản xạ A.R.E.A)',
    cueCardPrompt: 'IELTS Speaking Part 1 Interview: Standard opening inquiries on personal occupation and digital recreation.',
    bandScore: 'Band 8.5+ Model Responses',
    modelAnswer: `Examiner: "Do you prefer studying alone or collaborating in groups?"

Candidate (A.R.E.A): "Honestly, I thrive predominantly in solitary environments when tackling deep conceptual material (Answer), because complete silence eliminates sensory distractions and accelerates my cognitive retention (Reason). For instance, when preparing for high-stakes certification exams, I routinely retreat to quiet university archives (Example). Nevertheless, if the objective involves brainstorming creative strategic campaigns, cross-functional collaboration is indispensable (Alternative)."`,
    idiomaticExpressions: [
      { phrase: 'Thrive in solitary environments', meaning: 'Phát triển mạnh mẽ khi được làm việc một mình trong tĩnh lặng' },
      { phrase: 'Accelerate cognitive retention', meaning: 'Gia tăng tốc độ tiếp thu và ghi nhớ kiến thức' },
      { phrase: 'Cross-functional collaboration', meaning: 'Phối hợp đa phòng ban, đa chuyên môn' }
    ]
  },
  {
    id: 'ielts-spk-part2',
    part: 2,
    topic: 'An Impactful Community Environmental Initiative (Độc thoại Cue Card 2 phút)',
    cueCardPrompt: `Describe an impactful environmental project or community initiative that you participated in or learned about.

You should say:
• What the project was and where it took place
• How you discovered or became involved in it
• What logistical or social challenges were encountered
• And explain why you consider this initiative exceptionally meaningful.`,
    bulletPoints: [
      'Dự án trồng rừng ngập mặn chắn sóng ven biển tại Cần Giờ, Việt Nam',
      'Khám phá qua chương trình tình nguyện sinh thái của trường đại học',
      'Thách thức: Thủy triều bùn lầy khắc nghiệt và thuyết phục ngư dân địa phương',
      'Ý nghĩa: Lá chắn sinh thái bảo vệ đất liền khỏi triều cường và phục hồi đa dạng sinh học'
    ],
    bandScore: 'Band 8.5+ Model Monologue (2 Minutes)',
    modelAnswer: `I would like to speak about a transformative grassroots reforestation initiative that I had the privilege of spearheading two years ago in the coastal biosphere reserve of Can Gio, south of Ho Chi Minh City.

Prior to joining this endeavor, I had been researching wetland ecology and became alarmed by the accelerating erosion threatening indigenous mangrove fringes due to commercial aquaculture expansion. When our university environmental guild launched a pilot restoration drive, I immediately jumped at the opportunity to coordinate field volunteers.

The undertaking was fraught with formidable logistical hurdles. In the early phases, navigating knee-deep tidal mudflats under sweltering tropical heat tested our collective endurance to the limit. More critically, we encountered initial skepticism from localized shrimp-farming communities, who feared that mangrove replanting would encroaching upon their economic yields. To overcome this, our team conducted informative village workshops, demonstrating that robust mangrove ecosystems actually enhance wild shrimp nursery grounds.

Over seven intensive weekends, our coalition successfully planted upwards of 12,000 Rhizophora saplings across twenty degraded hectares. What rendered this project indelible in my memory was not solely the tangible environmental outcome—the creation of a natural storm buffer against storm surges—but the profound mindset shift it galvanized within the youth community. It proved conclusively that when scientific conviction converges with empathetic community outreach, grassroots ecological rehabilitation is genuinely achievable.`,
    areaBreakdown: [
      { step: 'Opening Hook & Past Perfect Setting', content: 'Transformative grassroots reforestation initiative in Can Gio biosphere reserve.' },
      { step: 'Motivation & Past Continuous Background', content: 'Researching wetland ecology and jumping at the volunteer coordination opportunity.' },
      { step: 'Overcoming Friction & Dual Challenges', content: 'Harsh tidal mudflats endurance + winning over skeptical local shrimp farmers through data workshops.' },
      { step: 'Quantifiable Result & Emotional Resonance', content: '12,000 Rhizophora saplings across 20 hectares; long-term storm buffer and youth mindset transformation.' }
    ],
    idiomaticExpressions: [
      { phrase: 'Spearhead an initiative', meaning: 'Tiên phong dẫn đầu một sáng kiến dự án ý nghĩa' },
      { phrase: 'Fraught with formidable hurdles', meaning: 'Đầy rẫy những trở ngại chông gai thách thức lớn' },
      { phrase: 'Jump at the opportunity', meaning: 'Nắm bắt ngay lập tức cơ hội quý báu' },
      { phrase: 'Grassroots rehabilitation', meaning: 'Công cuộc phục hồi bắt nguồn từ cấp cơ sở quần chúng' },
      { phrase: 'Convergence of scientific conviction', meaning: 'Sự hội tụ của niềm tin khoa học và lòng nhiệt huyết' }
    ]
  },
  {
    id: 'ielts-spk-part3',
    part: 3,
    topic: 'Governmental Legislation vs Corporate Responsibility in Ecology (Tranh biện Part 3)',
    cueCardPrompt: 'IELTS Speaking Part 3: In-depth abstract discussion on environmental policy, taxation, and individual ethics.',
    bandScore: 'Band 9.0 Model Debate',
    modelAnswer: `Examiner: "Can voluntary corporate sustainability initiatives ever suffice without stringent state intervention?"

Candidate: "Categorically not. While corporate social responsibility makes for alluring public relations press releases, commercial entities are legally beholden to maximize shareholder profitability. Relying on voluntary philanthropy to resolve planetary crises creates an egregious free-rider problem, where ethical firms are commercially penalized by cutting corners competitors. Therefore, legally binding carbon taxation, stringent emissions caps, and mandatory supply-chain audits enacted by sovereign parliaments are non-negotiable prerequisites for systemic climate mitigation."`,
    idiomaticExpressions: [
      { phrase: 'Beholden to maximize profitability', meaning: 'Bị ràng buộc bởi nghĩa vụ tối đa hóa lợi nhuận tài chính' },
      { phrase: 'Egregious free-rider problem', meaning: 'Vấn nạn kẻ ăn không/trục lợi vô lương tâm trong kinh tế học' },
      { phrase: 'Non-negotiable prerequisites', meaning: 'Điều kiện tiên quyết tuyệt đối không thể thương lượng' }
    ]
  }
];
