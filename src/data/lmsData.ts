export type Tone = "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8"

export type CourseStatus = "published" | "draft" | "paused" | "archived"

export type Course = {
  id: string
  title: string
  learningStream: string
  cohort: string
  format: "blended" | "cohort" | "self-paced"
  teacher: string
  studentsTotal: number
  studentsActive: number
  progress: number
  modules: number
  lessons: number
  color: Tone
  status: CourseStatus
  nextSession: string
  trend: number[]
}

export type StudentRecord = {
  name: string
  group: string
  tone: Tone
  risk: number
  progress: number
  attendance: number
  gpa: number
  late: number
  trend: "up" | "down" | "flat"
  mode: "online" | "offline"
}

export type Submission = {
  id: string
  student: StudentRecord
  course: string
  type: "assignment" | "project" | "quiz" | "lab"
  title: string
  points: string
  state: "needs-grade" | "ai-flag" | "appeal" | "auto-graded"
  suggestedScore: number | null
  confidence: number | null
  submittedAgo: string
  late: boolean
  files: string[]
  rubric: number
}

export type ScheduleItem = {
  day: number
  slot: number
  course: string
  group: string
  room: string
  trainer: string
  kind: "lecture" | "lab" | "live" | "exam" | "hours"
}

export type UserRecord = {
  name: string
  email: string
  role: "Student" | "Teacher" | "Admin" | "Super Admin" | "Reviewer"
  status: "active" | "at-risk" | "blocked" | "completed" | "inactive"
  learningStream: string
  last: string
  tone: Tone
  twoFa: boolean
  mode: "offline" | "online"
}

export type AuditLog = {
  id: string
  ts: string
  actor: string
  role: string
  action: string
  target: string
  ip: string
  severity: "high" | "medium" | "low" | "info"
  device: string
  region: string
  payload: {
    before?: Record<string, unknown>
    after?: Record<string, unknown>
    reason: string
    approvedBy: string[]
    aiInvolved: boolean
  }
}

export type QAItem = {
  id: string
  student: StudentRecord
  course: string
  topic: string
  body: string
  state: "needs-reply" | "answered"
  flagged: boolean
  votes: number
  age: string
}

export const COURSES: Course[] = [
  {
    id: "ai-fund",
    title: "Sun'iy intellekt asoslari",
    learningStream: "AI-26-1B o'quv oqimi",
    cohort: "Spring '26 — O'quv oqimi B",
    format: "blended",
    teacher: "Aziza Tursunova",
    studentsTotal: 124,
    studentsActive: 118,
    progress: 64,
    modules: 9,
    lessons: 56,
    color: "b1",
    status: "published",
    nextSession: "Bugun · 14:00",
    trend: [38, 42, 49, 55, 58, 61, 64],
  },
  {
    id: "ml-prod",
    title: "Production muhitida ML",
    learningStream: "ML-26-2A o'quv oqimi",
    cohort: "Spring '26 — O'quv oqimi A",
    format: "cohort",
    teacher: "Akmal Hudoyberdiyev",
    studentsTotal: 86,
    studentsActive: 81,
    progress: 41,
    modules: 7,
    lessons: 48,
    color: "b2",
    status: "published",
    nextSession: "Ertaga · 10:00",
    trend: [22, 26, 30, 33, 35, 38, 41],
  },
  {
    id: "nlp",
    title: "Tabiiy tilni qayta ishlash (NLP)",
    learningStream: "NLP-26 o'quv oqimi",
    cohort: "Spring '26 — O'quv oqimi B",
    format: "cohort",
    teacher: "Aziza Tursunova",
    studentsTotal: 71,
    studentsActive: 68,
    progress: 78,
    modules: 8,
    lessons: 52,
    color: "b3",
    status: "published",
    nextSession: "Chorshanba · 16:00",
    trend: [58, 62, 66, 70, 72, 75, 78],
  },
  {
    id: "cv",
    title: "Computer Vision asoslari",
    learningStream: "Mustaqil ta'lim · 2026",
    cohort: "Self-paced · 2026",
    format: "self-paced",
    teacher: "Lola Saidova",
    studentsTotal: 142,
    studentsActive: 110,
    progress: 28,
    modules: 6,
    lessons: 38,
    color: "b4",
    status: "draft",
    nextSession: "Kontent tekshiruvda",
    trend: [12, 16, 19, 22, 24, 26, 28],
  },
]

export const STUDENTS: StudentRecord[] = [
  { name: "Diyora Karimova",  group: "AI-26-1B", tone: "b6", risk: 86, progress: 34, attendance: 62,  gpa: 71, late: 3, trend: "down", mode: "offline" },
  { name: "Sherzod Nazarov",  group: "AI-26-1A", tone: "b2", risk: 71, progress: 41, attendance: 70,  gpa: 64, late: 2, trend: "down", mode: "offline" },
  { name: "Madina Yusupova",  group: "AI-26-1B", tone: "b5", risk: 64, progress: 52, attendance: 78,  gpa: 77, late: 1, trend: "flat", mode: "offline" },
  { name: "Otabek Rasulov",   group: "ML-26-2A", tone: "b3", risk: 22, progress: 88, attendance: 96,  gpa: 92, late: 0, trend: "up",   mode: "offline" },
  { name: "Nilufar Komilova", group: "ML-26-2A", tone: "b7", risk: 14, progress: 91, attendance: 98,  gpa: 94, late: 0, trend: "up",   mode: "offline" },
  { name: "Jasur Tojiev",     group: "AI-26-1A", tone: "b4", risk: 58, progress: 49, attendance: 82,  gpa: 70, late: 1, trend: "flat", mode: "offline" },
  { name: "Aziza Mahmudova",  group: "NLP-26",   tone: "b8", risk: 8,  progress: 96, attendance: 100, gpa: 96, late: 0, trend: "up",   mode: "online"  },
  { name: "Bobur Yuldashev",  group: "NLP-26",   tone: "b1", risk: 41, progress: 64, attendance: 88,  gpa: 78, late: 1, trend: "flat", mode: "online"  },
]

