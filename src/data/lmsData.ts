export type Tone = "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8"

export type CourseStatus = "published" | "draft" | "paused" | "archived"

export type Course = {
  id: string
  title: string
  learningStream: string
  format: "aralash" | "jonli" | "mustaqil"
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
  ts: string
  actor: string
  role: string
  action: string
  target: string
  ip: string
  severity: "high" | "medium" | "low" | "info"
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
    format: "aralash",
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
    format: "jonli",
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
    title: "Tabiiy tilni qayta ishlash",
    learningStream: "NLP-26 o'quv oqimi",
    format: "jonli",
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
    format: "mustaqil",
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
  { name: "Diyora Karimova", group: "AI-26-1B", tone: "b6", risk: 86, progress: 34, attendance: 62, gpa: 71, late: 3, trend: "down" },
  { name: "Sherzod Nazarov", group: "AI-26-1A", tone: "b2", risk: 71, progress: 41, attendance: 70, gpa: 64, late: 2, trend: "down" },
  { name: "Madina Yusupova", group: "AI-26-1B", tone: "b5", risk: 64, progress: 52, attendance: 78, gpa: 77, late: 1, trend: "flat" },
  { name: "Otabek Rasulov", group: "ML-26-2A", tone: "b3", risk: 22, progress: 88, attendance: 96, gpa: 92, late: 0, trend: "up" },
  { name: "Nilufar Komilova", group: "ML-26-2A", tone: "b7", risk: 14, progress: 91, attendance: 98, gpa: 94, late: 0, trend: "up" },
  { name: "Jasur Tojiev", group: "AI-26-1A", tone: "b4", risk: 58, progress: 49, attendance: 82, gpa: 70, late: 1, trend: "flat" },
  { name: "Aziza Mahmudova", group: "NLP-26", tone: "b8", risk: 8, progress: 96, attendance: 100, gpa: 96, late: 0, trend: "up" },
  { name: "Bobur Yuldashev", group: "NLP-26", tone: "b1", risk: 41, progress: 64, attendance: 88, gpa: 78, late: 1, trend: "flat" },
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
  { day: 0, slot: 0, course: "Sun'iy intellekt asoslari", group: "AI-26-1B", room: "B-204", trainer: "Aziza T.", kind: "lecture" },
  { day: 0, slot: 2, course: "Tabiiy tilni qayta ishlash", group: "NLP-26", room: "Online", trainer: "Aziza T.", kind: "live" },
  { day: 1, slot: 1, course: "Production muhitida ML", group: "ML-26-2A", room: "A-101", trainer: "Aziza T.", kind: "lab" },
  { day: 2, slot: 0, course: "Sun'iy intellekt asoslari", group: "AI-26-1A", room: "B-204", trainer: "Aziza T.", kind: "lecture" },
  { day: 2, slot: 3, course: "Ochiq maslahat vaqti", group: "Barcha o'quv oqimlari", room: "Online", trainer: "Aziza T.", kind: "hours" },
  { day: 3, slot: 1, course: "Tabiiy tilni qayta ishlash", group: "NLP-26", room: "B-302", trainer: "Aziza T.", kind: "lecture" },
  { day: 4, slot: 2, course: "Production muhitida ML", group: "ML-26-2A", room: "A-101", trainer: "Aziza T.", kind: "exam" },
]

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
  { ts: "16-May 11:42:08", actor: "R. Abdullaev", role: "Super Admin", action: "permission.grant", target: "Trener → grading.override", ip: "84.54.66.10", severity: "high" },
  { ts: "16-May 11:38:14", actor: "A. Tursunova", role: "Trener", action: "grade.publish", target: "AI-26-1B / Lab 4 / 62 tinglovchi", ip: "84.54.66.10", severity: "medium" },
  { ts: "16-May 10:55:01", actor: "system", role: "SI xizmati", action: "si.grade_suggest", target: "Lab 4 / paket=24", ip: "internal", severity: "info" },
  { ts: "16-May 10:21:33", actor: "L. Saidova", role: "Reviewer", action: "appeal.review", target: "Topshiriq #1284", ip: "94.158.45.2", severity: "low" },
  { ts: "16-May 09:47:00", actor: "R. Abdullaev", role: "Super Admin", action: "policy.update", target: "Baholash siyosati v3.1", ip: "84.54.66.10", severity: "high" },
  { ts: "16-May 08:30:22", actor: "system", role: "Cron", action: "certificate.issue", target: "NLP-25 / 14 tinglovchi", ip: "internal", severity: "info" },
  { ts: "16-May 07:15:42", actor: "A. Hudoyberdiyev", role: "Trener", action: "attendance.bulk", target: "ML-26-2A / 16-May", ip: "213.230.92.4", severity: "low" },
  { ts: "15-May 22:04:11", actor: "system", role: "Security", action: "auth.suspicious", target: "olim.k@stud.uz / 4 failed", ip: "5.182.211.9", severity: "high" },
  { ts: "15-May 19:33:09", actor: "R. Abdullaev", role: "Super Admin", action: "role.update", target: "Reviewer ruxsatlari", ip: "84.54.66.10", severity: "medium" },
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

export const SURVEYS = [
  { id: "sv-1", title: "NLP-26 modul yakuni", status: "active", responses: 58, nps: 62, completion: 82 },
  { id: "sv-2", title: "Trener feedback · AI-26-1B", status: "draft", responses: 0, nps: 0, completion: 0 },
  { id: "sv-3", title: "Platforma tajribasi · May", status: "closed", responses: 214, nps: 54, completion: 76 },
]

export const FLAGGED_CONTENT = [
  { id: "mod-1", type: "Q&A", author: "Aziza Mahmudova", reason: "Reklama ehtimoli", severity: "medium", age: "2 soat", action: "Ko'rib chiqish" },
  { id: "mod-2", type: "Izoh", author: "Olim Karimov", reason: "Haqoratli ohang", severity: "high", age: "5 soat", action: "Escalate" },
  { id: "mod-3", type: "Fayl", author: "Sherzod Nazarov", reason: "Plagiat signali", severity: "high", age: "1 kun", action: "Reviewerga berish" },
]
