"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Bell, Menu } from "lucide-react"
import Profile01 from "./profile-01"
import { ThemeToggle } from "../theme-toggle"
import { usePathname } from "next/navigation"

interface TopNavProps {
  toggleSidebar: () => void
}

export default function TopNav({ toggleSidebar }: TopNavProps) {
  const pathname = usePathname()

  // Map of path segments to their properly cased display names
  const pathDisplayNames: Record<string, string> = {
    dashboard: "Dashboard",
    "remote-sessions": "Remote Sessions",
    "reports-analytics": "Reports & Analytics",
    "ai-assistant": "AI Assistant",
    login: "Login",
  }

  return (
    <div className="px-3 sm:px-6 flex items-center justify-between bg-gray-50 dark:bg-[#1A1A1E] border-b border-gray-200 dark:border-[#1F1F23] h-full">
      <div className="font-medium text-sm flex items-center space-x-4 truncate">
        {/* Hamburger menu button */}
        <button
          onClick={toggleSidebar}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-md transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Removed FileText icon */}

        {/* Removed divider, kept page title */}
        <span className="text-gray-900 dark:text-white font-semibold">
          {pathDisplayNames[pathname.split("/").filter((segment) => segment)[0]] || "Dashboard"}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <button
          type="button"
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
        </button>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 overflow-hidden rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30]">
              <Image
                src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
                alt="User avatar"
                width={36}
                height={36}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
          >
            <Profile01 avatar="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png" />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
