Albatta. Siz yuborgan TZ matnini yanada **rasmiyroq, aniqroq va topshiriq sifatida kuchliroq** qilib qayta tuzdim. Asosiy mazmun saqlangan: frontend ~80% tayyor, Ilhom backend, Javohir server/database/deploy, ikkalasi integratsiya va testingni yopadi. 

---

# Mukammal Training LMS loyihasi bo‘yicha texnik topshiriq

## Status

**Frontend qismi:** taxminan 80% tayyor.
**Asosiy vazifa:** backend, database, API, server, integratsiya va testing ishlarini yakunlab, platformani to‘liq ishlaydigan holatga keltirish.

---

## 1. Umumiy maqsad

**Mukammal Training LMS** — o‘quv kurslarini boshqarish, foydalanuvchilarni rollar bo‘yicha ajratish, darslar, guruhlar, arizalar, statistika va platforma kontentlarini boshqarish uchun ishlab chiqilayotgan LMS platforma.

Frontend qismi asosiy ko‘rinishda tayyor bo‘lgani sababli, hozirgi bosqichda asosiy e’tibor quyidagi ishlarni yakunlashga qaratiladi:

* Django va Django REST Framework asosida backend qismini ishlab chiqish;
* PostgreSQL database model va relationlarini to‘g‘ri shakllantirish;
* frontend uchun kerakli API endpointlarni tayyorlash;
* Swagger/OpenAPI orqali API hujjatlarini berish;
* backendni production serverga joylashtirish;
* frontend va backend integratsiyasini yakunlash;
* testing, bug fix va yakuniy demo flow’ni tayyorlash.

Platforma yakunida frontend real API bilan ishlashi, foydalanuvchilar roliga qarab tizimga kirishi va barcha asosiy modullar barqaror ishlashi kerak.

---

## 2. Loyiha doirasi

Loyiha doirasida quyidagi modullar to‘liq ishlashi shart:

* autentifikatsiya va avtorizatsiya;
* Super Admin paneli;
* o‘qituvchi paneli;
* talaba paneli;
* foydalanuvchilar boshqaruvi;
* kurslar boshqaruvi;
* darslar boshqaruvi;
* guruhlar boshqaruvi;
* arizalar va so‘rovlar boshqaruvi;
* dashboard va statistika;
* media/static fayllar bilan ishlash;
* demo yoki real kontentlarni database’ga kiritish;
* frontend-backend integratsiyasi;
* testing va yakuniy deploy.

---

## 3. Texnologik talablar

Backend quyidagi texnologiyalar asosida ishlab chiqilishi kerak:

* **Python**
* **Django**
* **Django REST Framework**
* **PostgreSQL**
* **JWT Authentication**
* **Role-based Access Control**
* **Swagger / OpenAPI documentation**
* **Gunicorn**
* **Nginx**
* **Docker yoki virtual environment**
* **Production `.env` configuration**

Qo‘shimcha texnik talablar:

* API response formatlari bir xil standartda bo‘lishi kerak;
* error response’lar tushunarli va yagona formatda qaytishi kerak;
* listing endpointlarda pagination, filter va search imkoniyati bo‘lishi kerak;
* media fayllar uchun to‘g‘ri URL va storage sozlamalari qilinishi kerak;
* production holatda `DEBUG=False` bo‘lishi kerak;
* secret key, database password va boshqa maxfiy ma’lumotlar `.env` orqali boshqarilishi kerak.

---

## 4. Mas’ul xodimlar

## 4.1. Ilhom — Backend developer

Ilhom quyidagi ishlar uchun mas’ul hisoblanadi:

* Django project strukturasi;
* backend app’larni yaratish;
* database modellari va migrationlar;
* Django REST Framework API endpointlar;
* JWT login, refresh va logout flow;
* role-based permissionlar;
* Super Admin, O‘qituvchi va Talaba rollari;
* users, courses, lessons, groups, applications va dashboard APIlari;
* Swagger/OpenAPI hujjatlari;
* API testing va backend bug fix.

---

## 4.2. Javohir — Server, Database va Deployment

Javohir quyidagi ishlar uchun mas’ul hisoblanadi:

