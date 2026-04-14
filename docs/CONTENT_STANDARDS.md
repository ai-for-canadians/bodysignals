# InfoBank Content Standards

## Evidence Requirements

### For Health/Science Claims

Every claim must have:
1. **Source citation** - Link to primary research
2. **Evidence rating** - Our confidence level
3. **Context** - Study type, population, limitations

### Evidence Rating Scale

| Rating | Label | Criteria |
|--------|-------|----------|
| A | Strong Evidence | Multiple RCTs, meta-analyses, clinical guidelines |
| B | Good Evidence | Some RCTs, strong observational studies |
| C | Moderate Evidence | Limited studies, mechanistic plausibility |
| D | Weak Evidence | Preliminary research, case reports |
| F | No Evidence | No supporting research or evidence against |

### Citation Format
```markdown
This intervention improved outcomes by 30% [1].

**References:**
1. Author et al. "Study Title." Journal, Year.
   - Study type: RCT
   - Population: 500 adults
   - Duration: 12 weeks
   [Link](url)
```

---

## Research Publisher Positioning

Body Signals is an **independent research digest and publisher**. This framing is legally load-bearing.

### Identity statements (use these)
- "Independent research digest"
- "Research publisher"
- "Evidence-based research summaries"
- "Published research summarised in plain language"

### Forbidden identity framing (never use in content or UI)
- "Medical site" / "medical information site" / "health information site"
- "Health education publisher" / "health education service"
- "We recommend" (outside editorial guides — never in reader-facing content)
- "Health advice" / "medical advice" (outside explicit disclaimers)
- "Doctor-reviewed" / "physician-approved" (implies clinical authority)

### Directive language replacement guide

| Forbidden | Replacement |
|---|---|
| "You should [do X]" | "Research suggests [X] may help" / "some people find" |
| "We recommend" | "The research suggests" / "peer-reviewed evidence points to" |
| "Avoid [X]" (as a directive) | "Research has associated [X] with [negative outcome]" |
| "Always [do X]" / "Never [do X]" | "Published guidance generally suggests" / "research has not supported" |
| "Make sure to" / "Be sure to" | "It may be worth noting" / "research indicates" |
| "Consider taking [X]" | "Studies have evaluated [X] for" |
| "Increase your [X]" / "Reduce your [X]" | "Higher [X] intake has been associated with" / "Lower [X] has been studied for" |

**Exception:** Tactical content (ADHD systems, movement protocols) may use second-person imperative for step-by-step instructions ("Place your keys in the launch pad"), but the framing around those instructions must make clear these are research-informed tactics, not medical prescriptions.

### Disclaimer language standard
All disclaimers must open with: "This is a research summary, not medical advice. Body Signals is an independent research digest..."

---

## Forbidden Phrases

Never use without specific citation:
- "Studies show..."
- "Research proves..."
- "Scientists have found..."
- "Experts agree..."

Instead use:
- "A 2023 meta-analysis of 12 trials found..." [citation]
- "According to Health Canada guidelines..." [citation]

---

## North American Standards

Body Signals is built for a Canadian and US audience, treated as co-equal. Content should speak to both jurisdictions without collapsing into either. Canadian spelling is retained throughout even though the audience is North American — it is a deliberate positioning choice and is load-bearing for the brand.

**Canonical NA terminology** (locked in `docs/BRAND_VOICE.md`):
- Use **"Canadian and US"** in body copy — clearer than "American", which is ambiguous in the Western Hemisphere.
- Use **"North American"** in headings and meta descriptions where brevity matters.
- Never **"American-first"** phrasing without a Canadian companion.
- Never default to US-only authorities, coverage, or crisis resources.

### Always Include
- Canadian spelling (colour, centre, behaviour, organise) — retained as positioning
- Canadian and US resources and authorities, treated as co-equal
- Provincial variations (Canada) and state variations (US) when applicable
- Prices in CAD and USD where pricing is cited
- Canadian and US health system context (public coverage + private insurance)

### Canadian Spelling Reference
| US | Canadian (used site-wide) |
|----|----------|
| color | colour |
| center | centre |
| behavior | behaviour |
| organize | organise |
| practice (verb) | practise |
| minimize | minimise |
| stabilize | stabilise |

### US Parity — authorities and coverage
- **Regulatory:** FDA alongside Health Canada. Neither supersedes the other as the "default."
- **Public health:** CDC alongside Canadian public health sources (PHAC, provincial ministries).
- **Coverage vocabulary:** Medicare (federal, 65+/disabled), Medicaid (state, income-tested), private insurance, and sliding-scale clinics alongside provincial plans (OHIP, MSP, etc.). Never conflate Medicare and Medicaid.
- **Clinical guidelines:** ACP, AHA, APA (US) alongside CMA, Canadian Cardiovascular Society, CPA (Canada).

### Canadian Resources to Reference
- Health Canada
- Provincial health authorities (OHIP, MSP, AHS, etc.)
- Public Health Agency of Canada (PHAC)
- Canadian Cancer Society
- Heart & Stroke Foundation
- CAMH (Centre for Addiction and Mental Health)
- Canadian Psychological Association
- Kids Help Phone
- LGBT Youth Line / Trans Lifeline
- Service Canada

### US Resources to Reference
- FDA
- CDC
- NIH / National Library of Medicine
- American Medical Association
- American Psychological Association
- Substance Abuse and Mental Health Services Administration (SAMHSA)
- 988 Suicide & Crisis Lifeline
- Crisis Text Line (text HOME to 741741)
- The Trevor Project

### Crisis Resources (jurisdiction-correct — never swap these)
- **988** — Suicide & Crisis Lifeline, Canada and US.
- **Text HOME to 741741** — Crisis Text Line, **US only**. Do not list for Canadian users.
- **Text CONNECT to 686868** — Kids Help Phone, **Canada only** (operated by Kids Help Phone, broader than the name suggests).
- **Kids Help Phone 1-800-668-6868** — Canada.
- **LGBT Youth Line 1-800-268-9688** — Canada.
- **Trans Lifeline 1-877-330-6366** — Canada.
- **Trevor Project 1-866-488-7386** — US.
- **911** — emergency, both jurisdictions.

---

## Tone Guidelines

> **See also:** [`docs/BRAND_VOICE.md`](BRAND_VOICE.md) for the full voice register table (clinical vs. tactical split), canonical NA terminology, and do/don't examples.

### Do
- Be direct and clear
- Acknowledge uncertainty
- Provide actionable takeaways
- Use "you" to address reader
- Explain jargon when first used

### Don't
- Be preachy or condescending
- Use fear tactics
- Make absolute claims without evidence
- Oversimplify complex topics

---

## Sensitive Topics

Topics requiring extra review:
- Medical conditions and treatments
- Mental health
- Supplements (health claims)
- Financial advice
- Legal information
- Content involving children

Guidelines:
1. Be rigorous with sources
2. Include appropriate disclaimers
3. Provide crisis resources when relevant
4. Encourage professional consultation

---

## Disclaimers

### Health Content
```
This information is for educational purposes only and is not medical advice.
Consult a healthcare provider before making changes to your health regimen.
```

### Financial Content
```
This information is for educational purposes only and is not financial advice.
Consider consulting a qualified financial advisor for your specific situation.
```
