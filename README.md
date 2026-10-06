# GYM CORE — Premium Fitness & Strength Platform

> **Location:** Neota / Mahindra World City SEZ / Kalwada, Jaipur, Rajasthan, India  
> **Brand Creed:** Strength. Discipline. Consistency. Results.  
> **Tagline:** BUILD STRONG. LIVE STRONGER.

---

## ⚡ Quick Start & Development

```bash
# Navigate to project folder
cd "C:\Users\SATNAM TOWER\.gemini\antigravity\scratch\gym-core"

# Install dependencies (already installed)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

* **Local App URL:** [http://localhost:5173/](http://localhost:5173/)
* **Local Network (Mobile/Tablet Testing):** `http://192.168.29.88:5173/`

---

## 🔐 Demo Credentials & Instant Role Switcher

You can test any role directly via **1-Click Quick Switch** on the [`/login`](http://localhost:5173/login) screen or in the top navigation bar:

| Role | Email | Password | Primary Route | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Admin** | `admin@gymcore.in` | `password123` | `/admin/dashboard` | Full facility control, payment auditing, turnstile scanner, trial approvals, plan editor |
| **Trainer** | `vikram.singh@gymcore.in` | `password123` | `/trainer/dashboard` | Assigned athlete roster, workout routine builder, diet matrix, appointment management |
| **Member** | `aman.verma@example.com` | `password123` | `/member/dashboard` | Digital RFID QR pass, push-pull-legs splits, macro tracker, biometric progress, UPI receipts |

---

## 🗺️ Complete Route Architecture

### Public Website
* `/` — Cinematic Hero, stats counters, 9 training programs, membership plans, coaches, AI assistant, 6 calculators, transformations, reviews, facility gallery, free trial CTA, Neota Jaipur location map & WhatsApp
* `/about` — The Iron Philosophy, Eleiko equipment, certified coaching, Jaipur community
* `/programs` — 9 detailed programs (Muscle Building, Fat Loss, Powerlifting 1RM, Bodybuilding Pro, Strength & Conditioning, Beginner Foundation, Athlete Conditioning, Personal Training, Women's Strength)
* `/membership` — Membership tier comparison + dynamic UPI payment flow
* `/trainers` — Senior coaches, credentials, certifications, client rosters & direct booking
* `/calculators` — 6 functional interactive calculators (BMI, BMR Mifflin-St Jeor, TDEE/Calories, Body Fat % US Navy formula, Ideal Weight, 1RM Brzycki & Epley)
* `/gallery` — Filterable high-res media (Interior, Equipment, Trainers, Members, Events)
* `/transformations` — Before/After case studies with verified weight & body fat metrics
* `/reviews` — Verified Google & turnstile member reviews with live submission modal
* `/free-trial` — 1-Day All-Access Pass instant booking flow with unique booking pass code
* `/contact` — Neota / Kalwada / Mahindra SEZ directions, interactive map, WhatsApp & email desk
* `/login` — Secure role login + 1-click demo switcher
* `/register` — Complete athletic onboarding form

### Member Portal (`/member/*`)
* `/member/dashboard` — Turnstile status, digital pass, attendance streak, next coaching session
* `/member/workout` — Push-pull-legs split, exercise cues, sets, reps, rest timers
* `/member/diet` — Assigned meal plans, macro breakdown (Protein, Carbs, Fats), hydration tracker
* `/member/progress` — Biometric tracking charts (Weight, Body Fat %, Chest, Arms, Waist, Thighs)
* `/member/attendance` — Dynamic QR check-in pass, monthly % attendance badge, check-in history
* `/member/payments` — UPI transaction history, invoice downloads, membership countdown
* `/member/book-trainer` — Personal coach slot selector and booking confirmation

### Trainer Portal (`/trainer/*`)
* `/trainer/dashboard` — Overview of athletes, today's schedule, quick routine builder
* `/trainer/members` — Member directory with health logs and assigned protocols
* `/trainer/workouts` — Interactive workout program designer
* `/trainer/diet` — Nutritional protocol and meal planner
* `/trainer/appointments` — Personal training appointments calendar and approvals

### Admin Command Center (`/admin/*`)
* `/admin/dashboard` — Live revenue, active member count, today's check-ins, trial requests
* `/admin/members` — Member directory, disable/enable turnstile permissions, manual check-in
* `/admin/memberships` — Create/edit subscription plans, pricing, durations, features
* `/admin/payments` — Complete UPI transaction ledger, UTR audit, invoice records
* `/admin/trainers` — Coach roster management, certifications, slot capacity
* `/admin/attendance` — QR check-in scanner + manual turnstile logger with duplicate prevention
* `/admin/bookings` — Free trial pass and trainer appointment approvals
* `/admin/workouts` — Master exercise and split blueprint library
* `/admin/diet` — Master nutrition templates
* `/admin/reviews` — Social proof moderation queue (reviews & transformations)
* `/admin/gallery` — Media asset management
* `/admin/notifications` — Facility-wide broadcast system

---

## 🛠️ Technology Stack

* **Framework:** React 19 + TypeScript + Vite
* **Styling:** Tailwind CSS v4 (Dark Theme default, Light Theme support)
* **Routing:** React Router DOM v7
* **Icons:** Lucide React
* **Micro-interactions:** Canvas Confetti, CSS keyframe glows, smooth transitions
* **State Management:** React Context API with LocalStorage caching (`AuthContext`, `GymDataContext`, `ThemeContext`)

---

## 🔌 Production Integrations Architecture

1. **UPI Gateway:**
   - Standard UPI deep link format implemented: `upi://pay?pa=gymcore@icici&pn=GYM+CORE&am={amount}&cu=INR`
   - Easily connects to Razorpay UPI, Cashfree, or PhonePe PG by replacing `processPayment` in `GymDataContext.tsx`.

2. **AI Fitness Assistant:**
   - Client-side heuristic rules engine pre-configured in `AiAssistantModal.tsx`.
   - Ready for Google Gemini API integration by plugging the prompt schema into `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`.

3. **QR Turnstile Scanner:**
   - Dynamic member token generation in `QrCodePass.tsx` with duplicate check prevention in `GymDataContext.tsx`.
   - Ready to connect to hardware turnstiles or mobile webcam scanners via HTML5 QR reader.
