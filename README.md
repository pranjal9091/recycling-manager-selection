# ♻️ Recycling Production Line Manager Selection System

A standalone system for ranking candidates using AI-driven insights, featuring a robust MySQL backend and a modern React dashboard.

## 🚀 Features
- **AI Ranking Dashboard:** Built with React, Vite, and Mantine UI.
- **Skill Heatmap:** Visual representation of candidate scores using Recharts.
- **Automated Ranking:** MySQL triggers for auto-updating rankings based on evaluations.
- **Realistic Data:** 40+ candidate profiles generated using Faker.js.

## 🛠️ Tech Stack
- **Frontend:** React, Mantine UI, Recharts
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Data Generation:** Faker.js

## 📦 Setup Instructions
1. **Database:** Create a MySQL database `recycling_hr` and run the `data.sql` script.
2. **Backend:** - Navigate to the root folder.
   - Run `npm install`.
   - Start the server with `node server.js`.
3. **Frontend:**
   - Navigate to `/frontend`.
   - Run `npm install`.
   - Run `npm run dev`.

## 🤖 AI Prompts
Evaluation rubrics for Crisis Management, Sustainability, and Team Motivation are included in `prompts.md`.
