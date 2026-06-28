# Design System

The visual language is **premium enterprise consulting**, not cybersecurity clichés. Every decision reinforces executive credibility. Professionalism always takes precedence over visual effects.

---

## Design Principles

- Executive credibility over visual spectacle
- Professionalism before animation
- Trust is built through clarity, not decoration
- Typography and spacing carry the weight — not effects
- Dark, authoritative, precise — like premium enterprise software

**Avoid at all times:**
- Hacker clichés (Matrix effects, anonymous masks, terminal-style everything)
- Excessive neon or glow effects
- Gaming UI aesthetics
- Animations that distract from content

---

## Color Palette

All colors are defined as CSS custom properties in `app/globals.css`. Always use tokens — never hardcode hex values in components.

### Backgrounds

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#060B17` | Page background, primary sections |
| `--bg2` | `#080E1C` | Alternate sections (services, process, testimonials) |
| `--bg3` | `#0B1120` | Cards, hover state for `--bg2` elements |
| `--card` | `#0C1220` | Card surfaces |
| `--card2` | `#0E1428` | Elevated card surfaces |

### Brand

| Token | Value | Usage |
|---|---|---|
| `--blue` | `#1A6BFF` | Primary brand accent, CTAs, highlights |
| `--blue2` | `#0D52CC` | Hover state for `--blue` elements |
| `--blue3` | `rgba(26,107,255,0.10)` | Icon backgrounds, badge backgrounds |
| `--blue4` | `rgba(26,107,255,0.06)` | Subtle brand tints |

### Text

| Token | Value | Usage |
|---|---|---|
| `--txt` | `#FFFFFF` | Primary text, headings |
| `--txt2` | `#8BA8C4` | Body text, descriptions |
| `--txt3` | `rgba(255,255,255,0.28)` | Muted text, labels, metadata |

### Borders

| Token | Value | Usage |
|---|---|---|
| `--border` | `rgba(255,255,255,0.07)` | Standard dividers, card outlines |
| `--border2` | `rgba(26,107,255,0.18)` | Brand-tinted borders, icon borders |

### Status

| Token | Value | Usage |
|---|---|---|
| `--green` | `#00D67A` | Available status, success, positive metrics |
| `--red` | `#FF4466` | Critical findings, alerts, negative metrics |
| `--amber` | `#FF9500` | Warnings, star ratings, medium severity |
| `--purple` | `#8B5CF6` | Secondary accent for methodology tags |

### Shadow

| Token | Value | Usage |
|---|---|---|
| `--glow` | `0 0 30px rgba(26,107,255,0.2)` | Subtle brand glow on key elements |

---

## Typography

Two fonts, both self-hosted via `next/font/google`:

| Variable | Font | Usage |
|---|---|---|
| `--font-inter` | Inter | All body text, headings, UI |
| `--font-mono` | JetBrains Mono | Code, step numbers, technical labels |

### Scale

| Use | Size | Weight | Tracking |
|---|---|---|---|
| H1 (hero) | `clamp(2.3rem, 3.8vw, 3.5rem)` | 800 | `-0.04em` |
| H2 (section) | `clamp(1.55rem, 2.8vw, 2.3rem)` | 800 | `-0.03em` |
| H3 (card) | `0.9rem` – `1rem` | 700 | `-0.02em` |
| Body | `1rem` / `15px` base | 400 | normal |
| Body muted | `0.82rem` – `0.9rem` | 400 | normal |
| Label / eyebrow | `0.68rem` | 700 | `+0.08em` – `+0.12em` |
| Badge / tag | `0.68rem` | 600–700 | `+0.04em` |
| Mono step numbers | `0.6rem` | 700 | `+0.14em` |

### Line Heights

- Hero paragraph: `1.75`
- Body / card: `1.7` – `1.8`
- Headings: `1.08` – `1.1`

---

## Spacing System

Layout spacing is driven by `LAYOUT` constants in `lib/layout/constants.ts`. Never hardcode spacing values in components — reference the constant.

| Constant | Value | Usage |
|---|---|---|
| `containerMaxWidth` | `1180px` | Standard inner container max-width |
| `containerPaddingH` | `48px` | Container horizontal padding |
| `execContainerMaxWidth` | `1360px` | Executive Briefing wider container |
| `execContainerPaddingH` | `32px` | Executive Briefing container padding |
| `sectionPaddingH` | `48px` | Section-level horizontal padding |
| `sectionPaddingV` | `90px` | Standard section vertical padding |
| `whyHirePaddingV` | `80px` | Why Hire Me section vertical padding |
| `ctaPaddingV` | `100px` | CTA section vertical padding |
| `sectionHeaderMarginBottom` | `44px` | Gap between section header and card grid |
| `labelMarginBottom` | `10px` | Gap between eyebrow label and H2 |

