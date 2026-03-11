# Auth Frontend (React + Vite)

A frontend authentication application built with React and Vite. It supports signup, login, forgot password, reset password, and profile update flows, with route protection using cookie-based auth state.

## Table Of Contents

1. Project Overview
2. Features
3. Tech Stack And Services Used
4. Folder Structure
5. Prerequisites
6. Environment Variables
7. How To Run The Project
8. Available NPM Scripts
9. Routes
10. Backend API Contract Used By Frontend
11. Authentication Flow
12. Common Errors And Fixes
13. Build And Preview
14. Notes And Known Gaps

## 1. Project Overview

This project is a client-side application for authentication workflows. It communicates with a backend API over HTTP and stores the auth token in browser cookies.

Main goals:

- User registration
- User login
- Forgot password flow
- Reset password flow (token based route)
- Profile update after login
- Public and protected route guards

## 2. Features

- Signup with client-side field validation
- Login with token storage in cookie
- Forgot password email trigger
- Reset password by token
- Update profile with bearer token auth
- Logout by removing auth cookie
- Protected pages for authenticated users only
- Redirect logic for already logged-in users
- Loading and error states on forms

## 3. Tech Stack And Services Used

Frontend framework:

- React 19
- React DOM 19

Build and dev tooling:

- Vite 7
- ESLint 9

Routing:

- React Router DOM 7

HTTP client and API communication:

- Axios

Authentication state storage:

- js-cookie

UI and styling:

- Tailwind CSS 4
- Custom reusable input and button components

Notifications:

- react-toastify (installed, currently minimally used)

Backend dependency (external service):

- A running authentication backend API (not included in this repository)

## 4. Folder Structure

```text
Auth/
├─ public/
├─ src/
│  ├─ Api/
│  │  └─ api.js
│  ├─ components/
│  │  ├─ button.jsx
│  │  ├─ InputField.jsx
│  │  ├─ ProtectedRoute.jsx
│  │  └─ PublicRoute.jsx
│  ├─ pages/
│  │  ├─ login.jsx
│  │  ├─ signup.jsx
│  │  ├─ ForgetPassword.jsx
│  │  ├─ resetPassword.jsx
│  │  └─ UpdateProfile.jsx
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ .env.example
├─ eslint.config.js
├─ index.html
├─ package.json
└─ vite.config.js
```

## 5. Prerequisites

Before running this project, ensure you have:

- Node.js 18+ (LTS recommended)
- npm (comes with Node.js)
- A running backend API for auth endpoints

To verify installation:

```bash
node -v
npm -v
```

## 6. Environment Variables

The frontend reads backend URL from Vite environment variables.

1. Copy example file:

```bash
cp .env.example .env
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

2. Set API base URL in .env:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Notes:

- If VITE_API_BASE_URL is missing, app falls back to http://localhost:3000/api
- Restart dev server after changing .env values

## 7. How To Run The Project

1. Open terminal in project root

```bash
cd D:\Office\react\Auth
```

2. Install dependencies

```bash
npm install
```

3. Configure environment

- Create .env (as described above)
- Ensure backend URL points to your running backend

4. Start development server

```bash
npm run dev
```

5. Open app in browser

- Usually: http://localhost:5173

6. Confirm backend connectivity

- Open browser devtools console
- Check printed API base URL
- Test signup/login flow

## 8. Available NPM Scripts

- npm run dev: starts Vite dev server
- npm run build: creates production build in dist/
- npm run preview: serves production build locally
- npm run lint: runs ESLint checks

## 9. Routes

Public routes:

- / and /login: login page
- /signup: signup page
- /forgotPassword: forgot password page

Protected routes (requires auth_token cookie):

- /updateProfile: profile update page
- /reset-password/:token: password reset page

Fallback route:

- *: displays invalid route message

Route guards:

- PublicRoute redirects logged-in users to /updateProfile
- ProtectedRoute redirects non-auth users to /login

## 10. Backend API Contract Used By Frontend

Base URL:

- From VITE_API_BASE_URL, fallback http://localhost:3000/api

Endpoints called by frontend:

- POST /signup
	- Payload: { username, email, password }
	- Expected response includes user.token

- POST /login
	- Payload: { email, password }
	- Expected response includes user.token

- POST /forgotPassword
	- Payload: { email }
	- Expected response includes message

- POST /reset-password/:token
	- Payload: { password, confirmPassword }

- POST /login/updateProfile
	- Headers: Authorization: Bearer <token>
	- Payload: any non-empty fields from { username, address, city, country }

Important:

- Backend must support CORS for frontend origin (for example, http://localhost:5173)
- Backend must be running and listening on configured host/port

## 11. Authentication Flow

1. User signs up or logs in
2. Frontend receives token from backend
3. Token is stored in cookie named auth_token
4. ProtectedRoute checks auth_token before rendering protected pages
5. Update profile request sends bearer token in Authorization header
6. Logout removes auth_token and redirects to login

## 12. Common Errors And Fixes

Error: AxiosError + ERR_CONNECTION_REFUSED

Cause:

- Frontend cannot connect to backend URL/port

Fix:

1. Start backend server
2. Verify configured URL in .env
3. Ensure backend listens on same host/port

Error: CORS blocked in browser

Cause:

- Backend CORS policy does not allow frontend origin

Fix:

- Update backend CORS config to allow frontend URL

Error: Unauthorized on protected endpoints

Cause:

- Missing/expired token or backend token validation failure

Fix:

- Login again and verify auth_token cookie exists

## 13. Build And Preview

Create production build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## 14. Notes And Known Gaps

- Backend source code is not part of this repository
- Some ESLint warnings/errors currently exist in app code and can be cleaned up separately
- Toast notification package is installed but not fully integrated across all pages

---

If you want, I can also add:

- Backend setup checklist template section (for Node/Express)
- API response examples for each endpoint
- Deployment section for Vercel/Netlify with environment setup
