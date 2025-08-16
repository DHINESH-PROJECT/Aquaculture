"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  Users,
  TrendingUp,
  Recycle,
  Brain,
  Target,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  LineChartIcon,
} from "lucide-react"

// Mock data for user statistics
const userStats = {
  totalUsers: 1247,
  activeUsers: 892,
  newUsersThisMonth: 156,
  userGrowthRate: 12.5,
  usersByRole: [
    { role: "Fish Farmers", count: 523, color: "#0ea5e9" },
    { role: "Waste Agents", count: 341, color: "#10b981" },
    { role: "Vendors", count: 289, color: "#f59e0b" },
    { role: "Administrators", count: 94, color: "#8b5cf6" },
  ],
}

// Mock data for waste volume by source
const wasteVolumeBySource = [
  { source: "Restaurants", volume: 2450, percentage: 35 },
  { source: "Markets", volume: 1890, percentage: 27 },
  { source: "Households", volume: 1340, percentage: 19 },
  { source: "Food Processing", volume: 980, percentage: 14 },
  { source: "Hotels", volume: 340, percentage: 5 },
]

// Mock data for waste volume over time
const wasteVolumeOverTime = [
  { month: "Jan", volume: 5200, processed: 4680, efficiency: 90 },
  { month: "Feb", volume: 5800, processed: 5220, efficiency: 90 },
  { month: "Mar", volume: 6200, processed: 5580, efficiency: 90 },
  { month: "Apr", volume: 6800, processed: 6120, efficiency: 90 },
  { month: "May", volume: 7200, processed: 6840, efficiency: 95 },
  { month: "Jun", volume: 7000, processed: 6650, efficiency: 95 },
  { month: "Jul", volume: 7500, processed: 7125, efficiency: 95 },
  { month: "Aug", volume: 8000, processed: 7600, efficiency: 95 },
]

// Mock data for AI model performance
const aiModelMetrics = {
  accuracy: 94.2,
  precision: 91.8,
  recall: 96.5,
  f1Score: 94.1,
  lastUpdated: "2024-08-15T10:30:00Z",
}

// Mock data for AI model performance over time
const modelPerformanceOverTime = [
  { month: "Jan", accuracy: 87.2, precision: 84.5, recall: 89.8, f1Score: 87.1 },
  { month: "Feb", accuracy: 88.5, precision: 86.2, recall: 90.9, f1Score: 88.5 },
  { month: "Mar", accuracy: 89.8, precision: 87.8, recall: 91.8, f1Score: 89.8 },
  { month: "Apr", accuracy: 91.2, precision: 89.1, recall: 93.4, f1Score: 91.2 },
  { month: "May", accuracy: 92.5, precision: 90.3, recall: 94.8, f1Score: 92.5 },
  { month: "Jun", accuracy: 93.1, precision: 90.9, recall: 95.4, f1Score: 93.1 },
  { month: "Jul", accuracy: 93.8, precision: 91.5, recall: 96.1, f1Score: 93.8 },
  { month: "Aug", accuracy: 94.2, precision: 91.8, recall: 96.5, f1Score: 94.1 },
]

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"]

