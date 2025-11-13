# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Opul is a ride-sharing platform frontend that connects clients with drivers in Medellín, Envigado, and Sabaneta, Colombia. The frontend is a server-rendered static site using Express.js to serve HTML pages with embedded JavaScript for client-side functionality.

## Commands

### Development
- `npm install` - Install dependencies
- `npm start` - Start production server on port 3000
- `npm run dev` - Start development server with auto-reload (using nodemon)

### Server
The Express server (server.js) runs on port 3000 by default (configurable via PORT environment variable).

## Architecture

### Server Structure
- **server.js**: Express server that serves static HTML files and handles SPA routing
  - Routes are explicitly defined for each page (`/`, `/index`, `/payment`, `/driver-portal`, etc.)
  - Catch-all route redirects unknown paths to index.html
  - CORS enabled for cross-origin requests
  - Static files served from root directory

### Client-Server Communication
- **Backend API**: https://opul-backend-qt2a.onrender.com/api
- All API calls use `fetch()` with the `API_BASE` constant defined in each HTML file
- Key API endpoints:
  - `/api/rides/request` - Create ride requests
  - `/api/credits` - Check user credits
  - `/api/payments/create-service-fee` - Initiate payment (PayPal/Stripe)
  - `/api/health` - Backend health check

### Frontend Pages & Flow

#### 1. index.html - Main Entry Point
- **Role selection**: Client (rider) or Driver
- **Client flow**:
  - Pickup address autocomplete from Colombian addresses database
  - Duration selection (1-10 hours)
  - Contact info collection (name, phone, email)
  - Credit display and purchase modal
  - Creates ride request that drivers can see immediately
  - No credit check before creation - ride requests are always created
  - Redirects to drivers.html with requestId after successful creation

#### 2. drivers.html - Driver Selection Page
- Shows available driver offers for a specific ride request
- Timer functionality (when user has credits)
- Client can accept driver offers
- Real-time driver offer display

#### 3. driver-portal.html - Driver Authentication
- Driver login/registration
- Redirects to driver-dashboard.html after authentication

#### 4. driver-dashboard.html - Driver Interface
- View available ride requests
- Submit offers to clients
- Manage driver status (online/offline)
- Track accepted rides

#### 5. payment.html - Payment Processing
- Handles ride payment flow
- Shows ride details and amount
- Payment method selection (PayPal/Stripe)

#### 6. payment-success.html - Payment Confirmation
- Post-payment redirect page
- Updates user credits
- Handles ride request activation

#### 7. chat.html - In-Ride Communication
- Chat interface between client and driver

### Credit System
- Users stored in localStorage by email/phone
- Credits tracked on backend, displayed in frontend
- $10 = 1 credit
- Credits allow ride requests without immediate payment
- Payment methods: PayPal and Stripe

### Key Data Flow
1. **Ride Request Creation**: Client creates request → Backend stores → Request ID returned → Drivers see request
2. **Driver Offers**: Drivers submit offers → Client sees offers on drivers.html → Client accepts
3. **Payment Flow**: Client purchases credits → Payment processed → Credits added → Can request rides

### Colombian Address System
- Hardcoded array of ~50 Colombian addresses in index.html
- Addresses follow Colombian format: "Carrera/Calle # Number-Number, Neighborhood, City"
- Autocomplete dropdown filters addresses as user types
- Validates addresses contain "Medellín", "Envigado", or "Sabaneta"

### Styling Approach
- All CSS is embedded in `<style>` tags within each HTML file
- Consistent futuristic/holographic theme with:
  - Orbitron Google Font
  - Radial gradient backgrounds (#0b0c2a, #050517)
  - Neon colors (#00f0ff, #a18cd1, #fbc2eb)
  - Glow effects using box-shadow and text-shadow
  - Animated holographic gradients

### State Management
- localStorage for user persistence:
  - `userEmail` - User email address
  - `userPhone` - User phone number
  - `currentRideRequest` - Active ride request data
  - `pendingRidePayment` - Payment in progress data
  - `paymentForExistingRide` - Flag for existing ride payment
  - `paymentRequestId` - Request ID associated with payment

### Testing Files
- test-pay-button.html - Payment button testing
- test-timer.html - Timer functionality testing
- debug-payment.js - Payment debugging utilities
- test-driver-functions.js - Driver feature testing

## Important Notes

### Payment Flow Specifics
- Ride requests are created BEFORE payment (so drivers can see them immediately)
- After payment success, user is redirected back with `?payment=success` query param
- The payment success handler checks for `paymentForExistingRide` flag to determine flow
- Timer starts after payment is confirmed (for credit-based rides)

### File Naming Convention
- Main pages use lowercase with hyphens: `driver-portal.html`, `payment-success.html`
- Exception: `Chat.html` (capital C) - referenced in server.js route as `/chat`

### Backend Dependency
- Frontend assumes backend is always running at the hardcoded URL
- No offline mode or fallback
- Connection check performed on page load via `/api/health` endpoint

### JavaScript Structure
- All JavaScript is inline in `<script>` tags at the bottom of HTML files
- No external JS files (except test files)
- Heavy use of async/await for API calls
- Event listeners added on window load or direct inline handlers
