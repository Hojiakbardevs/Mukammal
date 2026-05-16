/* shared fixture data for all pages */

const COURSES = [
  {
    id: "ai-fund",
    title: "AI Fundamentals",
    learningStream: "Spring '26 — O'quv oqimi B",
    format: "blended",
    studentsTotal: 124,
    studentsActive: 118,
    progress: 64,
    modules: 9,
    lessons: 56,
    color: "b1",
    nextSession: "Bug‘un · 14:00",
    trend: [38, 42, 49, 55, 58, 61, 64],
  },
  {
    id: "ml-prod",
    title: "ML in Production",
    learningStream: "Spring '26 — O'quv oqimi A",
    format: "learningStream",
    studentsTotal: 86,
    studentsActive: 81,
    progress: 41,
    modules: 7,
    lessons: 48,
    color: "b2",
    nextSession: "Ertaga · 10:00",
    trend: [22, 26, 30, 33, 35, 38, 41],
  },
  {
    id: "nlp",
    title: "Tabiiy tilni qayta ishlash (NLP)",
    learningStream: "Spring '26 — O'quv oqimi B",
    format: "learningStream",
    studentsTotal: 71,
    studentsActive: 68,
    progress: 78,
    modules: 8,
    lessons: 52,
    color: "b3",
    nextSession: "Chorshanba · 16:00",
    trend: [58, 62, 66, 70, 72, 75, 78],
  },
  {
    id: "cv",
    title: "Computer Vision asoslari",
    learningStream: "Self-paced · 2026",
    format: "self-paced",
    studentsTotal: 142,
    studentsActive: 110,
    progress: 28,
    modules: 6,
    lessons: 38,
    color: "b4",
    nextSession: "—",
    trend: [12, 16, 19, 22, 24, 26, 28],
  },
];

const STUDENTS = [
  { name: "Diyora Karimova",   group: "AI-26-1B", tone: "b6", risk: 86, progress: 34, attendance: 62, gpa: 71, late: 3,  trend: "down" },
  { name: "Sherzod Nazarov",   group: "AI-26-1A", tone: "b2", risk: 71, progress: 41, attendance: 70, gpa: 64, late: 2,  trend: "down" },
  { name: "Madina Yusupova",   group: "AI-26-1B", tone: "b5", risk: 64, progress: 52, attendance: 78, gpa: 77, late: 1,  trend: "flat" },
  { name: "Otabek Rasulov",    group: "ML-26-2A", tone: "b3", risk: 22, progress: 88, attendance: 96, gpa: 92, late: 0,  trend: "up" },
  { name: "Nilufar Komilova",  group: "ML-26-2A", tone: "b7", risk: 14, progress: 91, attendance: 98, gpa: 94, late: 0,  trend: "up" },
  { name: "Jasur Tojiev",      group: "AI-26-1A", tone: "b4", risk: 58, progress: 49, attendance: 82, gpa: 70, late: 1,  trend: "flat" },
  { name: "Aziza Mahmudova",   group: "NLP-26",   tone: "b8", risk: 8,  progress: 96, attendance: 100,gpa: 96, late: 0,  trend: "up" },
  { name: "Bobur Yuldashev",   group: "NLP-26",   tone: "b1", risk: 41, progress: 64, attendance: 88, gpa: 78, late: 1,  trend: "flat" },
];

const SUBMISSIONS = [
  { student: STUDENTS[5], course: "AI Fundamentals",  type: "assignment", title: "Lab 4 — Linear regression", points: "0 / 40", state: "needs-grade", ai: 32, submittedAgo: "2 soat",  late: false, files: ["lab4_solution.ipynb", "report.pdf"], rubric: 4 },
  { student: STUDENTS[3], course: "ML in Production", type: "project",    title: "Mid-term project — Deployment", points: "0 / 100", state: "needs-grade", ai: 78, submittedAgo: "5 soat",  late: false, files: ["dockerfile", "report.pdf", "demo.mp4"], rubric: 6 },
  { student: STUDENTS[2], course: "NLP",              type: "assignment", title: "Hw 3 — Tokenization & BPE", points: "0 / 30", state: "ai-flag",     ai: 18, submittedAgo: "9 soat",  late: true,  files: ["hw3.ipynb"], rubric: 3 },
  { student: STUDENTS[7], course: "NLP",              type: "quiz",       title: "Quiz 2 — Embeddings",     points: "26 / 30", state: "auto-graded", ai: null, submittedAgo: "1 kun",   late: false, files: [], rubric: 0 },
  { student: STUDENTS[1], course: "AI Fundamentals",  type: "assignment", title: "Lab 4 — Linear regression", points: "0 / 40", state: "needs-grade", ai: 22, submittedAgo: "11 soat", late: true,  files: ["lab4_v2.ipynb"], rubric: 4 },
  { student: STUDENTS[0], course: "AI Fundamentals",  type: "assignment", title: "Lab 3 — NumPy basics",   points: "0 / 30", state: "appeal",      ai: 28, submittedAgo: "2 kun",   late: false, files: ["lab3.ipynb", "notes.md"], rubric: 4 },
  { student: STUDENTS[6], course: "NLP",              type: "project",    title: "Term project — Sentiment analyzer", points: "0 / 100", state: "needs-grade", ai: 88, submittedAgo: "3 soat", late: false, files: ["repo.zip", "demo.mp4"], rubric: 6 },
];

