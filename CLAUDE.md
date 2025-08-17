# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a web-builder project with a Next.js frontend application located in `web-builder-fe/`. The backend directory exists but appears to be empty or minimal.

### Frontend (web-builder-fe/)
- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript with strict mode enabled
- **UI Libraries**: 
  - React Three Fiber (@react-three/fiber) and Drei (@react-three/drei) for 3D graphics
  - Framer Motion for animations
  - Radix UI components (@radix-ui/react-slot)
  - Class Variance Authority for component variants
  - ShadCN components (referenced in prompts.md)
- **Styling**: Tailwind CSS v4
- **Path Aliases**: `@/*` maps to `./src/*`

## Development Commands

All commands should be run from the `web-builder-fe/` directory:

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture Notes

Based on `prompts.md`, this project is designed to be a modern landing page with:
- Interactive 3D animations using Three.js
- Mouse interaction effects and drag behaviors
- Framer Motion animations with hover effects
- Modern, trending design patterns
- ShadCN UI components for interactive elements

The codebase uses Next.js App Router structure with TypeScript path aliases configured for clean imports.

## Development Notes

- The project uses Turbopack for faster development builds
- ESLint is configured with Next.js TypeScript rules
- Strict TypeScript configuration is enabled
- The main application code should be in `web-builder-fe/src/`