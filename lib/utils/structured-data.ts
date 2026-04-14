// JSON-LD structured data helpers for Schema.org markup.
// Each function returns a plain object suitable for JSON.stringify().

import { BASE_URL, SITE_NAME } from '@/lib/config';
import type {
  Condition,
  ConditionCategory,
  EvidenceRating,
  Symptom,
  SleepIntervention,
  ADHDSystem,
  MovementProgram,
} from '@/types';

// ---------------------------------------------------------------------------
// Publisher — single source of truth for the organisation identity
// ---------------------------------------------------------------------------

export const PUBLISHER_SCHEMA = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: BASE_URL,
} as const;

// ---------------------------------------------------------------------------
// Serialisation helper
// ---------------------------------------------------------------------------

export function jsonLdScript(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}

// ---------------------------------------------------------------------------
// MedicalWebPage — every health content page gets this
// ---------------------------------------------------------------------------

export function medicalWebPageJsonLd(page: {
  title: string;
  description: string;
  url: string;
  dateModified: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: page.title,
    description: page.description,
    url: page.url,
    dateModified: page.dateModified,
    publisher: { ...PUBLISHER_SCHEMA },
    inLanguage: 'en',
    isAccessibleForFree: true,
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patient',
    },
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList — every page
// ---------------------------------------------------------------------------

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// Category → AnatomicalStructure mapping (used by conditionJsonLd)
// ---------------------------------------------------------------------------

const CATEGORY_ANATOMY: Partial<Record<ConditionCategory, string>> = {
  digestive: 'Gastrointestinal tract',
  cardiovascular: 'Cardiovascular system',
  neurological: 'Nervous system',
};

// ---------------------------------------------------------------------------
// Evidence rating → Schema.org evidence level (A/B/C only)
// ---------------------------------------------------------------------------

const SCHEMA_EVIDENCE_LEVEL: Partial<Record<EvidenceRating, string>> = {
  A: 'https://schema.org/EvidenceLevelA',
  B: 'https://schema.org/EvidenceLevelB',
  C: 'https://schema.org/EvidenceLevelC',
};

// ---------------------------------------------------------------------------
// MedicalCondition — condition detail pages
// ---------------------------------------------------------------------------

export function conditionJsonLd(condition: Condition) {
  const url = `${BASE_URL}/conditions/${condition.slug}`;

  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name: condition.name,
    description: condition.summary,
    url,
    signOrSymptom: condition.symptoms.map((s) => ({
      '@type': 'MedicalSignOrSymptom',
      name: s.name,
      description: s.description,
    })),
    possibleTreatment: condition.interventions.map((i) => {
      const treatment: Record<string, unknown> = {
        '@type': i.category === 'medication' ? 'Drug' : 'MedicalTherapy',
        name: i.name,
        description: i.description,
      };

      const evidenceLevel = SCHEMA_EVIDENCE_LEVEL[i.evidenceRating];
      if (evidenceLevel) {
        treatment.guideline = {
          '@type': 'MedicalGuideline',
          evidenceLevel,
          guidelineDate: i.lastUpdated,
        };
      }

      return treatment;
    }),
  };

  // Add associatedAnatomy for categories with clear anatomical mapping
  const anatomy = CATEGORY_ANATOMY[condition.category];
  if (anatomy) {
    base.associatedAnatomy = {
      '@type': 'AnatomicalStructure',
      name: anatomy,
    };
  }

  return base;
}

// ---------------------------------------------------------------------------
// MedicalSignOrSymptom — symptom detail pages
// ---------------------------------------------------------------------------

export function symptomJsonLd(symptom: Symptom) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalSignOrSymptom',
    name: symptom.name,
    description: symptom.summary,
    url: `${BASE_URL}/symptoms/${symptom.slug}`,
    possibleCause: symptom.relatedConditions.map((rc) => ({
      '@type': 'MedicalCondition',
      name: rc.name,
      ...(rc.slug && { url: `${BASE_URL}/conditions/${rc.slug}` }),
    })),
  };
}

// ---------------------------------------------------------------------------
// FAQPage — symptom detail pages (Q&A from whenToSeeDoctor, causes, homeCare)
// ---------------------------------------------------------------------------

export function symptomFaqJsonLd(symptom: Symptom) {
  const questions: { question: string; answer: string }[] = [];

  // "When should I see a doctor?"
  if (symptom.whenToSeeDoctor.length > 0) {
    questions.push({
      question: `When should I see a doctor for ${symptom.name.toLowerCase()}?`,
      answer: symptom.whenToSeeDoctor.join('. ') + '.',
    });
  }

  // "What conditions can cause this?"
  if (symptom.relatedConditions.length > 0) {
    const causes = symptom.relatedConditions.map((rc) => rc.name).join(', ');
    questions.push({
      question: `What conditions can cause ${symptom.name.toLowerCase()}?`,
      answer: `Possible causes include ${causes}. Likelihood and urgency vary — consult a healthcare provider for diagnosis.`,
    });
  }

  // "How can I manage this at home?"
  if (symptom.homeCare.length > 0) {
    questions.push({
      question: `How can I manage ${symptom.name.toLowerCase()} at home?`,
      answer: symptom.homeCare.join('. ') + '.',
    });
  }

  if (questions.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// MedicalTherapy — sleep intervention detail pages
// ---------------------------------------------------------------------------

export function sleepInterventionJsonLd(intervention: SleepIntervention) {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: intervention.name,
    description: intervention.tagline,
    url: `${BASE_URL}/topics/sleep/${intervention.slug}`,
  };

  if (intervention.safetyProfile.contraindications.length > 0) {
    base.contraindication =
      intervention.safetyProfile.contraindications.join('; ');
  }

  const evidenceLevel = SCHEMA_EVIDENCE_LEVEL[intervention.evidenceRating];
  if (evidenceLevel) {
    base.guideline = {
      '@type': 'MedicalGuideline',
      evidenceLevel,
      guidelineDate: intervention.lastUpdated,
    };
  }

  return base;
}

// ---------------------------------------------------------------------------
// Article (with medicalSpecialty) — ADHD system detail pages
// ---------------------------------------------------------------------------

export function adhdSystemJsonLd(system: ADHDSystem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: system.name,
    headline: system.name,
    description: system.tagline,
    url: `${BASE_URL}/topics/adhd/${system.slug}`,
    dateModified: system.lastUpdated,
    publisher: { ...PUBLISHER_SCHEMA },
    about: {
      '@type': 'MedicalCondition',
      name: 'ADHD',
    },
    specialty: {
      '@type': 'MedicalSpecialty',
      name: 'Psychiatry',
    },
  };
}

// ---------------------------------------------------------------------------
// ExercisePlan — movement program detail pages
// ---------------------------------------------------------------------------

export function movementProgramJsonLd(program: MovementProgram) {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ExercisePlan',
    name: program.name,
    description: program.tagline,
    url: `${BASE_URL}/topics/movement/${program.slug}`,
    exerciseType: program.bodyPart,
  };

  if (program.contraindications.length > 0) {
    base.contraindication = program.contraindications.join('; ');
  }

  return base;
}
