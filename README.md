# Sensor Monitoring Dashboard

A **Laravel + React monorepo** application for monitoring IoT-style sensor events in real time.  
The frontend is built with **React (Vite + MUI + Jotai)**, while the backend is powered by **Laravel with WebSockets (Reverb)**.

It provides:

- Real-time **sensor event logging**
- **Anomaly detection & alerting**
- **Authentication** (basic register/login)
- A **Sensor Simulator UI** for generating test events

---

## 📦 Tech Stack

- **Backend**: Laravel, Reverb (WebSockets), Composer
- **Frontend**: React, Vite, Material-UI, Jotai (state management)
- **Realtime**: Laravel Echo + Reverb

---

## 🚀 Setup Instructions

### 1. Clone and install dependencies

```bash
git clone https://github.com/ChrisEarlAmar/tlmbhy-cea-assessment
cd tlmbhy-cea-assessment

# Backend dependencies
composer install

# Frontend dependencies
npm install
```

---

### 2. Environment setup

Copy the example `.env` and configure your environment:

```bash
cp .env.example .env
```

Then generate the app key:

```bash
php artisan key:generate
```

---

### 3. Database setup

Run migrations:

```bash
php artisan migrate
```

---

### 4. Build frontend or run in dev mode

For development (hot reload):

```bash
npm run dev
```

For production build:

```bash
npm run build
```

---

### 5. Run Laravel server + WebSockets

Start Laravel with Reverb (WebSockets):

```bash
php artisan reverb:start --debug
```

---

### 6. Authentication

This project uses **basic auth**:

- First, **register a new user**
- Then, **login** to access the dashboard

---

### 7. Sensor Simulator

The project includes a **Sensor Simulator page** for generating events.

- Open the **Simulator page** in a tab.
- You can **spawn as many simulators as you want**, each dispatching **random sensor data**.
- Each simulator instance continuously pushes fake events to the system.
- Keep the Simulator page open while testing — closing it stops the simulators.

Without at least one simulator running, you won’t see new events or alerts in the dashboard.

---

## 📊 Features

### Dashboard

- Real-time feed of **sensor events** (latest at the top)
- **Alerts panel** with severity levels:
    - 🔴 **Critical**
    - 🟠 **Warning**
    - 🔵 **Info**
- Alerts show sensor info (ID, floor, room) and human-readable timestamps
- Events and alerts both scrollable with most recent entries on top

### Anomaly Detection Rules

- **Temperature**
    - Sudden change >5°C within 2 minutes → Critical
    - Out of 18–26°C range for >10 minutes → Warning
- **Motion**
    - No motion during office hours (9–5) for >30 minutes → Info
    - Unusual motion after 10PM on weekdays → Warning
- **Alert Rate Limiting**
    - Max 1 alert per sensor every 5 minutes

### State Management

- **Global atoms (Jotai)** for events, alerts, and sensor state
- WebSocket listener in a **custom hook** (`useSensorEvents`) that keeps running even if dashboard page unmounts

---

## 🛠️ Development Notes

- Monorepo setup: **Laravel (backend) + React (frontend)** using Vite plugin
- WebSocket channel: `sensor-event`
- Event name: `.SensorEvent`
- Alerts are prepended so **latest always appears first**
- Rate-limiting prevents duplicate alerts

---

## ✅ Future Improvements

- Add **charts/graphs** (e.g., temperature trends)
- Add **filtering/search** in dashboard
- Persist alerts/events to DB for history
- Configurable thresholds per sensor (instead of hardcoded rules)

---

👉 Quick Workflow to Demo:

1. Run `composer install && npm install`
2. Copy `.env.example` → configure DB + Reverb
3. Run `php artisan migrate`
4. Start `npm run dev` and `php artisan reverb:start --debug`
5. Register + login
6. Open **Simulator page** → add simulators
7. Open **Dashboard page** → see live events + alerts
