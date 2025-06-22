'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Sparkles, LayoutDashboard, Lock } from "lucide-react"
import LoadingPage from './loading';
import { LOGIN, MY_WORKSPACE } from '@/lib/routeConstants';

export default function ProtectedPage() {
  const router = useRouter();
  const { isAuthenticated, loading, token } = useAuth();

  useEffect(() => {
    console.log("loading:", loading);
    console.log("isAuthenticated:", isAuthenticated);
    console.log("token:", token);
  }, [loading, isAuthenticated, router]);

  if (loading) return <LoadingPage />;
  if (!loading && isAuthenticated) {
    router.replace(`/${MY_WORKSPACE}/`);
  }
  if (!isAuthenticated) return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex justify-between items-center border-b border-border">
        <h1 className="text-2xl font-bold tracking-tight">NotionLite</h1>
        <Button onClick={() => router.push(`/${LOGIN}`)}>Login</Button>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight max-w-2xl">
          Organize your thoughts. <br /> Write the way you think.
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mb-6">
          A powerful and minimalist editor inspired by Notion. Markdown, real-time collaboration, and offline access — all in one.
        </p>
        <Button size="lg" className="text-lg px-6" onClick={() => router.push(`/${LOGIN}`)}>
          Get Started
        </Button>
      </main>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/10 w-full">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <Feature icon={<Sparkles />} title="Simple & Elegant" description="Minimalist interface that stays out of your way." />
          <Feature icon={<LayoutDashboard />} title="Organize Easily" description="Folders, tags, and search to keep your notes sorted." />
          <Feature icon={<Lock />} title="Private & Secure" description="Your notes are encrypted and only visible to you." />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-sm text-muted-foreground py-4 text-center">
        © 2025 NotionLite. All rights reserved.
      </footer>
    </div>
  )
  return null;

}

function Feature({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-primary text-primary-foreground rounded-full p-3">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

