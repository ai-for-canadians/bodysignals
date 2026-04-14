import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of use for Body Signals, an independent research digest summarising peer-reviewed health research for Canadian and US readers.',
};

const sections = [
  {
    number: 1,
    title: 'Acceptance of Terms',
    content:
      'By accessing or using the Body Signals website ("the Site"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Site. We reserve the right to modify these terms at any time, and your continued use of the Site following any changes constitutes acceptance of the revised terms.',
  },
  {
    number: 2,
    title: 'Nature of Service',
    content:
      'Body Signals is an independent research digest and publisher. We summarise published, peer-reviewed health research in plain language for Canadian and US readers. We are not a healthcare provider, medical institution, telehealth service, or clinical education platform. The information on this Site is intended for general informational purposes only and does not constitute medical advice, diagnosis, or treatment.',
  },
  {
    number: 3,
    title: 'No Practitioner\u2013Patient Relationship',
    content:
      'Use of this Site does not create a doctor-patient, therapist-client, or any other practitioner\u2013patient relationship between you and Body Signals, its editors, contributors, or affiliates. The research summaries provided here are not a substitute for professional medical advice. Always consult a qualified healthcare provider regarding any medical condition or treatment.',
  },
  {
    number: 4,
    title: 'Limitation of Liability',
    content:
      'To the fullest extent permitted by applicable law, Body Signals and its editors, contributors, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or related to your use of, or inability to use, the Site or any content on it. This includes, without limitation, damages for errors, omissions, interruptions, defects, delays, or any actions taken in reliance on the information presented.',
  },
  {
    number: 5,
    title: 'No Warranties',
    content:
      'The Site and all content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. Body Signals does not warrant that the information on the Site is accurate, complete, reliable, current, or error-free. Research evolves continuously; information that was accurate at the time of publication may subsequently be superseded by newer findings.',
  },
  {
    number: 6,
    title: 'Permitted Use',
    content:
      'You may access and use the Site for personal, non-commercial informational purposes. You may share links to pages on the Site. You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any content from the Site for commercial purposes without prior written consent from Body Signals. Automated scraping, crawling, or data extraction beyond what is permitted by our robots.txt is prohibited.',
  },
  {
    number: 7,
    title: 'Intellectual Property',
    content:
      'All content on the Site \u2014 including text, graphics, logos, page layouts, and evidence ratings \u2014 is the property of Body Signals or its content suppliers and is protected by Canadian and international copyright, trademark, and other intellectual property laws. Our A\u2013F evidence ratings are editorial judgements and are proprietary to Body Signals.',
  },
  {
    number: 8,
    title: 'User Submissions',
    content:
      'If you submit feedback, corrections, or other communications through our feedback widget or contact channels, you grant Body Signals a non-exclusive, royalty-free, perpetual licence to use, reproduce, and adapt such submissions for the purpose of improving the Site. You represent that any feedback you submit does not infringe the intellectual property rights of any third party and does not contain unlawful material.',
  },
  {
    number: 9,
    title: 'Third-Party Links',
    content:
      'The Site may contain links to third-party websites, including research journals, government health agencies, and medical organisations. These links are provided for convenience and reference only. Body Signals does not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party sites. Accessing third-party sites is at your own risk.',
  },
  {
    number: 10,
    title: 'Governing Law',
    content:
      'These Terms of Use shall be governed by and construed in accordance with the laws of the Province of Ontario, Canada, without regard to its conflict of law provisions. Any dispute arising from or relating to these terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of the Province of Ontario.',
  },
  {
    number: 11,
    title: 'Severability',
    content:
      'If any provision of these Terms of Use is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving its original intent.',
  },
  {
    number: 12,
    title: 'Changes to Terms',
    content:
      'Body Signals reserves the right to update or modify these Terms of Use at any time. Changes will be effective immediately upon posting to the Site. We will update the "Last reviewed" date at the top of this page when changes are made. Your continued use of the Site after changes are posted constitutes your acceptance of the revised terms.',
  },
  {
    number: 13,
    title: 'Contact Information',
    content:
      'If you have questions about these Terms of Use, please contact us at editorial@bodysignals.org or visit our contact page.',
  },
  {
    number: 14,
    title: 'Entire Agreement',
    content:
      'These Terms of Use, together with our Privacy Policy, Disclaimer, and Editorial Policy, constitute the entire agreement between you and Body Signals regarding your use of the Site. They supersede all prior agreements, understandings, and representations, whether written or oral, relating to the same subject matter.',
  },
];

export default function TermsPage() {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-10 h-10 text-amber-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50">
            Terms of Use
          </h1>
        </div>
        <p className="text-slate-400 mb-10">Last reviewed: 2026-04-13</p>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.number}>
              <h2 className="text-2xl font-bold mb-3 text-slate-50">
                <span className="text-amber-500 mr-2">{section.number}.</span>
                {section.title}
              </h2>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <p className="text-slate-300 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-500" />
            Questions? Contact us at{' '}
            <a
              href="mailto:editorial@bodysignals.org"
              className="text-amber-500 hover:text-amber-400 underline"
            >
              editorial@bodysignals.org
            </a>{' '}
            or visit our{' '}
            <Link
              href="/contact"
              className="text-amber-500 hover:text-amber-400 underline"
            >
              contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
