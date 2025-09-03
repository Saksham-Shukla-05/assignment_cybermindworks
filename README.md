# Job Management Backend

This is the backend server for the **Job Management Admin Interface**, built with **Node.js, Express, and MongoDB**.  
It provides RESTful APIs for creating, retrieving, and filtering job listings, with validation handled by **Zod**.

---

## 📦 Installation, Setup & Usage

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd server

# 2. Install dependencies
npm install

# 3. Setup environment variables
# Copy the example file and update values
cp .env.example .env
# (On Windows PowerShell: copy .env.example .env)


# 4. Run the development server
npm run dev

# 5. Run in production
npm start

# --------------------------
# 📌 API Endpoints
# --------------------------

# Base URL (local): http://localhost:4000/api
# Base URL (production): https://assignment-cybermindworks.onrender.com/api

# GET /jobs → Get all jobs (with optional filters)
curl "http://localhost:4000/api/jobs?location=Chennai&jobType=Contract"

# POST /jobs/create → Create a new job
curl -X POST http://localhost:4000/api/jobs/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Full Stack Developer",
    "companyName": "CyberMindWorks",
    "location": "Chennai",
    "jobType": "Contract",
    "salaryRange": { "min": 50000, "max": 80000 },
    "description": "Develop and maintain full-stack applications using the MERN stack.",
    "requirements": ["JavaScript", "React", "Node.js", "MongoDB"],
    "responsibilities": ["Build features", "Fix bugs", "Write tests"],
    "applicationDeadline": "2025-09-20"
  }'

# --------------------------
# ⚙️ Tech Stack
# --------------------------
Backend: Node.js, Express
Database: MongoDB, Mongoose
Validation: Zod

# --------------------------
# 👨‍💻 Author
# --------------------------
Saksham Shukla
```
