# Antigravity Prompt — Ghana MMDCEs 2025 Web App

---

## PROMPT (paste this into Antigravity in Planning mode)

---

Build a polished, fully responsive web application called **"Ghana MMDCEs 2025"** — a public directory of all 261 Metropolitan, Municipal and District Chief Executives (MMDCEs) appointed under the John Dramani Mahama Administration in 2025. The app must look professional and modern, inspired by civic/government data portals (think: clean typography, Ghana's national colours — red, gold, and green — used as accents, white/light-grey backgrounds for readability).

---

### TECH STACK

- **Frontend:** React (Vite) + plain CSS (no Tailwind)
- **Data:** Embed the CSV data directly as a JavaScript array of objects at the top of a `data.js` file — do NOT use a backend or database
- **Map:** Use the **Leaflet.js** library (`react-leaflet`) for an interactive map of Ghana
- **Charts:** Use **Recharts** for statistics visualisations

---

### DATA STRUCTURE

Each record has these fields. Embed all 261 rows as a JS array:

```js
{
  id: 1,
  no: 1,
  name: "Joseph Akparbo",
  district: "Asunafo North Municipal",
  assemblyType: "Municipal",   // "Metropolitan" | "Municipal" | "District"
  region: "Ahafo Region",
  gender: "Male"               // "Male" | "Female" | "Unknown"
}
```

**Gender field rules** — mark as `"Female"` for the following names (all others default to `"Male"`, except `"(Nominee Pending)"` which is `"Unknown"`):
Pearl Patricia Ankrah, Sarah Amoakoaa, Maame Sarfoah Appiah, Grace Agyemang Asamoah, Jerryne Asante, Faustilove Appiah Kannin, Eunice Ohenewaa Ansu, Hajia Fati Abubakar, Gloria Opoku Gyamfi, Oliva Bentil, Charlotte Boakye, Margaret Naana Ackom, Linda Ahenkora, Kate Mawusi Babanawo, Lydia Ohenewa Sarah, Rebecca Chissah, Paulina Akabila, Mercy Korang, Ella Esinam Nengo, Rosina Z. Abdul-Rahman, Anne Musah, Faustina Akeyom Abulu, Naawulie Ireneous Basingbie, Mary Haruna, Victoria Amefadzi Yawa Doe, Victoria Dzeklo, Sandra Seyram Kpedor, Priscilla Yorke, Benedicta Boadi, Sophia Aubynn.

**The 16 regions (use these exact strings):**
Ahafo Region, Ashanti Region, Bono Region, Bono East Region, Central Region, Eastern Region, Greater Accra Region, North East Region, Northern Region, Oti Region, Savannah Region, Upper East Region, Upper West Region, Volta Region, Western Region, Western North Region.

---

### APP STRUCTURE — 3 PAGES / VIEWS (use React Router)

#### 1. HOME PAGE (`/`)

- Full-width hero banner with Ghana's coat of arms emoji 🇬🇭 and the title: **"Ghana MMDCEs 2025"** and subtitle: *"Metropolitan, Municipal and District Chief Executives — Mahama Administration"*
- Below the hero: a **statistics bar** showing 4 KPI cards in a row:
  - Total MMDCEs: **261**
  - Female Appointees: **30** (with a pink/rose accent)
  - Male Appointees: **230** (with a blue accent)
  - Regions: **16**
- Below the stats: a **bar chart** (Recharts `BarChart`) showing the number of MMDCEs per region, sorted descending. X-axis = region name (rotated 45°), Y-axis = count. Use Ghana gold (`#FCD116`) as bar fill.
- Below the chart: a **gender breakdown donut chart** (Recharts `PieChart`) with two slices: Female (rose) and Male (steel blue), with a legend.
- Below charts: a **"Browse Directory"** call-to-action button linking to `/directory`.

#### 2. DIRECTORY PAGE (`/directory`)

This is the main data table page.

**Filter bar at the top (all filters work together simultaneously):**

- **Search box** — live search across MMDCE name and district name (case-insensitive)
- **Region dropdown** — options: "All Regions" + all 16 region names, alphabetically sorted
- **Assembly Type dropdown** — options: "All Types", "Metropolitan", "Municipal", "District"
- **Gender dropdown** — options: "All", "Female", "Male"
- **Sort dropdown** — options: "Name (A–Z)", "Name (Z–A)", "Region", "District (A–Z)", "Assembly Type"
- **Reset Filters button** — clears all filters back to defaults
- **Results count** — show e.g. `Showing 47 of 261 MMDCEs`

**Data table below the filters:**

| # | Name | District / Assembly | Assembly Type | Region | Gender |
|---|------|---------------------|--------------|--------|--------|

- Zebra-striped rows (light grey alternating)
- Assembly Type shown as a **colour-coded badge**: Metropolitan = deep red, Municipal = gold, District = green
- Gender shown as a small icon: ♀ for Female, ♂ for Male
- Clicking any row opens the **Detail Modal** (see below)
- Table is paginated: **20 rows per page**, with Previous / Next buttons and a page indicator ("Page 2 of 7")

**Detail Modal (opens on row click):**

A centred modal overlay showing:
- Full name (large, bold)
- Region
- District / Assembly name
- Assembly Type badge
- Gender
- A placeholder note: *"Appointed under the Mahama Administration, 2025"*
- Close button (X) and clicking outside the modal closes it

#### 3. MAP PAGE (`/map`)

Interactive map of Ghana using **react-leaflet** with the **OpenStreetMap** tile layer.

- Initial view centred on Ghana: lat `7.9465`, lng `-1.0232`, zoom level `7`
- Each MMDCE is represented by a **circle marker** on the map, placed at approximate coordinates for their district capital. Use the following approximate region centroid coordinates as fallbacks if you cannot look up individual district capitals:
  - Ahafo: (7.0, -2.5), Ashanti: (6.7, -1.6), Bono: (7.7, -2.5), Bono East: (7.8, -1.2), Central: (5.5, -1.2), Eastern: (6.3, -0.3), Greater Accra: (5.6, -0.2), North East: (10.5, -0.4), Northern: (9.5, -1.0), Oti: (8.0, 0.3), Savannah: (9.0, -1.8), Upper East: (10.7, -0.9), Upper West: (10.5, -2.3), Volta: (6.8, 0.4), Western: (5.4, -2.2), Western North: (6.7, -2.6)
- Marker colour by assembly type: Metropolitan = red, Municipal = gold/orange, District = green
- Clicking a marker opens a **Leaflet popup** showing: Name, District, Region, Assembly Type badge, Gender
- **Sidebar panel** on the left (or top on mobile): filter by Region (dropdown) and Assembly Type (dropdown), both live-filter the visible markers
- **Map legend** in the bottom-right corner of the map showing the colour coding

---

### NAVIGATION

- Sticky top navbar with:
  - Left: 🇬🇭 logo + "Ghana MMDCEs 2025" text
  - Right: nav links — Home | Directory | Map
  - Active link is underlined with Ghana gold
- On mobile (<768px): hamburger menu that opens a slide-down nav

---

### DESIGN REQUIREMENTS

- **Colour palette:** Background `#FAFAFA`, text `#1A1A1A`, primary accent Ghana Gold `#FCD116`, secondary accent Ghana Green `#006B3F`, danger/metro accent Ghana Red `#CE1126`
- **Font:** Use Google Fonts — `Inter` for UI, `Merriweather` for headings (load via `<link>` in `index.html`)
- **Spacing:** Generous padding, max content width `1200px` centred
- **Cards and modals:** subtle `box-shadow`, `border-radius: 8px`
- **Transitions:** Smooth `0.2s ease` on hover states and modal open/close
- **Accessibility:** All interactive elements must have `aria-label` attributes; modal must trap focus; colour contrast must meet WCAG AA
- The app must look polished and professional — NOT like a basic tutorial app

---

### FILE STRUCTURE TO GENERATE

```
/src
  /components
    Navbar.jsx
    StatCard.jsx
    FilterBar.jsx
    DataTable.jsx
    Pagination.jsx
    DetailModal.jsx
    MapView.jsx
    RegionBarChart.jsx
    GenderDonutChart.jsx
  /pages
    Home.jsx
    Directory.jsx
    Map.jsx
  data.js          ← all 261 records as JS array
  App.jsx
  main.jsx
  styles.css
index.html
```

---

### IMPLEMENTATION ORDER

Please follow this order:
1. Create `data.js` with all 261 records including the gender field
2. Build the shared `Navbar` and routing skeleton
3. Build the `Directory` page with filters and table (this is the core feature)
4. Build the `Home` page with KPI cards and charts
5. Build the `Map` page with Leaflet
6. Apply final styling and responsive layout
7. Test all filter combinations and edge cases (e.g. "Nominee Pending", special characters in names)

---

### NOTES

- The entry `(Nominee Pending)` for Tatale/Sanguli District, Northern Region should be displayed gracefully — show the name as *"Nominee Pending"* in italic
- Do not hardcode region counts — always derive them dynamically from the data array
- All filter state should be managed in React state (no URL params needed)
- Do not use any external UI component libraries (no MUI, no Chakra, no Ant Design) — build all components from scratch with plain CSS

---
