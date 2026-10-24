import { ExamQuestion, WritingModelPrompt, SpeakingCueCard } from '../curriculum';

// ============================================================================
// OFFICIAL IELTS LISTENING TEST (EXACTLY 40 QUESTIONS: SECTION 1 TO 4)
// ============================================================================
export const officialListening40Questions: ExamQuestion[] = [
  // SECTION 1: Everyday Social / Accommodation & Community Center Registration (Q1 - Q10)
  {
    id: 'ielts-l-q1',
    skill: 'listening',
    sectionOrPart: 'Listening Section 1 (Community Center Membership & Enrollment)',
    question: '1. What is the surname of the applicant?',
    audioScript: 'Clerk: "Good morning, Westbury Community Center. How may I help you?" Applicant: "Hello, I would like to register for an annual fitness and recreation membership." Clerk: "Certainly. May I have your full name please?" Applicant: "It is Arthur P-E-M-B-E-R-T-O-N, Arthur Pemberton." Clerk: "P-E-M-B-E-R-T-O-N, excellent."',
    options: ['Pemberton', 'Pembarton', 'Pendleton', 'Pemberley'],
    correctAnswer: 'Pemberton',
    bandTarget: 'Band 6.0',
    trapAnalysis: 'Bẫy đánh vần chữ cái: Âm "E" và "A" thường dễ nhầm lẫn, nhưng người nói đánh vần rõ ràng: P-E-M-B-E-R-T-O-N.',
    explanationInVietnamese: 'Người đăng ký đánh vần chính xác họ là P-E-M-B-E-R-T-O-N (Pemberton).'
  },
  {
    id: 'ielts-l-q2',
    skill: 'listening',
    sectionOrPart: 'Listening Section 1 (Community Center Membership & Enrollment)',
    question: '2. What is the applicant’s current flat and street address?',
    audioScript: 'Clerk: "And your address here in Westbury?" Applicant: "I live at Flat 4B, 18 Greenfield Avenue. I moved there last month from High Street." Clerk: "Got it: Flat 4B, 18 Greenfield Avenue."',
    options: ['Flat 4B, 18 Greenfield Avenue', 'Flat 18B, 4 Greenfield Avenue', 'Flat 4B, 18 High Street', 'Flat 14A, 8 Greenfield Avenue'],
    correctAnswer: 'Flat 4B, 18 Greenfield Avenue',
    bandTarget: 'Band 6.0 - 6.5',
    trapAnalysis: 'Bẫy địa chỉ cũ (Distractor Trap): Người nói nhắc đến High Street là địa chỉ tháng trước, địa chỉ hiện tại là Flat 4B, 18 Greenfield Avenue.',
    explanationInVietnamese: 'Địa chỉ hiện tại được xác nhận là Flat 4B, 18 Greenfield Avenue.'
  },
  {
    id: 'ielts-l-q3',
    skill: 'listening',
    sectionOrPart: 'Listening Section 1 (Community Center Membership & Enrollment)',
    question: '3. What is the verified contact telephone number?',
    audioScript: 'Clerk: "And a daytime telephone number?" Applicant: "You can reach me on my mobile: 07700 900348... oh wait, my work extension changed. The best one is 07700 900483." Clerk: "Let me double check: 07700 900483?" Applicant: "Yes, exactly."',
    options: ['07700 900483', '07700 900348', '07700 900384', '07700 900843'],
    correctAnswer: '07700 900483',
    bandTarget: 'Band 6.5',
    trapAnalysis: 'Bẫy tự đính chính (Self-Correction Trap): Số đầu tiên 900348 được sửa lại ngay lập tức thành 900483.',
    explanationInVietnamese: 'Số điện thoại đúng sau khi người nói đính chính là 07700 900483.'
  },
  {
    id: 'ielts-l-q4',
    skill: 'listening',
    sectionOrPart: 'Listening Section 1 (Community Center Membership & Enrollment)',
    question: '4. Which membership tier has Arthur chosen?',
    audioScript: 'Clerk: "We have Silver at £25 monthly, Gold including pool and sauna at £42, and Platinum at £55." Applicant: "I do not need the personal trainer in Platinum, but pool access is essential for my back rehabilitation. Put me down for Gold please." Clerk: "Gold membership selected."',
    options: ['Gold Tier (£42/month)', 'Silver Tier (£25/month)', 'Platinum Tier (£55/month)', 'Bronze Trial Tier'],
    correctAnswer: 'Gold Tier (£42/month)',
    bandTarget: 'Band 6.5',
    trapAnalysis: 'Bẫy loại trừ tính năng: Không chọn Platinum vì không cần HLV cá nhân, chọn Gold vì cần hồ bơi cho điều trị lưng.',
    explanationInVietnamese: 'Arthur chọn gói Gold (£42/tháng) vì bao gồm hồ bơi cần thiết cho phục hồi chức năng lưng.'
  },
  {
    id: 'ielts-l-q5',
    skill: 'listening',
    sectionOrPart: 'Listening Section 1 (Community Center Membership & Enrollment)',
    question: '5. What additional facility does Arthur request access to on weekends?',
    audioScript: 'Applicant: "Does the package permit booking the badminton courts on Saturday mornings?" Clerk: "Yes, Gold members receive two hours of complimentary badminton or squash court bookings weekly."',
    options: ['Badminton courts', 'Squash courts', 'Tennis courts', 'Table tennis hall'],
    correctAnswer: 'Badminton courts',
    bandTarget: 'Band 6.5',
    trapAnalysis: 'Arthur hỏi trực tiếp về "badminton courts" vào sáng thứ Bảy.',
    explanationInVietnamese: 'Arthur yêu cầu đặt sân cầu lông (badminton courts) vào các sáng thứ Bảy.'
  },
  {
    id: 'ielts-l-q6',
    skill: 'listening',
    sectionOrPart: 'Listening Section 1 (Community Center Membership & Enrollment)',
    question: '6. What time does the center swimming pool open on weekdays?',
    audioScript: 'Clerk: "Just a reminder on facility schedules: during weekdays the lane pool opens at 06:15 for early swimmers, though the general leisure pool opens at 08:00." Applicant: "06:15 is perfect for before-work laps."',
    options: ['06:15', '08:00', '07:30', '06:45'],
    correctAnswer: '06:15',
    bandTarget: 'Band 6.5 - 7.0',
    trapAnalysis: 'Bẫy hai mốc giờ: 08:00 là giờ mở hồ giải trí chung (leisure pool), còn hồ bơi bơi làn (lane pool) mở sớm từ 06:15.',
    explanationInVietnamese: 'Hồ bơi bơi làn mở cửa từ 06:15 sáng ngày trong tuần cho người bơi sớm trước giờ làm.'
  },
  {
    id: 'ielts-l-q7',
    skill: 'listening',
    sectionOrPart: 'Listening Section 1 (Community Center Membership & Enrollment)',
    question: '7. How will Arthur make his monthly subscription payments?',
    audioScript: 'Clerk: "Will you be paying by direct debit or credit card?" Applicant: "I prefer setting up an automated direct debit from my checking account to avoid late fees." Clerk: "Direct debit it is."',
    options: ['Automated direct debit', 'Credit card in person', 'Cash monthly', 'Bank cheque'],
    correctAnswer: 'Automated direct debit',
    bandTarget: 'Band 6.5',
    trapAnalysis: 'Phương thức thanh toán được chọn là automated direct debit (trích nợ tự động qua tài khoản ngân hàng).',
    explanationInVietnamese: 'Arthur chọn hình thức trích nợ tự động (direct debit) để tránh phí nộp trễ hạn.'
  },
  {
    id: 'ielts-l-q8',
    skill: 'listening',
    sectionOrPart: 'Listening Section 1 (Community Center Membership & Enrollment)',
    question: '8. What document must Arthur bring to his induction session tomorrow?',
    audioScript: 'Clerk: "For your safety induction tomorrow at 10 AM, please remember to bring a photo ID and proof of address, such as a recent utility bill or bank statement." Applicant: "I have my electric bill ready."',
    options: ['Proof of address (utility bill)', 'Passport size photograph', 'Doctor’s medical certificate', 'Employment verification letter'],
    correctAnswer: 'Proof of address (utility bill)',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Yêu cầu cụ thể: "proof of address, such as a recent utility bill".',
    explanationInVietnamese: 'Arthur cần mang theo giấy tờ chứng minh địa chỉ cư trú (hóa đơn tiền điện sinh hoạt).'
  },
  {
    id: 'ielts-l-q9',
    skill: 'listening',
    sectionOrPart: 'Listening Section 1 (Community Center Membership & Enrollment)',
    question: '9. Who will conduct Arthur’s physical fitness evaluation?',
    audioScript: 'Clerk: "Your fitness assessment will be overseen by our senior physiotherapist, Rebecca Green." Applicant: "Rebecca Green, noted."',
    options: ['Rebecca Green', 'Rachel Grey', 'Richard Green', 'Rebecca Clark'],
    correctAnswer: 'Rebecca Green',
    bandTarget: 'Band 6.5',
    trapAnalysis: 'Tên chuyên gia vật lý trị liệu: Rebecca Green.',
    explanationInVietnamese: 'Chuyên gia vật lý trị liệu phụ trách buổi đánh giá thể lực là Rebecca Green.'
  },
  {
    id: 'ielts-l-q10',
    skill: 'listening',
    sectionOrPart: 'Listening Section 1 (Community Center Membership & Enrollment)',
    question: '10. What complimentary item does Arthur receive upon completing registration?',
    audioScript: 'Clerk: "And as a new member bonus this autumn, here is a voucher for a complimentary sports water bottle and branded towel from our reception shop." Applicant: "Thank you, that is very generous."',
    options: ['A sports water bottle and towel', 'A gym duffel bag', 'Two free personal training passes', 'A pair of swimming goggles'],
    correctAnswer: 'A sports water bottle and towel',
    bandTarget: 'Band 6.5',
    trapAnalysis: 'Quà tặng tân hội viên: voucher nhận bình nước thể thao và khăn tắm (water bottle and towel).',
    explanationInVietnamese: 'Arthur nhận được voucher nhận bình nước thể thao và khăn tắm kỷ niệm của trung tâm.'
  },

  // SECTION 2: Public Monologue / Local Coastal Nature Reserve Orientation (Q11 - Q20)
  {
    id: 'ielts-l-q11',
    skill: 'listening',
    sectionOrPart: 'Listening Section 2 (Brambleton Coastal Heritage & Wetland Park)',
    question: '11. When was the Brambleton Wetland Reserve initially designated as a protected biosphere?',
    audioScript: 'Guide: "Welcome visitors to Brambleton Wetlands. While agricultural drainage began in 1952, the reserve was formally recognized and designated as a protected national biosphere in 1984 under the Ramsar Convention."',
    options: ['1984', '1952', '1996', '1974'],
    correctAnswer: '1984',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Bẫy năm tháng: Năm 1952 là thời điểm tháo nước nông nghiệp, năm 1984 mới là năm được công nhận khu bảo tồn sinh quyển.',
    explanationInVietnamese: 'Khu bảo tồn chính thức được xếp hạng sinh quyển bảo hộ vào năm 1984.'
  },
  {
    id: 'ielts-l-q12',
    skill: 'listening',
    sectionOrPart: 'Listening Section 2 (Brambleton Coastal Heritage & Wetland Park)',
    question: '12. What primary ecological role do the salt marshes perform during tidal surges?',
    audioScript: 'Guide: "Many assume the marshes merely house waterfowl, but during severe storms, their dense rhizome root networks absorb up to 60 percent of coastal surge energy, preventing structural inundation of neighboring residential hamlets."',
    options: [
      'Absorbing storm surge energy to protect residential areas',
      'Filtering freshwater run-off from mountain tributaries',
      'Providing commercial oyster harvesting beds',
      'Generating geothermal steam for park heating'
    ],
    correctAnswer: 'Absorbing storm surge energy to protect residential areas',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Paraphrase: "absorb up to 60 percent of surge energy, preventing structural inundation" tương đương với "Absorbing storm surge energy to protect residential areas".',
    explanationInVietnamese: 'Đầm lầy mặn đóng vai trò tấm chắn hấp thụ xung lực sóng triều bão nhằm bảo vệ khu dân cư lân cận.'
  },
  {
    id: 'ielts-l-q13',
    skill: 'listening',
    sectionOrPart: 'Listening Section 2 (Brambleton Coastal Heritage & Wetland Park)',
    question: '13. Where is the newly renovated Bird Hide observation tower located on the map?',
    audioScript: 'Guide: "If you look at your trail map, start at the Visitor Pavilion. Follow the Boardwalk Trail due north past the reed beds. At the wooden suspension bridge, turn sharp right; the new Bird Hide sits on the eastern promontory overlooking Osprey Inlet."',
    options: [
      'Eastern promontory overlooking Osprey Inlet',
      'Western border next to the car park',
      'Southern foot of the suspension bridge',
      'Directly adjacent to the Visitor Pavilion'
    ],
    correctAnswer: 'Eastern promontory overlooking Osprey Inlet',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Bẫy định hướng bản đồ: Qua cầu treo rẽ phải gắt hướng đông, chòi quan sát nằm trên mũi đất phía đông nhìn ra Osprey Inlet.',
    explanationInVietnamese: 'Chòi quan sát chim mới nằm tại mũi đất phía đông nhìn ra vịnh Osprey Inlet.'
  },
  {
    id: 'ielts-l-q14',
    skill: 'listening',
    sectionOrPart: 'Listening Section 2 (Brambleton Coastal Heritage & Wetland Park)',
    question: '14. Why is cycling strictly restricted along the western gravel perimeter?',
    audioScript: 'Guide: "Please take note: cycling is permitted on paved loops, but prohibited on the western gravel path due to the ground-nesting season of the endangered Ringed Plover."',
    options: [
      'To protect the ground-nesting grounds of rare plovers',
      'The gravel surface is prone to severe landslides',
      'Ongoing construction of high-voltage transmission lines',
      'The path is too narrow for both walkers and bicycles'
    ],
    correctAnswer: 'To protect the ground-nesting grounds of rare plovers',
    bandTarget: 'Band 7.0 - 7.5',
    trapAnalysis: 'Nguyên nhân sinh thái: "due to the ground-nesting season of the endangered Ringed Plover".',
    explanationInVietnamese: 'Cấm đi xe đạp trên đoạn đường sỏi phía tây vì đây là mùa làm tổ dưới mặt đất của loài chim choi choi quý hiếm.'
  },
  {
    id: 'ielts-l-q15',
    skill: 'listening',
    sectionOrPart: 'Listening Section 2 (Brambleton Coastal Heritage & Wetland Park)',
    question: '15. What safety precaution must visitors observe regarding the tidal estuary?',
    audioScript: 'Guide: "The incoming tide advances faster than a galloping horse across the mudflats. Always consult the tide timetable at the gatehouse and return to the main levee two hours prior to high water."',
    options: [
      'Return to the main levee two hours before high tide',
      'Always wear rubber chest waders in the mudflats',
      'Carry emergency flare signaling kits at all times',
      'Never travel in groups larger than three individuals'
    ],
    correctAnswer: 'Return to the main levee two hours before high tide',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Quy tắc an toàn thủy triều: Phải quay lại đê chính trước khi triều dâng đỉnh điểm 2 tiếng đồng hồ ("two hours prior to high water").',
    explanationInVietnamese: 'Du khách phải trở về bờ đê chính tối thiểu 2 giờ trước khi đỉnh triều dâng lên.'
  },
  {
    id: 'ielts-l-q16',
    skill: 'listening',
    sectionOrPart: 'Listening Section 2 (Brambleton Coastal Heritage & Wetland Park)',
    question: '16. What volunteer activity is held every second Sunday of each month?',
    audioScript: 'Guide: "Our dedicated community rangers run regular conservation days. On the second Sunday of each month, we host native dune-grass planting and microplastic beach sweeps."',
    options: [
      'Dune-grass planting and microplastic cleanups',
      'Wild bird ringing and tagging expeditions',
      'Guided night owl acoustic surveying',
      'Historical museum artifact cataloging'
    ],
    correctAnswer: 'Dune-grass planting and microplastic cleanups',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Hoạt động định kỳ chủ nhật tuần thứ hai: trồng cỏ giữ cồn cát và dọn rác vi nhựa bãi biển.',
    explanationInVietnamese: 'Chủ nhật thứ hai hàng tháng tổ chức trồng cỏ giữ cồn cát bản địa và thu gom rác thải vi nhựa bãi biển.'
  },
  {
    id: 'ielts-l-q17',
    skill: 'listening',
    sectionOrPart: 'Listening Section 2 (Brambleton Coastal Heritage & Wetland Park)',
    question: '17. How can visitors hire audio interpretive wands during their tour?',
    audioScript: 'Guide: "Audio wands with multilingual commentary are available at the information desk for a refundable deposit of £5."',
    options: ['Leaving a £5 refundable deposit at the desk', 'Paying a non-refundable £10 rental charge', 'Downloading a proprietary mobile application', 'Registering a credit card passport bond'],
    correctAnswer: 'Leaving a £5 refundable deposit at the desk',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Chi phí mượn thiết bị thuyết minh: tiền cọc có hoàn lại £5 ("refundable deposit of £5").',
    explanationInVietnamese: 'Du khách có thể mượn thiết bị thuyết minh bằng cách đặt cọc 5 bảng Anh (được hoàn trả sau khi trả máy).'
  },
  {
    id: 'ielts-l-q18',
    skill: 'listening',
    sectionOrPart: 'Listening Section 2 (Brambleton Coastal Heritage & Wetland Park)',
    question: '18. What special facility is provided for disabled and mobility-impaired guests?',
    audioScript: 'Guide: "We have two motorized all-terrain mobility wheelchairs with balloon tires that can traverse soft sand, bookable 24 hours in advance free of charge."',
    options: [
      'Motorized all-terrain wheelchairs with balloon tires',
      'An elevated cable gondola across the salt marsh',
      'Golf cart transport shuttles operating every 15 minutes',
      'A paved sensory scent garden exclusively for wheelchairs'
    ],
    correctAnswer: 'Motorized all-terrain wheelchairs with balloon tires',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Trang thiết bị hỗ trợ người khuyết tật: xe lăn địa hình có lốp phao (balloon tires) di chuyển được trên cát mềm.',
    explanationInVietnamese: 'Khu bảo tồn cung cấp xe lăn điện chuyên dụng bánh phao để đi trên cát mềm, đặt trước 24 giờ miễn phí.'
  },
  {
    id: 'ielts-l-q19',
    skill: 'listening',
    sectionOrPart: 'Listening Section 2 (Brambleton Coastal Heritage & Wetland Park)',
    question: '19. What species of marine mammal is frequently sighted from the headland lookout in autumn?',
    audioScript: 'Guide: "While porpoises appear sporadically, October and November bring breeding colonies of Grey Seals resting on the sandbanks."',
    options: ['Grey Seals', 'Harbour Porpoises', 'Minke Whales', 'Bottlenose Dolphins'],
    correctAnswer: 'Grey Seals',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Bẫy động vật: Cá heo chuột (porpoises) chỉ xuất hiện rải rác, còn loài thường xuyên tập trung vào mùa thu là Hải cẩu xám (Grey Seals).',
    explanationInVietnamese: 'Hải cẩu xám (Grey Seals) thường xuyên xuất hiện tại các bãi cát ngầm vào tháng 10 và tháng 11.'
  },
  {
    id: 'ielts-l-q20',
    skill: 'listening',
    sectionOrPart: 'Listening Section 2 (Brambleton Coastal Heritage & Wetland Park)',
    question: '20. What is the closing policy of the park cafe?',
    audioScript: 'Guide: "Finally, the Driftwood Cafe stops serving hot food at 16:30, although warm drinks and pastries remain available until closing at 17:15."',
    options: [
      'Hot food stops at 16:30, drinks available until 17:15',
      'Everything shuts down precisely at 16:30',
      'Hot meals served continuously until 17:30',
      'The cafe remains open 24 hours for registered campers'
    ],
    correctAnswer: 'Hot food stops at 16:30, drinks available until 17:15',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Bẫy hai thời điểm: Thức ăn nóng ngừng phục vụ lúc 16:30, nước uống và bánh ngọt tiếp tục đến 17:15.',
    explanationInVietnamese: 'Bếp ngừng phục vụ đồ ăn nóng lúc 16:30, đồ uống nóng và bánh ngọt bán đến 17:15 khi đóng cửa.'
  },

  // SECTION 3: Academic Student-Tutor Discussion / Dissertation Methodology (Q21 - Q30)
  {
    id: 'ielts-l-q21',
    skill: 'listening',
    sectionOrPart: 'Listening Section 3 (Postgraduate Marine Ecology Dissertation Tutorial)',
    question: '21. What primary research flaw did Dr. Harris identify in Liam and Chloe’s initial sampling design?',
    audioScript: 'Dr. Harris: "Looking over your draft prospectus, your hypothesis is sound, but collecting benthic sediment samples solely during neap tide introduces a profound selection bias. Neap currents are insufficient to dislodge deposited synthetic microfibers." Chloe: "So we failed to capture baseline turbulence differences."',
    options: [
      'Sampling solely during neap tides failed to account for tidal hydrodynamic variations.',
      'The mesh size of their plankton collection nets was too coarse.',
      'Their laboratory spectrophotometer lacked calibrated optical filters.',
      'They failed to secure environmental ethics clearance for benthic dredging.'
    ],
    correctAnswer: 'Sampling solely during neap tides failed to account for tidal hydrodynamic variations.',
    bandTarget: 'Band 8.0',
    trapAnalysis: 'Thuật ngữ học thuật: "collecting samples solely during neap tide introduces selection bias... insufficient to dislodge microfibers" -> "Sampling solely during neap tides failed to account for tidal hydrodynamic variations".',
    explanationInVietnamese: 'Khuyết điểm phương pháp luận là chỉ lấy mẫu khi triều kém (neap tide), bỏ qua tác động của dòng chảy xiết tới hạt vi nhựa lắng đọng.'
  },
  {
    id: 'ielts-l-q22',
    skill: 'listening',
    sectionOrPart: 'Listening Section 3 (Postgraduate Marine Ecology Dissertation Tutorial)',
    question: '22. Which analytical method does Chloe propose to identify polymer types without destroying the specimens?',
    audioScript: 'Liam: "We considered thermal gravimetric pyrolysis, but it disintegrates the microscopic fragments." Chloe: "That is why I insisted on micro-Attenuated Total Reflectance Fourier-Transform Infrared spectroscopy (ATR-FTIR); it allows non-destructive molecular fingerprinting of individual polymer chains."',
    options: [
      'Micro-ATR Fourier-Transform Infrared Spectroscopy (ATR-FTIR)',
      'Thermal gravimetric pyrolysis decomposition',
      'Gas chromatography-mass spectrometry (GC-MS)',
      'Acid digestion followed by visual stereomicroscopy'
    ],
    correctAnswer: 'Micro-ATR Fourier-Transform Infrared Spectroscopy (ATR-FTIR)',
    bandTarget: 'Band 8.5',
    trapAnalysis: 'Phân biệt 2 phương pháp: Pyrolysis làm cháy mẫu phân rã (disintegrates), còn ATR-FTIR phân tích không phá hủy (non-destructive).',
    explanationInVietnamese: 'Chloe đề xuất phương pháp quang phổ hồng ngoại FTIR vi mô vì phân tích được chuỗi phân tử mà không phá hủy mẫu vật.'
  },
  {
    id: 'ielts-l-q23',
    skill: 'listening',
    sectionOrPart: 'Listening Section 3 (Postgraduate Marine Ecology Dissertation Tutorial)',
    question: '23. Why did Liam express skepticism regarding the municipal stormwater data from 2021?',
    audioScript: 'Liam: "I cross-referenced the council stormwater runoff metrics with meteorological precipitation logs. During November 2021, two automated flow sensors malfunctioned after heavy flooding, meaning the recorded pollutant surge was largely interpolated by computer models rather than empirical readings."',
    options: [
      'Malfunctioning sensors caused values to be computationally estimated rather than measured empirically.',
      'The municipal agency deliberately falsified data to conceal chemical spillages.',
      'The sensor locations were situated downstream from an industrial effluent pipe.',
      'The sampling intervals were recorded every 48 hours instead of hourly.'
    ],
    correctAnswer: 'Malfunctioning sensors caused values to be computationally estimated rather than measured empirically.',
    bandTarget: 'Band 8.0 - 8.5',
    trapAnalysis: 'Paraphrase: "sensors malfunctioned... pollutant surge was largely interpolated by models rather than empirical readings" -> "computationally estimated rather than measured empirically".',
    explanationInVietnamese: 'Liam hoài nghi vì cảm biến bị hỏng sau trận lũ, số liệu là do phần mềm nội suy ước tính chứ không phải đo đạc thực nghiệm.'
  },
  {
    id: 'ielts-l-q24',
    skill: 'listening',
    sectionOrPart: 'Listening Section 3 (Postgraduate Marine Ecology Dissertation Tutorial)',
    question: '24. What modification to their control group does Dr. Harris mandate?',
    audioScript: 'Dr. Harris: "You cannot compare estuarine samples against distilled laboratory water. You must collect pristine offshore oceanic water beyond the continental shelf break to serve as your negative control." Liam: "Understood, we will request deep-sea baseline water from the marine institute."',
    options: [
      'Collecting offshore oceanic water from beyond the continental shelf break',
      'Using double-deionized laboratory distilled water',
      'Taking water from an isolated freshwater mountain tarn',
      'Employing commercial bottled mineral spring water'
    ],
    correctAnswer: 'Collecting offshore oceanic water from beyond the continental shelf break',
    bandTarget: 'Band 8.0',
    trapAnalysis: 'Bác bỏ nước cất phòng thí nghiệm: Phải lấy nước biển khơi ngoài rìa thềm lục địa làm nhóm đối chứng chuẩn (negative control).',
    explanationInVietnamese: 'Tiến sĩ Harris yêu cầu lấy mẫu nước đại dương xa bờ ngoài thềm lục địa để làm đối chứng âm thay vì dùng nước cất.'
  },
  {
    id: 'ielts-l-q25',
    skill: 'listening',
    sectionOrPart: 'Listening Section 3 (Postgraduate Marine Ecology Dissertation Tutorial)',
    question: '25. What logistical challenge do the students face regarding the university research vessel?',
    audioScript: 'Chloe: "The department research vessel ‘Nautilus’ is fully booked by the geophysics team throughout April. We can only secure a four-day sea window in the first week of May." Dr. Harris: "Then you must streamline your sampling protocols to maximize those ninety-six hours."',
    options: [
      'The vessel is only available for a single four-day window in early May.',
      'The fuel budget for the vessel exceeded department grant limits.',
      'The ship captain refuses to deploy heavy benthic corers in bad weather.',
      'The onboard refrigeration units are currently under overhaul.'
    ],
    correctAnswer: 'The vessel is only available for a single four-day window in early May.',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Vướng mắc về tàu nghiên cứu: Tàu đã kín lịch tháng 4, chỉ mượn được duy nhất 4 ngày (96 tiếng) đầu tháng 5.',
    explanationInVietnamese: 'Tàu nghiên cứu chỉ trống lịch trong đúng 4 ngày đầu tháng 5 do tháng 4 đã bị đội địa vật lý đặt kín.'
  },
  {
    id: 'ielts-l-q26',
    skill: 'listening',
    sectionOrPart: 'Listening Section 3 (Postgraduate Marine Ecology Dissertation Tutorial)',
    question: '26. How do the students plan to minimize airborne contamination during microplastic filtration?',
    audioScript: 'Liam: "To prevent airborne synthetic fibers shedding from our clothing into the Petri dishes, we will conduct all filtration inside a laminar flow cabinet while wearing 100% unbleached cotton lab coats."',
    options: [
      'Filtration inside a laminar flow hood wearing 100% cotton garments',
      'Spraying the laboratory air with electrostatic ionic precipitators',
      'Conducting all procedures inside a hermetically sealed vacuum chamber',
      'Wearing disposable polyester cleanroom protective suits'
    ],
    correctAnswer: 'Filtration inside a laminar flow hood wearing 100% cotton garments',
    bandTarget: 'Band 8.0',
    trapAnalysis: 'Bẫy vật liệu: Không mặc áo polyeste vì sẽ làm rơi sợi tổng hợp vào mẫu; phải mặc áo 100% cotton và làm việc trong tủ thổi khí vô trùng (laminar flow cabinet).',
    explanationInVietnamese: 'Thực hiện lọc mẫu trong tủ cấy vô trùng laminar flow và mặc áo blouse 100% cotton không tẩy trắng để tránh sợi nhân tạo bay vào.'
  },
  {
    id: 'ielts-l-q27',
    skill: 'listening',
    sectionOrPart: 'Listening Section 3 (Postgraduate Marine Ecology Dissertation Tutorial)',
    question: '27. What statistical analysis software does Dr. Harris recommend for multivariate ordination?',
    audioScript: 'Dr. Harris: "Standard ANOVA will be insufficient for this multifaceted community matrix. I recommend utilizing R packages such as vegan for non-metric multidimensional scaling (NMDS)." Chloe: "I already have basic scripting experience in R."',
    options: ['R package vegan for NMDS ordination', 'IBM SPSS Statistics version 28', 'GraphPad Prism nonlinear regression', 'Python SciPy cluster analysis'],
    correctAnswer: 'R package vegan for NMDS ordination',
    bandTarget: 'Band 8.0 - 8.5',
    trapAnalysis: 'Phần mềm và gói thống kê chuyên sâu: R package vegan dành cho NMDS (non-metric multidimensional scaling).',
    explanationInVietnamese: 'Tiến sĩ Harris khuyên dùng ngôn ngữ R với gói vegan để chạy ma trận sắp đặt đa chiều phi metric NMDS.'
  },
  {
    id: 'ielts-l-q28',
    skill: 'listening',
    sectionOrPart: 'Listening Section 3 (Postgraduate Marine Ecology Dissertation Tutorial)',
    question: '28. When must Liam and Chloe submit their finalized ethics risk assessment form?',
    audioScript: 'Dr. Harris: "Remember that the faculty ethics board convenes on the 20th. Your completed biosafety and environmental impact filings must be signed off by me no later than Friday the 15th at noon." Liam: "We will deliver the physical copy to your office on Thursday the 14th."',
    options: ['Friday the 15th at 12:00 PM', 'Thursday the 14th at 5:00 PM', 'Monday the 20th at 9:00 AM', 'Wednesday the 13th at noon'],
    correctAnswer: 'Friday the 15th at 12:00 PM',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Bẫy ngày hẹn chót: Hội đồng họp ngày 20, sinh viên dự định nộp thứ Năm 14, nhưng hạn chót bắt buộc của giảng viên là trưa thứ Sáu ngày 15 ("no later than Friday the 15th at noon").',
    explanationInVietnamese: 'Hạn chót giảng viên quy định là trước 12h trưa thứ Sáu ngày 15.'
  },
  {
    id: 'ielts-l-q29',
    skill: 'listening',
    sectionOrPart: 'Listening Section 3 (Postgraduate Marine Ecology Dissertation Tutorial)',
    question: '29. What supplementary funding source does Chloe suggest applying for?',
    audioScript: 'Chloe: "I noticed the National Estuarine Wildlife Trust is offering an equipment micro-grant of £1,500 for postgraduate research into marine plastic ingestion." Dr. Harris: "A stellar idea; I will gladly write your reference letter."',
    options: [
      'An equipment micro-grant from the National Estuarine Wildlife Trust',
      'The University Chancellor’s international travel scholarship',
      'A commercial sponsorship from a local port logistics company',
      'A crowdsourced scientific crowdfunding campaign'
    ],
    correctAnswer: 'An equipment micro-grant from the National Estuarine Wildlife Trust',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Nguồn tài trợ bổ sung: Viện tín thác Estuarine Wildlife Trust cung cấp học bổng trang thiết bị £1,500.',
    explanationInVietnamese: 'Chloe đề xuất xin gói tài trợ thiết bị nghiên cứu 1,500 bảng từ Quỹ Bảo tồn Sinh thái Cửa sông Quốc gia.'
  },
  {
    id: 'ielts-l-q30',
    skill: 'listening',
    sectionOrPart: 'Listening Section 3 (Postgraduate Marine Ecology Dissertation Tutorial)',
    question: '30. What is the key focus of their upcoming literature review section?',
    audioScript: 'Dr. Harris: "Ensure your chapter two does not read like a mere chronological list. It must synthesize trophic magnification: how microplastics absorb persistent organic pollutants and concentrate up the pelagic food chain." Liam: "Trophic transfer and bioaccumulation will be our central organizing theme."',
    options: [
      'Trophic transfer, toxicant sorption, and biomagnification up marine food chains',
      'A chronological history of polymer invention since World War II',
      'Comparative legislation on single-use shopping bag bans across Europe',
      'Economic valuations of ecotourism losses caused by coastal debris'
    ],
    correctAnswer: 'Trophic transfer, toxicant sorption, and biomagnification up marine food chains',
    bandTarget: 'Band 8.0 - 8.5',
    trapAnalysis: 'Chủ đề trọng tâm tổng quan tài liệu: Chuyển dịch qua các bậc dinh dưỡng và tích lũy sinh học chất ô nhiễm hữu cơ (trophic transfer & biomagnification).',
    explanationInVietnamese: 'Trọng tâm chương tổng quan là cơ chế tích lũy sinh học và truyền độc chất hữu cơ lên đỉnh chuỗi thức ăn đại dương.'
  },

  // SECTION 4: Academic Monologue / Architecture & Archaeoacoustics Lecture (Q31 - Q40)
  {
    id: 'ielts-l-q31',
    skill: 'listening',
    sectionOrPart: 'Listening Section 4 (Archaeoacoustics & Ancient Megalithic Resonant Architecture)',
    question: '31. What is the interdisciplinary scope of the emerging field of archaeoacoustics?',
    audioScript: 'Lecturer: "Good morning students. Today we examine archaeoacoustics—the multidisciplinary convergence of archaeology, structural architecture, and acoustic physics to reconstruct how ancient sonic landscapes shaped religious rites and cognitive states."',
    options: [
      'The synthesis of archaeology, architecture, and sonic physics to evaluate ancient soundscapes',
      'The chemical dating of musical instruments discovered in Neolithic barrows',
      'The linguistic reconstruction of extinct prehistoric dialects',
      'The geological analysis of sonic resonance in volcanic subterranean caverns'
    ],
    correctAnswer: 'The synthesis of archaeology, architecture, and sonic physics to evaluate ancient soundscapes',
    bandTarget: 'Band 8.0',
    trapAnalysis: 'Định nghĩa học thuật: "multidisciplinary convergence of archaeology, structural architecture, and acoustic physics to reconstruct sonic landscapes".',
    explanationInVietnamese: 'Khảo cổ âm học là ngành liên ngành kết hợp khảo cổ, kiến trúc và vật lý âm thanh để tái tạo không gian âm hưởng cổ xưa.'
  },
  {
    id: 'ielts-l-q32',
    skill: 'listening',
    sectionOrPart: 'Listening Section 4 (Archaeoacoustics & Ancient Megalithic Resonant Architecture)',
    question: '32. At what specific resonant acoustic frequency do many Neolithic subterranean chambers vibrate?',
    audioScript: 'Lecturer: "Pioneering acoustic measurements across chambered cairns in Ireland and Malta—such as Newgrange and the Ħal Saflieni Hypogeum—consistently identify a dominant standing-wave resonant frequency hovering precisely at 110 to 112 Hertz."',
    options: ['110 to 112 Hertz', '440 Hertz', '60 to 65 Hertz', '220 to 225 Hertz'],
    correctAnswer: '110 to 112 Hertz',
    bandTarget: 'Band 8.5',
    trapAnalysis: 'Tần số sóng đứng cộng hưởng được đo đạc liên tục ở mức 110 - 112 Hz.',
    explanationInVietnamese: 'Tần số cộng hưởng sóng đứng tại các hầm mộ Newgrange và hang động Hypogeum được xác định ổn định ở mức 110 - 112 Hz.'
  },
  {
    id: 'ielts-l-q33',
    skill: 'listening',
    sectionOrPart: 'Listening Section 4 (Archaeoacoustics & Ancient Megalithic Resonant Architecture)',
    question: '33. What neurological effect was observed when human subjects were exposed to this 110 Hz acoustic resonance?',
    audioScript: 'Lecturer: "Neuro-imaging studies utilizing functional MRI revealed that chanting at 110 Hertz induces a localized deactivation of the left temporal lobe, shifting neurological processing towards right-hemispheric emotional and trance states."',
    options: [
      'Deactivation of the left temporal lobe and activation of right-hemisphere emotional processing',
      'Suppression of melatonin synthesis leading to prolonged wakefulness',
      'Acute sensory overload in the visual cortex causing auditory hallucinations',
      'Immediate elevation of cortisol and flight-or-fight adrenaline surges'
    ],
    correctAnswer: 'Deactivation of the left temporal lobe and activation of right-hemisphere emotional processing',
    bandTarget: 'Band 8.5 - 9.0',
    trapAnalysis: 'Tác động thần kinh học: fMRI cho thấy ức chế thùy thái dương trái và chuyển vùng xử lý sang bán cầu não phải (trance & emotion).',
    explanationInVietnamese: 'Nghiên cứu fMRI chứng minh âm thanh 110 Hz làm giảm hoạt tính thùy thái dương trái, kích hoạt cảm xúc và trạng thái xuất thần ở bán cầu não phải.'
  },
  {
    id: 'ielts-l-q34',
    skill: 'listening',
    sectionOrPart: 'Listening Section 4 (Archaeoacoustics & Ancient Megalithic Resonant Architecture)',
    question: '34. Why did builders of the Chavín de Huántar circular plaza in Peru channel rushing mountain river water through subterranean stone canals?',
    audioScript: 'Lecturer: "At Chavín de Huántar in the Peruvian Andes, subterranean acoustic hydraulic ducts channeled glacial torrents directly under the ceremonial plaza. This produced an ominous, low-frequency acoustic rumble, intended to evoke the terrifying roar of sacred jaguars."',
    options: [
      'To generate low-frequency rumbling sounds mimicking the roar of mythological jaguars',
      'To irrigate terraced maize fields during arid summer droughts',
      'To cool internal stone chambers during intense solar radiation',
      'To wash away ritual sacrifices into the adjacent river valley'
    ],
    correctAnswer: 'To generate low-frequency rumbling sounds mimicking the roar of mythological jaguars',
    bandTarget: 'Band 8.5',
    trapAnalysis: 'Mục đích nghi lễ âm thanh: Dòng nước ngầm tạo ra tiếng gầm trầm rền như tiếng báo thiêng (jaguar) để gây kinh sợ trong nghi thức.',
    explanationInVietnamese: 'Kênh dẫn nước ngầm dưới quảng trường Chavín được thiết kế để tạo tiếng rền vang tần số thấp giả lập tiếng gầm của loài báo thần.'
  },
  {
    id: 'ielts-l-q35',
    skill: 'listening',
    sectionOrPart: 'Listening Section 4 (Archaeoacoustics & Ancient Megalithic Resonant Architecture)',
    question: '35. What unique property of Strombus conch shells was utilized by Chavín priests?',
    audioScript: 'Lecturer: "Excavators recovered twenty intricately carved Strombus marine conch trumpets. When blown inside the labyrinthine stone galleries, their acoustic pressure waves propagate omnidirectionally, rendering it physiologically impossible for worshippers to pinpoint the source of the sound."',
    options: [
      'They produce omnidirectional sound waves that disguise the spatial source of the audio',
      'They emit ultrasonic frequencies inaudible to human ears but perceptible to dogs',
      'Their shell nacre preserves musical pitches without pitch drift over centuries',
      'They amplified human speech to reach crowds exceeding ten thousand citizens'
    ],
    correctAnswer: 'They produce omnidirectional sound waves that disguise the spatial source of the audio',
    bandTarget: 'Band 8.5',
    trapAnalysis: 'Đặc tính âm học ảo ảnh không gian: Âm thanh ốc tù và lan tỏa đa hướng (omnidirectional) khiến người nghe không thể định vị nguồn phát.',
    explanationInVietnamese: 'Ốc tù và Strombus tạo ra sóng âm đẳng hướng, khiến người tham gia tế lễ mất khả năng xác định vị trí nguồn âm thanh phát ra từ đâu.'
  },
  {
    id: 'ielts-l-q36',
    skill: 'listening',
    sectionOrPart: 'Listening Section 4 (Archaeoacoustics & Ancient Megalithic Resonant Architecture)',
    question: '36. What acoustic phenomenon occurs at the Mayan pyramid of El Castillo at Chichen Itza?',
    audioScript: 'Lecturer: "At the stepped pyramid of El Castillo, a handclap at the base of the staircase reverberates off the stone risers to produce an acoustic chirp replicating the exact descending chirping cry of the sacred Quetzal bird."',
    options: [
      'A handclap echoes off the stepped risers to mimic the chirp of the sacred Quetzal bird',
      'Whispers at one corner travel along the wall to be heard clearly 100 meters away',
      'Wind whistling through upper apertures plays a five-note pentatonic scale',
      'Footsteps on the pyramid summit produce seismic tremors recorded miles away'
    ],
    correctAnswer: 'A handclap echoes off the stepped risers to mimic the chirp of the sacred Quetzal bird',
    bandTarget: 'Band 8.0 - 8.5',
    trapAnalysis: 'Hiện tượng âm học Chichen Itza: Tiếng vỗ tay dội qua các bậc thang tạo thành tiếng hót của chim thần Quetzal.',
    explanationInVietnamese: 'Tiếng vỗ tay ở chân tháp El Castillo dội qua các bậc thang đá tạo thành chuỗi âm thanh luyến láy giống hệt tiếng chim thiêng Quetzal.'
  },
  {
    id: 'ielts-l-q37',
    skill: 'listening',
    sectionOrPart: 'Listening Section 4 (Archaeoacoustics & Ancient Megalithic Resonant Architecture)',
    question: '37. How did Greek architects in the 4th century BCE achieve acoustic perfection in the Epidaurus Amphitheatre?',
    audioScript: 'Lecturer: "Calculations confirm that the limestone tiered seating at Epidaurus acts as an acoustic filter. It absorbs low-frequency background noise like rustling spectator clothing under 500 Hz, while back-scattering and projecting high-frequency human consonant speech all the way to the 55th row."',
    options: [
      'The fluted limestone benches filter low-frequency ambient murmurs while amplifying speech consonants',
      'Bronze acoustic resonators were suspended beneath the wooden proscenium stage',
      'The circular orchestra pit was lined with porous pumice stones to dampen echoes',
      'The hillside slope was hollowed out to create a natural parabolic megaphone'
    ],
    correctAnswer: 'The fluted limestone benches filter low-frequency ambient murmurs while amplifying speech consonants',
    bandTarget: 'Band 8.5',
    trapAnalysis: 'Cơ chế lọc âm của đá vôi: Hàng ghế đá vôi hấp thụ tiếng ồn nền tần số thấp (<500Hz) và phản xạ tán xạ phụ âm giọng nói lên tận hàng ghế thứ 55.',
    explanationInVietnamese: 'Các bậc đá vôi hoạt động như bộ lọc tiêu âm tần số thấp dưới 500Hz, đồng thời khuếch đại tán xạ phụ âm giọng nói con người lên tận hàng ghế trên cùng.'
  },
  {
    id: 'ielts-l-q38',
    skill: 'listening',
    sectionOrPart: 'Listening Section 4 (Archaeoacoustics & Ancient Megalithic Resonant Architecture)',
    question: '38. What modern scanning technology allows archaeologists to non-invasively simulate ancient sound propagation?',
    audioScript: 'Lecturer: "Today, rather than conducting intrusive physical excavations, researchers employ terrestrial LiDAR laser scanning to construct millimeter-accurate three-dimensional spatial models, feeding the point clouds into acoustic ray-tracing algorithms."',
    options: [
      'Terrestrial LiDAR scanning paired with acoustic ray-tracing algorithms',
      'Ground-penetrating radar coupled with seismic dynamite detonators',
      'Satellite synthetic aperture radar thermal radiometry',
      'Underground magnetic resonance electrical resistivity tomography'
    ],
    correctAnswer: 'Terrestrial LiDAR scanning paired with acoustic ray-tracing algorithms',
    bandTarget: 'Band 8.5',
    trapAnalysis: 'Công nghệ mô phỏng hiện đại: Sử dụng máy quét LiDAR mặt đất kết hợp thuật toán ray-tracing mô phỏng tia âm học.',
    explanationInVietnamese: 'Công nghệ quét laser LiDAR kết hợp thuật toán truy vết tia sóng âm (ray-tracing) giúp mô phỏng âm học 3D không xâm lấn.'
  },
  {
    id: 'ielts-l-q39',
    skill: 'listening',
    sectionOrPart: 'Listening Section 4 (Archaeoacoustics & Ancient Megalithic Resonant Architecture)',
    question: '39. According to the lecturer, what fundamental mistake do modern historians make when assessing ancient architecture?',
    audioScript: 'Lecturer: "Modern western scholarship has exhibited an acute ocular-centric bias. We obsess over visual aesthetics, friezes, and symmetries, completely neglecting that for oral, pre-literate societies, auditory sensory immersion was the paramount medium of cosmic revelation."',
    options: [
      'Prioritizing visual symmetry and aesthetics while ignoring auditory sensory immersion',
      'Overestimating the architectural structural durability of mortarless masonry',
      'Assuming all religious structures served exclusively astronomical alignment purposes',
      'Failing to translate ancient musical notation engraved onto stone obelisks'
    ],
    correctAnswer: 'Prioritizing visual symmetry and aesthetics while ignoring auditory sensory immersion',
    bandTarget: 'Band 8.5 - 9.0',
    trapAnalysis: 'Sai lầm trọng thị giác (ocular-centric bias): Quá chú ý đến vẻ đẹp hình ảnh thị giác mà bỏ quên thế giới âm thanh trong xã hội truyền khẩu.',
    explanationInVietnamese: 'Sai lầm căn bản là thiên vị thị giác (ocular-centric bias), chỉ chăm chú vào hình khối kiến trúc mà bỏ qua thế giới thính giác sống còn của các xã hội truyền miệng.'
  },
  {
    id: 'ielts-l-q40',
    skill: 'listening',
    sectionOrPart: 'Listening Section 4 (Archaeoacoustics & Ancient Megalithic Resonant Architecture)',
    question: '40. What is the assigned preparatory reading for next week’s seminar?',
    audioScript: 'Lecturer: "For next Tuesday’s colloquium, please read chapter four of Professor David Lubman’s monograph on acoustic ethnography, available on the university digital repository."',
    options: [
      'Chapter 4 of Professor David Lubman’s monograph on acoustic ethnography',
      'The introductory overview of Stonehenge archaeoastronomy',
      'A journal article on Mayan hieroglyphic phonetic transcription',
      'Vitruvius’ De Architectura books five and six on Roman theaters'
    ],
    correctAnswer: 'Chapter 4 of Professor David Lubman’s monograph on acoustic ethnography',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Bài đọc chuẩn bị tuần tới: Chương 4 chuyên khảo của GS David Lubman về dân tộc học âm thanh.',
    explanationInVietnamese: 'Tài liệu bắt buộc đọc cho buổi hội thảo tiếp theo là Chương 4 cuốn sách chuyên khảo của Giáo sư David Lubman.'
  }
];

