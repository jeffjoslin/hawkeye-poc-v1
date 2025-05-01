"use client"

import { Calendar, AlertTriangle, CheckCircle, Eye, Clock, Search, Filter, Monitor, ShieldAlert } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SessionChart from "./session-chart"

// Sample data for the dashboard - updated to use only green, yellow, and red statuses
const metrics = {
  totalSessions: 128,
  greenStatus: 75, // Compliant
  yellowStatus: 43, // Security Risk (combined previous yellow, orange, and purple)
  redStatus: 10, // Violations
  pendingReview: 8,
  complianceRate: 58.6, // percentage
}

const todaySessions = [
  {
    id: "s-1234",
    user: "John Smith",
    department: "Finance",
    time: "10:23 AM",
    duration: "32m",
    status: "green",
    intent: "Quarterly report preparation",
  },
  {
    id: "s-1235",
    user: "Sarah Johnson",
    department: "HR",
    time: "11:45 AM",
    duration: "18m",
    status: "yellow", // Changed from concerns to security risk
    intent: "Employee record updates",
  },
  {
    id: "s-1236",
    user: "Michael Chen",
    department: "IT",
    time: "1:15 PM",
    duration: "45m",
    status: "red",
    intent: "System maintenance",
  },
  {
    id: "s-1237",
    user: "Lisa Wong",
    department: "Marketing",
    time: "2:30 PM",
    duration: "22m",
    status: "green",
    intent: "Campaign analytics review",
  },
  {
    id: "s-1238",
    user: "Alex Turner",
    department: "IT",
    time: "3:10 PM",
    duration: "37m",
    status: "yellow", // Changed from orange to yellow
    intent: "Network configuration update",
  },
  {
    id: "s-1239",
    user: "Jessica Lee",
    department: "Finance",
    time: "4:22 PM",
    duration: "28m",
    status: "yellow", // Changed from purple to yellow
    intent: "Customer account review",
  },
]

// Update the recentSessions array to include examples of the new status types
const recentSessions = [
  {
    id: "s-1230",
    user: "Robert Davis",
    department: "Sales",
    date: "Yesterday",
    time: "4:12 PM",
    duration: "28m",
    status: "green",
    intent: "CRM data entry",
    summary:
      "User accessed CRM system, updated 12 customer records, and generated 3 sales reports. All actions aligned with declared intent.",
  },
  {
    id: "s-1231",
    user: "Emma Wilson",
    department: "Finance",
    date: "Yesterday",
    time: "2:45 PM",
    duration: "37m",
    status: "yellow", // Changed from concerns to security risk
    intent: "Invoice processing",
    summary:
      "User processed invoices as intended but also accessed employee salary information which was outside the declared scope.",
  },
  {
    id: "s-1232",
    user: "James Taylor",
    department: "IT",
    date: "Mar 26",
    time: "11:30 AM",
    duration: "52m",
    status: "red",
    intent: "Software updates",
    summary:
      "User declared intent to perform software updates but primarily accessed customer database and exported sensitive data.",
  },
  {
    id: "s-1233",
    user: "Olivia Brown",
    department: "HR",
    date: "Mar 26",
    time: "9:15 AM",
    duration: "24m",
    status: "green",
    intent: "New hire onboarding",
    summary: "User accessed onboarding documents and updated new employee records as declared.",
  },
  {
    id: "s-1238",
    user: "Daniel Lee",
    department: "Legal",
    date: "Mar 25",
    time: "3:40 PM",
    duration: "41m",
    status: "yellow", // Changed from concerns to security risk
    intent: "Contract review",
    summary: "User reviewed contracts as intended but also accessed archived cases not related to current contracts.",
  },
  {
    id: "s-1240",
    user: "Alex Turner",
    department: "IT",
    date: "Mar 25",
    time: "1:10 PM",
    duration: "37m",
    status: "yellow", // Changed from orange to yellow
    intent: "Network configuration",
    summary:
      "User modified firewall settings that significantly reduced network security posture. Multiple critical security controls were disabled.",
  },
  {
    id: "s-1241",
    user: "Jessica Lee",
    department: "Finance",
    date: "Mar 24",
    time: "9:22 AM",
    duration: "45m",
    status: "yellow", // Changed from purple to yellow
    intent: "Customer account review",
    summary:
      "User accessed accounts outside of assigned portfolio, including high-value accounts. Actions followed unusual patterns with multiple failed access attempts to restricted areas.",
  },
]

export default function Content() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case "green":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />
      case "yellow":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />
      case "red":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const StatusBadge = ({ status }: { status: string }) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"

    switch (status) {
      case "green":
        return (
          <span
            className={`${baseClasses} bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Compliant
          </span>
        )
      case "yellow":
        return (
          <span className={`${baseClasses} bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400`}>
            <AlertTriangle className="w-3.5 h-3.5" />
            Security Risk
          </span>
        )
      case "red":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400`}>
            <AlertTriangle className="w-3.5 h-3.5" />
            Violation
          </span>
        )
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400`}>
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Overview of compliance monitoring and session analytics
        </p>
      </div>

      {/* Metrics Cards - All in one row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Sessions */}
        <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23] h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalSessions}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{metrics.pendingReview} pending review</p>
          </CardContent>
        </Card>

        {/* Compliance Rate */}
        <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23] h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.complianceRate}%</div>
            <div className="mt-2">
              <Progress value={metrics.complianceRate} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        {/* Status Breakdown */}
        <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23] h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm flex-wrap gap-y-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span>{metrics.greenStatus} Compliant</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span>{metrics.yellowStatus} Security Risk</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>{metrics.redStatus} Violations</span>
              </div>
            </div>
            <div className="flex h-2 mt-2 overflow-hidden rounded-full">
              <div
                className="bg-emerald-500"
                style={{ width: `${(metrics.greenStatus / metrics.totalSessions) * 100}%` }}
              ></div>
              <div
                className="bg-amber-500"
                style={{ width: `${(metrics.yellowStatus / metrics.totalSessions) * 100}%` }}
              ></div>
              <div
                className="bg-red-500"
                style={{ width: `${(metrics.redStatus / metrics.totalSessions) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* High Risk Sessions */}
        <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23] h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Risk Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{metrics.redStatus}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {Math.round((metrics.redStatus / metrics.totalSessions) * 100)}% of total sessions
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="link" size="sm" className="px-0 text-red-600 dark:text-red-400">
              View all violations
            </Button>
          </CardFooter>
        </Card>

        {/* Security Risk Sessions */}
        <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23] h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Security Risk Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{metrics.yellowStatus}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {Math.round((metrics.yellowStatus / metrics.totalSessions) * 100)}% of total sessions
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="link" size="sm" className="px-0 text-amber-600 dark:text-amber-400">
              View all security risks
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Chart and Today's Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23] overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="text-lg font-bold flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              Compliance Trends
            </CardTitle>
            <CardDescription>Session compliance status over time</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pt-0 pb-4">
            <div className="h-[280px]">
              <SessionChart />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23]">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Today's Activity
            </CardTitle>
            <CardDescription>Recent session recordings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySessions.map((session) => (
                <div key={session.id} className="flex items-start gap-3">
                  <StatusIcon status={session.status} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium truncate">{session.user}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{session.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {session.department} • {session.duration}
                    </p>
                    <p className="text-xs truncate mt-1">{session.intent}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              className="w-full dark:bg-[#1F1F23] dark:text-white dark:hover:bg-[#2B2B30] dark:border-[#2B2B30]"
            >
              View all today's sessions
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Remote Sessions Section */}
      <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Remote Sessions
            </CardTitle>
            <CardDescription>Review and analyze recorded sessions</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Sessions</TabsTrigger>
              <TabsTrigger value="compliant">Compliant</TabsTrigger>
              <TabsTrigger value="security-risk">Security Risk</TabsTrigger>
              <TabsTrigger value="violations">Violations</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="overflow-hidden rounded-md border border-gray-200 dark:border-[#1F1F23]">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b border-gray-200 dark:border-[#1F1F23] bg-gray-50 dark:bg-[#1F1F23]/50">
                        <th className="h-10 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          User
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Department
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Date/Time
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Duration
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Status
                        </th>
                        <th className="h-10 px-2 text-right align-middle font-medium text-gray-500 dark:text-gray-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {recentSessions.map((session) => (
                        <tr
                          key={session.id}
                          className="border-b border-gray-200 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50 transition-colors"
                        >
                          <td className="p-2 px-4 align-middle">
                            <div className="font-medium">{session.user}</div>
                          </td>
                          <td className="p-2 align-middle text-xs text-gray-500 dark:text-gray-400">
                            {session.department}
                          </td>
                          <td className="p-2 align-middle text-xs text-gray-500 dark:text-gray-400">
                            {session.date}, {session.time}
                          </td>
                          <td className="p-2 align-middle text-xs text-gray-500 dark:text-gray-400">
                            {session.duration}
                          </td>
                          <td className="p-2 align-middle">
                            {session.status === "green" && (
                              <div className="flex items-center">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                                <span className="text-xs">Compliant</span>
                              </div>
                            )}
                            {session.status === "yellow" && (
                              <div className="flex items-center">
                                <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                                <span className="text-xs">Security Risk</span>
                              </div>
                            )}
                            {session.status === "red" && (
                              <div className="flex items-center">
                                <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                                <span className="text-xs">Violation</span>
                              </div>
                            )}
                          </td>
                          <td className="p-2 align-middle text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View details</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Session Details: {session.id}</DialogTitle>
                                  <DialogDescription>
                                    Recorded on {session.date} at {session.time} • Duration: {session.duration}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h3 className="font-medium">{session.user}</h3>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">{session.department}</p>
                                    </div>
                                    <StatusBadge status={session.status} />
                                  </div>

                                  <div className="space-y-2">
                                    <h4 className="text-sm font-medium">Declared Intent</h4>
                                    <p className="text-sm p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                                      {session.intent}
                                    </p>
                                  </div>

                                  <div className="space-y-2">
                                    <h4 className="text-sm font-medium">AI Summary</h4>
                                    <p className="text-sm p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                                      {session.summary}
                                    </p>
                                  </div>

                                  <div className="pt-2">
                                    <Button className="w-full">Watch Full Session Recording</Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="compliant">
              <div className="overflow-hidden rounded-md border border-gray-200 dark:border-[#1F1F23]">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b border-gray-200 dark:border-[#1F1F23] bg-gray-50 dark:bg-[#1F1F23]/50">
                        <th className="h-10 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          User
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Department
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Date/Time
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Duration
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Details
                        </th>
                        <th className="h-10 px-2 text-right align-middle font-medium text-gray-500 dark:text-gray-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {recentSessions
                        .filter((session) => session.status === "green")
                        .map((session) => (
                          <tr
                            key={session.id}
                            className="border-b border-gray-200 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50 transition-colors"
                          >
                            <td className="p-2 px-4 align-middle">
                              <div className="font-medium">{session.user}</div>
                            </td>
                            <td className="p-2 align-middle text-xs text-gray-500 dark:text-gray-400">
                              {session.department}
                            </td>
                            <td className="p-2 align-middle text-xs text-gray-500 dark:text-gray-400">
                              {session.date}, {session.time}
                            </td>
                            <td className="p-2 align-middle text-xs text-gray-500 dark:text-gray-400">
                              {session.duration}
                            </td>
                            <td className="p-2 align-middle text-xs">{session.summary}</td>
                            <td className="p-2 align-middle text-right">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">View details</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>Session Details: {session.id}</DialogTitle>
                                    <DialogDescription>
                                      Recorded on {session.date} at {session.time} • Duration: {session.duration}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <h3 className="font-medium">{session.user}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{session.department}</p>
                                      </div>
                                      <StatusBadge status={session.status} />
                                    </div>

                                    <div className="space-y-2">
                                      <h4 className="text-sm font-medium">Declared Intent</h4>
                                      <p className="text-sm p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                                        {session.intent}
                                      </p>
                                    </div>

                                    <div className="space-y-2">
                                      <h4 className="text-sm font-medium">AI Summary</h4>
                                      <p className="text-sm p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                                        {session.summary}
                                      </p>
                                    </div>

                                    <div className="pt-2">
                                      <Button className="w-full">Watch Full Session Recording</Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="security-risk">
              <div className="overflow-hidden rounded-md border border-gray-200 dark:border-[#1F1F23]">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b border-gray-200 dark:border-[#1F1F23] bg-gray-50 dark:bg-[#1F1F23]/50">
                        <th className="h-10 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          User
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Department
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Date/Time
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Duration
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Risk Details
                        </th>
                        <th className="h-10 px-2 text-right align-middle font-medium text-gray-500 dark:text-gray-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {recentSessions
                        .filter((session) => session.status === "yellow")
                        .map((session) => (
                          <tr
                            key={session.id}
                            className="border-b border-gray-200 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50 transition-colors"
                          >
                            <td className="p-2 px-4 align-middle">
                              <div className="font-medium">{session.user}</div>
                            </td>
                            <td className="p-2 align-middle text-xs text-gray-500 dark:text-gray-400">
                              {session.department}
                            </td>
                            <td className="p-2 align-middle text-xs text-gray-500 dark:text-gray-400">
                              {session.date}, {session.time}
                            </td>
                            <td className="p-2 align-middle text-xs text-gray-500 dark:text-gray-400">
                              {session.duration}
                            </td>
                            <td className="p-2 align-middle text-xs">{session.summary}</td>
                            <td className="p-2 align-middle text-right">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">View details</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>Session Details: {session.id}</DialogTitle>
                                    <DialogDescription>
                                      Recorded on {session.date} at {session.time} • Duration: {session.duration}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <h3 className="font-medium">{session.user}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{session.department}</p>
                                      </div>
                                      <StatusBadge status={session.status} />
                                    </div>

                                    <div className="space-y-2">
                                      <h4 className="text-sm font-medium">Declared Intent</h4>
                                      <p className="text-sm p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                                        {session.intent}
                                      </p>
                                    </div>

                                    <div className="space-y-2">
                                      <h4 className="text-sm font-medium">AI Summary</h4>
                                      <p className="text-sm p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                                        {session.summary}
                                      </p>
                                    </div>

                                    <div className="pt-2">
                                      <Button className="w-full">Watch Full Session Recording</Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="violations">
              <div className="overflow-hidden rounded-md border border-gray-200 dark:border-[#1F1F23]">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b border-gray-200 dark:border-[#1F1F23] bg-gray-50 dark:bg-[#1F1F23]/50">
                        <th className="h-10 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          User
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Department
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Date/Time
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Duration
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Violation Details
                        </th>
                        <th className="h-10 px-2 text-right align-middle font-medium text-gray-500 dark:text-gray-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {recentSessions
                        .filter((session) => session.status === "red")
                        .map((session) => (
                          <tr
                            key={session.id}
                            className="border-b border-gray-200 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50 transition-colors"
                          >
                            <td className="p-2 px-4 align-middle">
                              <div className="font-medium">{session.user}</div>
                            </td>
                            <td className="p-2 align-middle text-xs text-gray-500 dark:text-gray-400">
                              {session.department}
                            </td>
                            <td className="p-2 align-middle text-xs text-gray-500 dark:text-gray-400">
                              {session.date}, {session.time}
                            </td>
                            <td className="p-2 align-middle text-xs text-gray-500 dark:text-gray-400">
                              {session.duration}
                            </td>
                            <td className="p-2 align-middle text-xs">{session.summary}</td>
                            <td className="p-2 align-middle text-right">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">View details</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>Session Details: {session.id}</DialogTitle>
                                    <DialogDescription>
                                      Recorded on {session.date} at {session.time} • Duration: {session.duration}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <h3 className="font-medium">{session.user}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{session.department}</p>
                                      </div>
                                      <StatusBadge status={session.status} />
                                    </div>

                                    <div className="space-y-2">
                                      <h4 className="text-sm font-medium">Declared Intent</h4>
                                      <p className="text-sm p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                                        {session.intent}
                                      </p>
                                    </div>

                                    <div className="space-y-2">
                                      <h4 className="text-sm font-medium">AI Summary</h4>
                                      <p className="text-sm p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                                        {session.summary}
                                      </p>
                                    </div>

                                    <div className="pt-2">
                                      <Button className="w-full">Watch Full Session Recording</Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full dark:bg-[#1F1F23] dark:text-white dark:hover:bg-[#2B2B30] dark:border-[#2B2B30]"
          >
            View All Remote Sessions
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
