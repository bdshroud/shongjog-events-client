# ShongjogBD – Social Development Events Platform (Client)

> **Connecting Changemakers Across Bangladesh**  
> Empowering grassroots community development, winter relief drives, tree plantations, coastal cleanups, and emergency healthcare camps with an Evenjo-inspired modern event architecture.

**Live Deployment URL:** [https://shongjog-events-client.vercel.app](https://shongjog-events-client.vercel.app) *

**(Client URL)**

**Live Server URL:** [https://shongjog-events-server.vercel.app/](https://shongjog-events-server.vercel.app/) *

**(server URL)**

---

## 🌟 Key Platform Features & Technical Architecture

- **Evenjo-Inspired Nocturnal Event Architecture:** Deep nocturnal canvas (`#0A0612`) with vibrant neon orchid/purple accents (`#B845EC` / `#C04BF2`), centered spotlight glow, and a floating multi-filter search capsule with category tabs (Concerts, Shows, Sports, Festivals) and What/Where/When filtering.
- **Next.js 15 App Router & Strict TypeScript Architecture:** Built with Next.js App Router, React 19, and Tailwind CSS. Employs modular components, uniform `aspect-[16/10]` card visuals, consistent typography, and responsive drawer navigation.
- **Dual Light & Dark Theme System:** Seamless theme switching powered by `next-themes` and Tailwind CSS `class` strategy, with zero hydration flicker and custom purple scrollbar theming.
- **BetterAuth Integration with Session & JWT Sync:** Robust authentication using `better-auth` paired with an automatic JWT synchronization layer (`JwtSyncProvider`) that attaches 7-day bearer tokens to Axios requests.
- **Anti-Reload Redirect Guards (Zero Reload Glitches):** Private route layouts (`/create-event`, `/manage-events`, `/joined-events`, `/profile`) strictly await session hydration (`isPending`) and render polished skeleton loaders, guaranteeing that page refreshes never prematurely kick logged-in users to `/login`.
- **Duplicate-Proof Volunteer Headcounts & Cascade Deletion:** Users can register for community initiatives with one click; MongoDB compound indexing (`{ eventId: 1, userEmail: 1 }`) prevents duplicate signups. When an event organizer deletes an event, associated volunteer records are cascaded cleanly.
- **Strict Future Date Validation & No-Lorem Integrity:** Both client-side Zod schemas and backend controllers enforce that all event dates are strictly in the future. Past events are filtered out automatically. All content features authentic Bangladeshi social initiatives in Dhaka, Chattogram, and across 64 districts.

---

## 🛠️ Tech Stack & Packages
- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, PostCSS, Lucide React Icons
- **Auth:** BetterAuth React Client (`better-auth/react`)
- **HTTP Client:** Axios (with Bearer JWT request/response interceptors)
- **Forms & Validation:** React Hook Form, Zod (`@hookform/resolvers/zod`)
- **Feedback & Modals:** `sonner` (rich toasts) and `sweetalert2` (accessible confirmation modals)
- **Theming:** `next-themes`

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure Node.js v18+ is installed. The backend server (`social-events-server`) must be running on `http://localhost:5000`.

### 2. Configure Environment
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000
```

### 3. Install & Run Development Server
```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Verification
```bash
npm run build
npm run start
```


### Client Architecture Summary
- **Framework**: Next.js 15 App Router with React 19 & Tailwind CSS
- **State & Forms**: React Hook Form with Zod validation schemas
- **Theming**: Next-Themes nocturnal dark/light mode engine
- **Network**: Axios client with automated Bearer token injection
