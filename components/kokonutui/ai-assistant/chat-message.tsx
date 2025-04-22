import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface ChatMessageProps {
  message: {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: string
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex gap-4", isUser ? "flex-row" : "flex-row")}>
      <div className="flex-shrink-0 mt-0.5">
        <Avatar
          className={cn(
            "h-8 w-8 rounded-md",
            isUser ? "bg-blue-100 dark:bg-blue-900" : "bg-emerald-100 dark:bg-emerald-900",
          )}
        >
          <div className="flex items-center justify-center h-full">
            {isUser ? (
              <User className="h-4 w-4 text-blue-700 dark:text-blue-300" />
            ) : (
              <Bot className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
            )}
          </div>
        </Avatar>
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">{isUser ? "You" : "AI Assistant"}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{message.timestamp}</span>
        </div>

        <div
          className={cn(
            "prose prose-sm dark:prose-invert max-w-none",
            "prose-p:leading-relaxed prose-pre:p-0",
            "prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:bg-gray-100 prose-code:dark:bg-gray-800",
            "prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline",
          )}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

