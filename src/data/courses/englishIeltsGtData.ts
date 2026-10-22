import { ExamQuestion, WritingModelPrompt, SpeakingCueCard, IeltsTestSet } from '../curriculum';

export const ieltsGtQuestions: ExamQuestion[] = [
  // SECTION 1: SOCIAL SURVIVAL (ĐỜI SỐNG THƯỜNG NHẬT)
  {
    id: 'gt-r1-social-notice',
    skill: 'reading',
    module: 'General Training',
    sectionOrPart: 'GT Reading Section 1 (Social Survival: Community Centre Notice)',
    question: 'According to the notice, what is the mandatory condition for enrolling in the Advanced Ceramics Studio workshop?',
    passage: `OAKRIDGE COMMUNITY CENTRE - AUTUMN WORKSHOP PROGRAMME

1. Pottery Foundations (Tuesdays 18:00 - 20:00): Open to absolute beginners aged 16 and over. All raw clay and glazing supplies are provided in the £45 registration fee.
2. Advanced Ceramics Studio (Thursdays 19:00 - 21:30): Designed strictly for experienced hobbyists. Applicants must have completed our Introductory Wheel-Throwing course within the past 12 months or submit a digital portfolio demonstrating equivalent proficiency to the course instructor prior to enrollment.
3. Family Weekend Art Hub (Saturdays 10:00 - 12:00): Complimentary drop-in sessions for parents and children. No prior booking required, though children under 12 must be continuously supervised by an adult guardian.`,
    options: [
      'Completion of the Introductory Wheel-Throwing course or instructor approval of a portfolio',
      'Payment of an additional £45 raw clay fee on the first session',
      'Continuous supervision by an adult guardian during kiln firings',
      'Possession of a personal electric ceramic pottery wheel at home'
    ],
    correctAnswer: 'Completion of the Introductory Wheel-Throwing course or instructor approval of a portfolio',
    bandTarget: 'Band 7.0 - 8.0',
    trapAnalysis: 'Bẫy thông tin giữa các khóa học (Cross-Course Distractor): Mức phí £45 thuộc về Pottery Foundations, giám sát của người lớn thuộc Family Weekend. Với khóa Advanced, điều kiện bắt buộc là đã học khóa cơ bản hoặc nộp portfolio được phê duyệt.',
    explanationInVietnamese: 'Mục 2 ghi rõ: Học viên phải hoàn thành khóa "Introductory Wheel-Throwing" trong vòng 12 tháng qua HOẶC nộp hồ sơ portfolio chứng minh năng lực tương đương cho giáo viên trước khi đăng ký.'
  },
  {
    id: 'gt-r2-social-transit',
    skill: 'reading',
    module: 'General Training',
    sectionOrPart: 'GT Reading Section 1 (Social Survival: Airport Rail Link Timetable & Fare Rules)',
    question: 'Which ticket option allows an off-peak return within 30 days without peak-hour surcharge penalties?',
    passage: `METRO-EXPRESS AIRPORT SHUTTLE FARE GUIDE

• Single Standard Ticket: Valid exclusively for one continuous journey on the stamped date. Non-refundable.
• Day Return Off-Peak: Valid for travel outbound after 09:30 Monday to Friday, and anytime on weekends. Return journey must be completed on the identical calendar day.
• 30-Day Open Return Period Pass: Permits one outbound trip anytime, and one return journey within 30 calendar days of issue. Note: If returning on a weekday morning between 06:30 and 09:00, standard peak surcharge applies.
• Flexi-Month Freedom Pass: Grants unrestricted travel outbound and return anytime within one calendar month with no peak-hour surcharges applied.`,
    options: [
      'Flexi-Month Freedom Pass',
      '30-Day Open Return Period Pass',
      'Day Return Off-Peak',
      'Single Standard Ticket'
    ],
    correctAnswer: 'Flexi-Month Freedom Pass',
    bandTarget: 'Band 7.5 - 8.5',
    trapAnalysis: 'Bẫy phụ phí giờ cao điểm (Peak-Hour Surcharge Trap): Loại vé 30-Day Open Return bị áp phụ phí giờ cao điểm sáng ngày thường (06:30 - 09:00), chỉ có loại "Flexi-Month Freedom Pass" mới hoàn toàn không bị áp phụ phí ("no peak-hour surcharges applied").',
    explanationInVietnamese: 'Vé "Flexi-Month Freedom Pass" cho phép đi lại tự do trong vòng một tháng mà không bị bất kỳ phụ phí giờ cao điểm nào.'
  },

  // SECTION 2: WORKPLACE SURVIVAL (MÔI TRƯỜNG LÀM VIỆC)
  {
    id: 'gt-r3-workplace-policy',
    skill: 'reading',
    module: 'General Training',
    sectionOrPart: 'GT Reading Section 2 (Workplace Survival: Employee Sickness & Absence Protocol)',
    question: 'Under company regulations, when is an employee legally obligated to provide an official medical certificate (Fit Note) from a registered doctor?',
    passage: `VANGUARD LOGISTICS UK - EMPLOYEE HANDBOOK SECTION 4: ABSENCE NOTIFICATION

4.1 Short-Term Incapacity: If you are unwell and unable to attend work, you must notify your line manager by phone no later than 08:30 on the initial morning of absence. Text messages and emails are unacceptable.
4.2 Self-Certification: For sick leave extending up to seven consecutive calendar days (inclusive of weekends), you are permitted to self-certify your illness by completing Form SC2 upon returning to duty.
4.3 Formal Fit Notes: If your continuous period of medical absence exceeds seven consecutive calendar days, statutory UK employment regulations require you to submit an official Statement of Fitness for Work (Fit Note) issued by a registered physician. This document must be submitted to the HR Department within 48 hours of the eighth consecutive day of absence. Failure to furnish this documentation may result in the suspension of Statutory Sick Pay (SSP).`,
    options: [
      'When medical absence continues beyond seven consecutive calendar days',
      'On the initial morning of any absence before 08:30',
      'Whenever self-certifying on Form SC2 for weekend illness',
      'Immediately upon returning to duty after taking any prescribed antibiotics'
    ],
    correctAnswer: 'When medical absence continues beyond seven consecutive calendar days',
    bandTarget: 'Band 7.5 - 8.5',
    trapAnalysis: 'Bẫy tự kê khai vs Giấy bác sĩ (Self-Certification Trap): 7 ngày đầu nhân viên chỉ cần tự điền đơn SC2 khi đi làm lại. Chỉ khi nghỉ LIÊN TIẾP QUÁ 7 NGÀY ("exceeds seven consecutive calendar days"), nhân viên mới bắt buộc nộp Fit Note của bác sĩ.',
    explanationInVietnamese: 'Mục 4.3 nêu rõ: Giấy chứng nhận sức khỏe chính thức của bác sĩ (Fit Note) chỉ bắt buộc khi thời gian ốm đau nghỉ việc liên tục vượt quá 7 ngày theo lịch.'
  },
  {
    id: 'gt-r4-workplace-contract',
    skill: 'reading',
    module: 'General Training',
    sectionOrPart: 'GT Reading Section 2 (Workplace Survival: Overtime Compensation & Time-in-Lieu)',
    question: 'How are permanent operational staff compensated for hours worked in excess of the contractual 37.5-hour threshold?',
    passage: `SECTION 8: OVERTIME REMUNERATION AND TOIL (TIME OFF IN LIEU)

Operational personnel contracted at standard 37.5 weekly hours who perform approved extra hours on weekdays are entitled to either remuneration at 1.5 times their basic hourly salary, or equivalent Time Off In Lieu (TOIL), strictly subject to departmental manager pre-authorization. Any overtime conducted on official statutory public holidays must be compensated at double-time rates (2.0x) and cannot be substituted with TOIL. Unapproved overtime logged without a written supervisor pre-shift sign-off will under no circumstances be remunerated.`,
    options: [
      'Overtime on weekdays is paid at 1.5 times the hourly rate or granted as equivalent TOIL with manager approval.',
      'All overtime must automatically be converted to double-time pay on weekends.',
      'Employees can log unlimited unsupervised overtime without managerial sign-off.',
      'Public holiday overtime must be taken as TOIL within fourteen calendar days.'
    ],
    correctAnswer: 'Overtime on weekdays is paid at 1.5 times the hourly rate or granted as equivalent TOIL with manager approval.',
    bandTarget: 'Band 8.0 - 8.5',
    trapAnalysis: 'Bẫy điều kiện kép (Conditional Benefit Trap): Làm thêm giờ ngày thường được trả 1.5 lần lương HOẶC nghỉ bù (TOIL), nhưng phải có sự phê duyệt trước của quản lý.',
    explanationInVietnamese: 'Quy định nêu rõ: Nhân viên làm thêm ngày thường được hưởng 1.5 lần mức lương giờ hoặc nghỉ bù tương đương (TOIL), với điều kiện phải được quản lý bộ phận phê duyệt trước.'
  },

  // SECTION 3: GENERAL READING (BÀI ĐỌC TỔNG QUÁT TẠP CHÍ)
  {
    id: 'gt-r5-magazine-feature',
    skill: 'reading',
    module: 'General Training',
    sectionOrPart: 'GT Reading Section 3 (General Reading: The Revival of Artisanal Watchmaking)',
    question: "Do the following statement agree with the information in the passage? 'The quartz crisis in the late 1970s permanently eradicated customer demand for mechanical balance-wheel timepieces.'",
    passage: `In the twilight of the 1970s, the emergence of inexpensive Japanese quartz movements sent shockwaves through the venerable watchmaking valleys of the Swiss Jura. Battery-powered oscillators promised split-second precision at a fraction of the cost, precipitating the bankruptcy of dozens of historic ateliers. Pundits proclaimed the definitive obsolescence of the spring-driven mechanical watch. 

Yet, far from dying out, mechanical horology underwent a spectacular cultural metamorphosis over the ensuing decades. Rather than competing futilely against digital quartz on utilitarian accuracy, luxury Swiss manufactures repositioned the mechanical timepiece as an embodiment of kinetic sculpture, human craftsmanship, and heritage prestige. By the late 1990s, global auction houses and high-net-worth collectors were paying historic premiums for handcrafted complications, establishing mechanical watchmaking as a multi-billion-dollar global luxury phenomenon.`,
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 'FALSE',
    bandTarget: 'Band 7.5 - 8.5',
    trapAnalysis: 'Bẫy FALSE tuyệt đối: Câu hỏi khẳng định khủng hoảng đồng hồ thạch anh đã "vĩnh viễn xóa sổ nhu cầu của khách hàng đối với đồng hồ cơ" ("permanently eradicated"). Tuy nhiên, bài đọc chỉ ra rằng đồng hồ cơ đã hồi sinh rực rỡ thành một ngành xa xỉ phẩm tỷ đô ("spectacular cultural metamorphosis", "multi-billion-dollar luxury phenomenon").',
    explanationInVietnamese: 'Thông tin trong bài trực tiếp mâu thuẫn với nhận định: Đồng hồ cơ không hề biến mất vĩnh viễn mà trái lại đã tái định vị thành công thành biểu tượng thủ công xa xỉ thu hút giới sưu tầm toàn cầu.'
  },

  // GT LISTENING (THỰC TẾ ĐỜI SỐNG & CỘNG ĐỒNG)
  {
    id: 'gt-l1-tenancy-inventory',
    skill: 'listening',
    module: 'General Training',
    sectionOrPart: 'GT Listening Section 1 (Residential Tenancy Deposit & Inventory Check)',
    question: 'IELTS GT Listening: What is the refundable security deposit amount agreed upon for the apartment lease?',
    audioScript: 'Letting Agent: "For the two-bedroom duplex on Elmhurst Avenue, the standard security deposit is £1,450. However, because you have an established reference from your previous employer, the landlord agreed to reduce the deposit requirement to £1,150, provided the initial month rent of £950 is transferred upfront." Tenant: "That is marvelous, £1,150 is completely within my relocation budget."',
    options: ['£1,150', '£1,450', '£950', '£2,100'],
    correctAnswer: '£1,150',
    bandTarget: 'Band 7.0 - 7.5',
    trapAnalysis: 'Bẫy số tiền cọc vs Tiền nhà tháng đầu (Deposit vs Rent Trap): £1,450 là giá gốc, £950 là tiền nhà tháng đầu, còn mức đặt cọc thực tế được chốt là £1,150.',
    explanationInVietnamese: 'Chủ nhà đồng ý giảm mức tiền đặt cọc (security deposit) từ £1,450 xuống còn £1,150 do khách có thư giới thiệu tốt từ cơ quan.'
  },
  {
    id: 'gt-l2-community-library',
    skill: 'listening',
    module: 'General Training',
    sectionOrPart: 'GT Listening Section 2 (Community Volunteer Orientation)',
    question: 'Which department in the municipal library urgently requires weekend volunteers for digitized archives?',
    audioScript: 'Library Coordinator: "We have ample volunteers assisting at the children reading circle and circulation desk on Saturdays. Where we face a persistent shortage of personnel is in the Local History and Microfilm Archive on the third floor, particularly for digitizing 19th-century county newspapers."',
    options: [
      'The Local History and Microfilm Archive',
      'The Children Reading Circle',
      'The Front Circulation Desk',
      'The Main IT Computer Lab'
    ],
    correctAnswer: 'The Local History and Microfilm Archive',
    bandTarget: 'Band 7.5 - 8.0',
    trapAnalysis: 'Bẫy đủ người vs Thiếu người: Bộ phận đọc thiếu nhi và bàn thu đổi đã có đông người tình nguyện. Khu vực thiếu người ("persistent shortage") là phòng lưu trữ lịch sử địa phương và vi phim.',
    explanationInVietnamese: 'Bộ phận đang thiếu tình nguyện viên nghiêm trọng là Lưu trữ Lịch sử Địa phương và Vi phim (Local History and Microfilm Archive) ở tầng 3.'
  },

  // GT WRITING QUIZ
  {
    id: 'gt-w1-formal-letter-salutation',
    skill: 'writing',
    module: 'General Training',
    sectionOrPart: 'GT Writing Task 1 Quiz (Formal Letter Salutation & Sign-Off)',
    question: 'When writing a formal IELTS General Training complaint letter to an airline where the recipient name is unknown, what is the mandatory opening and closing pair?',
    options: [
      'Dear Sir or Madam, ... Yours faithfully,',
      'Dear Mr. Director, ... Best wishes,',
      'Hi Sir, ... Cheers,',
      'To whom it may concern, ... Yours sincerely,'
    ],
    correctAnswer: 'Dear Sir or Madam, ... Yours faithfully,',
    bandTarget: 'Band 8.0 - 9.0',
    trapAnalysis: 'Quy tắc vàng thư tín Anh ngữ chuẩn mực: Khi không biết tên người nhận (Dear Sir or Madam), kết thư BẮT BUỘC dùng "Yours faithfully". Khi biết rõ danh tính (Dear Mr. Smith), kết thư dùng "Yours sincerely".',
    explanationInVietnamese: 'Quy tắc chuẩn trong đề thi IELTS GT: Thư trang trọng không rõ tên người nhận phải bắt đầu bằng "Dear Sir or Madam" và kết thúc bằng "Yours faithfully".'
  },
  {
    id: 'gt-w2-informal-letter-tone',
    skill: 'writing',
    module: 'General Training',
    sectionOrPart: 'GT Writing Task 1 Quiz (Informal Letter Natural Expressions)',
    question: 'Which opening sentence establishes the most appropriate and natural tone for an informal letter inviting a close friend to visit?',
    options: [
      "I hope you're doing brilliantly! It feels like absolute ages since we last caught up over coffee, so I'm writing to see if you fancy coming over to stay for a long weekend next month.",
      'I am writing to formally request your presence at my domicile for an upcoming festive gathering.',
      'With reference to our past acquaintance, I hereby invite you to visit my house.',
      'Sir, you must visit my city because tourism is expanding.'
    ],
    correctAnswer: "I hope you're doing brilliantly! It feels like absolute ages since we last caught up over coffee, so I'm writing to see if you fancy coming over to stay for a long weekend next month.",
    bandTarget: 'Band 8.5+',
    trapAnalysis: 'Bẫy văn phong không phù hợp (Tone Inconsistency Trap): Thư gửi bạn thân (Informal) cần sự ấm áp, tự nhiên với các cụm thành ngữ đời thường ("feels like absolute ages", "fancy coming over") thay vì dùng từ cứng nhắc như "domicile" hay "hereby".',
    explanationInVietnamese: 'Thư thân mật đòi hỏi phong cách ấm cúng, tự nhiên với cách diễn đạt gần gũi giữa hai người bạn thân thiết.'
  },

  // GT SPEAKING
  {
    id: 'gt-s1-work-life-balance',
    skill: 'speaking',
    module: 'General Training',
    sectionOrPart: 'GT Speaking Part 1 (Daily Work Routine & Commute)',
    question: 'How should a candidate answer "How do you manage your daily commute during rush hours?" to achieve Band 8.5+?',
    options: [
      'To avoid the peak-hour gridlock, I deliberately adjust my morning schedule by taking an earlier train, which gives me thirty serene minutes at a quiet cafe near my office to plan my working day.',
      'I take bus every day because traffic is bad in Vietnam.',
      'Driving a motorbike is dangerous so I stay home.',
      'My commute is okay and I listen to music.'
    ],
    correctAnswer: 'To avoid the peak-hour gridlock, I deliberately adjust my morning schedule by taking an earlier train, which gives me thirty serene minutes at a quiet cafe near my office to plan my working day.',
    bandTarget: 'Band 8.5+',
    trapAnalysis: 'Áp dụng A.R.E.A với ngôn ngữ đời thường cao cấp: Nêu giải pháp ("deliberately adjust schedule") + Cách thực hiện ("taking an earlier train") + Lợi ích tâm lý ("thirty serene minutes to plan my day").',
    explanationInVietnamese: 'Câu trả lời thể hiện vốn từ vựng phong phú về đời sống thực tế ("peak-hour gridlock", "serene minutes") và phản xạ tự nhiên.'
  }
];

