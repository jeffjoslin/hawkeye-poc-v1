"use client"

import type { ReactNode } from "react"
import Sidebar from "./sidebar"
import TopNav from "./top-nav"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    setMounted(true)

    // Set initial state based on screen size
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex h-screen bg-white dark:bg-[#0F0F12]">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area - removed the margin that was causing the gap */}
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23] sticky top-0 z-10 bg-white dark:bg-[#0F0F12]">
          <TopNav toggleSidebar={toggleSidebar} />
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
