# Ascentis Capital — Next.js 14 site

Pages:
- `/` Landing with Three.js hero (mountain/particles) and animated word cycle (robotics → blockchain → AI → autonomy → cryptography) using Framer Motion.
- `/portfolio` portfolio grid.
- `/contact` secure founder form (honeypot + API route stub).
- `/thesis` investment thesis.

## Tech
- Next.js 14.2, React 18, Tailwind 3.4
- Framer Motion 11
- Three.js with @react-three/fiber & drei (landing only)

## Run
```bash
pnpm i   # or npm i / yarn
pnpm dev # http://localhost:3000
```

## Notes
- Three.js is dynamically imported and only used on the landing page (no SSR).
- Colors follow the Ascentis palette: Ink `#0B0E14`, Slate `#141A23`, Fog `#F5F7FA`, Apex Blue `#2E6FFF`, Ascentis Teal `#16CABD`, Gold `#C7A86A`.
- Replace `app/api/submit/route.ts` with your actual email/storage pipeline.
