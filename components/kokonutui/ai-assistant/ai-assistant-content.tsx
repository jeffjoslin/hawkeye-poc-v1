"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Menu } from "lucide-react"
import ChatMessage from "./chat-message"
import ProjectItem from "./project-item"
import ConversationItem from "./conversation-item"

// Sample data for projects and conversations
const initialProjects = [
  { id: "p-1", name: "Compliance Analysis", conversations: 3 },
  { id: "p-2", name: "Policy Updates", conversations: 1 },
]

const initialConversations = [
  {
    id: "c-1",
    title: "Initial Session Analysis",
    projectId: "p-1",
    timestamp: "Today, 10:30 AM",
    preview: "Summarize the key compliance issues...",
  },
  {
    id: "c-2",
    title: "Follow-up Questions",
    projectId: "p-1",
    timestamp: "Yesterday, 2:15 PM",
    preview: "What are the potential risks...",
  },
  {
    id: "c-3",
    title: "New Conversation",
    projectId: null,
    timestamp: "March 20, 2025",
    preview: "This is a new conversation...",
  },
]

const initialMessages = [
  {
    id: "m-1",
    role: "assistant",
    content: "Hello! How can I help you analyze compliance today?",
    timestamp: "Today, 10:30 AM",
  },
]

export default function AIAssistantContent() {
  const [projects, setProjects] = useState(initialProjects)
  const [conversations, setConversations] = useState(initialConversations)
  const [messages, setMessages] = useState(initialMessages)
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [sidebarVisible, setSidebarVisible] = useState(true)

  const handleProjectClick = (projectId: string) => {
    setActiveProject(projectId)
    setActiveConversation(null)
  }

  const handleConversationClick = (conversationId: string) => {
    setActiveConversation(conversationId)
  }

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const now = new Date()
      const timestamp = `${now.toLocaleDateString()}, ${now.toLocaleTimeString()}`
      const newMsg = {
        id: `m-${messages.length + 1}`,
        role: "user",
        content: newMessage,
        timestamp: timestamp,
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header with menu toggle */}
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => setSidebarVisible(!sidebarVisible)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarVisible && (
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>Organize your conversations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {projects.map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    isActive={activeProject === project.id}
                    onClick={() => handleProjectClick(project.id)}
                  />
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
                <CardDescription>Recent and ongoing discussions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {conversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={activeConversation === conversation.id}
                    onClick={() => handleConversationClick(conversation.id)}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Chat Interface */}
        <div className={`${sidebarVisible ? "lg:col-span-3" : "lg:col-span-4"} flex flex-col h-full`}>
          <Card className="flex-1 overflow-hidden flex flex-col">
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Get insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 overflow-y-auto flex-1">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </CardContent>
          </Card>

          <div className="flex items-center gap-3 mt-4">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
            />
            <Button onClick={handleSendMessage}>
              Send
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
