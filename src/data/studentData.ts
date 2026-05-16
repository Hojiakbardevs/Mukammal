import type { Tone } from "@/data/lmsData"

export type Me = {
  name: string
  group: string
  tone: Tone
  learningStream: string
  enrolled: number
  completed: number
  certs: number
  streak: number
  points: number
  level: number
  avgScore: number
  certificateProgress: number
}

export type MyCourse = {
  id: string
  title: string
  track: string
  teacher: string
  color: Tone
  progress: number
  lessonsTotal: number
  lessonsDone: number
  nextLesson: {
    module: string
    title: string
    kind: "video" | "lab" | "quiz" | "doc"
    duration: string
  } | null
  deadline: {
    title: string
    days: number
  } | null
  status: "active" | "completed"
}

export type MyTask = {
  id: number
  type: "project" | "assignment" | "lab" | "quiz"
  course: string
  title: string
  dueIn: number
  points: number
  status: "in-progress" | "not-started" | "graded"
  submittedAt: string | null
  score: number | null
  max?: number
}

export const ME: Me = {
  name: "Aziza Mahmudova",
  group: "NLP-26",
  tone: "b8",
  learningStream: "NLP-26 o'quv oqimi",
  enrolled: 4,
  completed: 2,
  certs: 2,
  streak: 14,
  points: 1240,
  level: 4,
  avgScore: 89,
  certificateProgress: 78,
}

export const MY_COURSES: MyCourse[] = [
  {
    id: "ai-fund",
    title: "Sun'iy intellekt asoslari",
    track: "AI/ML",
    teacher: "Aziza Tursunova",
    color: "b1",
    progress: 92,
    lessonsTotal: 56,
    lessonsDone: 52,
    nextLesson: { module: "Modul 8", title: "Regularization va Dropout", kind: "video", duration: "18 daq" },
    deadline: { title: "Final loyiha · sentiment", days: 3 },
    status: "active",
  },
  {
    id: "nlp",
    title: "Tabiiy tilni qayta ishlash",
    track: "AI/ML",
    teacher: "Aziza Tursunova",
    color: "b3",
    progress: 64,
    lessonsTotal: 52,
    lessonsDone: 33,
    nextLesson: { module: "Modul 5", title: "Transformerlar va attention", kind: "video", duration: "26 daq" },
    deadline: { title: "Hw 4 · embedding probes", days: 5 },
    status: "active",
  },
  {
    id: "ml-prod",
    title: "Production muhitida ML",
    track: "MLOps",
    teacher: "Akmal Hudoyberdiyev",
    color: "b2",
    progress: 28,
    lessonsTotal: 48,
    lessonsDone: 13,
    nextLesson: { module: "Modul 3", title: "Docker va konteynerlash", kind: "lab", duration: "60 daq" },
    deadline: { title: "Lab 2 · pipeline", days: 7 },
    status: "active",
  },
  {
    id: "stat",
    title: "Amaliy statistika",
    track: "Fundamental",
    teacher: "Lola Saidova",
    color: "b7",
    progress: 100,
    lessonsTotal: 32,
    lessonsDone: 32,
    nextLesson: null,
    deadline: null,
    status: "completed",
  },
]

export const MY_TASKS: MyTask[] = [
  { id: 1, type: "project", course: "Sun'iy intellekt asoslari", title: "Final loyiha · sentiment analyzer", dueIn: 3, points: 100, status: "in-progress", submittedAt: null, score: null },
  { id: 2, type: "assignment", course: "Tabiiy tilni qayta ishlash", title: "Hw 4 · embedding probes", dueIn: 5, points: 30, status: "not-started", submittedAt: null, score: null },
  { id: 3, type: "lab", course: "Production muhitida ML", title: "Lab 2 · CI/CD pipeline", dueIn: 7, points: 40, status: "not-started", submittedAt: null, score: null },
  { id: 4, type: "quiz", course: "Tabiiy tilni qayta ishlash", title: "Quiz 3 · Word2Vec", dueIn: -2, points: 30, status: "graded", submittedAt: "14-May", score: 27, max: 30 },
  { id: 5, type: "assignment", course: "Sun'iy intellekt asoslari", title: "Lab 4 · Linear regression", dueIn: -5, points: 40, status: "graded", submittedAt: "11-May", score: 38, max: 40 },
  { id: 6, type: "assignment", course: "Tabiiy tilni qayta ishlash", title: "Hw 3 · Tokenizatsiya va BPE", dueIn: -10, points: 30, status: "graded", submittedAt: "06-May", score: 28, max: 30 },
  { id: 7, type: "quiz", course: "Sun'iy intellekt asoslari", title: "Quiz 2 · supervised models", dueIn: -14, points: 20, status: "graded", submittedAt: "02-May", score: 19, max: 20 },
]

export const MY_SCHEDULE = [
  { day: 0, slot: 0, course: "Sun'iy intellekt asoslari", kind: "lecture", room: "B-204", trainer: "A. Tursunova" },
  { day: 0, slot: 2, course: "Tabiiy tilni qayta ishlash", kind: "live", room: "Online", trainer: "A. Tursunova" },
  { day: 2, slot: 1, course: "Production muhitida ML", kind: "lab", room: "A-101", trainer: "A. Hudoyberdiyev" },
  { day: 3, slot: 1, course: "Tabiiy tilni qayta ishlash", kind: "lecture", room: "B-302", trainer: "A. Tursunova" },
  { day: 4, slot: 2, course: "Production muhitida ML", kind: "exam", room: "A-101", trainer: "A. Hudoyberdiyev" },
] as const

