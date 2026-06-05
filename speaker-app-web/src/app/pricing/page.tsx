"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, Lock, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export default function PricingPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate Stripe redirect
    setTimeout(() => {
      alert("Redirecting to secure Stripe Checkout...");
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-5xl mx-auto">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900">Simple, transparent pricing</h1>
        <p className="text-xl text-slate-500">Invest in your fluency today.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg bg-white relative overflow-hidden group hover:shadow-xl transition-shadow">
          <CardHeader className="text-center pb-8 pt-8">
            <CardTitle className="text-2xl text-slate-600">Free Trial</CardTitle>
            <div className="mt-4 flex items-baseline justify-center gap-1">
              <span className="text-5xl font-black">$0</span>
              <span className="text-slate-500 font-medium">/first hour</span>
            </div>
            <CardDescription className="mt-4 text-base">Experience the full power of the app completely free for 1 hour.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-8">
            <ul className="space-y-3">
              {['Full access to all 300+ modules', 'Advanced speech recognition', 'All vocabulary unlocked', 'No credit card required'].map((f,i) => (
                <li key={i} className="flex gap-3 text-slate-600 font-medium items-center">
                  <CheckCircle2 className="w-5 h-5 text-slate-300" /> {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="px-8 pb-8 pt-4 flex flex-col gap-4">
            <Button variant="outline" className="w-full h-12 text-lg font-bold rounded-xl">Start 1-Hour Trial</Button>
            <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck size={14} /> No commitment. Cancel anytime.
            </p>
          </CardFooter>
        </Card>

        <Card className="border-2 border-primary shadow-2xl shadow-primary/20 bg-white relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
          <div className="absolute top-0 inset-x-0 h-2 bg-primary"></div>
          <div className="absolute top-6 right-6">
            <span className="px-3 py-1 bg-blue-100 text-primary text-xs font-black uppercase rounded-full">Most Popular</span>
          </div>
          <CardHeader className="text-center pb-8 pt-8">
            <CardTitle className="text-2xl text-slate-900">Premium Fluent</CardTitle>
            <div className="mt-4 flex items-baseline justify-center gap-1">
              <span className="text-5xl font-black text-primary">$19.99</span>
              <span className="text-slate-500 font-medium">/one-time</span>
            </div>
            <CardDescription className="mt-4 text-base">Lifetime access. Pay once, learn forever.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-8">
            <ul className="space-y-3">
              {['All 300+ modules unlocked permanently', 'Full thematic vocabulary & updates', 'Advanced AI pronunciation analysis', 'Offline mode', 'Ad-free experience forever'].map((f,i) => (
                <li key={i} className="flex gap-3 text-slate-700 font-bold items-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="px-8 pb-8 pt-4 flex flex-col gap-4">
            <Button 
              onClick={handleCheckout} 
              disabled={isProcessing}
              className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/30"
            >
              {isProcessing ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Secure Checkout...</> : "Buy Lifetime Access"}
            </Button>
            
            <div className="flex flex-col items-center gap-2 mt-2">
               <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                  <Lock size={14} className="text-green-500" />
                  Guaranteed safe & secure checkout
               </div>
               <div className="flex gap-2 items-center text-slate-400">
                  {/* Mock payment method icons using text/borders */}
                  <div className="px-2 py-1 border rounded text-[10px] font-bold bg-slate-50 text-slate-600">STRIPE</div>
                  <div className="px-2 py-1 border rounded text-[10px] font-bold bg-slate-50 text-slate-600">VISA</div>
                  <div className="px-2 py-1 border rounded text-[10px] font-bold bg-slate-50 text-slate-600">MASTERCARD</div>
                  <div className="px-2 py-1 border rounded text-[10px] font-bold bg-slate-50 text-slate-600">APPLE PAY</div>
               </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
