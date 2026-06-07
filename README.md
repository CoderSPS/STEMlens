# NeuroSTEM Atlas

A multimodal AI mentor that reconstructs, diagnoses, and teaches STEM reasoning from handwritten work, diagrams, voice, and code—mapped onto a live concept atlas.

## Overview

NeuroSTEM Atlas is an AI × STEM education platform that ingests students' real-world work (notes, diagrams, voice, and code), reconstructs their reasoning, detects conceptual gaps, and generates adaptive, visually rich micro-lessons mapped onto a dynamic STEM concept atlas.

## Problem Statement

### The STEM Education Gap

- **Concept vs procedure mismatch**: Students learn how to "do" problems without understanding underlying concepts
- **Non-digital artifacts**: Real learning happens in notebooks, whiteboards, spoken explanations—most tools ignore these
- **Feedback bottleneck**: Teachers rarely analyze the reasoning process or multimodal artifacts
- **Fragmented learning**: Students lack a unified view of their conceptual mastery

## Core Features

### 1. Custom Auth & Onboarding
- Email/password sign-up and login
- JWT-based sessions
- Personalized onboarding wizard

### 2. Multimodal Submission Hub
- Upload handwritten solutions (images)
- Record audio explanations
- Paste code snippets
- Select subject, topic, and difficulty

### 3. Multimodal Reasoning Reconstruction
- Extract handwritten equations and steps from images
- Transcribe and analyze voice explanations
- Parse code constructs
- Reconstruct full student reasoning

### 4. Adaptive Micro-Lesson Generator
- Generate targeted micro-lessons for each conceptual gap
- Step-by-step walkthroughs
- Interactive visualizations
- Concept-focused questions with feedback

### 5. Concept Atlas Visualization
- Dynamic graph of STEM concepts
- Node size/color = mastery level
- Visual relationships between concepts
- Interactive exploration

### 6. Guided STEM Sessions
- Live, step-by-step problem-solving sessions
- AI hints and feedback at each step
- Contextual guidance based on student progress

## Advanced Features

- **Handwritten-to-LaTeX Reconstruction**: Convert solutions to clean LaTeX and export as PDF
- **Voice Concept Check**: Students explain concepts verbally; AI scores and provides feedback
- **Code-to-Concept Mapping**: Map code constructs to CS concepts (recursion, complexity, data structures)

## Technology Stack

### Frontend
- **Framework**: Next.js (TypeScript)
- **Styling**: Tailwind CSS
- **Charts**: Recharts / Chart.js
- **Graph Visualization**: Custom SVG or lightweight graph library

### Backend
- **Runtime**: Node.js
- **Framework**: Fastify (TypeScript)
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Auth**: JWT (HS256)

### AI Service
- **Runtime**: Python
- **Framework**: FastAPI
- **Models**: Multimodal LLM, Speech-to-Text

## Design System

### Color Palette
- **Background**: #050816 → #0F172A (dark gradient)
- **Primary**: #6366F1 (indigo)
- **Accents**:
  - #22C55E (neon green)
  - #F97316 (orange)
  - #FF4B81 (neon pink)
- **Text**: #E5E7EB (light), #9CA3AF (muted)

### Typography
- **Font**: Inter or Space Grotesk
- **Headings**: bold, tracking-wide
- **Body**: regular, 16px base

## Project Structure

```
STEMlens/
├── frontend/              # Next.js app
│   ├── pages/
│   ├── components/
│   └── ...
├── backend/               # Fastify server
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── ...
│   └── ...
├── ai-service/            # FastAPI app
│   ├── main.py
│   ├── endpoints/
│   └── ...
├── db/                    # Prisma schema
│   ├── schema.prisma
│   └── migrations/
├── scripts/               # Seed and utility scripts
├── docs/                  # Documentation
├── docker-compose.yml
├── .gitignore
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Log in
- `GET /api/auth/me` - Get current user profile

### Submissions
- `POST /api/submissions` - Create submission
- `GET /api/submissions/:id` - Get submission details
- `POST /api/submissions/:id/analyze` - Trigger analysis

### Analysis & Lessons
- `GET /api/analysis/:submissionId` - Get analysis results
- `POST /api/lessons/:analysisResultId/generate` - Generate micro-lesson
- `GET /api/lessons/:submissionId` - Get lessons

### Mastery & Atlas
- `POST /api/mastery/update` - Update concept mastery
- `GET /api/mastery/:userId` - Get user's concept mastery

### Sessions
- `POST /api/sessions` - Create guided session
- `POST /api/sessions/:sessionId/step` - Submit step
- `GET /api/sessions/:sessionId` - Get session details

### Advanced
- `POST /api/concepts/check` - Voice concept check
- `POST /api/submissions/:id/export` - Export as LaTeX/PDF

## AI Service Endpoints

- `POST /ai/analyze` - Reconstruct reasoning from multimodal input
- `POST /ai/micro_lessons` - Generate adaptive micro-lesson
- `POST /ai/latex_export` - Convert to LaTeX
- `POST /ai/concept_check` - Score verbal concept explanation
- `POST /ai/code_concepts` - Map code to CS concepts
- `POST /ai/session_step` - Generate hint/feedback for session step

## Database Schema

### Core Tables
- `users` - User accounts
- `submissions` - Student submissions (multimodal)
- `analysis_results` - AI analysis output
- `micro_lessons` - Generated lessons
- `concept_mastery` - Student mastery scores per concept
- `sessions` - Guided problem-solving sessions
- `session_steps` - Individual steps within sessions

## Setup & Installation

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL 14+
- Docker & Docker Compose (optional)

### Development

```bash
# Clone repository
git clone https://github.com/CoderSPS/STEMlens.git
cd STEMlens

# Frontend
cd frontend
npm install
npm run dev

# Backend (in another terminal)
cd backend
npm install
npm run dev

# AI Service (in another terminal)
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload
```

### Docker

```bash
docker-compose up
```

## Implementation Timeline

**Day 1**: Auth & setup  
**Day 2**: Submission hub  
**Day 3**: AI analysis  
**Day 4**: Micro-lessons  
**Day 5**: Concept atlas & mastery  
**Day 6**: Guided sessions & advanced features  
**Day 7**: Polish & demo  

## Target Users

- **High school STEM learners** (14–18) - Algebra, calculus, physics, intro CS
- **Undergraduate STEM students** (18–22) - Calculus, linear algebra, mechanics, data structures
- **Self-learners** (16+) - Online courses, independent study

## Accessibility

- High-contrast dark theme
- Keyboard navigation
- Alt text for visualizations
- Transcripts for audio explanations

## Demo Flow

1. Sign up / log in
2. Upload handwritten solution, audio explanation, and/or code
3. System analyzes and reconstructs reasoning
4. View conceptual gaps and generated micro-lesson
5. Explore concept atlas with mastery visualization
6. Participate in guided problem-solving session
7. Review advanced features (LaTeX export, concept check)

## Why This Matters

NeuroSTEM Atlas uniquely combines:

- **Multimodal AI** that understands real student work (not just typed answers)
- **Reasoning reconstruction** that diagnoses *how* students think, not just *if* they're right
- **Concept atlas** that visualizes understanding across STEM topics
- **Adaptive learning** with AI-generated micro-lessons tailored to each student's gaps

This isn't answer-checking—it's understanding reasoning and teaching conceptually.

## License

[To be determined]

## Authors

Created for DSH Hacks V1

---

**vibe coded** 🧠✨