// ============================================================================
// OFFICIAL IELTS READING TEST (EXACTLY 40 QUESTIONS: PASSAGES 1, 2, AND 3)
// ============================================================================
export const officialReading40Questions: ExamQuestion[] = [
  // PASSAGE 1: The Resurgence of Urban Vertical Agriculture (Q1 - Q13)
  {
    id: 'ielts-r-q1',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 1: Urban Vertical Farming',
    question: "1. TRUE/FALSE/NOT GIVEN: The concept of multi-story vertical agriculture was completely unknown prior to Dickson Despommier's 1999 Columbia University paper.",
    passage: `READING PASSAGE 1: THE RESURGENCE OF URBAN VERTICAL AGRICULTURE

Paragraph A: Throughout humanity's agrarian history, agriculture has been tethered to horizontal land expanses. As metropolitan demographics accelerate—with global urban populations projected to surpass 68 percent by 2050—traditional field farming confronts insurmountable logistical impediments. Arable soil degradation, groundwater depletion, and astronomical distribution emissions have catalyzed interest in Controlled Environment Agriculture (CEA). While indigenous pre-Columbian societies developed rudimentary vertical terracing and Babylonians engineered hanging gardens, the contemporary paradigm of indoor, multi-tiered hydroponic skyscrapers was codified in 1999 by Columbia University ecologist Dickson Despommier.

Paragraph B: At the operational core of modern vertical agriculture lies closed-loop aeroponics and hydroponics. Instead of soil substrates, plant roots are suspended in circulating mist or nutrient-dosed aqueous solutions. Closed-loop recirculating infrastructure recovers plant transpiration through dehumidification condenser coils, recycling up to 95 percent of water consumed in comparison with open-field irrigation. Furthermore, the total absence of weeds and soil-borne pathogens entirely eliminates the requirement for synthetic chemical pesticides or persistent organophosphate herbicides.

Paragraph C: Energy expenditure nevertheless constitutes the primary economic bottleneck of vertical facilities. Substituting natural sunlight with narrow-spectrum light-emitting diodes (LEDs)—emitting precise photosynthetic active radiation wavelengths of red and blue photons—demands massive electrical input. In high-latitude cities, heating, ventilation, and air conditioning (HVAC) systems must run non-stop to evacuate the sensible heat generated by thousands of lighting fixtures while maintaining optimal relative humidity. Consequently, initial capital expenditure (CapEx) can exceed $2,500 per square meter of cultivation canopy, limiting early commercial viability primarily to premium leafy greens, microgreens, and medicinal herbs with rapid harvest cycles.`,
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 'FALSE',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Thông tin trong bài: "While indigenous pre-Columbian societies developed rudimentary vertical terracing and Babylonians engineered hanging gardens... modern paradigm was codified in 1999". Như vậy ý tưởng canh tác tầng bậc đã có từ người Babylon và thổ dân châu Mỹ từ trước đó -> FALSE.',
    explanationInVietnamese: 'Ý tưởng canh tác tầng đứng đã manh nha từ vườn treo Babylon và ruộng bậc thang thời tiền Columbus, nên nhận định "hoàn toàn không được biết đến trước năm 1999" là SAI (FALSE).'
  },
  {
    id: 'ielts-r-q2',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 1: Urban Vertical Farming',
    question: '2. TRUE/FALSE/NOT GIVEN: Closed-loop aeroponic facilities use significantly less water than conventional outdoor open-field cultivation.',
    passage: 'At the operational core of modern vertical agriculture lies closed-loop aeroponics and hydroponics. Closed-loop recirculating infrastructure recovers plant transpiration through dehumidification condenser coils, recycling up to 95 percent of water consumed in comparison with open-field irrigation.',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 'TRUE',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Đối chiếu trực tiếp: Bài đọc nêu rõ hệ thống tái tuần hoàn tiết kiệm tới 95% lượng nước so với tưới tiêu trên đồng ruộng ngoài trời -> TRUE.',
    explanationInVietnamese: 'Đúng (TRUE) vì hệ thống tuần hoàn khí canh thu hồi nước thoát hơi, tiết kiệm tới 95% lượng nước so với tưới tiêu cánh đồng truyền thống.'
  },
  {
    id: 'ielts-r-q3',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 1: Urban Vertical Farming',
    question: '3. TRUE/FALSE/NOT GIVEN: Synthetic chemical herbicides are regularly applied in vertical facilities to prevent invasive algae growth.',
    passage: 'Furthermore, the total absence of weeds and soil-borne pathogens entirely eliminates the requirement for synthetic chemical pesticides or persistent organophosphate herbicides.',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 'FALSE',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Đối chiếu trực tiếp: "entirely eliminates the requirement for synthetic chemical pesticides or persistent herbicides". Nhận định nói thuốc diệt cỏ được dùng thường xuyên là mâu thuẫn 180 độ -> FALSE.',
    explanationInVietnamese: 'Sai (FALSE) vì môi trường không đất và không có cỏ dại đã loại bỏ hoàn toàn nhu cầu sử dụng thuốc trừ sâu hay thuốc diệt cỏ hóa học tổng hợp.'
  },
  {
    id: 'ielts-r-q4',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 1: Urban Vertical Farming',
    question: '4. TRUE/FALSE/NOT GIVEN: Vertical farms in equatorial regions produce higher profit margins than those established in sub-Arctic territories.',
    passage: 'In high-latitude cities, heating, ventilation, and air conditioning (HVAC) systems must run non-stop to evacuate the sensible heat generated by thousands of lighting fixtures while maintaining optimal relative humidity. Consequently, initial capital expenditure (CapEx) can exceed $2,500 per square meter of cultivation canopy, limiting early commercial viability primarily to premium leafy greens.',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 'NOT GIVEN',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Bài đọc chỉ nhắc đến các đô thị vĩ độ cao (high-latitude cities) và chi phí HVAC, hoàn toàn không so sánh tỷ suất lợi nhuận (profit margins) giữa vùng xích đạo và vùng cận Bắc cực -> NOT GIVEN.',
    explanationInVietnamese: 'Không có thông tin (NOT GIVEN) vì bài chỉ đề cập chi phí tại các thành phố hàn đới, không hề so sánh mức lợi nhuận giữa trang trại xích đạo và cận Bắc cực.'
  },
  {
    id: 'ielts-r-q5',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 1: Urban Vertical Farming',
    question: '5. What wavelengths of light are primarily emitted by specialized LEDs in vertical cultivation?',
    passage: 'Substituting natural sunlight with narrow-spectrum light-emitting diodes (LEDs)—emitting precise photosynthetic active radiation wavelengths of red and blue photons—demands massive electrical input.',
    options: ['Red and blue photons', 'Infrared and ultraviolet', 'Green and amber light', 'Full-spectrum diffuse white rays'],
    correctAnswer: 'Red and blue photons',
    bandTarget: 'Band 6.5',
    trapAnalysis: 'Trích xuất trực tiếp: "emitting precise photosynthetic active radiation wavelengths of red and blue photons".',
    explanationInVietnamese: 'Đèn LED chuyên dụng phát ra các photon bước sóng đỏ và xanh lam (red and blue photons) phục vụ quang hợp.'
  },
  {
    id: 'ielts-r-q6',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 1: Urban Vertical Farming',
    question: '6. Why are leafy greens and herbs currently the primary commercial crops in vertical farms?',
    passage: 'Consequently, initial capital expenditure (CapEx) can exceed $2,500 per square meter of cultivation canopy, limiting early commercial viability primarily to premium leafy greens, microgreens, and medicinal herbs with rapid harvest cycles.',
    options: [
      'They possess rapid harvest turnover cycles and command high retail market margins',
      'They require zero electrical illumination to reach maturity',
      'They do not transpire moisture into the ambient greenhouse air',
      'They absorb heavy metals directly from untreated tap water'
    ],
    correctAnswer: 'They possess rapid harvest turnover cycles and command high retail market margins',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Hai yếu tố kinh tế: Chu kỳ thu hoạch nhanh (rapid harvest cycles) và giá bán cao (premium commercial viability).',
    explanationInVietnamese: 'Rau ăn lá và thảo mộc được ưu tiên vì có vòng đời thu hoạch ngắn và giá trị bán buôn cao để bù đắp chi phí đầu tư ban đầu.'
  },
  {
    id: 'ielts-r-q7',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 1: Urban Vertical Farming',
    question: '7. Complete the sentence: Moisture released by plants during transpiration is recovered by ______.',
    passage: 'Closed-loop recirculating infrastructure recovers plant transpiration through dehumidification condenser coils, recycling up to 95 percent of water consumed.',
    options: ['dehumidification condenser coils', 'external rainwater reservoirs', 'reverse osmosis sediment filters', 'subterranean geothermal pumps'],
    correctAnswer: 'dehumidification condenser coils',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Thuật ngữ kỹ thuật cơ điện: "dehumidification condenser coils" (dàn ngưng tụ hút ẩm).',
    explanationInVietnamese: 'Độ ẩm thoát ra từ cây được ngưng tụ và thu hồi nhờ các cuộn dàn ngưng hút ẩm (dehumidification condenser coils).'
  },
  {
    id: 'ielts-r-q8',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 1: Urban Vertical Farming',
    question: '8. Complete the sentence: According to Paragraph A, global urban populations are expected to exceed ______ by the year 2050.',
    passage: 'As metropolitan demographics accelerate—with global urban populations projected to surpass 68 percent by 2050—traditional field farming confronts insurmountable logistical impediments.',
    options: ['68 percent', '50 percent', '75 percent', '82 percent'],
    correctAnswer: '68 percent',
    bandTarget: 'Band 6.5',
    trapAnalysis: 'Con số thống kê trong Paragraph A: "projected to surpass 68 percent by 2050".',
    explanationInVietnamese: 'Dân số đô thị toàn cầu được dự báo sẽ vượt quá 68% vào năm 2050.'
  },
  {
    id: 'ielts-r-q9',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 1: Urban Vertical Farming',
    question: '9. What major challenge do HVAC systems address inside indoor growing facilities?',
    passage: 'In high-latitude cities, heating, ventilation, and air conditioning (HVAC) systems must run non-stop to evacuate the sensible heat generated by thousands of lighting fixtures while maintaining optimal relative humidity.',
    options: [
      'Evacuating heat emitted by thousands of light fixtures and balancing humidity',
      'Pumping carbon monoxide into the sealed growing chambers',
      'Preventing frozen soil from cracking concrete foundation footings',
      'Generating electricity through miniature internal wind turbines'
    ],
    correctAnswer: 'Evacuating heat emitted by thousands of light fixtures and balancing humidity',
    bandTarget: 'Band 7.0 - 7.5',
    trapAnalysis: 'Nhiệm vụ của hệ thống điều hòa thông gió: Giải nhiệt phát sinh từ hàng ngàn bóng đèn và duy trì độ ẩm tối ưu.',
    explanationInVietnamese: 'Hệ thống HVAC phải hoạt động liên tục để giải tỏa lượng nhiệt tỏa ra từ hệ thống đèn chiếu sáng và cân bằng độ ẩm không khí.'
  },
  {
    id: 'ielts-r-q10',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 1: Urban Vertical Farming',
    question: '10. What does the acronym CEA represent in modern agriculture?',
    passage: 'Arable soil degradation, groundwater depletion, and astronomical distribution emissions have catalyzed interest in Controlled Environment Agriculture (CEA).',
    options: ['Controlled Environment Agriculture', 'Centralized Ecological Agroforestry', 'Continuous Energy Agronomy', 'Commercialised Export Aquaculture'],
    correctAnswer: 'Controlled Environment Agriculture',
    bandTarget: 'Band 6.5',
    trapAnalysis: 'Viết tắt được định nghĩa ngay trong Paragraph A: "Controlled Environment Agriculture (CEA)".',
    explanationInVietnamese: 'CEA là chữ viết tắt của Controlled Environment Agriculture (Nông nghiệp môi trường được kiểm soát).'
  },
  {
    id: 'ielts-r-q11',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 1: Urban Vertical Farming',
    question: '11. TRUE/FALSE/NOT GIVEN: Vertical farms are capable of supplying all global caloric needs including wheat, rice, and maize at cost parity today.',
    passage: 'Consequently, initial capital expenditure (CapEx) can exceed $2,500 per square meter of cultivation canopy, limiting early commercial viability primarily to premium leafy greens, microgreens, and medicinal herbs with rapid harvest cycles.',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 'FALSE',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Bài đọc chỉ ra hạn chế chi phí đắt đỏ khiến mô hình này hiện nay chỉ khả thi về thương mại với rau mầm, xà lách và thảo dược, hoàn toàn chưa thể cung cấp cây lương thực tinh bột giá rẻ -> FALSE.',
    explanationInVietnamese: 'Sai (FALSE) vì chi phí đầu tư đắt đỏ hiện tại giới hạn mô hình ở rau ăn lá cao cấp, chưa thể sản xuất các loại ngũ cốc giàu calo (lúa mì, ngô) ngang bằng giá thành truyền thống.'
  },
  {
    id: 'ielts-r-q12',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 1: Urban Vertical Farming',
    question: '12. What was the estimated initial capital expenditure (CapEx) cited per square meter of cultivation canopy?',
    passage: 'Consequently, initial capital expenditure (CapEx) can exceed $2,500 per square meter of cultivation canopy.',
    options: ['exceed $2,500', 'under $500', 'approximately $1,000', 'exceed $10,000'],
    correctAnswer: 'exceed $2,500',
    bandTarget: 'Band 6.5',
    trapAnalysis: 'Trích xuất số liệu trực tiếp: "can exceed $2,500 per square meter".',
    explanationInVietnamese: 'Chi phí vốn ban đầu có thể vượt quá $2,500 cho mỗi mét vuông giàn canh tác.'
  },
  {
    id: 'ielts-r-q13',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 1: Urban Vertical Farming',
    question: '13. Which historical civilization is explicitly mentioned as developing terraced vertical gardens in pre-Columbian times?',
    passage: 'While indigenous pre-Columbian societies developed rudimentary vertical terracing and Babylonians engineered hanging gardens, the contemporary paradigm was codified in 1999.',
    options: ['Indigenous pre-Columbian societies', 'Ancient Roman engineers', 'Ancient Egyptian pharaohs', 'Dynastic Chinese horticulturists'],
    correctAnswer: 'Indigenous pre-Columbian societies',
    bandTarget: 'Band 6.5',
    trapAnalysis: 'Đối tượng được nhắc đến trong đoạn văn là "indigenous pre-Columbian societies".',
    explanationInVietnamese: 'Các bộ tộc bản địa thời tiền Columbus được nêu đích danh trong đoạn A với hệ thống ruộng bậc thang tầng đứng sơ khai.'
  },

  // PASSAGE 2: Neuroplasticity and Multilingual Cognitive Resilience (Q14 - Q26)
  {
    id: 'ielts-r-q14',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 2: Neuroplasticity & Multilingual Resilience',
    question: '14. Matching Headings: Choose the most suitable heading for Paragraph A.',
    passage: `READING PASSAGE 2: NEUROPLASTICITY AND MULTILINGUAL COGNITIVE RESILIENCE

Paragraph A: For much of the twentieth century, prevailing pedagogical doctrine warned that exposing infants to multiple linguistic codes induced cognitive friction, verbal delays, and stunted intellectual capacity. Early psychometric assessments—hampered by methodological flaws including socio-economic disparities and monolingual cultural biases—reinforced the illusion that bilingualism encumbered cerebral efficiency. It was not until the seminal 1962 Montreal investigation by Peal and Lambert that rigorous empirical evidence dismantled this prejudice, establishing that balanced bilingual children demonstrated marked cognitive flexibility, superior abstraction, and divergent problem-solving capabilities over monolingual cohorts.

Paragraph B: Contemporary neuroscience accounts for these advantages through the paradigm of neuroplasticity: the brain's structural adaptability to reorganize synaptic pathways in response to persistent environmental stimuli. In multilingual individuals, both languages remain perpetually active simultaneously. Even when conversing exclusively in German, the French or English lexical database is co-activated within the subconscious lexicon. To prevent disruptive semantic interference, the central executive network—anchored in the dorsolateral prefrontal cortex (DLPFC) and anterior cingulate cortex (ACC)—must continuously recruit inhibitory control to suppress the non-target dialect while maintaining task focus.

Paragraph C: This lifelong neurological workout bestows profound clinical dividends in senescent populations. Landmark epidemiological studies spearheaded by Dr. Ellen Bialystok demonstrate that lifelong bilingualism delays the symptomatic onset of neurodegenerative pathologies, most notably Alzheimer's disease, by an average of 4.5 to 5.0 years. Crucially, post-mortem magnetic resonance and histological evaluations reveal that bilingual Alzheimer’s patients exhibit identical—or frequently more pronounced—cortical atrophy and tau neurofibrillary tangles compared to monolinguals presenting equivalent behavioral impairment. Bilingualism does not physically inoculate the biological parenchyma against cellular degeneration; rather, it cultivates substantial "cognitive reserve"—alternative neural circuits that circumvent structurally degraded brain pathways.`,
    options: [
      'From pedagogical prejudice to empirical rehabilitation of early bilingualism',
      'The anatomical structures of the prefrontal executive network',
      'Histological analysis of neurofibrillary tangles in senile dementia',
      'The economic advantages of corporate multilingual translators'
    ],
    correctAnswer: 'From pedagogical prejudice to empirical rehabilitation of early bilingualism',
    bandTarget: 'Band 8.0',
    trapAnalysis: 'Tiêu đề bao quát Paragraph A: Bắt đầu từ định kiến sư phạm thế kỷ 20 (pedagogical doctrine warned...) đến bước ngoặt phục hồi danh dự bằng nghiên cứu thực nghiệm năm 1962 của Peal & Lambert.',
    explanationInVietnamese: 'Tiêu đề chuẩn xác nhất tóm tắt tiến trình từ định kiến giáo dục đầu thế kỷ 20 đến sự phục hồi thực nghiệm khoa học về lợi ích của song ngữ.'
  },
  {
    id: 'ielts-r-q15',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 2: Neuroplasticity & Multilingual Resilience',
    question: '15. Matching Headings: Choose the most suitable heading for Paragraph B.',
    passage: 'Contemporary neuroscience accounts for these advantages through the paradigm of neuroplasticity: the brain’s structural adaptability to reorganize synaptic pathways in response to persistent environmental stimuli. To prevent disruptive semantic interference, the central executive network must continuously recruit inhibitory control to suppress the non-target dialect.',
    options: [
      'Neuroplastic mechanisms of dual-language suppression and executive control',
      'Statistical prevalence of Alzheimer’s disease across multilingual nations',
      'The historical origin of the French and German lexicons',
      'Surgical treatments for prefrontal cortex trauma'
    ],
    correctAnswer: 'Neuroplastic mechanisms of dual-language suppression and executive control',
    bandTarget: 'Band 8.0',
    trapAnalysis: 'Nội dung chính đoạn B: Cơ chế thần kinh dẻo (neuroplasticity), sự đồng kích hoạt hai ngôn ngữ và mạng lưới kiểm soát ức chế (inhibitory control) ở vỏ não trước trán.',
    explanationInVietnamese: 'Đoạn B tập trung phân tích cơ chế dẻo dai thần kinh khi não bộ liên tục kích hoạt hệ thống kiểm soát ức chế để chặn từ vựng không dùng.'
  },
  {
    id: 'ielts-r-q16',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 2: Neuroplasticity & Multilingual Resilience',
    question: '16. Matching Headings: Choose the most suitable heading for Paragraph C.',
    passage: 'This lifelong neurological workout bestows profound clinical dividends in senescent populations. Landmark epidemiological studies spearheaded by Dr. Ellen Bialystok demonstrate that lifelong bilingualism delays the symptomatic onset of neurodegenerative pathologies, most notably Alzheimer’s disease, by an average of 4.5 to 5.0 years.',
    options: [
      'Clinical resilience: Cognitive reserve and delayed dementia onset in elderly bilinguals',
      'The synthesis of pharmaceutical drugs for tau protein reduction',
      'Monolingual classroom strategies for second-language acquisition',
      'Computerized tomography techniques in pediatric neurology'
    ],
    correctAnswer: 'Clinical resilience: Cognitive reserve and delayed dementia onset in elderly bilinguals',
    bandTarget: 'Band 8.0',
    trapAnalysis: 'Nội dung chính đoạn C: Lợi ích lâm sàng ở người cao tuổi, sự tích lũy dự trữ nhận thức (cognitive reserve) và việc trì hoãn khởi phát triệu chứng mất trí nhớ Alzheimer từ 4.5 - 5 năm.',
    explanationInVietnamese: 'Đoạn C luận bàn về khả năng phục hồi lâm sàng: dự trữ nhận thức giúp trì hoãn triệu chứng sa sút trí tuệ Alzheimer ở người già.'
  },
  {
    id: 'ielts-r-q17',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 2: Neuroplasticity & Multilingual Resilience',
    question: '17. What did the 1962 Peal and Lambert study in Montreal demonstrate?',
    passage: 'It was not until the seminal 1962 Montreal investigation by Peal and Lambert that rigorous empirical evidence dismantled this prejudice, establishing that balanced bilingual children demonstrated marked cognitive flexibility, superior abstraction, and divergent problem-solving capabilities over monolingual cohorts.',
    options: [
      'Balanced bilingual children exhibited greater cognitive flexibility and divergent problem-solving than monolingual peers.',
      'Learning two languages caused irreversible speech impediments in adolescent subjects.',
      'Socio-economic factors played no role in determining early psychometric test scores.',
      'Children should be shielded from foreign grammar until reaching fifteen years of age.'
    ],
    correctAnswer: 'Balanced bilingual children exhibited greater cognitive flexibility and divergent problem-solving than monolingual peers.',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Paraphrase trực tiếp từ đoạn A: "balanced bilingual children demonstrated marked cognitive flexibility, superior abstraction, and divergent problem-solving capabilities".',
    explanationInVietnamese: 'Nghiên cứu Peal & Lambert (1962) chứng minh trẻ em song ngữ có độ linh hoạt nhận thức, khả năng trừu tượng hóa và giải quyết vấn đề vượt trội.'
  },
  {
    id: 'ielts-r-q18',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 2: Neuroplasticity & Multilingual Resilience',
    question: '18. Which specific brain regions anchor the central executive network responsible for language inhibition?',
    passage: 'To prevent disruptive semantic interference, the central executive network—anchored in the dorsolateral prefrontal cortex (DLPFC) and anterior cingulate cortex (ACC)—must continuously recruit inhibitory control.',
    options: [
      'Dorsolateral prefrontal cortex (DLPFC) and anterior cingulate cortex (ACC)',
      'Hippocampus and primary auditory temporal lobe',
      'Occipital visual center and cerebellar vermis',
      'Brainstem pons and medulla oblongata'
    ],
    correctAnswer: 'Dorsolateral prefrontal cortex (DLPFC) and anterior cingulate cortex (ACC)',
    bandTarget: 'Band 8.0',
    trapAnalysis: 'Thuật ngữ giải phẫu thần kinh học: "dorsolateral prefrontal cortex (DLPFC) and anterior cingulate cortex (ACC)".',
    explanationInVietnamese: 'Mạng lưới điều hành trung ương chịu trách nhiệm kiểm soát ức chế ngôn ngữ neo tại vỏ não trước trán lưng bên (DLPFC) và vỏ não đai trước (ACC).'
  },
  {
    id: 'ielts-r-q19',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 2: Neuroplasticity & Multilingual Resilience',
    question: '19. According to Dr. Bialystok’s findings, by how many years is symptomatic Alzheimer’s onset typically delayed in lifelong bilinguals?',
    passage: 'Landmark epidemiological studies spearheaded by Dr. Ellen Bialystok demonstrate that lifelong bilingualism delays the symptomatic onset of neurodegenerative pathologies, most notably Alzheimer’s disease, by an average of 4.5 to 5.0 years.',
    options: ['4.5 to 5.0 years', '1.0 to 2.0 years', 'Over 10.0 years', 'Less than 6 months'],
    correctAnswer: '4.5 to 5.0 years',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Con số thống kê trong đoạn C: "delays the symptomatic onset... by an average of 4.5 to 5.0 years".',
    explanationInVietnamese: 'Khởi phát triệu chứng Alzheimer ở người thông thạo song ngữ suốt đời bị trì hoãn trung bình từ 4.5 đến 5.0 năm.'
  },
  {
    id: 'ielts-r-q20',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 2: Neuroplasticity & Multilingual Resilience',
    question: '20. YES/NO/NOT GIVEN: Post-mortem autopsies show that bilingual Alzheimer’s patients possess significantly less physical brain tissue damage than monolinguals.',
    passage: 'Crucially, post-mortem magnetic resonance and histological evaluations reveal that bilingual Alzheimer’s patients exhibit identical—or frequently more pronounced—cortical atrophy and tau neurofibrillary tangles compared to monolinguals presenting equivalent behavioral impairment.',
    options: ['YES', 'NO', 'NOT GIVEN'],
    correctAnswer: 'NO',
    bandTarget: 'Band 8.0',
    trapAnalysis: 'Bẫy NO trực tiếp: Khám nghiệm tử thi cho thấy người song ngữ có mức độ teo vỏ não và tổn thương sợi tau "tương đương hoặc thậm chí nặng hơn" (identical or frequently more pronounced), chứ KHÔNG hề ít tổn thương thực thể hơn -> NO.',
    explanationInVietnamese: 'Sai (NO) vì các xét nghiệm mô học sau khi chết cho thấy tổn thương teo não thực thể ở bệnh nhân song ngữ tương đương, thậm chí nặng hơn người đơn ngữ.'
  },
  {
    id: 'ielts-r-q21',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 2: Neuroplasticity & Multilingual Resilience',
    question: '21. What constitutes the biological concept of "cognitive reserve" in bilingual research?',
    passage: 'Bilingualism does not physically inoculate the biological parenchyma against cellular degeneration; rather, it cultivates substantial "cognitive reserve"—alternative neural circuits that circumvent structurally degraded brain pathways.',
    options: [
      'Alternative neural networks that bypass physically degenerated brain pathways',
      'The preservation of higher cerebrospinal fluid pressure',
      'The genetic resistance to beta-amyloid plaque aggregation',
      'An enlarged cerebellum capable of storing excess linguistic vocabulary'
    ],
    correctAnswer: 'Alternative neural networks that bypass physically degenerated brain pathways',
    bandTarget: 'Band 8.0 - 8.5',
    trapAnalysis: 'Định nghĩa khoa học: "cognitive reserve - alternative neural circuits that circumvent structurally degraded brain pathways" -> "Alternative neural networks that bypass physically degenerated pathways".',
    explanationInVietnamese: 'Dự trữ nhận thức là mạng lưới đường dẫn thần kinh thay thế được hình thành để đi đường vòng vượt qua các vùng não đã bị thoái hóa tổn thương.'
  },
  {
    id: 'ielts-r-q22',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 2: Neuroplasticity & Multilingual Resilience',
    question: '22. YES/NO/NOT GIVEN: Bilingual individuals completely shut off their subconscious native language when speaking a foreign language.',
    passage: 'In multilingual individuals, both languages remain perpetually active simultaneously. Even when conversing exclusively in German, the French or English lexical database is co-activated within the subconscious lexicon.',
    options: ['YES', 'NO', 'NOT GIVEN'],
    correctAnswer: 'NO',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Bẫy NO trực tiếp: Cả hai ngôn ngữ luôn đồng thời hoạt động ngầm (perpetually active simultaneously). Việc khẳng định tắt hoàn toàn là trái ngược -> NO.',
    explanationInVietnamese: 'Sai (NO) vì nghiên cứu thần kinh chứng minh cả hai ngôn ngữ luôn luôn đồng kích hoạt trong tiềm thức ngay cả khi chỉ giao tiếp bằng 1 thứ tiếng.'
  },
  {
    id: 'ielts-r-q23',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 2: Neuroplasticity & Multilingual Resilience',
    question: '23. YES/NO/NOT GIVEN: Dr. Ellen Bialystok conducted her clinical trials using volunteer subjects recruited from five continents.',
    passage: 'Landmark epidemiological studies spearheaded by Dr. Ellen Bialystok demonstrate that lifelong bilingualism delays the symptomatic onset of neurodegenerative pathologies, most notably Alzheimer’s disease, by an average of 4.5 to 5.0 years.',
    options: ['YES', 'NO', 'NOT GIVEN'],
    correctAnswer: 'NOT GIVEN',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Bài đọc chỉ nhắc tên Tiến sĩ Ellen Bialystok và kết quả nghiên cứu dịch tễ học, không hề nhắc đến địa điểm tuyển chọn tình nguyện viên từ 5 châu lục -> NOT GIVEN.',
    explanationInVietnamese: 'Không có thông tin (NOT GIVEN) vì bài không đề cập chi tiết địa bàn tuyển tình nguyện viên tham gia nghiên cứu của bà.'
  },
  {
    id: 'ielts-r-q24',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 2: Neuroplasticity & Multilingual Resilience',
    question: '24. What early methodological errors invalidated early 20th-century studies asserting bilingual inferiority?',
    passage: 'Early psychometric assessments—hampered by methodological flaws including socio-economic disparities and monolingual cultural biases—reinforced the illusion that bilingualism encumbered cerebral efficiency.',
    options: [
      'Uncontrolled socio-economic disparities and cultural bias toward monolinguals',
      'The absence of digital functional MRI scanners in clinical laboratories',
      'Small sample sizes of fewer than ten participants in every testing group',
      'Deliberate academic fraud committed by pharmaceutical companies'
    ],
    correctAnswer: 'Uncontrolled socio-economic disparities and cultural bias toward monolinguals',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Các lỗi phương pháp luận được liệt kê rõ: "socio-economic disparities and monolingual cultural biases".',
    explanationInVietnamese: 'Các nghiên cứu thời kỳ đầu sai lệch do không kiểm soát yếu tố chênh lệch kinh tế xã hội và định kiến văn hóa nghiêng về người đơn ngữ.'
  },
  {
    id: 'ielts-r-q25',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 2: Neuroplasticity & Multilingual Resilience',
    question: '25. Complete the sentence: The term ______ denotes the brain’s ability to structurally adapt and reorganize neural connections.',
    passage: 'Contemporary neuroscience accounts for these advantages through the paradigm of neuroplasticity: the brain’s structural adaptability to reorganize synaptic pathways in response to persistent environmental stimuli.',
    options: ['neuroplasticity', 'synaptic pruning', 'hemispheric lateralization', 'myelination'],
    correctAnswer: 'neuroplasticity',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Khái niệm định nghĩa trong đoạn B: "paradigm of neuroplasticity: the brain’s structural adaptability to reorganize synaptic pathways".',
    explanationInVietnamese: 'Thuật ngữ neuroplasticity (tính mềm dẻo thần kinh) chỉ năng lực tự tái cấu trúc mạng lưới khớp thần kinh của não bộ.'
  },
  {
    id: 'ielts-r-q26',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 2: Neuroplasticity & Multilingual Resilience',
    question: '26. What type of control does the brain exert to suppress competing vocabulary while conversing?',
    passage: 'To prevent disruptive semantic interference, the central executive network must continuously recruit inhibitory control to suppress the non-target dialect while maintaining task focus.',
    options: ['inhibitory control', 'motor sensory coordination', 'involuntary reflex action', 'parasympathetic autonomic stimulation'],
    correctAnswer: 'inhibitory control',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Trích xuất trực tiếp: "continuously recruit inhibitory control to suppress the non-target dialect".',
    explanationInVietnamese: 'Não bộ sử dụng cơ chế kiểm soát ức chế (inhibitory control) để ngăn chặn từ vựng gây nhiễu của ngôn ngữ không dùng.'
  },

  // PASSAGE 3: Glacial Geoengineering & Arctic Climate Intervention (Q27 - Q40)
  {
    id: 'ielts-r-q27',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 3: Glacial Geoengineering & Arctic Interventions',
    question: '27. What is the central thesis articulated in Paragraph A regarding ice sheet destabilization?',
    passage: `READING PASSAGE 3: THE GEOPOLITICS AND ECOLOGY OF GLACIAL GEOENGINEERING

Paragraph A: The accelerating retreat of marine-terminating glaciers in Greenland and West Antarctica—most prominently the Pine Island and Thwaites glaciers—threatens multi-meter eustatic sea-level rise over century timescales. While global climate policy remains fixated on radiative greenhouse gas mitigation, glaciologists emphasize that catastrophic grounding-line instability operates under self-reinforcing thermodynamic feedbacks. Deep, relatively warm circumpolar deep water (CDW) infiltrates bathymetric trenches, melting the ungrounded submarine ice shelves from below. As buttressing ice shelves disintegrate, interior ice sheets surge into the oceans regardless of atmospheric carbon equilibrium. This sobering realization has birthed the controversial discipline of targeted glacial geoengineering.

Paragraph B: Proposed glacial interventions encompass three primary mechanical typologies. The first entails seabed berms: constructing artificial aggregate breakwaters or buoyant flexible submarine curtains across seafloor bathymetric ridges to block warm ocean currents from eroding marine glacier cavities. Numerical simulations indicate that a 300-meter-tall seabed curtain deployed across the 80-kilometer mouth of Pine Island Bay could deflect warm CDW plumes, reducing basal melting by over 50 percent. The second modality involves borehole drainage: drilling vertical shafts through three-kilometer-thick ice down to the bedrock to extract pressurized subglacial meltwater, thereby enhancing basal friction and decelerating ice sheet sliding velocity. The third and most radical proposal—polar snow cannon artificial deposition—would desalinize ocean water and blast trillion-ton blizzards onto high ice domes using thousands of nuclear or wind-powered compressors.

Paragraph C: Critics, however, highlight staggering geopolitical governance voids and environmental risks. Deploying megaprojects in Antarctica directly violates the non-armament, environmental protection provisions of the Antarctic Treaty System. Who arbitrates project liability if a submarine curtain inadvertently deflects warm currents toward South American fisheries or triggers unpredictable polar vortex shifts? Moreover, ethical theorists decry the "moral hazard" dilemma: the false reassurance that mechanical engineering can forestall sea-level rise risks diluting global resolve to transition away from fossil hydrocarbons.`,
    options: [
      'Self-reinforcing subglacial ocean melting can drive ice sheet collapse even if atmospheric emissions are stabilized.',
      'Antarctic ice sheets are currently thickening due to increased snowfall in the polar interior.',
      'The Kyoto Protocol provides comprehensive legal jurisdiction over international glacial engineering.',
      'Solar radiation management will inevitably replace all ocean-based interventions by 2040.'
    ],
    correctAnswer: 'Self-reinforcing subglacial ocean melting can drive ice sheet collapse even if atmospheric emissions are stabilized.',
    bandTarget: 'Band 8.5',
    trapAnalysis: 'Ý chính đoạn A: Nước biển ấm thâm nhập rãnh đáy làm tan băng từ bên dưới tạo phản hồi nhiệt động lực tự củng cố, khiến băng nội địa đổ sụp bất kể nồng độ carbon khí quyển được cân bằng -> Đáp án đúng bao quát trọn vẹn luận điểm này.',
    explanationInVietnamese: 'Luận điểm trung tâm đoạn A là sự tan chảy đáy ngầm dưới tác động của dòng biển ấm tự củng cố sẽ làm sụp đổ các dải băng ngay cả khi lượng phát thải khí quyển được chặn đứng.'
  },
  {
    id: 'ielts-r-q28',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 3: Glacial Geoengineering & Arctic Interventions',
    question: '28. According to Paragraph B, what is the mechanical mechanism of a submarine curtain in Pine Island Bay?',
    passage: 'Numerical simulations indicate that a 300-meter-tall seabed curtain deployed across the 80-kilometer mouth of Pine Island Bay could deflect warm CDW plumes, reducing basal melting by over 50 percent.',
    options: [
      'Deflecting warm circumpolar deep water plumes to halve basal ice melting',
      'Filtering heavy metal pollutants from shipping transit corridors',
      'Freezing seawater around its perimeter using liquid nitrogen pipes',
      'Generating hydroelectric power from tidal current friction'
    ],
    correctAnswer: 'Deflecting warm circumpolar deep water plumes to halve basal ice melting',
    bandTarget: 'Band 8.0',
    trapAnalysis: 'Cơ chế cơ học: Bức rèm ngầm dưới đáy biển đổi hướng các dòng nước ấm CDW, giúp giảm hơn 50% độ tan chảy đáy băng.',
    explanationInVietnamese: 'Rèm ngầm dưới đáy biển đổi hướng luồng nước biển ấm tầng sâu, giúp giảm hơn một nửa tốc độ tan băng từ bên dưới.'
  },
  {
    id: 'ielts-r-q29',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 3: Glacial Geoengineering & Arctic Interventions',
    question: '29. How does borehole drainage aim to slow the velocity of sliding ice sheets?',
    passage: 'The second modality involves borehole drainage: drilling vertical shafts through three-kilometer-thick ice down to the bedrock to extract pressurized subglacial meltwater, thereby enhancing basal friction and decelerating ice sheet sliding velocity.',
    options: [
      'Extracting pressurized subglacial water to heighten basal friction against the bedrock',
      'Pumping boiling thermal brine to weld the ice sheet permanently to the rock',
      'Injecting microscopic synthetic lubricants to control sliding direction',
      'Ventilating methane trapped in subglacial permafrost pockets'
    ],
    correctAnswer: 'Extracting pressurized subglacial water to heighten basal friction against the bedrock',
    bandTarget: 'Band 8.5',
    trapAnalysis: 'Paraphrase: "extract pressurized subglacial meltwater, thereby enhancing basal friction and decelerating ice sheet sliding velocity".',
    explanationInVietnamese: 'Khoan hút nước tan có áp lực cao dưới đáy băng giúp tăng độ ma sát giữa dải băng và nền đá gốc, từ đó kìm hãm tốc độ trượt của băng ra biển.'
  },
  {
    id: 'ielts-r-q30',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 3: Glacial Geoengineering & Arctic Interventions',
    question: '30. What power source is contemplated to operate polar snow cannon deposition compressors?',
    passage: 'The third and most radical proposal—polar snow cannon artificial deposition—would desalinize ocean water and blast trillion-ton blizzards onto high ice domes using thousands of nuclear or wind-powered compressors.',
    options: ['Nuclear or wind-powered compressors', 'Fossil fuel diesel generators', 'Geothermal steam turbines', 'Solar photovoltaic arrays exclusively'],
    correctAnswer: 'Nuclear or wind-powered compressors',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Nguồn năng lượng được nêu rõ: "using thousands of nuclear or wind-powered compressors".',
    explanationInVietnamese: 'Hệ thống pháo tuyết nhân tạo khổng lồ dự kiến sử dụng hàng ngàn máy nén chạy bằng năng lượng hạt nhân hoặc năng lượng gió.'
  },
  {
    id: 'ielts-r-q31',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 3: Glacial Geoengineering & Arctic Interventions',
    question: '31. YES/NO/NOT GIVEN: Deploying military engineering equipment for glacial curtains in Antarctica is explicitly permitted under the Antarctic Treaty.',
    passage: 'Deploying megaprojects in Antarctica directly violates the non-armament, environmental protection provisions of the Antarctic Treaty System.',
    options: ['YES', 'NO', 'NOT GIVEN'],
    correctAnswer: 'NO',
    bandTarget: 'Band 8.0',
    trapAnalysis: 'Bẫy NO trực tiếp: Bài đọc ghi rõ việc triển khai đại công trình tại đây vi phạm trực tiếp các điều khoản phi vũ trang và bảo vệ môi trường của Hiệp ước Nam Cực -> NO.',
    explanationInVietnamese: 'Sai (NO) vì việc triển khai đại dự án kỹ thuật xâm phạm các điều khoản phi vũ trang và bảo tồn môi trường của Hiệp ước Nam Cực.'
  },
  {
    id: 'ielts-r-q32',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 3: Glacial Geoengineering & Arctic Interventions',
    question: '32. What is the philosophical "moral hazard" cited by ethical theorists in Paragraph C?',
    passage: 'Moreover, ethical theorists decry the "moral hazard" dilemma: the false reassurance that mechanical engineering can forestall sea-level rise risks diluting global resolve to transition away from fossil hydrocarbons.',
    options: [
      'The false assumption that geoengineering solves sea-level rise could weaken commitments to eliminate fossil fuels.',
      'Engineers will charge excessive patent royalties for subglacial drilling technology.',
      'Submarine curtains will trigger severe military warfare over polar shipping passages.',
      'Indigenous Arctic hunters will be forced to relocate to urban industrial centers.'
    ],
    correctAnswer: 'The false assumption that geoengineering solves sea-level rise could weaken commitments to eliminate fossil fuels.',
    bandTarget: 'Band 8.5',
    trapAnalysis: 'Khái niệm "Rủi ro đạo đức" (Moral hazard): Sự an tâm giả tạo về các biện pháp kỹ thuật có thể làm suy yếu ý chí toàn cầu trong việc cắt giảm năng lượng hóa thạch.',
    explanationInVietnamese: 'Rủi ro đạo đức (moral hazard) là ảo tưởng rằng công nghệ kỹ thuật có thể ngăn nước biển dâng, từ đó làm suy giảm quyết tâm từ bỏ nhiên liệu hóa thạch.'
  },
  {
    id: 'ielts-r-q33',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 3: Glacial Geoengineering & Arctic Interventions',
    question: '33. What does the acronym CDW denote in subglacial oceanography?',
    passage: 'Deep, relatively warm circumpolar deep water (CDW) infiltrates bathymetric trenches, melting the ungrounded submarine ice shelves from below.',
    options: ['circumpolar deep water', 'coastal drainage waves', 'chlorinated deep waste', 'continental drift water'],
    correctAnswer: 'circumpolar deep water',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Thuật ngữ đại dương học được định nghĩa ở Paragraph A: "circumpolar deep water (CDW)".',
    explanationInVietnamese: 'CDW là viết tắt của Circumpolar Deep Water (vùng nước sâu tương đối ấm bao quanh địa cực).'
  },
  {
    id: 'ielts-r-q34',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 3: Glacial Geoengineering & Arctic Interventions',
    question: '34. Complete the sentence: Pine Island and ______ glaciers are cited as prominent examples of accelerating marine retreat.',
    passage: 'The accelerating retreat of marine-terminating glaciers in Greenland and West Antarctica—most prominently the Pine Island and Thwaites glaciers—threatens multi-meter eustatic sea-level rise.',
    options: ['Thwaites', 'Jakobshavn', 'Hubbard', 'Perito Moreno'],
    correctAnswer: 'Thwaites',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Tên dòng sông băng được nhắc trực tiếp: "Pine Island and Thwaites glaciers".',
    explanationInVietnamese: 'Hai sông băng được nêu đích danh trong đoạn A là sông băng Pine Island và sông băng Thwaites.'
  },
  {
    id: 'ielts-r-q35',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 3: Glacial Geoengineering & Arctic Interventions',
    question: '35. What height was modeled for the hypothetical seabed curtain across Pine Island Bay?',
    passage: 'Numerical simulations indicate that a 300-meter-tall seabed curtain deployed across the 80-kilometer mouth of Pine Island Bay could deflect warm CDW plumes.',
    options: ['300 meters', '150 meters', '500 meters', '1,000 meters'],
    correctAnswer: '300 meters',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Trích xuất số đo trực tiếp: "a 300-meter-tall seabed curtain".',
    explanationInVietnamese: 'Chiều cao mô phỏng của bức tường rèm ngầm dưới đáy vịnh Pine Island là 300 mét.'
  },
  {
    id: 'ielts-r-q36',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 3: Glacial Geoengineering & Arctic Interventions',
    question: '36. YES/NO/NOT GIVEN: International legal liability frameworks currently exist to allocate damage compensations if subsea curtains harm foreign marine fisheries.',
    passage: 'Who arbitrates project liability if a submarine curtain inadvertently deflects warm currents toward South American fisheries or triggers unpredictable polar vortex shifts?',
    options: ['YES', 'NO', 'NOT GIVEN'],
    correctAnswer: 'NO',
    bandTarget: 'Band 8.0',
    trapAnalysis: 'Câu hỏi tu từ: "Who arbitrates project liability... staggering geopolitical governance voids". Đoạn văn chỉ ra khoảng trống pháp lý hoàn toàn chưa có cơ chế trọng tài giải quyết bồi thường -> NO.',
    explanationInVietnamese: 'Sai (NO) vì đoạn văn nhấn mạnh khoảng trống pháp trị (governance voids) và đặt câu hỏi ai sẽ chịu trách nhiệm pháp lý nếu rèm ngầm gây hại cho ngư trường quốc gia khác.'
  },
  {
    id: 'ielts-r-q37',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 3: Glacial Geoengineering & Arctic Interventions',
    question: '37. How thick can the continental ice sheet reach where borehole drainage is proposed?',
    passage: 'The second modality involves borehole drainage: drilling vertical shafts through three-kilometer-thick ice down to the bedrock.',
    options: ['three kilometers', 'one kilometer', '500 meters', 'ten kilometers'],
    correctAnswer: 'three kilometers',
    bandTarget: 'Band 7.0',
    trapAnalysis: 'Độ dày dải băng: "through three-kilometer-thick ice down to the bedrock".',
    explanationInVietnamese: 'Mũi khoan kỹ thuật cần xuyên qua lớp băng lục địa dày tới ba kilômét (3 km) để chạm tới nền đá.'
  },
  {
    id: 'ielts-r-q38',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 3: Glacial Geoengineering & Arctic Interventions',
    question: '38. What would polar snow cannons do to ocean water prior to blasting it onto ice domes?',
    passage: 'The third and most radical proposal—polar snow cannon artificial deposition—would desalinize ocean water and blast trillion-ton blizzards onto high ice domes.',
    options: ['desalinize it', 'enrich it with calcium carbonate', 'heat it to boiling point', 'freeze it into cubic transport blocks'],
    correctAnswer: 'desalinize it',
    bandTarget: 'Band 7.5',
    trapAnalysis: 'Quy trình xử lý nước biển trước khi phun tuyết: "would desalinize ocean water" (khử muối).',
    explanationInVietnamese: 'Nước biển phải được khử muối (desalinize) trước khi máy nén thổi tuyết lên đỉnh các mái vòm băng.'
  },
  {
    id: 'ielts-r-q39',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 3: Glacial Geoengineering & Arctic Interventions',
    question: '39. According to Paragraph A, what happens to interior ice sheets when buttressing ice shelves disintegrate?',
    passage: 'As buttressing ice shelves disintegrate, interior ice sheets surge into the oceans regardless of atmospheric carbon equilibrium.',
    options: [
      'Interior ice sheets surge uncontrollably into the oceans.',
      'Interior ice sheets freeze permanently in place.',
      'Interior ice sheets sublimate directly into atmospheric gas.',
      'Interior ice sheets reverse their flow towards mountain summits.'
    ],
    correctAnswer: 'Interior ice sheets surge uncontrollably into the oceans.',
    bandTarget: 'Band 8.0',
    trapAnalysis: 'Hậu quả khi thềm băng nâng đỡ bị tan vỡ: "interior ice sheets surge into the oceans".',
    explanationInVietnamese: 'Khi các thềm băng chống đỡ bên ngoài tan biến, các dải băng khổng lồ phía trong nội địa sẽ trượt ồ ạt không kiểm soát ra đại dương.'
  },
  {
    id: 'ielts-r-q40',
    skill: 'reading',
    sectionOrPart: 'Reading Passage 3: Glacial Geoengineering & Arctic Interventions',
    question: '40. What is the overall tone of the author regarding large-scale glacial geoengineering in the concluding paragraph?',
    passage: 'Deploying megaprojects in Antarctica directly violates the non-armament, environmental protection provisions of the Antarctic Treaty System. Who arbitrates project liability if a submarine curtain inadvertently deflects warm currents toward South American fisheries or triggers unpredictable polar vortex shifts? Moreover, ethical theorists decry the "moral hazard" dilemma.',
    options: [
      'Cautious and critical of immense legal, ethical, and ecological uncertainties',
      'Unreservedly enthusiastic and calling for immediate construction',
      'Dismissive of all climate science and sea-level rise data',
      'Indifferent and purely focused on commercial construction revenues'
    ],
    correctAnswer: 'Cautious and critical of immense legal, ethical, and ecological uncertainties',
    bandTarget: 'Band 8.5',
    trapAnalysis: 'Đánh giá thái độ tác giả (Writer’s attitude): Thận trọng và phản biện sâu sắc trước các lỗ hổng pháp lý quốc tế, rủi ro sinh thái và nan đề đạo đức.',
    explanationInVietnamese: 'Thái độ chung của tác giả là thận trọng và phản biện (cautious and critical) trước những bất định pháp lý, rủi ro sinh thái khôn lường và nan đề đạo đức.'
  }
];

// ============================================================================
// OFFICIAL IELTS WRITING TASKS (TASK 1 & TASK 2)
// ============================================================================
export const officialWritingTasks: WritingModelPrompt[] = [
  {
    id: 'ielts-w-task1',
    taskType: 'Task 1',
    title: 'Academic Task 1: Renewable Energy Production in Five European Nations (2000–2025)',
    prompt: 'You should spend about 20 minutes on this task. The chart below shows the percentage of electricity generated from renewable sources (wind, solar, hydro) in five European nations (Germany, Denmark, Spain, UK, Poland) in 2000, 2012, and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    chartDescription: 'Data Table:\n- Denmark: 2000: 18% | 2012: 45% | 2025: 78% (Highest growth, continuous surge)\n- Germany: 2000: 6% | 2012: 24% | 2025: 56% (Substantial steady expansion)\n- Spain: 2000: 15% | 2012: 32% | 2025: 51% (Strong growth driven by wind and solar)\n- UK: 2000: 3% | 2012: 12% | 2025: 48% (Late surge post-2012 offshore wind investments)\n- Poland: 2000: 2% | 2012: 10% | 2025: 22% (Lowest proportion throughout the timeframe)',
    module: 'Academic',
    bandScore: 'Band 8.5 - 9.0',
    modelAnswer: `The bar chart delineates the proportion of electricity produced via renewable energy modalities—specifically wind, solar, and hydroelectric power—across five European countries between 2000 and 2025.

Overall, it is unequivocally manifest that all five surveyed nations registered substantial upward trajectories in renewable power generation over the 25-year epoch. Denmark consistently outpaced its peers, establishing itself as the undisputed frontrunner, whereas Poland persistently recorded the most modest figures throughout the timeframe.

Commencing in 2000, Denmark already generated a notable 18% of its electrical supply from renewables, followed closely by Spain at 15%. In stark contrast, Germany, the United Kingdom, and Poland lingered in single-digit territory, standing at 6%, 3%, and a negligible 2%, respectively. 

By 2012, all jurisdictions had accelerated clean energy deployment. Denmark’s share surged dramatically to 45%, more than doubling its initial figure. Spain and Germany witnessed comparable momentum, climbing to 32% and 24%, respectively. The UK witnessed a modest quadrupling to 12%, narrowly edging past Poland, which reached 10%.

The terminal year 2025 witnessed further divergence and aggressive growth. Denmark consolidated its commanding hegemony, reaching an exceptional 78%. Germany and Spain both surpassed the halfway milestone, attaining 56% and 51%, respectively. Notably, the United Kingdom experienced an unprecedented exponential acceleration post-2012, culminating at 48%—a sixteen-fold escalation from its baseline. Conversely, despite a decadal rise, Poland reached merely 22%, remaining less than one-third of the Danish benchmark.`,
    outline: [
      { point: 'Introduction & Paraphrase', explanation: 'Paraphrase topic, years, and specific energy types without copying prompt wording.' },
      { point: 'Overview (Crucial for Band 7+)', explanation: 'State two overarching trends: all nations increased, Denmark dominated, Poland lagged.' },
      { point: 'Body Paragraph 1', explanation: 'Compare initial standings in 2000 and intermediate shifts up to 2012.' },
      { point: 'Body Paragraph 2', explanation: 'Detail final 2025 outcomes, highlighting the UK surge and terminal gap between Denmark and Poland.' }
    ],
    keyVocabulary: [
      { word: 'delineates', meaning: 'phác họa, mô tả chi tiết', phonetic: '/dɪˈlɪnieɪts/' },
      { word: 'upward trajectories', meaning: 'quỹ đạo tăng trưởng đi lên', phonetic: '/ˈʌpwərd trəˈdʒɛktəriz/' },
      { word: 'commanding hegemony', meaning: 'vị thế dẫn đầu áp đảo', phonetic: '/kəˈmændɪŋ hɪˈdʒɛməni/' },
      { word: 'sixteen-fold escalation', meaning: 'sự gia tăng gấp 16 lần', phonetic: '/ˌsɪksˈtiːn foʊld ˌɛskəˈleɪʃən/' }
    ],
    examinerComment: 'Demonstrates exceptional Task Achievement: Clear overview with data-backed body paragraphs. Sophisticated lexical resource and flawless cohesion.'
  },
  {
    id: 'ielts-w-task2',
    taskType: 'Task 2',
    title: 'Academic Task 2: Artificial Intelligence vs. Human Educators in Modern Pedagogy',
    prompt: 'You should spend about 40 minutes on this task. Write about the following topic: Some people believe that rapid advances in artificial intelligence and autonomous educational platforms will render human teachers obsolete in the near future. Others argue that the irreplaceable emotional, ethical, and motivational guidance of human mentors will always remain essential. Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    module: 'Academic',
    bandScore: 'Band 8.5 - 9.0',
    modelAnswer: `The accelerating integration of artificial intelligence into pedagogical frameworks has ignited contentious discourse regarding the future tenure of the teaching profession. While techno-optimists postulate that algorithmic personalization and omniscient digital tutors will render human educators obsolete, I firmly contend that the intrinsic affective, ethical, and inspirational dimensions of human mentorship constitute an insurmountable barrier to total technological substitution.

Advocates of autonomous AI systems point to their unprecedented capacity for cognitive diagnosis and hyper-customized pacing. Conventional classrooms inherently suffer from the pedagogical dilemma of teaching to the median, leaving gifted pupils disengaged and struggling learners demoralized. In stark contrast, large language models and adaptive neural platforms can instantaneously analyze micro-patterns in a student's erroneous syntax or mathematical reasoning, dispensing tailored scaffolding 24/7 without cognitive fatigue. Furthermore, generative systems democratize world-class educational assets for impoverished communities lacking credentialed instructors, eliminating geographic disparities at negligible marginal cost.

Nevertheless, equating didactic instruction with holistic education commits a profound category error. The seminal function of an educator transcends robotic knowledge transmission; it is anchored in socio-emotional resonance, pastoral care, and psychological empathy. A sophisticated algorithm may detect that a child failed a calculus assessment, but it remains fundamentally blind to whether that scholastic deficit stems from parental divorce, clinical depression, or bullying. Human educators perceive nuanced micro-expressions, instilling self-efficacy and resilience through relational warmth. Moreover, cultivating critical ethical sensibilities, democratic citizenship, and empathetic debate requires real-time moral role modeling that no statistical probabilistic matrix can emulate.

In conclusion, while artificial intelligence will undoubtedly revolutionize curriculum tailoring and alleviate administrative drudgery, it should function as an augmenting co-pilot rather than an autonomous replacement. The soul of education remains irrevocably interpersonal, ensuring that human mentors will perpetually occupy an indispensable pedestal in human civilization.`,
    outline: [
      { point: 'Introduction', explanation: 'Hook on AI in pedagogy, paraphrase both perspectives, state clear thesis favoring human necessity.' },
      { point: 'Body Paragraph 1 (AI Capabilities)', explanation: 'Examine personalized adaptive pacing, 24/7 access, and overcoming median-classroom friction.' },
      { point: 'Body Paragraph 2 (Human Irreplaceability)', explanation: 'Highlight emotional resonance, pastoral care, ethical modeling, and relational empathy.' },
      { point: 'Conclusion', explanation: 'Synthesize role of AI as an augmenting co-pilot while human mentorship remains irreplaceable.' }
    ],
    keyVocabulary: [
      { word: 'pedagogical frameworks', meaning: 'khung khổ phương pháp sư phạm', phonetic: '/ˌpɛdəˈɡɒdʒɪkəl ˈfreɪmwɜːrks/' },
      { word: 'didactic instruction', meaning: 'sự truyền thụ kiến thức thuần túy', phonetic: '/daɪˈdæktɪk ɪnˈstrʌkʃən/' },
      { word: 'category error', meaning: 'sai lầm phạm trù logic', phonetic: '/ˈkætɪɡəri ˈɛrər/' },
      { word: 'socio-emotional resonance', meaning: 'sự cộng hưởng tâm lý xã hội', phonetic: '/ˌsoʊʃioʊ ɪˈmoʊʃənl ˈrɛzənəns/' }
    ],
    examinerComment: 'Presents a fully developed response to all parts of the question. Clear progression, persuasive academic voice, sophisticated lexical collocations, and varied grammatical syntax.'
  }
];

// ============================================================================
// OFFICIAL IELTS SPEAKING TEST (3 FULL INTERACTIVE PARTS)
// ============================================================================
export const officialSpeakingParts: SpeakingCueCard[] = [
  {
    id: 'ielts-s-part1',
    part: 1,
    topic: 'Official Part 1: Identity, Technological Tools, and Daily Habitat',
    cueCardPrompt: 'Part 1: The examiner introduces himself/herself, checks candidate identity, and asks general personal questions on familiar topics.',
    bulletPoints: [
      'Question 1: Can you describe your hometown and what makes it distinctive?',
      'Question 2: How has digital technology altered the way you organize your study or work schedules?',
      'Question 3: Do you prefer solitary leisure activities or socializing in bustling public venues?',
      'Question 4: What is your preferred genre of reading literature, and why?'
    ],
    bandScore: 'Band 8.5',
    modelAnswer: 'Examiner: "Can you describe your hometown?" Candidate: "I hail from Da Nang, a dynamic coastal metropolis in central Vietnam. What distinguishes it is the striking equilibrium between urban cosmopolitanism and pristine natural topography—you can transition from high-tech tech hubs to virgin coastline within fifteen minutes."',
    idiomaticExpressions: [
      { phrase: 'striking equilibrium', meaning: 'sự cân bằng ấn tượng' },
      { phrase: 'streamline cognitive overhead', meaning: 'giảm tải áp lực tư duy' },
      { phrase: 'recharge my mental batteries', meaning: 'nạp lại năng lượng tinh thần' }
    ]
  },
  {
    id: 'ielts-s-part2',
    part: 2,
    topic: 'Official Part 2 Cue Card: A Pivotal Life Decision',
    cueCardPrompt: 'You should say:\n- What the decision was and when you made it\n- What alternative options were available to you\n- What factors you evaluated before deciding\n- And explain why this decision was significant in shaping your personal or career development.',
    bulletPoints: [
      'What the decision was and when you had to make it',
      'What alternative paths were available at that crossroad',
      'What critical factors and uncertainties you weighed',
      'And explain why this decision fundamentally altered your trajectory'
    ],
    bandScore: 'Band 9.0',
    modelAnswer: `I would like to speak about a pivotal crossroads I confronted roughly three years ago, when I resolved to resign from a secure position in corporate banking to immerse myself in data engineering and computational linguistics.

At the time, remaining within financial auditing was ostensibly the pragmatic path; it guaranteed steady remuneration and predictable upward mobility. However, I felt acute intellectual stagnation, performing repetitive reconciliation protocols that were rapidly being automated. The alternative was daunting: plunging into full-time technical retraining with zero guarantee of employment.

Before finalizing my departure, I systematically weighed three parameters: financial buffer, long-term industry obsolescence, and genuine cognitive fulfillment. I gave myself a strict six-month moratorium to master algorithmic programming while surviving on accumulated savings.

In retrospect, that leap of faith was unequivocally transformative. It not only liberated me from vocational monotony but also cultivated intellectual resilience. Navigating that steep learning curve proved that stepping outside one's comfort zone is the ultimate catalyst for sustained self-actualization.`,
    idiomaticExpressions: [
      { phrase: 'pivotal crossroads', meaning: 'ngã rẽ mang tính bước ngoặt cuộc đời' },
      { phrase: 'leap of faith', meaning: 'quyết định liều lĩnh dựa trên niềm tin' },
      { phrase: 'vocational monotony', meaning: 'sự đơn điệu tẻ nhạt trong nghề nghiệp' },
      { phrase: 'catalyst for self-actualization', meaning: 'chất xúc tác giúp hiện thực hóa tiềm năng bản thân' }
    ]
  },
  {
    id: 'ielts-s-part3',
    part: 3,
    topic: 'Official Part 3: Decision Making, Technology & Societal Wisdom',
    cueCardPrompt: 'Part 3: Two-way analytical discussion with the examiner exploring abstract implications of human decision-making and technology.',
    bulletPoints: [
      'Question 1: In your view, do younger generations rely too excessively on algorithmic recommendations when making personal decisions?',
      'Question 2: What qualities distinguish an impulsive decision-maker from a calculated strategic thinker?',
      'Question 3: Should national governments employ algorithmic AI models to decide critical social welfare allocations?',
      'Question 4: To what extent does societal fear of failure paralyze individuals from taking entrepreneurial risks?'
    ],
    bandScore: 'Band 9.0',
    modelAnswer: 'Examiner: "Do younger individuals rely excessively on algorithmic advice?" Candidate: "Undeniably, there is an escalating tendency toward cognitive offloading. While recommendation engines optimize logistical convenience, excessive deference risks atrophying our intuitive discernment and tolerance for serendipitous discovery."',
    idiomaticExpressions: [
      { phrase: 'cognitive offloading', meaning: 'sự ỷ lại tư duy vào công nghệ bên ngoài' },
      { phrase: 'atrophying intuitive discernment', meaning: 'làm thui chột khả năng phán đoán trực giác' },
      { phrase: 'serendipitous discovery', meaning: 'những khám phá tình cờ đầy kỳ diệu' }
    ]
  }
];
