# AAHOC Architecture Documentation
## AI-Assisted Hospital Operations Coordinator

### 1. System Overview
AAHOC is an AI-assisted operational intelligence and coordination platform for healthcare facilities. It integrates clinical workflow support, patient journey management, bed allocation, and resource optimization while keeping artificial intelligence in a supervised, recommendation-first paradigm.

### 2. High-Level Technology Stack
- **Frontend**: React 18+, TypeScript, Vite, Tailwind CSS, React Router v6+
  - Architecture: Single React Application with Role-Based Panels
- **Backend**: Node.js, Express, TypeScript
  - Architecture: Domain-driven modular monolith
- **Database**: PostgreSQL with Prisma ORM
- **Repository**: Clean monorepo structure

### 3. Frontend Role-Based Panels
AAHOC uses a single unified frontend application with distinct, role-secured panels:

1. **Admin Panel** (Hospital Management):
   - Dashboard, Patients, Doctors, Staff, Departments, Appointments, Admissions, Beds, Reports, Audit Logs, Settings.
2. **Operations Panel** (Core AAHOC Intelligence Dashboard):
   - Dashboard, Patient Flow, Beds & Capacity, Resources, Emergency Queue, Alerts, AI Recommendations, Approvals.
3. **Doctor Panel**:
   - Dashboard, Patients, Appointments, Clinical Records, Prescriptions, Lab Orders.
4. **Nurse Panel**:
   - Dashboard, Assigned Patients, Vitals, Nursing Tasks, Alerts.
5. **Reception Panel**:
   - Dashboard, Patient Registration, Appointments, Admissions.
6. **Laboratory Panel**:
   - Dashboard, Test Orders, Samples, Results.
7. **Pharmacy Panel**:
   - Dashboard, Prescriptions, Medicines, Inventory.
8. **Billing Panel**:
   - Dashboard, Invoices, Payments.
9. **Patient Panel**:
   - Dashboard, Appointments, Medical Records, Prescriptions, Lab Reports, Bills.

### 4. AI Pipeline Architecture
The AI subsystem (`backend/src/modules/ai/`) is designed as a distinct, decoupled decision-support pipeline:

```
[Operational Trigger / Event]
            │
            ▼
       [AI Agent]
            │
            ▼
    [Context / State]
            │
            ▼
  [Reasoning / Decision]
            │
            ▼
    [Tools + Knowledge]
            │
            ▼
       [Evaluation]
            │
            ▼
     [Recommendation]
            │
            ▼
     [Human Approval]  ◄── Mandatory Human-in-the-Loop Gate
            │
            ▼
   [Authorized Action]
            │
            ▼
        [Logging]
```

#### AI Module Subdirectories:
- `agent/`: Orchestration and execution core
- `context/`: Runtime state and situational context assembly
- `reasoning/`: Decision evaluation and clinical operational logic
- `tools/`: Deterministic tools (capacity calculators, schedule solvers)
- `knowledge/`: Clinical and hospital protocol knowledge bases
- `recommendations/`: Structured operational guidance generators
- `approvals/`: Human-in-the-loop authorization gates
- `actions/`: Dispatched safe actions executed post-approval

### 5. Architectural Principles
- **Separation of Admin vs. Operations**: Admin manages administrative configurations and entity registries; Operations drives real-time hospital throughput and AI recommendations.
- **AI Safety & Determinism**: Recommendations require human sign-off before state-mutating actions are executed.
- **Clean Scalability**: Modular structure without premature microservice complexity.