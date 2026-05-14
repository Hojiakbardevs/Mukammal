import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  Binary,
  BookOpenCheck,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileText,
  GraduationCap,
  Languages,
  Laptop,
  LibraryBig,
  Microscope,
  Network,
  Presentation,
  Route,
  Sparkles,
  Users,
  Video,
} from "lucide-react"

export type IconItem = {
  icon: LucideIcon
  title: string
  description: string
}

export type CourseTrackItem = IconItem & { slug: string }
export const benefits = [
  "Sunʼiy intellekt vositalarini taʼlim va ilmiy-tadqiqot jarayonida qoʻllash boʻyicha amaliy ko‘nikmalar",
  "Zamonaviy oʻqitish metodlari, keyslar, amaliy mashgʻulotlar va mustaqil topshiriqlar",
  "Oʻzbek tilidagi oʻquv materiallari, taqdimotlar, qoʻllanmalar va videoyozuvlar",
  "Toshkent shahrida auditoriya mashgʻulotlari hamda ayrim tinglovchilar uchun masofaviy qatnashish imkoniyati",
  "Dastlabki va yakuniy baholash orqali bilim va koʻnikmalarni aniq tahlil qilish",
  "Kurs yakunida sertifikat hamda dastur natijalari boʻyicha tahliliy hisobot",
]

export const goals: IconItem[] = [
  {
    icon: BrainCircuit,
    title: "AI savodxonlikni oshirish",
    description:
      "Professor-o'qituvchilarda sun'iy intellekt imkoniyatlari, cheklovlari va xavfsiz qo'llash madaniyatini shakllantirish.",
  },
  {
    icon: Laptop,
    title: "Raqamli ta'limni kuchaytirish",
    description:
      "O'quv jarayoniga AI yordamchi vositalari, avtomatlashtirilgan tahlil va interaktiv metodlarni joriy etish.",
  },
  {
    icon: Microscope,
    title: "Ilmiy-tadqiqot kompetensiyasi",
    description:
      "Ma'lumotlar bilan ishlash, eksperiment natijalarini tahlil qilish va ilmiy mahsuldorlikni oshirish.",
  },
]

export const courseTracks: CourseTrackItem[] = [
  {
    icon: Sparkles,
    slug: "ai-basics",
    title: "Sun'iy intellektni qo'llash asoslari",
    description:
      "AI tushunchalari, prompt engineering, mas'uliyatli foydalanish va ta'lim jarayonidagi real ssenariylar.",
  },
  {
    icon: Binary,
    slug: "ml-data",
    title: "Sun'iy intellekt, mashinaviy o'rganish va ma'lumotlar tahlili",
    description:
      "ML modellar, datasetlar, vizual tahlil, baholash metrikalari va amaliy laboratoriya ishlari.",
  },
  {
    icon: Eye,
    slug: "computer-vision",
    title: "Kompyuterli ko'rish",
    description:
      "Tasvirlarni qayta ishlash, obyekt aniqlash, klassifikatsiya va ilmiy-amaliy loyihalar.",
  },
  {
    icon: Languages,
    slug: "nlp",
    title: "Tabiiy tilni qayta ishlash",
    description:
      "Matn tahlili, chatbotlar, o'zbek tilidagi korpuslar va akademik yozuvda AI yordamchilari.",
  },
]

export const timeline = [
  {
    duration: "15 kun",
    title: "Sun'iy intellektni qo'llash asoslari",
    description:
      "Tinglovchilar AI tushunchalari, promptlar, mas'uliyatli foydalanish va ta'limdagi amaliy ssenariylarni o'rganadi.",
  },
  {
    duration: "Tanlov bosqichi",
    title: "Ixtisoslashuv yo'nalishini tanlash",
    description:
      "Birinchi bosqichdan keyin tinglovchi ML & Data Analysis, Computer Vision yoki NLP yo'nalishlaridan birini tanlaydi.",
  },
  {
    duration: "1 oy",
    title: "Tanlangan yo'nalish bo'yicha amaliy kurs",
    description:
      "Tanlangan yo'nalish bo'yicha chuqurlashtirilgan mashg'ulotlar, amaliy topshiriqlar va loyiha ishlari bajariladi.",
  },
]

