export type CourseStatus = "active" | "draft" | "published" | "archived"
export type SessionKind = "lecture" | "lab" | "live" | "exam" | "office"
export type Severity = "info" | "low" | "medium" | "high"

export type Course = {
  id: string
  title: string
  track: string
  teacher: string
  learningStream: string
  format: string
  studentsTotal: number
  studentsActive: number
  progress: number
  modules: number
  lessons: number
  status: CourseStatus
  nextSession: string
  trend: number[]
}

export type Student = {
  name: string
  group: string
  risk: number
  progress: number
  attendance: number
  gpa: number
  late: number
  trend: "up" | "down" | "flat"
}

export type Submission = {
  id: string
  student: string
  course: string
  type: string
  title: string
  points: number
  maxPoints: number
  state: "needs-grade" | "ai-flag" | "auto-graded" | "appeal"
  aiScore: number
  confidence: number
  submittedAgo: string
  late: boolean
  files: string[]
}

export type Question = {
  id: string
  student: string
  course: string
  topic: string
  body: string
  state: "needs-reply" | "answered" | "flagged"
  votes: number
  age: string
}

export type ScheduleSession = {
  id: string
  day: string
  time: string
  course: string
  group: string
  room: string
  trainer: string
  kind: SessionKind
}

export type AuditLog = {
  id: string
  ts: string
  actor: string
  role: string
  action: string
  object: string
  ip: string
  severity: Severity
}

export const COURSES: Course[] = [
  {
    id: "ai-fund",
    title: "Sun’iy intellekt asoslari",
    track: "AI va ML",
    teacher: "Aziza Tursunova",
    learningStream: "AI-26-1B",
    format: "Aralash ta’lim",
    studentsTotal: 124,
    studentsActive: 118,
    progress: 64,
    modules: 9,
    lessons: 56,
    status: "published",
    nextSession: "Bugun, 14:00",
    trend: [38, 42, 49, 55, 58, 61, 64],
  },
  {
    id: "ml-prod",
    title: "ML tizimlarini ishlab chiqarishga chiqarish",
    track: "MLOps",
    teacher: "Akmal Hudoyberdiyev",
    learningStream: "ML-26-2A",
    format: "Amaliy laboratoriya",
    studentsTotal: 86,
    studentsActive: 81,
    progress: 41,
    modules: 7,
    lessons: 48,
    status: "published",
    nextSession: "Ertaga, 10:00",
    trend: [22, 26, 30, 33, 35, 38, 41],
  },
  {
    id: "nlp",
    title: "Tabiiy tilni qayta ishlash",
    track: "NLP",
    teacher: "Aziza Tursunova",
    learningStream: "NLP-26",
    format: "Jonli darslar",
    studentsTotal: 71,
    studentsActive: 68,
    progress: 78,
    modules: 8,
    lessons: 52,
    status: "published",
    nextSession: "Chorshanba, 16:00",
    trend: [58, 62, 66, 70, 72, 75, 78],
  },
  {
    id: "cv",
    title: "Kompyuter ko‘rish asoslari",
    track: "Computer Vision",
    teacher: "Lola Saidova",
    learningStream: "CV-26 Mustaqil",
    format: "Mustaqil o‘rganish",
    studentsTotal: 142,
    studentsActive: 110,
    progress: 28,
    modules: 6,
    lessons: 38,
    status: "draft",
    nextSession: "Juma, 11:00",
    trend: [12, 16, 19, 22, 24, 26, 28],
  },
]

export const STUDENTS: Student[] = [
  { name: "Diyora Karimova", group: "AI-26-1B", risk: 86, progress: 34, attendance: 62, gpa: 71, late: 3, trend: "down" },
  { name: "Sherzod Nazarov", group: "AI-26-1A", risk: 71, progress: 41, attendance: 70, gpa: 64, late: 2, trend: "down" },
  { name: "Madina Yusupova", group: "AI-26-1B", risk: 64, progress: 52, attendance: 78, gpa: 77, late: 1, trend: "flat" },
  { name: "Otabek Rasulov", group: "ML-26-2A", risk: 22, progress: 88, attendance: 96, gpa: 92, late: 0, trend: "up" },
  { name: "Nilufar Komilova", group: "ML-26-2A", risk: 14, progress: 91, attendance: 98, gpa: 94, late: 0, trend: "up" },
  { name: "Jasur Tojiev", group: "AI-26-1A", risk: 58, progress: 49, attendance: 82, gpa: 70, late: 1, trend: "flat" },
  { name: "Aziza Mahmudova", group: "NLP-26", risk: 8, progress: 96, attendance: 100, gpa: 96, late: 0, trend: "up" },
  { name: "Bobur Yuldashev", group: "NLP-26", risk: 41, progress: 64, attendance: 88, gpa: 78, late: 1, trend: "flat" },
]

