# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Three prototype web apps for **Forward × YMCA San Diego** — designed to present to YMCA leadership and catalyze a partnership. All prototypes use **Forward branding** (not YMCA). The tagline "Every Kid Needs a Team" unifies all three.

### The Three Prototypes

1. **"Find Your Team" — AI Activity Matcher** (`src/prototype-1/`): Two modes — (A) Guided visual card flow where parents answer 3-4 questions and get matched via filter logic, and (B) AI chat powered by Gemini (`gemini-2.5-flash-lite`) where parents can have a natural conversation. Mobile-first.

2. **"Every Kid Needs a Team" — QR-to-Signup Landing** (`src/prototype-2/`): Cinematic hero landing page → 2-question quick match → 3-field signup. Heavy on design (parallax, animations), light on logic. Working QR code.

3. **"Team Builder" — Front Desk Staff Copilot** (`src/prototype-3/`): Tablet/kiosk tool for YMCA staff. Two UI modes: staff dashboard (data-dense) and family-facing guided flow (visual/friendly). Optimized for tablet landscape (1024×768).

### Shared Data

All prototypes share program data defined in `src/data/` — ~18 real YMCA San Diego programs across 14 branches. Types in `src/data/types.ts`, filter logic in `src/data/filters.ts`.

## Tech Stack

- **Vite + React + TypeScript** — build tool and framework
- **Tailwind CSS v4** — utility-first styling, custom theme in `src/index.css` via `@theme`
- **Framer Motion** — animations, page transitions, parallax
- **Google Gemini** (`@google/genai`, model: `gemini-2.5-flash-lite`) — AI chat in Prototype 1
- **react-router-dom** — routing between prototypes
- **lucide-react** — icon library
- **qrcode.react** — QR code generation

## Design System

- **Palette**: `coral-*` (primary), `warmblack-*` (dark), `accent-*` (teal CTA), `surface-*` (backgrounds)
- **Typography**: Nunito (display/headlines), Nunito Sans (body)
- **Shadows**: `shadow-card`, `shadow-card-hover`, `shadow-elevated` (warm-tinted)
- **Layout**: Mobile-first for prototypes 1 & 2. Tablet landscape for prototype 3.

## Key Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build → dist/
```

## Environment Variables

- `VITE_GEMINI_API_KEY` — Google Gemini API key (required for AI chat in Prototype 1)
