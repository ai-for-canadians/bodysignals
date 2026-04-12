# Body Signals — Brand Voice

**Last reviewed:** 2026-04-11

---

## Pillar Statements

1. **Evidence transparency** — every claim carries an A–F rating and, where possible, a named source. Users see the strength of evidence before acting.
2. **No affiliate bias** — no advertising, no sponsored content, no supplement sales. Recommendations are based on evidence, not revenue.
3. **Canadian and US co-branded** — the site speaks to both jurisdictions as co-equal audiences. Canadian spelling, Health Canada, and Canadian crisis resources are retained; US authorities, coverage, and crisis resources are added alongside, never as replacements.
4. **Quality over volume** — 113 hand-authored pages, not thousands of SEO-farmed articles. Every record is individually reviewed, evidence-rated, and maintained.

---

## Voice Register Table

The site uses two distinct voice registers. This is a deliberate positioning choice, not an inconsistency. The split reflects the difference between clinical reference content and tactical self-help content.

| Content type | Register | Person | Example |
|---|---|---|---|
| **Conditions** (27) | Clinical | Third-person | "Selective serotonin reuptake inhibitors (SSRIs) are first-line pharmacotherapy for moderate-to-severe depression." |
| **Symptoms** (24) | Clinical | Third-person | "Chest pain is a common symptom that can range from a sharp stab to a dull ache." |
| **Sleep interventions** (20) | Tactical | Mixed (second-person in protocol, third-person in research) | "Install blackout curtains or heavy drapes." / "Even dim light reaching the retina through closed eyelids can partially suppress melatonin." |
| **ADHD systems** (18) | Tactical | Second-person | "Start your day by writing down every task, appointment, and errand floating in your head." |
| **ADHD tools** (6) | Tactical | Second-person | "Use Todoist for task capture if you need cross-platform sync." |
| **Movement programs** (3) | Clinical protocols, tactical delivery | Mixed | "Bird Dog: from a quadruped position, extend opposite arm and leg..." (protocol) / "Start with the modified version if you cannot hold the standard position." (tactical) |
| **Providers** | Informational | Third-person | "Psychiatrists are medical doctors who can prescribe medication." |
| **About / Contact** | Institutional | First-person plural | "Our goal is to provide clear, evidence-based context for symptoms." |

---

## Do / Don't Examples

### Do

- **Name the source:** "A 2022 Northwestern study (Mason et al, PNAS) found that even dim ambient light during sleep was associated with measurable increases in nighttime heart rate."
- **Be specific about limitations:** "A small 2022 single-arm trial in mild OSA (Lee et al, Healthcare) reported reduced AHI with mouth taping, but evidence is preliminary."
- **Quantify uncertainty:** "Evidence rating: C (moderate — limited studies, mechanistic plausibility)."
- **Acknowledge variation:** "ADHD management is highly individual — what works for one person may not work for another."
- **Use plain language:** "Your body is telling you something. Here's what the evidence says about what it might be."

### Don't

- **Banned patterns:** "Studies show..." / "Research proves..." / "Scientists have found..." / "Experts agree..." (without a named citation).
- **Fear tactics:** "If you don't treat this immediately, you could die." (Use urgency classification instead: Emergency / Urgent / Routine / Self Care.)
- **Absolute claims:** "This will cure your insomnia." (Use graded evidence instead.)
- **Preachy tone:** "You should really be exercising more." (Use protocol-style instructions instead: "Week 1: 3 × 10 modified bird dogs.")
- **US-centric defaults:** "Call your insurance company." (Specify jurisdiction: "Check your provincial plan (Canada) or insurance provider (US).")

---

## Canonical NA Terminology

These rules are locked and should be enforced in every voice audit:

| Context | Use | Never |
|---|---|---|
| Body copy | "Canadian and US" | "American" (ambiguous in the Western Hemisphere) |
| Headings / meta descriptions | "North American" (when brevity matters) | "US-centric" framing without a Canadian companion |
| Authorities | "Health Canada and the FDA" | Listing only one jurisdiction's authority as the default |
| Coverage | "Provincial plans (OHIP, MSP, etc.) and US insurance/Medicare/Medicaid" | "Your insurance" without specifying jurisdiction |
| Crisis resources | Jurisdiction-correct per docs/CONTENT_STANDARDS.md | Swapping 741741 (US) and 686868 (Canada) |

---

## Audience

Body Signals is built for **Canadian and US readers, treated as co-equal**. The audience is adults who:

- Are experiencing symptoms and want to understand what they mean before (or instead of) seeing a doctor.
- Are managing a chronic condition and want evidence-rated intervention options.
- Have ADHD and want tactical systems that actually work, not generic productivity advice.
- Have sleep issues and want to know what the evidence says about interventions beyond "don't use your phone in bed."

Canadian spelling is retained site-wide. This is a **load-bearing positioning choice** — it signals that the site is not "yet another US health site." It stays even though the audience is North American.

---

## Voice Audit Procedure

When auditing content for brand voice compliance:

1. Check register matches the content type table above.
2. Verify no banned patterns (expanded grep: `rg -i "(studies?|research|evidence|experts?) (show|suggest|indicate|agree|demonstrate)" lib/data/`).
3. Confirm Canadian spelling (colour, behaviour, centre, practise, minimise, stabilise).
4. Confirm jurisdiction-correct crisis resources on MH/ADHD pages.
5. Confirm NA terminology follows the canonical table above.
6. Verify evidence ratings are present on all health claims.

**Cross-reference:** `docs/CONTENT_STANDARDS.md` for the full spelling table and citation format.
