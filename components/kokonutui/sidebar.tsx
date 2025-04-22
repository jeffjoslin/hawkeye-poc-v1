"use client"

import type React from "react"

import {
  BarChart2,
  Menu,
  Monitor,
  Eye,
  Brain,
  Settings,
  Bell,
  Users,
  Trash,
  FileSearch,
  Webhook,
  Key,
  ChevronLeft,
} from "lucide-react"

import { Home } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const pathname = usePathname()

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function toggleSettings() {
    setShowSettings(!showSettings)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
    onClick,
  }: {
    href?: string
    icon: any
    children: React.ReactNode
    onClick?: () => void
  }) {
    const isActive = href ? pathname === href : false

    const content = (
      <div
        className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
          isActive
            ? "bg-gray-100 dark:bg-[#1F1F23] text-gray-900 dark:text-white"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
        }`}
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </div>
    )

    if (onClick) {
      return (
        <button onClick={onClick} className="w-full text-left">
          {content}
        </button>
      )
    }

    return (
      <Link href={href || "#"} onClick={handleNavigation} className="block">
        {content}
      </Link>
    )
  }

  function SettingsItem({ icon: Icon, children }: { icon: any; children: React.ReactNode }) {
    return (
      <div className="flex items-center px-3 py-2 text-sm rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors">
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </div>
    )
  }

  function SettingsCategory({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div className="mb-4">
        <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {title}
        </div>
        <div className="space-y-1">{children}</div>
      </div>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
              fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
              lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
              ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 px-6 flex items-center justify-between border-b border-gray-200 dark:border-[#1F1F23]">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-500 dark:bg-amber-600 rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Hawkeye</span>
            </div>
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1F1F23] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {!showSettings ? (
            <>
              <div className="flex-1 overflow-y-auto py-4 px-4">
                <div className="space-y-6">
                  <div>
                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Overview
                    </div>
                    <div className="space-y-1">
                      <NavItem href="/dashboard" icon={Home}>
                        Dashboard
                      </NavItem>
                      <NavItem href="/remote-sessions" icon={Monitor}>
                        Remote Sessions
                      </NavItem>
                      <NavItem href="/reports-analytics" icon={BarChart2}>
                        Reports & Analytics
                      </NavItem>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
                <div className="space-y-1">
                  <NavItem icon={Settings} onClick={toggleSettings}>
                    System Settings
                  </NavItem>
                  <NavItem href="/ai-assistant" icon={Brain}>
                    AI Assistant
                  </NavItem>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto py-4 px-4">
              <div className="mb-4">
                <NavItem icon={ChevronLeft} onClick={toggleSettings}>
                  Back to Main Menu
                </NavItem>
              </div>

              <SettingsCategory title="AI & Analysis Configuration">
                <SettingsItem icon={Brain}>Connect or switch AI provider</SettingsItem>
              </SettingsCategory>

              <SettingsCategory title="Notifications & Alerts">
                <SettingsItem icon={Bell}>Enable email alerts</SettingsItem>
                <SettingsItem icon={Bell}>Set notification frequency</SettingsItem>
              </SettingsCategory>

              <SettingsCategory title="Permissions & Access Control">
                <SettingsItem icon={Users}>Manage user roles</SettingsItem>
                <SettingsItem icon={Trash}>Define access permissions</SettingsItem>
                <SettingsItem icon={FileSearch}>Audit log access control</SettingsItem>
              </SettingsCategory>

              <SettingsCategory title="System Integration">
                <SettingsItem icon={Key}>API Key management</SettingsItem>
                <SettingsItem icon={Webhook}>Webhook setup</SettingsItem>
              </SettingsCategory>
            </div>
          )}
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