export const SUBMISSIONS: Submission[] = [
  {
    id: "sub-1201",
    student: STUDENTS[5],
    course: "Sun'iy intellekt asoslari",
    type: "assignment",
    title: "Lab 4 · Linear regression",
    points: "0 / 40",
    state: "needs-grade",
    suggestedScore: 32,
    confidence: 84,
    submittedAgo: "2 soat",
    late: false,
    files: ["lab4_solution.ipynb", "report.pdf"],
    rubric: 4,
  },
  {
    id: "sub-1202",
    student: STUDENTS[3],
    course: "Production muhitida ML",
    type: "project",
    title: "Mid-term loyiha · Deployment",
    points: "0 / 100",
    state: "needs-grade",
    suggestedScore: 78,
    confidence: 76,
    submittedAgo: "5 soat",
    late: false,
    files: ["dockerfile", "report.pdf", "demo.mp4"],
    rubric: 6,
  },
  {
    id: "sub-1203",
    student: STUDENTS[2],
    course: "Tabiiy tilni qayta ishlash",
    type: "assignment",
    title: "Hw 3 · Tokenizatsiya va BPE",
    points: "0 / 30",
    state: "ai-flag",
    suggestedScore: 18,
    confidence: 61,
    submittedAgo: "9 soat",
    late: true,
    files: ["hw3.ipynb"],
    rubric: 3,
  },
  {
    id: "sub-1204",
    student: STUDENTS[7],
    course: "Tabiiy tilni qayta ishlash",
    type: "quiz",
    title: "Quiz 2 · Embeddinglar",
    points: "26 / 30",
    state: "auto-graded",
    suggestedScore: null,
    confidence: null,
    submittedAgo: "1 kun",
    late: false,
    files: [],
    rubric: 0,
  },
  {
    id: "sub-1205",
    student: STUDENTS[1],
    course: "Sun'iy intellekt asoslari",
    type: "assignment",
    title: "Lab 4 · Linear regression",
    points: "0 / 40",
    state: "needs-grade",
    suggestedScore: 22,
    confidence: 69,
    submittedAgo: "11 soat",
    late: true,
    files: ["lab4_v2.ipynb"],
    rubric: 4,
  },
  {
    id: "sub-1206",
    student: STUDENTS[0],
    course: "Sun'iy intellekt asoslari",
    type: "assignment",
    title: "Lab 3 · NumPy asoslari",
    points: "0 / 30",
    state: "appeal",
    suggestedScore: 28,
    confidence: 81,
    submittedAgo: "2 kun",
    late: false,
    files: ["lab3.ipynb", "notes.md"],
    rubric: 4,
  },
  {
    id: "sub-1207",
    student: STUDENTS[6],
    course: "Tabiiy tilni qayta ishlash",
    type: "project",
    title: "Term loyiha · Sentiment analyzer",
    points: "0 / 100",
    state: "needs-grade",
    suggestedScore: 88,
    confidence: 89,
    submittedAgo: "3 soat",
    late: false,
    files: ["repo.zip", "demo.mp4"],
    rubric: 6,
  },
]

export const SCHEDULE: ScheduleItem[] = [
  { day: 0, slot: 0, course: "Sun'iy intellekt asoslari", group: "AI-26-1B", room: "B-204",  trainer: "Aziza T.", kind: "lecture" },
  { day: 0, slot: 2, course: "Tabiiy tilni qayta ishlash (NLP)", group: "NLP-26",   room: "Online", trainer: "Aziza T.", kind: "live"    },
  { day: 1, slot: 1, course: "Production muhitida ML",    group: "ML-26-2A", room: "A-101",  trainer: "Aziza T.", kind: "lab"     },
  { day: 2, slot: 0, course: "Sun'iy intellekt asoslari", group: "AI-26-1A", room: "B-204",  trainer: "Aziza T.", kind: "lecture" },
  { day: 2, slot: 3, course: "Ochiq maslahat vaqti",      group: "Barcha",   room: "Online", trainer: "Aziza T.", kind: "hours"   },
  { day: 3, slot: 1, course: "Tabiiy tilni qayta ishlash (NLP)", group: "NLP-26",   room: "B-302",  trainer: "Aziza T.", kind: "lecture" },
  { day: 4, slot: 2, course: "Production muhitida ML",    group: "ML-26-2A", room: "A-101",  trainer: "Aziza T.", kind: "exam"    },
  { day: 5, slot: 0, course: "Sun'iy intellekt asoslari", group: "AI-26-1B", room: "B-204",  trainer: "Aziza T.", kind: "lab"     },
]

export const SCHEDULE_SLOTS = [
  { t: "08:30", e: "10:00" },
  { t: "10:15", e: "11:45" },
  { t: "12:30", e: "14:00" },
  { t: "14:15", e: "15:45" },
  { t: "16:00", e: "17:30" },
]

