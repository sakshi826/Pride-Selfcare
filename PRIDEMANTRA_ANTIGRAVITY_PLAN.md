# 🏳️‍🌈 PrideMantra — Antigravity Execution Plan

## ⚠️ CRITICAL RULES — READ BEFORE TOUCHING ANYTHING

| Rule                                    | Detail                                                                             |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| **Slug must match folder/file name**    | Do not rename slugs. Use the exact folder/file name as the route/static path slug. |
| **Three groups only**                   | Dynamic Minis, Static Minis, Static Mini Claude.                                   |
| **Dynamic minis require DB + Auth**     | Anything inside `/db` must use shared Neon DB and AuthGuard.                       |
| **Static minis do not require DB/Auth** | Anything inside `/static` must be UI-only.                                         |
| **Claude minis are HTML based**         | Anything inside `/Claude` must be served as static HTML through an iframe wrapper. |
| **No individual DB clients**            | Remove any per-mini DB connection. Use the shared monorepo Neon client only.       |
| **No individual auth systems**          | Remove local auth/JWT/session/OAuth logic. Use monorepo AuthGuard only.            |
| **No new CSS unless necessary**         | Prefer existing styles and components. Avoid adding new CSS files.                 |
| **No placeholder minis**                | If a folder/file is missing, log it and skip it. Do not invent content.            |
| **One table per dynamic mini**          | Each Dynamic Mini owns its own dedicated table. No shared tables.                  |

---

# 📐 ARCHITECTURE OVERVIEW

PrideMantra has 3 mini categories:

```text
┌──────────────────────────────────────────────────────────────┐
│ GROUP 1 — Dynamic Minis                                      │
│ Folder: /db                                                  │
│ Requires DB + Auth                                           │
│ Use shared Neon DB + AuthGuard                               │
├──────────────────────────────────────────────────────────────┤
│ GROUP 2 — Static Minis                                       │
│ Folder: /static                                              │
│ No DB / No Auth                                              │
│ Integrate as React/UI minis                                  │
├──────────────────────────────────────────────────────────────┤
│ GROUP 3 — Static Mini Claude                                 │
│ Folder: /Claude                                              │
│ No DB / No Auth                                              │
│ HTML files served from public/static/pride/ via iframe        │
└──────────────────────────────────────────────────────────────┘
```

---

# 📦 COMPLETE MINI INVENTORY

---

## GROUP 1 — Dynamic Minis (DB + Auth Required)

> Source folder: `/db`  
> These minis require persistence and user-specific data.

| Slug                   | Source Folder              | Table Name                     |
| ---------------------- | -------------------------- | ------------------------------ |
| `find-your-right-time` | `/db/find-your-right-time` | `find_your_right_time_entries` |
| `gentle-check-in`      | `/db/gentle-check-in`      | `gentle_check_in_entries`      |
| `identity-exploration` | `/db/identity-exploration` | `identity_exploration_entries` |
| `identity-reflection`  | `/db/identity-reflection`  | `identity_reflection_entries`  |
| `pride-journal`        | `/db/pride-journal`        | `pride_journal_entries`        |
| `pride-mirror-moments` | `/db/pride-mirror-moments` | `pride_mirror_moments_entries` |
| `pride-spectrum`       | `/db/pride-spectrum`       | `pride_spectrum_entries`       |

---

## GROUP 2 — Static Minis (No DB / No Auth)

> Source folder: `/static`  
> These minis are UI/content-only.

| Slug                            | Source Folder                           |
| ------------------------------- | --------------------------------------- |
| `bi-identity-affirmations`      | `/static/bi-identity-affirmations`      |
| `bisexual-conversations`        | `/static/bisexual-conversations`        |
| `bisexual-stories`              | `/static/bisexual-stories`              |
| `bisexual-wellbeing-compass`    | `/static/bisexual-wellbeing-compass`    |
| `coming-out-bisexual`           | `/static/coming-out-bisexual`           |
| `dealing-with-dysphoria`        | `/static/dealing-with-dysphoria`        |
| `joy-pride-trans`               | `/static/joy-pride-trans`               |
| `navigating-medical-transition` | `/static/navigating-medical-transition` |
| `trans-and-mental-health`       | `/static/trans-and-mental-health`       |
| `trans-coming-out`              | `/static/trans-coming-out`              |

