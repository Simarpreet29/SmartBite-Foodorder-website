# SmartBite - Full Stack Food Order Platform

Full-stack food ordering app with React frontend and Express/MongoDB backend.

## Project Structure
- `food-web`: Vite + React frontend
- `Backend`: Node.js + Express API
- `render.yaml`: Render Blueprint (deploys frontend + backend)

## Local Setup
1. Backend setup:
   - Copy `Backend/.env.example` to `Backend/.env`
   - Fill all values
   - Run:
     ```bash
     cd Backend
     npm install
     npm start
     ```
2. Frontend setup:
   - Copy `food-web/.env.example` to `food-web/.env`
   - For local dev, set `VITE_API_BASE_URL=http://localhost:5000`
   - Run:
     ```bash
     cd food-web
     npm install
     npm run dev
     ```

## Deploy On Render

This repo is ready for Render Blueprint deploy using `render.yaml`.

1. Push this repository to GitHub.
2. In Render dashboard, click `New +` > `Blueprint`.
3. Select this repository.
4. Render reads `render.yaml` and creates:
   - `food-order-backend` (Web Service)
   - `food-order-frontend` (Static Site)
5. Fill required environment variables:

Backend (`food-order-backend`):
- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URL` = your frontend Render URL (for CORS)
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

Frontend (`food-order-frontend`):
- `VITE_API_BASE_URL` = your backend Render URL
- `VITE_RAZORPAY_KEY_ID` = same public Razorpay key id

6. Trigger deploy.

## Deployment Notes
- Backend health endpoint is available at `/api/health`.
- Frontend is configured as SPA with rewrite to `index.html`.
- Socket.io tracking uses `VITE_API_BASE_URL` in production.
# lala
