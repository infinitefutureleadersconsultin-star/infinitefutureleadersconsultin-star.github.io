# Build Notes — Phase B

## DECISIONS

- **Accent color:** `#2b5797` on `#ffffff`. Contrast ratio ~7:1, well above AA 4.5:1. Used for links and single primary actions only.
- **Favicon:** SVG favicon at `app/icon.svg` with dark square and "EM" letters. Next.js App Router serves SVG favicons natively from this path. Old `favicon.ico` deleted.
- **Inline color redundancy:** Some agents applied `style={{ color: "#1a1a1a" }}` or `text-[#1a1a1a]` on elements that already inherit from `body { color: #1a1a1a }`. These are harmless and left in place rather than risk introducing regressions by touching every file.
- **Layout structure:** `body` is `flex flex-col min-h-screen`, `main` is `flex-1`. Footer sticks to bottom on short pages.
- **Skip-to-content link:** Added as first focusable element in layout, targets `#main-content`.
- **No contact form:** The `/contact` page has mailto and tel links only. A form would require a backend; this site has none.
- **Privacy and terms:** Written in plain language. HTML comments note these need counsel review before reliance in a district engagement.

## BLOCKED

Nothing blocked.

## UNRESOLVED

Nothing unresolved. All facts on the site trace to the ledger.

---

## Verification results

### Build
`npm run build` — passes. 12 routes (10 pages + `/_not-found` + `/icon.svg`).

### Lint
`npm run lint` — passes after fixing one unescaped apostrophe in `app/approach/page.tsx`.

### Forbidden claims sweep
Grep for `testimonial|trusted|proven|leading|award|certified|partner|students served|success rate|CMS|Charlotte-Mecklenburg|TikTok|HUB|MWSBE` in `app/` and `components/`.

Positive control passed (grep for "esther" returned matches). All results were false positives: `leading-tight` (Tailwind class), `leading-relaxed` (Tailwind class), `partner teacher` (from ledger, not a partnership claim). Zero actual forbidden claims.

### Placeholder sweep
Grep for `TODO|lorem|placeholder|Coming soon|TBD`. Only matches: the two permitted HTML comments in `/privacy` and `/terms`.

### Contrast pairs

| Foreground | Background | Usage | Ratio | Passes AA |
|---|---|---|---|---|
| `#1a1a1a` | `#ffffff` | Body text, headings | ~17:1 | Yes |
| `#2b5797` | `#ffffff` | Links, accent text | ~7:1 | Yes |
| `#1e3f6f` | `#ffffff` | Link hover state | ~9.5:1 | Yes |
| `#4a5565` (gray-600) | `#ffffff` | Footer text, copyright, secondary text | ~7.1:1 | Yes |
| `#6a7282` (gray-500) | `#ffffff` | Footer location text (Phase A) | ~4.6:1 | Yes (at 14px/18px body) |
| `#d4d4d4` | `#ffffff` | Border color (not text) | N/A | N/A (decorative) |
| `#ffffff` | `#2b5797` | Button primary text on accent bg | ~7:1 | Yes |
| `#6b7280` | `#ffffff` | Report table dash values | ~4.6:1 | Yes (at 16px+ body) |

All text contrast pairs meet WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text).

---

## Fact check — every claim traced to ledger

### Home page (`/`)
| Claim | Ledger source |
|---|---|
| "Students build and ship real software" | Program: "Students build a real, working iOS application from nothing" |
| "designs, constructs, debugs, and demonstrates a working iOS application" | Program: "design, build, debug, and demonstrate" |
| Five student actions (decide, direct AI, structure, debug, build onto device) | Five items specified in prompt Part 2 from program ledger |
| Four AI handling bullets | "How AI is handled" ledger section, verbatim in substance |
| Track B: 4 weeks, 30 students, 2 hours, 3 sessions/week | Track B ledger |
| Track A: 8 weeks, one class, one partner teacher, 3-4 sessions/week | Track A ledger |
| Pilot: one school, 30 students, four weeks, $4,950 | Pilot ledger |
| Four stages: Preparation, Weeks 1-2, Weeks 3-4, Close | Pilot stages ledger |

