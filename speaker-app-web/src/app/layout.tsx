import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Speaker App | Learn Languages Effectively",
  description: "A platform for learning languages through interactive audio content, interactive questions, and personalized vocabulary.",
};

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("light h-full antialiased scroll-smooth", "font-sans", geist.variable)}>
      <body className={`${inter.className} min-h-full flex flex-col bg-background text-foreground relative`}>
        {/* Global decorative background patterns */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
           {/* Grid Pattern */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
           {/* Side Glows */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px] -translate-x-1/2"></div>
           <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] translate-x-1/3"></div>
        </div>
        
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
