/* student perspective: a single learner ("Aziza Mahmudova") */

const ME = {
  name: "Aziza Mahmudova",
  group: "NLP-26",
  tone: "b8",
  learningStream: "Spring '26",
  enrolled: 4,
  completed: 2,
  certs: 2,
  streak: 14,
  points: 1240,
  level: 4,
  avgScore: 89,
  certificateProgress: 78, // toward "AI Track" path certificate
};

const MY_COURSES = [
  {
    id: "ai-fund", title: "AI Fundamentals", track: "AI/ML",
    teacher: "Aziza Tursunova", color: "b1",
    progress: 92, lessonsTotal: 56, lessonsDone: 52,
    nextLesson: { mod: "Modul 8", t: "Regularization va Dropout", kind: "vid", dur: "18 daq" },
    deadline: { t: "Final loyiha — sentiment", days: 3 },
    status: "active",
  },
  {
    id: "nlp", title: "Tabiiy tilni qayta ishlash (NLP)", track: "AI/ML",
    teacher: "Aziza Tursunova", color: "b3",
    progress: 64, lessonsTotal: 52, lessonsDone: 33,
    nextLesson: { mod: "Modul 5", t: "Transformerlar va attention", kind: "vid", dur: "26 daq" },
    deadline: { t: "Hw 4 — embedding probes", days: 5 },
    status: "active",
  },
  {
    id: "ml-prod", title: "ML in Production", track: "MLOps",
    teacher: "Akmal Hudoyberdiyev", color: "b2",
    progress: 28, lessonsTotal: 48, lessonsDone: 13,
    nextLesson: { mod: "Modul 3", t: "Docker va konteynerlash", kind: "lab", dur: "60 daq" },
    deadline: { t: "Lab 2 — pipeline", days: 7 },
    status: "active",
  },
  {
    id: "stat", title: "Amaliy statistika", track: "Fundamental",
    teacher: "Lola Saidova", color: "b7",
    progress: 100, lessonsTotal: 32, lessonsDone: 32,
    nextLesson: null,
    deadline: null,
    status: "completed",
  },
];

const MY_TASKS = [
  { id: 1, type: "project",    course: "AI Fundamentals", title: "Final loyiha — sentiment analyzer", dueIn: 3, points: 100, status: "in-progress",  submittedAt: null, score: null },
  { id: 2, type: "assignment", course: "NLP",             title: "Hw 4 — embedding probes",            dueIn: 5, points: 30,  status: "not-started", submittedAt: null, score: null },
  { id: 3, type: "lab",        course: "ML in Production",title: "Lab 2 — CI/CD pipeline",             dueIn: 7, points: 40,  status: "not-started", submittedAt: null, score: null },
  { id: 4, type: "quiz",       course: "NLP",             title: "Quiz 3 — Word2Vec",                  dueIn: -2,points: 30,  status: "graded",      submittedAt: "14-May", score: 27, max: 30 },
  { id: 5, type: "assignment", course: "AI Fundamentals", title: "Lab 4 — Linear regression",          dueIn: -5,points: 40,  status: "graded",      submittedAt: "11-May", score: 38, max: 40 },
  { id: 6, type: "assignment", course: "NLP",             title: "Hw 3 — Tokenization & BPE",          dueIn: -10,points: 30, status: "graded",      submittedAt: "06-May", score: 28, max: 30 },
  { id: 7, type: "quiz",       course: "AI Fundamentals", title: "Quiz 2 — supervised models",         dueIn: -14,points: 20, status: "graded",      submittedAt: "02-May", score: 19, max: 20 },
];

const MY_SCHEDULE = [
  { day: 0, slot: 0, course: "AI Fundamentals", kind: "lecture", room: "B-204",   trainer: "A. Tursunova" },
  { day: 0, slot: 2, course: "NLP",             kind: "live",    room: "Online",  trainer: "A. Tursunova" },
  { day: 2, slot: 1, course: "ML in Production",kind: "lab",     room: "A-101",   trainer: "A. Hudoyberdiyev" },
  { day: 3, slot: 1, course: "NLP",             kind: "lecture", room: "B-302",   trainer: "A. Tursunova" },
  { day: 4, slot: 2, course: "ML in Production",kind: "exam",    room: "A-101",   trainer: "A. Hudoyberdiyev" },
];

