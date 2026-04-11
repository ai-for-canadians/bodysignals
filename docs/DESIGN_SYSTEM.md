# InfoBank Design System

> Reference this document in every site build.

## Brand

### Mission
"Real information for real life"

### Voice Principles
| Principle | Description |
|-----------|-------------|
| Trustworthy | Cite sources, acknowledge uncertainty |
| Accessible | No jargon without explanation |
| Empowering | Help people act, not just learn |
| Balanced | Present multiple perspectives |

---

## Colors

### Dark Theme (Primary)

| Use | Tailwind Class | Hex |
|-----|----------------|-----|
| Page Background | bg-slate-900 | #0f172a |
| Card/Surface | bg-slate-800 | #1e293b |
| Elevated Surface | bg-slate-700 | #334155 |
| Border | border-slate-700 | #334155 |
| Border (lighter) | border-slate-600 | #475569 |
| Text Primary | text-slate-50 | #f8fafc |
| Text Secondary | text-slate-400 | #94a3b8 |
| Text Muted | text-slate-500 | #64748b |

### Accent Colors

| Use | Tailwind Class | Hex |
|-----|----------------|-----|
| Primary Accent | bg-amber-500 | #f59e0b |
| Accent Hover | bg-amber-400 | #fbbf24 |
| Accent Pressed | bg-amber-600 | #d97706 |
| Accent Text | text-amber-500 | #f59e0b |

### Semantic Colors

| Use | Tailwind Class |
|-----|----------------|
| Success | text-emerald-400, bg-emerald-500/20 |
| Warning | text-amber-400, bg-amber-500/20 |
| Error | text-red-400, bg-red-500/20 |
| Info | text-blue-400, bg-blue-500/20 |

### Evidence Rating Colors

| Rating | Label | Classes |
|--------|-------|---------|
| A | Strong Evidence | text-emerald-400 bg-emerald-500/20 |
| B | Good Evidence | text-green-400 bg-green-500/20 |
| C | Moderate Evidence | text-amber-400 bg-amber-500/20 |
| D | Weak Evidence | text-orange-400 bg-orange-500/20 |
| F | No Evidence | text-red-400 bg-red-500/20 |

---

## Typography

### Font Stack
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Scale

| Element | Classes |
|---------|---------|
| Hero Title | text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight |
| Page Title | text-3xl md:text-4xl font-bold |
| Section Heading | text-2xl font-semibold |
| Card Title | text-xl font-semibold |
| Large Body | text-lg |
| Body | text-base |
| Small | text-sm |
| Tiny | text-xs |

### Text Colors by Context

| Context | Class |
|---------|-------|
| Headings | text-slate-50 |
| Body text | text-slate-300 |
| Secondary/meta | text-slate-400 |
| Muted | text-slate-500 |
| Links | text-amber-500 hover:text-amber-400 |

---

## Spacing

### Section Spacing
```
py-16 md:py-24    (standard section)
py-12 md:py-16    (compact section)
py-24 md:py-32    (hero section)
```

### Container
```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

### Common Spacing

| Use | Class |
|-----|-------|
| Section gap | space-y-16 or gap-16 |
| Card grid gap | gap-6 or gap-8 |
| Inside cards | p-6 |
| Between elements | space-y-4 |
| Inline items | gap-2 or gap-3 |

---

## Components

### Buttons

#### Primary Button
```jsx
<button className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900">
  Button Text
</button>
```

#### Secondary Button
```jsx
<button className="border border-slate-600 hover:border-slate-500 hover:bg-slate-800 text-slate-50 font-semibold px-6 py-3 rounded-lg transition-colors">
  Button Text
</button>
```

#### Ghost Button
```jsx
<button className="text-slate-400 hover:text-slate-50 font-medium px-4 py-2 rounded-lg transition-colors">
  Button Text
</button>
```

### Cards

#### Basic Card
```jsx
<div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
  <h3 className="text-xl font-semibold text-slate-50 mb-2">Title</h3>
  <p className="text-slate-400">Description text here.</p>
</div>
```

#### Interactive Card
```jsx
<a href="#" className="block bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 hover:bg-slate-750 transition-colors">
  <h3 className="text-xl font-semibold text-slate-50 mb-2">Title</h3>
  <p className="text-slate-400">Description text here.</p>
</a>
```

### Inputs

#### Text Input
```jsx
<input
  type="text"
  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
  placeholder="Enter text..."
/>
```

#### With Label
```jsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-slate-300">
    Label Text
  </label>
  <input
    type="text"
    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
  />
</div>
```

### Badges

#### Evidence Rating Badge
```jsx
<span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
  A - Strong Evidence
</span>
```

#### Status Badge
```jsx
<span className="text-xs font-medium px-2 py-1 rounded bg-amber-500/20 text-amber-400">
  Beta
</span>
```

---

## Layout

### Page Structure
```jsx
<div className="min-h-screen bg-slate-900 text-slate-50">
  <Header />
  <main>{/* Content */}</main>
  <Footer />
</div>
```

### Section
```jsx
<section className="py-16 md:py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section content */}
  </div>
</section>
```

### Card Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Two Column with Sidebar
```jsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">{/* Main content */}</div>
  <aside>{/* Sidebar */}</aside>
</div>
```

---

## Navigation

### Desktop Header
```jsx
<header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      <Logo />
      <nav className="hidden md:flex items-center gap-8">{/* Links */}</nav>
      <div className="hidden md:flex items-center gap-4">{/* CTA */}</div>
      <MobileMenuButton className="md:hidden" />
    </div>
  </div>
</header>
```

---

## Icons

Use Lucide React for all icons.

```jsx
import { Search, Menu, X, ChevronRight, ExternalLink } from 'lucide-react';
```

| Context | Size |
|---------|------|
| Inline with text | w-4 h-4 |
| Button icon | w-5 h-5 |
| Card icon | w-6 h-6 |
| Feature icon | w-8 h-8 |

---

## Responsive Breakpoints

| Breakpoint | Min Width | Use |
|------------|-----------|-----|
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

Always write mobile-first:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

---

## Accessibility

- Color contrast minimum 4.5:1
- Focus states on all interactive elements
- Alt text on all images
- Proper heading hierarchy (one H1 per page)
- Keyboard navigation support
- Touch targets minimum 44px

---

## Performance Targets

- Lighthouse Performance: > 90
- Lighthouse Accessibility: > 90
- Lighthouse SEO: > 90
- LCP: < 2.5s
- CLS: < 0.1
