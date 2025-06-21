'use client';

import { cn } from '@/lib/utils';

export default function AboutPage() {
  return (
    <div className={cn('px-4 sm:px-6 py-10 sm:py-8 w-full max-w-3xl mx-auto')}>
      <h1 className="text-2xl sm:text-4xl font-bold mb-4">About This App</h1>

      <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base">
        This application is a modern, Notion-inspired note-taking platform designed and developed by <strong>Naiyar</strong>. It provides a rich editing experience, structured content management, and a developer-friendly architecture.
      </p>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">🔧 Tech Stack</h2>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm sm:text-base">
        <li><strong>Frontend:</strong> Next.js 14 with App Router, React, TailwindCSS, ShadCN UI</li>
        <li><strong>Editor:</strong> <code>@blocknote/mantine</code> for a clean, WYSIWYG editing experience</li>
        <li><strong>Auth:</strong> Firebase Authentication (with token-based auth)</li>
        <li><strong>Backend:</strong> Node.js + Express with Firebase Admin SDK for token validation</li>
        <li><strong>Database:</strong> PostgreSQL via Prisma ORM</li>
        <li><strong>File Storage:</strong> AWS S3 (planned/integrated)</li>
      </ul>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">🧠 Features</h2>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm sm:text-base">
        <li>Nested folder & file structure like Notion</li>
        <li>Real-time rich text editing with BlockNote</li>
        <li>Authentication-protected routes with token middleware</li>
        <li>Theme toggle support (light/dark) across the app</li>
        <li>API integration-ready via wrapper-based axios setup</li>
        <li>Shimmer loading states & animated interactions</li>
      </ul>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">📦 Roadmap</h2>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm sm:text-base">
        <li>Collaborative editing with WebSocket integration</li>
        <li>Search, tag, and archive system for notes</li>
        <li>Role-based access and sharing</li>
        <li>Offline support & progressive enhancement</li>
      </ul>

      <p className="mt-8 text-muted-foreground italic text-sm sm:text-base">
        Built with passion, minimalism, and a desire to learn deeply. 💻
      </p>
    </div>
  );
}
