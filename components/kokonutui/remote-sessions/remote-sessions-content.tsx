"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Monitor,
  Search,
  Filter,
  Upload,
  CheckCircle,
  AlertTriangle,
  Trash2,
  Eye,
  ChevronDown,
  Download,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import UploadSessionForm from "./upload-session-form"
import Link from "next/link"

// Sample data for the sessions - updated to use only green, yellow, and red statuses
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
  },
  {
    id: "RS-1004",
    user: "Emily Rodriguez",
    organization: "Global Banking Corp",
    date: "2025-03-25T11:20:00",
    duration: "27m",
    status: "green",
    title: "Account Verification",
    goals: "Verify new customer accounts and complete KYC process",
    summary:
      "User verified customer identities and completed KYC documentation as declared. All actions were within compliance guidelines.",
    keyMoments: [
      { timestamp: "00:04:10", description: "Accessed KYC verification system" },
      { timestamp: "00:10:25", description: "Reviewed customer identification documents" },
      { timestamp: "00:22:30", description: "Approved 8 new customer accounts" },
    ],
    videoUrl: "#",
  },
  {
    id: "RS-1005",
    user: "David Wilson",
    organization: "Acme Financial",
    date: "2025-03-25T15:40:00",
    duration: "41m",
    status: "yellow",
    title: "Client Portfolio Review",
    goals: "Review client investment portfolios for quarterly meeting",
    summary:
      "User reviewed client portfolios as intended but also accessed internal trading strategies which was outside the declared scope.",
    keyMoments: [
      { timestamp: "00:07:15", description: "Reviewed client portfolio performance" },
      { timestamp: "00:23:40", description: "Accessed internal trading strategy documents (outside declared scope)" },
      { timestamp: "00:35:10", description: "Created client meeting notes" },
    ],
    videoUrl: "#",
  },
  {
    id: "RS-1006",
    user: "Alex Turner",
    organization: "TechSolutions LLC",
    date: "2025-03-24T13:10:00",
    duration: "37m",
    status: "yellow", // Changed from orange to yellow
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
  },
  {
    id: "RS-1007",
    user: "Jessica Lee",
    organization: "Global Banking Corp",
    date: "2025-03-23T09:22:00",
    duration: "45m",
    status: "yellow", // Changed from purple to yellow
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
  },
]

