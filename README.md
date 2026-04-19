# SleepObserver

**SleepObserver** is a full-stack web application for tracking and analyzing sleep quality using biometric data collected from a wearable device (the SleepObserver Watch or Band). The app processes sensor readings — heart rate, body movement, temperature, and sound — to classify sleep stages, score sleep quality, and present the results through an interactive dashboard.

Project Deployed and Live at: https://sleepobserver.onrender.com
Note: Account for testing: tigrana334@gmail.com | 123456

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Sleep Analysis Logic](#sleep-analysis-logic)
- [Firebase Setup](#firebase-setup)
- [Pages & Components](#pages--components)
- [Email Templates](#email-templates)
- [Screenshots](#screenshots)

---

## Features

- **Sleep Tracking** — Collects heart rate (BPM), body acceleration, skin temperature, and microphone data from the wearable
- **Sleep Stage Classification** — Classifies each reading into N1 (Light), N2 (Deeper), N3 (Deep), or REM sleep
- **Sleep Quality Scoring** — Generates a 0–10 score based on wake-ups, snoring, heart rate, and movement
- **Interactive Dashboard** — Displays sleep duration, quality score, cycle breakdown, and BPM trends with charts
- **3D Watch Preview** — Animated 3D model of the wearable rendered on the landing page using WebGL
- **User Authentication** — Email/password login and signup via Firebase Authentication
- **Support Tickets** — Contact form that sends support emails via the Resend API
- **Responsive UI** — Tailwind CSS with Framer Motion animations throughout

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18.2.0 | UI framework |
| TypeScript | 4.9.5 | Type safety |
| React Router | 6.16.0 | Client-side routing |
| Tailwind CSS | 3.3.3 | Styling |
| Framer Motion | 11.0.8 | Animations & transitions |
| Recharts | 2.10.3 | Pie charts & bar charts |
| React Three Fiber | 8.15.10 | 3D rendering (WebGL) |
| @react-three/drei | — | 3D helpers (camera, controls, environment) |
| @react-three/postprocessing | — | Bloom & chromatic aberration effects |
| Lottie React | 2.4.0 | JSON-based animations |
| Firebase | 10.6.0 | Authentication (client-side) |
| React Icons | 4.11.0 | SVG icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js / Express | 4.16.1 | REST API server |
| Firebase Admin SDK | — | Firestore database access & Auth |
| Resend | 3.2.0 | Transactional email delivery |
| React Email | 2.1.0 | Email template rendering |
| Morgan | — | HTTP request logging |
| CORS | — | Cross-origin request handling |

---

## Project Structure

```
SleepObserver/
├── api/                        # Express.js backend
│   ├── app.js                  # App entry point, middleware setup
│   ├── bin/www                 # HTTP server startup (port 9000)
│   ├── calculations/
│   │   └── calculate.js        # Core sleep analysis logic
│   ├── email/
│   │   ├── ResetPasswordEmail.tsx  # Password reset email template
│   │   └── TicketEmail.tsx         # Support ticket email template
│   ├── routes/
│   │   ├── firebase.js         # Auth & Firestore routes
│   │   ├── resend.js           # Email sending routes
│   │   ├── index.js            # Root route
│   │   └── test.js             # Health check route
│   ├── views/                  # Jade/Pug view templates
│   └── package.json
│
└── client/                     # React TypeScript frontend
    ├── public/
    │   └── assets/
    │       └── 3d/
    │           ├── watchButBetter.glb  # 3D watch model
    │           └── hdr.exr             # HDR environment map
    ├── src/
    │   ├── App.tsx             # Root component & route definitions
    │   ├── pages/
    │   │   ├── Home.tsx        # Landing page
    │   │   ├── Dashboard.tsx   # Sleep data dashboard (protected)
    │   │   └── SignUp.tsx      # User registration page
    │   ├── components/
    │   │   ├── Login.tsx           # Login modal
    │   │   ├── DashPie.tsx         # Sleep cycle pie chart
    │   │   ├── FBPMDashBarChart.tsx # BPM bar chart
    │   │   ├── FCycleDashBarChart.tsx # Sleep cycle bar chart
    │   │   ├── FDashTab.tsx        # Single stat display tab
    │   │   ├── FButton.tsx         # Reusable CTA button
    │   │   ├── FHomeBTN.tsx        # Scroll-to-top floating button
    │   │   ├── FPromise.tsx        # Marketing feature section
    │   │   ├── Guarantee.tsx       # Static guarantee section
    │   │   ├── WatchDisplay.tsx    # Three.js canvas wrapper
    │   │   └── WatchModel.tsx      # 3D watch model loader
    │   └── assets/
    │       ├── animations/     # Lottie JSON animation files
    │       └── images/         # Icons and watch step images
    └── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** v16+ and **npm**
- A **Firebase** project with Authentication and Firestore enabled
- A **Resend** account for email sending

### Backend Setup

```bash
cd api
npm install
```

Create a `.env` file in the `api/` directory (see [Environment Variables](#environment-variables)), then start the server:

```bash
npm start
```

The API server runs on **http://localhost:9000**.

### Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory (see [Environment Variables](#environment-variables)), then start the development server:

```bash
npm start
```

The frontend runs on **http://localhost:3000**.

To create a production build:

```bash
npm run build
```

---

## Environment Variables

### Backend — `api/.env`

```env
RESEND_API=your_resend_api_key
FIREBASE_API=your_firebase_web_api_key
```

### Frontend — `client/.env`

```env
REACT_APP_firebase_api_key=your_firebase_web_api_key
REACT_APP_messaging_sender_id=your_firebase_messaging_sender_id
REACT_APP_firebase_app_id=your_firebase_app_id
REACT_APP_resend_api_key=your_resend_api_key
```

> **Never commit `.env` files to version control.** These files are listed in `.gitignore`.

---

## API Reference

All endpoints are served from `http://localhost:9000`.

### Authentication & User Data

#### `POST /firebase/userLogin`
Authenticates a user with email and password.

**Request body:**
```json
{ "mail": "user@example.com", "password": "secret" }
```

**Response:** User UID string on success, Firebase error code on failure.

---

#### `POST /firebase/userSignup`
Creates a new Firebase user account.

**Request body:**
```json
{ "mail": "user@example.com", "password": "secret" }
```

**Response:** New user UID string on success, Firebase error code on failure.

---

#### `GET /firebase/userLogout`
Signs out the currently authenticated user.

**Response:** `"OK"` on success, error object on failure.

---

#### `POST /firebase/getUserInfo`
Retrieves a user's profile data from Firestore.

**Request body:**
```json
{ "uid": "abc123" }
```

**Response:**
```json
{ "firstName": "John", "lastName": "Doe" }
```

---

#### `POST /firebase/getCalculatedData`
Fetches raw watch sensor data for a user from Firestore, runs the sleep analysis algorithm, and returns the results.

**Request body:**
```json
{ "uid": "abc123" }
```

**Response:**
```json
{
  "duration": { "hours": 7, "minutes": 34 },
  "sleepQuality": 8,
  "cycleData": {
    "cycles": ["n1", "n2", "n3", "rem", "..."],
    "cycleTime": ["22:30", "22:45", "..."],
    "cycleTotals": { "n1": 1.2, "n2": 2.5, "n3": 1.8, "rem": 2.0 }
  },
  "bpm": [55, 48, 43, 57, "..."],
  "timeStamps": ["22:30", "22:45", "..."]
}
```

---

### Email

#### `POST /resend/new-ticket`
Sends a support ticket email to the administrator.

**Request body:**
```json
{ "name": "Jane Doe", "mail": "jane@example.com", "message": "I need help with..." }
```

**Response:** Resend API response object.

---

### Health Check

#### `GET /test/`
Returns `"API is working correctly!"` — use this to verify the server is running.

---

## Sleep Analysis Logic

The core algorithm lives in `api/calculations/calculate.js`. It processes arrays of biometric sensor readings collected during a sleep session.

### Sleep Stage Classification

Each data point is classified into a sleep stage based on BPM:

| BPM Range | Sleep Stage |
|---|---|
| ≥ 60 | Awake |
| 50 – 59 | N1 — Light Sleep |
| 40 – 49 | N3 — Deep Sleep |
| ~55 | REM Sleep |

Temperature readings are also factored in alongside BPM to improve classification accuracy.

### Sleep Quality Score (0–10)

The score starts at 10 and deductions are applied:

| Condition | Deduction |
|---|---|
| 1–2 wake-ups detected | −1 |
| More than 2 wake-ups | −3 |
| Snoring detected (microphone active ≥ 50% of session) | −1 |
| Elevated average BPM (> 50) during sleep | −2 |
| Excessive movement (acceleration active ≥ 50% of session) | −2 |

### Output

The function returns an object used by the dashboard to populate all charts and stat tabs:

- **duration** — Total sleep time in hours and minutes
- **sleepQuality** — Numeric score 0–10
- **cycleData** — Per-cycle classification, timestamps, and totals per stage
- **bpm** — Array of BPM readings over time
- **timeStamps** — Array of timestamps corresponding to each reading

---

## Firebase Setup

SleepObserver uses **Firebase Authentication** for user login/signup and **Cloud Firestore** for storing user and sensor data.

### Firestore Collections

#### `user_data`
Stores user profile information. Document ID is the user's Firebase UID.

```
user_data/{uid}
  ├── firstName: string
  └── lastName: string
```

#### `watch_data`
Stores raw sensor readings from the wearable. Document ID is the user's Firebase UID.

```
watch_data/{uid}
  ├── bpm: number[]           # Heart rate readings
  ├── acceleration: number[]  # Body movement readings
  ├── thermometer: number[]   # Skin temperature readings
  ├── microphone: number[]    # Sound level readings
  └── timestamp: string[]     # Reading timestamps
```

### Required Firebase Services

- **Authentication** — Enable Email/Password provider
- **Cloud Firestore** — Create the two collections above

---

## Pages & Components

### Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with hero, 3D watch, feature sections, and contact form |
| `/dashboard` | Dashboard | Protected sleep data dashboard (requires login) |
| `/signup` | Sign Up | New user registration form |

### Key Components

| Component | Description |
|---|---|
| `Login.tsx` | Modal login form with Firebase authentication |
| `DashPie.tsx` | Recharts pie chart showing N1/N2/N3/REM distribution |
| `FBPMDashBarChart.tsx` | Recharts bar chart of BPM readings over time |
| `FCycleDashBarChart.tsx` | Recharts bar chart of sleep cycle durations |
| `FDashTab.tsx` | Glassmorphism stat card (title + value) |
| `WatchDisplay.tsx` | React Three Fiber canvas with post-processing effects |
| `WatchModel.tsx` | Loads and renders `watchButBetter.glb` |
| `FPromise.tsx` | Marketing section with Lottie animation (guarantee / support / safety) |
| `FButton.tsx` | Animated CTA button with dark/light/shadow variants |

---

## Email Templates

Both templates are built with **React Email** and rendered server-side before sending via Resend.

- **`ResetPasswordEmail.tsx`** — Delivers a one-time secret code for password resets. Dark theme with monospace typography.
- **`TicketEmail.tsx`** — Notifies the administrator of a new support ticket, including the sender's name, email, and message body.

---

## License

This project is proprietary. All rights reserved.