export const MY_GRADES = {
  byCourse: [
    { course: "Sun'iy intellekt asoslari", components: { attendance: 96, quiz: 92, homework: 95, exam: 88, final: 0 }, weights: { attendance: 10, quiz: 20, homework: 30, exam: 20, final: 20 }, current: 91, target: 95, feedback: "Final loyihada model validatsiyasini aniqroq ko'rsating." },
    { course: "Tabiiy tilni qayta ishlash", components: { attendance: 100, quiz: 92, homework: 90, exam: 86, final: 0 }, weights: { attendance: 10, quiz: 20, homework: 30, exam: 20, final: 20 }, current: 92, target: 95, feedback: "Embedding tahlilida grafik va izohlar kuchli, xulosa qismi yanada aniq bo'lsin." },
    { course: "Production muhitida ML", components: { attendance: 92, quiz: 85, homework: 78, exam: 0, final: 0 }, weights: { attendance: 10, quiz: 20, homework: 30, exam: 20, final: 20 }, current: 78, target: 85, feedback: "Pipeline labida test bosqichi bor, lekin rollback rejasi yetishmayapti." },
    { course: "Amaliy statistika", components: { attendance: 98, quiz: 96, homework: 94, exam: 92, final: 90 }, weights: { attendance: 10, quiz: 20, homework: 30, exam: 20, final: 20 }, current: 94, target: 90, feedback: "Kurs muvaffaqiyatli tugatilgan, sertifikat berilgan." },
  ],
}

export const MY_CERTS = [
  { id: "c1", title: "Amaliy statistika", issuedAt: "30-Apr 2026", score: 94, style: "teal", verified: true },
  { id: "c2", title: "Python data analysis · Foundation", issuedAt: "18-Mar 2026", score: 88, style: "blue", verified: true },
]

export const MY_QA_FEED = [
  { course: "Tabiiy tilni qayta ishlash", topic: "BPE va WordPiece farqi", answer: "Trener A. Tursunova javob berdi · 12 ovoz", age: "1 kun" },
  { course: "Sun'iy intellekt asoslari", topic: "Lab 4 · overfittingni qanday tekshirish?", answer: "Sizning savolingiz · 1 javob", age: "1 soat", mine: true },
]

export const BADGES = [
  { icon: "flame", title: "14 kunlik streak", desc: "Har kuni kamida 1 dars", tone: "amber" },
  { icon: "trophy", title: "Birinchi sertifikat", desc: "Amaliy statistikani tugatdingiz", tone: "blue" },
  { icon: "rocket", title: "Erta topshirish", desc: "5 ta topshiriq muddatidan oldin", tone: "purple" },
  { icon: "stars", title: "Yuqori natija", desc: "Quizlarda 90+ o'rtacha", tone: "green" },
  { icon: "messages", title: "Hamjamiyat yordami", desc: "3 ta Q&A javobi qabul qilindi", tone: "teal" },
]

export const LESSON = {
  course: "Tabiiy tilni qayta ishlash",
  title: "Transformerlar va attention mexanizmi",
  module: "Modul 5 · Dars 3 / 8",
  duration: "26 daq",
  trainer: "Aziza Tursunova",
  modules: [
    {
      id: "m1",
      title: "Tokenizatsiya va embeddinglar",
      state: "done",
      lessons: [
        { title: "Tokenization asoslari", kind: "video", duration: "12 daq", state: "done" },
        { title: "BPE va WordPiece", kind: "video", duration: "18 daq", state: "done" },
        { title: "Word2Vec va GloVe", kind: "video", duration: "20 daq", state: "done" },
        { title: "Quiz 1", kind: "quiz", duration: "10 daq", state: "done" },
      ],
    },
    {
      id: "m4",
      title: "Sequence modeling",
      state: "done",
      lessons: [
        { title: "RNN intuition", kind: "video", duration: "16 daq", state: "done" },
        { title: "LSTM va GRU", kind: "video", duration: "22 daq", state: "done" },
        { title: "Hw 3 · Tokenizatsiya va BPE", kind: "assignment", duration: "Baholangan", state: "done" },
      ],
    },
    {
      id: "m5",
      title: "Attention va Transformerlar",
      state: "current",
      lessons: [
        { title: "Self-attention nazariyasi", kind: "video", duration: "20 daq", state: "done" },
        { title: "Positional encoding", kind: "doc", duration: "12 daq", state: "done" },
        { title: "Transformerlar va attention", kind: "video", duration: "26 daq", state: "current" },
        { title: "Pre-trained transformerlar", kind: "video", duration: "22 daq", state: "locked" },
        { title: "Quiz 3 · attention", kind: "quiz", duration: "12 daq", state: "locked" },
      ],
    },
    {
      id: "m6",
      title: "Yakuniy loyiha",
      state: "locked",
      lessons: [
        { title: "Capstone brief", kind: "pdf", duration: "PDF", state: "locked" },
        { title: "Capstone topshirish", kind: "assignment", duration: "100 ball", state: "locked" },
      ],
    },
  ],
}
