"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  
  if (pathname.startsWith('/admin')) return null;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/app-logo.png" alt="Speaker Logo" width={40} height={40} className="rounded-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform" />
          <span className="text-xl font-extrabold tracking-tight text-slate-900">Speaker</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link href="/features" className={`hover:text-primary transition-colors ${pathname === '/features' ? 'text-primary' : ''}`}>Features</Link>
          <Link href="/methodology" className={`hover:text-primary transition-colors ${pathname === '/methodology' ? 'text-primary' : ''}`}>Methodology</Link>
          <Link href="/#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <Link href="/faq" className={`hover:text-primary transition-colors ${pathname === '/faq' ? 'text-primary' : ''}`}>FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" className="font-bold text-slate-600 hidden sm:flex hover:bg-slate-100 hover:text-slate-900">
              Admin Panel
            </Button>
          </Link>
          <Button onClick={() => { if(pathname === '/') window.location.href = '#download'; else window.location.href = '/#download'; }} className="font-bold rounded-full px-6 shadow-xl shadow-primary/30 hover:-translate-y-0.5 transition-transform">
            Get the App
          </Button>
        </div>
      </div>
    </nav>
  );
}