const MY_GRADES = {
  byCourse: [
    { course: "AI Fundamentals", components: { att: 96, quiz: 92, hw: 95, exam: 88, final: 0  }, weights: { att: 10, quiz: 20, hw: 30, exam: 20, final: 20 }, current: 91, target: 95 },
    { course: "NLP",             components: { att: 100,quiz: 92, hw: 90, exam: 86, final: 0  }, weights: { att: 10, quiz: 20, hw: 30, exam: 20, final: 20 }, current: 92, target: 95 },
    { course: "ML in Production",components: { att: 92, quiz: 85, hw: 78, exam: 0,  final: 0  }, weights: { att: 10, quiz: 20, hw: 30, exam: 20, final: 20 }, current: 78, target: 85 },
    { course: "Amaliy statistika",components:{ att: 98, quiz: 96, hw: 94, exam: 92, final: 90 }, weights: { att: 10, quiz: 20, hw: 30, exam: 20, final: 20 }, current: 94, target: 90 },
  ],
};

const MY_CERTS = [
  { id: "c1", title: "Amaliy statistika", issuedAt: "30-Apr 2026", score: 94, style: "teal", verified: true },
  { id: "c2", title: "Python data analysis (Foundation)", issuedAt: "18-Mar 2026", score: 88, style: "blue", verified: true },
];

const MY_QA_FEED = [
  { course: "NLP", topic: "BPE va WordPiece farqi", answer: "Trainer A. Tursunova javob berdi · 12 ovoz", age: "1 kun" },
  { course: "AI Fundamentals", topic: "Lab 4 — overfittingni qanday tekshirish?", answer: "Sizning savolingiz · 1 javob", age: "1 soat", mine: true },
];

const BADGES = [
  { ico: "flame",    title: "14 kunlik streak",      desc: "Har kuni kamida 1 dars",   tone: "amber" },
  { ico: "trophy",   title: "Birinchi sertifikat",   desc: "Amaliy statistikani tugatdingiz", tone: "blue" },
  { ico: "rocket",   title: "Erta yetkazib berish",  desc: "5 ta topshiriqni muddatidan oldin", tone: "purple" },
  { ico: "stars",    title: "Top feedback score",    desc: "Quizlarda 90+ o'rtacha",   tone: "green" },
  { ico: "messages", title: "Yordamga shoshilgan",   desc: "3 ta Q&A javobi qabul qilindi", tone: "teal" },
];

const LESSON = {
  course: "NLP",
  title: "Transformerlar va attention mexanizmi",
  mod: "Modul 5 · Dars 3 / 8",
  duration: "26 daq",
  trainer: "Aziza Tursunova",
  modules: [
    { id: "m1", title: "Tokenizatsiya va embeddinglar", state: "done", lessons: [
      { t: "Tokenization asoslari",   kind: "vid", dur: "12 daq", state: "done" },
      { t: "BPE va WordPiece",         kind: "vid", dur: "18 daq", state: "done" },
      { t: "Word2Vec & GloVe",         kind: "vid", dur: "20 daq", state: "done" },
      { t: "Quiz 1",                   kind: "quiz", dur: "10 daq", state: "done" },
    ]},
    { id: "m4", title: "Sequence modeling", state: "done", lessons: [
      { t: "RNN intuition",            kind: "vid", dur: "16 daq", state: "done" },
      { t: "LSTM va GRU",              kind: "vid", dur: "22 daq", state: "done" },
      { t: "Hw 3 — Tokenization & BPE",kind: "asgn", dur: "—",     state: "done" },
    ]},
    { id: "m5", title: "Attention va Transformerlar", state: "current", lessons: [
      { t: "Self-attention nazariyasi",kind: "vid", dur: "20 daq", state: "done" },
      { t: "Positional encoding",      kind: "doc", dur: "12 daq", state: "done" },
      { t: "Transformerlar va attention", kind: "vid", dur: "26 daq", state: "current" },
      { t: "Pre-trained transformerlar", kind: "vid", dur: "22 daq", state: "lock" },
      { t: "Quiz 3 — attention",       kind: "quiz", dur: "12 daq", state: "lock" },
    ]},
    { id: "m6", title: "Yakuniy loyiha", state: "lock", lessons: [
      { t: "Capstone brief",           kind: "pdf", dur: "—",     state: "lock" },
      { t: "Capstone topshirish",      kind: "asgn", dur: "—",    state: "lock" },
    ]},
  ],
};

window.__STU__ = { ME, MY_COURSES, MY_TASKS, MY_SCHEDULE, MY_GRADES, MY_CERTS, MY_QA_FEED, BADGES, LESSON };
