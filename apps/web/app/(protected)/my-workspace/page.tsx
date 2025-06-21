"use client";
import LoadingPage from '@/app/loading';
import { useRootStore } from '@/app/store/rootStore';
import { MY_WORKSPACE } from '@/lib/routeConstants';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const MyWorkspacePage = () => {
    const router = useRouter();

    const params = useParams()
    const id = params.id as string

    const { notes, loading } = useRootStore();

    useEffect(() => {
        if (!loading) {
            let uuid = uuidv4();
            router.replace(`/${MY_WORKSPACE}/${notes?.[0]?.id || uuid}`);
        }
    }, [notes])

    return (
        <LoadingPage title='Loading Workspace...' />
    )
}

export default MyWorkspacePage