export const SUBMISSIONS: Submission[] = [
  {
    id: "sub-1281",
    student: "Jasur Tojiev",
    course: "Sun’iy intellekt asoslari",
    type: "Laboratoriya",
    title: "Linear regression amaliyoti",
    points: 0,
    maxPoints: 40,
    state: "needs-grade",
    aiScore: 32,
    confidence: 86,
    submittedAgo: "2 soat oldin",
    late: false,
    files: ["lab4_solution.ipynb", "hisobot.pdf"],
  },
  {
    id: "sub-1282",
    student: "Otabek Rasulov",
    course: "ML tizimlarini ishlab chiqarishga chiqarish",
    type: "Loyiha",
    title: "Docker orqali model servis",
    points: 0,
    maxPoints: 100,
    state: "needs-grade",
    aiScore: 78,
    confidence: 91,
    submittedAgo: "5 soat oldin",
    late: false,
    files: ["Dockerfile", "hisobot.pdf", "demo.mp4"],
  },
  {
    id: "sub-1283",
    student: "Madina Yusupova",
    course: "Tabiiy tilni qayta ishlash",
    type: "Uy ishi",
    title: "Tokenizatsiya va BPE",
    points: 0,
    maxPoints: 30,
    state: "ai-flag",
    aiScore: 18,
    confidence: 67,
    submittedAgo: "9 soat oldin",
    late: true,
    files: ["hw3.ipynb"],
  },
  {
    id: "sub-1284",
    student: "Bobur Yuldashev",
    course: "Tabiiy tilni qayta ishlash",
    type: "Quiz",
    title: "Embeddinglar testi",
    points: 26,
    maxPoints: 30,
    state: "auto-graded",
    aiScore: 26,
    confidence: 96,
    submittedAgo: "1 kun oldin",
    late: false,
    files: ["quiz-export.json"],
  },
  {
    id: "sub-1285",
    student: "Diyora Karimova",
    course: "Sun’iy intellekt asoslari",
    type: "Apellyatsiya",
    title: "NumPy asoslari qayta ko‘rish",
    points: 0,
    maxPoints: 30,
    state: "appeal",
    aiScore: 28,
    confidence: 72,
    submittedAgo: "2 kun oldin",
    late: false,
    files: ["lab3.ipynb", "izoh.md"],
  },
]

export const QA: Question[] = [
  {
    id: "qa-1",
    student: "Diyora Karimova",
    course: "Sun’iy intellekt asoslari",
    topic: "Overfittingni qanday erta aniqlaymiz?",
    body: "Trening loss tushyapti, validation loss esa qaytadan ko‘tarilyapti. Modelni qayerda to‘xtatish kerak?",
    state: "needs-reply",
    votes: 12,
    age: "1 soat",
  },
  {
    id: "qa-2",
    student: "Sherzod Nazarov",
    course: "ML tizimlarini ishlab chiqarishga chiqarish",
    topic: "Docker image hajmini qisqartirish",
    body: "Multi-stage build qilsam ham image hajmi 1 GB dan katta chiqyapti. Qaysi qatlamlarni tekshirish kerak?",
    state: "needs-reply",
    votes: 9,
    age: "3 soat",
  },
  {
    id: "qa-3",
    student: "Otabek Rasulov",
    course: "Tabiiy tilni qayta ishlash",
    topic: "BPE va WordPiece farqi",
    body: "Ikkalasi ham token ajratadi, lekin model sifatiga ta’siri qayerda seziladi?",
    state: "answered",
    votes: 22,
    age: "1 kun",
  },
  {
    id: "qa-4",
    student: "Aziza Mahmudova",
    course: "Sun’iy intellekt asoslari",
    topic: "Kursdan tashqari reklama",
    body: "Forumda mavzuga aloqasiz pullik xizmat e’loni joylangan.",
    state: "flagged",
    votes: 0,
    age: "2 soat",
  },
]

export const SCHEDULE: ScheduleSession[] = [
  { id: "sch-1", day: "Dushanba", time: "09:00", course: "Sun’iy intellekt asoslari", group: "AI-26-1B", room: "B-204", trainer: "Aziza Tursunova", kind: "lecture" },
  { id: "sch-2", day: "Dushanba", time: "14:00", course: "Tabiiy tilni qayta ishlash", group: "NLP-26", room: "Online", trainer: "Aziza Tursunova", kind: "live" },
  { id: "sch-3", day: "Seshanba", time: "10:00", course: "ML tizimlarini ishlab chiqarishga chiqarish", group: "ML-26-2A", room: "A-101", trainer: "Akmal Hudoyberdiyev", kind: "lab" },
  { id: "sch-4", day: "Chorshanba", time: "09:00", course: "Sun’iy intellekt asoslari", group: "AI-26-1A", room: "B-204", trainer: "Aziza Tursunova", kind: "lecture" },
  { id: "sch-5", day: "Chorshanba", time: "16:00", course: "Ochiq maslahat soati", group: "Barcha oqimlar", room: "Online", trainer: "Aziza Tursunova", kind: "office" },
  { id: "sch-6", day: "Payshanba", time: "11:00", course: "Tabiiy tilni qayta ishlash", group: "NLP-26", room: "B-302", trainer: "Aziza Tursunova", kind: "lecture" },
  { id: "sch-7", day: "Juma", time: "15:00", course: "ML tizimlarini ishlab chiqarishga chiqarish", group: "ML-26-2A", room: "A-101", trainer: "Akmal Hudoyberdiyev", kind: "exam" },
]

