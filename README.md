# Artisanal Hearth Restaurant & Culinary Experience

A modern luxury restaurant web application built with React, TypeScript, Vite, and realistic culinary photography. Featuring interactive 3D culinary storytelling, a wood-fired pizza showcase, an artisanal menu with live cart ordering, and table reservation management.

---

## 🚀 How to Run the Project

### 1. Prerequisites
Ensure you have installed:
- **Node.js**: version `18.0.0` or higher (recommended: `20.x+`)
- **npm** (bundled with Node.js) or **pnpm** / **yarn**

Verify your versions in terminal:
```bash
node -v
npm -v
```

---

### 2. Clone or Navigate to the Project
Open your terminal in the project directory:
```bash
cd your-project-folder
```

---

### 3. Install Dependencies
Install all required project packages:
```bash
npm install
```

---

### 4. Configure Environment Variables (Optional)
If you plan to use server-side integrations, copy the example environment file:
```bash
cp .env.example .env
```
*(For standard frontend viewing, ordering, and reservations, no external API keys are required.)*

---

### 5. Start the Development Server
Launch the local development server:
```bash
npm run dev
```

Once running, open your web browser and navigate to:
```
http://localhost:3000
```
*(If port 3000 is occupied, Vite will automatically assign and display the next available port in your terminal).*

---

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local Vite development server with Hot Module Reloading (HMR) on port 3000 |
| `npm run build` | Compiles TypeScript and creates an optimized production build in `dist/` |
| `npm run preview` | Locally serves and previews the production build from `dist/` |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) to verify code integrity without emitting files |

---

## 🌟 Key Features

- **Cinematic Hero Experience**: Immersive dining ambiance with smooth navigation and call-to-action flows.
- **The Restaurant Experience (Visual Journey)**: Horizontal responsive gallery showcasing realistic food photography (Lacy Edged Smash Burger, Wood-Fired Neapolitan Pizza, Valrhona Skillet Brownie, and Open-Flame Dining Theatre).
- **Craftsmanship Storytelling**: Interactive 3D burger layer-by-layer culinary process.
- **Wood-Fired Alchemy (Pizza Showcase)**: Real wood-fired oven photography highlighting traditional techniques with instant ordering for Margherita, Pepperoni, and Paneer Tikka.
- **Curated Artisanal Menu**: Search, category filtering (Burgers, Pizza, Pasta, Sides, Desserts, Drinks), vegetarian/meat dietary toggles, and direct bag integration.
- **Real-Time Cart Drawer**: Multi-item order management with subtotal, tax calculation, and checkout drawer.
- **Table Reservation System**: Select party size, date, time slots, and special requests with real-time feedback.
- **Responsive Dark Luxury Design**: Built with refined typography, zero-clutter layouts, and touch-enabled mobile navigation.

---

## 🧰 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & CSS custom properties
- **Icons**: [Lucide React](https://lucide.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
- **Audio / Effects**: Web Audio API for organic culinary interaction chimes

---

## 📁 Project Structure

```text
├── public/
│   ├── assets/
│   │   ├── menu/         # Authentic food photography for menu items
│   │   ├── pizza/        # High-resolution wood-fired pizza photography
│   │   ├── experience/   # Restaurant dining & kitchen photography
│   │   └── gallery/      # Visual gallery assets
├── src/
│   ├── components/       # UI components (Menu, Gallery, PizzaExperience, Cart, etc.)
│   ├── lib/              # State management, cart context, menu data & audio utilities
│   ├── App.tsx           # Main application entry layout
│   └── index.css         # Global design tokens and luxury dark theme variables
├── package.json          # Project scripts and dependencies
├── vite.config.ts        # Vite configuration (port 3000)
└── README.md             # Project documentation and setup guide
```
