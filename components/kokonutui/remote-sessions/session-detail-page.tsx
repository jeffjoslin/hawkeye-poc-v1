"use client"

import { useState, useEffect } from "react"
import Layout from "../layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipForward,
  SkipBack,
  ArrowLeft,
  Download,
  Flag,
} from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

// Sample data for the sessions (in a real app, this would come from an API)
const sampleSessions = [
  {
    id: "RS-1001",
    user: "John Smith",
    organization: "Acme Financial",
    date: "2025-03-27T10:30:00",
    duration: "45m",
    status: "green",
    title: "Quarterly Report Review",
    goals: "Review Q1 financial reports and prepare summary for board meeting",
    summary:
      "User accessed financial reporting system, reviewed Q1 reports, and created presentation slides for board meeting. All actions aligned with declared goals.",
    keyMoments: [
      { timestamp: "00:03:15", description: "Accessed financial reporting dashboard" },
      { timestamp: "00:12:45", description: "Downloaded Q1 summary reports" },
      { timestamp: "00:25:30", description: "Created presentation slides with key metrics" },
    ],
    videoUrl: "#",
    activityLog: [
      { timestamp: "00:01:05", action: "Logged into system", details: "User authenticated with SSO" },
      { timestamp: "00:02:30", action: "Opened financial dashboard", details: "Accessed Q1 financial dashboard" },
      { timestamp: "00:05:45", action: "Viewed revenue reports", details: "Examined Q1 revenue by department" },
      { timestamp: "00:10:20", action: "Viewed expense reports", details: "Examined Q1 expenses by category" },
      { timestamp: "00:15:10", action: "Downloaded PDF report", details: "Downloaded 'Q1-Financial-Summary.pdf'" },
      { timestamp: "00:18:35", action: "Opened presentation software", details: "Launched PowerPoint" },
      { timestamp: "00:22:15", action: "Created new slides", details: "Created slides with financial data" },
      { timestamp: "00:30:40", action: "Saved presentation", details: "Saved as 'Q1-Board-Presentation.pptx'" },
      { timestamp: "00:35:25", action: "Sent email", details: "Emailed presentation to finance team" },
      { timestamp: "00:42:10", action: "Logged out", details: "Session ended normally" },
    ],
    complianceDetails: {
      riskScore: 12,
      maxRiskScore: 100,
      policyViolations: 0,
      unusualActivities: 0,
      dataAccessed: [
        { category: "Financial Reports", sensitivity: "Medium", authorized: true },
        { category: "Presentation Templates", sensitivity: "Low", authorized: true },
      ],
    },
  },
  {
    id: "RS-1002",
    user: "Sarah Johnson",
    organization: "HealthPlus Inc",
    date: "2025-03-26T14:15:00",
    duration: "32m",
    status: "yellow",
    title: "Patient Record Updates",
    goals: "Update patient insurance information",
    summary:
      "User updated patient insurance records as intended but also accessed patient medical history which was outside the declared scope.",
    keyMoments: [
      { timestamp: "00:05:20", description: "Updated insurance information for 12 patients" },
      { timestamp: "00:18:45", description: "Accessed medical history records (outside declared scope)" },
      { timestamp: "00:24:10", description: "Exported patient list to Excel" },
    ],
    videoUrl: "#",
    activityLog: [
      { timestamp: "00:01:15", action: "Logged into system", details: "User authenticated with credentials" },
      { timestamp: "00:03:20", action: "Opened patient database", details: "Accessed patient management system" },
      {
        timestamp: "00:06:45",
        action: "Updated patient records",
        details: "Updated insurance info for Patient #12458",
      },
      {
        timestamp: "00:09:30",
        action: "Updated patient records",
        details: "Updated insurance info for Patient #15632",
      },
      {
        timestamp: "00:12:15",
        action: "Updated patient records",
        details: "Updated insurance info for 10 more patients",
      },
      {
        timestamp: "00:18:45",
        action: "Accessed medical records",
        details: "Viewed medical history for Patient #12458",
      },
      {
        timestamp: "00:20:10",
        action: "Accessed medical records",
        details: "Viewed medical history for Patient #15632",
      },
      { timestamp: "00:24:10", action: "Exported data", details: "Exported patient list to 'Patients-March.xlsx'" },
      { timestamp: "00:30:05", action: "Logged out", details: "Session ended normally" },
    ],
    complianceDetails: {
      riskScore: 45,
      maxRiskScore: 100,
      policyViolations: 1,
      unusualActivities: 1,
      dataAccessed: [
        { category: "Patient Insurance Records", sensitivity: "Medium", authorized: true },
        { category: "Patient Medical History", sensitivity: "High", authorized: false },
        { category: "Patient Contact Information", sensitivity: "Medium", authorized: true },
      ],
    },
  },
  {
    id: "RS-1003",
    user: "Michael Chen",
    organization: "TechSolutions LLC",
    date: "2025-03-26T09:45:00",
    duration: "58m",
    status: "red",
    title: "System Maintenance",
    goals: "Perform routine server maintenance and updates",
    summary:
      "User declared intent to perform system maintenance but primarily accessed customer database and exported sensitive data to external drive.",
    keyMoments: [
      { timestamp: "00:08:30", description: "Briefly checked server status" },
      { timestamp: "00:12:15", description: "Accessed customer database (outside declared scope)" },
      { timestamp: "00:35:40", description: "Exported customer data to external location" },
    ],
    videoUrl: "#",
    activityLog: [
      { timestamp: "00:01:30", action: "Logged into system", details: "User authenticated with admin credentials" },
      { timestamp: "00:04:15", action: "Accessed server dashboard", details: "Viewed server status overview" },
      { timestamp: "00:08:30", action: "Checked system logs", details: "Viewed server error logs briefly" },
      { timestamp: "00:12:15", action: "Accessed customer database", details: "Opened customer management system" },
      { timestamp: "00:15:40", action: "Ran database query", details: "Queried all premium customers" },
      { timestamp: "00:20:25", action: "Ran database query", details: "Queried all customers with payment info" },
      { timestamp: "00:25:10", action: "Accessed financial records", details: "Viewed customer payment history" },
      { timestamp: "00:30:35", action: "Connected external device", details: "USB storage device connected" },
      { timestamp: "00:35:40", action: "Exported data", details: "Exported customer database to external device" },
      { timestamp: "00:45:15", action: "Deleted logs", details: "Attempted to clear system access logs" },
      { timestamp: "00:52:30", action: "Logged out", details: "Session ended" },
    ],
    complianceDetails: {
      riskScore: 85,
      maxRiskScore: 100,
      policyViolations: 3,
      unusualActivities: 2,
      dataAccessed: [
        { category: "Server Logs", sensitivity: "Low", authorized: true },
        { category: "Customer Database", sensitivity: "High", authorized: false },
        { category: "Payment Information", sensitivity: "Critical", authorized: false },
        { category: "System Logs", sensitivity: "Medium", authorized: true },
      ],
    },
  },
  {
    id: "RS-1006",
    user: "Alex Turner",
    organization: "TechSolutions LLC",
    date: "2025-03-24T13:10:00",
    duration: "37m",
    status: "orange",
    title: "Network Configuration",
    goals: "Update network security settings for development servers",
    summary:
      "User modified firewall settings that significantly reduced network security posture. Multiple critical security controls were disabled.",
    keyMoments: [
      { timestamp: "00:06:20", description: "Accessed network administration console" },
      { timestamp: "00:14:35", description: "Disabled multiple firewall security rules" },
      { timestamp: "00:28:50", description: "Changed authentication requirements for remote access" },
    ],
    videoUrl: "#",
    activityLog: [
      { timestamp: "00:01:45", action: "Logged into system", details: "User authenticated with admin credentials" },
      { timestamp: "00:06:20", action: "Accessed network admin", details: "Opened network administration console" },
      { timestamp: "00:09:30", action: "Modified firewall", details: "Disabled DMZ firewall rules" },
      { timestamp: "00:14:35", action: "Modified firewall", details: "Disabled external access restrictions" },
      { timestamp: "00:19:10", action: "Changed settings", details: "Modified intrusion detection system settings" },
      { timestamp: "00:23:45", action: "Accessed auth system", details: "Opened authentication configuration" },
      { timestamp: "00:28:50", action: "Modified settings", details: "Reduced MFA requirements for remote access" },
      { timestamp: "00:32:15", action: "Created account", details: "Created new admin account with full privileges" },
      { timestamp: "00:35:40", action: "Logged out", details: "Session ended" },
    ],
    complianceDetails: {
      riskScore: 78,
      maxRiskScore: 100,
      policyViolations: 2,
      unusualActivities: 3,
      dataAccessed: [
        { category: "Network Configuration", sensitivity: "High", authorized: true },
        { category: "Firewall Rules", sensitivity: "Critical", authorized: true },
        { category: "Authentication System", sensitivity: "Critical", authorized: true },
      ],
    },
  },
  {
    id: "RS-1007",
    user: "Jessica Lee",
    organization: "Global Banking Corp",
    date: "2025-03-23T09:22:00",
    duration: "45m",
    status: "purple",
    title: "Customer Account Review",
    goals: "Review flagged customer accounts for suspicious transactions",
    summary:
      "User accessed accounts outside of assigned portfolio, including high-value accounts. Actions followed unusual patterns with multiple failed access attempts to restricted areas.",
    keyMoments: [
      { timestamp: "00:08:15", description: "Accessed customer database outside regular working hours" },
      { timestamp: "00:17:40", description: "Multiple failed attempts to access executive accounts" },
      { timestamp: "00:32:10", description: "Downloaded customer transaction history for non-assigned accounts" },
    ],
    videoUrl: "#",
    activityLog: [
      { timestamp: "00:01:10", action: "Logged into system", details: "User authenticated from unusual location" },
      { timestamp: "00:04:25", action: "Accessed customer DB", details: "Opened customer account database" },
      { timestamp: "00:08:15", action: "Searched accounts", details: "Searched for high-value accounts" },
      {
        timestamp: "00:12:30",
        action: "Viewed account",
        details: "Accessed Customer #89732 (outside assigned portfolio)",
      },
      {
        timestamp: "00:15:45",
        action: "Failed access",
        details: "Failed attempt to access restricted executive accounts",
      },
      { timestamp: "00:17:40", action: "Failed access", details: "Multiple failed attempts to access executive area" },
      {
        timestamp: "00:22:10",
        action: "Viewed transactions",
        details: "Viewed transaction history for multiple accounts",
      },
      { timestamp: "00:28:35", action: "Generated report", details: "Generated unusual transaction report" },
      { timestamp: "00:32:10", action: "Downloaded data", details: "Downloaded transaction history for 15 accounts" },
      { timestamp: "00:38:45", action: "Accessed settings", details: "Attempted to modify account alert thresholds" },
      { timestamp: "00:43:20", action: "Logged out", details: "Session ended" },
    ],
    complianceDetails: {
      riskScore: 72,
      maxRiskScore: 100,
      policyViolations: 1,
      unusualActivities: 4,
      dataAccessed: [
        { category: "Customer Accounts", sensitivity: "High", authorized: false },
        { category: "Transaction History", sensitivity: "High", authorized: false },
        { category: "Account Settings", sensitivity: "Medium", authorized: false },
      ],
    },
  },
]