export const SCHEDULE_DAYS = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"]

export const LEARNING_STREAMS = [
  { id: "ai-26-1a", name: "AI-26-1A", course: "Sun'iy intellekt asoslari", startDate: "12-Yan", endDate: "30-May", students: 62, completion: 68, atRisk: 4 },
  { id: "ai-26-1b", name: "AI-26-1B", course: "Sun'iy intellekt asoslari", startDate: "12-Yan", endDate: "30-May", students: 62, completion: 61, atRisk: 6 },
  { id: "ml-26-2a", name: "ML-26-2A", course: "Production muhitida ML", startDate: "02-Fev", endDate: "30-Iyn", students: 86, completion: 42, atRisk: 3 },
  { id: "nlp-26", name: "NLP-26", course: "Tabiiy tilni qayta ishlash", startDate: "20-Yan", endDate: "15-May", students: 71, completion: 79, atRisk: 2 },
]

export const USERS: UserRecord[] = [
  { name: "Aziza Tursunova",    email: "aziza.t@airi.uz",    role: "Teacher",     status: "active",    learningStream: "ML/AI",    last: "2 daq",  tone: "b1", twoFa: false, mode: "offline" },
  { name: "Rustam Abdullaev",   email: "rustam.a@airi.uz",   role: "Super Admin", status: "active",    learningStream: "—",        last: "hozir",  tone: "b3", twoFa: true,  mode: "offline" },
  { name: "Kamola Ergasheva",   email: "kamola.e@airi.uz",   role: "Admin",       status: "active",    learningStream: "—",        last: "30 daq", tone: "b7", twoFa: true,  mode: "offline" },
  { name: "Diyora Karimova",    email: "diyora.k@stud.uz",   role: "Student",     status: "at-risk",   learningStream: "AI-26-1B", last: "3 kun",  tone: "b6", twoFa: true,  mode: "online"  },
  { name: "Sherzod Nazarov",    email: "sherzod.n@stud.uz",  role: "Student",     status: "active",    learningStream: "AI-26-1A", last: "1 soat", tone: "b2", twoFa: false, mode: "offline" },
  { name: "Otabek Rasulov",     email: "otabek.r@stud.uz",   role: "Student",     status: "active",    learningStream: "ML-26-2A", last: "5 daq",  tone: "b3", twoFa: true,  mode: "offline" },
  { name: "Madina Yusupova",    email: "madina.y@stud.uz",   role: "Student",     status: "active",    learningStream: "AI-26-1B", last: "20 daq", tone: "b5", twoFa: true,  mode: "online"  },
  { name: "Akmal Hudoyberdiyev",email: "akmal.h@airi.uz",    role: "Teacher",     status: "active",    learningStream: "DA",       last: "1 soat", tone: "b4", twoFa: false, mode: "offline" },
  { name: "Lola Saidova",       email: "lola.s@airi.uz",     role: "Reviewer",    status: "active",    learningStream: "—",        last: "2 soat", tone: "b8", twoFa: true,  mode: "offline" },
  { name: "Aziza Mahmudova",    email: "aziza.m@stud.uz",    role: "Student",     status: "completed", learningStream: "NLP-26",   last: "yo'q",   tone: "b8", twoFa: true,  mode: "online"  },
  { name: "Bobur Yuldashev",    email: "bobur.y@stud.uz",    role: "Student",     status: "active",    learningStream: "NLP-26",   last: "3 soat", tone: "b1", twoFa: false, mode: "offline" },
  { name: "Olim Karimov",       email: "olim.k@stud.uz",     role: "Student",     status: "inactive",  learningStream: "AI-26-1A", last: "21 kun", tone: "b2", twoFa: true,  mode: "online"  },
  { name: "Nilufar Komilova",   email: "nilufar.k@stud.uz",  role: "Student",     status: "active",    learningStream: "ML-26-2A", last: "10 daq", tone: "b7", twoFa: true,  mode: "offline" },
]