export default function UserManagementPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user management data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Recycle className="h-8 w-8 text-teal-600" />
                <span className="text-xl font-bold text-gray-900">Aqua Culture</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">
                How It Works
              </Link>
              <Link href="/resources" className="text-gray-600 hover:text-gray-900">
                Resources
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/user-management" className="text-teal-600 font-medium">
                User Management
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Monitor user activity, waste processing analytics, and AI model performance</p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Statistics
            </TabsTrigger>
            <TabsTrigger value="waste" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Waste Analytics
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Performance
            </TabsTrigger>
          </TabsList>

          {/* User Statistics Tab */}
          <TabsContent value="users" className="space-y-6">
            {/* User Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{userStats.newUsersThisMonth} from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.activeUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {((userStats.activeUsers / userStats.totalUsers) * 100).toFixed(1)}% of total users
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{userStats.userGrowthRate}%</div>
                  <p className="text-xs text-muted-foreground">Monthly growth rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Users</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.newUsersThisMonth}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Users by Role */}
            <Card>
              <CardHeader>
                <CardTitle>Users by Role</CardTitle>
                <CardDescription>Distribution of users across different roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userStats.usersByRole}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ role, percentage }) => `${role}: ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {userStats.usersByRole.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    {userStats.usersByRole.map((role, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: role.color }}></div>
                          <span className="font-medium">{role.role}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{role.count}</div>
                          <div className="text-sm text-gray-500">
                            {((role.count / userStats.totalUsers) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Waste Analytics Tab */}
          <TabsContent value="waste" className="space-y-6">
            {/* Waste Volume by Source */}
            <Card>
              <CardHeader>
                <CardTitle>Waste Volume by Source</CardTitle>
                <CardDescription>Distribution of waste collection by different sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={wasteVolumeBySource}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="source" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value} kg`, "Volume"]}
                        labelFormatter={(label) => `Source: ${label}`}
                      />
                      <Bar dataKey="volume" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Waste Volume Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Waste Volume Over Time</CardTitle>
                <CardDescription>Monthly waste collection and processing trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={wasteVolumeOverTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => [`${value} kg`, name === "volume" ? "Collected" : "Processed"]}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="volume"
                        stackId="1"
                        stroke="#0ea5e9"
                        fill="#0ea5e9"
                        fillOpacity={0.6}
                        name="Collected"
                      />
                      <Area
                        type="monotone"
                        dataKey="processed"
                        stackId="2"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.8}
                        name="Processed"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Processing Efficiency */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">54,700 kg</div>
                  <p className="text-xs text-muted-foreground">This year</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Processed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">51,815 kg</div>
                  <p className="text-xs text-muted-foreground">94.7% efficiency</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Average Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92.8%</div>
                  <Progress value={92.8} className="mt-2" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Performance Tab */}
          <TabsContent value="ai" className="space-y-6">
            {/* Current AI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{aiModelMetrics.accuracy}%</div>
                  <Progress value={aiModelMetrics.accuracy} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Precision</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{aiModelMetrics.precision}%</div>
                  <Progress value={aiModelMetrics.precision} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recall</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{aiModelMetrics.recall}%</div>
                  <Progress value={aiModelMetrics.recall} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">F1 Score</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{aiModelMetrics.f1Score}%</div>
                  <Progress value={aiModelMetrics.f1Score} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Model Performance Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>AI Model Performance Over Time</CardTitle>
                <CardDescription>
                  Tracking accuracy, precision, recall, and F1 score trends
                  <Badge variant="outline" className="ml-2">
                    <Clock className="h-3 w-3 mr-1" />
                    Last updated: {new Date(aiModelMetrics.lastUpdated).toLocaleDateString()}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={modelPerformanceOverTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip
                        formatter={(value, name) => [`${value}%`, name.charAt(0).toUpperCase() + name.slice(1)]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#0ea5e9"
                        strokeWidth={2}
                        dot={{ fill: "#0ea5e9", strokeWidth: 2, r: 4 }}
                        name="Accuracy"
                      />
                      <Line
                        type="monotone"
                        dataKey="precision"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        name="Precision"
                      />
                      <Line
                        type="monotone"
                        dataKey="recall"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                        name="Recall"
                      />
                      <Line
                        type="monotone"
                        dataKey="f1Score"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                        name="F1 Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Model Status and Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Model Status</CardTitle>
                  <CardDescription>Current AI model operational status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Model Health</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Last Training</span>
                    <span className="text-sm text-gray-600">2 days ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Model Version</span>
                    <span className="text-sm font-mono">v2.1.3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data Quality</span>
                    <Badge variant="outline">95.2%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Model Actions</CardTitle>
                  <CardDescription>Manage and optimize AI model performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="default">
                    <Brain className="h-4 w-4 mr-2" />
                    Retrain Model
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <LineChartIcon className="h-4 w-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Export Performance Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Aqua Culture</h3>
              <p className="text-gray-400 text-sm">
                Transforming food waste into premium fish feed for sustainable aquaculture.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-white">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/fish-farming-guide" className="hover:text-white">
                    Fish Farming Guide
                  </Link>
                </li>
                <li>
                  <Link href="/delivery-tracking" className="hover:text-white">
                    Delivery Tracking
                  </Link>
                </li>
                <li>
                  <Link href="/payments" className="hover:text-white">
                    Payments
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+91 98765 43210</li>
                <li>support@aquaculture.com</li>
                <li>Bangalore, Karnataka</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© 2024 Aqua Culture. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