---

## GROUP 3 — Static Mini Claude (No DB / No Auth)

> Source folder: `/Claude`  
> These are HTML files. Do not convert them into React components.

| Slug                       | HTML File                       | Static Destination                                         |
| -------------------------- | ------------------------------- | ---------------------------------------------------------- |
| `celebrate-wlw`            | `celebrate-wlw.html`            | `/public/static/pride/celebrate-wlw/index.html`            |
| `coming-out-practice`      | `coming-out-practice.html`      | `/public/static/pride/coming-out-practice/index.html`      |
| `confidence-mirror`        | `confidence-mirror.html`        | `/public/static/pride/confidence-mirror/index.html`        |
| `family-friends-reactions` | `family-friends-reactions.html` | `/public/static/pride/family-friends-reactions/index.html` |
| `gay-and-proud`            | `gay-and-proud.html`            | `/public/static/pride/gay-and-proud/index.html`            |
| `gay-coming-out-yourself`  | `gay-coming-out-yourself.html`  | `/public/static/pride/gay-coming-out-yourself/index.html`  |
| `gay-dealing-homophobia`   | `gay-dealing-homophobia.html`   | `/public/static/pride/gay-dealing-homophobia/index.html`   |
| `lesbian-power-boost`      | `lesbian-power-boost.html`      | `/public/static/pride/lesbian-power-boost/index.html`      |
| `lesbian-real-stories`     | `lesbian-real-stories.html`     | `/public/static/pride/lesbian-real-stories/index.html`     |

---

# 🔢 EXECUTION STEPS

---

## STEP 0 — Pre-Flight Checks

### 0.1 Confirm folders exist

Confirm these folders are present:

```bash
ls db
ls static
ls Claude
```

Expected:

```text
db       → Dynamic Minis
static   → Static Minis
Claude   → Static Mini Claude HTML files
```

### 0.2 Confirm all Dynamic Mini folders

```bash
ls db
```

Expected folders:

```text
find-your-right-time
gentle-check-in
identity-exploration
identity-reflection
pride-journal
pride-mirror-moments
pride-spectrum
```

### 0.3 Confirm all Static Mini folders

```bash
ls static
```

Expected folders:

```text
bi-identity-affirmations
bisexual-conversations
bisexual-stories
bisexual-wellbeing-compass
coming-out-bisexual
dealing-with-dysphoria
joy-pride-trans
navigating-medical-transition
trans-and-mental-health
trans-coming-out
```

### 0.4 Confirm all Claude HTML files

```bash
ls Claude
```

Expected files:

```text
celebrate-wlw.html
coming-out-practice.html
confidence-mirror.html
family-friends-reactions.html
gay-and-proud.html
gay-coming-out-yourself.html
gay-dealing-homophobia.html
lesbian-power-boost.html
lesbian-real-stories.html
```

### 0.5 Log missing files/folders

If anything is missing, create:

```bash
touch PRIDEMANTRA_MISSING_ITEMS.md
```

Log missing items like this:

```md
# PrideMantra Missing Items

## Dynamic Minis

- missing-folder-name

## Static Minis

- missing-folder-name

## Claude HTML

- missing-file-name.html
```

Do not create placeholders.

---

## STEP 1 — Prepare Monorepo Feature Structure

Create the PrideMantra feature folders:

```bash
mkdir -p src/features/pride/dynamic
mkdir -p src/features/pride/static
mkdir -p src/components/pride
mkdir -p public/static/pride
```

Target structure:

```text
src/features/pride/dynamic/<slug>/
src/features/pride/static/<slug>/
src/components/pride/PrideStaticViewer.tsx
public/static/pride/<slug>/index.html
```

---

## STEP 2 — Neon DB Setup for Dynamic Minis

> This step is only for Group 1 minis from `/db`.

### 2.1 DB table rule