export const AUDIT_LOGS: AuditLog[] = [
  {
    id: "evt-2026-05-16-114208",
    ts: "16-May 11:42:08",
    actor: "R. Abdullaev",
    role: "Super Admin",
    action: "permission.grant",
    target: "Trener → grading.override",
    ip: "84.54.66.10",
    severity: "high",
    device: "MacBook Pro · Chrome 132",
    region: "Toshkent, O'zbekiston",
    payload: {
      before: { permissions: ["course.read", "grade.read"] },
      after: { permissions: ["course.read", "grade.read", "grading.override"] },
      reason: "Reviewer eskalatsiyasi uchun vaqtinchalik ruxsat berildi",
      approvedBy: ["super-admin#1"],
      aiInvolved: false,
    },
  },
  {
    id: "evt-2026-05-16-113814",
    ts: "16-May 11:38:14",
    actor: "A. Tursunova",
    role: "Trener",
    action: "grade.publish",
    target: "AI-26-1B / Lab 4 / 62 tinglovchi",
    ip: "84.54.66.10",
    severity: "medium",
    device: "Windows 11 · Edge 131",
    region: "Toshkent, O'zbekiston",
    payload: {
      before: { published: false, graded: 61 },
      after: { published: true, graded: 62 },
      reason: "Lab 4 baholari trener tomonidan tasdiqlandi",
      approvedBy: ["teacher#aziza"],
      aiInvolved: true,
    },
  },
  {
    id: "evt-2026-05-16-105501",
    ts: "16-May 10:55:01",
    actor: "system",
    role: "SI xizmati",
    action: "si.grade_suggest",
    target: "Lab 4 / paket=24",
    ip: "internal",
    severity: "info",
    device: "AIRI worker · eu-central",
    region: "Ichki servis",
    payload: {
      after: { batch: 24, confidenceAvg: 0.84, model: "v3.1" },
      reason: "Rubric bo'yicha baholash tavsiyasi generatsiya qilindi",
      approvedBy: [],
      aiInvolved: true,
    },
  },
  {
    id: "evt-2026-05-16-102133",
    ts: "16-May 10:21:33",
    actor: "L. Saidova",
    role: "Reviewer",
    action: "appeal.review",
    target: "Topshiriq #1284",
    ip: "94.158.45.2",
    severity: "low",
    device: "MacBook Air · Safari 18",
    region: "Samarqand, O'zbekiston",
    payload: {
      before: { appeal: "open" },
      after: { appeal: "reviewed" },
      reason: "Talaba apellyatsiyasi ko'rib chiqildi",
      approvedBy: ["reviewer#lola"],
      aiInvolved: false,
    },
  },
  {
    id: "evt-2026-05-16-094700",
    ts: "16-May 09:47:00",
    actor: "R. Abdullaev",
    role: "Super Admin",
    action: "policy.update",
    target: "Baholash siyosati v3.1",
    ip: "84.54.66.10",
    severity: "high",
    device: "MacBook Pro · Chrome 132",
    region: "Toshkent, O'zbekiston",
    payload: {
      before: { weights: { attendance: 0.1, quiz: 0.25 } },
      after: { weights: { attendance: 0.1, quiz: 0.2 } },
      reason: "Risk signallarini o'quv oqimi normasi bilan qayta moslash",
      approvedBy: ["super-admin#1"],
      aiInvolved: false,
    },
  },
  {
    id: "evt-2026-05-16-083022",
    ts: "16-May 08:30:22",
    actor: "system",
    role: "Cron",
    action: "certificate.issue",
    target: "NLP-25 / 14 tinglovchi",
    ip: "internal",
    severity: "info",
    device: "AIRI scheduler",
    region: "Ichki servis",
    payload: {
      after: { issued: 14, template: "NLP Track Premium" },
      reason: "Sertifikat berish qoidasi bajarildi",
      approvedBy: [],
      aiInvolved: false,
    },
  },
  {
    id: "evt-2026-05-16-071542",
    ts: "16-May 07:15:42",
    actor: "A. Hudoyberdiyev",
    role: "Trener",
    action: "attendance.bulk",
    target: "ML-26-2A / 16-May",
    ip: "213.230.92.4",
    severity: "low",
    device: "Windows 11 · Chrome 131",
    region: "Toshkent, O'zbekiston",
    payload: {
      before: { marked: 0 },
      after: { marked: 86 },
      reason: "Dars davomatini ommaviy kiritish",
      approvedBy: ["teacher#akmal"],
      aiInvolved: false,
    },
  },
  {
    id: "evt-2026-05-15-220411",
    ts: "15-May 22:04:11",
    actor: "system",
    role: "Security",
    action: "auth.suspicious",
    target: "olim.k@stud.uz / 4 failed",
    ip: "5.182.211.9",
    severity: "high",
    device: "Unknown · Chrome",
    region: "Noma'lum",
    payload: {
      after: { failedAttempts: 4, accountLocked: true },
      reason: "Ketma-ket muvaffaqiyatsiz login urinishlari",
      approvedBy: [],
      aiInvolved: false,
    },
  },
  {
    id: "evt-2026-05-15-193309",
    ts: "15-May 19:33:09",
    actor: "R. Abdullaev",
    role: "Super Admin",
    action: "role.update",
    target: "Reviewer ruxsatlari",
    ip: "84.54.66.10",
    severity: "medium",
    device: "MacBook Pro · Chrome 132",
    region: "Toshkent, O'zbekiston",
    payload: {
      before: { role: "Reviewer", canOverride: false },
      after: { role: "Reviewer", canOverride: true },
      reason: "Appeal jarayonida yakuniy xulosa berish uchun ruxsat yangilandi",
      approvedBy: ["super-admin#1"],
      aiInvolved: false,
    },
  },
]

