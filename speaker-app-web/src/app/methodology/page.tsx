"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-4xl mx-auto">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900">Our Methodology</h1>
        <p className="text-xl text-slate-500">The science of language learning, simplified.</p>
      </div>

      <div className="space-y-12">
        <div className="bg-blue-50 border border-blue-100 p-8 rounded-[2rem]">
          <h2 className="text-2xl font-bold mb-4">1. The Comprehensible Input Approach</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            You don't learn a language by memorizing grammar rules. You acquire it by understanding messages. We provide content slightly above your current level, forcing your brain to adapt naturally.
          </p>
          <ul className="space-y-2">
            <li className="flex gap-2 items-center text-slate-700 font-medium"><CheckCircle2 className="text-primary w-5 h-5"/> Immersive audio</li>
            <li className="flex gap-2 items-center text-slate-700 font-medium"><CheckCircle2 className="text-primary w-5 h-5"/> Visual context</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-100 p-8 rounded-[2rem]">
          <h2 className="text-2xl font-bold mb-4">2. Spaced Repetition System (SRS)</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Our algorithm tracks when you are about to forget a word, and brings it back in your lessons exactly when you need to see it to lock it into long-term memory.
          </p>
          <ul className="space-y-2">
            <li className="flex gap-2 items-center text-slate-700 font-medium"><CheckCircle2 className="text-green-500 w-5 h-5"/> Dynamic reviews</li>
            <li className="flex gap-2 items-center text-slate-700 font-medium"><CheckCircle2 className="text-green-500 w-5 h-5"/> Memory retention optimized</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