export const AUDIT_LOGS: AuditLog[] = [
  { id: "log-1", ts: "16-May 11:42:08", actor: "R. Abdullaev", role: "Super Admin", action: "permission.grant", object: "Trenerga bahoni o‘zgartirish ruxsati", ip: "84.54.66.10", severity: "high" },
  { id: "log-2", ts: "16-May 11:38:14", actor: "A. Tursunova", role: "Trener", action: "grade.publish", object: "Lab 4, 62 tinglovchi", ip: "84.54.66.10", severity: "medium" },
  { id: "log-3", ts: "16-May 10:55:01", actor: "system", role: "SI xizmati", action: "si.grade_suggest", object: "Lab 4, 24 ish", ip: "internal", severity: "info" },
  { id: "log-4", ts: "16-May 09:47:00", actor: "R. Abdullaev", role: "Super Admin", action: "policy.update", object: "Baholash siyosati v3.1", ip: "84.54.66.10", severity: "high" },
  { id: "log-5", ts: "15-May 22:04:11", actor: "system", role: "Xavfsizlik", action: "auth.suspicious", object: "olim.k@stud.uz, 4 urinish", ip: "5.182.211.9", severity: "high" },
]

export const USERS = [
  { name: "Aziza Tursunova", email: "aziza.t@airi.uz", role: "Trener", status: "Faol", stream: "AI va NLP", last: "2 daqiqa oldin" },
  { name: "Rustam Abdullaev", email: "rustam.a@airi.uz", role: "Super Admin", status: "Faol", stream: "Boshqaruv", last: "Hozir" },
  { name: "Diyora Karimova", email: "diyora.k@stud.uz", role: "Tinglovchi", status: "Riskda", stream: "AI-26-1B", last: "3 kun oldin" },
  { name: "Sherzod Nazarov", email: "sherzod.n@stud.uz", role: "Tinglovchi", status: "Faol", stream: "AI-26-1A", last: "1 soat oldin" },
  { name: "Lola Saidova", email: "lola.s@airi.uz", role: "Reviewer", status: "Faol", stream: "Sifat nazorati", last: "2 soat oldin" },
]

export const LEARNING_STREAMS = [
  { name: "AI-26-1A", course: "Sun’iy intellekt asoslari", start: "12-Yan", end: "30-May", students: 62, completion: 68, risk: 4 },
  { name: "AI-26-1B", course: "Sun’iy intellekt asoslari", start: "12-Yan", end: "30-May", students: 62, completion: 61, risk: 6 },
  { name: "ML-26-2A", course: "ML tizimlarini ishlab chiqarishga chiqarish", start: "02-Fev", end: "30-Iyn", students: 86, completion: 42, risk: 3 },
  { name: "NLP-26", course: "Tabiiy tilni qayta ishlash", start: "20-Yan", end: "15-May", students: 71, completion: 79, risk: 2 },
]

export const CERTIFICATE_TEMPLATES = [
  { title: "AI Track Professional", status: "Faol", issued: 148, rule: "85% progress, yakuniy loyiha 80+ ball" },
  { title: "NLP Amaliyotchi", status: "Faol", issued: 64, rule: "Barcha modullar, Q&A ishtiroki, final 75+ ball" },
  { title: "MLOps Foundation", status: "Qoralama", issued: 0, rule: "Laboratoriyalar 90%, deploy imtihoni 80+ ball" },
]

export const SURVEYS = [
  { title: "Dars sifati haftalik bahosi", status: "Faol", responses: 312, nps: 62 },
  { title: "Trener feedback sikli", status: "Qoralama", responses: 0, nps: 0 },
  { title: "Yakuniy kurs tajribasi", status: "Yopilgan", responses: 184, nps: 71 },
]

export const FLAGGED_CONTENT = [
  { id: "mod-1", type: "Q&A", author: "Aziza Mahmudova", reason: "Mavzuga aloqasiz e’lon", age: "2 soat", severity: "medium" },
  { id: "mod-2", type: "Topshiriq izohi", author: "Sherzod Nazarov", reason: "Plagiat gumoni", age: "5 soat", severity: "high" },
  { id: "mod-3", type: "Forum javobi", author: "Diyora Karimova", reason: "Noaniq manba", age: "1 kun", severity: "low" },
]
