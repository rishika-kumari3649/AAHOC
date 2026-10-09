# AAHOC — AI-Assisted Hospital Operations Coordinator
## Project Architecture Foundation Initialized

The project foundation for **AAHOC** has been established as a clean, unified monorepo adhering strictly to the architecture specifications, role panel requirements, AI workflow pipeline, and constraints.

---

## 1. Complete Folder Tree

```text
AAHOC/
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   ├── panelConfig.ts
│   │   │   ├── PanelPlaceholder.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── features/
│   │   │   ├── admissions/
│   │   │   │   └── index.ts
│   │   │   ├── ai/
│   │   │   │   └── index.ts
│   │   │   ├── appointments/
│   │   │   │   └── index.ts
│   │   │   ├── beds/
│   │   │   │   └── index.ts
│   │   │   ├── billing/
│   │   │   │   └── index.ts
│   │   │   ├── emergency/
│   │   │   │   └── index.ts
│   │   │   ├── laboratory/
│   │   │   │   └── index.ts
│   │   │   ├── operations/
│   │   │   │   └── index.ts
│   │   │   ├── patients/
│   │   │   │   └── index.ts
│   │   │   └── pharmacy/
│   │   │       └── index.ts
│   │   ├── hooks/
│   │   │   └── index.ts
│   │   ├── layouts/
│   │   │   └── DashboardLayout.tsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminAdmissionsPage.tsx
│   │   │   │   ├── AdminAppointmentsPage.tsx
│   │   │   │   ├── AdminAuditLogsPage.tsx
│   │   │   │   ├── AdminBedsPage.tsx
│   │   │   │   ├── AdminDashboardPage.tsx
│   │   │   │   ├── AdminDepartmentsPage.tsx
│   │   │   │   ├── AdminDoctorsPage.tsx
│   │   │   │   ├── AdminPatientsPage.tsx
│   │   │   │   ├── AdminReportsPage.tsx
│   │   │   │   ├── AdminSettingsPage.tsx
│   │   │   │   └── AdminStaffPage.tsx
│   │   │   ├── auth/
│   │   │   │   └── LoginPage.tsx
│   │   │   ├── billing/
│   │   │   │   ├── BillingDashboardPage.tsx
│   │   │   │   ├── BillingInvoicesPage.tsx
│   │   │   │   └── BillingPaymentsPage.tsx
│   │   │   ├── doctor/
│   │   │   │   ├── DoctorAppointmentsPage.tsx
│   │   │   │   ├── DoctorClinicalRecordsPage.tsx
│   │   │   │   ├── DoctorDashboardPage.tsx
│   │   │   │   ├── DoctorLabOrdersPage.tsx
│   │   │   │   ├── DoctorPatientsPage.tsx
│   │   │   │   └── DoctorPrescriptionsPage.tsx
│   │   │   ├── laboratory/
│   │   │   │   ├── LaboratoryDashboardPage.tsx
│   │   │   │   ├── LaboratoryOrdersPage.tsx
│   │   │   │   ├── LaboratoryResultsPage.tsx
│   │   │   │   └── LaboratorySamplesPage.tsx
│   │   │   ├── nurse/
│   │   │   │   ├── NurseAlertsPage.tsx
│   │   │   │   ├── NurseDashboardPage.tsx
│   │   │   │   ├── NursePatientsPage.tsx
│   │   │   │   ├── NurseTasksPage.tsx
│   │   │   │   └── NurseVitalsPage.tsx
│   │   │   ├── operations/
│   │   │   │   ├── OperationsAIRecommendationsPage.tsx
│   │   │   │   ├── OperationsAlertsPage.tsx
│   │   │   │   ├── OperationsApprovalsPage.tsx
│   │   │   │   ├── OperationsBedsPage.tsx
│   │   │   │   ├── OperationsDashboardPage.tsx
│   │   │   │   ├── OperationsEmergencyQueuePage.tsx
│   │   │   │   ├── OperationsPatientFlowPage.tsx
│   │   │   │   └── OperationsResourcesPage.tsx
│   │   │   ├── patient/
│   │   │   │   ├── PatientAppointmentsPage.tsx
│   │   │   │   ├── PatientBillsPage.tsx
│   │   │   │   ├── PatientDashboardPage.tsx
│   │   │   │   ├── PatientPrescriptionsPage.tsx
│   │   │   │   ├── PatientRecordsPage.tsx
│   │   │   │   └── PatientReportsPage.tsx
│   │   │   ├── pharmacy/
│   │   │   │   ├── PharmacyDashboardPage.tsx
│   │   │   │   ├── PharmacyInventoryPage.tsx
│   │   │   │   ├── PharmacyMedicinesPage.tsx
│   │   │   │   └── PharmacyPrescriptionsPage.tsx
│   │   │   ├── reception/
│   │   │   │   ├── ReceptionAdmissionsPage.tsx
│   │   │   │   ├── ReceptionAppointmentsPage.tsx
│   │   │   │   ├── ReceptionDashboardPage.tsx
│   │   │   │   └── ReceptionRegistrationPage.tsx
│   │   │   └── LandingPage.tsx
│   │   ├── routes/
│   │   │   └── index.tsx
│   │   ├── services/
│   │   │   └── index.ts
│   │   ├── store/
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── index.ts
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── index.ts
│   │   ├── middleware/
│   │   │   └── index.ts
│   │   ├── modules/
│   │   │   ├── admissions/
│   │   │   │   └── index.ts
│   │   │   ├── ai/
│   │   │   │   ├── actions/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── agent/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── approvals/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── context/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── knowledge/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── reasoning/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── recommendations/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── tools/
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── appointments/
│   │   │   │   └── index.ts
│   │   │   ├── audit/
│   │   │   │   └── index.ts
│   │   │   ├── auth/
│   │   │   │   └── index.ts
│   │   │   ├── beds/
│   │   │   │   └── index.ts
│   │   │   ├── billing/
│   │   │   │   └── index.ts
│   │   │   ├── emergency/
│   │   │   │   └── index.ts
│   │   │   ├── laboratory/
│   │   │   │   └── index.ts
│   │   │   ├── operations/
│   │   │   │   └── index.ts
│   │   │   ├── patients/
│   │   │   │   └── index.ts
│   │   │   ├── pharmacy/
│   │   │   │   └── index.ts
│   │   │   └── users/
│   │   │       └── index.ts
│   │   ├── utils/
│   │   │   └── index.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── prisma/
│   └── schema.prisma
├── docs/
│   ├── architecture.md
│   ├── project-structure.md
│   ├── Agent Architecture.pdf
│   └── System Architecture.pdf
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 2. Frontend & Backend Initialization Confirmation

| Component | Status | Details |
| :--- | :---: | :--- |
| **Frontend** | **Confirmed** | React 18, TypeScript, Vite, Tailwind CSS, React Router (`tsc -b && vite build` passes with 0 errors). |
| **Backend** | **Confirmed** | Node.js, Express, TypeScript modular structure (`tsc` build compiles cleanly to `dist/`, verified startup on `:5000/health`). |
| **Monorepo** | **Confirmed** | Configured via root `package.json` with npm workspaces (`frontend`, `backend`). |

---

## 3. Routing Structure Confirmation

Single React application with central routing in `frontend/src/routes/index.tsx`:
- `/` — Interactive Portal Hub connecting all role panels
- `/auth/login` — Staff Authentication placeholder
- `/admin/*` — Admin panel routes wrapped in `DashboardLayout`
- `/operations/*` — Operations panel routes wrapped in `DashboardLayout`
- `/doctor/*` — Doctor panel routes
- `/nurse/*` — Nurse panel routes
- `/reception/*` — Reception panel routes
- `/laboratory/*` — Laboratory panel routes
- `/pharmacy/*` — Pharmacy panel routes
- `/billing/*` — Billing panel routes
- `/patient/*` — Patient self-service panel routes

---

## 4. Admin and Operations Panels Separation Confirmation

Admin and Operations are separated as distinct panels with dedicated roles:

* **Admin Panel** (`/admin`):
  - Manages the hospital infrastructure and entities:
  - `Dashboard`, `Patients`, `Doctors`, `Staff`, `Departments`, `Appointments`, `Admissions`, `Beds`, `Reports`, `Audit Logs`, `Settings`.

* **Operations Panel** (`/operations`):
  - Core AAHOC intelligence dashboard for real-time throughput and coordination:
  - `Dashboard`, `Patient Flow`, `Beds & Capacity`, `Resources`, `Emergency Queue`, `Alerts`, `AI Recommendations`, `Approvals`.

---

## 5. AI Module Structure Confirmation

The AI subsystem is decoupled from routine modules in `backend/src/modules/ai/` representing the supervised decision-support pipeline:

$$\text{Trigger} \longrightarrow \text{AI Agent} \longrightarrow \text{Context / State} \longrightarrow \text{Reasoning / Decision} \longrightarrow \text{Tools + Knowledge} \longrightarrow \text{Evaluation} \longrightarrow \text{Recommendation} \longrightarrow \text{Human Approval} \longrightarrow \text{Authorized Action} \longrightarrow \text{Logging}$$

### AI Module Subfolders:
- `agent/` — Execution orchestrator
- `context/` — Situational state assembly
- `reasoning/` — Clinical and operational decision logic
- `tools/` — Deterministic capacity & scheduling tools
- `knowledge/` — Hospital protocols & guidelines
- `recommendations/` — Structured guidance generator
- `approvals/` — Human-in-the-loop authorization gates
- `actions/` — Executable authorized actions

---

## 6. Prisma Foundation Confirmation

- File location: `prisma/schema.prisma`
- Configured PostgreSQL datasource and `prisma-client-js` generator.
- No domain database models have been written yet, maintaining foundation-only status.

---

## 7. Feature Logic Confirmation

- No feature logic, API routes, fake data, or full database models have been written.
- Only foundational placeholders, route definitions, layout components, and TypeScript configurations are in place.
- The project foundation setup is complete and ready for phase-wise development.

---

## 8. Development & Run Commands

| Action | From Root (`C:\GitDemo\AAHOC`) | Or from Subfolder |
| :--- | :--- | :--- |
| **Start Frontend** | `npm run dev:frontend` *(or `npm run dev`)* | `cd frontend` $\rightarrow$ `npm run dev` |
| **Start Backend** | `npm run dev:backend` | `cd backend` $\rightarrow$ `npm run dev` |
| **Build Frontend** | `npm run build:frontend` | `cd frontend` $\rightarrow$ `npm run build` |
| **Build Backend** | `npm run build:backend` | `cd backend` $\rightarrow$ `npm run build` |