export const QA: QAItem[] = [
  {
    id: "qa-101",
    student: STUDENTS[0],
    course: "Sun'iy intellekt asoslari",
    topic: "Lab 4 · overfittingni qanday tekshirish?",
    body: "Training loss tushyapti, validation loss esa qaytadan ko'tarilyapti. Buni overfitting deb olsam bo'ladimi?",
    state: "needs-reply",
    flagged: false,
    votes: 12,
    age: "1 soat",
  },
  {
    id: "qa-102",
    student: STUDENTS[1],
    course: "Production muhitida ML",
    topic: "Docker image hajmini qisqartirish",
    body: "Image 1.4 GB chiqyapti. Multi-stage build ishlatsam ham katta qolmoqda. Qaysi qatlamni tekshirgan ma'qul?",
    state: "needs-reply",
    flagged: false,
    votes: 9,
    age: "3 soat",
  },
  {
    id: "qa-103",
    student: STUDENTS[3],
    course: "Tabiiy tilni qayta ishlash",
    topic: "BPE va WordPiece farqi",
    body: "Ikkalasi ham token bo'laklashga o'xshaydi, lekin amaliy farqi qayerda ko'rinadi?",
    state: "answered",
    flagged: false,
    votes: 22,
    age: "1 kun",
  },
  {
    id: "qa-104",
    student: STUDENTS[6],
    course: "Sun'iy intellekt asoslari",
    topic: "Kursdan tashqari reklama xabari",
    body: "Men freelance buyurtma qabul qilaman, kimga kerak bo'lsa yozing.",
    state: "needs-reply",
    flagged: true,
    votes: 0,
    age: "2 soat",
  },
  {
    id: "qa-105",
    student: STUDENTS[4],
    course: "Production muhitida ML",
    topic: "Kubeflow yoki Airflow",
    body: "Production pipeline uchun qaysi birini tanlagan ma'qul, ML lifecycle uchun?",
    state: "needs-reply",
    flagged: false,
    votes: 6,
    age: "6 soat",
  },
]

export const ATTENDANCE_ROWS = STUDENTS.map((student, index) => ({
  id: `att-${index + 1}`,
  student,
  history: [3, 4, 4, 2, 4, index % 3 === 0 ? 1 : 4, 4, 3, 4, 4, index % 2 === 0 ? 2 : 4],
  status: index === 0 ? "absent" : index === 1 ? "late" : index === 2 ? "excused" : "present",
  note: index === 0 ? "2 darsdan beri qatnashmadi" : index === 1 ? "Transport kechikishi" : index === 2 ? "Tibbiy hujjat yuklangan" : "Faol qatnashmoqda",
}))

export const FINAL_GRADES = STUDENTS.map((student, index) => ({
  id: `fg-${index + 1}`,
  student,
  attendance: student.attendance,
  assignments: Math.max(60, student.gpa - 3),
  quizzes: Math.max(62, student.gpa - 1),
  finalProject: index === 0 ? 0 : Math.min(98, student.gpa + 2),
  finalScore: index === 0 ? 68 : Math.min(99, Math.round((student.gpa + student.progress) / 2)),
  approval: index < 2 ? "Ko'rib chiqilmoqda" : "Tasdiqlangan",
}))

export type CertStyle = "blue" | "gold" | "teal" | "navy" | "mono"
export type CertStatus = "active" | "draft" | "archived"

export type CertificateTemplate = {
  id: string
  name: string
  style: CertStyle
  signers: number
  fields: number
  issued: number
  status: CertStatus
  updated: string
}

export const CERTIFICATE_TEMPLATES: CertificateTemplate[] = [
  { id: "c1", name: "AIRI · AI Fundamentals (Standart)", style: "blue", signers: 2, fields: 7, issued: 248, status: "active",   updated: "12-May" },
  { id: "c2", name: "AIRI · NLP Track (Premium)",        style: "gold", signers: 3, fields: 9, issued: 64,  status: "active",   updated: "08-May" },
  { id: "c3", name: "AIRI · Self-paced (Compact)",       style: "teal", signers: 1, fields: 5, issued: 92,  status: "active",   updated: "02-May" },
  { id: "c4", name: "AIRI · ML in Production",           style: "navy", signers: 2, fields: 8, issued: 0,   status: "draft",    updated: "16-May" },
  { id: "c5", name: "AIRI · Pilot 2024 (eski)",          style: "mono", signers: 2, fields: 6, issued: 412, status: "archived", updated: "Dek-25" },
]

export type SurveyStatus = "active" | "draft" | "closed"
export type SurveyQuestionType = "rating" | "nps" | "mcq" | "checkbox" | "yn" | "text" | "long" | "scale"

export type SurveyQuestion = {
  type: SurveyQuestionType
  label: string
  answer?: string
  options?: string[]
  required: boolean
}

export type SurveyAudience = {
  target: string
  anonymous: boolean
  opensAt: string
  closesAt: string
  reminder: string
}

export type SurveyResultRow = {
  label: string
  value: number
}

export type SurveyComment = {
  author: string
  text: string
  sentiment: "positive" | "neutral" | "negative"
}

export type Survey = {
  id: string
  title: string
  target: string
  responses: number
  total: number
  status: SurveyStatus
  questionCount: number
  lastActivity: string
  nps: number
  rating: number
  sentiment: number
  completion: number
  questions: SurveyQuestion[]
  resultRows: SurveyResultRow[]
  comments: SurveyComment[]
  audience: SurveyAudience
}

export const SURVEY_QUESTION_TYPES: Array<{ value: SurveyQuestionType; icon: string; label: string }> = [
  { value: "rating", icon: "star", label: "Yulduzli baho" },
  { value: "nps", icon: "scale", label: "NPS (0-10)" },
  { value: "mcq", icon: "circle-dot", label: "Bitta tanlov" },
  { value: "checkbox", icon: "checkbox", label: "Ko'p tanlov" },
  { value: "yn", icon: "thumb-up", label: "Ha / Yo'q" },
  { value: "text", icon: "message", label: "Matn (qisqa)" },
  { value: "long", icon: "align-left", label: "Matn (uzun)" },
  { value: "scale", icon: "adjustments", label: "Slider 0-100" },
]