* server muhitini tayyorlash;
* PostgreSQL production database yaratish;
* database user, permission va backup rejalarini sozlash;
* backendni serverga deploy qilish;
* Gunicorn va Nginx sozlamalari;
* domain yoki subdomain orqali API’ni ochish;
* `.env`, allowed hosts, CORS va production security sozlamalari;
* static/media fayllarni servis qilish;
* server loglari va minimal monitoringni yo‘lga qo‘yish.

---

## 4.3. Ilhom va Javohir birgalikda

Quyidagi ishlar Ilhom va Javohir tomonidan birgalikda bajariladi:

* frontend va backend integratsiyasi;
* API endpointlarni frontend talablariga moslashtirish;
* database’ni demo yoki real kontent bilan to‘ldirish;
* integratsiya testing;
* role-based testing;
* server testing;
* bug fix;
* yakuniy demo flow tayyorlash;
* platformani topshirishga tayyor holatga keltirish.

---

## 5. Rollar va ruxsatlar

Platformada quyidagi rollar bo‘ladi:

* **Super Admin**
* **O‘qituvchi**
* **Talaba**

Asosiy talablar:

* har bir foydalanuvchi faqat o‘z roliga tegishli sahifa va ma’lumotlarni ko‘ra olishi kerak;
* ruxsatsiz endpointlarga kirish qat’iy cheklanishi kerak;
* noto‘g‘ri token yoki tokensiz so‘rov yuborilganda 401 qaytishi kerak;
* ruxsati yetarli bo‘lmagan foydalanuvchiga 403 qaytishi kerak;
* frontend refresh bo‘lganda sessiya va token flow to‘g‘ri ishlashi kerak.

---

# 6. Funksional talablar

## 6.1. Autentifikatsiya

Quyidagi imkoniyatlar bo‘lishi kerak:

* login;
* logout;
* access token;
* refresh token;
* token refresh;
* password hashing;
* foydalanuvchi rolini aniqlash;
* admin tomonidan foydalanuvchi yaratish;
* role-based permissionlar.

**Natija:** foydalanuvchi tizimga kiradi, roli aniqlanadi va tegishli panelga yo‘naltiriladi.

---

## 6.2. Super Admin paneli

Super Admin quyidagilarni boshqara olishi kerak:

* foydalanuvchilar;
* o‘qituvchilar;
* talabalar;
* kurslar;
* darslar;
* guruhlar;
* arizalar;
* dashboard statistikasi;
* platforma kontentlari.

**Natija:** Super Admin platformadagi asosiy boshqaruv amallarini to‘liq bajara oladi.

---

## 6.3. Kurslar moduli

Kurs ma’lumotlari:

* nomi;
* tavsifi;
* davomiyligi;
* o‘qituvchi yoki o‘qituvchilar;
* status;
* rasm yoki media;
* yaratilgan sana;
* yangilangan sana.

API imkoniyatlari:

* kurs yaratish;
* kursni tahrirlash;
* kursni o‘chirish;
* kurslar ro‘yxatini olish;
* bitta kurs ma’lumotini olish;
* kursga o‘qituvchi biriktirish;
* kursga guruh yoki talabalarni biriktirish.

**Natija:** kurslar to‘liq boshqariladi va frontendda real API orqali ko‘rinadi.

---

## 6.4. Darslar moduli

Dars ma’lumotlari:

* nomi;
* tavsifi;
* video yoki fayl;
* matnli kontent;
* tartib raqami;
* kursga bog‘lanish;
* status.

API imkoniyatlari:

* dars yaratish;
* darsni tahrirlash;
* darsni o‘chirish;
* kurs bo‘yicha darslar ro‘yxatini olish;
* bitta dars ma’lumotini olish;
* darslarni tartib bo‘yicha chiqarish.

**Natija:** har bir kurs ichida darslar to‘g‘ri tartibda ishlaydi.

---

## 6.5. Guruhlar moduli

Guruh ma’lumotlari:

* guruh nomi;
* biriktirilgan kurs;
* o‘qituvchi;
* talabalar;
* boshlanish sanasi;
* tugash sanasi;
* status.

API imkoniyatlari:

* guruh yaratish;
* guruhni tahrirlash;
* guruh ma’lumotini olish;
* guruhga o‘qituvchi biriktirish;
* guruhga talaba qo‘shish;
* guruhdan talabani olib tashlash.

**Natija:** guruhlar kurs, o‘qituvchi va talabalar bilan to‘g‘ri bog‘langan holda ishlaydi.

