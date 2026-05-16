export const ME = {
  name: "Aziza Mahmudova",
  group: "NLP-26",
  stream: "Bahor 2026",
  enrolled: 4,
  completed: 2,
  certs: 2,
  streak: 14,
  points: 1240,
  level: 4,
  avgScore: 89,
  certificateProgress: 78,
}

export const MY_COURSES = [
  {
    id: "ai-fund",
    title: "Sun’iy intellekt asoslari",
    track: "AI va ML",
    teacher: "Aziza Tursunova",
    progress: 92,
    lessonsTotal: 56,
    lessonsDone: 52,
    nextLesson: "Regularization va Dropout",
    deadline: "Final loyiha, 3 kun",
    status: "Faol",
  },
  {
    id: "nlp",
    title: "Tabiiy tilni qayta ishlash",
    track: "NLP",
    teacher: "Aziza Tursunova",
    progress: 64,
    lessonsTotal: 52,
    lessonsDone: 33,
    nextLesson: "Transformerlar va attention",
    deadline: "Embedding probes, 5 kun",
    status: "Faol",
  },
  {
    id: "ml-prod",
    title: "ML tizimlarini ishlab chiqarishga chiqarish",
    track: "MLOps",
    teacher: "Akmal Hudoyberdiyev",
    progress: 28,
    lessonsTotal: 48,
    lessonsDone: 13,
    nextLesson: "Docker va konteynerlash",
    deadline: "CI/CD pipeline, 7 kun",
    status: "Faol",
  },
  {
    id: "stat",
    title: "Amaliy statistika",
    track: "Fundamental",
    teacher: "Lola Saidova",
    progress: 100,
    lessonsTotal: 32,
    lessonsDone: 32,
    nextLesson: "Kurs yakunlangan",
    deadline: "Sertifikat berilgan",
    status: "Yakunlangan",
  },
]

export const MY_TASKS = [
  { id: 1, type: "Loyiha", course: "Sun’iy intellekt asoslari", title: "Final loyiha, sentiment analyzer", dueIn: 3, points: 100, status: "Jarayonda", score: null },
  { id: 2, type: "Uy ishi", course: "Tabiiy tilni qayta ishlash", title: "Embedding probes", dueIn: 5, points: 30, status: "Boshlanmagan", score: null },
  { id: 3, type: "Lab", course: "ML tizimlarini ishlab chiqarishga chiqarish", title: "CI/CD pipeline", dueIn: 7, points: 40, status: "Boshlanmagan", score: null },
  { id: 4, type: "Quiz", course: "Tabiiy tilni qayta ishlash", title: "Word2Vec testi", dueIn: -2, points: 30, status: "Baholangan", score: 27 },
  { id: 5, type: "Uy ishi", course: "Sun’iy intellekt asoslari", title: "Linear regression", dueIn: -5, points: 40, status: "Baholangan", score: 38 },
  { id: 6, type: "Uy ishi", course: "Tabiiy tilni qayta ishlash", title: "Tokenizatsiya va BPE", dueIn: -10, points: 30, status: "Baholangan", score: 28 },
]

export const MY_SCHEDULE = [
  { day: "Dushanba", time: "09:00", course: "Sun’iy intellekt asoslari", kind: "Ma’ruza", room: "B-204", trainer: "A. Tursunova" },
  { day: "Dushanba", time: "14:00", course: "Tabiiy tilni qayta ishlash", kind: "Jonli", room: "Online", trainer: "A. Tursunova" },
  { day: "Chorshanba", time: "10:00", course: "ML tizimlarini ishlab chiqarishga chiqarish", kind: "Lab", room: "A-101", trainer: "A. Hudoyberdiyev" },
  { day: "Payshanba", time: "11:00", course: "Tabiiy tilni qayta ishlash", kind: "Ma’ruza", room: "B-302", trainer: "A. Tursunova" },
  { day: "Juma", time: "15:00", course: "ML tizimlarini ishlab chiqarishga chiqarish", kind: "Imtihon", room: "A-101", trainer: "A. Hudoyberdiyev" },
]

export const MY_GRADES = [
  { course: "Sun’iy intellekt asoslari", attendance: 96, quiz: 92, homework: 95, exam: 88, finalProject: 0, current: 91, target: 95, feedback: "Yakuniy loyihada model monitoring qismini kuchaytiring." },
  { course: "Tabiiy tilni qayta ishlash", attendance: 100, quiz: 92, homework: 90, exam: 86, finalProject: 0, current: 92, target: 95, feedback: "Attention mexanizmi bo‘yicha izohlaringiz aniq, amaliy kodga ko‘proq tajriba qo‘shing." },
  { course: "ML tizimlarini ishlab chiqarishga chiqarish", attendance: 92, quiz: 85, homework: 78, exam: 0, finalProject: 0, current: 78, target: 85, feedback: "Docker qatlamlarini optimallashtirishni qayta ishlang." },
  { course: "Amaliy statistika", attendance: 98, quiz: 96, homework: 94, exam: 92, finalProject: 90, current: 94, target: 90, feedback: "Kurs muvaffaqiyatli yakunlangan." },
]

export const MY_CERTS = [
  { id: "c1", title: "Amaliy statistika", issuedAt: "30-Apr 2026", score: 94, verified: true },
  { id: "c2", title: "Python data analysis Foundation", issuedAt: "18-Mar 2026", score: 88, verified: true },
]

export const BADGES = [
  { title: "14 kunlik streak", desc: "Har kuni kamida bitta dars", tone: "amber" },
  { title: "Birinchi sertifikat", desc: "Amaliy statistika yakunlandi", tone: "blue" },
  { title: "Erta topshirish", desc: "5 ta topshiriq muddatidan oldin", tone: "emerald" },
  { title: "Kuchli feedback", desc: "Quizlarda 90+ o‘rtacha", tone: "violet" },
]

export const LESSON = {
  course: "Tabiiy tilni qayta ishlash",
  title: "Transformerlar va attention mexanizmi",
  module: "Modul 5, Dars 3 / 8",
  duration: "26 daqiqa",
  trainer: "Aziza Tursunova",
  materials: ["Attention konspekti.pdf", "Transformer notebook.ipynb", "Qo‘shimcha maqolalar ro‘yxati"],
  modules: [
    {
      title: "Tokenizatsiya va embeddinglar",
      state: "Tugallangan",
      lessons: ["Tokenization asoslari", "BPE va WordPiece", "Word2Vec va GloVe", "Quiz 1"],
    },
    {
      title: "Sequence modeling",
      state: "Tugallangan",
      lessons: ["RNN intuition", "LSTM va GRU", "Tokenizatsiya uy ishi"],
    },
    {
      title: "Attention va Transformerlar",
      state: "Joriy",
      lessons: ["Self-attention nazariyasi", "Positional encoding", "Transformerlar va attention", "Pre-trained transformerlar"],
    },
    {
      title: "Yakuniy loyiha",
      state: "Rejalashtirilgan",
      lessons: ["Loyiha brifi", "Capstone topshirish", "Himoya sessiyasi"],
    },
  ],
  qa: [
    { name: "Otabek Rasulov", question: "Multi-head attention nechta proyeksiyani o‘rganadi?", answer: "Har bir head alohida query, key va value proyeksiyasini o‘rganadi." },
    { name: "Aziza Mahmudova", question: "Position encoding sinusoidal bo‘lishi shartmi?", answer: "Shart emas, lekin uzun ketma-ketliklarda umumlashish uchun qulay." },
  ],
}