### Program page (`/program`)
| Claim | Ledger source |
|---|---|
| "real, working iOS application from nothing" | Program ledger |
| "fitness tracker, a memo tool" | "Projects are deliberately small and finishable — a fitness tracker, a memo tool" |
| "Xcode on company-provided Mac laptops" | Program tooling ledger |
| "AI development tools the way working engineers use them" | Program ledger |
| "free Apple account and owns their source code outright" | Program ownership ledger |
| "seven days at a time" provisioning | Program ledger |
| Track B full details | Track B ledger |
| Track A full details | Track A ledger |
| What the company provides list | "What the company provides" ledger |
| What a district provides list | "What a district provides" ledger |

### Pilot page (`/pilot`)
| Claim | Ledger source |
|---|---|
| "$4,950" | Pilot price ledger |
| "under the $5,000 informal-purchase threshold" | Pilot ledger |
| Four stages with details | Pilot stages ledger |
| Phase One: four schools, ~$9,000/school | Phase One ledger |
| Two concurrent schools, one instructor and one assistant, 30 laptops | Phase One ledger |
| Weekly schedule times | Phase One ledger |
| "current device set supports one cohort at a time" | Honest constraint from prompt |

### Approach page (`/approach`)
| Claim | Ledger source |
|---|---|
| Four AI handling points | "How AI is handled" ledger, verbatim |
| Four data/privacy points | "Data and privacy posture" ledger |
| Background-checked personnel | "What the company provides" — "background-checked personnel" |
| Parent consent for device install | "parent consent process for students installing to a personal device" |
| Incident reporting procedure | "incident reporting procedure" in documentation list |
| WCAG 2.1 Level AA | Accessibility ledger |
| "welcomes that review early rather than late" | Data and privacy posture ledger |

### Reporting page (`/reporting`)
| Claim | Ledger source |
|---|---|
| "aggregate only" | "Reporting is aggregate only" ledger |
| "does not collect or store student names, identifiers..." | Data privacy ledger |
| Five measure names | Reporting and measurement ledger |
| Empty value cells (dashes only) | Prompt: "Do not put invented numbers in this table" |

### About page (`/about`)
| Claim | Ledger source |
|---|---|
| Bank of America AI governance, 40+ lines of business | Founder background ledger |
| Wells Fargo, Corporate Risk Development Program | Founder background ledger |
| Army Reserve, 88N, April 2019 – January 2023 | Founder background ledger |
| B.S. Criminal Justice, Fayetteville State | Founder background ledger |
| Behavioral health EHR for "a clinical outreach organization" | Current work ledger (client not named) |
| "custom software and operations systems" | Company ledger |

### Documents page (`/documents`)
| Claim | Ledger source |
|---|---|
| All 11 document items | "Documentation available on request" ledger, complete list |
| "available on request" | Ledger: "State these as available on request" |
| No download links | Ledger: "Do not link to files that do not exist" |

### Contact page (`/contact`)
| Claim | Ledger source |
|---|---|
| Issiah McLean | Founder name ledger |
| The Esther and Mays Group LLC | Company name ledger |
| Charlotte, North Carolina | Location ledger |
| (919) 495-8478 | Phone ledger |
| issiahmclean1999@gmail.com | Email ledger |

### Privacy page (`/privacy`)
| Claim | Ledger source |
|---|---|
| No cookies, no analytics, no forms | Site architecture (informational only, no backend) |
| No student data collected through website | Data privacy ledger |
| Contact details | Phone and email ledger |

### Terms page (`/terms`)
| Claim | Ledger source |
|---|---|
| "informational purposes only" | Site purpose |
| "separate written agreement" | Standard business practice, not a factual claim about the company |
| North Carolina governing law | Company location ledger |
| Contact details | Phone and email ledger |
