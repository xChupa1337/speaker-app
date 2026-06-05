"use client";

import { motion } from "framer-motion";
import { Download, Globe, BookOpen, BarChart3, ShieldCheck, ChevronRight, Mic, PlayCircle, Star, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-slate-900 overflow-hidden font-sans">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 overflow-hidden">
        {/* Colorful Background Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-green-400/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-yellow-400/10 rounded-full blur-[80px] -z-10" />
        
        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-semibold bg-blue-50 text-primary border-blue-100 hover:bg-blue-100 transition-colors">
              🎉 New version available now
            </Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.05]"
          >
            Speak fluently. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-cyan-500">
              Without fear.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Speaker is the most colorful, interactive, and effective way to master a new language. Practice real-life conversations from day one.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-2xl shadow-primary/30 font-bold">
              <Download className="mr-2 h-5 w-5" />
              Download APK (1 Hour Free)
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full font-bold border-slate-200 text-slate-700 hover:bg-slate-50">
              <PlayCircle className="mr-2 h-5 w-5 text-primary" />
              See how it works
            </Button>
          </motion.div>
        </div>

        {/* Floating Real App Illustration with Floating Faces */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-24 relative flex justify-center items-center"
        >
          {/* Floating Faces */}
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -left-12 top-10 md:-left-24 md:top-20 z-20">
            <Image src="/face1.jpg" alt="User" width={80} height={80} className="rounded-full border-4 border-white shadow-2xl object-cover" />
          </motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} className="absolute -right-8 top-32 md:-right-16 md:top-40 z-20">
            <Image src="/face2.jpg" alt="User" width={96} height={96} className="rounded-full border-4 border-white shadow-2xl object-cover" />
          </motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 2 }} className="absolute left-10 bottom-10 md:left-20 md:bottom-20 z-20">
            <Image src="/face3.jpg" alt="User" width={72} height={72} className="rounded-full border-4 border-white shadow-2xl object-cover" />
          </motion.div>
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }} className="absolute right-12 bottom-0 md:right-24 md:-bottom-10 z-20">
            <Image src="/face4.jpg" alt="User" width={110} height={110} className="rounded-full border-4 border-white shadow-2xl object-cover" />
          </motion.div>

          {/* Main Mockup */}
          <div className="relative w-[320px] h-[640px] rounded-[3.5rem] border-[14px] border-white bg-slate-100 shadow-[0_40px_80px_-20px_rgba(0,122,255,0.4)] z-10 overflow-hidden transform hover:-translate-y-4 transition-transform duration-700">
            <Image src="/screenshot-lessons.png" alt="App Onboarding" fill className="object-cover" />
          </div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-slate-500 font-bold text-lg">
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              <Star className="fill-current" size={24} />
              <Star className="fill-current" size={24} />
              <Star className="fill-current" size={24} />
              <Star className="fill-current" size={24} />
              <Star className="fill-current" size={24} />
            </div>
            <span className="text-slate-700">4.9/5 Average Rating</span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300"></div>
          <div className="flex items-center gap-3">
            <Globe className="text-primary" size={24} />
            <span>6+ Supported Languages</span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300"></div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-green-500" size={24} />
            <span>Used by 10k+ Learners</span>
          </div>
        </div>
      </section>

      {/* Colorful Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">Learning that feels like playing</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">We combined the best of cognitive science with beautiful design to make you want to learn every day.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center relative overflow-hidden">
                <Mic className="w-20 h-20 text-primary opacity-20 absolute -right-4 -bottom-4" />
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary">
                  <Mic size={32} />
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Pronunciation Check</h3>
                <p className="text-slate-500 font-medium leading-relaxed">Speak into your microphone and get instant feedback on your accent. We highlight exactly what to improve.</p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center relative overflow-hidden">
                <BookOpen className="w-20 h-20 text-green-500 opacity-20 absolute -right-4 -bottom-4" />
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-green-500">
                  <BookOpen size={32} />
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Bite-sized Lessons</h3>
                <p className="text-slate-500 font-medium leading-relaxed">Learn on the go with 5-minute interactive video and audio lessons that fit perfectly into your busy schedule.</p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 bg-gradient-to-br from-yellow-100 to-orange-50 flex items-center justify-center relative overflow-hidden">
                <BarChart3 className="w-20 h-20 text-yellow-500 opacity-20 absolute -right-4 -bottom-4" />
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-yellow-500">
                  <BarChart3 size={32} />
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Track Progress</h3>
                <p className="text-slate-500 font-medium leading-relaxed">Watch your vocabulary grow. We track your streaks and visualize your fluency journey every step of the way.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Content Demo Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Real scenarios. <br />
              <span className="text-primary">Not just random words.</span>
            </h2>
            <p className="text-lg text-slate-400 font-medium">
              We focus on the phrases you will actually use. Whether ordering food, navigating an airport, or making friends, you will be prepared.
            </p>
            <ul className="space-y-4">
              {['Restaurant & Ordering', 'Travel & Airports', 'Everyday Conversations', 'Emergencies & Health'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-lg font-semibold">
                  <CheckCircle2 className="text-green-400" />
                  {item}
                </li>
              ))}
            </ul>
            <Button size="lg" className="h-14 px-8 text-lg rounded-full font-bold bg-white text-slate-900 hover:bg-slate-100">
              Start Learning Today
            </Button>
          </div>
          
          <div className="relative z-10 flex justify-end">
             <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-2xl">✈️</div>
                    <h3 className="font-bold text-xl">Airport Basics</h3>
                  </div>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0">A1 Level</Badge>
                </div>
                <div className="space-y-3">
                  {['Passport - Паспорт', 'Luggage - Багаж', 'Flight - Рейс'].map((word, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-700/50 flex justify-between items-center">
                      <span className="font-semibold">{word.split(' - ')[0]}</span>
                      <span className="text-slate-400">{word.split(' - ')[1]}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Reviews Section with Faces */}
      <section id="reviews" className="py-32 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">Loved by thousands</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Don't just take our word for it. Hear from people who actually started speaking confidently.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-[2rem] p-8 bg-white">
              <div className="flex gap-1 text-yellow-400 mb-6">
                <Star className="fill-current" size={20} /><Star className="fill-current" size={20} /><Star className="fill-current" size={20} /><Star className="fill-current" size={20} /><Star className="fill-current" size={20} />
              </div>
              <p className="text-lg font-medium text-slate-700 mb-8 leading-relaxed">
                "I tried everything before Speaker. The interactive pronunciation check is a game changer. I finally feel confident ordering food in Spanish!"
              </p>
              <div className="flex items-center gap-4">
                <Image src="/face5.jpg" alt="Reviewer" width={56} height={56} className="rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900">Sarah Jenkins</h4>
                  <p className="text-sm text-slate-500">Learning Spanish</p>
                </div>
              </div>
            </Card>

            <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-[2rem] p-8 bg-white">
              <div className="flex gap-1 text-yellow-400 mb-6">
                <Star className="fill-current" size={20} /><Star className="fill-current" size={20} /><Star className="fill-current" size={20} /><Star className="fill-current" size={20} /><Star className="fill-current" size={20} />
              </div>
              <p className="text-lg font-medium text-slate-700 mb-8 leading-relaxed">
                "The vocabulary is actually useful! No more learning how to say 'the apple is red'. I'm learning how to ask for directions and book hotels."
              </p>
              <div className="flex items-center gap-4">
                <Image src="/face6.jpg" alt="Reviewer" width={56} height={56} className="rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900">David Chen</h4>
                  <p className="text-sm text-slate-500">Learning German</p>
                </div>
              </div>
            </Card>

            <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-[2rem] p-8 bg-white">
              <div className="flex gap-1 text-yellow-400 mb-6">
                <Star className="fill-current" size={20} /><Star className="fill-current" size={20} /><Star className="fill-current" size={20} /><Star className="fill-current" size={20} /><Star className="fill-current" size={20} />
              </div>
              <p className="text-lg font-medium text-slate-700 mb-8 leading-relaxed">
                "The 1-hour free trial was all I needed to be convinced. The interface is beautiful, and the spaced repetition really works. Best app out there."
              </p>
              <div className="flex items-center gap-4">
                <Image src="/face1.jpg" alt="Reviewer" width={56} height={56} className="rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900">Elena Rostova</h4>
                  <p className="text-sm text-slate-500">Learning English</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-white to-blue-50/50 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
            Ready to become fluent?
          </h2>
          <p className="text-xl text-slate-500 font-medium">
            Join thousands of learners and start speaking a new language today. The first hour of learning is completely free!
          </p>
          <Button size="lg" className="h-16 px-10 text-xl rounded-full shadow-2xl shadow-primary/30 font-bold hover:scale-105 transition-transform">
            Start 1-Hour Free Trial
          </Button>
        </div>
      </section>

    </div>
  );
}
