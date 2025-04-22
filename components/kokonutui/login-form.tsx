"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const { theme } = useTheme()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login/signup logic here
    console.log({ email, password, isSignUp })
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Image (desktop) */}
      <div className="hidden md:flex md:w-1/2 relative bg-zinc-100 dark:bg-[#1F1F23]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/30 dark:to-black/40 z-10" />
        <Image
          src="/placeholder.svg?height=1080&width=1080"
          alt="Login background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-8 left-8 z-20">
          <div className="flex items-center gap-3">
            <Image
              src="https://kokonutui.com/logo.svg"
              alt="KokonutUI"
              width={32}
              height={32}
              className="flex-shrink-0 hidden dark:block"
            />
            <Image
              src="https://kokonutui.com/logo-black.svg"
              alt="KokonutUI"
              width={32}
              height={32}
              className="flex-shrink-0 block dark:hidden"
            />
            <span className="text-lg font-semibold text-zinc-900 dark:text-white">KokonutUI</span>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 md:px-12 bg-white dark:bg-[#0F0F12]">
        {/* Mobile logo */}
        <div className="md:hidden flex items-center gap-3 mb-8">
          <Image
            src="https://kokonutui.com/logo.svg"
            alt="KokonutUI"
            width={32}
            height={32}
            className="flex-shrink-0 hidden dark:block"
          />
          <Image
            src="https://kokonutui.com/logo-black.svg"
            alt="KokonutUI"
            width={32}
            height={32}
            className="flex-shrink-0 block dark:hidden"
          />
          <span className="text-lg font-semibold text-zinc-900 dark:text-white">KokonutUI</span>
        </div>

        {/* Mobile image */}
        <div className="md:hidden relative w-full h-48 mb-8 rounded-xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Login background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {isSignUp ? "Sign up to start using our platform" : "Sign in to access your account and dashboard"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {!isSignUp && (
                    <Link
                      href="#"
                      className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder={isSignUp ? "Create a password" : "Enter your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                />
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                  />
                </div>
              )}
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full",
                "bg-zinc-900 dark:bg-zinc-50",
                "text-zinc-50 dark:text-zinc-900",
                "hover:bg-zinc-800 dark:hover:bg-zinc-200",
                "shadow-sm hover:shadow",
                "transition-all duration-200",
              )}
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white dark:bg-[#0F0F12] px-2 text-zinc-500 dark:text-zinc-400">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/70"
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Google
            </Button>
          </form>

          <div className="text-center text-sm">
            <p className="text-zinc-600 dark:text-zinc-400">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-1 font-medium text-zinc-900 dark:text-white hover:underline"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

