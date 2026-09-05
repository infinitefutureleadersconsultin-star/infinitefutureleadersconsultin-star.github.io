# ESTHER AND MAYS — BUILD STANDARD

**Repository:** `infinitefutureleadersconsultin-star.github.io`
**Owner:** The Esther and Mays Group LLC
**Path in repo:** `docs/ESTHER_AND_MAYS_BUILD_STANDARD.md`

**This file is the READ FIRST for every prompt run against this repository.** If a prompt's instruction contradicts anything here, this file wins, and the agent must say so out loud rather than silently comply.

This standard governs only this project. Do not import conventions, file names, or assumptions from any other repository.

---

## 0. WHAT THIS SITE IS FOR

The reader is a school district procurement officer, a district administrator, or a healthcare or government buyer deciding whether to contract with this company. A secondary reader is a district-appointed liaison checking on program status.

Everything below serves that reader. Nothing on this site exists to impress a peer, a founder, or an investor.

**Context on the rebuild:** this repository previously held a TikTok brand-review product for a business that no longer operates. That business is closed. All of its code, copy, routes, data models, and payment machinery are being removed. Nothing from it carries forward except the framework foundation.

---

## 1. DESIGN LANGUAGE

The target is the visual and interaction language of well-made desktop software. Restrained, content-first, and conventional enough that no one has to learn where anything is.

**Principles**

- **Content first.** The interface recedes. If a visual element is not carrying information, remove it.
- **Conventional placement.** Logo top-left. Navigation top-right. Standard footer groupings. Do not invent navigation patterns — familiarity is the goal.
- **Type does the work.** Hierarchy comes from size, weight, and space. Not from color, boxes, or decoration.

**Concrete rules**

- **Typeface:** system font stack — `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`. No custom web fonts.
- **Color:** near-black text on white or near-white. One accent color, used only for links and the single primary action on a page. No second accent.
- **Buttons:** solid fill or hairline border. Modest radius. No gradient, no drop shadow, no glow.
- **Separators:** 1px hairline rules. Not shadowed cards, not heavy borders.
- **Space:** generous vertical rhythm. Large section padding. Whitespace is the primary design tool.
- **Body type:** 17–19px. Line length capped around 70 characters.
- **Headings:** sentence case. Not Title Case, not all caps.
- **Motion:** none. At most a single subtle fade on initial page load.
- **Imagery:** real photographs of real things, product screenshots, or nothing at all. Nothing is an acceptable answer.

**Boundary:** use the system font stack and standard layout conventions. Do not reproduce Apple's marketing pages, copy their page structures section for section, or use their imagery, icons, or proprietary assets.

---

## 2. HARD PROHIBITIONS

Not preferences. A build violating any of these is rejected regardless of how good it otherwise looks.

**Visual**
- No gradient buttons, in any color.
- No emoji as icons, bullets, or section markers — anywhere.
- No scroll-triggered animation, parallax, reveal-on-scroll, or counting-up numbers.
- No custom cursor effects.
- No glassmorphism, neon, or "AI startup" visual language.
- No generic stock photography — no smiling teams around laptops, no abstract technology imagery.
- No AI-generated photographs of people. Ever.

**Content**
- No fabricated testimonials, reviews, quotes, or client names.
- No metric that cannot be substantiated on request. If it can't be proven, it doesn't appear.
- No fake customer accounts, seeded demo users, or placeholder personas presented as real.
- No AI-generated filler copy. Every sentence says something specific and true.
- No claims about credentials, certifications, partnerships, or clients not currently held and verifiable.
- No lorem ipsum, no template default text, no "coming soon" in production.

**Build artifacts**
- No "Made with AI," "Built with v0," "Deployed on Vercel," or any generator badge in shipped output.
- No framework template leftovers anywhere, including `public/`.
- No commented-out code shipped to production.

---

## 3. REQUIRED

- **Favicon** — a real one, not the framework default.
- **Privacy Policy page** — real content, stable route, linked in the footer.
- **Terms and Conditions page** — same.
- **WCAG 2.1 Level AA.** Not optional polish. CMS requires web and digital content to meet WCAG 2.1-AA and may request a VPAT. Build to it from the first commit: keyboard navigation on every interactive element, visible focus states, labeled form inputs, sufficient contrast, meaningful alt text, semantic headings in order, and error messages that are announced rather than only colored.
- **Responsive** at 375px, 768px, and 1280px minimum.
- **One company identity.** This site is The Esther and Mays Group LLC. No other brand name appears anywhere, including metadata, package name, and repository description.
- **Consistent contact details** on every page, matching the CMS vendor record and client proposals exactly.

