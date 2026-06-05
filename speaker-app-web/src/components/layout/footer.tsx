"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="py-12 px-6 border-t border-slate-100 bg-white text-slate-500 text-sm font-medium relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 text-slate-900">
          <Image src="/app-logo.png" alt="Speaker Logo" width={32} height={32} className="rounded-lg shadow-sm" />
          <span className="font-bold tracking-tight text-base">Speaker Inc.</span>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="/admin" className="hover:text-primary transition-colors">Admin Login</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Speaker. All rights reserved.</p>
      </div>
    </footer>
  );
}
