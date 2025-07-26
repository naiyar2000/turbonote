'use client';

import { cn } from '@/lib/utils';

export default function AboutPage() {
  return (
    <div className={cn('px-4 sm:px-6 py-10 sm:py-8 w-full max-w-3xl mx-auto')}>
      <h1 className="text-2xl sm:text-4xl font-bold mb-4">About This App</h1>

      <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base">
        Welcome! This app is a modern, Notion-inspired note-taking platform created by <strong>Naiyar</strong>. It’s designed to help you organize your thoughts, ideas, and projects in a simple, beautiful, and efficient way.
      </p>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">✨ What You Can Do</h2>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm sm:text-base">
        <li>Create and organize notes in folders, just like you would in Notion</li>
        <li>Edit your notes with a clean and easy-to-use editor</li>
        <li>Keep your notes safe and private with secure sign-in</li>
        <li>Switch between light and dark themes to match your mood</li>
        <li>Enjoy a smooth, fast, and responsive experience on any device</li>
      </ul>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">🌟 Why You'll Love It</h2>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm sm:text-base">
        <li>Simple and intuitive design that gets out of your way</li>
        <li>Organize everything from quick notes to big projects</li>
        <li>Stay focused with distraction-free writing</li>
        <li>Access your notes anywhere, anytime</li>
      </ul>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">🚀 What's Next</h2>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm sm:text-base">
        <li>Work together with friends and teammates in real time</li>
        <li>Find your notes quickly with powerful search and tags</li>
        <li>Share notes and control who can view or edit them</li>
        <li>Use the app even when you’re offline</li>
      </ul>

      <p className="mt-8 text-muted-foreground italic text-sm sm:text-base">
        Built with care to help you capture ideas and stay organized. Happy note-taking! 📝
      </p>
      </div>
  );
}