# GYM CORE — Conversation & Architecture Specification

## Project Identity & Origins

This project was built from the **GYM CORE Master Architecture & Design Conversation**, creating a complete, production-grade fitness platform for **GYM CORE** located at:

**📍 Neota / Mahindra SEZ / Kalwada, Jaipur, Rajasthan, India**

### Brand Philosophy & Taglines
* **Primary Tagline:** *BUILD STRONG. LIVE STRONGER.*
* **Secondary Tagline:** *Train Hard. Build Strength. Become Your Strongest Self.*
* **Visual Aesthetic:** Premium + Hardcore + Modern (Dark Mode Default, Charcoal `#0e1117`, Matte Black `#000000`, High-Energy Accent Orange `#ff5500`).

---

## Complete Feature Matrix Built

### 1. Public Digital Experience
* **Hero Experience:** Cinematic dark hero section with video badge, fast CTAs for Membership and Free Trial, social proof, and stat counters.
* **Programs Catalog:** Strength & Hypertrophy, High-Intensity HIIT, Powerlifting & Olympic Lifting, Yoga & Athletic Mobility, Boxing & Functional Conditioning.
* **Membership Tiers:** Starter, Elite (Most Popular), Pro Athlete, and Annual Championship Pass with instant UPI checkout modal.
* **Certified Trainers:** Elite trainer bios (Aryan Thakur - Head Strength Coach, Priya Rathore - Functional Specialist, Marcus Vance - Hypertrophy Specialist), specialties, client counts, and instant booking modal.
* **Fitness Calculators Suite:**
  - One-Rep Max (1RM) Estimator
  - Basal Metabolic Rate (BMR) & Total Daily Energy Expenditure (TDEE)
  - Body Mass Index (BMI) & Category Indicator
  - Body Fat Percentage (US Navy Method)
  - Target Heart Rate Training Zones (Karvonen)
  - Daily Macronutrient Distribution
* **Free Trial Booking:** Interactive 1-day VIP pass booking with instant digital QR guest pass generation.
* **Transformations & Reviews:** Verified member before/after progress photos, weight loss / muscle gain stats, and 5-star testimonials.
* **Location & Contact:** Interactive details for the Mahindra SEZ / Neota Jaipur facility, operating hours, phone, email, and Google Maps embed placeholder.

### 2. GYM CORE Conversation & AI Coach
* **24/7 Fitness AI Chat:**
  - Natural back-and-forth conversation with the GYM CORE AI Coach.
  - Contextual domain knowledge for progressive overload, plateaus, Indian high-protein nutrition (veg & non-veg), gym timings, and facility highlights.
  - Interactive suggested prompts (quick pills).
  - Clean conversational history with typing indicators.
* **Biometric Plan Generator Wizard:**
  - Mifflin-St Jeor formula calculation based on age, gender, height, weight, activity multiplier, and goal.
  - Auto-generated weekly workout splits (3-day, 4-day, 5-6 day Push/Pull/Legs).
  - 1-click **Save to Member Dashboard** directly storing customized plans in the user's active session.

### 3. Member Portal (`/member/*`)
* **Member Dashboard:** Attendance streak, active plan summary, daily calorie target tracker, upcoming sessions, and quick actions.
* **Workout Schedule:** Interactive daily exercise list with set/rep counters, checkbox completions, rest timers, and form cues.
* **Diet & Nutrition Tracker:** Meal 1 to Meal 4 breakdown with protein/carb/fat grams, calorie calculation, and hydration progress bar.
* **Progress Tracker:** Body weight logs, body fat %, muscle mass metrics, and visual progress milestones.
* **Attendance & QR Pass:** Unique digital member QR code for contactless turnstile check-in, attendance logs, and monthly calendar streaks.
* **UPI Payments & Invoices:** Active subscription status, billing history, payment receipts, and instant plan renewals.
* **Trainer Booking:** Direct appointment scheduler with GYM CORE's personal trainers.

### 4. Trainer Portal (`/trainer/*`)
* **Trainer Dashboard:** Assigned clients, today's training sessions, pending plan reviews, and workout compliance.
* **Client Management:** Member roster, fitness goals, medical history, and attendance records.
* **Workout Builder:** Create and assign customized training routines to specific members.
* **Diet Plan Builder:** Macro allocation and customized Indian nutrition guides.
* **Appointments & Sessions:** Schedule 1-on-1 PT sessions and track completion status.

### 5. Admin Control Center (`/admin/*`)
* **Admin Dashboard:** Total revenue (₹), active members, trainer count, monthly retention rate, and live facility occupancy.
* **Member Management:** Full member directory, membership status, add/edit/suspend members.
* **Membership Plans:** Pricing plans management (Starter, Elite, Pro Athlete, Annual), discounts, and tier privileges.
* **Financial Ledger & UPI Verifications:** Transaction log, payment modes (UPI, Cards, Cash), and receipt generator.
* **Trainer Roster:** Staff management, specialization, compensation, and client assignments.
* **Biometric Attendance Scanner:** Live check-in console simulating turnstile QR badge scanning and peak hour occupancy analytics.
* **Free Trial Leads:** Lead pipeline management for guests visiting the Mahindra SEZ gym.
* **Media & Gallery Manager:** Upload, approve, and manage transformation stories and gym photos.
* **Broadcast Notifications:** Push announcements to all members, trainers, or specific tiers.

---

## Quick Persona & Demo Switcher

The top navigation bar includes an instant **Demo Role Switcher**:
* **Member Role:** `member@gymcore.in` (Vikram Sharma — Elite Member)
* **Trainer Role:** `trainer@gymcore.in` (Aryan Thakur — Head Strength Coach)
* **Admin Role:** `admin@gymcore.in` (GYM CORE Director & Superadmin)

Switching roles instantly updates all permissions, routes, and dashboard views with mock data persisted in local state.

---

## Tech Stack & Commands

| Tool | Version / Purpose |
| :--- | :--- |
| **Framework** | React 19 + TypeScript |
| **Bundler** | Vite 8 |
| **Styling** | Tailwind CSS 4 + Custom Animations |
| **Icons** | Lucide React |
| **State** | React Context (`AuthContext`, `GymDataContext`, `ThemeContext`) |
| **Effects** | Canvas-Confetti, LocalStorage persistence |

### Available Scripts
```bash
# Start development server
npm run dev

# Run TypeScript check and production build
npm run build

# Preview production build
npm run preview
```