---

## 4. COMPLIANCE CONSTRAINT — read before designing any data feature

This company is pursuing work with Charlotte-Mecklenburg Schools. CMS assesses vendors through its Technology Vendor Approval Process when a **digital platform needs access to staff or student data**. Vendors in scope must produce a data collection worksheet, a confidentiality and security agreement, a self-assessment, and a third-party audit report — SOC 2 Type 2, SOC 3, ISO 27001, HITRUST, or FedRAMP.

**Staying out of that scope is a deliberate architectural goal of this site.** Program delivery on company-owned laptops with a company-held API credential reduces exposure but does not by itself determine scope. What this application stores does.

In any reporting, dashboard, or portal feature:

- **Never store, transmit, or display student names, student IDs, dates of birth, contact details, or any other individually identifying student information.**
- **Never create student accounts or student logins.**
- Reporting is **aggregate only** — cohort counts, percentages, status. "28 of 30 attended." Never a row per student.
- No district staff account may expose individual student records, because no individual student records exist in this system.
- If a request would require storing student-level data, **stop and flag it.** Do not implement and then note the concern. The concern is the answer.

Individual student progress, where a school needs it, is delivered as a document to the school. It does not live in this application.

Whether CMS considers this project in or out of scope is **UNVERIFIED**. Only CMS determines it. Build as though staying out of scope matters, because it does.

---

## 5. TONE

Sober. Specific. Slightly boring is correct.

- Plain language a district administrator would use.
- Lead with what is true and verifiable, not with what is impressive.
- No exclamation marks. No hype adjectives — "cutting-edge," "revolutionary," "world-class," "seamless," "innovative."
- Short sentences. No marketing rhythm.
- Where the company is new or small, say so plainly. A district trusts a vendor who states limits.

---

## 6. FILE DISPOSITION PROCESS

This repository is being rebuilt from the inside out. Every file gets classified and the reasoning gets recorded.

Each file is exactly one of:

- **KEEP** — serves the new purpose as-is.
- **REWRITE** — the path or shell survives, contents are replaced.
- **DELETE** — belongs to the closed business or the old product, no replacement needed.
- **UNSURE** — cannot be classified without the owner's input. Never guess into a decision.

For every file marked REWRITE or DELETE, record:
1. What it was.
2. Why it is going.
3. What replaces it, or explicitly that nothing does.

That record lives in `docs/REBUILD_LOG.md`, committed alongside the changes, so the reasoning survives the conversation it came from.

**Before the first deletion:** tag the current HEAD (`git tag pre-rebuild-<date>`) so the previous state is addressable. History is not the safeguard; a named tag is.

---

## 7. LAUNCH GATE

The site does not go live until **all** of these are true:

- [ ] Connected to a custom domain owned by the company
- [ ] Favicon present
- [ ] Privacy Policy live
- [ ] Terms and Conditions live
- [ ] Zero fabricated content anywhere in the build
- [ ] Every metric substantiated
- [ ] Keyboard navigable end to end
- [ ] Contrast verified against WCAG 2.1 AA
- [ ] No template leftovers anywhere
- [ ] Metadata accurate — title, description, Open Graph, package name
- [ ] Contact details match the CMS vendor record
- [ ] No reference to the closed business remains in code, copy, or metadata

Until every box is checked, the deployment stays on a preview URL.

---

## 8. AGENT WORKING RULES

- **Read before writing.** Show current file contents before proposing a change to them.
- **Stop for approval** before deleting any file, changing routing, or touching `app/api/`.
- **Do not resolve ambiguity by picking the likely answer.** If two readings fit, say both fit and ask.
- **Label uncertainty as UNVERIFIED**, in those words. Never upgrade an unverified item without new evidence — a plausible explanation is not evidence.
- **Verify your own work.** After a change, show the output proving it worked. An assertion that it works is not proof.
- **Never invent content to fill a section.** An empty section is a question for the owner, not a prompt to write something.
