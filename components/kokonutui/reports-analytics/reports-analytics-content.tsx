"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, subDays, subMonths } from "date-fns"
import {
  BarChart2,
  FileText,
  Download,
  Filter,
  CalendarIcon,
  ChevronDown,
  Users,
  Building,
  AlertTriangle,
  FileDown,
  Share2,
  PieChart,
  LineChart,
  BarChart,
} from "lucide-react"
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
} from "recharts"

// Sample data for the charts
const sessionsByDateData = [
  { date: "Mar 21", total: 17, green: 9, yellow: 3, orange: 2, purple: 2, red: 1 },
  { date: "Mar 22", total: 20, green: 12, yellow: 3, orange: 3, purple: 1, red: 1 },
  { date: "Mar 23", total: 23, green: 15, yellow: 3, orange: 2, purple: 2, red: 1 },
  { date: "Mar 24", total: 23, green: 11, yellow: 4, orange: 3, purple: 3, red: 2 },
  { date: "Mar 25", total: 22, green: 13, yellow: 3, orange: 2, purple: 2, red: 2 },
  { date: "Mar 26", total: 22, green: 10, yellow: 4, orange: 3, purple: 2, red: 3 },
  { date: "Mar 27", total: 21, green: 12, yellow: 3, orange: 2, purple: 3, red: 1 },
]

// Find the statusDistributionData and update it to include the new status types
const statusDistributionData = [
  { name: "Compliant", value: 82, color: "#10b981" },
  { name: "Concerns", value: 23, color: "#f59e0b" },
  { name: "Security Risk", value: 17, color: "#f97316" },
  { name: "Suspicious Activity", value: 15, color: "#a855f7" },
  { name: "Violations", value: 11, color: "#ef4444" },
]

const complianceTrendData = [
  { month: "Jan", complianceRate: 72 },
  { month: "Feb", complianceRate: 68 },
  { month: "Mar", complianceRate: 75 },
  { month: "Apr", complianceRate: 82 },
  { month: "May", complianceRate: 79 },
  { month: "Jun", complianceRate: 85 },
]

const topViolationsData = [
  { name: "Unauthorized data export", count: 8 },
  { name: "Accessing sensitive records", count: 6 },
  { name: "Exceeding declared scope", count: 5 },
  { name: "Unusual login times", count: 3 },
  { name: "Clearing system logs", count: 2 },
]

const organizationComplianceData = [
  { name: "Acme Financial", compliant: 35, concerns: 8, violations: 2 },
  { name: "HealthPlus Inc", compliant: 28, concerns: 12, violations: 5 },
  { name: "TechSolutions LLC", compliant: 22, concerns: 6, violations: 4 },
  { name: "Global Banking", compliant: 20, concerns: 4, violations: 2 },
]

// Sample data for red-flagged sessions
const redFlaggedSessions = [
  {
    id: "RS-1003",
    user: "Michael Chen",
    organization: "TechSolutions LLC",
    date: "Mar 26, 2025",
    status: "red",
    issue: "Exported customer data to external device",
  },
  {
    id: "RS-1015",
    user: "Jessica Williams",
    organization: "HealthPlus Inc",
    date: "Mar 25, 2025",
    status: "red",
    issue: "Accessed patient records outside authorized scope",
  },
  {
    id: "RS-1022",
    user: "David Wilson",
    organization: "Acme Financial",
    date: "Mar 24, 2025",
    status: "red",
    issue: "Attempted to clear system logs after accessing sensitive data",
  },
]