Each Dynamic Mini gets exactly one dedicated table.

Use these table names unless the mini already has an existing schema that defines a table name:

| Slug                   | Table Name                     |
| ---------------------- | ------------------------------ |
| `find-your-right-time` | `find_your_right_time_entries` |
| `gentle-check-in`      | `gentle_check_in_entries`      |
| `identity-exploration` | `identity_exploration_entries` |
| `identity-reflection`  | `identity_reflection_entries`  |
| `pride-journal`        | `pride_journal_entries`        |
| `pride-mirror-moments` | `pride_mirror_moments_entries` |
| `pride-spectrum`       | `pride_spectrum_entries`       |

### 2.2 Schema discovery rule

Before creating any SQL manually, check each Dynamic Mini for an existing schema:

```bash
find db/<slug> -name "*.sql" -o -name "schema.sql" \
  -o -name "schema.prisma" -o -name "schema.ts" \
  -o -name "migrations" -type d \
  | head -20
```

Decision tree:

```text
Does the mini have a .sql file or migrations folder?
  YES → Use that SQL. Do not invent columns.
  NO → Does it have Prisma/Drizzle schema?
          YES → Convert generated schema to SQL.
          NO → Read the codebase and derive the minimal schema only from actual usage.
```

### 2.3 Minimal fallback schema

Use this only if the codebase does not contain schema files and the mini requires basic persisted JSON data.