### Responsive Padding Reduction

Defined in `globals.css` via `@media` rules, not inline styles:

| Breakpoint | Section padding | Grid behavior |
|---|---|---|
| `≤1024px` | `24px` horizontal | 3-col → 1-col, 4-col → 2-col, hero collapses |
| `≤640px` | `16px` horizontal | 4-col → 1-col, footer → 1-col |

---

## Container

The `Container` component (`components/ui/Container.tsx`) wraps inner section content with the standard max-width and horizontal padding. Always use `Container` for section inner content — never create ad-hoc wrappers.

```tsx
<Container>
  {/* section content */}
</Container>

// With overrides (for special cases like exec briefing):
<Container maxWidth={LAYOUT.execContainerMaxWidth} paddingH={LAYOUT.execContainerPaddingH}>
```

---

## Border Radius

| Usage | Value |
|---|---|
| Cards, panels | `8px` |
| Badges, tags, small buttons | `3px`–`5px` |
| Buttons (CTAs) | `5px`–`6px` |
| Icon containers | `8px` |
| Avatar / circular | `50%` (full) |
| Dot indicators | `50%` (full) |

---

## Grid System

Section card grids use inline `style` for column layout, with responsive collapse via utility classes in `globals.css`.

| Class | Desktop | ≤1024px | ≤640px |
|---|---|---|---|
| `.sec-grid-3` | `repeat(3,1fr)` | `1fr` | `1fr` |
| `.sec-grid-4` | `repeat(4,1fr)` | `1fr 1fr` | `1fr` |
| `.meet-grid` | `340px 1fr` | `1fr` | `1fr` |
| `.meet-approach` | `repeat(3,1fr)` | `repeat(3,1fr)` | `1fr` |

Grids use `gap: 1px` (`gap-px`) with a border-colored background, which creates the divider lines between cards without explicit borders.

---

## Animation Principles

Animations must be **purposeful**, **subtle**, and **non-distracting**.

| Animation | Principle |
|---|---|
| Scroll reveal (`.rv`) | `opacity: 0 → 1`, `translateY(24px → 0)`, 650ms ease |
| Card top bar | `scaleX(0 → 1)` on hover, 450ms, `origin-left` |
| Card left bar | `scaleY(0 → 1)` on hover, 400ms, `origin-top` |
| Globe rotation | Canvas-drawn, continuous, subtle |
| Marquee scroll | `translateX` loop, 30–40s linear infinite |
| Testimonials | `translateX` loop, 55s linear, pauses on hover |
| Availability pulse | `box-shadow` pulse, 2s infinite |
| Ticker | `translateX` loop, 20s linear infinite |

**Reduced motion:** All `.rv` animations are disabled for users with `prefers-reduced-motion`. New animations must also respect this preference.

---

## CSS Hover Utilities

JS-based hover is forbidden in server components. Use these CSS classes instead:

| Class | Effect |
|---|---|
| `.hover-bg2` | `background → var(--bg2)` on hover |
| `.hover-bg3` | `background → var(--bg3)` on hover |

New hover utilities can be added to `globals.css` under the `HOVER UTILITIES` section if needed.

---

## Section Structure Pattern

Every section follows this structure:

```tsx
<section id="section-id" style={{ padding: '90px 48px', background: 'var(--bg)', borderTop: '1px solid var(--border)' }} aria-labelledby="section-heading">
  <Container>
    {/* Section header */}
    <div className="mb-[44px]">
      <p className="inline-flex items-center gap-2 text-[.68rem] font-bold tracking-[.12em] uppercase mb-2.5" style={{ color: 'var(--blue)' }}>
        <span className="w-4 h-px" style={{ background: 'var(--blue)' }} aria-hidden="true" />
        Eyebrow Label
      </p>
      <h2 id="section-heading" className="text-[clamp(1.55rem,2.8vw,2.3rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
        Section Heading
      </h2>
    </div>

    {/* Card grid */}
    <div className="grid gap-px sec-grid-3" style={{ gridTemplateColumns: 'repeat(3,1fr)', background: 'var(--border)' }}>
      {items.map(item => <Card key={item.id} item={item} />)}
    </div>
  </Container>
</section>
```

---

## Accessibility Standards

- WCAG 2.1 AA minimum
- All interactive elements have accessible names (`aria-label` or visible text)
- All sections have `aria-labelledby` pointing to their H2
- Heading hierarchy must be sequential: H1 → H2 → H3 (no skips)
- External links include screen reader new-tab notice via `aria-label`
- Decorative elements have `aria-hidden="true"`
- Lists used for genuinely list-like content (`role="list"`, `role="listitem"`)
- `prefers-reduced-motion` respected for all animations
- Color contrast must meet WCAG AA (4.5:1 for normal text, 3:1 for large text)
