"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, FileVideo, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface FileUploadProps {
  onUploadComplete?: (file: File) => void
  acceptedTypes?: string
  maxSizeMB?: number
  className?: string
}

export default function FileUpload({
  onUploadComplete,
  acceptedTypes = "video/mp4,video/webm,video/quicktime",
  maxSizeMB = 500,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const maxSizeBytes = maxSizeMB * 1024 * 1024

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const validateFile = (file: File): boolean => {
    // Reset previous errors
    setError(null)

    // Check file type
    const fileType = file.type
    if (!acceptedTypes.includes(fileType)) {
      setError(`Invalid file type. Please upload ${acceptedTypes.split(",").join(" or ")}`)
      return false
    }

    // Check file size
    if (file.size > maxSizeBytes) {
      setError(`File is too large. Maximum size is ${maxSizeMB}MB`)
      return false
    }

    return true
  }

  const processFile = (file: File) => {
    if (!validateFile(file)) return

    setFile(file)
    setIsUploading(true)
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setIsComplete(true)
          if (onUploadComplete) onUploadComplete(file)
          return 100
        }
        return prevProgress + 5
      })
    }, 100)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      processFile(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      processFile(selectedFile)
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleCancel = () => {
    setFile(null)
    setProgress(0)
    setIsUploading(false)
    setIsComplete(false)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!file && (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            "hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50",
            isDragging ? "border-primary bg-gray-50 dark:bg-[#1F1F23]/50" : "border-gray-300 dark:border-gray-700",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleButtonClick}
          tabIndex={0}
          role="button"
          aria-label="Upload file"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={acceptedTypes}
            className="hidden"
            data-testid="file-input"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="p-3 bg-gray-100 dark:bg-[#1F1F23] rounded-full">
              <Upload className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Drag and drop your session recording</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                or <span className="text-primary font-medium">browse files</span>
              </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Supported formats: MP4, WebM, QuickTime (max {maxSizeMB}MB)
            </p>
          </div>
        </div>
      )}

      {file && (
        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-[#1F1F23]/50">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 dark:bg-[#1F1F23] rounded-md">
                <FileVideo className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-xs text-foreground">{file.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCancel} disabled={isUploading} className="h-8 w-8">
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </Button>
          </div>

          {isUploading && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-foreground">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}

          {isComplete && (
            <div className="mt-4 flex items-center text-sm text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="h-4 w-4 mr-1.5" />
              Upload complete
            </div>
          )}
        </div>
      )}
    </div>
  )
}