```sql
CREATE TABLE IF NOT EXISTS find_your_right_time_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gentle_check_in_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS identity_exploration_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS identity_reflection_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pride_journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pride_mirror_moments_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pride_spectrum_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

Important:

- Use `data JSONB` only as fallback.
- If the mini has specific fields in code, create specific fields instead.
- Every table must include `user_id TEXT NOT NULL`.

---

## STEP 3 — Strip Individual DB/Auth from Dynamic Minis

For every folder inside `/db`:

```bash
cd db/<slug>
```

Remove local DB files:

```bash
rm -f .env .env.local .env.example .env.production
rm -f prisma/schema.prisma knexfile.js drizzle.config.ts
rm -f src/lib/db.ts src/lib/db.js src/utils/db.ts src/db/index.ts
```

Search DB usage:

```bash
grep -rn "new PrismaClient\|createClient\|Pool\|neon\|drizzle" src/ || true
```

Replace local DB imports with shared DB:

```ts
import { db } from "@pridemanta/db";
```

If the monorepo already has a different shared DB alias, use the existing alias instead.

Remove local auth files:

```bash
rm -f src/lib/auth.ts src/lib/auth.js src/utils/auth.ts
```

Search auth usage:

```bash
grep -rn "jwt\|cookie\|session\|Auth0\|supabase\.auth\|firebase\.auth" src/ || true
```

Replace user access with:

```ts
const userId = localStorage.getItem("userId");
```

AuthGuard guarantees `userId` exists before the route loads.

---

## STEP 4 — Integrate Dynamic Minis

Copy each Dynamic Mini into:

```text
src/features/pride/dynamic/<slug>/
```

Example:

```bash
mkdir -p src/features/pride/dynamic/pride-journal
cp -R db/pride-journal/* src/features/pride/dynamic/pride-journal/
```

Repeat for:

```text
find-your-right-time
gentle-check-in
identity-exploration
identity-reflection
pride-journal
pride-mirror-moments
pride-spectrum
```

---

## STEP 5 — Integrate Static Minis

Copy each Static Mini into:

```text
src/features/pride/static/<slug>/
```

Example:

```bash
mkdir -p src/features/pride/static/bi-identity-affirmations
cp -R static/bi-identity-affirmations/* src/features/pride/static/bi-identity-affirmations/
```

Repeat for:

```text
bi-identity-affirmations
bisexual-conversations
bisexual-stories
bisexual-wellbeing-compass
coming-out-bisexual
dealing-with-dysphoria
joy-pride-trans
navigating-medical-transition
trans-and-mental-health
trans-coming-out
```

Static Mini rules:

- Do not add DB calls.
- Do not add auth logic.
- Remove `.env` references.
- Convert Next.js features to plain React if needed.
- Replace `next/image` with `<img>`.
- Replace `next/router` with `react-router-dom`.

---

## STEP 6 — Integrate Claude HTML Minis

Create destination folders:

```bash
mkdir -p public/static/pride
```

Copy each Claude HTML file into its slug folder:

```bash
mkdir -p public/static/pride/celebrate-wlw
cp Claude/celebrate-wlw.html public/static/pride/celebrate-wlw/index.html

mkdir -p public/static/pride/coming-out-practice
cp Claude/coming-out-practice.html public/static/pride/coming-out-practice/index.html

mkdir -p public/static/pride/confidence-mirror
cp Claude/confidence-mirror.html public/static/pride/confidence-mirror/index.html

mkdir -p public/static/pride/family-friends-reactions
cp Claude/family-friends-reactions.html public/static/pride/family-friends-reactions/index.html

mkdir -p public/static/pride/gay-and-proud
cp Claude/gay-and-proud.html public/static/pride/gay-and-proud/index.html

mkdir -p public/static/pride/gay-coming-out-yourself
cp Claude/gay-coming-out-yourself.html public/static/pride/gay-coming-out-yourself/index.html

mkdir -p public/static/pride/gay-dealing-homophobia
cp Claude/gay-dealing-homophobia.html public/static/pride/gay-dealing-homophobia/index.html

mkdir -p public/static/pride/lesbian-power-boost
cp Claude/lesbian-power-boost.html public/static/pride/lesbian-power-boost/index.html

mkdir -p public/static/pride/lesbian-real-stories
cp Claude/lesbian-real-stories.html public/static/pride/lesbian-real-stories/index.html
```

If the HTML files reference local assets, copy those assets too.

Check for local asset references:

```bash
grep -i "src=\|href=" Claude/*.html | grep -v "http" || true
```

---

## STEP 7 — Create Pride Static Viewer

Create:

```text
src/components/pride/PrideStaticViewer.tsx
```

Use:

```tsx
import { useParams } from "react-router-dom";

export function PrideStaticViewer() {
  const { slug } = useParams<{ slug: string }>();
  const src = `/static/pride/${slug}/index.html`;

  return (
    <iframe
      src={src}
      title={`PrideMantra ${slug}`}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "80vh",
        border: "none",
      }}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
```

---

## STEP 8 — Add Routes

Add imports for all React minis.

Example import pattern:

```tsx
import FindYourRightTime from "./features/pride/dynamic/find-your-right-time";
import GentleCheckIn from "./features/pride/dynamic/gentle-check-in";
import IdentityExploration from "./features/pride/dynamic/identity-exploration";
import IdentityReflection from "./features/pride/dynamic/identity-reflection";
import PrideJournal from "./features/pride/dynamic/pride-journal";
import PrideMirrorMoments from "./features/pride/dynamic/pride-mirror-moments";
import PrideSpectrum from "./features/pride/dynamic/pride-spectrum";

import BiIdentityAffirmations from "./features/pride/static/bi-identity-affirmations";
import BisexualConversations from "./features/pride/static/bisexual-conversations";
import BisexualStories from "./features/pride/static/bisexual-stories";
import BisexualWellbeingCompass from "./features/pride/static/bisexual-wellbeing-compass";
import ComingOutBisexual from "./features/pride/static/coming-out-bisexual";
import DealingWithDysphoria from "./features/pride/static/dealing-with-dysphoria";
import JoyPrideTrans from "./features/pride/static/joy-pride-trans";
import NavigatingMedicalTransition from "./features/pride/static/navigating-medical-transition";
import TransAndMentalHealth from "./features/pride/static/trans-and-mental-health";
import TransComingOut from "./features/pride/static/trans-coming-out";

import { PrideStaticViewer } from "./components/pride/PrideStaticViewer";
```

Add routes:

```tsx
{/* PrideMantra — Dynamic Minis */}
<Route path="/pride/find-your-right-time" element={<FindYourRightTime />} />
<Route path="/pride/gentle-check-in" element={<GentleCheckIn />} />
<Route path="/pride/identity-exploration" element={<IdentityExploration />} />
<Route path="/pride/identity-reflection" element={<IdentityReflection />} />
<Route path="/pride/pride-journal" element={<PrideJournal />} />
<Route path="/pride/pride-mirror-moments" element={<PrideMirrorMoments />} />
<Route path="/pride/pride-spectrum" element={<PrideSpectrum />} />

