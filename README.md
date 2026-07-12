#  Assetflow

> **AI-Powered QR Maintenance & Asset History Platform**

Assetflow is a modern full-stack asset management platform that provides organizations with a digital identity for every physical asset. It enables QR-based asset access, maintenance tracking, issue reporting, technician workflows, and complete maintenance history using a clean, enterprise-grade interface.

Designed for universities, schools, hospitals, factories, offices, warehouses, laboratories, hotels, and facility management companies.

---

## 📸 Preview

> Add screenshots here

| Login | Dashboard |
|--------|-----------|
| ![](docs/login.png) | ![](docs/dashboard.png) |

| Assets | Asset Details |
|---------|---------------|
| ![](docs/assets.png) | ![](docs/asset-details.png) |

---

# ✨ Features

## Authentication

- Secure Supabase Authentication
- Login
- Register
- Persistent Sessions
- Protected Routes
- Role-Based Access
- Admin & Technician Roles

---

## Dashboard

- Total Assets
- Operational Assets
- Under Maintenance
- Reported Issues
- Upcoming Services
- Recent Activity
- Maintenance Trends
- Quick Statistics

---

## Asset Management

- Create Assets
- Edit Assets
- Delete Assets
- Search Assets
- Filter Assets
- Unique Asset Codes
- Asset Categories
- Assigned Technicians
- Asset Status Tracking

---

## QR Code Integration

Every asset automatically receives its own QR Code.

Features include:

- QR Preview
- Download QR
- Print QR Label
- Copy Public Link
- Public Asset Page

---

## Public Asset Portal

Anyone can scan the QR code to access a public asset page.

Public users can:

- View Asset Information
- Check Asset Status
- View Last Service Date
- View Next Service Date
- Report Maintenance Issues

Sensitive internal information remains protected.

---

## Issue Management

- Create Issues
- Assign Technicians
- Priority Levels
- Categories
- Evidence Upload
- Status Updates
- Issue Timeline

---

## Maintenance Workflow

Complete maintenance lifecycle:

Reported

↓

Assigned

↓

Inspection

↓

Maintenance

↓

Waiting for Parts

↓

Resolved

↓

Closed

---

## Maintenance Records

Each maintenance record includes:

- Notes
- Parts Used
- Cost
- Technician
- Completion Date
- Images
- Evidence

---

## Asset History

Every important activity is permanently recorded.

Examples:

- Asset Created
- Issue Reported
- Technician Assigned
- Inspection Started
- Maintenance Completed
- Asset Operational

---

## File Storage

Powered by Supabase Storage.

Stores:

- Asset Images
- Maintenance Photos
- Issue Evidence
- User Avatars

---

## Analytics

Interactive dashboards include:

- Monthly Repairs
- Maintenance Costs
- Asset Distribution
- Issue Categories
- Technician Performance
- Asset Health Overview

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS v4
- React Router
- React Query
- React Hook Form
- Zod
- Axios
- Framer Motion
- shadcn/ui
- Lucide React
- QRCode.react
- Recharts

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- Multer
- CORS
- dotenv

---

## Database

Supabase PostgreSQL

---

## Authentication

Supabase Auth

---

## Storage

Supabase Storage

---

## Deployment

Frontend

- Vercel

Backend

- Railway / Render

Database

- Supabase

---

# 📂 Project Structure

```
Assetflow/

├── frontend/
│
│── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── context/
│   ├── routes/
│   ├── utils/
│   ├── constants/
│   ├── App.jsx
│   └── main.jsx
│
├── backend/
│
│── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── README.md
│
└── package.json
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/assetflow.git
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

# ⚙ Environment Variables

Backend

```
PORT=

SUPABASE_URL=

SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

JWT_SECRET=
```

Frontend

```
VITE_SUPABASE_URL=

VITE_SUPABASE_ANON_KEY=

VITE_API_URL=
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/profile
```

---

## Assets

```
GET /api/assets

GET /api/assets/:id

POST /api/assets

PUT /api/assets/:id

DELETE /api/assets/:id
```

---

## Issues

```
GET /api/issues

POST /api/issues

PUT /api/issues/:id

DELETE /api/issues/:id
```

---

## Maintenance

```
GET /api/maintenance

POST /api/maintenance

PUT /api/maintenance/:id
```

---

## History

```
GET /api/history/:assetId
```

---

## Uploads

```
POST /api/upload
```

---

# 🗄 Database Tables

```
profiles

assets

issues

maintenance_records

asset_history

notifications
```

---

# 🔐 Security

- Protected API Routes
- JWT Verification
- Input Validation
- Secure File Uploads
- Role-Based Authorization
- Environment Variables
- SQL Injection Protection
- XSS Protection
- CORS Configuration

---

# 📱 Responsive Design

Supports

- Desktop
- Laptop
- Tablet
- Mobile

---

# 🎨 UI Highlights

- Modern Enterprise UI
- White Theme
- Glassmorphism
- Smooth Animations
- Responsive Layout
- Premium Cards
- Interactive Charts
- Skeleton Loading
- Toast Notifications
- Beautiful Forms
- Reusable Components

---

# 🚀 Future Improvements

- AI Issue Triage
- AI Maintenance Summary
- Email Notifications
- Push Notifications
- Real-Time Updates
- Scheduled Maintenance Reminders
- Predictive Maintenance
- Multi-Organization Support
- Asset Health Scoring
- Mobile Application

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Ahmed Raza**

**BS Computer Science**

NED University of Engineering & Technology

GitHub: https://github.com/AHMED-TECH-01

LinkedIn: https://www.linkedin.com/in/ahmed-raza-0049b63a1/

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps others discover the project and supports future development.

---

## Built with using React, Express, Supabase, and modern web technologies.