export default function ReportsAnalyticsContent() {
  const [dateRange, setDateRange] = useState<{
    from: Date
    to: Date
  }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const [selectedOrganization, setSelectedOrganization] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<string>("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Analyze compliance trends and generate insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 dark:bg-[#1F1F23] dark:text-white dark:hover:bg-[#2B2B30] dark:border-[#2B2B30]"
              >
                <Download className="w-4 h-4" />
                Export Report
                <ChevronDown className="w-3 h-3 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <FileDown className="w-4 h-4" />
                  Export as PDF
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <FileDown className="w-4 h-4" />
                  Export as CSV
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Report
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23]">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Report Filters
          </CardTitle>
          <CardDescription>Customize your report view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date-range"
                    variant="outline"
                    className="w-full justify-start text-left font-normal gap-2"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={(range) => range && setDateRange(range)}
                    initialFocus
                  />
                  <div className="flex items-center justify-between p-3 border-t border-gray-200 dark:border-[#1F1F23]">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDateRange({ from: subDays(new Date(), 7), to: new Date() })}
                    >
                      Last 7 days
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDateRange({ from: subMonths(new Date(), 1), to: new Date() })}
                    >
                      Last 30 days
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Select value={selectedOrganization} onValueChange={setSelectedOrganization}>
                <SelectTrigger id="organization" className="w-full gap-2">
                  <Building className="w-4 h-4" />
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Organizations</SelectItem>
                  <SelectItem value="acme">Acme Financial</SelectItem>
                  <SelectItem value="healthplus">HealthPlus Inc</SelectItem>
                  <SelectItem value="techsolutions">TechSolutions LLC</SelectItem>
                  <SelectItem value="globalbanking">Global Banking Corp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user">User</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger id="user" className="w-full gap-2">
                  <Users className="w-4 h-4" />
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="michael">Michael Chen</SelectItem>
                  <SelectItem value="emily">Emily Rodriguez</SelectItem>
                  <SelectItem value="david">David Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">148</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+12% from previous period</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">71%</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+3% from previous period</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Risk Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">13</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">8.8% of total sessions</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="sessions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sessions" className="gap-2">
            <BarChart className="w-4 h-4" />
            Sessions
          </TabsTrigger>
          <TabsTrigger value="distribution" className="gap-2">
            <PieChart className="w-4 h-4" />
            Status Distribution
          </TabsTrigger>
          <TabsTrigger value="trends" className="gap-2">
            <LineChart className="w-4 h-4" />
            Compliance Trends
          </TabsTrigger>
          <TabsTrigger value="organizations" className="gap-2">
            <Building className="w-4 h-4" />
            Organizations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sessions">
          <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23]">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <BarChart2 className="w-4 h-4" />
                Sessions by Date
              </CardTitle>
              <CardDescription>Number of sessions analyzed per day with status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={sessionsByDateData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="green" name="Compliant" fill="#10b981" stackId="a" />
                    <Bar dataKey="yellow" name="Concerns" fill="#f59e0b" stackId="a" />
                    <Bar dataKey="orange" name="Security Risk" fill="#f97316" stackId="a" />
                    <Bar dataKey="purple" name="Suspicious Activity" fill="#a855f7" stackId="a" />
                    <Bar dataKey="red" name="Violations" fill="#ef4444" stackId="a" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23]">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <PieChart className="w-4 h-4" />
                Status Distribution
              </CardTitle>
              <CardDescription>Distribution of session compliance statuses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={statusDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} sessions`, "Count"]} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23]">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <LineChart className="w-4 h-4" />
                Compliance Trend
              </CardTitle>
              <CardDescription>Monthly compliance rate over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={complianceTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, "Compliance Rate"]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="complianceRate"
                      name="Compliance Rate"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organizations">
          <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23]">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Building className="w-4 h-4" />
                Organization Compliance
              </CardTitle>
              <CardDescription>Compliance breakdown by organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={organizationComplianceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="compliant" name="Compliant" fill="#10b981" stackId="a" />
                    <Bar dataKey="concerns" name="Concerns" fill="#f59e0b" stackId="a" />
                    <Bar dataKey="violations" name="Violations" fill="#ef4444" stackId="a" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23]">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Top Compliance Issues
            </CardTitle>
            <CardDescription>Most frequent policy violations and concerns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topViolationsData.map((violation, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <span className="text-xs font-medium text-red-700 dark:text-red-400">{index + 1}</span>
                    </div>
                    <span>{violation.name}</span>
                  </div>
                  <span className="font-medium">{violation.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Issues
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23]">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Red-Flagged Sessions
            </CardTitle>
            <CardDescription>Sessions requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {redFlaggedSessions.map((session, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{session.id}</span>
                        <Badge
                          variant="outline"
                          className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
                        >
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Violation
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {session.user} • {session.organization} • {session.date}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8">
                      View
                    </Button>
                  </div>
                  <p className="mt-2 text-sm">{session.issue}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Flagged Sessions
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23]">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Report Export Options
          </CardTitle>
          <CardDescription>Generate and share compliance reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-50 dark:bg-[#1F1F23]/50 border-gray-200 dark:border-[#1F1F23]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Compliance Summary</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  High-level overview of compliance status across all sessions
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <FileDown className="w-3.5 h-3.5" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <FileDown className="w-3.5 h-3.5" />
                  CSV
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gray-50 dark:bg-[#1F1F23]/50 border-gray-200 dark:border-[#1F1F23]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Detailed Audit Report</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Comprehensive report with session details and compliance metrics
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <FileDown className="w-3.5 h-3.5" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <FileDown className="w-3.5 h-3.5" />
                  CSV
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gray-50 dark:bg-[#1F1F23]/50 border-gray-200 dark:border-[#1F1F23]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Violations Report</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Focused report on policy violations and high-risk activities
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <FileDown className="w-3.5 h-3.5" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <FileDown className="w-3.5 h-3.5" />
                  CSV
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