---

## 6.6. Foydalanuvchilar moduli

Foydalanuvchi ma’lumotlari:

* ism;
* familiya;
* telefon;
* email;
* rol;
* status;
* ro‘yxatdan o‘tgan sana.

API imkoniyatlari:

* foydalanuvchi yaratish;
* foydalanuvchini tahrirlash;
* foydalanuvchini o‘chirish;
* foydalanuvchilar ro‘yxatini olish;
* rol bo‘yicha filter;
* status bo‘yicha filter;
* search;
* pagination.

**Natija:** Super Admin foydalanuvchilarni to‘liq boshqara oladi.

---

## 6.7. Arizalar va so‘rovlar moduli

Ariza ma’lumotlari:

* ism;
* familiya;
* telefon;
* email;
* tashkilot;
* lavozim;
* tanlangan kurs;
* xabar;
* status.

Statuslar:

* yangi;
* ko‘rib chiqilmoqda;
* qabul qilindi;
* rad etildi.

API imkoniyatlari:

* ariza yaratish;
* arizalar ro‘yxatini olish;
* ariza statusini o‘zgartirish;
* arizani ko‘rish;
* filter va search.

**Natija:** kelgan arizalar admin panelda ko‘rinadi va statuslar orqali boshqariladi.

---

## 6.8. Dashboard va statistika

Dashboard API orqali quyidagi ma’lumotlar qaytishi kerak:

* jami foydalanuvchilar soni;
* jami talabalar soni;
* jami o‘qituvchilar soni;
* jami kurslar soni;
* faol kurslar soni;
* faol guruhlar soni;
* yangi arizalar soni;
* tugallangan kurslar soni.

Talab:

* Super Admin uchun umumiy statistika;
* O‘qituvchi uchun o‘ziga tegishli kurs va guruhlar statistikasi;
* Talaba uchun o‘z kurslari va darslariga oid ma’lumotlar.

**Natija:** har bir rol o‘ziga mos dashboard ma’lumotlarini ko‘radi.

---

## 6.9. Database’ni kontent bilan to‘ldirish

Database quyidagi ma’lumotlar bilan to‘ldirilishi kerak:

* kurslar;
* darslar;
* demo guruhlar;
* demo Super Admin account;
* demo O‘qituvchi account;
* demo Talaba account;
* test uchun arizalar;
* frontend sahifalarini tekshirish uchun yetarli data.

**Natija:** platforma bo‘sh emas, demo ko‘rsatishga tayyor holatda bo‘ladi.

---

# 7. Ishlar rejalari va deliverable’lar

## 7.1. Backend vazifalari — Ilhom

| Vazifa                             | Natija                                          |
| ---------------------------------- | ----------------------------------------------- |
| Django project skeleton tayyorlash | Project local holatda ishga tushadi             |
| PostgreSQL ulanishini sozlash      | Database ulanadi, migration ishlaydi            |
| Auth va JWT flow qilish            | Login, refresh, logout ishlaydi                 |
| RBAC permissionlar                 | Role bo‘yicha kirish cheklanadi                 |
| Users CRUD                         | Admin userlarni boshqaradi                      |
| Course CRUD                        | Kurslar yaratiladi va boshqariladi              |
| Lesson CRUD                        | Darslar kursga bog‘lanadi                       |
| Group CRUD                         | Guruhlar, talabalar va o‘qituvchilar bog‘lanadi |
| Applications API                   | Arizalar qabul qilinadi va boshqariladi         |
| Dashboard stats API                | Frontendga statistika qaytadi                   |
| Swagger/OpenAPI                    | Frontend uchun API hujjat tayyor bo‘ladi        |

---

## 7.2. Server va deploy vazifalari — Javohir

| Vazifa                           | Natija                                  |
| -------------------------------- | --------------------------------------- |
| Server muhitini tayyorlash       | Production environment tayyor           |
| PostgreSQL production DB sozlash | Database xavfsiz va ishlaydigan holatda |
| `.env` va secret management      | Maxfiy sozlamalar himoyalangan          |
| Gunicorn + Nginx deploy          | Backend serverda ishlaydi               |
| Domain/subdomain ulash           | API public URL orqali ochiladi          |
| Static/media fayllarni sozlash   | Media va static fayllar ishlaydi        |
| CORS/Allowed Hosts sozlash       | Frontend API bilan muammosiz ulanadi    |
| Logging/monitoring               | Xatoliklarni kuzatish imkoni bo‘ladi    |

