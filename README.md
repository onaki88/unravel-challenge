# Unravel Challenge

- Responsive room listing with infinite scrolling, viewport-aware videos, lazy images, and skeleton placeholders.

---

## Features

- **Responsive UI**: Mobile + Desktop with modern, clean cards.
- **Infinite Scrolling**: IntersectionObserver triggers page by page loading.
- **Media Priority (per card)**:
  1. **Videos** (if any variant has `media.video_url`)
  2. **Images** (if no video; from `media.room_images`)
  3. **No media** (renders nothing)
- **Viewport-aware video**: Autoplay **when visible**, pause **when off-screen**. Source is set **once** (no reloading/flicker).
- **Optimized images**: `loading="lazy"`, responsive sizing.
- **Skeletons**: Smooth placeholders for media & list fetches.
- **Error handling**: Non-blocking fetch errors with retry/reset.
- **Scalable**: Memoized components and debounced IO

---

## Quickstart

```bash
# 1) Install
npm i

# 2) Dev server
npm run dev
# http://localhost:5173
```

---

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS**
- **shadcn/ui**-style primitives (local, no generator required)
- **Radix** Aspect Ratio (light dependency)
- **TypeScript**

---

### Improvements

- rooms service (src/services/rooms.ts)
- data mapping
- data pagination (fake since with mock data)
- use Next.js SSR instead of React.js

---

### Notes

- the list includes all the variants of the rooms (didn't quite get by the diagram if was suppossed to expand the variants because the design provided included data that only exists in each variant, not hotel)

