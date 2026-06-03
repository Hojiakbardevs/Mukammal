# Mukammal Training LMS

An open-source frontend-first learning management system for training centers, institutional education portals, and AI-assisted learning workflows.

This project is built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It provides a clean foundation for role-based LMS dashboards, course interfaces, student learning flows, teacher workspaces, admin controls, and future backend/API integration.

> Status: Work in progress. The current repository focuses on frontend architecture, UI flows, mock data, and reusable LMS interface patterns.

---

## Why this project exists

Many training centers and education teams need a practical digital platform for:

* managing courses, lessons, groups, and learning streams;
* separating access by student, teacher, admin, and super admin roles;
* tracking schedules, attendance, grades, certificates, and requests;
* preparing a frontend that can later connect to a real backend API;
* building AI-assisted education and knowledge workflows.

Mukammal Training LMS is intended to be a reusable open-source foundation for those needs.

The long-term goal is to help developers build secure, maintainable, and AI-ready education platforms without starting from a blank Vite template every time.

---

## Current Features

### Public Pages

* Landing page
* Course overview pages
* Registration page
* Login flow
* Unauthorized and not-found pages

### Role-Based Dashboards

* Student dashboard
* Teacher dashboard
* Admin dashboard
* Super Admin dashboard
* Protected routes by role
* Role-based redirect after login
* Local mock authentication for frontend testing

### Student Area

* Course list and course detail pages
* Current lesson page
* Tasks
* Grades
* Schedule
* Certificates
* Profile

### Teacher Area

* Teacher dashboard
* Course management view
* Course/module detail page
* Schedule
* Attendance
* Grading queue
* AI grading review page
* Final grades
* Student risk panel
* Q&A moderation

### Admin and Super Admin Area

* Analytics dashboard
* Course and learning stream views
* User management UI
* Roles and permissions UI
* Certificate templates
* Surveys
* AI governance page
* Audit log page
* Moderation queue
* Platform settings route for Super Admin

---

## Planned Features

* Real backend authentication with JWT
* API client layer
* Django or FastAPI backend example
* PostgreSQL database schema
* Course, lesson, group, user, and application APIs
* Role-based access control on the backend
* Swagger/OpenAPI documentation
* Document upload workflows
* Semantic search interface
* AI-assisted Q&A and learning support
* Docker-based local development
* Deployment guide
* Automated tests

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* shadcn/ui-style component structure
* Radix UI primitives
* Lucide icons
* ESLint
* Prettier

### Planned Backend

* Django or FastAPI
* Django REST Framework or equivalent REST layer
* PostgreSQL
* JWT authentication
* Role-based access control
* Swagger/OpenAPI

### Planned AI / Search Layer

* Embedding models
* Vector search
* Document indexing
* AI-assisted search and summarization workflows

---

## Project Structure

```bash
MukammalTrening/
├── public/
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── landing/
│   │   ├── student/
│   │   └── teacher/
│   ├── types/
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

The frontend is organized around roles and application areas. As backend integration grows, API clients and feature-specific modules can be added under `src/lib`, `src/app`, or dedicated feature folders.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hojiakbardevs/mukammal-training-lms.git
cd mukammal-training-lms
```

If your repository uses a different remote name, clone that repository instead.

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app usually runs at:

```bash
http://localhost:5173
```

---

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run dev:host
```

Starts the development server and exposes it on the local network.

```bash
npm run build
```

Type-checks and builds the project for production.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

```bash
npm run typecheck
```

Runs TypeScript checks without building.

```bash
npm run format
```

Formats TypeScript and React source files with Prettier.

---

## Environment Variables

Create a local `.env` file when backend integration is added:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Mukammal Training LMS
```

Do not commit real `.env` files. Use `.env.example` for public documentation.

---

## Roadmap

### Phase 1 - Frontend Foundation

* [x] Landing page
* [x] Role-based dashboard shell
* [x] Student dashboard pages
* [x] Teacher dashboard pages
* [x] Admin and Super Admin pages
* [x] Protected route structure
* [x] Mock authentication for UI testing

### Phase 2 - Frontend Polish

* [ ] Accessibility review
* [ ] Responsive QA across main pages
* [ ] Form validation improvements
* [ ] Empty, loading, and error states
* [ ] Component documentation

### Phase 3 - Backend Integration

* [ ] API client structure
* [ ] JWT authentication integration
* [ ] User API
* [ ] Course API
* [ ] Lesson API
* [ ] Group API
* [ ] Application/request API
* [ ] Dashboard statistics API

### Phase 4 - AI and Knowledge Workflows

* [ ] Document upload interface
* [ ] Semantic search UI
* [ ] AI-assisted course Q&A
* [ ] AI grading support workflow
* [ ] Governance and audit documentation

### Phase 5 - Security and Production Readiness

* [ ] Security policy
* [ ] Dependency audit workflow
* [ ] Docker setup
* [ ] Deployment guide
* [ ] Contribution guide
* [ ] Automated tests

---

## Security

Security is a core goal because LMS platforms handle users, roles, learning progress, documents, and institutional data.

Planned security focus areas:

* authentication and session flow review;
* role-based access control;
* secure file upload patterns;
* API request validation;
* dependency vulnerability checks;
* safe environment variable handling;
* frontend permission boundary review.

If you discover a security issue, please do not open a public issue with sensitive details. Use the process described in `SECURITY.md`.

---

## Contributing

Contributions are welcome.

You can help by:

* improving UI components;
* fixing bugs;
* improving accessibility;
* adding documentation;
* creating backend examples;
* improving security practices;
* building AI/search workflow examples;
* writing tests;
* reviewing issues and pull requests.

Before contributing, please read `CONTRIBUTING.md`.

---

## Suggested Use Cases

This project can be adapted for:

* online course platforms;
* training center LMS systems;
* teacher and student dashboards;
* institutional knowledge bases;
* AI-assisted document search systems;
* public-sector education platforms;
* internal learning systems;
* research and training management tools.

---

## Maintainer

Maintained by **Hojiakbar Abdulhakimov**.

GitHub: [@hojiakbardevs](https://github.com/hojiakbardevs)

---

## License

This project is planned to be released under the MIT License.

See the `LICENSE` file for details.

---

## Project Vision

The vision of this project is to build an open, practical, and developer-friendly foundation for AI-ready education platforms.

Education systems are becoming more digital. Lessons, users, assignments, assessments, documents, and institutional knowledge need one coherent interface.

Mukammal Training LMS is a step in that direction: a clean, extensible, open-source frontend where LMS workflows and AI-assisted learning systems can grow together.
