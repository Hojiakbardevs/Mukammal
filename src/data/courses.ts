export type Course = {
  id: string
  title: string
  stream: string
  progress: number
  nextLesson: string
  mentor: string
}

export const courses: Course[] = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    stream: "O'quv oqimi: AI-26",
    progress: 72,
    nextLesson: "Transformerlar va attention",
    mentor: "Aziza Tursunova",
  },
  {
    id: "nlp",
    title: "Tabiiy tilni qayta ishlash",
    stream: "O'quv oqimi: NLP-26",
    progress: 58,
    nextLesson: "Tokenizatsiya va embeddinglar",
    mentor: "Sardor Karimov",
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    stream: "O'quv oqimi: CV-26",
    progress: 41,
    nextLesson: "CNN arxitekturalari",
    mentor: "Malika Rahimova",
  },
]