{/* PrideMantra — Static Minis */}
<Route path="/pride/bi-identity-affirmations" element={<BiIdentityAffirmations />} />
<Route path="/pride/bisexual-conversations" element={<BisexualConversations />} />
<Route path="/pride/bisexual-stories" element={<BisexualStories />} />
<Route path="/pride/bisexual-wellbeing-compass" element={<BisexualWellbeingCompass />} />
<Route path="/pride/coming-out-bisexual" element={<ComingOutBisexual />} />
<Route path="/pride/dealing-with-dysphoria" element={<DealingWithDysphoria />} />
<Route path="/pride/joy-pride-trans" element={<JoyPrideTrans />} />
<Route path="/pride/navigating-medical-transition" element={<NavigatingMedicalTransition />} />
<Route path="/pride/trans-and-mental-health" element={<TransAndMentalHealth />} />
<Route path="/pride/trans-coming-out" element={<TransComingOut />} />

{/* PrideMantra — Claude HTML Minis */}
<Route path="/pride/content/:slug" element={<PrideStaticViewer />} />
```

---

## STEP 9 — Navigation Links

Use these links in the PrideMantra UI.

### Dynamic Minis

```tsx
<Link to="/pride/find-your-right-time">Find Your Right Time</Link>
<Link to="/pride/gentle-check-in">Gentle Check-In</Link>
<Link to="/pride/identity-exploration">Identity Exploration</Link>
<Link to="/pride/identity-reflection">Identity Reflection</Link>
<Link to="/pride/pride-journal">Pride Journal</Link>
<Link to="/pride/pride-mirror-moments">Pride Mirror Moments</Link>
<Link to="/pride/pride-spectrum">Pride Spectrum</Link>
```

### Static Minis

```tsx
<Link to="/pride/bi-identity-affirmations">Bi Identity Affirmations</Link>
<Link to="/pride/bisexual-conversations">Bisexual Conversations</Link>
<Link to="/pride/bisexual-stories">Bisexual Stories</Link>
<Link to="/pride/bisexual-wellbeing-compass">Bisexual Wellbeing Compass</Link>
<Link to="/pride/coming-out-bisexual">Coming Out Bisexual</Link>
<Link to="/pride/dealing-with-dysphoria">Dealing With Dysphoria</Link>
<Link to="/pride/joy-pride-trans">Joy Pride Trans</Link>
<Link to="/pride/navigating-medical-transition">Navigating Medical Transition</Link>
<Link to="/pride/trans-and-mental-health">Trans And Mental Health</Link>
<Link to="/pride/trans-coming-out">Trans Coming Out</Link>
```

### Claude HTML Minis

```tsx
<Link to="/pride/content/celebrate-wlw">Celebrate WLW</Link>
<Link to="/pride/content/coming-out-practice">Coming Out Practice</Link>
<Link to="/pride/content/confidence-mirror">Confidence Mirror</Link>
<Link to="/pride/content/family-friends-reactions">Family & Friends Reactions</Link>
<Link to="/pride/content/gay-and-proud">Gay And Proud</Link>
<Link to="/pride/content/gay-coming-out-yourself">Gay Coming Out Yourself</Link>
<Link to="/pride/content/gay-dealing-homophobia">Gay Dealing Homophobia</Link>
<Link to="/pride/content/lesbian-power-boost">Lesbian Power Boost</Link>
<Link to="/pride/content/lesbian-real-stories">Lesbian Real Stories</Link>
```

---

## STEP 10 — AuthGuard Rule

All routes may remain inside the global AuthGuard if the parent app already protects all routes.

Dynamic Minis must always assume:

```ts
const userId = localStorage.getItem("userId");
```

Do not build a separate PrideMantra login system.

---

## STEP 11 — Verification Checks

Run these before build:

```bash
# 1. No individual DB clients inside Pride features
result=$(grep -rn "new PrismaClient\|new Pool\|createClient.*neon\|drizzle(" src/features/pride/ || true)
[ -z "$result" ] && echo "✅ No individual DB clients" || (echo "❌ FAIL: $result" && exit 1)

