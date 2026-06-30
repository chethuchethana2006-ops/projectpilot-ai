# 🚀 ProjectPilot AI

AI-powered platform that generates personalized project ideas using Google's Gemini API.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Gemini](https://img.shields.io/badge/Gemini-AI-orange)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

## 🌐 Live Demo

https://projectpilot-ai-self.vercel.app

---
## 🏗️ Architecture

```mermaid
flowchart TD

A[User Input Skills] --> B[Next.js Frontend]

B --> C[API Route]

C --> D[Gemini API]

D --> E[AI Recommendation Engine]

E --> F[Project Cards]

F --> G[Difficulty Prediction]

F --> H[Duration Estimation]

F --> I[Tech Stack Suggestions]

G --> J[User Interface]

H --> J

I --> J
```
---
## ✨ Features

- AI-powered project recommendations
- Personalized suggestions
- Internship-focused ideas
- Difficulty prediction
- Duration estimation
- Recommended tech stack
- Responsive design
- Gemini 2.5 Flash integration
---

## 🛠 Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Gemini API
- Google GenAI SDK
- Vercel

---
## 📸 Project Preview

### 🏠 Home Screen
![Home](./public/screenshots/home.png)

---

### 🤖 AI Recommendations
![Recommendations](./public/screenshots/recommendations.png)

---

🌐 Live Demo

[Visit ProjectPilot AI](https://projectpilot-ai-self.vercel.app)

---

## ⚙️ Installation

```bash
git clone https://github.com/chethuchethana2006-ops/projectpilot-ai.git

cd projectpilot-ai

npm install

npm run dev
```

---
## 🔑 Environment Variables

Create:

```env
GEMINI_API_KEY=your_key_here
```

---
## 🚀 Deployment

Hosted on Vercel

https://projectpilot-ai-self.vercel.app

---

## 👩‍💻 Author

Chethana M M

Computer Science Student

CMR University