export default function RemoteSessionsContent() {
  const [sessions, setSessions] = useState(sampleSessions)
  const [selectedSessions, setSelectedSessions] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    date: null as Date | null,
    user: "",
    organization: "",
    status: "" as "" | "green" | "yellow" | "red",
  })
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Filter sessions based on search query and filters
  const filteredSessions = sessions.filter((session) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      session.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.summary.toLowerCase().includes(searchQuery.toLowerCase())

    // Date filter
    const matchesDate =
      !filters.date || format(new Date(session.date), "yyyy-MM-dd") === format(filters.date, "yyyy-MM-dd")

    // User filter
    const matchesUser = !filters.user || session.user.toLowerCase().includes(filters.user.toLowerCase())

    // Organization filter
    const matchesOrg =
      !filters.organization || session.organization.toLowerCase().includes(filters.organization.toLowerCase())

    // Status filter
    const matchesStatus = !filters.status || session.status === filters.status

    return matchesSearch && matchesDate && matchesUser && matchesOrg && matchesStatus
  })

  // Handle checkbox selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSessions(filteredSessions.map((session) => session.id))
    } else {
      setSelectedSessions([])
    }
  }

  const handleSelectSession = (sessionId: string, checked: boolean) => {
    if (checked) {
      setSelectedSessions([...selectedSessions, sessionId])
    } else {
      setSelectedSessions(selectedSessions.filter((id) => id !== sessionId))
    }
  }

  // Handle delete sessions
  const handleDeleteSessions = () => {
    setSessions(sessions.filter((session) => !selectedSessions.includes(session.id)))
    setSelectedSessions([])
    setIsDeleteDialogOpen(false)
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      date: null,
      user: "",
      organization: "",
      status: "",
    })
    setSearchQuery("")
  }

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
            Security Risk
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Remote Sessions</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and analyze remote desktop session recordings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 dark:bg-[#1F1F23] dark:text-white dark:hover:bg-[#2B2B30] dark:border-[#2B2B30]">
                <Upload className="w-4 h-4" />
                Upload Session
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Upload Session Recording</DialogTitle>
                <DialogDescription>Upload a remote desktop session recording for compliance analysis</DialogDescription>
              </DialogHeader>
              <UploadSessionForm onClose={() => setIsUploadDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23]">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Session Recordings
            </CardTitle>
            <CardDescription>Review and analyze recorded sessions</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search sessions..."
                className="pl-9 w-full sm:w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 gap-1">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-4" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Filter Sessions</h4>

                  <div className="space-y-2">
                    <Label htmlFor="date-filter">Date</Label>
                    <CalendarComponent
                      mode="single"
                      selected={filters.date}
                      onSelect={(date) => setFilters({ ...filters, date })}
                      className="rounded-md border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-filter">User</Label>
                    <Input
                      id="user-filter"
                      placeholder="Filter by user..."
                      value={filters.user}
                      onChange={(e) => setFilters({ ...filters, user: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="org-filter">Organization</Label>
                    <Input
                      id="org-filter"
                      placeholder="Filter by organization..."
                      value={filters.organization}
                      onChange={(e) => setFilters({ ...filters, organization: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={filters.status === "green" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilters({ ...filters, status: filters.status === "green" ? "" : "green" })}
                        className={filters.status === "green" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Compliant
                      </Button>
                      <Button
                        variant={filters.status === "yellow" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilters({ ...filters, status: filters.status === "yellow" ? "" : "yellow" })}
                        className={filters.status === "yellow" ? "bg-amber-600 hover:bg-amber-700" : ""}
                      >
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Security Risk
                      </Button>
                      <Button
                        variant={filters.status === "red" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilters({ ...filters, status: filters.status === "red" ? "" : "red" })}
                        className={filters.status === "red" ? "bg-red-600 hover:bg-red-700" : ""}
                      >
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Violation
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                    <Button size="sm">Apply Filters</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {selectedSessions.length > 0 && (
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="h-10 gap-1">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete ({selectedSessions.length})</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Sessions</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete {selectedSessions.length} selected session
                      {selectedSessions.length > 1 ? "s" : ""}? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="gap-2 sm:gap-0">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleDeleteSessions}>
                      Delete Sessions
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
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
                        <th className="h-10 w-[40px] px-2 text-left align-middle">
                          <Checkbox
                            checked={filteredSessions.length > 0 && selectedSessions.length === filteredSessions.length}
                            onCheckedChange={handleSelectAll}
                            aria-label="Select all sessions"
                          />
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Session ID
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          User/Admin
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Organization
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Date/Time
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Status
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Summary
                        </th>
                        <th className="h-10 px-2 text-right align-middle font-medium text-gray-500 dark:text-gray-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {filteredSessions.length > 0 ? (
                        filteredSessions.map((session) => (
                          <tr
                            key={session.id}
                            className="border-b border-gray-200 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50 transition-colors"
                          >
                            <td className="p-2 align-middle">
                              <Checkbox
                                checked={selectedSessions.includes(session.id)}
                                onCheckedChange={(checked) => handleSelectSession(session.id, checked === true)}
                                aria-label={`Select session ${session.id}`}
                              />
                            </td>
                            <td className="p-2 align-middle font-medium">{session.id}</td>
                            <td className="p-2 align-middle">{session.user}</td>
                            <td className="p-2 align-middle">{session.organization}</td>
                            <td className="p-2 align-middle text-gray-500 dark:text-gray-400">
                              {format(new Date(session.date), "MMM d, yyyy h:mm a")}
                            </td>
                            <td className="p-2 align-middle">
                              <StatusBadge status={session.status} />
                            </td>
                            <td className="p-2 align-middle">
                              <p className="truncate max-w-[200px] text-xs text-gray-500 dark:text-gray-400">
                                {session.summary}
                              </p>
                            </td>
                            <td className="p-2 align-middle text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                      <Link href={`/remote-sessions/${session.id}`}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        <span>View Details</span>
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Download className="mr-2 h-4 w-4" />
                                      <span>Download</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuGroup>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600 dark:text-red-400"
                                    onClick={() => {
                                      setSelectedSessions([session.id])
                                      setIsDeleteDialogOpen(true)
                                    }}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="p-4 text-center text-gray-500 dark:text-gray-400">
                            No sessions found. Try adjusting your filters or upload a new session.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compliant">
              <div className="overflow-hidden rounded-md border border-gray-200 dark:border-[#1F1F23]">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    {/* Same table structure as above, but filtered for compliant sessions */}
                    <thead className="[&_tr]:border-b">
                      {/* Same header as above */}
                      <tr className="border-b border-gray-200 dark:border-[#1F1F23] bg-gray-50 dark:bg-[#1F1F23]/50">
                        <th className="h-10 w-[40px] px-2 text-left align-middle">
                          <Checkbox
                            checked={
                              filteredSessions.filter((s) => s.status === "green").length > 0 &&
                              selectedSessions.length === filteredSessions.filter((s) => s.status === "green").length
                            }
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedSessions(
                                  filteredSessions.filter((s) => s.status === "green").map((s) => s.id),
                                )
                              } else {
                                setSelectedSessions([])
                              }
                            }}
                            aria-label="Select all compliant sessions"
                          />
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Session ID
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          User/Admin
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Organization
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Date/Time
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Status
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Summary
                        </th>
                        <th className="h-10 px-2 text-right align-middle font-medium text-gray-500 dark:text-gray-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {filteredSessions.filter((s) => s.status === "green").length > 0 ? (
                        filteredSessions
                          .filter((s) => s.status === "green")
                          .map((session) => (
                            <tr
                              key={session.id}
                              className="border-b border-gray-200 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50 transition-colors"
                            >
                              <td className="p-2 align-middle">
                                <Checkbox
                                  checked={selectedSessions.includes(session.id)}
                                  onCheckedChange={(checked) => handleSelectSession(session.id, checked === true)}
                                  aria-label={`Select session ${session.id}`}
                                />
                              </td>
                              <td className="p-2 align-middle font-medium">{session.id}</td>
                              <td className="p-2 align-middle">{session.user}</td>
                              <td className="p-2 align-middle">{session.organization}</td>
                              <td className="p-2 align-middle text-gray-500 dark:text-gray-400">
                                {format(new Date(session.date), "MMM d, yyyy h:mm a")}
                              </td>
                              <td className="p-2 align-middle">
                                <StatusBadge status={session.status} />
                              </td>
                              <td className="p-2 align-middle">
                                <p className="truncate max-w-[200px] text-xs text-gray-500 dark:text-gray-400">
                                  {session.summary}
                                </p>
                              </td>
                              <td className="p-2 align-middle text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <ChevronDown className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuGroup>
                                      <DropdownMenuItem asChild>
                                        <Link href={`/remote-sessions/${session.id}`}>
                                          <Eye className="mr-2 h-4 w-4" />
                                          <span>View Details</span>
                                        </Link>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Download className="mr-2 h-4 w-4" />
                                        <span>Download</span>
                                      </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-red-600 dark:text-red-400"
                                      onClick={() => {
                                        setSelectedSessions([session.id])
                                        setIsDeleteDialogOpen(true)
                                      }}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Delete</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="p-4 text-center text-gray-500 dark:text-gray-400">
                            No compliant sessions found. Try adjusting your filters.
                          </td>
                        </tr>
                      )}
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
                        <th className="h-10 w-[40px] px-2 text-left align-middle">
                          <Checkbox
                            checked={
                              filteredSessions.filter((s) => s.status === "yellow").length > 0 &&
                              selectedSessions.length === filteredSessions.filter((s) => s.status === "yellow").length
                            }
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedSessions(
                                  filteredSessions.filter((s) => s.status === "yellow").map((s) => s.id),
                                )
                              } else {
                                setSelectedSessions([])
                              }
                            }}
                            aria-label="Select all security risk sessions"
                          />
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Session ID
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          User/Admin
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Organization
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Date/Time
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Status
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Summary
                        </th>
                        <th className="h-10 px-2 text-right align-middle font-medium text-gray-500 dark:text-gray-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {filteredSessions.filter((s) => s.status === "yellow").length > 0 ? (
                        filteredSessions
                          .filter((s) => s.status === "yellow")
                          .map((session) => (
                            <tr
                              key={session.id}
                              className="border-b border-gray-200 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50 transition-colors"
                            >
                              <td className="p-2 align-middle">
                                <Checkbox
                                  checked={selectedSessions.includes(session.id)}
                                  onCheckedChange={(checked) => handleSelectSession(session.id, checked === true)}
                                  aria-label={`Select session ${session.id}`}
                                />
                              </td>
                              <td className="p-2 align-middle font-medium">{session.id}</td>
                              <td className="p-2 align-middle">{session.user}</td>
                              <td className="p-2 align-middle">{session.organization}</td>
                              <td className="p-2 align-middle text-gray-500 dark:text-gray-400">
                                {format(new Date(session.date), "MMM d, yyyy h:mm a")}
                              </td>
                              <td className="p-2 align-middle">
                                <StatusBadge status={session.status} />
                              </td>
                              <td className="p-2 align-middle">
                                <p className="truncate max-w-[200px] text-xs text-gray-500 dark:text-gray-400">
                                  {session.summary}
                                </p>
                              </td>
                              <td className="p-2 align-middle text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <ChevronDown className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuGroup>
                                      <DropdownMenuItem asChild>
                                        <Link href={`/remote-sessions/${session.id}`}>
                                          <Eye className="mr-2 h-4 w-4" />
                                          <span>View Details</span>
                                        </Link>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Download className="mr-2 h-4 w-4" />
                                        <span>Download</span>
                                      </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-red-600 dark:text-red-400"
                                      onClick={() => {
                                        setSelectedSessions([session.id])
                                        setIsDeleteDialogOpen(true)
                                      }}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Delete</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="p-4 text-center text-gray-500 dark:text-gray-400">
                            No security risk sessions found. Try adjusting your filters.
                          </td>
                        </tr>
                      )}
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
                        <th className="h-10 w-[40px] px-2 text-left align-middle">
                          <Checkbox
                            checked={
                              filteredSessions.filter((s) => s.status === "red").length > 0 &&
                              selectedSessions.length === filteredSessions.filter((s) => s.status === "red").length
                            }
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedSessions(filteredSessions.filter((s) => s.status === "red").map((s) => s.id))
                              } else {
                                setSelectedSessions([])
                              }
                            }}
                            aria-label="Select all violation sessions"
                          />
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Session ID
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          User/Admin
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Organization
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Date/Time
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Status
                        </th>
                        <th className="h-10 px-2 text-left align-middle font-medium text-gray-500 dark:text-gray-400">
                          Summary
                        </th>
                        <th className="h-10 px-2 text-right align-middle font-medium text-gray-500 dark:text-gray-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {filteredSessions.filter((s) => s.status === "red").length > 0 ? (
                        filteredSessions
                          .filter((s) => s.status === "red")
                          .map((session) => (
                            <tr
                              key={session.id}
                              className="border-b border-gray-200 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50 transition-colors"
                            >
                              <td className="p-2 align-middle">
                                <Checkbox
                                  checked={selectedSessions.includes(session.id)}
                                  onCheckedChange={(checked) => handleSelectSession(session.id, checked === true)}
                                  aria-label={`Select session ${session.id}`}
                                />
                              </td>
                              <td className="p-2 align-middle font-medium">{session.id}</td>
                              <td className="p-2 align-middle">{session.user}</td>
                              <td className="p-2 align-middle">{session.organization}</td>
                              <td className="p-2 align-middle text-gray-500 dark:text-gray-400">
                                {format(new Date(session.date), "MMM d, yyyy h:mm a")}
                              </td>
                              <td className="p-2 align-middle">
                                <StatusBadge status={session.status} />
                              </td>
                              <td className="p-2 align-middle">
                                <p className="truncate max-w-[200px] text-xs text-gray-500 dark:text-gray-400">
                                  {session.summary}
                                </p>
                              </td>
                              <td className="p-2 align-middle text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <ChevronDown className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuGroup>
                                      <DropdownMenuItem asChild>
                                        <Link href={`/remote-sessions/${session.id}`}>
                                          <Eye className="mr-2 h-4 w-4" />
                                          <span>View Details</span>
                                        </Link>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Download className="mr-2 h-4 w-4" />
                                        <span>Download</span>
                                      </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-red-600 dark:text-red-400"
                                      onClick={() => {
                                        setSelectedSessions([session.id])
                                        setIsDeleteDialogOpen(true)
                                      }}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Delete</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="p-4 text-center text-gray-500 dark:text-gray-400">
                            No violation sessions found. Try adjusting your filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Import the Calendar component
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