export default function SessionDetailPage({ sessionId }: { sessionId: string }) {
  const [session, setSession] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState("00:00:00")

  // Fetch session data
  useEffect(() => {
    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      const foundSession = sampleSessions.find((s) => s.id === sessionId)
      setSession(foundSession || null)
      setIsLoading(false)
    }, 500)
  }, [sessionId])

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "green":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
          >
            <CheckCircle className="w-3.5 h-3.5 mr-1" />
            Compliant
          </Badge>
        )
      case "yellow":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800"
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1" />
            Concerns
          </Badge>
        )
      case "orange":
        return (
          <Badge
            variant="outline"
            className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800"
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1" />
            Security Risk
          </Badge>
        )
      case "purple":
        return (
          <Badge
            variant="outline"
            className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800"
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1" />
            Suspicious Activity
          </Badge>
        )
      case "red":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1" />
            Violation
          </Badge>
        )
      default:
        return null
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const jumpToKeyMoment = (timestamp: string) => {
    setCurrentTime(timestamp)
    setIsPlaying(true)
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
      </Layout>
    )
  }

  if (!session) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] space-y-4">
          <h1 className="text-2xl font-bold">Session Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400">
            The session you're looking for doesn't exist or has been deleted.
          </p>
          <Button asChild>
            <Link href="/remote-sessions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sessions
            </Link>
          </Button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="bg-gray-100 dark:bg-[#1F1F23] text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-[#2B2B30] border-gray-200 dark:border-[#2B2B30]"
          >
            <Link href="/remote-sessions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sessions
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">{session.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {session.user} • {session.organization} • {format(new Date(session.date), "MMM d, yyyy h:mm a")}
              </p>
              <StatusBadge status={session.status} />
            </div>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            {session.status === "yellow" || session.status === "red" ? (
              <Button
                variant="outline"
                className="gap-2 bg-gray-100 dark:bg-[#1F1F23] text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-[#2B2B30] border-gray-200 dark:border-[#2B2B30]"
              >
                <Flag className="h-4 w-4" />
                Report Issue
              </Button>
            ) : null}
            <Button className="gap-2 bg-gray-100 dark:bg-[#1F1F23] text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-[#2B2B30] border-gray-200 dark:border-[#2B2B30]">
              <Download className="h-4 w-4" />
              Download Recording
            </Button>
          </div>
        </div>

        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="compliance">Compliance Rating</TabsTrigger>
            <TabsTrigger value="recording">Recording</TabsTrigger>
            <TabsTrigger value="keyMoments">Key Moments</TabsTrigger>
            <TabsTrigger value="activityLog">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="recording" className="space-y-6">
            <div className="relative aspect-video bg-black rounded-md overflow-hidden">
              {/* Video placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white">Video recording would play here</p>
              </div>

              {/* Video controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={togglePlay}>
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <span className="text-xs text-white">
                      {currentTime} / {session.duration}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={toggleMute}>
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-1/3 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Session Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Session ID</p>
                      <p>{session.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">User</p>
                      <p>{session.user}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Organization</p>
                      <p>{session.organization}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                      <p>{format(new Date(session.date), "MMMM d, yyyy")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</p>
                      <p>{format(new Date(session.date), "h:mm a")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</p>
                      <p>{session.duration}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Declared Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{session.goals}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="keyMoments" className="space-y-6">
            <div className="relative aspect-video bg-black rounded-md overflow-hidden">
              {/* Video placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white">Video recording would play here</p>
              </div>

              {/* Video controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={togglePlay}>
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <span className="text-xs text-white">
                      {currentTime} / {session.duration}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={toggleMute}>
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-1/3 rounded-full"></div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Moments</CardTitle>
                <CardDescription>Click on a moment to navigate to that point in the recording</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {session.keyMoments.map((moment: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50 transition-colors cursor-pointer border"
                      onClick={() => jumpToKeyMoment(moment.timestamp)}
                    >
                      <div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-[#1F1F23] rounded-md">
                        <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-medium">{moment.timestamp}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 bg-gray-100 dark:bg-[#1F1F23] text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-[#2B2B30] border-gray-200 dark:border-[#2B2B30]"
                          >
                            <Play className="h-3.5 w-3.5" />
                            Go to
                          </Button>
                        </div>
                        <p className="mt-1">{moment.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Analysis Summary</CardTitle>
                <CardDescription>Automated analysis of session activities and compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Compliance Assessment</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <StatusBadge status={session.status} />
                      <span>
                        {session.status === "green" && "All activities aligned with declared goals"}
                        {session.status === "yellow" && "Some activities outside declared scope"}
                        {session.status === "red" && "Significant deviation from declared goals"}
                      </span>
                    </div>

                    <div className="p-4 rounded-md bg-gray-50 dark:bg-[#1F1F23]/50 mb-4">
                      <p className="text-sm">{session.summary}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Goal vs. Actual Comparison</h3>
                    <div className="border rounded-md overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                        <div className="p-4 bg-gray-50 dark:bg-[#1F1F23]/50">
                          <h4 className="font-medium mb-2">Declared Goals</h4>
                          <p>{session.goals}</p>
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium mb-2">Actual Activities</h4>
                          <p>{session.summary}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Recommendations</h3>
                    <div className="p-4 rounded-md border">
                      {session.status === "green" && (
                        <p>No compliance issues detected. Continue monitoring as usual.</p>
                      )}
                      {session.status === "yellow" && (
                        <div className="space-y-2">
                          <p>Minor compliance concerns detected. Consider the following actions:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Review access policies for medical history records</li>
                            <li>Provide additional training on data access protocols</li>
                            <li>Update declared goals to include all necessary access requirements</li>
                          </ul>
                        </div>
                      )}
                      {session.status === "red" && (
                        <div className="space-y-2">
                          <p>Serious compliance violations detected. Recommended immediate actions:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Investigate unauthorized data export</li>
                            <li>Revoke user access pending investigation</li>
                            <li>Notify data protection officer</li>
                            <li>Implement additional monitoring for similar patterns</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activityLog" className="space-y-6">
            <div className="relative aspect-video bg-black rounded-md overflow-hidden">
              {/* Video placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white">Video recording would play here</p>
              </div>

              {/* Video controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={togglePlay}>
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <span className="text-xs text-white">
                      {currentTime} / {session.duration}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={toggleMute}>
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-1/3 rounded-full"></div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Detailed chronological log of all activities during the session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50 dark:bg-[#1F1F23]/50">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Timestamp
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Details
                        </th>
                        <th scope="col" className="px-6 py-3 text-right">
                          Jump to
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {session.activityLog.map((activity: any, index: number) => (
                        <tr key={index} className="bg-white dark:bg-[#0F0F12] border-b">
                          <td className="px-6 py-4 font-medium">{activity.timestamp}</td>
                          <td className="px-6 py-4">{activity.action}</td>
                          <td className="px-6 py-4">{activity.details}</td>
                          <td className="px-6 py-4 text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => jumpToKeyMoment(activity.timestamp)}
                              className="h-8 bg-gray-100 dark:bg-[#1F1F23] text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-[#2B2B30] border-gray-200 dark:border-[#2B2B30]"
                            >
                              <Play className="h-3.5 w-3.5 mr-1" />
                              Go to
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Risk Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-bold">{session.complianceDetails.riskScore}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      / {session.complianceDetails.maxRiskScore}
                    </div>
                  </div>
                  <div className="mt-2 h-2 bg-gray-100 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        session.status === "green"
                          ? "bg-emerald-500"
                          : session.status === "yellow"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                      style={{
                        width: `${(session.complianceDetails.riskScore / session.complianceDetails.maxRiskScore) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {session.status === "green"
                      ? "Low risk"
                      : session.status === "yellow"
                        ? "Medium risk"
                        : "High risk"}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Policy Violations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{session.complianceDetails.policyViolations}</div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {session.complianceDetails.policyViolations === 0
                      ? "No policy violations detected"
                      : session.complianceDetails.policyViolations === 1
                        ? "1 policy violation detected"
                        : `${session.complianceDetails.policyViolations} policy violations detected`}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Unusual Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{session.complianceDetails.unusualActivities}</div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {session.complianceDetails.unusualActivities === 0
                      ? "No unusual activities detected"
                      : session.complianceDetails.unusualActivities === 1
                        ? "1 unusual activity detected"
                        : `${session.complianceDetails.unusualActivities} unusual activities detected`}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Data Access Analysis</CardTitle>
                <CardDescription>Categories of data accessed during this session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50 dark:bg-[#1F1F23]/50">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Data Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Sensitivity
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Authorization
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {session.complianceDetails.dataAccessed.map((data: any, index: number) => (
                        <tr key={index} className="bg-white dark:bg-[#0F0F12] border-b">
                          <td className="px-6 py-4 font-medium">{data.category}</td>
                          <td className="px-6 py-4">
                            <Badge
                              variant={
                                data.sensitivity === "Low"
                                  ? "outline"
                                  : data.sensitivity === "Medium"
                                    ? "secondary"
                                    : data.sensitivity === "High"
                                      ? "destructive"
                                      : "default"
                              }
                            >
                              {data.sensitivity}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            {data.authorized ? (
                              <Badge
                                variant="outline"
                                className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                              >
                                <CheckCircle className="w-3.5 h-3.5 mr-1" />
                                Authorized
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
                              >
                                <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                                Unauthorized
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

