'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useFirebaseAuthTokenSync } from '@/hooks/useFirebaseAuthToken';
import LoadingPage from '../loading';
import { SidebarWrapper } from '../component/SidebarWrapper';
import { LOGIN } from '@/lib/routeConstants';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();
    useFirebaseAuthTokenSync();


    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace(`/${LOGIN}`);
        }
    }, [loading, isAuthenticated, router]);

    if (loading) return <LoadingPage title='Checking Permissions...'/>;
    if (!isAuthenticated) return <LoadingPage title={"Checking Permissions..."} />;


    return (
        <div className='flex bg-secondary'>
            <SidebarWrapper />
            <div className="h-screen w-screen flex-1 flex flex-col p-4">
                {children}
            </div>
        </div>
    );
}
