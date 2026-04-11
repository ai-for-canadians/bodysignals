import { Symptom } from '@/types';

export const symptoms: Symptom[] = [
    {
        id: 'chest-pain',
        name: 'Chest Pain',
        slug: 'chest-pain',
        bodyArea: 'chest',
        summary: 'Discomfort in the chest area, ranging from sharp stabs to dull aching or pressure.',
        description: 'Chest pain is a common symptom that can range from a sharp stab to a dull ache. It can be caused by heart problems, lung issues, digestive problems, or muscle and bone issues. While often associated with heart attacks, many other conditions can cause chest pain.',
        redFlags: [
            'Sudden, severe crushing pressure or squeezing',
            'Pain radiating to jaw, left arm, or back',
            'Accompanied by shortness of breath, sweating, nausea',
            'Sudden sharp pain with difficulty breathing (possible pulmonary embolism)',
            'Loss of consciousness'
        ],
        yellowFlags: [
            'Pain that worsens with deep breathing or coughing',
            'Persistent mild discomfort',
            'Pain triggered by specific movements',
            'History of heart disease'
        ],
        relatedConditions: [
            {
                name: 'Heart Attack (Myocardial Infarction)',
                likelihood: 'possible',
                urgency: 'emergency',
                description: 'Blockage of blood flow to the heart muscle.'
            },
            {
                name: 'Angina',
                likelihood: 'common',
                urgency: 'urgent',
                description: 'Reduced blood flow to the heart, often triggered by exertion.'
            },
            {
                name: 'Gastroesophageal Reflux Disease (GERD)',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Stomach acid flowing back into the esophagus causes burning sensation.'
            },
            {
                name: 'Costochondritis',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Inflammation of the cartilage connecting ribs to the breastbone.'
            }
        ],
        homeCare: [
            'Rest and avoid exertion if cause is unknown.',
            'For heartburn, consider antacids.',
            'If muscular, gentle stretching or warm compress (only if heart issues ruled out).'
        ],
        whenToSeeDoctor: [
            'Any new or unexplained chest pain.',
            'Pain that is not relieved by rest or medication.',
            'Recurrent episodes of pressure or tightness.'
        ],
        urgency: 'emergency',
        evidenceRating: 'A',
        lastUpdated: '2025-05-15',
        sources: [
            {
                title: 'Chest Pain Guidelines',
                url: 'https://www.heart.org',
                type: 'medical_guideline',
                year: 2024
            }
        ]
    },
    {
        id: 'headache',
        name: 'Headache',
        slug: 'headache',
        bodyArea: 'head',
        summary: 'Pain in any region of the head, appearing as sharp, throbbing, or dull.',
        description: 'Headaches are one of the most common medical complaints. Most are not life-threatening and fall into primary categories like tension, migraine, or cluster headaches.',
        redFlags: [
            'Sudden "thunderclap" headache (worst headache of life)',
            'Headache with fever, stiff neck, confusion, seizures',
            'Headache following head injury',
            'New headache pattern in person over 50',
            'Associated weakness or numbness'
        ],
        yellowFlags: [
            'Frequent headaches interfering with daily life',
            'Worsening severity over time',
            'Dependency on pain medication'
        ],
        relatedConditions: [
            {
                name: 'Tension Headache',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Dull, aching pain often like a tight band around the head.'
            },
            {
                name: 'Migraine',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Severe throbbing pain, often with nausea and light sensitivity.'
            },
            {
                name: 'Cluster Headache',
                likelihood: 'rare',
                urgency: 'urgent',
                description: 'Intense burning or piercing pain behind one eye.'
            }
        ],
        homeCare: [
            'Rest in a quiet, dark room.',
            'Hydration.',
            'Over-the-counter pain relievers (ibuprofen, acetaminophen).',
            'Cool compress on forehead.'
        ],
        whenToSeeDoctor: [
            'Headaches become more frequent or severe.',
            'OTC meds no longer work.',
            'Headaches wake you up or occur early morning.'
        ],
        urgency: 'routine',
        evidenceRating: 'A',
        lastUpdated: '2025-01-10',
        sources: [
            {
                title: 'Headache Classification',
                url: 'https://ichd-3.org',
                type: 'medical_guideline',
                year: 2023
            }
        ]
    },
    {
        id: 'lower-back-pain',
        name: 'Lower Back Pain',
        slug: 'lower-back-pain',
        bodyArea: 'back',
        summary: 'Pain, stiffness, or tension in the lumbar region.',
        description: 'Lower back pain is a pervasive issue affecting up to 80% of adults. It is commonly mechanical (muscle strain) but can signal disc issues or other underlying conditions.',
        redFlags: [
            'Loss of bladder or bowel control (Cauda Equina Syndrome)',
            'Numbness in "saddle" area (groin/buttocks)',
            'Severe weakness in legs',
            'Accompanied by unexplained weight loss or history of cancer',
            'Fever with back pain'
        ],
        yellowFlags: [
            'Pain radiating down the leg (sciatica)',
            'Pain lasting more than 4-6 weeks',
            'Pain at night'
        ],
        relatedConditions: [
            {
                name: 'Muscle Strain',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Overstretching or tearing of muscle fibers.'
            },
            {
                name: 'Herniated Disc',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Disc nucleus pushes out, pinching nerves.'
            },
            {
                name: 'Sciatica',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Compression of the sciatic nerve causing leg pain.'
            }
        ],
        homeCare: [
            'Stay active (bed rest often worsens it).',
            'Heat or cold therapy.',
            'OTC anti-inflammatories.',
            'Gentle stretching.'
        ],
        whenToSeeDoctor: [
            'Pain spreads down one or both legs.',
            'Weakness, numbness, or tingling in legs.',
            'No improvement after 2 weeks of home care.'
        ],
        urgency: 'self_care',
        evidenceRating: 'A',
        lastUpdated: '2024-11-20',
        sources: [
            {
                title: 'Low Back Pain Clinical Guidelines',
                url: 'https://acponline.org',
                type: 'organization',
                year: 2022
            }
        ]
    },
    {
        id: 'abdominal-pain',
        name: 'Abdominal Pain',
        slug: 'abdominal-pain',
        bodyArea: 'abdomen',
        summary: 'Pain between the chest and groin, "stomach ache".',
        description: 'Abdominal pain can stem from digestion, infection, or organ issues (appendix, gallbladder, etc.). Location is key to diagnosis.',
        redFlags: [
            'Severe, sudden onset pain',
            'Pain with bloody stools or vomiting blood',
            'Rigid, tender abdomen (peritonitis)',
            'Inability to pass stool or gas combined with vomiting',
            'Signs of shock (dizziness, fast pulse)'
        ],
        yellowFlags: [
            'Persistent nausea or vomiting',
            'Unintentional weight loss',
            'Changes in bowel habits'
        ],
        relatedConditions: [
            {
                name: 'Gastroenteritis (Stomach Flu)',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Infection causing diarrhea and vomiting.'
            },
            {
                name: 'Appendicitis',
                likelihood: 'uncommon',
                urgency: 'emergency',
                description: 'Pain starting near navel and moving to lower right.'
            },
            {
                name: 'Gastritis',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Inflammation of stomach lining.'
            },
            {
                name: 'IBS (Irritable Bowel Syndrome)',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Chronic condition affecting large intestine.'
            }
        ],
        homeCare: [
            'Sip clear fluids.',
            'Avoid solid food for a few hours if vomiting.',
            'Rest.',
            'Avoid trigger foods (spicy, fatty).'
        ],
        whenToSeeDoctor: [
            'Pain persists more than 24-48 hours.',
            'Pain relocates to lower right abdomen.',
            'Fever over 101°F (38.3°C).'
        ],
        urgency: 'routine',
        evidenceRating: 'B',
        lastUpdated: '2025-02-01',
        sources: []
    },
    {
        id: 'shortness-of-breath',
        name: 'Shortness of Breath (Dyspnea)',
        slug: 'shortness-of-breath',
        bodyArea: 'chest',
        summary: 'Feeling unable to get enough air; tightness in chest.',
        description: 'Breathing difficulty can be acute or chronic and may involve the heart or lungs. It is a subjective sensation of "air hunger".',
        redFlags: [
            'Sudden onset at rest',
            'Chest pain or nausea present',
            'Blue lips or fingertips',
            'Audible wheezing or high-pitched sound (stridor)',
            'History of blood clots or recent surgery'
        ],
        yellowFlags: [
            'Breathing trouble when lying flat',
            'Swelling in feet/ankles',
            'Worsening over weeks'
        ],
        relatedConditions: [
            {
                name: 'Asthma',
                likelihood: 'common',
                urgency: 'urgent',
                description: 'Airway inflammation and narrowing.'
            },
            {
                name: 'Pneumonia',
                likelihood: 'common',
                urgency: 'urgent',
                description: 'Infection in one or both lungs.'
            },
            {
                name: 'Heart Failure',
                likelihood: 'uncommon',
                urgency: 'emergency',
                description: 'Heart cannot pump enough blood to meet body needs.'
            },
            {
                name: 'Panic Attack',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Anxiety inducing rapid breathing.'
            }
        ],
        homeCare: [
            'Sit upright and lean forward slightly.',
            'Use prescribed inhalers if asthmatic.',
            'Pursed-lip breathing technique.'
        ],
        whenToSeeDoctor: [
            'Breathing difficulty affects ability to talk.',
            'Symptoms occur after minor exertion.',
            'Accompanied by fever or cough.'
        ],
        urgency: 'emergency',
        evidenceRating: 'A',
        lastUpdated: '2025-03-10',
        sources: []
    },
    {
        id: 'fatigue',
        name: 'Fatigue',
        slug: 'fatigue',
        bodyArea: 'general',
        summary: 'Unrelenting exhaustion not relieved by rest.',
        description: 'More than just being tired, fatigue is a lack of energy and motivation. It can be physical, mental, or both.',
        redFlags: [
            'Associated with chest pain or shortness of breath',
            'Thoughts of self-harm',
            'Sudden confusion',
            'Abnormal bleeding'
        ],
        yellowFlags: [
            'Lasting longer than 2 weeks',
            'Unexplained weight loss',
            'Swollen lymph nodes'
        ],
        relatedConditions: [
            {
                name: 'Anemia',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Lack of healthy red blood cells.'
            },
            {
                name: 'Thyroid Hypofunction',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Thyroid gland not producing enough hormone.'
            },
            {
                name: 'Depression',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Mood disorder causing persistent sadness and fatigue.'
            },
            {
                name: 'Sleep Apnea',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Breathing stops and starts during sleep.'
            }
        ],
        homeCare: [
            'Improve sleep hygiene.',
            'Regular light exercise.',
            'Balanced diet rich in iron and vitamins.',
            'Stress management.'
        ],
        whenToSeeDoctor: [
            'Fatigue persists despite good sleep.',
            'Interferes with work or social life.',
            'Accompanying symptoms like hair loss or cold intolerance.'
        ],
        urgency: 'routine',
        evidenceRating: 'B',
        lastUpdated: '2024-12-05',
        sources: []
    },
    {
        id: 'skin-rash',
        name: 'Skin Rash',
        slug: 'skin-rash',
        bodyArea: 'skin',
        summary: 'Change in skin texture or color, often itchy or painful.',
        description: 'Rashes can form from allergies, infections, heat, or immune system disorders.',
        redFlags: [
            'Rash covering most of body',
            'Fever accompanying rash',
            'Blisters in mouth or near eyes',
            'Painful skin or rapid spreading',
            'Signs of infection (pus, warmth, red streak)'
        ],
        yellowFlags: [
            'Rash that does not improve with OTC creams',
            'Rash interfering with sleep'
        ],
        relatedConditions: [
            {
                name: 'Contact Dermatitis',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Reaction to touching an irritant or allergen.'
            },
            {
                name: 'Eczema (Atopic Dermatitis)',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Chronic condition making skin red and itchy.'
            },
            {
                name: 'Shingles',
                likelihood: 'uncommon',
                urgency: 'urgent',
                description: 'Painful rash from reactivation of chickenpox virus.'
            }
        ],
        homeCare: [
            'Gentle cleansing.',
            'Moisturizing.',
            'Hydrocortisone cream for itching.',
            'Cool compresses.'
        ],
        whenToSeeDoctor: [
            'Rash becomes painful.',
            'Rash looks infected.',
            'Rash appears immediately after new medication.'
        ],
        urgency: 'self_care',
        evidenceRating: 'A',
        lastUpdated: '2025-04-20',
        sources: []
    },
    {
        id: 'fever',
        name: 'Fever',
        slug: 'fever',
        bodyArea: 'general',
        summary: 'Elevated body temperature, usually a sign of infection.',
        description: 'A fever is a temporary increase in body temperature, part of the immune response. High fevers can be dangerous.',
        redFlags: [
            'Fever over 104°F (40°C)',
            'Seizure',
            'Meningitis signs (stiff neck, confusion, sensitivity to light)',
            'Difficulty breathing'
        ],
        yellowFlags: [
            'Fever lasting more than 3 days',
            'Fever that returns after going away'
        ],
        relatedConditions: [
            {
                name: 'Viral Infection (Flu, Cold)',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Self-limiting viral illness.'
            },
            {
                name: 'Bacterial Infection',
                likelihood: 'common',
                urgency: 'urgent',
                description: 'Strep throat, UTI, etc., often requiring antibiotics.'
            },
            {
                name: 'COVID-19',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Respiratory virus with wide range of symptoms.'
            }
        ],
        homeCare: [
            'Rest and fluids.',
            'Acetaminophen or ibuprofen.',
            'Dress in light clothing.'
        ],
        whenToSeeDoctor: [
            'Temperature > 103°F (39.4°C).',
            'Fever lasts > 3 days.',
            'Severe headache or rash accompanies fever.'
        ],
        urgency: 'self_care',
        evidenceRating: 'A',
        lastUpdated: '2024-10-15',
        sources: []
    },
    {
        id: 'dizziness',
        name: 'Dizziness & Vertigo',
        slug: 'dizziness',
        bodyArea: 'head',
        summary: 'Feeling lightheaded, unsteady, or that the room is spinning.',
        description: 'Dizziness is a broad term. Vertigo is the specific sensation of spinning.',
        redFlags: [
            'Sudden severe headache',
            'Chest pain',
            'Difficulty speaking or walking (stroke signs)',
            'Head injury prior to dizziness',
            'Fainting'
        ],
        yellowFlags: [
            'Recurrent episodes',
            'Hearing loss or ringing in ears'
        ],
        relatedConditions: [
            {
                name: 'BPPV (Vertigo)',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Inner ear issue causing spinning sensation.'
            },
            {
                name: 'Dehydration',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Lack of fluid causing blood pressure drop.'
            },
            {
                name: 'Labyrinthitis',
                likelihood: 'uncommon',
                urgency: 'routine',
                description: 'Inner ear infection.'
            }
        ],
        homeCare: [
            'Sit or lie down immediately.',
            'Drink water.',
            'Move slowly when standing up.'
        ],
        whenToSeeDoctor: [
            'Dizziness is unexplained or sudden.',
            'accompanied by hearing loss.',
            'Recent head injury.'
        ],
        urgency: 'routine',
        evidenceRating: 'B',
        lastUpdated: '2025-01-20',
        sources: []
    },
    {
        id: 'joint-pain',
        name: 'Joint Pain',
        slug: 'joint-pain',
        bodyArea: 'limbs',
        summary: 'Discomfort, aches, or soreness in any of the body\'s joints.',
        description: 'Joint pain can affect one or multiple joints and can be caused by injury, inflammation, or degeneration.',
        redFlags: [
            'Joint appears deformed',
            'Inability to use the joint',
            'Intense pain with sudden swelling',
            'Signs of infection (redness, heat, fever)'
        ],
        yellowFlags: [
            'Morning stiffness lasting > 1 hour',
            'Pain persists > 2 weeks',
            'Swelling'
        ],
        relatedConditions: [
            {
                name: 'Osteoarthritis',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Wear and tear of cartilage.'
            },
            {
                name: 'Rheumatoid Arthritis',
                likelihood: 'uncommon',
                urgency: 'routine',
                description: 'Autoimmune disorder affecting joint lining.'
            },
            {
                name: 'Gout',
                likelihood: 'common',
                urgency: 'urgent',
                description: 'Crystal buildup causing sudden, severe pain (often big toe).'
            },
            {
                name: 'Sprain',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Ligament injury.'
            }
        ],
        homeCare: [
            'R.I.C.E. (Rest, Ice, Compression, Elevation) for injuries.',
            'OTC pain relievers.',
            'Warm bath for arthritis.'
        ],
        whenToSeeDoctor: [
            'Joint is red, hot, and swollen.',
            'Pain interferes with sleep or daily tasks.',
            'Rapid onset without injury.'
        ],
        urgency: 'routine',
        evidenceRating: 'A',
        lastUpdated: '2024-09-10',
        sources: []
    },
    {
        id: 'nausea',
        name: 'Nausea & Vomiting',
        slug: 'nausea',
        bodyArea: 'abdomen',
        summary: 'Unease of the stomach, often leading to vomiting.',
        description: 'Nausea is controlled by the brain and can be triggered by stomach issues, dizziness, medications, or pain.',
        redFlags: [
            'Vomit contains blood or "coffee grounds"',
            'Severe abdominal pain',
            'Signs of dehydration (dry mouth, no urine)',
            'Head injury',
            'Stiff neck and fever'
        ],
        yellowFlags: [
            'Vomiting for > 24 hours',
            'Nausea preventing eating for > 2 days',
            'Possible pregnancy'
        ],
        relatedConditions: [
            {
                name: 'Food Poisoning',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Illness indicating bacteria/virus in food.'
            },
            {
                name: 'Motion Sickness',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Conflict between eyes and inner ear signals.'
            },
            {
                name: 'Migraine',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Headache often accompanied by nausea.'
            }
        ],
        homeCare: [
            'Hydration (small sips).',
            'Ginger or peppermint.',
            'Bland foods (crackers, toast).'
        ],
        whenToSeeDoctor: [
            'Cannot keep fluids down for 24 hours.',
            'Vomiting blood.',
            'Severe headache or abdominal pain.'
        ],
        urgency: 'self_care',
        evidenceRating: 'B',
        lastUpdated: '2025-02-15',
        sources: []
    },
    {
        id: 'sore-throat',
        name: 'Sore Throat',
        slug: 'sore-throat',
        bodyArea: 'head',
        summary: 'Pain, scratchiness or irritation of the throat that often worsens when you swallow.',
        description: 'Most sore throats are caused by viral infections like the cold or flu. Bacterial infections (strep) are less common.',
        redFlags: [
            'Difficulty breathing',
            'Difficulty swallowing saliva (drooling)',
            'Joint pain or rash',
            'High fever > 101F'
        ],
        yellowFlags: [
            'Hoarseness lasting > 2 weeks',
            'Severe pain on one side',
            'White patches on tonsils'
        ],
        relatedConditions: [
            {
                name: 'Viral Pharyngitis',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Common cold virus affecting throat.'
            },
            {
                name: 'Strep Throat',
                likelihood: 'common',
                urgency: 'urgent',
                description: 'Bacterial infection requiring antibiotics.'
            },
            {
                name: 'Tonsillitis',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Inflammation of tonsils.'
            }
        ],
        homeCare: [
            'Salt water gargle.',
            'Honey and warm liquids.',
            'Throat lozenges.',
            'Humidifier.'
        ],
        whenToSeeDoctor: [
            'Sore throat with rash.',
            'Sore throat lasts > 1 week.',
            'Difficulty opening mouth.'
        ],
        urgency: 'self_care',
        evidenceRating: 'A',
        lastUpdated: '2024-11-01',
        sources: []
    },
    {
        id: 'palpitations',
        name: 'Heart Palpitations',
        slug: 'palpitations',
        bodyArea: 'chest',
        summary: 'Feeling like your heart is racing, pounding, fluttering or skipping a beat.',
        description: 'Palpitations make you aware of your heartbeat. They are often harmless but can signal arrhythmia.',
        redFlags: [
            'Fainting or loss of consciousness',
            'Severe chest pain',
            'Shortness of breath with palpitations',
            'History of heart attack'
        ],
        yellowFlags: [
            'Frequent episodes',
            'Worsens with exercise',
            'Pulse remains irregular'
        ],
        relatedConditions: [
            {
                name: 'Anxiety/Stress',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Adrenaline causing faster heart rate.'
            },
            {
                name: 'Atrial Fibrillation',
                likelihood: 'uncommon',
                urgency: 'urgent',
                description: 'Irregular and often rapid heart rate.'
            },
            {
                name: 'Caffeine/Stimulants',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Chemical triggers.'
            }
        ],
        homeCare: [
            'Deep breathing (vagal maneuvers).',
            'Reduce caffeine/alcohol.',
            'Hydration.'
        ],
        whenToSeeDoctor: [
            'Palpitations and dizziness.',
            'History of heart problems.',
            'New and persistent irregular beat.'
        ],
        urgency: 'routine',
        evidenceRating: 'B',
        lastUpdated: '2025-01-05',
        sources: []
    },
    {
        id: 'numbness',
        name: 'Numbness or Tingling',
        slug: 'numbness',
        bodyArea: 'limbs',
        summary: 'Loss of sensation or "pins and needles" feeling.',
        description: 'Numbness (paresthesia) is usually caused by nerve irritation or compression.',
        redFlags: [
            'Sudden onset on one side of body (stroke sign)',
            'Associated with confusion or vision loss',
            'Loss of bladder/bowel control',
            'Following head or back trauma'
        ],
        yellowFlags: [
            'Persisting in one area',
            'Spreading over time',
            'Muscle weakness'
        ],
        relatedConditions: [
            {
                name: 'Carpal Tunnel Syndrome',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Compression of median nerve in wrist.'
            },
            {
                name: 'Pinched Nerve (Radiculopathy)',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Nerve compression in spine.'
            },
            {
                name: 'Diabetes Neuropathy',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Nerve damage from high blood sugar.'
            },
            {
                name: 'Stroke',
                likelihood: 'rare',
                urgency: 'emergency',
                description: 'Blood flow cut off to brain (sudden, one-sided).'
            }
        ],
        homeCare: [
            'Change position if "limb fell asleep".',
            'Wrist splint for carpal tunnel.',
            'Gentle movement.'
        ],
        whenToSeeDoctor: [
            'Sudden onset.',
            'Affects an entire limb.',
            'Accompanied by rash (shingles).'
        ],
        urgency: 'routine',
        evidenceRating: 'C',
        lastUpdated: '2025-03-01',
        sources: []
    },
    {
        id: 'diarrhea',
        name: 'Diarrhea',
        slug: 'diarrhea',
        bodyArea: 'abdomen',
        summary: 'Loose, watery and frequent bowel movements.',
        description: 'Diarrhea is usually caused by a virus or contaminated food. It can cause dehydration.',
        redFlags: [
            'Signs of severe dehydration',
            'Blood or pus in stool (black or tarry stool)',
            'Severe abdominal pain',
            'High fever'
        ],
        yellowFlags: [
            'Lasting > 2 days',
            'Recent travel abroad',
            'Weight loss'
        ],
        relatedConditions: [
            {
                name: 'Viral Gastroenteritis',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Stomach flu.'
            },
            {
                name: 'Food Intolerance',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Lactose intolerance, etc.'
            },
            {
                name: 'IBS',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Functional bowel disorder.'
            }
        ],
        homeCare: [
            'Hydration with electrolyte solutions.',
            'Bland "BRAT" diet (Bananas, Rice, Applesauce, Toast).',
            'Avoid dairy.'
        ],
        whenToSeeDoctor: [
            'Diarrhea > 2 days in adults.',
            'Bloody or black stool.',
            'Severe pain.'
        ],
        urgency: 'self_care',
        evidenceRating: 'A',
        lastUpdated: '2024-08-15',
        sources: []
    },
    {
        id: 'muscle-cramps',
        name: 'Muscle Cramps',
        slug: 'muscle-cramps',
        bodyArea: 'limbs',
        summary: 'Sudden, involuntary muscle contractions that can be painful.',
        description: 'Muscle cramps are sudden, painful tightenings of a muscle. They often occur in the calves, thighs, or feet, especially at night or during exercise. Most are harmless but can signal electrolyte imbalances.',
        redFlags: [
            'Cramps accompanied by severe swelling or redness',
            'Weakness or numbness after the cramp resolves',
            'Cramps occurring after exposure to toxins or medications',
            'Persistent cramping not relieved by stretching'
        ],
        yellowFlags: [
            'Frequent cramps (several per week)',
            'Cramps that last longer than 10 minutes',
            'Associated with muscle weakness over time'
        ],
        relatedConditions: [
            {
                name: 'Dehydration',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Lack of fluids leading to electrolyte imbalance.'
            },
            {
                name: 'Electrolyte Imbalance',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Low potassium, magnesium, or calcium.'
            },
            {
                name: 'Peripheral Artery Disease',
                likelihood: 'uncommon',
                urgency: 'routine',
                description: 'Reduced blood flow to legs causes cramping during activity.'
            },
            {
                name: 'Medication Side Effect',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Statins and diuretics commonly cause cramps.'
            }
        ],
        homeCare: [
            'Stretch the affected muscle gently.',
            'Apply heat to relax the muscle.',
            'Hydrate and consider electrolyte drinks.',
            'Massage the cramped area.'
        ],
        whenToSeeDoctor: [
            'Cramps severely disrupt sleep regularly.',
            'Muscle weakness persists after cramps.',
            'Started after new medication.'
        ],
        urgency: 'self_care',
        evidenceRating: 'B',
        lastUpdated: '2025-01-26',
        sources: []
    },
    {
        id: 'frequent-urination',
        name: 'Frequent Urination',
        slug: 'frequent-urination',
        bodyArea: 'abdomen',
        summary: 'Needing to urinate more often than usual, sometimes with urgency.',
        description: 'Frequent urination (polyuria) means passing urine more often than normal. It can be caused by fluid intake, infections, diabetes, or prostate issues.',
        redFlags: [
            'Blood in urine',
            'Fever with urinary symptoms',
            'Inability to urinate despite urge (retention)',
            'Severe pain in lower back or sides (kidney involvement)'
        ],
        yellowFlags: [
            'Burning sensation during urination',
            'Waking more than twice per night to urinate',
            'Excessive thirst accompanying frequent urination'
        ],
        relatedConditions: [
            {
                name: 'Urinary Tract Infection (UTI)',
                likelihood: 'common',
                urgency: 'urgent',
                description: 'Bacterial infection causing burning and frequency.'
            },
            {
                name: 'Diabetes (Type 1 or 2)',
                likelihood: 'common',
                urgency: 'routine',
                description: 'High blood sugar causes the body to flush glucose via urine.'
            },
            {
                name: 'Overactive Bladder',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Sudden urges to urinate, even when bladder is not full.'
            },
            {
                name: 'Benign Prostatic Hyperplasia (BPH)',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Enlarged prostate in men causing urinary symptoms.'
            }
        ],
        homeCare: [
            'Reduce caffeine and alcohol intake.',
            'Avoid fluids close to bedtime.',
            'Bladder training exercises.',
            'Keep a urination diary to track patterns.'
        ],
        whenToSeeDoctor: [
            'Urinary frequency with fever or chills.',
            'Blood visible in urine.',
            'Accompanied by unexplained weight loss or excessive thirst.'
        ],
        urgency: 'routine',
        evidenceRating: 'A',
        lastUpdated: '2025-01-26',
        sources: []
    },
    {
        id: 'vision-changes',
        name: 'Vision Changes',
        slug: 'vision-changes',
        bodyArea: 'head',
        summary: 'Any alteration in sight including blurriness, floaters, or vision loss.',
        description: 'Vision changes range from minor issues like dry eyes to serious conditions like retinal detachment or stroke. Sudden changes are always concerning.',
        redFlags: [
            'Sudden vision loss in one or both eyes',
            'Flashing lights with new floaters (retinal detachment)',
            'Vision loss accompanied by headache (stroke/aneurysm)',
            'Curtain or shadow over part of vision',
            'Double vision with eye pain'
        ],
        yellowFlags: [
            'Gradual blurring over weeks',
            'Halos around lights at night',
            'Difficulty with night vision'
        ],
        relatedConditions: [
            {
                name: 'Retinal Detachment',
                likelihood: 'rare',
                urgency: 'emergency',
                description: 'Retina separates from back of eye; floaters and flashes.'
            },
            {
                name: 'Glaucoma',
                likelihood: 'uncommon',
                urgency: 'urgent',
                description: 'Increased eye pressure damaging the optic nerve.'
            },
            {
                name: 'Cataracts',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Clouding of the eye lens, common in aging.'
            },
            {
                name: 'Migraine with Aura',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Visual disturbances preceding headache.'
            }
        ],
        homeCare: [
            'Rest eyes from screens.',
            'Use lubricating eye drops if dry.',
            'Wear sunglasses outdoors.',
            'Ensure adequate lighting when reading.'
        ],
        whenToSeeDoctor: [
            'Any sudden change in vision.',
            'Persistent floaters or flashes.',
            'Eye pain accompanying vision changes.'
        ],
        urgency: 'emergency',
        evidenceRating: 'A',
        lastUpdated: '2025-01-26',
        sources: []
    },
    {
        id: 'chronic-cough',
        name: 'Chronic Cough',
        slug: 'chronic-cough',
        bodyArea: 'chest',
        summary: 'A cough that persists for more than 8 weeks in adults.',
        description: 'A chronic cough is not a disease itself but a symptom. The most common causes are postnasal drip, asthma, and acid reflux. In smokers, chronic bronchitis is common.',
        redFlags: [
            'Coughing up blood (hemoptysis)',
            'Unexplained weight loss',
            'Shortness of breath or wheezing',
            'Night sweats (possible TB or cancer)',
            'History of smoking with new cough pattern'
        ],
        yellowFlags: [
            'Cough lasting more than 3 weeks',
            'Change in voice or hoarseness',
            'Thick yellow or green sputum'
        ],
        relatedConditions: [
            {
                name: 'Postnasal Drip',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Mucus from sinuses draining into throat.'
            },
            {
                name: 'Asthma',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Cough-variant asthma may present with cough only.'
            },
            {
                name: 'GERD',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Acid reflux irritating the throat and airways.'
            },
            {
                name: 'COPD',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Chronic obstructive lung disease, usually in smokers.'
            }
        ],
        homeCare: [
            'Stay hydrated.',
            'Use a humidifier.',
            'Honey in warm water (adults only).',
            'Avoid irritants like smoke and dust.',
            'Elevate head when sleeping if reflux suspected.'
        ],
        whenToSeeDoctor: [
            'Cough persists beyond 8 weeks.',
            'Any blood in sputum.',
            'Accompanied by fever or significant weight loss.'
        ],
        urgency: 'routine',
        evidenceRating: 'A',
        lastUpdated: '2025-01-26',
        sources: []
    },
    {
        id: 'constipation',
        name: 'Constipation',
        slug: 'constipation',
        bodyArea: 'abdomen',
        summary: 'Infrequent bowel movements or difficulty passing stool.',
        description: 'Constipation is typically defined as fewer than three bowel movements per week. Stool is often hard, dry, and difficult to pass. Usually caused by diet, hydration, or lifestyle factors.',
        redFlags: [
            'Blood in stool or on toilet paper',
            'Severe abdominal pain',
            'Inability to pass gas (bowel obstruction)',
            'Unexplained weight loss',
            'Alternating with diarrhea (could indicate IBS or cancer)'
        ],
        yellowFlags: [
            'Constipation lasting more than 3 weeks',
            'New constipation in adults over 50',
            'Straining causing pain or hemorrhoids'
        ],
        relatedConditions: [
            {
                name: 'Dietary/Lifestyle Constipation',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Low fiber, dehydration, or sedentary lifestyle.'
            },
            {
                name: 'IBS-Constipation',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Irritable bowel syndrome with constipation predominance.'
            },
            {
                name: 'Hypothyroidism',
                likelihood: 'uncommon',
                urgency: 'routine',
                description: 'Low thyroid function slows gut motility.'
            },
            {
                name: 'Medication Side Effect',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Opioids, antacids, and some blood pressure meds.'
            }
        ],
        homeCare: [
            'Increase fiber intake (fruits, vegetables, whole grains).',
            'Drink plenty of water.',
            'Regular physical activity.',
            'Consider psyllium husk or mild laxatives short-term.',
            'Establish regular bathroom routine.'
        ],
        whenToSeeDoctor: [
            'No bowel movement for more than a week.',
            'Blood in stool.',
            'Severe abdominal pain or bloating.'
        ],
        urgency: 'self_care',
        evidenceRating: 'A',
        lastUpdated: '2025-01-26',
        sources: []
    },
    {
        id: 'swelling-edema',
        name: 'Swelling (Edema)',
        slug: 'swelling-edema',
        bodyArea: 'limbs',
        summary: 'Fluid buildup causing puffiness, usually in legs, ankles, or feet.',
        description: 'Edema is swelling caused by excess fluid trapped in body tissues. It can result from standing too long, but can also indicate heart, kidney, or liver problems.',
        redFlags: [
            'Sudden swelling in one leg with pain (DVT)',
            'Swelling with shortness of breath (heart failure)',
            'Swelling in face or around eyes upon waking',
            'Skin that is red, warm, or tender (infection)',
            'Swelling after injury with inability to move limb'
        ],
        yellowFlags: [
            'Swelling that worsens throughout the day',
            'Skin that stays indented after pressing (pitting edema)',
            'Swelling in both legs progressively worsening'
        ],
        relatedConditions: [
            {
                name: 'Deep Vein Thrombosis (DVT)',
                likelihood: 'uncommon',
                urgency: 'emergency',
                description: 'Blood clot in deep leg vein; one leg swelling with pain.'
            },
            {
                name: 'Heart Failure',
                likelihood: 'uncommon',
                urgency: 'urgent',
                description: 'Heart cannot pump efficiently, fluid backs up in legs.'
            },
            {
                name: 'Venous Insufficiency',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Veins have trouble returning blood from legs.'
            },
            {
                name: 'Kidney Disease',
                likelihood: 'uncommon',
                urgency: 'routine',
                description: 'Kidneys cannot filter fluid properly.'
            }
        ],
        homeCare: [
            'Elevate legs above heart level when resting.',
            'Reduce salt intake.',
            'Compression stockings if recommended.',
            'Regular walking to promote circulation.',
            'Avoid standing or sitting for extended periods.'
        ],
        whenToSeeDoctor: [
            'Sudden swelling in one leg.',
            'Swelling with chest pain or difficulty breathing.',
            'Swelling does not improve with elevation.'
        ],
        urgency: 'routine',
        evidenceRating: 'A',
        lastUpdated: '2025-01-26',
        sources: []
    },
    {
        id: 'ear-pain',
        name: 'Ear Pain',
        slug: 'ear-pain',
        bodyArea: 'head',
        summary: 'Discomfort in or around the ear, ranging from dull ache to sharp pain.',
        description: 'Ear pain (otalgia) can originate in the ear or be referred from nearby structures like the jaw or throat. Ear infections are the most common cause, especially in children.',
        redFlags: [
            'Ear pain with high fever',
            'Pus or blood draining from ear',
            'Sudden hearing loss',
            'Facial weakness on the same side',
            'Severe headache or stiff neck with ear pain'
        ],
        yellowFlags: [
            'Ear pain lasting more than a few days',
            'Recurrent ear infections',
            'Ear pain with jaw clicking or pain (TMJ)'
        ],
        relatedConditions: [
            {
                name: 'Otitis Media (Middle Ear Infection)',
                likelihood: 'common',
                urgency: 'urgent',
                description: 'Infection behind the eardrum, common in children.'
            },
            {
                name: 'Otitis Externa (Swimmer\'s Ear)',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Infection of the ear canal, often from water exposure.'
            },
            {
                name: 'Eustachian Tube Dysfunction',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Blocked tube causing pressure and muffled hearing.'
            },
            {
                name: 'TMJ Disorder',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Jaw joint problems referring pain to the ear.'
            }
        ],
        homeCare: [
            'Warm compress against the ear.',
            'Over-the-counter pain relievers.',
            'Keep ear dry.',
            'Chewing gum to help open Eustachian tubes.',
            'Do not insert objects into ear canal.'
        ],
        whenToSeeDoctor: [
            'Ear pain with fever.',
            'Discharge from the ear.',
            'Hearing loss or severe dizziness.'
        ],
        urgency: 'routine',
        evidenceRating: 'A',
        lastUpdated: '2025-01-26',
        sources: []
    },
    {
        id: 'easy-bruising',
        name: 'Easy Bruising',
        slug: 'easy-bruising',
        bodyArea: 'skin',
        summary: 'Bruises appearing with minimal or no apparent injury.',
        description: 'Bruising occurs when blood vessels under the skin break. Easy bruising can be normal with aging or thin skin, but can also signal blood clotting disorders or medication effects.',
        redFlags: [
            'Bruising with no known cause in unusual locations',
            'Bruises larger than a quarter without trauma',
            'Family history of bleeding disorders',
            'Bleeding from gums, nose, or in urine/stool',
            'Petechiae (tiny red dots) appearing on skin'
        ],
        yellowFlags: [
            'Bruising more easily than in the past',
            'Bruises taking longer than 2 weeks to heal',
            'Started after new medication (especially blood thinners)'
        ],
        relatedConditions: [
            {
                name: 'Aging Skin',
                likelihood: 'common',
                urgency: 'self_care',
                description: 'Skin thins with age, vessels more fragile.'
            },
            {
                name: 'Medication Effects',
                likelihood: 'common',
                urgency: 'routine',
                description: 'Aspirin, blood thinners, and steroids increase bruising.'
            },
            {
                name: 'Vitamin Deficiency',
                likelihood: 'uncommon',
                urgency: 'routine',
                description: 'Vitamin C or K deficiency affecting clotting.'
            },
            {
                name: 'Platelet Disorders',
                likelihood: 'rare',
                urgency: 'urgent',
                description: 'Low platelets or platelet dysfunction.'
            }
        ],
        homeCare: [
            'Protect skin from bumps and injuries.',
            'Eat a balanced diet with adequate vitamins.',
            'Consider wearing long sleeves/pants for protection.',
            'Apply ice to fresh bruises to reduce swelling.'
        ],
        whenToSeeDoctor: [
            'Sudden increase in bruising frequency.',
            'Bruises with other bleeding symptoms.',
            'Large bruises appearing without injury.'
        ],
        urgency: 'routine',
        evidenceRating: 'B',
        lastUpdated: '2025-01-26',
        sources: []
    }
];
