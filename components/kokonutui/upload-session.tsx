"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import FileUpload from "./file-upload"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function UploadSession({ buttonClassName }: { buttonClassName?: string }) {
  const [sessionName, setSessionName] = useState("")
  const [intent, setIntent] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleUploadComplete = (uploadedFile: File) => {
    setFile(uploadedFile)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process the upload
    console.log({ sessionName, intent, file })
    // Close dialog after submission
    setIsDialogOpen(false)
    // Reset form
    setSessionName("")
    setIntent("")
    setFile(null)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className={`gap-2 ${buttonClassName || ""}`}>
          <Upload className="w-4 h-4" />
          Upload Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Session Recording</DialogTitle>
          <DialogDescription>Upload a remote desktop session recording for compliance analysis</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session-name">Session Name</Label>
              <Input
                id="session-name"
                placeholder="Enter a descriptive name for this session"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="intent">Declared Intent</Label>
              <Textarea
                id="intent"
                placeholder="Describe the purpose of this remote session"
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                required
                className="min-h-[100px]"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Clearly state the intended activities for this session. This will be used to evaluate compliance.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Session Recording</Label>
              <FileUpload
                onUploadComplete={handleUploadComplete}
                acceptedTypes="video/mp4,video/webm,video/quicktime,image/png,image/jpeg"
                maxSizeMB={500}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!sessionName || !intent || !file}
              className="dark:bg-[#1F1F23] dark:text-white dark:hover:bg-[#2B2B30] dark:border-[#2B2B30]"
            >
              Submit for Analysis
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

