"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter, DialogClose } from "@/components/ui/dialog"
import FileUpload from "../file-upload"

interface UploadSessionFormProps {
  onClose: () => void
}

export default function UploadSessionForm({ onClose }: UploadSessionFormProps) {
  const [formData, setFormData] = useState({
    user: "",
    organization: "",
    title: "",
    goals: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUploadComplete = (uploadedFile: File) => {
    setFile(uploadedFile)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", { ...formData, file })
      setIsSubmitting(false)
      onClose()
    }, 1500)
  }

  const isFormValid = formData.user && formData.organization && formData.title && formData.goals && file

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="user">User/Admin Name</Label>
            <Input
              id="user"
              name="user"
              placeholder="Enter the user's name"
              value={formData.user}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Organization</Label>
            <Input
              id="organization"
              name="organization"
              placeholder="Enter the organization name"
              value={formData.organization}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Session Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter a descriptive title for this session"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="goals">Declared Goals</Label>
          <Textarea
            id="goals"
            name="goals"
            placeholder="Describe the intended activities for this session"
            value={formData.goals}
            onChange={handleChange}
            required
            className="min-h-[100px]"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Clearly state the intended goals and activities for this session. This will be used to evaluate compliance.
          </p>
        </div>

        <div className="space-y-2">
          <Label>Session Recording</Label>
          <FileUpload
            onUploadComplete={handleUploadComplete}
            acceptedTypes="video/mp4,video/webm,video/quicktime"
            maxSizeMB={500}
          />
        </div>
      </div>

      <DialogFooter className="gap-2 sm:gap-0">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="dark:bg-[#1F1F23] dark:text-white dark:hover:bg-[#2B2B30] dark:border-[#2B2B30]"
        >
          {isSubmitting ? "Uploading..." : "Upload & Analyze"}
        </Button>
      </DialogFooter>
    </form>
  )
}