// MODEL WRITING PROMPTS CHO IELTS GENERAL TRAINING (ĐẦY ĐỦ 3 PHONG CÁCH THƯ & ESSAY ĐỜI SỐNG)
export const ieltsGtWritingPrompts: WritingModelPrompt[] = [
  // TASK 1: FORMAL LETTER
  {
    id: 'gt-w-task1-formal',
    taskType: 'Task 1',
    module: 'General Training',
    letterTone: 'Formal',
    title: 'Formal Letter: Complaint Regarding Flight Delay and Damaged Luggage',
    prompt: `You recently traveled on an international flight with British Airways. Upon arrival at your destination, your luggage was severely damaged, and your flight had been delayed for over four hours with no refreshment vouchers provided.

Write a letter to the airline's customer service manager. In your letter:
• Provide the details of your flight and the damage incurred
• Explain the inconvenience and financial hardship this delay caused you
• State clearly what compensation or remedial action you expect from the airline.`,
    bandScore: 'Band 9.0 Model Formal Letter (195 Words)',
    modelAnswer: `Dear Sir or Madam,

I am writing to register a formal complaint regarding the unacceptable service and luggage mishandling I experienced during flight BA-284 from London Heathrow to Singapore Changi on 14th October 2024 (Booking Reference: XJ89LP).

Upon arrival at the baggage reclaim carousel, I discovered that my hard-shell suitcase had sustained irreparable structural damage, including a severed telescopic handle and a major fracture along the base. Furthermore, our scheduled departure was delayed by four and a half hours on the tarmac without the provision of statutory refreshment vouchers or communicative updates from your ground personnel, causing me to forfeit a non-refundable domestic connecting flight.

Given that this disruption violated your airline's passenger charter obligations, I request immediate financial compensation of £280 for the replacement of the damaged Samsonite luggage, accompanied by full reimbursement of £145 for my rescheduled connecting flight ticket. Official baggage damage report forms (PIR/SIN/BA7721) and original purchase receipts are attached herewith.

I expect a written response and confirmation of settlement within fourteen working days.

Yours faithfully,

Nguyen Van An`,
    outline: [
      { point: 'Salutation & Formal Purpose', explanation: 'Dear Sir or Madam; declare unambiguous reason for writing with flight/booking codes.' },
      { point: 'Bullet 1: Specifics of Damage & Delay', explanation: 'Detail structural luggage damage and 4.5-hour delay without refreshment vouchers.' },
      { point: 'Bullet 2: Hardship & Inconvenience', explanation: 'Explain forfeiture of non-refundable connecting domestic travel.' },
      { point: 'Bullet 3: Demanded Compensation & Timeline', explanation: 'Itemize exact monetary claims (£280 + £145) and specify a 14-day resolution deadline.' },
      { point: 'Formal Sign-off', explanation: 'Yours faithfully + Full official name.' }
    ],
    keyVocabulary: [
      { word: 'Register a formal complaint', meaning: 'Gửi khiếu nại chính thức bằng văn bản', phonetic: '/ˈredʒ.ɪ.stər ə ˈfɔː.məl kəmˈpleɪnt/' },
      { word: 'Irreparable structural damage', meaning: 'Hư hỏng cấu trúc nghiêm trọng không thể sửa chữa', phonetic: '/ɪˈrep.ər.ə.bəl ˈstrʌk.tʃər.əl ˈdæm.ɪdʒ/' },
      { word: 'Passenger charter obligations', meaning: 'Nghĩa vụ theo điều lệ phục vụ hành khách hàng không', phonetic: '/ˈpæs.ɪn.dʒər ˈtʃɑː.tər ˌɒb.lɪˈɡeɪ.ʃənz/' },
      { word: 'Reimbursement', meaning: 'Khoản tiền hoàn trả bồi hoàn chi phí phát sinh', phonetic: '/ˌriː.ɪmˈbɜːs.mənt/' },
      { word: 'Attached herewith', meaning: 'Được đính kèm cùng văn bản này', phonetic: '/əˈtætʃt hɪəˈwɪð/' }
    ],
    examinerComment: 'Task Achievement 9.0: Hoàn thành trọn vẹn 3 yêu cầu đề bài với thông tin cụ thể, thuyết phục. Tone & Register 9.0: Giữ vững văn phong trang trọng từ đầu đến cuối, không dùng từ viết tắt, kết cấu câu chuẩn mực. Cohesion 9.0: Chuyển đoạn logic, diễn đạt dứt khoát.'
  },

  // TASK 1: SEMI-FORMAL LETTER
  {
    id: 'gt-w-task1-semiformal',
    taskType: 'Task 1',
    module: 'General Training',
    letterTone: 'Semi-formal',
    title: 'Semi-Formal Letter: Request for Property Repairs and Lease Extension',
    prompt: `You have been renting an apartment for the past ten months. You wish to extend your tenancy for another year, but there are several maintenance issues (such as water leakage in the bathroom and a malfunctioning heater) that need to be addressed promptly.

Write a letter to your landlord. In your letter:
• State your intention regarding renewing the tenancy agreement
• Describe the specific maintenance problems that require repair
• Propose a mutually convenient arrangement for contractors to inspect the flat.`,
    bandScore: 'Band 9.0 Model Semi-Formal Letter (185 Words)',
    modelAnswer: `Dear Mr. Henderson,

I hope this letter finds you well. As our current twelve-month tenancy agreement for Flat 4B, Richmond Terrace approaches its conclusion at the end of next month, I am writing to formally express my desire to renew the lease for an additional year.

My partner and I have thoroughly enjoyed residing in your property and have consistently maintained it with the utmost care. However, prior to finalizing the lease renewal documentation, there are two pressing maintenance issues that require your prompt intervention. Firstly, the central heating radiator in the primary bedroom has been malfunctioning intermittently over the past fortnight, leaving the room uncomfortably cold during chilly evenings. Secondly, we noticed a persistent slow drip beneath the bathroom washbasin, which is beginning to cause minor dampness on the baseboard.

Could you kindly arrange for a qualified plumber and heating engineer to inspect these matters? I work remotely on Tuesdays and Thursdays, so I would be delighted to grant access to contractors on either of those days.

Thank you very much for your understanding, and I look forward to hearing from you soon.

Yours sincerely,

Tran Minh Tu`,
    outline: [
      { point: 'Salutation & Positive Intent', explanation: 'Dear Mr. Henderson; polite opening and clear declaration of intention to renew lease.' },
      { point: 'Bullet 1: Tenancy Commendation', explanation: 'Acknowledge positive living experience and responsible tenant history.' },
      { point: 'Bullet 2: Specific Maintenance Deficiencies', explanation: 'Describe radiator malfunction and bathroom washbasin pipe leakage.' },
      { point: 'Bullet 3: Proposed Schedule for Contractors', explanation: 'Offer remote working days (Tuesdays/Thursdays) for contractor entry.' },
      { point: 'Semi-formal Sign-off', explanation: 'Yours sincerely + Full name.' }
    ],
    keyVocabulary: [
      { word: 'Approaches its conclusion', meaning: 'Sắp sửa tiến đến thời điểm đáo hạn/kết thúc hợp đồng', phonetic: '/əˈprəʊ.tʃɪz ɪts kənˈkluː.ʒən/' },
      { word: 'Prompt intervention', meaning: 'Sự can thiệp xử lý kịp thời nhanh chóng', phonetic: '/prɒmpt ˌɪn.təˈven.ʃən/' },
      { word: 'Malfunctioning intermittently', meaning: 'Bị chập chờn, trục trặc ngắt quãng', phonetic: '/ˌmælˈfʌŋk.ʃən.ɪŋ ˌɪn.təˈmɪt.ənt.li/' },
      { word: 'Mutually convenient', meaning: 'Thuận tiện, phù hợp cho cả đôi bên', phonetic: '/ˈmjuː.tʃu.ə.li kənˈviː.ni.ənt/' }
    ],
    examinerComment: 'Văn phong Semi-formal chuẩn xác: Vừa lịch sự, tôn trọng đối tác cho thuê nhà, vừa nêu rõ yêu cầu sửa chữa một cách dứt khoát và văn minh.'
  },

  // TASK 1: INFORMAL LETTER
  {
    id: 'gt-w-task1-informal',
    taskType: 'Task 1',
    module: 'General Training',
    letterTone: 'Informal',
    title: 'Informal Letter: Invitation to Stay and Suggested Holiday Itinerary',
    prompt: `A close friend from overseas is planning to visit your country for two weeks during their annual vacation.

Write a letter to your friend. In your letter:
• Invite them to stay at your home during their trip
• Describe some exciting local activities and sights you can experience together
• Ask about their travel dates and any dietary preferences.`,
    bandScore: 'Band 9.0 Model Informal Letter (180 Words)',
    modelAnswer: `Dear Liam,

It was fantastic to hear your news last week! I was absolutely thrilled to learn that you're finally heading over to Vietnam for your summer break. You must definitely stay at my place while you're in town—my spare guest room is all set up, and it'll be just like old times when we were roommates in Melbourne.

I've already started brainstorming an epic itinerary for us. First off, we'll dive straight into the street food scene in the old quarter; you haven't lived until you've tried authentic beef pho and iced egg coffee at dawn! Over the weekend, I'm thinking we could take my motorbike out to the countryside or rent a wooden junk boat to cruise around the breathtaking limestone karsts in the bay. 

Could you send me your flight itinerary as soon as you book it so I can pick you up at the airport? Also, let me know if you still have that shellfish allergy so I can plan our home-cooked dinners accordingly!

Can't wait to catch up properly. Safe travels!

Warmest wishes,

Huy`,
    outline: [
      { point: 'Warm Informal Greeting', explanation: 'Dear Liam; enthusiastic reaction to trip news and genuine hospitality offer.' },
      { point: 'Bullet 1: Accommodation Offer', explanation: 'Offer spare guest room with nostalgic Melbourne college callback.' },
      { point: 'Bullet 2: Exciting Cultural Itinerary', explanation: 'Street food breakfast, pho, egg coffee, and limestone karst boat cruise.' },
      { point: 'Bullet 3: Travel Logistics & Allergy Check', explanation: 'Request flight details for airport pickup and verify shellfish allergy.' },
      { point: 'Affectionate Sign-off', explanation: 'Can’t wait to catch up; Warmest wishes + First name.' }
    ],
    keyVocabulary: [
      { word: 'Thrilled to learn', meaning: 'Vô cùng hào hứng và phấn khởi khi hay tin', phonetic: '/θrɪld tuː lɜːn/' },
      { word: 'Epic itinerary', meaning: 'Lịch trình du lịch tuyệt vời đầy trải nghiệm đáng nhớ', phonetic: '/ˈep.ɪk aɪˈtɪn.ər.ər.i/' },
      { word: 'Limestone karsts', meaning: 'Các dãy núi đá vôi kỳ vĩ trên biển', phonetic: '/ˈlaɪm.stəʊn kɑːsts/' },
      { word: 'Catch up properly', meaning: 'Gặp gỡ hàn huyên tâm sự trọn vẹn', phonetic: '/kætʃ ʌp ˈprɒp.əl.i/' }
    ],
    examinerComment: 'Task 1 Informal tuyệt vời: Giọng điệu chân tình, sử dụng các từ nối hội thoại tự nhiên, từ ngữ đời thường giàu hình ảnh mà vẫn chuẩn xác tuyệt đối về ngữ pháp.'
  },

  // TASK 2: EVERYDAY SOCIAL ESSAY
  {
    id: 'gt-w-task2-essay',
    taskType: 'Task 2',
    module: 'General Training',
    title: 'General Training Essay: Remote Working vs Traditional Office Commute',
    prompt: `Some people believe that working remotely from home brings immense benefits to employees and families, while others argue that working in a traditional office environment is essential for teamwork and career advancement.

Discuss both views and give your own opinion.`,
    bandScore: 'Band 9.0 Model General Training Essay (285 Words)',
    modelAnswer: `The widespread proliferation of digital collaboration technologies has catalyzed a profound transformation in modern employment dynamics. While substantial arguments exist in favor of maintaining physical office workspaces for collective synergy, I firmly believe that the flexibility afforded by remote work provides far superior advantages for personal well-being and overall labor productivity.

Proponents of conventional corporate workplaces emphasize the irreplaceable value of spontaneous face-to-face interaction. In an office setting, colleagues resolve operational bottlenecks swiftly over informal discussions, fostering trust, corporate camaraderie, and organizational culture. Furthermore, for junior apprentices and recent university graduates, physical proximity to senior mentors offers invaluable observational learning that cannot be seamlessly replicated across digital screens. Without structured physical environments, professional boundaries often blur, leading some individuals to experience isolation or work-from-home burnout.

Conversely, the merits of remote working are transformative for everyday work-life balance. By eliminating exhausting daily commutes through metropolitan traffic congestion, employees reclaim up to two hours daily, which can be constructively invested in family care, physical exercise, or healthy home cooking. From a financial perspective, workers reduce expenditures on fuel, public transit, and commercial lunches, while employers save substantially on commercial real estate leases. Crucially, empirical evidence demonstrates that when employees are granted autonomy over their schedules, productivity frequently surges because individuals operate in customized home environments devoid of constant office interruptions.

In conclusion, while centralized offices retain undeniable utility for initial employee socialization and collaborative brainstorms, remote employment represents a superior model for contemporary lifestyles. Forward-thinking enterprises should adopt hybrid models that combine periodic collaborative workshops with the enduring benefits of autonomous home working.`,
    outline: [
      { point: 'Introduction & Clear Stance', explanation: 'Acknowledge office merits but affirm that remote work delivers superior well-being and productivity.' },
      { point: 'Body 1: The Case for Office Work', explanation: 'Spontaneous interaction, mentoring junior staff, and separating home from work.' },
      { point: 'Body 2: The Advantages of Remote Work', explanation: 'Eliminating commute stress, saving money, reclaiming family time, and higher focus.' },
      { point: 'Conclusion & Hybrid Compromise', explanation: 'Hybrid arrangements represent the ultimate optimal future of work.' }
    ],
    keyVocabulary: [
      { word: 'Catalyzed a profound transformation', meaning: 'Thúc đẩy sự biến đổi sâu sắc toàn diện', phonetic: '/ˈkæt.əl.aɪzd ə prəˈfaʊnd ˌtræns.fəˈmeɪ.ʃən/' },
      { word: 'Collective synergy', meaning: 'Sự hiệp lực, cộng hưởng của cả tập thể', phonetic: '/kəˈlek.tɪv ˈsɪn.ə.dʒi/' },
      { word: 'Metropolitan traffic congestion', meaning: 'Ách tắc giao thông đô thị bức bối', phonetic: '/ˌmet.rəˈpɒl.ɪ.tən ˈtræf.ɪk kənˈdʒes.tʃən/' },
      { word: 'Autonomy over schedules', meaning: 'Quyền tự chủ sắp xếp thời gian biểu', phonetic: '/ɔːˈtɒn.ə.mi ˈəʊ.vər ˈskedʒ.uːlz/' }
    ],
    examinerComment: 'Task Response 9.0: Lập luận thực tế, gần gũi với đời sống nhưng văn phong mạch lạc, từ vựng phong phú tự nhiên, giải quyết thấu đáo cả hai mặt của đề bài.'
  }
];

// COMPLETE IELTS GENERAL TRAINING TEST SET
export const ieltsGtTestSet: IeltsTestSet = {
  id: 'set-cam-gt-19',
  code: 'CAM-GT-19',
  title: 'Cambridge IELTS 19 General Training Test 1 (Bản Chuẩn Định Cư & Việc Làm)',
  year: '2024 - 2025',
  edition: 'Cambridge University Press Official (GT Track)',
  difficulty: 'Tiêu chuẩn (Band 6.0-7.0)',
  description: 'Đề thi General Training chính thức: Đọc hiểu đời sống Section 1 (biển báo & thông báo trung tâm cộng đồng), môi trường làm việc Section 2 (quy định nghỉ ốm & làm thêm giờ), bài đọc tạp chí Section 3, và đầy đủ 3 dạng thư Task 1 (Formal, Semi-formal, Informal).',
  targetBand: 'Band 6.5 - 8.0+ (Thang Điểm GT Riêng)',
  estimatedTimeMinutes: 25,
  tags: ['IELTS Định Cư', 'General Training', 'Viết Thư Task 1', 'Section 1-3 Chuẩn GT'],
  module: 'general-training',
  questions: ieltsGtQuestions,
  writingPrompts: ieltsGtWritingPrompts
};
