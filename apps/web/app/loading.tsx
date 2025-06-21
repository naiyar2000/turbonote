'use client';

import { Loader2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoadingPage({ title }: { title?: string }) {
    return (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/10 animate-pulse z-0">
            <div
                className={cn(
                    'flex flex-col items-center justify-center h-screen w-full m-auto',
                    'bg-background text-foreground transition-colors'
                )}
            >
                <Loader2Icon className="h-10 w-10 animate-spin text-primary" />
                <p className="mt-4 text-lg text-muted-foreground">{title ?? "Loading your workspace..."}</p>
            </div>
        </div >
    );
}
