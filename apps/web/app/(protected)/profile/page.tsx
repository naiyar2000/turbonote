"use client";
import Editor from '@/app/component/Editor'

const ProfilePage = () => {
  return (
    <div className="h-screen flex-1 flex flex-col p-4"> {/* Adjust height if needed */}
      <div className="flex-1 border border-border rounded-md overflow-y-auto py-6">
        <Editor />
      </div>
    </div>
  )
}

export default ProfilePage