---

## 7.3. Integratsiya va yakunlash — Ilhom + Javohir

| Vazifa                    | Natija                                  |
| ------------------------- | --------------------------------------- |
| Frontend API mapping      | Frontend real API bilan ishlaydi        |
| Token flow integratsiyasi | Login va refresh to‘g‘ri ishlaydi       |
| Demo data seed            | Demo uchun ma’lumotlar tayyor           |
| Integratsiya testing      | Asosiy sahifalar API bilan tekshiriladi |
| Bug fix                   | Critical buglar yopiladi                |
| Yakuniy demo flow         | Platforma topshirishga tayyor bo‘ladi   |

---

# 8. Muddatlar

Ishlar **2026-yil 18-maydan 2026-yil 25-maygacha** bajarilishi kerak.

| Sana      | Vazifa                                                           | Mas’ul          |
| --------- | ---------------------------------------------------------------- | --------------- |
| 18-may    | Django backend skeleton, app struktura, PostgreSQL ulanishi      | Ilhom           |
| 18–19-may | Server environment, production DB, `.env` tayyorlash             | Javohir         |
| 19-may    | Auth, JWT, refresh token, RBAC permissionlar                     | Ilhom           |
| 20-may    | Users, Teacher, Student modullari                                | Ilhom           |
| 21-may    | Course va Lesson modullari                                       | Ilhom           |
| 22-may    | Group, Applications va Dashboard stats                           | Ilhom           |
| 23-may    | Demo/real data kiritish, serverda database tayyorlash            | Ilhom + Javohir |
| 24-may    | Frontend-backend integratsiya testing, role testing, API testing | Ilhom + Javohir |
| 25-may    | Bug fix, final deploy, demo flow va topshirish                   | Ilhom + Javohir |

---

# 9. Testing rejasi

Testing alohida bosqich sifatida bajarilishi shart. Backend yozilgani loyiha tayyor degani emas. Loyiha faqat API, frontend, database, server va role flow to‘liq tekshirilgandan keyin topshirishga tayyor hisoblanadi.

---

## 9.1. Backend API testing

Ilhom quyidagilarni test qiladi:

* login;
* refresh token;
* logout;
* users CRUD;
* courses CRUD;
* lessons CRUD;
* groups CRUD;
* applications API;
* dashboard stats;
* pagination;
* filter;
* search;
* error response format;
* 401 va 403 permission holatlari.

**Natija:** barcha endpointlar Postman, Swagger yoki boshqa testing vositasi orqali tekshirilgan bo‘lishi kerak.

---

## 9.2. Frontend-backend integratsiya testing

Ilhom va Javohir quyidagilarni tekshiradi:

* login sahifasi;
* Super Admin dashboard;
* O‘qituvchi dashboard;
* Talaba dashboard;
* kurslar sahifasi;
* darslar sahifasi;
* guruhlar sahifasi;
* foydalanuvchilar sahifasi;
* arizalar sahifasi;
* statistika bloklari;
* loading holatlar;
* error holatlar;
* form validation;
* create/edit/delete amallari;
* sahifa refresh bo‘lganda sessiya saqlanishi.

**Natija:** frontend mock data bilan emas, real backend API bilan ishlashi kerak.

---

## 9.3. Role-based testing

Har bir rol alohida test qilinadi.

### Super Admin

Tekshiriladi:

* user yaratish;
* o‘qituvchi qo‘shish;
* talaba qo‘shish;
* kurs yaratish;
* dars qo‘shish;
* guruh yaratish;
* arizalarni ko‘rish;
* dashboard statistikani ko‘rish.

### O‘qituvchi

Tekshiriladi:

* o‘ziga biriktirilgan kurslarni ko‘rish;
* o‘z guruhlarini ko‘rish;
* o‘z talabalarini ko‘rish;
* kurs darslarini ko‘rish;
* Super Admin sahifalariga kira olmaslik.

### Talaba

Tekshiriladi:

* o‘z kurslarini ko‘rish;
* o‘z darslarini ko‘rish;
* kurs kontentlarini ko‘rish;
* admin va o‘qituvchi sahifalariga kira olmaslik.

---

## 9.4. Database testing

Tekshiriladi:

* migrationlar to‘g‘ri ishlashi;
* course-lesson relation;
* group-student relation;
* teacher-course relation;
* application status flow;
* delete/update holatlarida relationlar buzilmasligi;
* demo data to‘g‘ri saqlanishi;
* server database bilan backend ulanishi.

---

## 9.5. Server testing

Javohir quyidagilarni test qiladi:

* API domain/subdomain orqali ochilishi;
* backend service restartdan keyin ishlashi;
* PostgreSQL ulanishi;
* static/media fayllar ishlashi;
* CORS muammolari bo‘lmasligi;
* allowed hosts to‘g‘ri sozlangani;
* production mode’da debug chiqmasligi;
* error loglar ko‘rinishi.

---

# 10. Yakuniy demo flow

Loyiha topshirilishidan oldin quyidagi flow to‘liq tekshirilishi kerak:

1. Super Admin login qiladi.
2. Yangi o‘qituvchi yaratadi.
3. Yangi talaba yaratadi.
4. Yangi kurs yaratadi.
5. Kursga dars qo‘shadi.
6. Guruh yaratadi.
7. Guruhga o‘qituvchi va talabani biriktiradi.
8. O‘qituvchi login qilib o‘z kurslarini ko‘radi.
9. Talaba login qilib o‘z darslarini ko‘radi.
10. Dashboard statistikasi yangilanganini tekshiradi.
11. Ariza yuboriladi.
12. Ariza admin panelda ko‘rinadi.
13. Ariza statusi o‘zgartiriladi.
14. Frontend refresh qilinganda sessiya to‘g‘ri saqlanadi.
15. Har bir rol ruxsatsiz sahifalarga kira olmasligi tekshiriladi.

**Natija:** ushbu flow xatosiz ishlasa, loyiha demo va topshirishga tayyor deb hisoblanadi.

---

# 11. Qabul qilish mezonlari

Loyiha quyidagi holatlar bajarilganda qabul qilinadi:

* login ishlaydi;
* refresh token ishlaydi;
* har bir rol o‘z paneliga kiradi;
* ruxsatsiz sahifalar va endpointlar bloklanadi;
* Super Admin user, course, lesson, group va application modullarini boshqaradi;
* O‘qituvchi o‘ziga biriktirilgan kurs va guruhlarni ko‘radi;
* Talaba o‘z kurslari va darslarini ko‘radi;
* dashboard statistikasi real database’dan keladi;
* frontend mock data emas, real API bilan ishlaydi;
* media/static fayllar serverda ishlaydi;
* PostgreSQL database barqaror ishlaydi;
* Swagger/OpenAPI hujjatlari tayyor;
* server production holatda ishlaydi;
* critical buglar yopilgan;
* yakuniy demo flow muammosiz o‘tadi.

---

# 12. Risklar va muhim eslatmalar

Quyidagi xavflar oldindan hisobga olinishi kerak:

* backend API frontenddagi mavjud strukturaga mos kelmasligi;
* token va session flow’da xatolik chiqishi;
* role permissionlar noto‘g‘ri ishlashi;
* CORS yoki allowed hosts muammosi;
* media fayllar serverda ochilmasligi;
* database relationlar noto‘g‘ri qurilishi;
* testing uchun yetarli demo data bo‘lmasligi;
* oxirgi kunda bug fixga vaqt yetmasligi.

Shu sababli testing ishlari oxirgi kunga qoldirilmasligi kerak. **24-may kuni integratsiya va testing to‘liq boshlanishi, 25-may esa final bug fix, deploy va demo kuni bo‘lishi kerak.**

---

# 13. Yakuniy topshiriq

Ilhom va Javohir ushbu texnik topshiriq asosida Mukammal Training LMS loyihasining backend, database, server, integratsiya va testing ishlarini yakunlashi kerak.

Nafisa tomonidan platformaning kontent tuzilmasi va ishlash jarayonlari tushuntirib berilgan. Shu asosda database to‘ldiriladi va platforma demo ko‘rsatishga tayyor holatga keltiriladi.

Loyihaning asosiy maqsadi — frontend qismi tayyor bo‘lgan Mukammal Training LMS platformasini real backend va server bilan ulab, to‘liq ishlaydigan mahsulot sifatida topshirish.
