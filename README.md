# Device Sandbox Simulator

[![Netlify Status](https://api.netlify.com/api/v1/badges/0b000000-0000-0000-0000-000000000000/deploy-status)](#)
[![Made with React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](#)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-%F0%9F%94%AE-764ABC?logo=redux&logoColor=white)](#)
[![DnD Kit](https://img.shields.io/badge/@dnd--kit-core-Drag%20%26%20Drop-5b21b6)](#)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwind-css&logoColor=white)](#)
[![Laravel](https://img.shields.io/badge/Laravel-10-FF2D20?logo=laravel&logoColor=white)](#)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

Simulate smart devices (Fan & Light) inside a sandbox. Drag devices/presets into the canvas, tweak controls, and **save reusable presets** that persist via a Laravel API.

**Live Demo:** https://device-sandbox-simulator.netlify.app/

---

## Table of Contents

- [Features](#-features)
- [Screens](#-screens)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Local Development](#-local-development)
  - [Backend (Laravel)](#1-backend-laravel)
  - [Frontend (React + Vite)](#2-frontend-react--vite)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Frontend Architecture](#-frontend-architecture-notes)
- [Drag & Drop Flow](#-drag--drop-dnd-kit)
- [Deployment Notes](#-deployment)
- [Testing (Manual)](#-testing-manual)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

### Device Controls
- **Light:** Power toggle, color temperature, brightness (0–100), live visual glow.
- **Fan:** Power toggle, speed (0–100), smooth spin animation with non-linear mapping.

### Presets
- Save current device state with a custom name.
- Instantly apply presets (sidebar click or drag-and-drop).
- **Optimistic UI:** Preset appears immediately; reconciled after API response.

### Drag & Drop
- Devices & presets in the sidebar are draggable.
- The Welcome canvas is a droppable zone that loads or routes to the device.

### Persistence
- Presets stored in **MySQL** and served via **Laravel REST API**.

### Clean Architecture
- Reusable UI components (Button, Input, Modal, Toast, DeviceSwitch).
- Modular **Redux slices** (`fan`, `light`, `global`) built on a shared device slice base.

---

##  Screens

- **Sidebar:** device shortcuts + saved presets  
- **Topbar:** context actions (Clear, Save Preset)  
- **Testing Canvas:** droppable workspace for devices & presets

---

## 🧰 Tech Stack

- **Frontend:** React (Vite), Redux Toolkit, `@dnd-kit/core`, Tailwind CSS, Axios
- **Backend:** Laravel (PHP 8.2), MySQL 8
- **Infra/Deploy:** Netlify (frontend), EC2 Instance (Ubuntu) (backend)

---

## 🏗️ Project Structure

```
repo-root/
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ sandbox/       # Sidebar, Topbar, WelcomeScreen
│  │  │  └─ ui/            # Button, Input, Modal, Toast, etc.
│  │  ├─ pages/            # FanSandbox, LightSandbox, Welcome
│  │  ├─ redux/
│  │  │  ├─ fan/
│  │  │  ├─ light/
│  │  │  ├─ global/
│  │  │  └─ shared/        # deviceSliceBase, thunks, toastSlice
│  │  └─ services/         # apiService, presetService
│  └─ ...
└─ backend/
   ├─ app/
   │  ├─ Http/Controllers/Api/
   │  ├─ Models/
   │  └─ Services/Preset/
   ├─ database/
   │  ├─ migrations/
   │  └─ seeders/
   └─ routes/api.php
```

---

##  Local Development

### 1) Backend (Laravel)

```bash
cd device-sandbox-backend
cp .env.example .env
composer install
php artisan key:generate

# configure DB in .env, then:
php artisan migrate
# (optional seed)
php artisan db:seed

# run server
php artisan serve
```

**Backend `.env` keys (sample):**
```dotenv
APP_NAME="Device Sandbox API"
APP_ENV=local
APP_KEY=base64:GENERATED_KEY_HERE
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=device_sandbox
DB_USERNAME=root
DB_PASSWORD=yourpassword

# CORS: ensure your frontend origin is allowed
```

### 2) Frontend (React + Vite)

```bash
cd device-sandbox-frontend
cp .env.example .env
npm install
npm run dev
# open http://localhost:5173
```

**Frontend `.env` (sample):**
```dotenv
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

---

## 🔐 Environment Variables

- **Frontend:** `VITE_API_BASE_URL` → points to your Laravel API base (e.g., `http://127.0.0.1:8000/api/v1` or production API URL).
- **Backend:** Standard Laravel `.env` for APP/DB; configure CORS to allow the Netlify domain in production.

---

## 🗃️ Database Schema

**Table: `presets`** — stores each preset with embedded device configuration in a JSON column.

| Column     | Type           | Notes                          |
|------------|----------------|--------------------------------|
| id         | BIGINT PK      | Auto increment                 |
| name       | VARCHAR(255)   | Preset name                    |
| device     | JSON           | e.g., `{ "type": "fan", ... }` |
| created_at | TIMESTAMP      | Managed by Laravel             |
| updated_at | TIMESTAMP      | Managed by Laravel             |

**Example device JSON values:**

**Fan:**
```json
{
  "type": "fan",
  "name": "Fan",
  "settings": { "power": true, "speed": 75 }
}
```

**Light:**
```json
{
  "type": "light",
  "name": "Light",
  "settings": { "power": true, "brightness": 60, "color": "#FFE5B4" }
}
```

**SQL Dump:**
```sql
CREATE TABLE `presets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `device` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `presets` (`name`, `device`, `created_at`, `updated_at`) VALUES
('Cool Breeze', JSON_OBJECT('type','fan','name','Fan','settings', JSON_OBJECT('power', true, 'speed', 60)), NOW(), NOW()),
('Warm Glow',  JSON_OBJECT('type','light','name','Light','settings', JSON_OBJECT('power', true, 'brightness', 70, 'color', '#FFE5B4')), NOW(), NOW());
```

---

## API Reference

**Base URL:** `${VITE_API_BASE_URL}` (e.g., `http://127.0.0.1:8000/api/v1`)

### `GET /presets`
Fetch presets.

**Query params**
- `type` (optional): `fan` or `light`  
  _when omitted: returns all presets_

**Response**
```json
{
  "status": "success",
  "message": "Presets fetched successfully",
  "data": [
    {
      "id": 2,
      "name": "Cool Breeze",
      "device": {
        "type": "fan",
        "name": "Fan",
        "settings": { "power": true, "speed": 60 }
      },
      "created_at": "2025-11-05T07:24:42.000000Z",
      "updated_at": "2025-11-05T07:24:42.000000Z"
    }
  ]
}
```

**cURL**
```bash
curl "http://127.0.0.1:8000/api/v1/presets?type=fan"
curl "http://127.0.0.1:8000/api/v1/presets"
```

### `POST /presets`
Create a new preset.

**Request Body**
```json
{
  "name": "Bedroom Chill",
  "device": {
    "type": "fan",
    "name": "Fan",
    "settings": { "power": true, "speed": 45 }
  }
}
```

**Success**
```json
{
  "status": "success",
  "message": "Preset saved successfully",
  "data": {
    "id": 7,
    "name": "Bedroom Chill",
    "device": {
      "type": "fan",
      "name": "Fan",
      "settings": { "power": true, "speed": 45 }
    },
    "created_at": "2025-11-05T13:15:00.000000Z",
    "updated_at": "2025-11-05T13:15:00.000000Z"
  }
}
```

**Validation Errors**
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": { "name": ["The name field is required."] }
}
```

---

##  Frontend Architecture Notes

### Redux Slices
`fanSlice` & `lightSlice` extend a shared `createDeviceBase`:

- **Common state:** `isOn`, `showActions`, `showModal`, `presets`, `activePresetId`, `activeTab`, `loading`, `error`.
- **Device-specific reducers:** `setSpeed`, `setBrightness`, `setColor`, etc.
- `applyPreset(preset)` applies settings and marks preset active.

### Thunks
- `getPresets(deviceType)`  
  `deviceType = "fan" | "light"`; if empty, fetch all for home screen.
- `savePresetOptimistic(deviceType)`  
  - **Pending:** push temp preset and mark active.  
  - **Fulfilled:** replace temp with server preset, keep active.  
  - **Rejected:** rollback temp and active id if needed.  
  - Also dispatches toast notifications.

### Optimistic UI Strategy
On “Save Preset”, generate a `tempId` and push `{ id: tempId, ..., isTemp: true }`.  
UI uses the temp item immediately (no flicker).  
When API returns, replace the temp by id and keep `activePresetId` in sync.  
On error, remove temp & show a toast.

---

## Drag & Drop (DnD Kit)

- Sidebar items (devices & presets) are draggable **sources**.
- The welcome canvas is a **droppable** target.
- When a **device** is dropped → navigate to its route (`/fan` or `/light`).  
- When a **preset** is dropped → apply to the matching device slice and (optionally) navigate.

---

## Deployment

**Frontend: Netlify**
- Build command: `npm run build`
- Publish directory: `frontend/dist` (if building from monorepo, set base)
- Env: `VITE_API_BASE_URL` → production API URL

**Backend: AWS EC2 / VPS**
- PHP 8.2+, Nginx/Apache, MySQL
- Set correct `APP_URL` & CORS
- `php artisan migrate --force`
- Secure `.env` and storage permissions

---

## Testing (Manual)

- `GET /presets` with and without `type` to verify filtering.
- Create presets for both devices; confirm they appear in the sidebar without reload (**optimistic**).
- Apply a preset: device panel reflects settings instantly.
- Drag a preset into the canvas: loads configuration.

---

## Author

**Sadman Sakib (Sami)** — Software Engineer  
**Live App:** https://device-sandbox-simulator.netlify.app/  

