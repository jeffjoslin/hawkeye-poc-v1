"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const [theme, setTheme] = React.useState("dark")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    // Also update the document class for immediate visual feedback
    if (theme === "light") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
    >
      <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-all dark:hidden" />
      <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-all hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

export default ThemeToggle