const SCHEDULE = [
  { day: 0, slot: 0, course: "AI Fundamentals", group: "AI-26-1B", room: "B-204", trainer: "Aziza T.", kind: "lecture" },
  { day: 0, slot: 2, course: "NLP",             group: "NLP-26",   room: "Online", trainer: "Aziza T.", kind: "live" },
  { day: 1, slot: 1, course: "ML in Production",group: "ML-26-2A", room: "A-101", trainer: "Aziza T.", kind: "lab" },
  { day: 2, slot: 0, course: "AI Fundamentals", group: "AI-26-1A", room: "B-204", trainer: "Aziza T.", kind: "lecture" },
  { day: 2, slot: 3, course: "Office Hours",    group: "All",      room: "Online", trainer: "Aziza T.", kind: "hours" },
  { day: 3, slot: 1, course: "NLP",             group: "NLP-26",   room: "B-302", trainer: "Aziza T.", kind: "lecture" },
  { day: 4, slot: 2, course: "ML in Production",group: "ML-26-2A", room: "A-101", trainer: "Aziza T.", kind: "exam" },
];

const LEARNING_STREAMS = [
  { id: "ai-26-1a", name: "AI-26-1A",  course: "AI Fundamentals",  startDate: "12-Yan",  endDate: "30-May",  students: 62, completion: 68, atRisk: 4 },
  { id: "ai-26-1b", name: "AI-26-1B",  course: "AI Fundamentals",  startDate: "12-Yan",  endDate: "30-May",  students: 62, completion: 61, atRisk: 6 },
  { id: "ml-26-2a", name: "ML-26-2A",  course: "ML in Production", startDate: "02-Fev",  endDate: "30-Iyn",  students: 86, completion: 42, atRisk: 3 },
  { id: "nlp-26",   name: "NLP-26",    course: "NLP",              startDate: "20-Yan",  endDate: "15-May",  students: 71, completion: 79, atRisk: 2 },
];

const USERS = [
  { name: "Aziza Tursunova",  email: "aziza.t@airi.uz",     role: "Teacher",     status: "active",  learningStream: "ML/AI",     last: "2 daq",  tone: "b1" },
  { name: "Rustam Abdullaev", email: "rustam.a@airi.uz",    role: "Super Admin", status: "active",  learningStream: "—",         last: "hozir",  tone: "b3" },
  { name: "Diyora Karimova",  email: "diyora.k@stud.uz",    role: "Student",     status: "at-risk", learningStream: "AI-26-1B",  last: "3 kun",  tone: "b6" },
  { name: "Sherzod Nazarov",  email: "sherzod.n@stud.uz",   role: "Student",     status: "active",  learningStream: "AI-26-1A",  last: "1 soat", tone: "b2" },
  { name: "Otabek Rasulov",   email: "otabek.r@stud.uz",    role: "Student",     status: "active",  learningStream: "ML-26-2A",  last: "5 daq",  tone: "b3" },
  { name: "Madina Yusupova",  email: "madina.y@stud.uz",    role: "Student",     status: "active",  learningStream: "AI-26-1B",  last: "20 daq", tone: "b5" },
  { name: "Akmal Hudoyberdiyev", email: "akmal.h@airi.uz",  role: "Teacher",     status: "active",  learningStream: "DA",        last: "1 soat", tone: "b4" },
  { name: "Lola Saidova",     email: "lola.s@airi.uz",      role: "Reviewer",    status: "active",  learningStream: "—",         last: "2 soat", tone: "b8" },
  { name: "Aziza Mahmudova",  email: "aziza.m@stud.uz",     role: "Student",     status: "completed", learningStream: "NLP-26", last: "yo‘q",   tone: "b8" },
  { name: "Bobur Yuldashev",  email: "bobur.y@stud.uz",     role: "Student",     status: "active",  learningStream: "NLP-26",    last: "3 soat", tone: "b1" },
  { name: "Olim Karimov",     email: "olim.k@stud.uz",      role: "Student",     status: "inactive", learningStream: "AI-26-1A",  last: "21 kun", tone: "b2" },
  { name: "Nilufar Komilova", email: "nilufar.k@stud.uz",   role: "Student",     status: "active",  learningStream: "ML-26-2A",  last: "10 daq", tone: "b7" },
];

