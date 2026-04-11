import { BodyArea } from '@/types';

export const bodyAreas: BodyArea[] = [
  {
    id: 'head',
    name: 'Head & Neck',
    slug: 'head',
    description: 'Symptoms affecting the head, eyes, ears, nose, throat, and neck.',
    icon: 'Brain',
  },
  {
    id: 'chest',
    name: 'Chest & Lungs',
    slug: 'chest',
    description: 'Symptoms involving the heart, lungs, ribs, and upper torso.',
    icon: 'Heart', // or Activity if Heart not available, but Lucide has Heart
  },
  {
    id: 'abdomen',
    name: 'Abdomen & Digestion',
    slug: 'abdomen',
    description: 'Issues related to the stomach, intestines, liver, and pelvic area.',
    icon: 'Apple', // Abstract for digestion? Or Circle.
  },
  {
    id: 'back',
    name: 'Back & Spine',
    slug: 'back',
    description: 'Pain or stiffness in the upper or lower back and spine.',
    icon: 'Bone', // Spine-like
  },
  {
    id: 'limbs',
    name: 'Arms & Legs',
    slug: 'limbs',
    description: 'Symptoms in muscles, joints, and extremities.',
    icon: 'Accessibility', // Placeholder for limbs
  },
  {
    id: 'skin',
    name: 'Skin',
    slug: 'skin',
    description: 'Rashes, bumps, changes in color or texture.',
    icon: 'Sun', // Representative of skin exposure? Or User
  },
  {
    id: 'general',
    name: 'General / Whole Body',
    slug: 'general',
    description: 'Systemic symptoms like fever, fatigue, or weight changes.',
    icon: 'Activity',
  },
];
