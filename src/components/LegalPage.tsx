/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * LegalPage — Privacy Policy and Terms of Service pages so the footer
 * legal links (previously dead "#" anchors) have real destinations.
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";

interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  updated: "Last updated: August 2026",
  intro:
    "Pakka Patriot ('we', 'us') is committed to protecting the privacy of every child, parent, and visitor to this website. This policy explains what we collect, why we collect it, and how you stay in control.",
  sections: [
    {
      heading: "Information we collect",
      body: [
        "Contact details you choose to share — such as your name and email address when you join the journey, subscribe to our newsletter, or place an order.",
        "Basic usage information (pages visited, device type) collected anonymously to help us understand what content our community loves.",
      ],
    },
    {
      heading: "How we use your information",
      body: [
        "To send the stories, eBooks, and updates you asked for, and to deliver merchandise orders placed through our store.",
        "To improve our content and website experience. We never sell your personal information to anyone.",
      ],
    },
    {
      heading: "Children's privacy",
      body: [
        "Pakka Patriot is designed for curious young minds. We encourage parents and guardians to explore the site together with their children and to supervise any information shared in forms.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        "You may unsubscribe from emails at any time using the link in any email, or contact us to request access to, correction of, or deletion of the information you have shared with us.",
      ],
    },
    {
      heading: "Contact us",
      body: [
        "Questions about this policy? Write to us at support@pakkapatriot.com and we will be happy to help.",
      ],
    },
  ],
};

const TERMS: LegalDoc = {
  title: "Terms of Service",
  updated: "Last updated: August 2026",
  intro:
    "Welcome to Pakka Patriot! These terms keep the experience safe, fair, and fun for everyone — kids, parents, teachers, and fellow patriots.",
  sections: [
    {
      heading: "Using the website",
      body: [
        "All content on Pakka Patriot — stories, eBooks, games, and ideas — is provided for personal, non-commercial, educational use. Feel free to learn, explore, and share the inspiration with credit to Pakka Patriot.",
      ],
    },
    {
      heading: "eBooks & digital content",
      body: [
        "Our free eBook library is offered for personal reading and classroom use. Please do not resell or republish the digital content without our permission.",
      ],
    },
    {
      heading: "Merchandise orders",
      body: [
        "Orders placed through our store are recorded and fulfilled by the Pakka Patriot team. We will reach out to confirm payment and delivery details. Prices are shown in Indian Rupees (₹) and may change from time to time.",
      ],
    },
    {
      heading: "Games",
      body: [
        "Our traditional Indian games (Chaukabaara, Pachisi, Aadu Puli Aatam, and friends) are free to play. Online rooms are for friendly, respectful play — be a good sport, always.",
      ],
    },
    {
      heading: "Acceptable use",
      body: [
        "Please treat fellow community members with respect. Do not misuse the site, attempt to disrupt its services, or share harmful content.",
      ],
    },
    {
      heading: "Changes & contact",
      body: [
        "We may update these terms as the site grows. Continued use of the website means you accept the current terms. Questions? Write to us at support@pakkapatriot.com.",
      ],
    },
  ],
};

interface LegalPageProps {
  doc: "privacy" | "terms";
}

export default function LegalPage({ doc }: LegalPageProps) {
  const navigate = useNavigate();
  const data = doc === "privacy" ? PRIVACY : TERMS;
  const Icon = doc === "privacy" ? ShieldCheck : FileText;

  return (
    <div className="min-h-screen bg-brand-cream relative overflow-hidden">
      {/* Background decor */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-[#F6B828]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Sticky top bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#F0EBE0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-[#0A2240] hover:text-[#F6B828] transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <span className="text-[10px] font-black tracking-widest text-[#8A9EB4] uppercase">
            Pakka Patriot · Legal
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#0A2240]/5 rounded-full px-4 py-1.5 mb-4">
            <Icon className="w-4 h-4 text-[#F6B828]" />
            <span className="text-xs font-black tracking-widest text-[#0A2240] uppercase">Pakka Patriot</span>
          </div>
          <h1 className="font-brush text-4xl sm:text-5xl text-[#0A2240] tracking-wide leading-tight">
            {data.title.split(" ")[0]}{" "}
            <span className="text-[#F6B828]">{data.title.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="text-xs font-bold text-[#8A9EB4] uppercase tracking-wider mt-3">{data.updated}</p>
          <p className="text-[#4E637A] font-medium text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            {data.intro}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {data.sections.map((section, i) => (
            <div
              key={section.heading}
              className="bg-white rounded-3xl border border-[#F0EBE0] p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-[#FAF6EC] border border-[#E4DCB9] text-[#F6B828] font-black flex items-center justify-center text-sm">
                  {i + 1}
                </span>
                <h2 className="font-display font-black text-lg sm:text-xl text-[#0A2240] tracking-tight">
                  {section.heading}
                </h2>
              </div>
              <div className="space-y-2.5 pl-11">
                {section.body.map((para, j) => (
                  <p key={j} className="text-sm text-[#4E637A] font-medium leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#8A9EB4] font-semibold">
            Questions? Write to us at{" "}
            <a
              href="mailto:support@pakkapatriot.com"
              className="text-[#F6B828] hover:text-[#DAA520] font-bold underline transition-colors"
            >
              support@pakkapatriot.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
