# Body Signals — Compliance Tracking

**Last reviewed:** 2026-04-11
**Next review:** 2026-07-11 (quarterly)

---

## Compliance Matrix

| Requirement | Jurisdiction | Type | Status | Owner | Next Review |
|---|---|---|---|---|---|
| **WCAG 2.1 AA** | International | Standard | In progress | Maintainer | 2026-07-11 |
| **AODA** (Accessibility for Ontarians with Disabilities Act) | Ontario, Canada | Legal framework | Applicability documented (see below) | Maintainer | 2026-07-11 |
| **ACA** (Accessible Canada Act) | Canada (federal) | Legal framework | Applicability documented (see below) | Maintainer | 2026-07-11 |
| **ADA Title III** | US | Legal framework | Active litigation risk — WCAG 2.1 AA targeted as de-facto standard | Maintainer | 2026-07-11 |
| **PIPEDA** | Canada | Privacy law | Near-zero exposure (see Risk Assessment) | Maintainer | 2026-07-11 |
| **COPPA** | US | Privacy law | Mitigated by 18+ age gate on FeedbackWidget | Maintainer | 2026-07-11 |
| **Health Canada alignment** | Canada | Regulatory | Site references HC guidelines; not a medical device or regulated software | Maintainer | 2026-07-11 |
| **FDA alignment** | US | Regulatory | Parity framing with Health Canada; no drug/device claims | Maintainer | 2026-07-11 |
| **Crisis-line compliance** | Canada + US | Internal standard | Enforced by `npm run check:crisis` CI script | Maintainer | Continuous |

---

## Framework Applicability Notes

### AODA (Ontario)

The Accessibility for Ontarians with Disabilities Act applies to organisations with 50+ employees operating in Ontario. Body Signals currently does not meet this threshold.

**Posture:** WCAG 2.1 AA is targeted as the technical standard that satisfies AODA requirements. Even if the employee threshold is not met today, documenting this posture now prevents retrofit pain if the organisation grows.

**Current status:**
- Semantic HTML used throughout (headings, landmarks, lists)
- `aria-label` attributes on interactive elements (search inputs, filter buttons, feedback widget)
- `htmlFor`/`id` pairs on form fields in FeedbackWidget
- Colour contrast: amber-500 on slate-900 passes WCAG AA for large text; slate-300 on slate-800 passes for body text
- Keyboard navigation: all interactive elements are focusable; tab order follows visual order
- **Gaps to close:** full keyboard-trap audit, screen reader testing (VoiceOver, NVDA), focus-visible styles audit

### ACA (Accessible Canada Act)

The Accessible Canada Act applies to federally regulated entities. Body Signals is not a federally regulated entity.

**Posture:** WCAG 2.1 AA compliance is pursued regardless of legal obligation, as a best-practice measure.

### ADA Title III (US)

ADA Title III applies to "places of public accommodation." Courts have increasingly interpreted this to include public-facing websites. Active litigation risk exists for any public website.

**Posture:** WCAG 2.1 AA is the de-facto standard that US courts reference in ADA website accessibility cases (see Robles v. Domino's Pizza, 2019). Targeting this standard provides the strongest legal defence.

---

## Accessibility Implementation Status

| Area | Status | Notes |
|---|---|---|
| Semantic HTML | Complete | Headings, landmarks, lists, tables used correctly |
| ARIA labels | Complete | All interactive UI elements labelled |
| Form accessibility | Complete | htmlFor/id pairs, required indicators, error states |
| Colour contrast | Passes | Design system colours verified against WCAG AA |
| Keyboard navigation | Mostly complete | Tab order correct; focus-visible audit pending |
| Screen reader testing | Pending | VoiceOver (macOS), NVDA (Windows) testing needed |
| Image alt text | N/A | No content images; icons are decorative or labelled |
| Video/audio | N/A | No media content |
| Motion/animation | Acceptable | Framer Motion used sparingly; no essential content behind animation |

---

## Privacy Compliance

### Data Collection Inventory

| Data point | Where | Required? | Retention | Legal basis |
|---|---|---|---|---|
| Feedback message | FeedbackWidget → Formspree | Yes (if submitting) | Formspree retention policy | Legitimate interest |
| Email address | FeedbackWidget → Formspree | No (optional) | Formspree retention policy | Consent (age-gated 18+) |
| Page URL | FeedbackWidget → Formspree | Auto-captured | Formspree retention policy | Legitimate interest |
| User agent | FeedbackWidget → Formspree | Auto-captured | Formspree retention policy | Legitimate interest |

**No other personal data is collected.** No analytics, no cookies (beyond Next.js defaults), no tracking pixels, no third-party scripts.

### COPPA Mitigation

- FeedbackWidget requires 18+ confirmation checkbox before submission
- Helper text: "You must be 18+ to submit feedback"
- Submit button tooltip: "By submitting, you confirm you are 18 or older."
- If a minor misrepresents their age, legal burden shifts to the misrepresentation

---

## Crisis-Line Compliance

Crisis resources are jurisdiction-correct and enforced by CI:

| Resource | Number | Jurisdiction | CI check |
|---|---|---|---|
| 988 Suicide & Crisis Lifeline | 988 (call or text) | Canada + US | `grep -q '988'` |
| Crisis Text Line | HOME to 741741 | US only | `grep -q '741741'` |
| Kids Help Phone | CONNECT to 686868 | Canada only | `grep -q '686868'` |
| Kids Help Phone (phone) | 1-800-668-6868 | Canada | Manual |
| LGBT Youth Line | 1-800-268-9688 | Canada | Manual |
| Trans Lifeline | 1-877-330-6366 | Canada | Manual |
| Trevor Project | 1-866-488-7386 | US | Manual |
| Emergency services | 911 | Canada + US | Manual |

CI enforcement: `npm run check:crisis` runs between lint and build in `.github/workflows/ci.yml`. Any edit that removes 988, 741741, or 686868 from the crisis-resource files fails the build immediately.

---

## Review Cadence

This compliance document is reviewed **quarterly** or whenever:
- A new data collection surface is added
- A new jurisdiction is targeted
- Accessibility testing reveals gaps
- Legal or regulatory guidance changes

**Owner:** Site maintainer. See `docs/RUNBOOK.md` for the review procedure.
