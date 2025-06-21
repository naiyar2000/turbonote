"use client";
import Editor from '@/app/component/Editor'
import { createNote } from '@/lib/api/notes'

const ProfilePage = () => {
  return (
    <div className="h-screen flex-1 flex flex-col p-4"> {/* Adjust height if needed */}
      <div className="flex-1 border border-border rounded-md overflow-y-auto py-6">
        <Editor onSave={(content) => createNote({
          title: "New Note",
          content: content,
          authorId: "cmbxr63s40000i6qcn0uqt7pa"
        })} />
      </div>
    </div>
  )
}

export default ProfilePage
