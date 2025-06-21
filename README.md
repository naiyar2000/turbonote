# NoteHub – A Notion-style Collaborative Notes App 🧠

**NoteHub** is a full-stack, real-time note-taking application inspired by Notion. It features:

- ✅ Rich text editing (BlockNote)
- ✅ Collaborative editing via WebSocket
- ✅ Firebase Authentication (Google login)
- ✅ PostgreSQL + Prisma ORM
- ✅ File uploads via AWS S3 (optional)
- ✅ Dark/light theme toggle
- ✅ Monorepo architecture with Turborepo

## 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router), TailwindCSS, ShadCN UI
- **Editor:** `@blocknote/mantine`
- **Auth:** Firebase (client + Admin SDK)
- **Backend:** Node.js + Express (REST + WebSocket)
- **Database:** PostgreSQL via Prisma
- **Monorepo Tooling:** Turborepo
- **Dev Tools:** ESLint, Prettier, Husky, Turbo cache

## 📂 Monorepo Structure

```bash
turbonote/
├── apps/
│   ├── web/           # Frontend (Next.js 14, App Router)
│   └── server/        # Backend (Node.js + Express + Prisma + Firebase Auth)
├── packages/
│   └── db/            # Shared Prisma schema + client
├── .gitignore
├── turbo.json         # Turborepo config
└── package.json       # Monorepo root


````

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/naiyar2000/turbonote.git
cd turbonote
```

---

### 2. Install Dependencies

> Uses npm workspaces + Turborepo for package management.

```bash
npm install
```

---

### 3. Set Up PostgreSQL

> You need a PostgreSQL database running locally or on Docker.

---

### 4. Create `.env` Files

#### In `packages/db/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notion"
```

#### In `apps/server/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notion"
PORT=4000

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="your_private_key"
```

#### In `apps/web/.env` (optional for public envs):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
```

---

### 5. Generate Prisma Client

```bash
npx prisma generate --schema=packages/db/prisma/schema.prisma
```

Push schema to DB:

```bash
npx prisma db push --schema=packages/db/prisma/schema.prisma
```
---

### 6. Run the App

To run both frontend and backend together:

```bash
npm run dev
```

To run separately:

# Web frontend
```bash
cd apps/web
npm run dev
```
or

```bash
npm run dev:web
```


# Server backend
```bash
cd apps/server
npm run dev
```
or

```bash
npm run dev:server
```


---

## ✨ Features

* ✅ Nested Pages & Folders
* ✅ Firebase Authentication
* ✅ Prisma + PostgreSQL DB
* ✅ Realtime Socket setup (collaboration-ready)
* ✅ Dark Mode Toggle
* ✅ Mobile Responsive
* ✅ Modern UI with ShadCN & Tailwind
* ✅ Token-based API access
* ✅ Feature flags per user (AI/collab toggle)

---

## 🚀 Roadmap

* [ ] Realtime collaborative editing
* [ ] Search, tag, archive system
* [ ] Offline support & caching
* [ ] Sharing & permissions (editor/viewer)
* [ ] Deployment on EC2 via Docker

---

## 🐳 Coming Soon: Docker + EC2

A guide for containerizing and deploying to Amazon EC2 will be included soon.

---

## 📄 License

MIT License © 2025 Naiyar

```

---

Let me know if you'd like:
- [ ] Badges (build, license, etc.)
- [ ] Docker deployment steps
- [ ] Firebase config template
- [ ] Contribution guide

I'll add those instantly if needed.
```



