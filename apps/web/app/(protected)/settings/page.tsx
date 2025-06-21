'use client'

import { useEffect, useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from '@/components/theme-provider'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { firebaseSignOut } from '@/firebase'
import { useRootStore } from '@/app/store/rootStore'

const SettingsPage = () => {
  const { user } = useRootStore()
  const { theme, toggleTheme } = useTheme()

  const [aiEnabled, setAIEnabled] = useState(false)
  const [collabEnabled, setCollabEnabled] = useState(false)

  useEffect(() => {
    setAIEnabled(true)
    setCollabEnabled(false)
  }, [])

  const handleSave = () => {
    toast.success("Settings saved successfully")
  }

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 sm:py-6 py-10 w-full max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
          </div>
          <Button variant="destructive" onClick={firebaseSignOut}>Sign out</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <span className="text-sm font-medium">Dark Mode</span>
          <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Enable AI Suggestions</span>
            <Switch checked={aiEnabled} onCheckedChange={setAIEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Enable Collaborative Editing</span>
            <Switch checked={collabEnabled} onCheckedChange={setCollabEnabled} />
          </div>
          <Button className="w-full sm:w-auto" onClick={handleSave}>Save Preferences</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="w-full">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsPage
