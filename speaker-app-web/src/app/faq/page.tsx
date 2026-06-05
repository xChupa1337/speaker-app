"use client";

import { MessageCircleQuestion } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function FAQPage() {
  const faqs = [
    {
      q: "How does the Speaker methodology work?",
      a: "Our app uses interactive blocks, spaced repetition, and real-life topic simulations to immerse you in the target language. Instead of just memorizing, you practice active recall with speech and text variants."
    },
    {
      q: "Do I need an internet connection to use the app?",
      a: "Currently, yes. Since we use advanced backend systems to track your progress and provide dynamic content, an active internet connection is required."
    },
    {
      q: "Can I learn multiple languages at the same time?",
      a: "Absolutely! Speaker OS supports seamless switching between languages like English, Spanish, French, and more right from your dashboard."
    },
    {
      q: "Is the app completely free?",
      a: "Yes! Currently, all our core modules and vocabulary banks are free to use as we continue to grow and build our community."
    },
    {
      q: "How often are new lessons added?",
      a: "Our content team adds new thematic modules and vocabulary topics bi-weekly. You'll always have fresh material to practice!"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="text-center space-y-4 mb-16">
        <div className="w-16 h-16 bg-blue-100 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <MessageCircleQuestion size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900">Frequently Asked Questions</h1>
        <p className="text-xl text-slate-500">Everything you need to know about learning with Speaker.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="group bg-white border rounded-2xl shadow-sm open:shadow-md transition-all">
            <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-lg text-slate-900 list-none">
              {faq.q}
              <span className="transition-transform duration-300 group-open:-rotate-180 text-primary">
                <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="px-6 pb-6 text-slate-600 leading-relaxed">
              <p>{faq.a}</p>
            </div>
          </details>
        ))}
      </div>

      <div className="mt-16 text-center bg-slate-50 border rounded-3xl p-10">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Still have questions?</h3>
        <p className="text-slate-500 mb-6">We're here to help you achieve fluency.</p>
        <button className="bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-primary/30 hover:-translate-y-1 transition-transform">
          Contact Support
        </button>
      </div>
    </div>
  );
}
