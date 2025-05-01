"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { subDays } from "date-fns"
import {
  BarChart2,
  Download,
  Filter,
  CalendarIcon,
  Users,
  Building,
  AlertTriangle,
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

// Add error boundary to handle resource loading issues
const ReportsAnalyticsContent = () => {
  const [loadError, setLoadError] = useState(false)

  // Add error handling for chart rendering
  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (e.message.includes("Failed to load") || e.message.includes("blob:")) {
        setLoadError(true)
        console.error("Resource loading error:", e.message)
      }
    })

    return () => {
      window.removeEventListener("error", () => {})
    }
  }, [])

  // Sample data for the sessions chart - Updated to use new status types
  const sessionsByDateData = [
    { date: "Mar 21", total: 17, green: 9, yellow: 5, red: 3 },
    { date: "Mar 22", total: 20, green: 12, yellow: 5, red: 3 },
    { date: "Mar 23", total: 23, green: 15, yellow: 5, red: 3 },
    { date: "Mar 24", total: 23, green: 11, yellow: 8, red: 4 },
    { date: "Mar 25", total: 22, green: 13, yellow: 6, red: 3 },
    { date: "Mar 26", total: 22, green: 10, yellow: 7, red: 5 },
    { date: "Mar 27", total: 21, green: 12, yellow: 6, red: 3 },
  ]

  // Updated status distribution data with consolidated categories
  const statusDistributionData = [
    { name: "Compliant", value: 82, color: "#10b981" },
    { name: "Security Risk", value: 55, color: "#eab308" }, // Combined Concerns, Security Risk, and Suspicious Activity
    { name: "Violations", value: 11, color: "#ef4444" },
  ]

  // Compliance trend data
  const complianceTrendData = [
    { month: "Jan", complianceRate: 72 },
    { month: "Feb", complianceRate: 68 },
    { month: "Mar", complianceRate: 75 },
    { month: "Apr", complianceRate: 82 },
    { month: "May", complianceRate: 79 },
    { month: "Jun", complianceRate: 85 },
  ]

  // Updated organization compliance data with consolidated categories
  const organizationComplianceData = [
    { name: "Acme Financial", compliant: 35, securityRisk: 8, violations: 2 },
    { name: "HealthPlus Inc", compliant: 28, securityRisk: 12, violations: 5 },
    { name: "TechSolutions LLC", compliant: 22, securityRisk: 6, violations: 4 },
    { name: "Global Banking", compliant: 20, securityRisk: 4, violations: 2 },
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

  // Top violations data
  const topViolationsData = [
    { name: "Unauthorized data export", count: 8 },
    { name: "Accessing sensitive records", count: 6 },
    { name: "Exceeding declared scope", count: 5 },
    { name: "Unusual login times", count: 3 },
    { name: "Clearing system logs", count: 2 },
  ]

  // Complete component with all charts
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const [selectedOrganization, setSelectedOrganization] = useState("all")
  const [selectedUser, setSelectedUser] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Analyze compliance trends and generate insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-2 dark:bg-[#1F1F23] dark:text-white dark:hover:bg-[#2B2B30] dark:border-[#2B2B30]"
          >
            <Download className="w-4 h-4" />
            Export Report
          </Button>
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
              <Button id="date-range" variant="outline" className="w-full justify-start text-left font-normal gap-2">
                <CalendarIcon className="w-4 h-4" />
                Last 7 days
              </Button>
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

      {/* Tabs with all charts */}
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
                {loadError ? (
                  <div className="flex items-center justify-center h-[400px] w-full">
                    <p className="text-gray-500">Chart data could not be loaded</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={sessionsByDateData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="green" name="Compliant" fill="#10b981" stackId="a" />
                      <Bar dataKey="yellow" name="Security Risk" fill="#eab308" stackId="a" />
                      <Bar dataKey="red" name="Violations" fill="#ef4444" stackId="a" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                )}
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
                {loadError ? (
                  <div className="flex items-center justify-center h-[400px] w-full">
                    <p className="text-gray-500">Chart data could not be loaded</p>
                  </div>
                ) : (
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
                )}
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
                {loadError ? (
                  <div className="flex items-center justify-center h-[400px] w-full">
                    <p className="text-gray-500">Chart data could not be loaded</p>
                  </div>
                ) : (
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
                )}
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
                {loadError ? (
                  <div className="flex items-center justify-center h-[400px] w-full">
                    <p className="text-gray-500">Chart data could not be loaded</p>
                  </div>
                ) : (
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
                      <Bar dataKey="securityRisk" name="Security Risk" fill="#eab308" stackId="a" />
                      <Bar dataKey="violations" name="Violations" fill="#ef4444" stackId="a" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                )}
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
          <CardTitle className="text-lg font-bold flex items-center gap-2">Report Export Options</CardTitle>
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
                  PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
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
                  PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
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
                  PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
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

export default ReportsAnalyticsContent