# 2. No individual auth setup inside Pride features
result=$(grep -rn "new Auth0\|supabase\.auth\|firebase\.auth\|jwt\.sign\|jwt\.verify" src/features/pride/ || true)
[ -z "$result" ] && echo "✅ No individual auth setup" || (echo "❌ FAIL: $result" && exit 1)

# 3. Claude static content exists
[ -d "public/static/pride" ] && echo "✅ Pride static content folder exists" || (echo "❌ Missing public/static/pride" && exit 1)

# 4. TypeScript compile
pnpm tsc --noEmit && echo "✅ TypeScript OK" || (echo "❌ TypeScript errors" && exit 1)

# 5. Build
pnpm build && echo "✅ Build OK" || (echo "❌ Build failed" && exit 1)
```

---

## STEP 12 — Final Deliverable Checklist

### Dynamic Minis

- [ ] `find-your-right-time` integrated
- [ ] `gentle-check-in` integrated
- [ ] `identity-exploration` integrated
- [ ] `identity-reflection` integrated
- [ ] `pride-journal` integrated
- [ ] `pride-mirror-moments` integrated
- [ ] `pride-spectrum` integrated
- [ ] All Dynamic Minis use shared DB
- [ ] All Dynamic Minis use `localStorage.getItem('userId')`
- [ ] No local auth remains
- [ ] No local DB clients remain

### Static Minis

- [ ] `bi-identity-affirmations` integrated
- [ ] `bisexual-conversations` integrated
- [ ] `bisexual-stories` integrated
- [ ] `bisexual-wellbeing-compass` integrated
- [ ] `coming-out-bisexual` integrated
- [ ] `dealing-with-dysphoria` integrated
- [ ] `joy-pride-trans` integrated
- [ ] `navigating-medical-transition` integrated
- [ ] `trans-and-mental-health` integrated
- [ ] `trans-coming-out` integrated
- [ ] No DB/auth added to Static Minis

### Claude HTML Minis

- [ ] `celebrate-wlw.html` copied to `/public/static/pride/celebrate-wlw/index.html`
- [ ] `coming-out-practice.html` copied to `/public/static/pride/coming-out-practice/index.html`
- [ ] `confidence-mirror.html` copied to `/public/static/pride/confidence-mirror/index.html`
- [ ] `family-friends-reactions.html` copied to `/public/static/pride/family-friends-reactions/index.html`
- [ ] `gay-and-proud.html` copied to `/public/static/pride/gay-and-proud/index.html`
- [ ] `gay-coming-out-yourself.html` copied to `/public/static/pride/gay-coming-out-yourself/index.html`
- [ ] `gay-dealing-homophobia.html` copied to `/public/static/pride/gay-dealing-homophobia/index.html`
- [ ] `lesbian-power-boost.html` copied to `/public/static/pride/lesbian-power-boost/index.html`
- [ ] `lesbian-real-stories.html` copied to `/public/static/pride/lesbian-real-stories/index.html`
- [ ] `PrideStaticViewer.tsx` created
- [ ] `/pride/content/:slug` route added

### Final Verification

- [ ] All routes load
- [ ] All DB minis save/load data per user
- [ ] Static minis load without auth/DB errors
- [ ] Claude HTML minis load inside iframe
- [ ] TypeScript passes
- [ ] Build passes

---

# ✅ FINAL EXPECTED RESULT

PrideMantra will have:

| Group              | Count | Type               |
| ------------------ | ----: | ------------------ |
| Dynamic Minis      |     7 | DB + Auth Required |
| Static Minis       |    10 | No DB / No Auth    |
| Static Mini Claude |     9 | HTML iframe        |

Total PrideMantra Minis: **26**
