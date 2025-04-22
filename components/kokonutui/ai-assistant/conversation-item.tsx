"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MessageSquare, MoreHorizontal, Edit2, Trash2, Folder } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ConversationItemProps {
  conversation: {
    id: string
    title: string
    projectId: string | null
    timestamp: string
    preview: string
  }
  isActive: boolean
  onClick: () => void
}

export default function ConversationItem({ conversation, isActive, onClick }: ConversationItemProps) {
  return (
    <div className="flex items-center group">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 h-auto py-2 px-3 text-left",
          isActive ? "bg-gray-100 dark:bg-[#1F1F23] text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300",
        )}
        onClick={onClick}
      >
        <MessageSquare className="h-4 w-4 flex-shrink-0" />
        <div className="flex-1 truncate">
          <span className="block truncate">{conversation.title}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{conversation.timestamp}</span>
        </div>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 focus:opacity-100">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Edit2 className="mr-2 h-4 w-4" />
            <span>Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Folder className="mr-2 h-4 w-4" />
            <span>Move to Project</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600 dark:text-red-400">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

