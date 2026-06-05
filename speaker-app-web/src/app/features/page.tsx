"use client";

import { motion } from "framer-motion";
import { Mic, BookOpen, BarChart3, Users, Globe, Headphones, Flame } from "lucide-react";
import Image from "next/image";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-4 mb-20">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900">Features built for <span className="text-primary">fluency</span></h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">Discover the tools we built to get you speaking a new language faster than ever before.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
        <div className="order-2 md:order-1 space-y-6">
          <div className="w-16 h-16 bg-blue-100 text-primary rounded-2xl flex items-center justify-center">
            <Mic size={32} />
          </div>
          <h2 className="text-3xl font-bold">Advanced Speech Recognition</h2>
          <p className="text-lg text-slate-500">
            Our app listens to your pronunciation and provides instant, color-coded feedback. Know exactly which syllables you nailed and which ones need more practice.
          </p>
          <ul className="space-y-3 font-semibold text-slate-700">
            <li className="flex gap-2 items-center"><Flame className="text-orange-500"/> Real-time accent analysis</li>
            <li className="flex gap-2 items-center"><Flame className="text-orange-500"/> Native speaker audio comparison</li>
          </ul>
        </div>
        <div className="order-1 md:order-2 bg-slate-100 rounded-[3rem] p-8 flex justify-center shadow-inner">
           <Image src="/screenshot-lessons.png" alt="Speech Feature" width={250} height={500} className="rounded-[2rem] shadow-2xl" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="bg-slate-100 rounded-[3rem] p-8 flex justify-center shadow-inner">
           <Image src="/screenshot-vocab.png" alt="Vocabulary Feature" width={250} height={500} className="rounded-[2rem] shadow-2xl" />
        </div>
        <div className="space-y-6">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-2xl flex items-center justify-center">
            <BookOpen size={32} />
          </div>
          <h2 className="text-3xl font-bold">Thematic Vocabulary Builder</h2>
          <p className="text-lg text-slate-500">
            Learn words that actually matter. We group vocabulary by essential life scenarios, from ordering in a restaurant to navigating emergencies.
          </p>
          <ul className="space-y-3 font-semibold text-slate-700">
            <li className="flex gap-2 items-center"><Globe className="text-green-500"/> 10,000+ curated words</li>
            <li className="flex gap-2 items-center"><Globe className="text-green-500"/> Contextual examples for every word</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
