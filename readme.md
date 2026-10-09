# Pydah AI Chat UI

A modern, responsive, reusable React + Vite + Tailwind CSS frontend interface for the **Pydah AI** backend platform.

---

## 1. Features & Architecture

* **React 18 & Vite 5:** Fast development server and optimized build pipeline.
* **Tailwind CSS:** Modern, responsive styling with PydahSoft brand accent green (`#3D6734`) and neutral surface colors (`#F1F1F1`).
* **Clean Design System:**
  * **Header:** Pydah AI branding, online readiness indicator, and "New Chat" session reset.
  * **Sidebar:** Collapsible session navigation and backend status information.
  * **Welcome Screen:** "How can I help you today?" prompt cards for quick action selection.
  * **Message Bubbles:** Distinct user vs. assistant styling with timestamps, model badges, and copy-to-clipboard functionality.
  * **Message Composer:** Multiline textarea with Enter-to-send and Shift+Enter multi-line support.
  * **Error & Retry Banners:** Graceful handling of backend connection errors, timeouts, and rate limits with retry options.
* **Decoupled API Client (`src/services/chatApi.js`):** Communicates exclusively with the Pydah AI backend (`POST /api/v1/chat`).

---

## 2. Environment Configuration

The application connects to the backend API specified by `VITE_PYDAH_AI_API_URL`.

Create a `.env` file (copied from `.env.example`):

```env
VITE_PYDAH_AI_API_URL=http://localhost:8000
```

---

## 3. Setup and Installation

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

The application will start at `http://localhost:3000`.

### Step 3: Build for Production
```bash
npm run build
```

---

## 4. Backend API Contract

The UI sends requests matching the Pydah AI backend contract:

```json
POST /api/v1/chat
Content-Type: application/json

{
  "message": "What is artificial intelligence?",
  "conversation_id": null,
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi! How can I help you today?" }
  ]
}
```

Expects response:
```json
{
  "success": true,
  "answer": "Artificial intelligence refers to...",
  "model": "nvidia/nemotron-3.5-lightning:free",
  "conversation_id": null
}
```