const AI_FUNDAMENTALS_SURVEY_QUESTIONS: SurveyQuestion[] = [
  { type: "rating", label: "1. Kursning umumiy sifatini qanday baholaysiz?", answer: "1-5 yulduz", required: true },
  { type: "nps", label: "2. Bu kursni do'stingizga tavsiya qilasizmi? (0-10)", answer: "NPS", required: true },
  {
    type: "mcq",
    label: "3. Sizga eng yoqqan modul qaysi edi?",
    options: ["Modul 1 - kirish", "Modul 2 - matematika", "Modul 3 - supervised learning", "Modul 4 - model evaluation"],
    required: false,
  },
  { type: "text", label: "4. Trainer haqida fikringiz (qisqacha)", answer: "Matn · 300 belgi gacha", required: false },
  {
    type: "checkbox",
    label: "5. Yana qaysi mavzularda chuqurlashtirgan bo'lardingiz?",
    options: ["Deep Learning", "MLOps va deployment", "Statistika", "Tashqi ma'lumot to'plash"],
    required: false,
  },
  { type: "yn", label: "6. Sertifikat berilgan formatda yetarli darajada qadrli deb hisoblaysizmi?", answer: "Ha / Yo'q", required: true },
]

const DEFAULT_SURVEY_RESULT_ROWS: SurveyResultRow[] = [
  { label: "5 - A'lo", value: 48 },
  { label: "4 - Yaxshi", value: 31 },
  { label: "3 - O'rtacha", value: 5 },
  { label: "2 - Qoniqarsiz", value: 1 },
  { label: "1 - Yomon", value: 1 },
]

const DEFAULT_SURVEY_COMMENTS: SurveyComment[] = [
  { author: "Aziza M.", text: "Trainer juda yaxshi tushuntirgan. Lab uchun real-world datasets ko'proq bo'lsa edi.", sentiment: "positive" },
  { author: "Sherzod N.", text: "Modullar tezligi yaxshi, lekin matematik tayanchni boshida ko'proq berish kerak.", sentiment: "neutral" },
  { author: "Bobur Y.", text: "AI grading feedback aniq edi. Sertifikat dizayni zo'r!", sentiment: "positive" },
  { author: "Diyora K.", text: "Topshiriqlar kichik buyurtmalardan kelsa qiziqroq bo'lardi.", sentiment: "neutral" },
]

export const SURVEYS: Survey[] = [
  {
    id: "s1",
    title: "Kurs yakuni baholash · AI Fundamentals",
    target: "O'quv oqimi B",
    responses: 86,
    total: 124,
    status: "active",
    questionCount: 12,
    lastActivity: "16-May",
    nps: 62,
    rating: 4.5,
    sentiment: 78,
    completion: 69,
    questions: AI_FUNDAMENTALS_SURVEY_QUESTIONS,
    resultRows: DEFAULT_SURVEY_RESULT_ROWS,
    comments: DEFAULT_SURVEY_COMMENTS,
    audience: {
      target: "O'quv oqimi B",
      anonymous: true,
      opensAt: "10-May 2026",
      closesAt: "30-May 2026 · 23:59",
      reminder: "Har 3 kun · maks 3 marta",
    },
  },
  {
    id: "s2",
    title: "Trainer NPS · Spring '26 mid-term",
    target: "Barcha o'quv oqimlari",
    responses: 412,
    total: 1842,
    status: "active",
    questionCount: 6,
    lastActivity: "15-May",
    nps: 58,
    rating: 4.3,
    sentiment: 74,
    completion: 22,
    questions: AI_FUNDAMENTALS_SURVEY_QUESTIONS.slice(0, 4),
    resultRows: [
      { label: "10-9 - Promouter", value: 252 },
      { label: "8-7 - Neytral", value: 108 },
      { label: "6-0 - Detractor", value: 52 },
    ],
    comments: DEFAULT_SURVEY_COMMENTS.slice(0, 3),
    audience: {
      target: "Barcha o'quv oqimlari",
      anonymous: true,
      opensAt: "12-May 2026",
      closesAt: "24-May 2026 · 23:59",
      reminder: "Har 2 kun · maks 2 marta",
    },
  },
  {
    id: "s3",
    title: "Onboarding tajriba",
    target: "Yangi talabalar",
    responses: 124,
    total: 142,
    status: "active",
    questionCount: 8,
    lastActivity: "14-May",
    nps: 71,
    rating: 4.7,
    sentiment: 84,
    completion: 87,
    questions: AI_FUNDAMENTALS_SURVEY_QUESTIONS.slice(0, 5),
    resultRows: DEFAULT_SURVEY_RESULT_ROWS,
    comments: DEFAULT_SURVEY_COMMENTS.slice(1),
    audience: {
      target: "Yangi talabalar",
      anonymous: true,
      opensAt: "08-May 2026",
      closesAt: "22-May 2026 · 23:59",
      reminder: "Har 3 kun · maks 3 marta",
    },
  },
  {
    id: "s4",
    title: "Capstone loyiha feedback",
    target: "ML-26-2A",
    responses: 0,
    total: 86,
    status: "draft",
    questionCount: 10,
    lastActivity: "16-May",
    nps: 0,
    rating: 0,
    sentiment: 0,
    completion: 0,
    questions: AI_FUNDAMENTALS_SURVEY_QUESTIONS.slice(0, 3),
    resultRows: [],
    comments: [],
    audience: {
      target: "ML-26-2A",
      anonymous: true,
      opensAt: "Rejalashtirilmagan",
      closesAt: "Rejalashtirilmagan",
      reminder: "O'chirilgan",
    },
  },
  {
    id: "s5",
    title: "Mohirdev dan o'tish so'rovi",
    target: "AI-26-1A",
    responses: 58,
    total: 62,
    status: "closed",
    questionCount: 5,
    lastActivity: "01-Apr",
    nps: 54,
    rating: 4.2,
    sentiment: 69,
    completion: 94,
    questions: AI_FUNDAMENTALS_SURVEY_QUESTIONS.slice(0, 4),
    resultRows: [
      { label: "Juda oson", value: 24 },
      { label: "Tushunarli", value: 21 },
      { label: "Qiyinroq", value: 9 },
      { label: "Yordam kerak", value: 4 },
    ],
    comments: DEFAULT_SURVEY_COMMENTS.slice(0, 2),
    audience: {
      target: "AI-26-1A",
      anonymous: true,
      opensAt: "15-Mar 2026",
      closesAt: "01-Apr 2026 · 23:59",
      reminder: "Har 4 kun · maks 2 marta",
    },
  },
]

