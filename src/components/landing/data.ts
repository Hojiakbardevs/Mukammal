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

export const benefits = [
  "AI vositalarini ta'lim va ilmiy izlanishlarda qo'llash bo'yicha amaliy ko'nikma",
  "O'quv materiallari, video yozuvlar va mustaqil ta'lim topshiriqlari",
  "Offline va online qatnashish formatlari",
  "Baholash, sertifikat va yakuniy tahliliy hisobot",
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

export const courseTracks: IconItem[] = [
  {
    icon: Sparkles,
    title: "Sun'iy intellektni qo'llash asoslari",
    description:
      "AI tushunchalari, prompt engineering, mas'uliyatli foydalanish va ta'lim jarayonidagi real ssenariylar.",
  },
  {
    icon: Binary,
    title: "Sun'iy intellekt, mashinaviy o'rganish va ma'lumotlar tahlili",
    description:
      "ML modellar, datasetlar, vizual tahlil, baholash metrikalari va amaliy laboratoriya ishlari.",
  },
  {
    icon: Eye,
    title: "Kompyuterli ko'rish",
    description:
      "Tasvirlarni qayta ishlash, obyekt aniqlash, klassifikatsiya va ilmiy-amaliy loyihalar.",
  },
  {
    icon: Languages,
    title: "Tabiiy tilni qayta ishlash",
    description:
      "Matn tahlili, chatbotlar, o'zbek tilidagi korpuslar va akademik yozuvda AI yordamchilari.",
  },
]

export const timeline = [
  {
    duration: "1 oy",
    title: "O'quv dasturlari va materiallar",
    description:
      "Kurs modullari, amaliy topshiriqlar, video kontent va metodik materiallar tayyorlanadi.",
  },
  {
    duration: "1 oy",
    title: "Tinglovchilar va jadval",
    description:
      "Ishtirokchilar shakllantiriladi, 3 guruh bo'yicha o'quv jadvali va qatnashish formati tasdiqlanadi.",
  },
  {
    duration: "3 oy",
    title: "Kurslar, baholash, sertifikat, hisobot",
    description:
      "O'quv mashg'ulotlari o'tkaziladi, bilimlar baholanadi, sertifikat beriladi va yakuniy hisobot tayyorlanadi.",
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
