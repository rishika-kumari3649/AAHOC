# AAHOC — AI-Assisted Hospital Operations Coordinator

AAHOC is a modern, modular hospital operations platform designed to coordinate patient flow, clinical tasks, resource utilization, and operational intelligence with human-supervised AI assistance.

---

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Repository Architecture**: Monorepo

---

## Project Structure

```
AAHOC/
├── frontend/             # Single React app with role-based panels
│   ├── src/
│   │   ├── assets/       # Static assets, branding, and icons
│   │   ├── components/   # Reusable UI components & layouts
│   │   ├── layouts/      # Role-based shell layouts (Admin, Ops, Doctor, etc.)
│   │   ├── pages/        # Route page placeholders across all roles
│   │   ├── features/     # Domain feature modules
│   │   ├── routes/       # React Router central route configuration
│   │   ├── services/     # API and backend integration layer
│   │   ├── hooks/        # Custom React hooks
│   │   ├── store/        # State management foundation
│   │   ├── types/        # TypeScript types & interfaces
│   │   ├── utils/        # Helper functions
│   │   ├── App.tsx       # Root application component
│   │   └── main.tsx      # Application entrypoint
├── backend/              # Express + TypeScript Modular Monolith
│   ├── src/
│   │   ├── modules/      # Domain modules (Patients, Beds, Operations, etc.)
│   │   │   └── ai/       # Decoupled AI coordination engine
│   │   ├── config/       # Environment & server configuration
│   │   ├── middleware/   # Request guards, auth & error handlers
│   │   ├── utils/        # Shared backend utilities
│   │   └── server.ts     # Express server entrypoint
├── prisma/               # Database Foundation
│   └── schema.prisma     # Prisma PostgreSQL schema
├── docs/                 # Architectural documentation
│   └── architecture.md   # System architecture & AI workflow specification
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore specification
├── package.json          # Root monorepo workspace configuration
└── README.md             # Project documentation
```

---

## Role-Based Panels

The frontend is unified within a single React application featuring distinct panels:

- **Admin Panel**: Manage hospital system, users, departments, beds, audit logs, and settings.
- **Operations Panel**: Core AAHOC intelligence dashboard, bed capacity, patient flow, queues, AI recommendations, and approvals.
- **Doctor Panel**: Clinical queue, patient charts, prescriptions, and lab orders.
- **Nurse Panel**: Assigned patients, vitals recording, tasks, and alerts.
- **Reception Panel**: Patient registration, appointment scheduling, and admissions.
- **Laboratory Panel**: Test orders, sample collection, and lab results.
- **Pharmacy Panel**: Prescription fulfillment, medicine catalog, and inventory.
- **Billing Panel**: Invoices and payment tracking.
- **Patient Panel**: Self-service appointments, medical history, lab reports, and invoices.

---

## Getting Started

### Prerequisites
- Node.js (v20+)
- npm or yarn

### Installation
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Running Locally
```bash
# Frontend development server
npm --workspace=frontend run dev

# Backend development server
npm --workspace=backend run dev
```