export type AIGovSectionKey = "principles" | "grading" | "risk" | "plagiarism" | "audit" | "models" | "data"

export type AIGovNavSection = {
  key: AIGovSectionKey
  label: string
  icon: string
}

export type AIGovPrinciple = {
  title: string
  description: string
}

export type AIGovRubricRule = {
  id: string
  label: string
  enabled: boolean
  dangerous?: boolean
}

export type AIGovRiskSignal = {
  id: string
  label: string
  weight: number
  note: string
}

export type AIGovRiskTier = {
  label: string
  from: number
  to: number
  tone: "green" | "amber" | "red"
  description: string
}

export type AIGovPlagiarismRule = {
  id: string
  label: string
  threshold: string
  enabled: boolean
}

export type AIGovAuditRow = {
  time: string
  modelVersion: string
  operation: string
  object: string
  confidence: number | "-"
  status: "approved" | "pending" | "batch"
}

export type AIGovModelVersion = {
  version: string
  model: string
  status: "active" | "retired" | "archived"
  deployedAt: string
  biasAudit: "passed" | "partial"
  biasAuditLabel: string
  reports: string
}

export type AIGovDataPolicyRow = {
  label: string
  value: string
  tone?: "green" | "amber" | "red" | "blue" | "gray"
}

export const AI_GOV_NAV_SECTIONS: AIGovNavSection[] = [
  { key: "principles", label: "Tamoyillar va politika", icon: "scale" },
  { key: "grading", label: "AI grading sozlamalari", icon: "sparkles" },
  { key: "risk", label: "Risk skor modeli", icon: "alert-triangle" },
  { key: "plagiarism", label: "Plagiat va AI-yozma", icon: "fingerprint" },
  { key: "audit", label: "AI audit trail", icon: "history" },
  { key: "models", label: "Modellar va versiyalar", icon: "stack-2" },
  { key: "data", label: "Ma'lumot va PII", icon: "lock" },
]

export const AI_GOV_PRINCIPLES: AIGovPrinciple[] = [
  {
    title: "Transparency",
    description: "Har bir AI taklif uchun model, versiya, prompt va evidence saqlanadi. Talaba o'ziga ta'sir qilgan AI tahlilini ko'ra oladi.",
  },
  {
    title: "Human oversight",
    description: "AI hech qachon avtomatik baho qo'ymaydi. Final approval doimo teacher'da, appeal flow esa Reviewer'da.",
  },
  {
    title: "Fairness va bias audit",
    description: "Har choragda model natijalari guruh, til va platforma bo'yicha bias audit'ga olib chiqiladi.",
  },
  {
    title: "Risk = yordam signali, jazo emas",
    description: "Risk skor faqat tutor/teacher intervention'ni yoqish uchun ishlatiladi; ranking yoki disqualification uchun emas.",
  },
]

export const AI_GOV_GRADING_SETTINGS = {
  model: "claude-haiku-4.5 (managed)",
  version: "v3.1 · pinned",
  maxOutputTokens: 1024,
  confidenceThreshold: 0.78,
}

export const AI_GOV_RUBRIC_RULES: AIGovRubricRule[] = [
  { id: "rubric-only", label: "Faqat rubric kriteriyalariga asoslangan baho", enabled: true },
  { id: "evidence-quote", label: "Har bir kriteriya uchun evidence quote", enabled: true },
  { id: "free-form", label: "Free-form qo'shimcha izoh ruxsat etilgan", enabled: false },
  { id: "pii", label: "Talabaning shaxsiy ma'lumotlarini ishlatish", enabled: false, dangerous: true },
]

export const AI_GOV_SYSTEM_PROMPT = `You are an AI grading assistant for AIRI Training LMS.
ROLE: rubric-based reviewer · NOT final grader.
Always:
  - score strictly against the provided rubric criteria
  - cite the specific evidence (paragraph, code line) for each score
  - flag uncertainty if confidence < 0.78
  - respond in Uzbek (Latin script) unless instructed otherwise
Never:
  - adjust scores based on student name, group, or prior history
  - exceed the maximum points for a criterion
  - generate unverified accusations of plagiarism or AI-authorship
Output schema: { scores: [...], evidence: [...], feedback: "" }`

