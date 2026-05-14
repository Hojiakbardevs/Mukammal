export type ModuleRow = {
  id: number
  topic: string
  lecture: number   // 0 = "—"
  practical: number // 0 = "—"
  independent: number
}

export type SectionRow = {
  id: number
  topic: string
  contactHours: number
  independent: number
}

export type ToolRow = {
  id: number
  name: string
  usage: string
}

export type CourseDetail = {
  slug: string
  title: string
  subtitle: string
  accent: string
  totalHours: { lecture: number; practical: number; independent: number }
  modules?: ModuleRow[]
  tools?: ToolRow[]
  outcomes?: string[]
  assessments?: string[]
  lectureTopics?: SectionRow[]
  practicalTopics?: SectionRow[]
}

export const courseDetails: CourseDetail[] = [
  {
    slug: "ai-basics",
    title: "Sun'iy intellektni qo'llash asoslari",
    subtitle: "Malaka oshirish kursi — AI asoslari, prompt engineering, etika va ta'limdagi amaliy qo'llash.",
    accent: "#6366f1",
    totalHours: { lecture: 20, practical: 20, independent: 22 },
    modules: [
      {
        id: 1,
        topic:
          "Suniy intellektga kirish. SI tushunchasi va SI turlari, SI tarixi va zamonaviy trendlari, SIning fan va ta'limdagi o'rni.",
        lecture: 2,
        practical: 0,
        independent: 2,
      },
      {
        id: 2,
        topic:
          "O'zbekistonda raqamli transformatsiya va SI ahamiyati. \"Digital Uzbekistan–2030\" davlat strategiyasi, SI texnologiyalarini 2030-yilga qadar rivojlantirish strategiyasi, milliy iqtisodiyotdagi SI ahamiyati, fan va ta'limni rivojlantirish yo'nalishlari.",
        lecture: 2,
        practical: 0,
        independent: 2,
      },
      {
        id: 3,
        topic:
          "Klassik mashinaviy o'rganish. Nazorat ostida, nazoratsiz, rag'bat bilan o'rganish, chiziqli regressiya, logistik regressiya, qaror daraxtlari, klasterlash, baholash metrikalari haqida tushuncha.",
        lecture: 2,
        practical: 2,
        independent: 2,
      },
      {
        id: 4,
        topic:
          "Chuqur o'rganish. Neyron tarmoq arxitekturalari. Perseptron, aktivatsiya funksiyalari, konvolyutsion, rekurrent neyron tarmoqlari, to'g'ri va teskari tarqalish, Python dasturlash tili, PyTorch, TensorFlow haqida tushuncha.",
        lecture: 2,
        practical: 2,
        independent: 2,
      },
      {
        id: 5,
        topic:
          "Ma'lumotlarni tayyorlash. Ma'lumotlarni tozalash, ma'lumotlar sifati, katta ma'lumotlar bilan ishlash. Ma'lumotlarni sintezlash va kengaytirish.",
        lecture: 2,
        practical: 2,
        independent: 2,
      },
      {
        id: 6,
        topic:
          "Fundamental va generativ modellar. Katta til modellari, diffuzion modellar, multimodal modellar. Bilimlarni uzatish va modellarni qo'shimcha o'qitish usullari haqida tushuncha.",
        lecture: 2,
        practical: 2,
        independent: 2,
      },
      {
        id: 7,
        topic:
          "SIning amaliy qo'llanilishi. Ko'p takrorlanuvchi vazifalarni avtomatlashtirish. Ta'lim, fan, biznes, davlat boshqaruvida SI. ChatGPT, Copilot, Claude, SI amaliyotida qo'llash keyslari tahlili. Prompt muhandisligi.",
        lecture: 2,
        practical: 4,
        independent: 2,
      },
      {
        id: 8,
        topic:
          "Etikaviy va huquqiy jihatlar. SI etikasi. Shaxsiy ma'lumotlar konfidensialiligi. Modellarning shaffofligi va ularni talqin qilish. SI cheklovlari va risklari. SI etikaviy muammolari: diskriminatsiya, shaffoflik, hisobdorlik. SIni huquqiy tartibga solish, O'zbekistonda va jahonda.",
        lecture: 2,
        practical: 2,
        independent: 4,
      },
      {
        id: 9,
        topic:
          "SI bo'yicha o'quv kurslarini ishlab chiqish va ta'lim berish. O'quv dasturlarini ishlab chiqish, blended learning uslubiyoti, bilimlarni baholash. Ta'lim jarayonida qo'llash uchun ixtisoslashgan SI vositalari, shaxsiy assistentlar va agentlar, no-code platformalar.",
        lecture: 2,
        practical: 4,
        independent: 2,
      },
      {
        id: 10,
        topic:
          "SI loyihalarini qurish uslubiyoti. Loyiha texnik topshirig'ini ishlab chiqish. Modellarni qurish usullari. Loyihani ishga tushirish ketma-ketligi.",
        lecture: 2,
        practical: 2,
        independent: 2,
      },
    ],
    tools: [
      { id: 1, name: "ChatGPT", usage: "Matnni tahlil qilish, qayta ishlash" },
      { id: 2, name: "Muxlisa AI", usage: "O'zbek tilida matn va audio kontent generatsiyalash" },
      { id: 3, name: "Tilmoch", usage: "Matnni o'zbek tilidan boshqa tillarga va aksincha mashinaviy tarjima qilish" },
      { id: 4, name: "Tactiq", usage: "Suhbat va uchrashuv natijalarini transkriptsiyalash" },
      { id: 5, name: "GPTs", usage: "Turli vazifalar uchun ChatGPT ilovalari" },
      { id: 6, name: "Gamma.app", usage: "Taqdimot va hujjatlar generatsiyalash" },
      { id: 7, name: "Whimsical AI", usage: "Diagramma, grafik, sxemalar generatsiyalash" },
      { id: 8, name: "Leonardo AI", usage: "Tasvirlar va grafik dizayn namunalarini generatsiyalash" },
      { id: 9, name: "Canva Magic AI", usage: "Grafik kontent va taqdimotlar yaratishni avtomatlashtirish" },
      { id: 10, name: "Synthesia", usage: "Video va tovush sintez qilish" },
      { id: 11, name: "Heygen", usage: "Raqamli avatarlar va ularning videosini generatsiyalash" },
      { id: 12, name: "Eleven Labs", usage: "Audio kontent generatsiyalash va tahrirlash" },
      { id: 13, name: "Sora", usage: "Video generatsiyalash" },
      { id: 14, name: "Perplexity AI", usage: "Savollarga aktual ma'lumotlarni izlab topish asosida javob berish" },
      { id: 15, name: "NotebookLM", usage: "PDF hujjatlari va audio bilan ishlash" },
      { id: 16, name: "Power Drill", usage: "Excel, PDF, SQL, Web, matn ma'lumotlarini tahlil qilish" },
      { id: 17, name: "Otter AI", usage: "Onlayn va oflayn uchrashuvlar yozuvini tahlil qilish, matnli rezyumelar tuzish" },
    ],
    outcomes: [
      "SI asosiy konsepsiyalari, turlari va arxitekturalarini tushunish",
      "Ta'lim berish jarayonida SI vositalarini qo'llash imkoniyatlarini bilish",
      "O'zbekiston qonunchiligi va xalqaro standartlar, jumladan Yevropa Ittifoqining SI to'g'risidagi qonuni va YUNESKO tavsiyalari kontekstida SIdan foydalanishning etikaviy, ijtimoiy va huquqiy doiralarini anglash",
      "Kundalik vazifalarni avtomatlashtirish: hujjatlarni yozish, qisqacha mazmun bayon qilish, taqdimot tayyorlash, murojaatlarni tahlil qilish, ma'lumotlarni vizuallashtirish, illyustratsiya va infografikalar yaratish uchun ChatGPT, DeepSeek, Whimsical AI, Leonardo AI, Gamma.app va boshqa SI vositalaridan samarali foydalanish",
    ],
    assessments: [
      "SI va MO nazariy asoslari bo'yicha test sinovlaridan o'tkazish",
      "Keyslarni guruhlarda ko'rib chiqish: SIni qo'llash bilan bog'liq etikaviy dilemmani muhokama qilish va hal etish",
    ],
  },

  {
    slug: "ml-data",
    title: "Sun'iy intellekt, mashinaviy o'rganish va ma'lumotlar tahlili",
    subtitle: "ML modellar, Python, datasetlar, vizual tahlil, baholash metrikalari va amaliy laboratoriya ishlari.",
    accent: "#0ea5e9",
    totalHours: { lecture: 16, practical: 48, independent: 36 },
    modules: [
      {
        id: 1,
        topic:
          "Mashinaviy o'rganishning matematik asoslari. Chiziqli algebra, vektorlar, matritsalar, ehtimollar nazariyasi, matematik analiz, gradiyentlar, optimizatsiya usullari.",
        lecture: 2,
        practical: 2,
        independent: 2,
      },
      {
        id: 2,
        topic:
          "Python. Ma'lumotlar ilmi vazifalari uchun Python muhitida dasturlash asoslari. Muhitni sozlash: Anaconda, Jupyter, PyCharm, Colab. Python dasturlash tili sintaksisi asoslari, sharhlar, sikllar.",
        lecture: 0,
        practical: 2,
        independent: 2,
      },
      {
        id: 3,
        topic: "Python. Ma'lumot strukturalari. Ro'yxatlar, kortejlar, to'plamlar, lug'atlar.",
        lecture: 0,
        practical: 2,
        independent: 2,
      },
      {
        id: 4,
        topic: "Python. Funksiyalar, klasslar va obyektlar bilan ishlash.",
        lecture: 0,
        practical: 2,
        independent: 2,
      },
      {
        id: 5,
        topic: "Ma'lumotlarni tahlil qilish asoslari. Tezkor tahlil. NumPy kutubxonasi.",
        lecture: 0,
        practical: 2,
        independent: 2,
      },
      {
        id: 6,
        topic: "Ma'lumotlarni tahlil qilish asoslari. Jadvallar bilan ishlash. Pandas kutubxonasi.",
        lecture: 0,
        practical: 2,
        independent: 2,
      },
      {
        id: 7,
        topic: "Ma'lumotlarni vizuallashtirish. Matplotlib, Seaborn kutubxonalari.",
        lecture: 0,
        practical: 4,
        independent: 2,
      },
      {
        id: 8,
        topic:
          "Klassik mashinaviy o'rganish. Nazorat ostida o'rganish. Chiziqli va polinomial regressiya. MSE, R² baholash metrikalari.",
        lecture: 2,
        practical: 2,
        independent: 2,
      },
      {
        id: 9,
        topic:
          "Klassik mashinaviy o'rganish. Nazorat ostida o'rganish. Tasniflash. Logistik regressiya, k-yaqin qo'shni, qarorlar daraxti, tayanch vektorlar usuli. Modellar sifatini baholash metrikalari: tasniflash aniqligi, tasdiqlash aniqligi, to'g'ri topish aniqligi.",
        lecture: 2,
        practical: 4,
        independent: 2,
      },
      {
        id: 10,
        topic: "Klassik mashinaviy o'rganish. Nazoratsiz o'rganish. Klasterlash: K-Means, iyerarxik klasterlash.",
        lecture: 0,
        practical: 2,
        independent: 2,
      },
      {
        id: 11,
        topic:
          "Ma'lumotlarni tayyorlash va belgilar bilan ishlash. Ma'lumotlarni tozalash, tushirib qoldirilgan qiymatlarni qayta ishlash, kategorial belgilarni kodlash, feature engineering, miqyoslash, oshiqcha o'qitish bilan kurash, regularizatsiya.",
        lecture: 0,
        practical: 4,
        independent: 2,
      },
      {
        id: 12,
        topic:
          "Chuqur o'rganish. Neyron tarmoq arxitekturalari. Perseptron, ko'p qatlamli perseptron, aktivatsiya funksiyalari: ReLU, Softmax. O'rganish bosqichlari: to'g'ri va teskari tarqalish. Chuqur o'rganish masalalari uchun PyTorch, TensorFlow. Ma'lumotlarni sintezlash va kengaytirish.",
        lecture: 2,
        practical: 4,
        independent: 2,
      },
      {
        id: 13,
        topic: "Konvolyutsion neyron tarmoqlar. Arxitekturasi, qatlamlari, tasvirlarni tasniflash uchun qo'llash.",
        lecture: 2,
        practical: 2,
        independent: 2,
      },
      {
        id: 14,
        topic: "Rekurrent neyron tarmoqlar. Ma'lumotlar ketma-ketligi bilan ishlash. LSTM, GRU.",
        lecture: 0,
        practical: 2,
        independent: 2,
      },
      {
        id: 15,
        topic:
          "Tabiiy tilni qayta ishlash. Matnni vektorlashtirish: BoW, TF-IDF, so'zlarni vektor ko'rinishida tasvirlash: Word2Vec.",
        lecture: 2,
        practical: 4,
        independent: 2,
      },
      {
        id: 16,
        topic:
          "Zamonaviy arxitekturalar. Transformerlar. E'tibor mexanizmi. BERT modellari va ularning NLP uchun qo'llanilishi.",
        lecture: 2,
        practical: 4,
        independent: 2,
      },
      {
        id: 17,
        topic:
          "Yakuniy loyiha va muhokama. Ma'lumotlarni tahlil qilish yoki SIni ta'lim jarayonida qo'llash. SIga oid mavzuda o'quv materiallari yaratish bo'yicha mini-loyiha ishlab chiqish. Fikr-mulohaza va g'oyalar muhokamasi.",
        lecture: 2,
        practical: 4,
        independent: 4,
      },
    ],
  },

  {
    slug: "computer-vision",
    title: "Kompyuterli ko'rish",
    subtitle: "Tasvirlarni qayta ishlash, obyekt aniqlash, klassifikatsiya va ilmiy-amaliy loyihalar.",
    accent: "#10b981",
    totalHours: { lecture: 24, practical: 36, independent: 30 },
    modules: [
      {
        id: 1,
        topic: "Tasvirlarni qayta ishlash. Pillow kutubxonasi. Asosiy va kengaytirilgan amallar.",
        lecture: 2,
        practical: 2,
        independent: 2,
      },
      {
        id: 2,
        topic:
          "Kompyuterli ko'rish. OpenCV kutubxonasi. Chizmachilik. Tasvirlarni qayta ishlash. Tasvirlarning kengaytirilgan tahlili. Ilovalar va loyihalar.",
        lecture: 10,
        practical: 16,
        independent: 10,
      },
      {
        id: 3,
        topic:
          "Kompyuterli ko'rish. PyTorch. Kompyuterli ko'rish uchun chuqur o'rganish modellarini qo'llash.",
        lecture: 10,
        practical: 14,
        independent: 10,
      },
      {
        id: 4,
        topic:
          "Yakuniy loyiha va muhokama. Kompyuterli ko'rish bo'yicha mini-loyiha ishlab chiqish. Fikr-mulohaza va g'oyalar muhokamasi.",
        lecture: 2,
        practical: 4,
        independent: 8,
      },
    ],
  },

  {
    slug: "nlp",
    title: "Tabiiy tilni qayta ishlash (NLP)",
    subtitle: "Matn tahlili, vektorlashtirish, neyron arxitekturalar, transformerlar va agentlar.",
    accent: "#f59e0b",
    totalHours: { lecture: 32, practical: 40, independent: 92 },
    lectureTopics: [
      { id: 1, topic: "NLP asoslari va matnni qayta ishlash texnologiyalari. NLPga kirish, tarixi va hissiyotlar tahlili. Matnga dastlabki ishlov berish usullari: tokenizatsiya, normalizatsiya, stop words, stemming va lemmatizatsiya. Matn xususiyatlarini aniqlash nazariyasi: BoW va TF-IDF usullari. NLPning asosiy vazifalari va ilovalari.", contactHours: 2, independent: 2 },
      { id: 2, topic: "Klassik usullar bilan matnlarni tasniflash, klassifikator modellarni baholash va NLPdagi etika. Logistik regressiyani sentiment tahlilida qo'llash. Naive Bayes nazariyasi va uning kengaytirilgan usullari. NLPda modellarni baholash metrikalari: tasniflash aniqligi, tasdiqlash aniqligi, to'g'ri topish aniqligi, F1-baho. NLPda odillik, hisobdorlik va shaffoflik.", contactHours: 2, independent: 2 },
      { id: 3, topic: "Vektor fazo modellari, semantik munosabatlar va ularni vizualizatsiya qilish. So'z embeddinglari tushunchasi: taqsimotga asoslangan gipoteza va zich vektorlar. Vektorlararo o'xshashlikni o'lchash: kosinus o'xshashlik nazariyasi. So'z analogiyalari va semantik munosabatlar tushunchasi. PCA usuli yordamida yuqori o'lchamli embeddinglarni vizualizatsiya qilish nazariyasi.", contactHours: 2, independent: 2 },
      { id: 4, topic: "Masofaga asoslangan qidiruv va imlo tuzatish usullari. Samarali o'xshashlik qidiruvi nazariyasi va qidiruvni tezlashtirish usullari: KNN, LSH. Imlo xatolarini tuzatish uchun Noisy channel modeli. Minimal tahrir masofasi va dinamik dasturlash. Avtomatik tuzatish tizimlarining arxitekturasi va komponentlari.", contactHours: 2, independent: 2 },
      { id: 5, topic: "Ehtimollik modellari: N-grammalar va so'z turkumlarini teglash. Tillarni modellashtirish vazifasi, N-grammalar tushunchasi va matnni avtomatik to'ldirish nazariyasi. Modelni baholash uchun Perplexity metrikasi va modelni takomillashtirish uchun smoothing usullari. So'z turkumlarini aniqlash va Markov zanjirlari. Yashirin Markov modellari va Viterbi algoritmi.", contactHours: 2, independent: 2 },
      { id: 6, topic: "Neyron tarmoqlarga asoslangan so'z embeddinglari: Word2Vec CBOW. Neyron embeddinglarga ehtiyoj va ularning xususiyatlari. CBOW modeli arxitekturasi. Neyron tarmoqni o'qitish asoslari: yo'qotish funksiyasi, to'g'ri va teskari tarqalish. CBOW modelini o'qitish jarayoni va embedding sifatini baholash usullari.", contactHours: 2, independent: 2 },
      { id: 7, topic: "Rekurrent neyron tarmoqlar. N-gramma modellaridan neyron til modellariga o'tish. RNN konsepsiyasi: ketma-ket xotira uchun yashirin holat. RNN arxitekturasi va uning vaqt bo'ylab yoyilishi. RNNlarni tillarni modellashtirish va matnni tasniflashda qo'llash.", contactHours: 2, independent: 2 },
      { id: 8, topic: "Ilgor RNN arxitekturalari: GRU va LSTM. RNNlarda axborot oqimini yaxshilovchi GRU. Yo'qolib boruvchi gradiyent muammosi va unga yechim sifatida LSTM. LSTMning asosiy komponentlari: xotira kataklari holati va darvozalar. GRU va LSTM arxitekturalarini taqqoslash.", contactHours: 2, independent: 2 },
      { id: 9, topic: "RNN yoki LSTM yordamida matn yaratish va ikki tomonlama modellar. RNN/LSTM yordamida matn yaratish g'oyasi va arxitekturasi. Temperature Sampling yordamida ijodkorlikni boshqarish. RNN cheklovlari: yo'qolib boruvchi va portlovchi gradiyent muammolari. Ikki tomonlama RNNlar yordamida kontekstni kengaytirish.", contactHours: 2, independent: 2 },
      { id: 10, topic: "Nomlangan obyektlarni tanib olish NER tizimini yaratish. NER vazifasi, umumiy obyektlar turlari va kodlash sxemalari: IOB, BIOES. LSTM asosidagi NER tizimlarining arxitekturasi. Kontekstni yaxshilash uchun ikki tomonlama LSTMdan foydalanish. NER modelining samaradorligini baholash.", contactHours: 2, independent: 2 },
      { id: 11, topic: "Neyron mashina tarjimasi: Seq2Seq va Attention mexanizmi. Enkoder-Dekoder arxitekturasi va uning information bottleneck muammosi. Attention mexanizmi: Dekoderga orqaga qarash imkonini berish. Attention hisoblash jarayoni: so'rovlar, kalitlar, qiymatlar. Mashina tarjimasini BLEU metrikasi bilan baholash.", contactHours: 2, independent: 2 },
      { id: 12, topic: "Transformer arxitekturasi va matnni umumlashtirish. Rekurrentlikdan voz kechish: Self-Attention bilan parallellashtirish. Transformerning asosiy komponentlari: Multi-Head Attention va Positional Encodings. Transformer arxitekturasini abstrakt matnni umumlashtirishda qo'llash. Umumlashtirish natijalarini ROUGE metrikasi bilan baholash.", contactHours: 2, independent: 2 },
      { id: 13, topic: "Transfer Learning va oldindan o'qitilgan modellar: BERT, T5. Transfer Learning paradigmasi: Pre-training va Fine-tuning. BERT modeli. T5 Text-to-Text Transfer Transformer. Hugging Face ekotizimi va uning ahamiyati.", contactHours: 2, independent: 2 },
      { id: 14, topic: "RAG va vektor ma'lumotlar bazalari. LLM cheklovlari va RAG yondashuvi. RAG jarayoni: tashqi manbalardan ma'lumot qidirish va javob yaratish. Zamonaviy qidiruvda vektor embeddinglarning o'rni. Vektor ma'lumotlar bazalari: Pinecone, Weaviate va ularning RAG tizimlaridagi roli.", contactHours: 2, independent: 2 },
      { id: 15, topic: "Sun'iy intellekt agentlarini yaratish. Agent tizimlari: ReAct namunasi. LLM imkoniyatlarini kengaytirish: funksiyalarni chaqirish va vositalardan foydalanish. Tashqi APIlar bilan ishlaydigan agentlar arxitekturasi va NLP modellarini API sifatida joylashtirish. LangChain va agentlik tizimlari arxitekturasi.", contactHours: 2, independent: 2 },
      { id: 16, topic: "NLP amaliyotida ML amaliyotlari. Modelni ishlab chiqarishga uzatish bosqichlari. API yaratish va dockerlashtirish. Model monitoringi va versiyalash. CI/CD paylaynlari.", contactHours: 2, independent: 2 },
    ],
    practicalTopics: [
      { id: 1, topic: "Matnga ishlov berish konveyerini — paylaynini yaratish. Jupyter Notebook va Python kutubxonalarini NLTK, spaCy sozlash. Matnni tokenlarga, gaplarga ajratish va tinish belgilarini olib tashlash. Stop-wordlarni filtrlash va stemming hamda lemmatizatsiya amaliyoti. BoW va TF-IDF vektorlarini scikit-learn yordamida yaratish.", contactHours: 2, independent: 2 },
      { id: 2, topic: "Klassik ML modellaridan foydalanib hissiyotlar tahlilini amalga oshirish. Ma'lumotlar to'plamini tayyorlash, o'quv va sinov qismlariga ajratish. Scikit-learn yordamida logistik regressiya modelini o'qitish. Scikit-learn yordamida Naive Bayes modelini o'qitish. Modellarni baholash: xatoliklar matritsasini chizish, tasniflash, tasdiqlash va to'g'ri topish aniqliklari, F1-baho ko'rsatkichlarini hisoblash.", contactHours: 2, independent: 2 },
      { id: 3, topic: "So'z embeddinglari bilan ishlash amaliyoti. Oldindan o'qitilgan GloVe yoki Word2Vec embeddinglarini yuklash. So'zlar o'rtasidagi kosinus o'xshashligini hisoblash orqali eng o'xshash so'zlarni topish. Vektor arifmetikasi yordamida so'z analogiyalarini yechish. Matplotlib, Seaborn kutubxonalari va PCA algoritmi yordamida embeddinglarni ikki o'lchamli fazoda vizualizatsiya qilish.", contactHours: 2, independent: 2 },
      { id: 4, topic: "Imlo xatolarini tekshirish va qidiruv tizimini yaratish. Levenshteyn masofasi algoritmini implementatsiya qilish va nomzod so'zlarni topish. Ehtimollikka asoslangan Noisy Channel imlo tuzatish modelini yaratish. Hujjatlar to'plami uchun LSH indeksini qurish. LSH va oddiy qidiruv tezligini katta hajmdagi ma'lumotlarda taqqoslash.", contactHours: 2, independent: 2 },
      { id: 5, topic: "Autocomplete tizimi va so'z turkumini teglash dasturini yaratish. Matn korpusidan N-gramma (bigramma va trigramma) ehtimolliklarini hisoblash. Keyingi so'zni bashorat qiluvchi autocomplete prototipini yaratish. Yashirin Markov modellari parametrlarini hisoblash. Viterbi algoritmi yordamida so'z turkumlarini teglash dasturini yozish.", contactHours: 2, independent: 2 },
      { id: 6, topic: "Maxsus korpus uchun Word2Vec modelini noldan o'qitish. O'zbek tilida maxsus korpus yig'ish va tozalash. Gensim kutubxonasi yordamida CBOW arxitekturasini sozlash. Modelni o'qitish va hosil bo'lgan embeddinglar sifatini tekshirish. Modelni saqlash va vizualizatsiya vositasida TensorBoard ko'rish.", contactHours: 2, independent: 2 },
      { id: 7, topic: "Matnlarni tasniflash uchun RNN tarmog'ini qurish. Matnlarni ketma-ketliklarga o'girish va padding qilish. Keras yoki PyTorch yordamida SimpleRNN qatlamli model qurish. Modelni o'qitish va natijalarini grafikda tahlil qilish. Model bashoratlarini sinov ma'lumotlarida tekshirish.", contactHours: 2, independent: 2 },
      { id: 8, topic: "GRU va LSTM modellarini taqqoslash. LSTM arxitekturasiga ega tasniflash modelini qurish. GRU arxitekturasiga ega tasniflash modelini qurish. Ikkala modelni bir xil vazifada o'qitish va samaradorligini taqqoslash. Uzun matnlarda yo'qolib boruvchi gradiyent ta'sirini amaliy tahlil qilish.", contactHours: 2, independent: 2 },
      { id: 9, topic: "LSTM va Bi-LSTM modellarni matn generatsiya qilishda sinab ko'rish. LSTM yordamida badiiy asar uslubida matn generatsiya qiluvchi modelni o'qitish. Generatsiya jarayonida temperatura parametrini o'zgartirib, natijani kuzatish. Bi-LSTM (ikki tomonlama LSTM) qatlamini qo'shib, kontekstni o'rganish samaradorligini oshirish. Oddiy va ikki tomonlama modellar natijalarini solishtirish.", contactHours: 2, independent: 2 },
      { id: 10, topic: "Nomlangan obyektlarni tanib olish tizimini yaratish. NER ma'lumotlar to'plamini tayyorlash va kodlash. Embedding va Bi-LSTM qatlamlari yordamida model arxitekturasini qurish. TimeDistributed qatlami orqali har bir token uchun sinfni bashorat qilish. Matndagi shaxslar, joylar va tashkilotlarni ajratib oluvchi tizimni ishga tushirish.", contactHours: 2, independent: 2 },
      { id: 11, topic: "Attention mexanizmli neyro-tarjimon. O'zbekcha-inglizcha parallel korpus tayyorlash. Enkoder LSTM va Dekoder LSTM qismlaridan iborat Seq2Seq modelini qurish. Keras va PyTorch kutubxonalaridan foydalanib, Attention qatlami yordamida Attention mexanizmini modelga qo'shish. Modelni o'qitish va sodda gaplarni tarjima qilib, BLEU metrikasi bilan baholash.", contactHours: 2, independent: 2 },
      { id: 12, topic: "Transformer arxitekturasi yordamida matnlardan xulosalar chiqarish. Matn va uning qisqa mazmuni juftliklaridan iborat ma'lumotlar to'plamini tayyorlash. TensorFlow yoki PyTorch kutubxonalari yordamida transformerning Enkoder-Dekoder arxitekturasini qurish. Self-Attention va Positional Encoding qatlamlarini implementatsiya qilish. Modelni o'qitish va yangi matnlar uchun qisqa mazmun generatsiya qilish.", contactHours: 2, independent: 2 },
      { id: 13, topic: "Hugging Face bilan nozik sozlash amaliyoti. Hugging Face transformers va datasets kutubxonalarini o'rnatish va tanishish. Oldindan o'qitilgan BERT modelini sentiment tahlili vazifasi uchun nozik sozlash. Trainer API yordamida o'qitish jarayonini soddalashtirish. Nozik sozlangan modelni baholash va uni paylayn yordamida ishlatish.", contactHours: 2, independent: 2 },
      { id: 14, topic: "Sodda RAG tizimini qurish. Bir nechta hujjatdan iborat bilimlar bazasini yaratish. FAISS yoki ChromaDB kabi vektor ma'lumotlar bazasini o'rnatish va hujjatlarni embedding qilib indekslash. Foydalanuvchi so'roviga eng mos hujjat qismini vektor qidiruvi orqali topish. Topilgan kontekstni LLM so'roviga qo'shib, savolga javob generatsiya qilish.", contactHours: 2, independent: 2 },
      { id: 15, topic: "LangChain yordamida Sun'iy intellekt AI agentini yaratish. LangChain kutubxonasidagi LLMlar, so'rovlar va vositalar bilan tanishish. Sun'iy intellekt agentiga integratsiya qilish uchun oddiy vositalarni aniqlash. ReAct agentini yaratish va unga vositalardan foydalanish imkoniyatini berish. Agentga murakkab vazifa berib, uning ishlashini kuzatish.", contactHours: 2, independent: 2 },
      { id: 16, topic: "NLP modelini API sifatida joylashtirish. O'qitilgan sentiment tahlili modelini saqlash. FastAPI yordamida oddiy web server yaratish va modelni yuklash. Matnni qabul qilib, bashorat natijasini JSON formatida qaytaradigan API endpointini yaratish. Dockerfile yaratib, FastAPI ilovasini konteynerga o'rash va uni lokal ravishda ishga tushirish.", contactHours: 2, independent: 2 },
    ],
  },
]
