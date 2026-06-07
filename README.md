# NeuroSTEM Atlas 🧠

**AI × STEM Education Platform** - Reconstructs reasoning from real student work and generates adaptive micro-lessons

![Status](https://img.shields.io/badge/status-production--ready-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-20%2B-brightgreen)
![Python](https://img.shields.io/badge/python-3.10%2B-brightgreen)

## 🎯 The Problem

Students struggle with conceptual understanding in STEM. Traditional tutoring systems:
- ❌ Ignore real learning artifacts (handwritten notes, diagrams, code)
- ❌ Only check if answers are right/wrong
- ❌ Don't map reasoning to concepts
- ❌ Provide generic hints that don't match student work

## ✨ The Solution

NeuroSTEM Atlas uses **multimodal AI** to:

1. **Ingest real student work** - Handwritten solutions, diagrams, voice explanations, code
2. **Reconstruct reasoning** - AI extracts the thinking process from artifacts
3. **Detect conceptual gaps** - Identifies specific areas of misunderstanding with confidence scores
4. **Generate adaptive lessons** - Tailored explanations, visualizations, interactive questions
5. **Visualize mastery** - Dynamic concept atlas showing understanding across STEM topics
6. **Guide practice** - Step-by-step problem-solving sessions with AI hints

## 🚀 Quick Start

### Docker (Recommended)
```bash
git clone https://github.com/CoderSPS/STEMlens.git
cd STEMlens
docker-compose up --build
```

Then open: **http://localhost:3000**

### Local Development
```bash
# Backend
cd backend && npm install && npm run dev

# AI Service (in new terminal)
cd ai-service && pip install -r requirements.txt && python -m uvicorn main:app --reload

# Frontend (in new terminal)
cd frontend && npm install && npm run dev
```

## 📋 Features

### Core Platform
- ✅ Custom authentication with JWT
- ✅ Multimodal submission hub (images, audio, code, diagrams)
- ✅ AI-powered reasoning reconstruction
- ✅ Conceptual gap detection with severity scoring
- ✅ Personalized micro-lessons with visualizations
- ✅ Interactive concept atlas with mastery tracking
- ✅ Guided problem-solving sessions
- ✅ Real-time AI feedback and hints

### Advanced Features
- 📄 LaTeX export of solutions
- 🎤 Voice-to-text concept evaluation
- 💻 Code-to-concept mapping
- 📊 Progress charts and analytics
- 🎨 Dark neural theme with neon accents

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + custom neural theme
- **State**: Zustand
- **Charts**: Recharts
- **HTTP**: Axios

### Backend
- **Framework**: Fastify + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT with bcrypt
- **File Handling**: @fastify/multipart
- **7 Route Modules**: auth, submissions, analysis, lessons, mastery, sessions

### AI Service
- **Framework**: FastAPI + Python
- **6 Core Endpoints**: analyze, micro_lessons, session_step, latex_export, concept_check, code_concepts
- **Multimodal Support**: Vision, speech-to-text, code parsing

### Database Schema (Prisma)
- User → Submissions → AnalysisResult → Lessons
- User → Sessions → SessionSteps
- User → ConceptMastery

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/signup          Create account
POST   /api/auth/login           Sign in
GET    /api/auth/me              Get current user
```

### Submissions
```
POST   /api/submissions          Upload multimodal work
GET    /api/submissions/:id      Retrieve submission
```

### Analysis & Learning
```
GET    /api/analysis/:id         Get reasoning reconstruction
GET    /api/lessons/:id          Get micro-lesson
GET    /api/mastery/:userId      Get concept mastery
POST   /api/mastery/update       Update concept score
```

### Guided Sessions
```
POST   /api/sessions             Create session
GET    /api/sessions/:id         Get session with steps
POST   /api/sessions/:id/step    Submit step, get feedback
```

### AI Service (Internal)
```
POST   /ai/analyze               Reconstruct reasoning
POST   /ai/micro_lessons         Generate lesson
POST   /ai/session_step          Get hint & feedback
POST   /ai/latex_export          Convert to LaTeX
POST   /ai/concept_check         Score explanation
POST   /ai/code_concepts         Map code to concepts
```

See `docs/API.md` for full documentation

## 🎨 Design System

### Colors (Dark Neural Theme)
- **Background**: #050816 → #0F172A (gradient)
- **Primary**: #6366F1 (Indigo)
- **Accent Green**: #22C55E
- **Accent Orange**: #F97316
- **Accent Pink**: #FF4B81
- **Text Primary**: #E5E7EB
- **Text Muted**: #9CA3AF

### Typography
- **Font**: Inter + Space Grotesk
- **Theme**: Glassmorphism with neon accents

## 📊 Demo Flow

1. **Landing** → Hero gradient with CTA
2. **Sign Up** → Create account
3. **Submit Work** → Upload images/audio/code
4. **Analysis** → AI reconstructs reasoning, shows gaps
5. **Micro-Lesson** → Personalized explanation with visualization
6. **Dashboard** → Concept atlas with mastery scores
7. **Guided Session** → Step-by-step problem solving with AI hints

## 🚀 Deployment

### Local Setup
See `docs/SETUP.md` for detailed instructions

### Docker Compose
```bash
docker-compose up --build
```

Services start on:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- AI Service: http://localhost:8000
- PostgreSQL: localhost:5432

### Production Checklist
- [ ] Change JWT_SECRET
- [ ] Use strong database password
- [ ] Enable HTTPS
- [ ] Configure CORS for your domain
- [ ] Set up environment-specific configs
- [ ] Deploy to cloud (AWS, GCP, Azure, Heroku)
- [ ] Set up monitoring & logging
- [ ] Configure backups

## 📚 Documentation

- **[Setup Guide](docs/SETUP.md)** - Local & Docker setup, troubleshooting
- **[API Reference](docs/API.md)** - Complete endpoint documentation
- **[One-Pager](docs/ONE_PAGER.md)** - Product overview & pitch

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, React, TypeScript, Tailwind, Recharts |
| Backend | Fastify, TypeScript, Prisma, PostgreSQL |
| AI | FastAPI, Python, Pydantic |
| Infrastructure | Docker, Docker Compose |

## 📦 Project Structure

```
STEMlens/
├── frontend/              (Next.js application)
├── backend/               (Fastify API server)
├── ai-service/            (FastAPI AI endpoints)
├── docs/                  (Documentation)
├── scripts/               (Utility scripts)
├── docker-compose.yml     (Orchestration)
├── .gitignore
└── README.md
```

## 🔐 Security

- ✅ JWT authentication with HttpOnly cookies
- ✅ Bcrypt password hashing
- ✅ SQL injection prevention (Prisma ORM)
- ✅ CORS configuration
- ✅ Environment variable protection
- ✅ File upload validation
- ✅ Rate limiting ready

## 🧪 Testing

Add to your workflow:
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# AI service tests
cd ai-service && pytest
```

## 📈 Performance

- ⚡ Next.js automatic code splitting
- ⚡ Fastify low-overhead HTTP server
- ⚡ Prisma query optimization
- ⚡ PostgreSQL indexing
- ⚡ Docker image optimization

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create a Pull Request

## 📝 License

MIT License

## 👨‍💻 Author

Built for DSH Hacks V1 by CoderSPS

## 🙏 Acknowledgments

- Next.js team for amazing framework
- Fastify for blazing-fast backend
- Prisma for elegant ORM
- FastAPI for modern Python APIs
- Tailwind for utility-first CSS

## 📞 Support

- 📖 Check `docs/` folder for guides
- 🐛 Open an issue for bugs
- 💡 Discuss ideas in discussions

---

**Transform STEM Education. Understand *Why*, Not Just *How*. 🚀**