export const AI_GOV_RISK_SIGNALS: AIGovRiskSignal[] = [
  { id: "attendance", label: "Davomat", weight: 35, note: "haftalik attendance + qatnashish ulushi" },
  { id: "assignments", label: "Topshiriq", weight: 30, note: "kechikkan / topshirilmagan ulushi" },
  { id: "engagement", label: "VLE engagement", weight: 20, note: "platformaga kirish, video tugatish, materialni ochish" },
  { id: "quiz-trend", label: "Quiz natija trendi", weight: 15, note: "so'nggi 4 quizdagi pasayish" },
]

export const AI_GOV_RISK_TIERS: AIGovRiskTier[] = [
  { label: "Past", from: 0, to: 30, tone: "green", description: "Avtomatik harakat yo'q" },
  { label: "O'rta", from: 30, to: 60, tone: "amber", description: "Teacher panelida ko'rsatish" },
  { label: "Yuqori", from: 60, to: 100, tone: "red", description: "Intervention talab qilinadi" },
]

export const AI_GOV_PLAGIARISM_RULES: AIGovPlagiarismRule[] = [
  { id: "cosine", label: "O'quv oqimlararo cosine similarity", threshold: "0.86", enabled: true },
  { id: "authorship", label: "AI-authorship signal (style)", threshold: "0.72", enabled: true },
  { id: "external-quotes", label: "Tashqi manba quote ulushi", threshold: "20%", enabled: true },
  { id: "code-clone", label: "Code clone (token-based)", threshold: "0.78", enabled: true },
]

export const AI_GOV_AUDIT_ROWS: AIGovAuditRow[] = [
  { time: "11:55", modelVersion: "v3.1", operation: "grade.suggest", object: "Lab 4 · D. Karimova", confidence: 0.82, status: "pending" },
  { time: "11:48", modelVersion: "v3.1", operation: "grade.suggest", object: "Project · O. Rasulov", confidence: 0.91, status: "approved" },
  { time: "10:32", modelVersion: "v3.1", operation: "plagiarism.flag", object: "Hw 3 · S. Nazarov", confidence: 0.74, status: "pending" },
  { time: "10:21", modelVersion: "v3.1", operation: "feedback.draft", object: "QA · 4 ta savol", confidence: 0.88, status: "approved" },
  { time: "09:14", modelVersion: "v3.0", operation: "risk.compute", object: "O'quv oqimi AI-26-1B · 62", confidence: "-", status: "batch" },
]

export const AI_GOV_MODEL_VERSIONS: AIGovModelVersion[] = [
  { version: "v3.1", model: "claude-haiku-4.5", status: "active", deployedAt: "12-May 2026", biasAudit: "passed", biasAuditLabel: "o'tdi · 02-May", reports: "1,248 grading suggest · 96 risk batch" },
  { version: "v3.0", model: "claude-haiku-4.5", status: "retired", deployedAt: "04-Mar 2026", biasAudit: "passed", biasAuditLabel: "o'tdi", reports: "3,128 grading suggest" },
  { version: "v2.4", model: "gpt-4o-mini (legacy)", status: "archived", deployedAt: "18-Yan 2026", biasAudit: "partial", biasAuditLabel: "qisman", reports: "-" },
]

export const AI_GOV_DATA_POLICY_ROWS: AIGovDataPolicyRow[] = [
  { label: "Talabaning shaxsiy ma'lumoti modelga uzatiladi?", value: "Yo'q · majburiy", tone: "red" },
  { label: "Topshiriqlar AI training uchun ishlatiladimi?", value: "Yo'q", tone: "red" },
  { label: "AI session retention", value: "14 kun · auto-delete" },
  { label: "Region", value: "EU + Asia (data residency)" },
  { label: "PII redaction", value: "avtomatik · ism, telefon, email maskirovka qilinadi" },
]

export type ModerationKind = "qa" | "review" | "submission"

export type ModerationItem = {
  id: number
  kind: ModerationKind
  where: string
  author: string
  tone: Tone
  flag: string
  aiScore: number
  body: string
  age: string
}

export const FLAGGED_CONTENT: ModerationItem[] = [
  {
    id: 1,
    kind: "qa",
    where: "AI Fundamentals · Lab 4",
    author: "Bobur Y.",
    tone: "b1",
    flag: "AI spam",
    aiScore: 0.86,
    body: "Salom, men freelance buyurtma qabul qilaman, AI bilan loyihalar uchun kim qiziqsa...",
    age: "2 soat",
  },
  {
    id: 2,
    kind: "review",
    where: "Trainer review · A. Hudoyberdiyev",
    author: "Olim K.",
    tone: "b2",
    flag: "Insult",
    aiScore: 0.78,
    body: "Bu trainer juda ham...",
    age: "5 soat",
  },
  {
    id: 3,
    kind: "submission",
    where: "Lab 3 · D. Karimova",
    author: "Diyora K.",
    tone: "b6",
    flag: "AI-yozma signal",
    aiScore: 0.91,
    body: "Yuborilgan ish stilometriya analizida AI-generated probability 0.91. Bu inson tomonidan ko'rib chiqilishini talab qiladi.",
    age: "1 kun",
  },
  {
    id: 4,
    kind: "qa",
    where: "NLP · BPE thread",
    author: "Jasur T.",
    tone: "b4",
    flag: "Off-topic",
    aiScore: 0.62,
    body: "Bu kursni qachon yangilaysizlar? Boshqa platformada yangiroq versiya bor edi.",
    age: "12 soat",
  },
]
