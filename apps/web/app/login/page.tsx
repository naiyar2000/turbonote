'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '../api'
import { auth, provider } from '@/firebase'
import { useAuth } from '@/hooks/useAuth'
import { signInWithPopup } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FcGoogle } from "react-icons/fc"
import { MY_WORKSPACE } from '@/lib/routeConstants'


export default function LoginPage() {
    const router = useRouter()
    const { isAuthenticated } = useAuth()
    const [loading, setLoading] = useState(isAuthenticated ? true : false);


    const handleLogin = async () => {
        try {
            setLoading(true)
            // Sign in with Firebase
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            const token = await user.getIdToken()
            localStorage.setItem('token', token)
            // Call backend auth route
            const res = await api.post('/api/auth/login', {
                idToken: token,
            })

            if (res.status === 200) {
                console.log('Login successful:', res.data)
                router.push(`/${MY_WORKSPACE}`)
                setLoading(false)
            } else {
                setLoading(false)
                console.error('Login failed:', res.data)
            }
        } catch (error) {
            setLoading(false)
            console.error('Firebase login error:', error)
        }
    }

    useEffect(() => {
        // auto redirect if already logged in
        auth.onAuthStateChanged(async (_user) => {
            if (_user) {
                const token = await _user.getIdToken()
                localStorage && localStorage.setItem('token', token)
                await api.post('/api/auth/login', { idToken: token })
                router.push(`/${MY_WORKSPACE}`)
            }
        })
    }, [])

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;


    return (
        <main
            className={cn(
                "flex items-center justify-center min-h-screen w-full bg-background text-foreground transition-colors px-4"
            )}
        >
            <div className="max-w-md w-full flex flex-col items-center gap-8 text-center">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Welcome to NotionLite</h1>
                    <p className="text-muted-foreground">
                        {"Think it. Write it. Keep it. — Powered by BlockBase."}
                    </p>
                </div>

                <Button
                    onClick={handleLogin}
                    className="gap-2 w-full max-w-sm py-6 text-base"
                    variant="outline"
                >
                    <FcGoogle className="h-6 w-6" />
                    Sign in with Google
                </Button>

                <p className="text-xs text-muted-foreground">
                    By signing in, you agree to our <a className="underline" href="#">terms</a>.
                </p>
            </div>
        </main>
    )

}