export const learningProcess: IconItem[] = [
  {
    icon: Presentation,
    title: "Ma'ruza",
    description: "Nazariy asoslar, metodologiya va amaliy qo'llash holatlari.",
  },
  {
    icon: ClipboardCheck,
    title: "Amaliy mashg'ulot",
    description: "AI vositalari bilan laboratoriya ishlari va mini-loyihalar.",
  },
  {
    icon: LibraryBig,
    title: "Mustaqil ta'lim",
    description:
      "Yo'naltirilgan topshiriqlar, materiallar va nazorat savollari.",
  },
  {
    icon: Network,
    title: "Offline/online qatnashish",
    description:
      "Toshkentda oflayn yoki masofadan turib qatnashish imkoniyati.",
  },
  {
    icon: Video,
    title: "Video yozuvlar",
    description:
      "Mashg'ulot yozuvlari va qayta ko'rish uchun arxivlangan darslar.",
  },
  {
    icon: FileText,
    title: "O'quv materiallari",
    description:
      "Taqdimotlar, kod namunalar, metodik qo'llanmalar va checklistlar.",
  },
]

export const outcomes: IconItem[] = [
  {
    icon: GraduationCap,
    title: "Sertifikat",
    description:
      "Kurs yakunida baholashdan o'tgan tinglovchilarga malaka oshirish sertifikati taqdim etiladi.",
  },
  {
    icon: CheckCircle2,
    title: "Amaliy portfolio",
    description:
      "Har bir tinglovchi o'z faniga mos AI yechim, dars dizayni yoki tahliliy ish namunasi tayyorlaydi.",
  },
  {
    icon: BarChart3,
    title: "Tahliliy hisobot",
    description:
      "Natijalar, qatnashuv, baholash va tavsiyalar asosida yakuniy tahliliy hisobot shakllantiriladi.",
  },
]

export const stats = [
  { value: "60", label: "tinglovchi", icon: Users },
  { value: "3", label: "guruh", icon: Route },
  { value: "4", label: "yo'nalish", icon: BookOpenCheck },
  { value: "5 oy", label: "dastur muddati", icon: CalendarClock },
]

export const strategicGoal = {
  description:
    "Professor-o'qituvchilarda AI asosidagi yondashuv va vositalarni o'quv jarayonida qo'llash ko'nikmalarini shakllantirish.",
}

export const strategicItems = [
  {
    number: "01",
    title: "Dasturlar yaratish",
    description:
      "Xalqaro standartlar asosida o'quv dasturlarini ishlab chiqish.",
    accent: "border-l-violet-400",
  },
  {
    number: "02",
    title: "Tanlab olish",
    description: "Iqtidorli va salohiyatli kadrlar saralash.",
    accent: "border-l-amber-400",
  },
  {
    number: "03",
    title: "Amaliy mashg'ulotlar",
    description: "Real loyihalar ustida ishlash tizimi.",
    accent: "border-l-violet-400",
  },
  {
    number: "04",
    title: "Baholash",
    description: "Olingan bilimlarni test va loyihalar orqali tekshirish.",
    accent: "border-l-violet-400",
  },
]

export const faqs = [
  {
    question: "Dastur kimlar uchun mo'ljallangan?",
    answer:
      "O'zbekiston oliy ta'lim va ilmiy-tadqiqot muassasalarida faoliyat yuritayotgan professor-o'qituvchilar, ilmiy xodimlar va raqamli ta'lim bilan ishlayotgan mutaxassislar uchun.",
  },
  {
    question: "Mashg'ulotlarda online qatnashish mumkinmi?",
    answer:
      "Ha. Dastur offline va online qatnashish formatlarini qo'llab-quvvatlaydi. Jadval va format tinglovchilar guruhlari shakllangandan keyin aniqlashtiriladi.",
  },
  {
    question: "Kurs yakunida sertifikat beriladimi?",
    answer:
      "Ha. Kurs mashg'ulotlari, amaliy topshiriqlar va yakuniy baholash natijalariga ko'ra sertifikat taqdim etiladi.",
  },
  {
    question: "Qaysi yo'nalishni tanlashim kerak?",
    answer:
      "Arizada qiziqish sohangizni ko'rsatasiz. Tashkilotchilar sizning tajribangiz va maqsadingizga mos yo'nalish bo'yicha tavsiya beradi.",
  },
]
