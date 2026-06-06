"use client";

import { useState, useEffect } from "react";
import { 
  Database, LayoutDashboard, BookOpen, Menu, Plus, 
  Edit2, Trash2, Type, Search, ChevronRight, Video, FileText,
  Folder, Flame, Settings, Users, LogOut, Code, UserCircle2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Twemoji helper for Windows
const getFlagEmoji = (countryCode: string) => {
  const codePoints = {
    en: '1f1ec-1f1e7', es: '1f1ea-1f1f8', fr: '1f1eb-1f1f7', 
    de: '1f1e9-1f1ea', pl: '1f1f5-1f1f1', uk: '1f1fa-1f1e6'
  }[countryCode?.toLowerCase()] || '1f30d';
  return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codePoints}.svg`;
};

const menuItems = [
  { id: "lessons", icon: BookOpen, label: "Course Modules" },
  { id: "words", icon: Type, label: "Vocabulary Bank" },
  { id: "schemas", icon: Database, label: "DB Schemas" },
  { id: "users", icon: Users, label: "User Management" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<string>("lessons");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const [lessons, setLessons] = useState<any[]>([]);
  const [vocabTopics, setVocabTopics] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);

  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Filtering states
  const [activeLang, setActiveLang] = useState<string>("en");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"lesson" | "vocab">("lesson");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("adminAuth");
      if (auth === "true") setIsAuthenticated(true);
      setIsAuthChecking(false);
    }

    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.lessons) setLessons(data.lessons);
        if (data.vocabTopics) setVocabTopics(data.vocabTopics);
        if (data.users) setUsersList(data.users);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const openModal = (type: "lesson" | "vocab", item?: any) => {
    setModalType(type);
    if (item) {
      setEditingId(type === "lesson" ? item.lessonId : item.id);
      setFormData(JSON.parse(JSON.stringify(item)));
    } else {
      setEditingId(null);
      if (type === "lesson") {
        setFormData({ 
          lessonId: `lesson-${Date.now()}`, 
          title: "New Course Module [A1]", 
          language: activeLang, 
          level: "A1", 
          lessonData: [
             { 
               title: "Topic 1: Basics", 
               questions: [
                 { id: "q1", title: "Translate to native", questionStr: "Hello", questionAudio: "", correctIndex: 0, variants: ["Привіт", "Бувай", "Дякую"] },
                 { id: "q2", title: "Match the words", questionStr: "Goodbye", questionAudio: "", correctIndex: 1, variants: ["Привіт", "Бувай", "Дякую"] }
               ]
             }
          ]
        });
      } else {
        setFormData({ 
          id: `vocab-${Date.now()}`, 
          title: "New Vocabulary List", 
          language: activeLang, 
          emoji: "📝",
          words: [
             { word: "Example", translation: "Приклад", transcription: "/ɪɡˈzɑːmp(ə)l/", examples: ["This is an example."] }
          ] 
        });
      }
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(null);
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: modalType, data: formData })
      });
      if (res.ok) {
        // Refetch to get real updated data
        fetch('/api/data').then(r => r.json()).then(d => {
           if (d.lessons) setLessons(d.lessons);
           if (d.vocabTopics) setVocabTopics(d.vocabTopics);
        });
      }
    } catch (e) {
      console.error(e);
    }
    closeModal();
  };
  
  const handleDelete = async (type: "lesson" | "vocab" | "user", id: string) => {
    if (type === "vocab") {
      alert("Словник (Vocabulary) наразі жорстко закодований у файлі vocab.ts, тому його не можна видалити через адмін-панель.");
      return;
    }
    if (confirm("Delete this item permanently?")) {
      try {
        const res = await fetch(`/api/data?type=${type}&id=${id}`, { method: 'DELETE' });
        const result = await res.json();
        
        if (res.ok && result.success) {
          // Optimistic update
          if (type === "lesson") setLessons(lessons.filter(l => l.lessonId !== id));
          if (type === "user") setUsersList(usersList.filter(u => u._id !== id));
        } else {
          alert("Failed to delete: " + (result.error || "Unknown error"));
        }
      } catch(e) {
        console.error(e);
        alert("Network error. Failed to delete.");
      }
    }
  };

  // Grouping logic
  const filteredLessons = lessons.filter(l => l.language === activeLang && l.title?.toLowerCase().includes(searchQuery.toLowerCase()));
  const lessonsByLevel = filteredLessons.reduce((acc: any, lesson) => {
    const level = lesson.level || "Uncategorized";
    if (!acc[level]) acc[level] = [];
    acc[level].push(lesson);
    return acc;
  }, {});

  const filteredVocab = vocabTopics.filter(v => v.language === activeLang && v.title?.toLowerCase().includes(searchQuery.toLowerCase()));
  const availableLangs = Array.from(new Set([...lessons.map(l => l.language), ...vocabTopics.map(v => v.language)])).filter(Boolean).sort();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authEmail === "admin@speaker.com" && authPassword === "admin123") {
      sessionStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid admin credentials");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
  };

  if (isAuthChecking) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <Card className="w-full max-w-md shadow-2xl shadow-primary/10 rounded-3xl border-0 overflow-hidden">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 flex flex-col items-center justify-center text-white">
            <Image src="/app-logo.png" alt="Logo" width={64} height={64} className="rounded-2xl shadow-xl mb-5 bg-white p-1" />
            <h2 className="text-3xl font-black tracking-tight">Speaker OS</h2>
            <p className="text-slate-300 text-sm mt-2 font-medium">Platform Administration</p>
          </div>
          <CardContent className="p-8 bg-white">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-bold">Admin Email</Label>
                <Input id="email" type="email" placeholder="admin@speaker.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} required className="h-12 bg-slate-50 border-slate-200 rounded-xl px-4" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-bold">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={authPassword} onChange={e => setAuthPassword(e.target.value)} required className="h-12 bg-slate-50 border-slate-200 rounded-xl px-4" />
              </div>
              {authError && <p className="text-red-500 text-sm font-semibold text-center bg-red-50 p-2 rounded-lg">{authError}</p>}
              <Button type="submit" className="w-full h-12 text-base font-bold mt-4 rounded-xl shadow-md hover:shadow-lg transition-all">Access Dashboard</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-r bg-white flex flex-col h-screen sticky top-0 shrink-0 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] z-40"
          >
            <div className="h-20 flex items-center px-6 border-b shrink-0 gap-3">
              <Image src="/app-logo.png" alt="Logo" width={36} height={36} className="rounded-xl shadow-md" />
              <span className="font-extrabold text-xl tracking-tight text-slate-900">Speaker OS</span>
            </div>
            
            <ScrollArea className="flex-1 py-6 px-4">
              <div className="space-y-1">
                <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Platform</p>
                {menuItems.map(item => {
                  const isActive = activeTab === item.id;
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start gap-3 font-semibold h-11 rounded-xl transition-all ${isActive ? "bg-blue-50 text-primary hover:bg-blue-100" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon size={18} className={isActive ? "text-primary" : "text-slate-400"} />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t bg-muted/10">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                  <LogOut size={16} />
                  Exit to Website
                </Button>
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-20 border-b bg-white/80 backdrop-blur-md flex items-center px-6 shrink-0 justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2 rounded-xl">
              <Menu size={20} />
            </Button>
            <h1 className="text-2xl font-black text-slate-900 capitalize hidden sm:block">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h1>
          </div>
          
          {["lessons", "words"].includes(activeTab) && (
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block w-72">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  type="search" 
                  placeholder={`Search database...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-50 border-slate-200 h-10 rounded-xl"
                />
              </div>
              <Button onClick={() => openModal(activeTab as "lesson" | "vocab")} className="h-10 rounded-xl font-bold shadow-md shadow-primary/20">
                <Plus className="mr-2 h-4 w-4" /> New Entry
              </Button>
            </div>
          )}
        </header>

        <ScrollArea className="flex-1 p-6 md:p-10 bg-slate-50/50">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Tab Navigation for Languages */}
            {["lessons", "words"].includes(activeTab) && availableLangs.length > 0 && (
              <Tabs value={activeLang} onValueChange={setActiveLang} className="w-full">
                <TabsList className="w-full justify-start h-auto p-1 bg-muted/50 overflow-x-auto flex-nowrap hide-scrollbar">
                  {availableLangs.map(lang => (
                    <TabsTrigger key={lang as string} value={lang as string} className="gap-2 px-6 py-2.5">
                      <Image src={getFlagEmoji(lang as string)} alt={lang as string} width={20} height={20} />
                      <span className="font-semibold">{String(lang).toUpperCase()}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}

            {/* Content Area */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="h-32 bg-muted/50 rounded-t-xl"></CardHeader>
                    <CardContent className="h-20"></CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {/* --- LESSONS VIEW (Using Accordion) --- */}
                {activeTab === "lessons" && (
                  <div className="space-y-6">
                        {Object.keys(lessonsByLevel).length === 0 ? (
                      <div className="text-center py-24 border border-dashed rounded-xl bg-muted/10">
                        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                        <h3 className="text-lg font-medium">No lessons found</h3>
                        <p className="text-muted-foreground text-sm mt-1">There are no lessons matching your criteria.</p>
                      </div>
                    ) : (
                      <Accordion defaultValue={Object.keys(lessonsByLevel)} className="w-full space-y-4">
                        {Object.keys(lessonsByLevel).sort().map(level => {
                          const levelLessons = lessonsByLevel[level];
                          return (
                            <AccordionItem value={level} key={level} className="border bg-card rounded-xl px-6 py-2 shadow-sm data-[state=open]:shadow-md transition-all">
                              <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-4 text-left">
                                  <div className="p-2.5 bg-primary/10 text-primary rounded-lg">
                                    <Folder size={20} />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold">Level {level}</h3>
                                    <p className="text-sm text-muted-foreground font-normal">{levelLessons.length} modules</p>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-4 pb-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                  {levelLessons.map((lesson: any) => (
                                    <Card key={lesson.lessonId} className="group hover:border-primary/50 transition-colors shadow-none hover:shadow-sm">
                                      <CardContent className="p-5 flex justify-between items-start gap-4">
                                        <div className="space-y-2">
                                          <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="font-mono text-[10px]">{lesson.lessonId.slice(-6)}</Badge>
                                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">{lesson.language}</Badge>
                                          </div>
                                          <h4 className="font-semibold line-clamp-1">{lesson.title}</h4>
                                          <p className="text-xs text-muted-foreground">{lesson.lessonData?.length || 0} interactive blocks</p>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); openModal("lesson", lesson); }}>
                                            <Edit2 size={14} />
                                          </Button>
                                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={(e) => { e.stopPropagation(); handleDelete("lesson", lesson.lessonId); }}>
                                            <Trash2 size={14} />
                                          </Button>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                      </Accordion>
                    )}
                  </div>
                )}

                {/* --- VOCABULARY VIEW --- */}
                {activeTab === "words" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVocab.length === 0 ? (
                      <div className="col-span-full text-center py-24 border border-dashed rounded-xl bg-muted/10">
                        <Type className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                        <h3 className="text-lg font-medium">No vocabulary found</h3>
                        <p className="text-muted-foreground text-sm mt-1">There are no topics matching your criteria.</p>
                      </div>
                    ) : (
                      filteredVocab.map((topic) => (
                        <Card key={topic.id} className="group hover:border-primary/50 transition-all flex flex-col shadow-sm hover:shadow-md">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg border">
                                {topic.emoji || "📝"}
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openModal("vocab", topic)}>
                                  <Edit2 size={14} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete("vocab", topic.id)}>
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </div>
                            <CardTitle className="text-xl mt-4">{topic.title || "Untitled Topic"}</CardTitle>
                            <CardDescription>{topic.words?.length || 0} vocabulary words</CardDescription>
                          </CardHeader>
                          <CardContent className="mt-auto pt-4">
                            <div className="flex flex-wrap gap-2">
                              {topic.words?.slice(0, 4).map((w: any, i: number) => (
                                <Badge key={i} variant="secondary" className="font-normal">{w.word}</Badge>
                              ))}
                              {(topic.words?.length || 0) > 4 && (
                                <Badge variant="outline" className="font-normal text-muted-foreground">
                                  +{(topic.words?.length || 0) - 4} more
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                )}
                
                {/* --- USERS VIEW --- */}
                {activeTab === "users" && (
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>Manage your {usersList.length} registered users.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-muted text-muted-foreground border-b">
                            <tr>
                              <th className="px-4 py-3 font-medium">User</th>
                              <th className="px-4 py-3 font-medium">Email</th>
                              <th className="px-4 py-3 font-medium">Registration Date</th>
                              <th className="px-4 py-3 font-medium text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {usersList.length === 0 ? (
                               <tr><td colSpan={4} className="text-center py-6 text-muted-foreground">No users found.</td></tr>
                            ) : usersList.map((u: any) => (
                              <tr key={u._id} className="border-b last:border-0 hover:bg-muted/30">
                                <td className="px-4 py-3 font-medium flex items-center gap-2">
                                  <UserCircle2 className="text-primary/50" />
                                  {u.displayName || 'Unknown'}
                                </td>
                                <td className="px-4 py-3">{u.email || 'N/A'}</td>
                                <td className="px-4 py-3 text-muted-foreground">{new Date(u.createdAt || Date.now()).toLocaleDateString()}</td>
                                <td className="px-4 py-3 text-right">
                                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete("user", u._id)}>
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* --- SCHEMAS VIEW --- */}
                {activeTab === "schemas" && (
                  <div className="space-y-8">
                     <Card className="border-0 shadow-lg rounded-[2rem] overflow-hidden">
                       <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
                         <CardTitle className="text-2xl flex items-center gap-3"><Database className="text-blue-400" size={28} /> Chapter Schema</CardTitle>
                         <CardDescription className="text-slate-300">The core structural unit representing a single course module.</CardDescription>
                       </CardHeader>
                       <CardContent className="p-0">
                         <table className="w-full text-sm text-left">
                           <thead className="bg-slate-50 text-slate-500 border-b">
                             <tr>
                               <th className="px-8 py-4 font-semibold uppercase tracking-wider">Field Name</th>
                               <th className="px-8 py-4 font-semibold uppercase tracking-wider">Data Type</th>
                               <th className="px-8 py-4 font-semibold uppercase tracking-wider">Description</th>
                             </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100">
                             <tr className="hover:bg-slate-50/50">
                               <td className="px-8 py-5 font-mono text-primary font-bold text-base">_id</td>
                               <td className="px-8 py-5"><Badge variant="outline" className="bg-slate-100">ObjectId</Badge></td>
                               <td className="px-8 py-5 text-slate-600">Auto-generated unique MongoDB identifier.</td>
                             </tr>
                             <tr className="hover:bg-slate-50/50">
                               <td className="px-8 py-5 font-mono text-primary font-bold text-base">title</td>
                               <td className="px-8 py-5"><Badge variant="outline" className="bg-slate-100">String</Badge></td>
                               <td className="px-8 py-5 text-slate-600">The human-readable name of the module (e.g. "Airport Basics").</td>
                             </tr>
                             <tr className="hover:bg-slate-50/50">
                               <td className="px-8 py-5 font-mono text-primary font-bold text-base">languageId</td>
                               <td className="px-8 py-5"><Badge variant="outline" className="bg-slate-100">String</Badge></td>
                               <td className="px-8 py-5 text-slate-600">ISO code identifying the language (e.g., 'en', 'es', 'uk').</td>
                             </tr>
                             <tr className="hover:bg-slate-50/50">
                               <td className="px-8 py-5 font-mono text-primary font-bold text-base">order</td>
                               <td className="px-8 py-5"><Badge variant="outline" className="bg-slate-100">Number</Badge></td>
                               <td className="px-8 py-5 text-slate-600">Sequential index to maintain the order in the UI timeline.</td>
                             </tr>
                           </tbody>
                         </table>
                       </CardContent>
                     </Card>

                     <Card className="border-0 shadow-lg rounded-[2rem] overflow-hidden">
                       <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
                         <CardTitle className="text-2xl flex items-center gap-3"><Code className="text-green-400" size={28} /> Topic Schema</CardTitle>
                         <CardDescription className="text-slate-300">Represents individual topics, questions, and content blocks inside a Chapter.</CardDescription>
                       </CardHeader>
                       <CardContent className="p-0">
                         <table className="w-full text-sm text-left">
                           <thead className="bg-slate-50 text-slate-500 border-b">
                             <tr>
                               <th className="px-8 py-4 font-semibold uppercase tracking-wider">Field Name</th>
                               <th className="px-8 py-4 font-semibold uppercase tracking-wider">Data Type</th>
                               <th className="px-8 py-4 font-semibold uppercase tracking-wider">Description</th>
                             </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100">
                             <tr className="hover:bg-slate-50/50">
                               <td className="px-8 py-5 font-mono text-green-600 font-bold text-base">chapterId</td>
                               <td className="px-8 py-5"><Badge variant="outline" className="bg-slate-100">ObjectId</Badge></td>
                               <td className="px-8 py-5 text-slate-600">Reference to the parent Chapter document.</td>
                             </tr>
                             <tr className="hover:bg-slate-50/50">
                               <td className="px-8 py-5 font-mono text-green-600 font-bold text-base">title</td>
                               <td className="px-8 py-5"><Badge variant="outline" className="bg-slate-100">String</Badge></td>
                               <td className="px-8 py-5 text-slate-600">Sub-topic name (e.g. "Ordering Coffee").</td>
                             </tr>
                             <tr className="hover:bg-slate-50/50">
                               <td className="px-8 py-5 font-mono text-green-600 font-bold text-base">questions</td>
                               <td className="px-8 py-5"><Badge variant="outline" className="bg-slate-100">Array</Badge></td>
                               <td className="px-8 py-5 text-slate-600">Array of interactive Question objects (audio, variants, correct answers).</td>
                             </tr>
                           </tbody>
                         </table>
                       </CardContent>
                     </Card>
                  </div>
                )}

                {/* --- SETTINGS VIEW --- */}
                {activeTab === "settings" && (
                  <Card className="max-w-2xl">
                    <CardHeader>
                      <CardTitle>Platform Settings</CardTitle>
                      <CardDescription>Configure global application settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Maintenance Mode</Label>
                          <p className="text-sm text-muted-foreground">Put the app in maintenance mode for all users.</p>
                        </div>
                        <Switch />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Public Registration</Label>
                          <p className="text-sm text-muted-foreground">Allow new users to sign up.</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Debug Logging</Label>
                          <p className="text-sm text-muted-foreground">Enable verbose logging in the backend.</p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/20 py-4">
                      <Button>Save Settings</Button>
                    </CardFooter>
                  </Card>
                )}
              </>
            )}

          </div>
        </ScrollArea>
      </main>

      {/* Dialog for Edit/Create */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-2xl flex items-center gap-3">
              <div className="p-2 bg-primary/10 text-primary rounded-md">
                {modalType === "lesson" ? <BookOpen size={20} /> : <Type size={20} />}
              </div>
              {editingId ? "Edit" : "New"} {modalType === "lesson" ? "Course Module" : "Vocabulary Topic"}
            </DialogTitle>
            <DialogDescription>
              Modify the properties and content blocks for this item.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="flex-1 p-6">
            {formData && (
              <div className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="title" className="text-sm font-semibold">Title</Label>
                  <Input 
                    id="title"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter title..."
                    className="bg-muted/30"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="language" className="text-sm font-semibold">Language Code</Label>
                  <Input 
                    id="language"
                    value={formData.language}
                    onChange={e => setFormData({...formData, language: e.target.value})}
                    placeholder="e.g. en, es, fr"
                    className="bg-muted/30 font-mono"
                  />
                  <p className="text-xs text-muted-foreground">The language this content applies to.</p>
                </div>

                {modalType === "lesson" && (
                  <div className="grid gap-3">
                    <Label htmlFor="level" className="text-sm font-semibold">Difficulty Level (e.g., [A1])</Label>
                    <Input 
                      id="level"
                      value={formData.level || ""}
                      onChange={e => setFormData({...formData, level: e.target.value})}
                      placeholder="A1, A2, B1..."
                      className="bg-muted/30"
                    />
                  </div>
                )}
                
                {/* --- REAL CONTENT BUILDER --- */}
                <div className="mt-8 space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b pb-2">Course Content</h3>
                  {modalType === "lesson" && formData.lessonData && formData.lessonData.length > 0 ? (
                    <Accordion className="w-full">
                      {formData.lessonData.map((topic: any, idx: number) => (
                        <AccordionItem key={idx} value={`topic-${idx}`} className="border bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
                          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-50">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">{idx + 1}</div>
                              <span className="font-semibold text-slate-900">{topic.title || 'Untitled Topic'}</span>
                              <Badge variant="secondary" className="ml-2 bg-slate-100">{topic.questions?.length || 0} questions</Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 py-4 bg-slate-50 border-t space-y-4">
                            {topic.questions && topic.questions.map((q: any, qIdx: number) => (
                               <Card key={qIdx} className="border-slate-200 shadow-none">
                                 <CardHeader className="py-3 px-4 bg-slate-100/50 border-b">
                                    <div className="flex justify-between items-center">
                                      <span className="font-semibold text-slate-700 text-sm">Q{qIdx + 1}: {q.title || 'Question'}</span>
                                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">{q.type || 'multiple-choice'}</Badge>
                                    </div>
                                 </CardHeader>
                                 <CardContent className="py-4 px-4 space-y-3">
                                    <div>
                                      <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Question Text</span>
                                      <p className="font-medium text-slate-900">{q.questionStr || q.text || 'No question text provided'}</p>
                                    </div>
                                    {q.variants && q.variants.length > 0 && (
                                      <div>
                                        <span className="text-xs text-slate-400 font-bold uppercase block mb-2">Answers</span>
                                        <div className="grid grid-cols-2 gap-2">
                                           {q.variants.map((v: string, vIdx: number) => (
                                             <div key={vIdx} className={`p-2 rounded-md text-sm border ${q.correctIndex === vIdx ? 'bg-green-50 border-green-200 text-green-700 font-bold' : 'bg-white text-slate-600'}`}>
                                               {v} {q.correctIndex === vIdx && '✓'}
                                             </div>
                                           ))}
                                        </div>
                                      </div>
                                    )}
                                 </CardContent>
                               </Card>
                            ))}
                            <Button variant="outline" className="w-full border-dashed" size="sm"><Plus className="w-4 h-4 mr-2" /> Add Question</Button>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                      <Button variant="outline" className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Topic</Button>
                    </Accordion>
                  ) : modalType === "vocab" && formData.words ? (
                     <div className="space-y-3">
                        {formData.words.map((w: any, idx: number) => (
                           <div key={idx} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-xl bg-white shadow-sm items-start sm:items-center">
                              <div className="flex-1">
                                 <span className="font-bold text-lg text-slate-900">{w.word}</span>
                                 <span className="ml-3 text-slate-500 font-mono text-sm">{w.transcription}</span>
                                 <p className="text-primary font-medium mt-1">{w.translation}</p>
                              </div>
                              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
                           </div>
                        ))}
                        <Button variant="outline" className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Word</Button>
                     </div>
                  ) : (
                    <div className="p-6 border border-dashed rounded-xl bg-slate-50 text-center">
                      <Flame className="mx-auto h-8 w-8 text-primary/40 mb-2" />
                      <p className="text-slate-600 font-medium">Content Builder</p>
                      <p className="text-slate-400 text-sm mt-1">Deep content editing (audio, questions) is synced automatically.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </ScrollArea>

          <DialogFooter className="p-6 border-t bg-muted/10 sm:justify-end gap-2">
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