const AUDIT_LOGS = [
  { ts: "16-May 11:42:08", actor: "R. Abdullaev", role: "Super Admin", action: "permission.grant", target: "Teacher → grading.override", ip: "84.54.66.10", sev: "high" },
  { ts: "16-May 11:38:14", actor: "A. Tursunova", role: "Teacher",     action: "grade.publish",    target: "AI-Fund / Lab 4 / 62 students", ip: "84.54.66.10", sev: "med" },
  { ts: "16-May 10:55:01", actor: "system",       role: "AI Service",  action: "ai.gradesuggest",  target: "Lab 4 / batch=24", ip: "internal", sev: "info" },
  { ts: "16-May 10:21:33", actor: "L. Saidova",   role: "Reviewer",    action: "appeal.review",    target: "Submission #1284", ip: "94.158.45.2",  sev: "low" },
  { ts: "16-May 09:47:00", actor: "R. Abdullaev", role: "Super Admin", action: "policy.update",    target: "Grading policy v3.1", ip: "84.54.66.10", sev: "high" },
  { ts: "16-May 08:30:22", actor: "system",       role: "Cron",        action: "certificate.issue", target: "NLP-25 / 14 talaba", ip: "internal", sev: "info" },
  { ts: "16-May 07:15:42", actor: "A. Hudoyberdiyev", role: "Teacher", action: "attendance.bulk",  target: "ML-26-2A / 16-May", ip: "213.230.92.4", sev: "low" },
  { ts: "15-May 22:04:11", actor: "system",       role: "Security",    action: "auth.suspicious",  target: "olim.k@stud.uz / 4 failed", ip: "5.182.211.9", sev: "high" },
  { ts: "15-May 19:33:09", actor: "R. Abdullaev", role: "Super Admin", action: "role.update",      target: "Reviewer permissions", ip: "84.54.66.10", sev: "med" },
];

const QA = [
  { student: STUDENTS[0], course: "AI Fundamentals", topic: "Lab 4 — overfittingni qanday tekshirish?", body: "Trening loss tushyapti, lekin validation loss qaytadan ko‘tarilyapti. Bu overfitting bo‘ladimi?", state: "needs-reply", flagged: false, votes: 12, age: "1 soat" },
  { student: STUDENTS[1], course: "ML in Production",topic: "Docker imageni qisqartirish",            body: "Mening image-im 1.4 GB chiqyapti, multi-stage build qilsa ham. Maslahat bering.", state: "needs-reply", flagged: false, votes: 9, age: "3 soat" },
  { student: STUDENTS[3], course: "NLP",             topic: "BPE va WordPiece farqi",                  body: "Ikkalasi ham byte-pair-ga o‘xshaydi, lekin huggingface tokenizerda farqi bormi?", state: "answered",    flagged: false, votes: 22, age: "1 kun" },
  { student: STUDENTS[6], course: "AI Fundamentals", topic: "Spam: kursdan tashqari xizmat haqida",    body: "Salom, men freelance buyurtma qabul qilaman, kim qiziqsa…", state: "needs-reply",  flagged: true,  votes: 0, age: "2 soat" },
  { student: STUDENTS[4], course: "ML in Production",topic: "Kubeflow vs Airflow",                     body: "Production pipeline uchun qaysi birini tanlash kerak, ML lifecycle uchun?", state: "needs-reply", flagged: false, votes: 6, age: "6 soat" },
];

window.__DATA__ = {
  COURSES, STUDENTS, SUBMISSIONS, SCHEDULE, LEARNING_STREAMS, USERS, AUDIT_LOGS, QA,
};
