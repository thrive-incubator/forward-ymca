# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Three prototype web apps for **HereForward × YMCA San Diego** — designed to present to YMCA leadership and catalyze a partnership. All prototypes use **HereForward branding** (not YMCA). The tagline "Every Kid Needs a Team" unifies all three.

### The Three Prototypes

Prototypes are numbered by **demo order** (matching the presentation strategy). Folder paths use original development numbering:

1. **"Every Kid Needs a Team" — QR-to-Signup Landing** (`src/prototype-2/`, route: `/prototype-2`): Cinematic hero landing page → data points section → 2-question quick match → program results → 3-field signup → confirmation → QR code display. Heavy on design (parallax, animations), light on logic. Working QR code.

2. **"Find Your Team" — AI Activity Matcher** (`src/prototype-1/`, route: `/prototype-1`): Two modes — (A) Guided visual card flow where parents answer 3-4 questions and get matched via filter logic, and (B) AI chat powered by Gemini (`gemini-2.5-flash-lite`) where parents can have a natural conversation. Mobile-first. Includes kid mode toggle.

3. **"Team Builder" — Front Desk Staff Copilot** (`src/prototype-3/`, route: `/prototype-3`): Tablet/kiosk tool for YMCA staff. Two UI modes: staff dashboard with quick search, and family-facing guided flow (visual/friendly). Sidebar always visible. Optimized for tablet landscape (1024×768).

### Shared Code

- **Data**: `src/data/` — 19 real YMCA San Diego programs across 14 branches, 5 regions. Files: `types.ts`, `programs.ts`, `branches.ts`, `filters.ts`.
- **Components**: `src/components/` — 10 shared components (AnimatedPage, Button, ConfirmationScreen, Layout, ProgramCard, PrototypeInfoModal, PrototypeSelector, SelectionCard, StepIndicator, TagBadge).
- **Design system**: `src/design-system/animations.ts` — shared Framer Motion animation variants (fadeInUp, staggerContainer, scaleOnTap, pageTransition, slideInFromBottom).
- **Hooks**: `src/hooks/useScrollProgress.ts` — parallax scroll utilities.

## Tech Stack

- **Vite + React 19 + TypeScript** — build tool and framework
- **Tailwind CSS v4** — utility-first styling, custom theme in `src/index.css` via `@theme`
- **Framer Motion** — animations, page transitions, parallax
- **Google Gemini** (`@google/genai`, model: `gemini-2.5-flash-lite`) — AI chat in Prototype 2 (Find Your Team)
- **react-router-dom** — routing between prototypes
- **react-markdown** — rendering markdown in AI chat responses
- **lucide-react** — icon library
- **qrcode.react** — QR code generation
- **Firebase Hosting** — deployment (`firebase.json` configured, builds from `dist/`)
- **Path alias**: `@` → `./src` (configured in `vite.config.ts`)

## Design System

- **Palette**: `coral-*` (primary), `warmblack-*` (dark), `accent-*` (teal CTA), `surface-*` (backgrounds)
- **Typography**: Nunito (display/headlines), Nunito Sans (body), Lora & Fraunces (serif alternatives for chat)
- **Shadows**: `shadow-card`, `shadow-card-hover`, `shadow-elevated` (warm-tinted)
- **Layout**: Mobile-first for prototypes 1 & 2. Tablet landscape for prototype 3.

## Data Model

- **6 sport categories**: team-sports, individual-sports, creative-movement, water-sports, multi-sport, outdoor-adventure
- **5 age ranges**: 5-6, 7-8, 9-10, 11-12, 13+
- **5 regions**: central, north, south, east, coastal
- Programs include: commitmentLevel, firstTimerFriendly flag, difficulty, spotsRemaining/totalSpots

## Key Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build → dist/
npm run preview  # Preview built version
npm run lint     # ESLint
```

## Environment Variables

- `VITE_GEMINI_API_KEY` — Google Gemini API key (required for AI chat in Prototype 2)
