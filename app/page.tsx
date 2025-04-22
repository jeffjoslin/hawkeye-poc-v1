import { redirect } from "next/navigation"

export default function Home() {
  // Changed to redirect to login instead of dashboard
  redirect("/dashboard")
}

