# 🚀 Crypto Trading App

A React + TypeScript + Vite application that provides cryptocurrency data visualization and a simple trading simulation.  
The app supports authentication (via Zustand store), reusable UI components, and API-based data fetching.

---

## 📑 Index

1. [Architecture Overview](#-architecture-overview)  
2. [Project Files](#-project-files)  
   - [src/main.tsx](#srcmaintsx)  
   - [src/App.tsx](#srcapptsx)  
   - [src/vite-env.d.ts](#srcvite-envdts)  
   - [src/types/coin.ts](#srctypescoints)  
   - [src/store/userStore.ts](#srcstoreuserstorets)  
   - [src/components/Button.tsx](#srccomponentsbuttontsx)  
   - [src/components/InputField.tsx](#srccomponentsinputfieldtsx)  
   - [src/components/Navbar.tsx](#srccomponentsnavbartsx)  
   - [src/Navbar.tsx](#srcnavbartsx)  
   - [src/pages/Home.tsx](#srcpageshometsx)  
   - [src/pages/Trade.tsx](#srcpagestradetsx)  
3. [Setup & Installation](#-setup--installation)  
4. [Tech Stack](#-tech-stack)  
5. [Features](#-features)  

---

## 🏗️ Architecture Overview

- **main.tsx** → App entry point, mounts React and sets up routing.  
- **App.tsx** → Root component that handles routes and global layout.  
- **Navbar** → Provides navigation and authentication controls.  
- **Home Page** → Displays cryptocurrency data in a sortable/paginated table.  
- **Trade Page** → Provides a crypto ↔ USD converter (requires authentication).  
- **Zustand Store** → Manages and persists authentication state.  
- **Types** → Ensures consistent typing for coins and data.  

---

## 📂 Project Files

### src/main.tsx
- Entry point of the application.  
- Mounts the React tree into the DOM.  
- Wraps app with **BrowserRouter** and **React.StrictMode**.  

---

### src/App.tsx
- Root component managing **routes**:
  - `/crypto/` and `` → Home Page.  
  - `/crypto/trade` → Trade Page (protected).  
- Always renders `<Navbar />`.  

---

### src/vite-env.d.ts
- TypeScript declaration file for Vite client types.  

---

### src/types/coin.ts
- Defines the **Coin interface** with fields:
  - `id`, `name`, `symbol`, `image`  
  - `current_price` (USD), `price_change_percentage_24h`  

---

### src/store/userStore.ts
- **Zustand store** with persistence:  
  - State: `user` (`{ email: string } | null`)  
  - Actions: `login(email)`, `logout()`  

---

### src/components/Button.tsx
- Reusable button component.  
- Props: `children`, `onClick`, `type`.  
- Default styled with hover & transition.  

---

### src/components/InputField.tsx
- Reusable labeled input component.  
- Props: `label`, `type`, `value`, `onChange`.  
- Used in forms such as login modal.  

---

### src/components/Navbar.tsx
- Sticky top navigation bar.  
- Navigation: **Home** / **Trade**.  
- Authentication controls:
  - Shows user email & Logout when logged in.  
  - Login button opens modal with validation.  

---

### src/Navbar.tsx
- Duplicate Navbar with different import paths.  
- Functions the same as `src/components/Navbar.tsx`.  

---

### src/pages/Home.tsx
- Displays a **paginated, sortable table** of coins.  
- Fetches from `VITE_API_URL`.  
- Features:
  - Sort by name or price.  
  - “Load More” functionality.  
  - Dropdown menu per row (Buy/Sell placeholder).  

---

### src/pages/Trade.tsx
- **Currency converter** (Crypto ↔ USD).  
- Requires user authentication.  
- Fetches coins from API.  
- Features:
  - Crypto → USD conversion.  
  - USD → Crypto conversion.  
  - Swap between modes.  

-----------------------------------------------------------------------------------------------------------------------------

### Deployed Link: https://vraj79.github.io/crypto/
