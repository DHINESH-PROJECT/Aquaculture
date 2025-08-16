"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts"
import { dataManager, type Operation, type Farmer, type WasteCollection, type SystemMetrics } from "@/lib/data-manager"
import { Eye, Users, Truck, BarChart3, Recycle } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const generateRealtimeData = () => {
  const baseData = [
    { month: "Jan", processed: 850, collected: 920, farmers: 45, efficiency: 92.4 },
    { month: "Feb", processed: 1200, collected: 1350, farmers: 52, efficiency: 88.9 },
    { month: "Mar", processed: 1450, collected: 1600, farmers: 58, efficiency: 90.6 },
    { month: "Apr", processed: 1680, collected: 1800, farmers: 65, efficiency: 93.3 },
    { month: "May", processed: 1920, collected: 2100, farmers: 72, efficiency: 91.4 },
    { month: "Jun", processed: 2150, collected: 2300, farmers: 78, efficiency: 93.5 },
  ]

  return baseData.map((item) => ({
    ...item,
    processed: item.processed + Math.floor(Math.random() * 100 - 50),
    collected: item.collected + Math.floor(Math.random() * 100 - 50),
    efficiency: Math.max(85, Math.min(98, item.efficiency + (Math.random() * 4 - 2))),
  }))
}

const dailyActivityData = [
  { hour: "00:00", collections: 2, processing: 1, deliveries: 0 },
  { hour: "04:00", collections: 5, processing: 3, deliveries: 1 },
  { hour: "08:00", collections: 12, processing: 8, deliveries: 4 },
  { hour: "12:00", collections: 18, processing: 15, deliveries: 8 },
  { hour: "16:00", collections: 15, processing: 12, deliveries: 10 },
  { hour: "20:00", collections: 8, processing: 6, deliveries: 5 },
]

const farmerLocationData = [
  { region: "North District", farmers: 25, wasteProcessed: 850, color: "#10b981" },
  { region: "South District", farmers: 20, wasteProcessed: 720, color: "#3b82f6" },
  { region: "East District", farmers: 18, wasteProcessed: 650, color: "#f59e0b" },
  { region: "West District", farmers: 15, wasteProcessed: 580, color: "#ef4444" },
]

const generateWaterQualityData = () => {
  const baseData = [
    { time: "00:00", ph: 7.2, temperature: 24.5, oxygen: 8.2, ammonia: 0.15, turbidity: 2.1 },
    { time: "04:00", ph: 7.1, temperature: 23.8, oxygen: 8.5, ammonia: 0.12, turbidity: 1.9 },
    { time: "08:00", ph: 7.3, temperature: 25.2, oxygen: 7.8, ammonia: 0.18, turbidity: 2.3 },
    { time: "12:00", ph: 7.4, temperature: 26.8, oxygen: 7.2, ammonia: 0.22, turbidity: 2.8 },
    { time: "16:00", ph: 7.2, temperature: 27.1, oxygen: 6.9, ammonia: 0.25, turbidity: 3.1 },
    { time: "20:00", ph: 7.0, temperature: 25.6, oxygen: 7.6, ammonia: 0.19, turbidity: 2.5 },
  ]

  return baseData.map((item) => ({
    ...item,
    ph: Math.max(6.5, Math.min(8.0, item.ph + (Math.random() * 0.4 - 0.2))),
    temperature: Math.max(20, Math.min(30, item.temperature + (Math.random() * 2 - 1))),
    oxygen: Math.max(5, Math.min(10, item.oxygen + (Math.random() * 1 - 0.5))),
    ammonia: Math.max(0.05, Math.min(0.5, item.ammonia + (Math.random() * 0.1 - 0.05))),
    turbidity: Math.max(1, Math.min(5, item.turbidity + (Math.random() * 0.5 - 0.25))),
  }))
}

const fishFeedingRecommendations = [
  {
    id: 1,
    feedType: "High Protein Pellets",
    amount: "2.5 kg",
    frequency: "3x daily",
    reason: "Optimal temperature (25-27°C) and good oxygen levels",
    status: "recommended",
    waterConditions: { tempRange: "25-27°C", phRange: "7.0-7.5", oxygenMin: 7.0 },
  },
  {
    id: 2,
    feedType: "Vegetable Mix",
    amount: "1.8 kg",
    frequency: "2x daily",
    reason: "Slightly elevated ammonia levels detected",
    status: "caution",
    waterConditions: { tempRange: "23-25°C", phRange: "6.8-7.2", oxygenMin: 6.5 },
  },
  {
    id: 3,
    feedType: "Reduced Feed",
    amount: "1.0 kg",
    frequency: "1x daily",
    reason: "Low oxygen levels - reduce feeding to prevent stress",
    status: "alert",
    waterConditions: { tempRange: "20-23°C", phRange: "6.5-7.0", oxygenMin: 5.0 },
  },
]

export default function Dashboard() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalProcessed: 0,
    activeOperations: 0,
    totalFarmers: 0,
    efficiencyRate: 0,
    lastUpdated: new Date().toISOString(),
  })
  const [operations, setOperations] = useState<Operation[]>([])
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [collections, setCollections] = useState<WasteCollection[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [wasteProcessingData, setWasteProcessingData] = useState(generateRealtimeData())
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("processed")
  const [hoveredData, setHoveredData] = useState(null)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [scheduleForm, setScheduleForm] = useState({
    location: "",
    date: "",
    time: "",
    wasteType: "food-scraps",
    estimatedAmount: "",
    notes: "",
  })
  const [reportForm, setReportForm] = useState({
    reportType: "monthly",
    dateRange: "30days",
    includeCharts: true,
    format: "pdf",
  })
  const [notifications, setNotifications] = useState<
    Array<{
      id: number
      message: string
      type: string
      timestamp: string
    }>
  >([])
  const [isChartReady, setIsChartReady] = useState(false)

  const [waterQualityData, setWaterQualityData] = useState(generateWaterQualityData())
  const [currentWaterStats, setCurrentWaterStats] = useState({
    ph: 7.2,
    temperature: 25.4,
    oxygen: 7.8,
    ammonia: 0.18,
    turbidity: 2.3,
  })
  const [feedingRecommendation, setFeedingRecommendation] = useState(fishFeedingRecommendations[0])

  const [isDataViewerOpen, setIsDataViewerOpen] = useState(false)
  const [isOperationDetailsOpen, setIsOperationDetailsOpen] = useState(false)
  const [isFarmerDetailsOpen, setIsFarmerDetailsOpen] = useState(false)
  const [isCollectionDetailsOpen, setIsCollectionDetailsOpen] = useState(false)
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null)
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null)
  const [selectedCollection, setSelectedCollection] = useState<WasteCollection | null>(null)
  const [dataViewType, setDataViewType] = useState<"operations" | "farmers" | "collections" | "analytics">("operations")

  useEffect(() => {
    const handleResizeObserverError = (e: ErrorEvent) => {
      if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    window.addEventListener("error", handleResizeObserverError)

    // Set chart ready after a brief delay to ensure containers are sized
    const timer = setTimeout(() => {
      setIsChartReady(true)
    }, 100)

    return () => {
      window.removeEventListener("error", handleResizeObserverError)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const loadData = () => {
      try {
        const loadedMetrics = dataManager.getMetrics()
        const loadedOperations = dataManager.getOperations()
        const loadedFarmers = dataManager.getFarmers()
        const loadedCollections = dataManager.getCollections()

        setMetrics(loadedMetrics)
        setOperations(loadedOperations)
        setFarmers(loadedFarmers)
        setCollections(loadedCollections)

        console.log("[v0] Data loaded successfully:", {
          operations: loadedOperations.length,
          farmers: loadedFarmers.length,
          collections: loadedCollections.length,
        })
      } catch (error) {
        console.error("[v0] Error loading data:", error)
      }
    }

    loadData()
  }, [])

  const debouncedUpdateData = useCallback(() => {
    if (!isChartReady) return

    const currentMetrics = dataManager.getMetrics()
    const updatedMetrics = {
      ...currentMetrics,
      totalProcessed: currentMetrics.totalProcessed + Math.floor(Math.random() * 5),
      lastUpdated: new Date().toISOString(),
    }
    dataManager.updateMetrics(updatedMetrics)
    setMetrics(updatedMetrics)
    setWasteProcessingData(generateRealtimeData())
  }, [isChartReady])

  const updateWaterQuality = useCallback(() => {
    if (!isChartReady) return

    const newData = generateWaterQualityData()
    setWaterQualityData(newData)

    const latest = newData[newData.length - 1]
    setCurrentWaterStats({
      ph: latest.ph,
      temperature: latest.temperature,
      oxygen: latest.oxygen,
      ammonia: latest.ammonia,
      turbidity: latest.turbidity,
    })

    // Determine feeding recommendation based on water conditions
    let recommendation = fishFeedingRecommendations[0] // default

    if (latest.oxygen < 6.5 || latest.ammonia > 0.3) {
      recommendation = fishFeedingRecommendations[2] // alert
    } else if (latest.ph < 6.8 || latest.ph > 7.6 || latest.ammonia > 0.2) {
      recommendation = fishFeedingRecommendations[1] // caution
    }

    setFeedingRecommendation(recommendation)
  }, [isChartReady])

  useEffect(() => {
    const interval = setInterval(() => {
      debouncedUpdateData()
      updateWaterQuality()
    }, 5000)
    return () => clearInterval(interval)
  }, [debouncedUpdateData, updateWaterQuality])

  const addNotification = (message: string, type = "info") => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
    }
    setNotifications((prev) => [newNotification, ...prev.slice(0, 4)])
  }

  const handleStartProcessing = () => {
    setIsProcessing(true)
    console.log("[v0] Starting new processing operation...")

    const newOperation = dataManager.addOperation({
      type: "Processing",
      location: "Automated Processing Unit",
      amount: `${Math.floor(Math.random() * 100 + 50)} kg`,
      status: "in-progress",
      wasteType: "mixed-organic",
      assignedTo: "System Automated",
      notes: "Automated processing initiated from dashboard",
    })

    setTimeout(() => {
      setIsProcessing(false)

      // Update operation to completed
      dataManager.updateOperation(newOperation.id, { status: "completed" })

      // Update metrics
      const updatedMetrics = dataManager.updateMetrics({
        activeOperations: metrics.activeOperations + 1,
        totalProcessed: metrics.totalProcessed + Number.parseInt(newOperation.amount.replace(/\D/g, "")),
      })

      setOperations(dataManager.getOperations())
      setMetrics(updatedMetrics)
      addNotification("New processing operation completed successfully", "success")

      if (typeof toast === "function") {
        toast({
          title: "Operation Completed",
          description: `Processed ${newOperation.amount} of ${newOperation.wasteType}`,
        })
      }
    }, 3000)
  }

  const handleScheduleCollection = () => {
    console.log("[v0] Scheduling collection with data:", scheduleForm)

    const newCollection = dataManager.addCollection({
      location: scheduleForm.location,
      scheduledDate: scheduleForm.date,
      scheduledTime: scheduleForm.time,
      wasteType: scheduleForm.wasteType,
      estimatedAmount: scheduleForm.estimatedAmount,
      status: "scheduled",
      notes: scheduleForm.notes,
    })

    setTimeout(() => {
      setCollections(dataManager.getCollections())
      addNotification(`Collection scheduled for ${scheduleForm.location} on ${scheduleForm.date}`, "info")

      setIsScheduleDialogOpen(false)
      setScheduleForm({
        location: "",
        date: "",
        time: "",
        wasteType: "food-scraps",
        estimatedAmount: "",
        notes: "",
      })

      if (typeof toast === "function") {
        toast({
          title: "Collection Scheduled",
          description: `Pickup scheduled for ${newCollection.location}`,
        })
      }
    }, 1000)
  }

  const handleGenerateReport = () => {
    setIsGeneratingReport(true)
    console.log("[v0] Generating report with options:", reportForm)

    setTimeout(() => {
      setIsGeneratingReport(false)
      setIsReportDialogOpen(false)

      const reportData = {
        operations: dataManager.getOperations(),
        farmers: dataManager.getFarmers(),
        collections: dataManager.getCollections(),
        metrics: dataManager.getMetrics(),
        analytics: {
          operationsByStatus: dataManager.getOperationsByStatus(),
          wasteByType: dataManager.getWasteByType(),
          farmersByRegion: dataManager.getFarmersByRegion(),
        },
      }

      console.log("[v0] Report data generated:", reportData)
      addNotification(`${reportForm.reportType} report generated successfully`, "success")

      if (typeof toast === "function") {
        toast({
          title: "Report Generated",
          description: `Your ${reportForm.reportType} report is ready for download.`,
        })
      }
    }, 2000)
  }

  const handleEmergencyStop = () => {
    console.log("[v0] Emergency stop activated")

    const activeOps = operations.filter((op) => op.status === "in-progress")
    activeOps.forEach((op) => {
      dataManager.updateOperation(op.id, { status: "cancelled", notes: "Emergency stop activated" })
    })

    const updatedMetrics = dataManager.updateMetrics({
      activeOperations: 0,
    })

    setOperations(dataManager.getOperations())
    setMetrics(updatedMetrics)
    setIsProcessing(false)
    addNotification("Emergency stop activated - All operations halted", "warning")

    if (typeof toast === "function") {
      toast({
        title: "Emergency Stop",
        description: "All operations have been halted for safety.",
        variant: "destructive",
      })
    }
  }

  const handleChartClick = (data, index) => {
    console.log("[v0] Chart clicked:", data, index)
    setHoveredData(data)
  }

  const handleTimeRangeChange = (value) => {
    setSelectedTimeRange(value)
    if (value === "3months") {
      setWasteProcessingData(generateRealtimeData().slice(-3))
    } else {
      setWasteProcessingData(generateRealtimeData())
    }
  }

  const getWaterQualityStatus = (parameter: string, value: number) => {
    const ranges = {
      ph: { optimal: [6.8, 7.5], acceptable: [6.5, 8.0] },
      temperature: { optimal: [24, 28], acceptable: [20, 32] },
      oxygen: { optimal: [7, 10], acceptable: [5, 12] },
      ammonia: { optimal: [0, 0.2], acceptable: [0, 0.5] },
      turbidity: { optimal: [0, 3], acceptable: [0, 5] },
    }

    const range = ranges[parameter]
    if (!range) return "unknown"

    if (value >= range.optimal[0] && value <= range.optimal[1]) return "optimal"
    if (value >= range.acceptable[0] && value <= range.acceptable[1]) return "acceptable"
    return "critical"
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-semibold">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}${entry.name.includes("kg") ? " kg" : entry.name.includes("%") ? "%" : ""}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const ChartWrapper = ({ children, height = 300 }: { children: React.ReactNode; height?: number }) => (
    <div style={{ width: "100%", height: `${height}px`, minHeight: `${height}px` }}>
      {isChartReady ? (
        children
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500">Loading chart...</div>
        </div>
      )}
    </div>
  )

  const handleViewOperationDetails = (operation: Operation) => {
    setSelectedOperation(operation)
    setIsOperationDetailsOpen(true)
  }

  const handleViewFarmerDetails = (farmer: Farmer) => {
    setSelectedFarmer(farmer)
    setIsFarmerDetailsOpen(true)
  }

  const handleViewCollectionDetails = (collection: WasteCollection) => {
    setSelectedCollection(collection)
    setIsCollectionDetailsOpen(true)
  }

  const handleOpenDataViewer = (type: "operations" | "farmers" | "collections" | "analytics") => {
    setDataViewType(type)
    setIsDataViewerOpen(true)
  }

  const handleUpdateOperationStatus = (operationId: string, newStatus: string) => {
    dataManager.updateOperation(operationId, { status: newStatus })
    setOperations(dataManager.getOperations())
    addNotification(`Operation status updated to ${newStatus}`, "success")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Recycle className="h-8 w-8 text-teal-600" />
                <span className="text-xl font-bold text-gray-900">Aqua Culture</span>
              </Link>
              <Badge variant="secondary">Dashboard</Badge>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/resources" className="text-gray-600 hover:text-gray-900">
                Resources
              </Link>
              <Button variant="outline" size="sm">
                Settings
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => handleOpenDataViewer("operations")} variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              View All Operations
            </Button>
            <Button onClick={() => handleOpenDataViewer("farmers")} variant="outline">
              <Users className="w-4 h-4 mr-2" />
              View All Farmers
            </Button>
            <Button onClick={() => handleOpenDataViewer("collections")} variant="outline">
              <Truck className="w-4 h-4 mr-2" />
              View All Collections
            </Button>
            <Button onClick={() => handleOpenDataViewer("analytics")} variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Detailed Analytics
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Operations Dashboard</h1>
            <p className="text-gray-600">Monitor and manage waste processing operations in real-time</p>
            <p className="text-sm text-gray-500 mt-1">Last updated: {new Date(metrics.lastUpdated).toLocaleString()}</p>
          </div>

          {notifications.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            notification.type === "success"
                              ? "bg-green-500"
                              : notification.type === "warning"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        ></div>
                        <span className="text-sm">{notification.message}</span>
                      </div>
                      <span className="text-xs text-gray-500">{notification.timestamp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{metrics.activeOperations}</div>
                <p className="text-xs text-gray-500">Currently running</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Processed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{metrics.totalProcessed.toLocaleString()} kg</div>
                <p className="text-xs text-green-500">+2.5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Fish Farmers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-teal-600">{farmers.length}</div>
                <p className="text-xs text-green-500">+{farmers.filter((f) => f.status === "active").length} active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Efficiency Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{metrics.efficiencyRate.toFixed(1)}%</div>
                <p className="text-xs text-green-500">+1.2% improvement</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Operation Controls</CardTitle>
              <CardDescription>Manage waste processing operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={handleStartProcessing}
                  disabled={isProcessing}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isProcessing ? "Processing..." : "Start New Operation"}
                </Button>

                <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Schedule Collection</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Schedule Waste Collection</DialogTitle>
                      <DialogDescription>Schedule a new waste collection from a specific location.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={scheduleForm.location}
                          onChange={(e) => setScheduleForm((prev) => ({ ...prev, location: e.target.value }))}
                          className="col-span-3"
                          placeholder="e.g., Downtown Market"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                          Date
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={scheduleForm.date}
                          onChange={(e) => setScheduleForm((prev) => ({ ...prev, date: e.target.value }))}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">
                          Time
                        </Label>
                        <Input
                          id="time"
                          type="time"
                          value={scheduleForm.time}
                          onChange={(e) => setScheduleForm((prev) => ({ ...prev, time: e.target.value }))}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="wasteType" className="text-right">
                          Waste Type
                        </Label>
                        <Select
                          value={scheduleForm.wasteType}
                          onValueChange={(value) => setScheduleForm((prev) => ({ ...prev, wasteType: value }))}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="food-scraps">Food Scraps</SelectItem>
                            <SelectItem value="garden-waste">Garden Waste</SelectItem>
                            <SelectItem value="paper-waste">Paper Waste</SelectItem>
                            <SelectItem value="mixed-organic">Mixed Organic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                          Est. Amount
                        </Label>
                        <Input
                          id="amount"
                          value={scheduleForm.estimatedAmount}
                          onChange={(e) => setScheduleForm((prev) => ({ ...prev, estimatedAmount: e.target.value }))}
                          className="col-span-3"
                          placeholder="e.g., 150 kg"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notes" className="text-right">
                          Notes
                        </Label>
                        <Textarea
                          id="notes"
                          value={scheduleForm.notes}
                          onChange={(e) => setScheduleForm((prev) => ({ ...prev, notes: e.target.value }))}
                          className="col-span-3"
                          placeholder="Additional instructions..."
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleScheduleCollection}>
                        Schedule Collection
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Generate Report</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Generate Operations Report</DialogTitle>
                      <DialogDescription>Create a detailed report of waste processing operations.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="reportType" className="text-right">
                          Report Type
                        </Label>
                        <Select
                          value={reportForm.reportType}
                          onValueChange={(value) => setReportForm((prev) => ({ ...prev, reportType: value }))}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily Summary</SelectItem>
                            <SelectItem value="weekly">Weekly Report</SelectItem>
                            <SelectItem value="monthly">Monthly Report</SelectItem>
                            <SelectItem value="quarterly">Quarterly Analysis</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dateRange" className="text-right">
                          Date Range
                        </Label>
                        <Select
                          value={reportForm.dateRange}
                          onValueChange={(value) => setReportForm((prev) => ({ ...prev, dateRange: value }))}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7days">Last 7 Days</SelectItem>
                            <SelectItem value="30days">Last 30 Days</SelectItem>
                            <SelectItem value="90days">Last 90 Days</SelectItem>
                            <SelectItem value="1year">Last Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="format" className="text-right">
                          Format
                        </Label>
                        <Select
                          value={reportForm.format}
                          onValueChange={(value) => setReportForm((prev) => ({ ...prev, format: value }))}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF Document</SelectItem>
                            <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                            <SelectItem value="csv">CSV Data</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleGenerateReport} disabled={isGeneratingReport}>
                        {isGeneratingReport ? "Generating..." : "Generate Report"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Emergency Stop</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Emergency Stop</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will immediately halt all active operations. This action should only be used in emergency
                        situations. Are you sure you want to proceed?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleEmergencyStop} className="bg-red-600 hover:bg-red-700">
                        Emergency Stop
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Water Quality & Fish Feeding Management
              </CardTitle>
              <CardDescription>
                Real-time water monitoring with intelligent feeding recommendations for optimal fish health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Current Water Parameters */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Current Water Parameters</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{currentWaterStats.ph.toFixed(1)}</div>
                      <div className="text-sm text-gray-600">pH Level</div>
                      <Badge
                        variant={
                          getWaterQualityStatus("ph", currentWaterStats.ph) === "optimal"
                            ? "default"
                            : getWaterQualityStatus("ph", currentWaterStats.ph) === "acceptable"
                              ? "secondary"
                              : "destructive"
                        }
                        className="mt-1 text-xs"
                      >
                        {getWaterQualityStatus("ph", currentWaterStats.ph)}
                      </Badge>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {currentWaterStats.temperature.toFixed(1)}°C
                      </div>
                      <div className="text-sm text-gray-600">Temperature</div>
                      <Badge
                        variant={
                          getWaterQualityStatus("temperature", currentWaterStats.temperature) === "optimal"
                            ? "default"
                            : getWaterQualityStatus("temperature", currentWaterStats.temperature) === "acceptable"
                              ? "secondary"
                              : "destructive"
                        }
                        className="mt-1 text-xs"
                      >
                        {getWaterQualityStatus("temperature", currentWaterStats.temperature)}
                      </Badge>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {currentWaterStats.oxygen.toFixed(1)} mg/L
                      </div>
                      <div className="text-sm text-gray-600">Dissolved O₂</div>
                      <Badge
                        variant={
                          getWaterQualityStatus("oxygen", currentWaterStats.oxygen) === "optimal"
                            ? "default"
                            : getWaterQualityStatus("oxygen", currentWaterStats.oxygen) === "acceptable"
                              ? "secondary"
                              : "destructive"
                        }
                        className="mt-1 text-xs"
                      >
                        {getWaterQualityStatus("oxygen", currentWaterStats.oxygen)}
                      </Badge>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{currentWaterStats.ammonia.toFixed(2)} mg/L</div>
                      <div className="text-sm text-gray-600">Ammonia</div>
                      <Badge
                        variant={
                          getWaterQualityStatus("ammonia", currentWaterStats.ammonia) === "optimal"
                            ? "default"
                            : getWaterQualityStatus("ammonia", currentWaterStats.ammonia) === "acceptable"
                              ? "secondary"
                              : "destructive"
                        }
                        className="mt-1 text-xs"
                      >
                        {getWaterQualityStatus("ammonia", currentWaterStats.ammonia)}
                      </Badge>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {currentWaterStats.turbidity.toFixed(1)} NTU
                      </div>
                      <div className="text-sm text-gray-600">Turbidity</div>
                      <Badge
                        variant={
                          getWaterQualityStatus("turbidity", currentWaterStats.turbidity) === "optimal"
                            ? "default"
                            : getWaterQualityStatus("turbidity", currentWaterStats.turbidity) === "acceptable"
                              ? "secondary"
                              : "destructive"
                        }
                        className="mt-1 text-xs"
                      >
                        {getWaterQualityStatus("turbidity", currentWaterStats.turbidity)}
                      </Badge>
                    </div>
                  </div>

                  {/* Water Quality Charts */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">24-Hour Water Quality Trends</h4>
                      <ChartWrapper height={250}>
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={waterQualityData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="ph"
                              stroke="#3b82f6"
                              strokeWidth={2}
                              name="pH Level"
                            />
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="temperature"
                              stroke="#f59e0b"
                              strokeWidth={2}
                              name="Temperature (°C)"
                            />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="oxygen"
                              stroke="#10b981"
                              strokeWidth={2}
                              name="Oxygen (mg/L)"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartWrapper>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Ammonia & Turbidity Levels</h4>
                      <ChartWrapper height={200}>
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart data={waterQualityData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="ammonia"
                              stackId="1"
                              stroke="#ef4444"
                              fill="#ef4444"
                              fillOpacity={0.6}
                              name="Ammonia (mg/L)"
                            />
                            <Area
                              type="monotone"
                              dataKey="turbidity"
                              stackId="2"
                              stroke="#8b5cf6"
                              fill="#8b5cf6"
                              fillOpacity={0.6}
                              name="Turbidity (NTU)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </ChartWrapper>
                    </div>
                  </div>
                </div>

                {/* Fish Feeding Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Fish Feeding Recommendations</h3>
                  <div className="space-y-4">
                    <Card
                      className={`border-2 ${
                        feedingRecommendation.status === "recommended"
                          ? "border-green-200 bg-green-50"
                          : feedingRecommendation.status === "caution"
                            ? "border-yellow-200 bg-yellow-50"
                            : "border-red-200 bg-red-50"
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{feedingRecommendation.feedType}</CardTitle>
                          <Badge
                            variant={
                              feedingRecommendation.status === "recommended"
                                ? "default"
                                : feedingRecommendation.status === "caution"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {feedingRecommendation.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium">Amount: {feedingRecommendation.amount}</div>
                            <div className="text-sm font-medium">Frequency: {feedingRecommendation.frequency}</div>
                          </div>
                          <div className="text-sm text-gray-600">
                            <strong>Reason:</strong> {feedingRecommendation.reason}
                          </div>
                          <div className="text-xs text-gray-500 bg-white p-2 rounded">
                            <strong>Optimal Conditions:</strong>
                            <br />
                            Temp: {feedingRecommendation.waterConditions.tempRange}
                            <br />
                            pH: {feedingRecommendation.waterConditions.phRange}
                            <br />
                            O₂: ≥{feedingRecommendation.waterConditions.oxygenMin} mg/L
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Alternative Feed Options:</h4>
                      {fishFeedingRecommendations
                        .filter((rec) => rec.id !== feedingRecommendation.id)
                        .slice(0, 2)
                        .map((rec) => (
                          <div key={rec.id} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <div className="font-medium text-sm">{rec.feedType}</div>
                              <Badge variant="outline" className="text-xs">
                                {rec.status}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-600">
                              {rec.amount} • {rec.frequency}
                            </div>
                          </div>
                        ))}
                    </div>

                    <Button className="w-full mt-4" size="sm">
                      Apply Feeding Schedule
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="realtime">Real-time</TabsTrigger>
              <TabsTrigger value="water-quality">Water Quality</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="flex gap-4 mb-6">
                <Select value={selectedTimeRange} onValueChange={handleTimeRangeChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processed">Processed Waste</SelectItem>
                    <SelectItem value="collected">Collected Waste</SelectItem>
                    <SelectItem value="efficiency">Efficiency Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Processing Trends</CardTitle>
                    <CardDescription>Click on bars for detailed information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartWrapper height={300}>
                      <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={wasteProcessingData} onClick={handleChartClick}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar yAxisId="left" dataKey="processed" fill="#10b981" name="Processed (kg)" />
                          <Bar yAxisId="left" dataKey="collected" fill="#3b82f6" name="Collected (kg)" />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="efficiency"
                            stroke="#f59e0b"
                            strokeWidth={3}
                            name="Efficiency %"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </ChartWrapper>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Regional Distribution</CardTitle>
                    <CardDescription>Farmers and waste processing by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartWrapper height={300}>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={farmerLocationData} layout="horizontal">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="region" type="category" width={100} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar dataKey="farmers" fill="#14b8a6" name="Fish Farmers" />
                          <Bar dataKey="wasteProcessed" fill="#06b6d4" name="Waste Processed (kg)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartWrapper>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="operations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Operations</CardTitle>
                  <CardDescription>
                    Latest waste processing activities - {operations.length} total operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {operations.slice(0, 10).map((operation) => (
                      <div key={operation.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              operation.status === "completed"
                                ? "bg-green-500"
                                : operation.status === "in-progress"
                                  ? "bg-yellow-500"
                                  : operation.status === "cancelled"
                                    ? "bg-red-500"
                                    : "bg-gray-400"
                            }`}
                          ></div>
                          <div>
                            <div className="font-medium">
                              {operation.type} - {operation.location}
                            </div>
                            <div className="text-sm text-gray-500">
                              {operation.amount} • {new Date(operation.timestamp).toLocaleString()}
                            </div>
                            {operation.assignedTo && (
                              <div className="text-xs text-gray-400">Assigned to: {operation.assignedTo}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleViewOperationDetails(operation)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Badge
                            variant={
                              operation.status === "completed"
                                ? "default"
                                : operation.status === "in-progress"
                                  ? "secondary"
                                  : operation.status === "cancelled"
                                    ? "destructive"
                                    : "outline"
                            }
                          >
                            {operation.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Farmer Growth Trend</CardTitle>
                    <CardDescription>Monthly growth in fish farmer partnerships</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartWrapper height={300}>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={wasteProcessingData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="farmers"
                            stroke="#14b8a6"
                            fill="#14b8a6"
                            fillOpacity={0.3}
                            name="Fish Farmers"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartWrapper>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Processing Efficiency</CardTitle>
                    <CardDescription>Monthly efficiency trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartWrapper height={300}>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={wasteProcessingData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[85, 100]} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="efficiency"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            name="Efficiency %"
                            dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartWrapper>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="realtime" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Activity Pattern</CardTitle>
                  <CardDescription>Real-time operations throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartWrapper height={400}>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={dailyActivityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="collections"
                          stackId="1"
                          stroke="#10b981"
                          fill="#10b981"
                          name="Collections"
                        />
                        <Area
                          type="monotone"
                          dataKey="processing"
                          stackId="1"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          name="Processing"
                        />
                        <Area
                          type="monotone"
                          dataKey="deliveries"
                          stackId="1"
                          stroke="#f59e0b"
                          fill="#f59e0b"
                          name="Deliveries"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartWrapper>
                </CardContent>
              </Card>

              {hoveredData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Selected Data Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{hoveredData.processed}</div>
                        <div className="text-sm text-gray-600">Processed (kg)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{hoveredData.collected}</div>
                        <div className="text-sm text-gray-600">Collected (kg)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-teal-600">{hoveredData.farmers}</div>
                        <div className="text-sm text-gray-600">Active Farmers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{hoveredData.efficiency?.toFixed(1)}%</div>
                        <div className="text-sm text-gray-600">Efficiency</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="water-quality" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Parameter History</CardTitle>
                    <CardDescription>Detailed water quality parameter trends over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartWrapper height={350}>
                      <ResponsiveContainer width="100%" height={350}>
                        <ComposedChart data={waterQualityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar yAxisId="left" dataKey="ph" fill="#3b82f6" name="pH Level" />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="temperature"
                            stroke="#f59e0b"
                            strokeWidth={3}
                            name="Temperature (°C)"
                          />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="oxygen"
                            stroke="#10b981"
                            strokeWidth={2}
                            name="Oxygen (mg/L)"
                          />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="ammonia"
                            stroke="#ef4444"
                            strokeWidth={2}
                            name="Ammonia (mg/L)"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </ChartWrapper>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Feeding Schedule Impact</CardTitle>
                    <CardDescription>How feeding schedules affect water quality</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">85%</div>
                          <div className="text-xs text-gray-600">Optimal Conditions</div>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <div className="text-lg font-bold text-yellow-600">12%</div>
                          <div className="text-xs text-gray-600">Caution Periods</div>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                          <div className="text-lg font-bold text-red-600">3%</div>
                          <div className="text-xs text-gray-600">Critical Alerts</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">Recent Feeding Events</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="text-sm">High Protein Pellets</div>
                            <div className="text-xs text-gray-500">2 hours ago</div>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="text-sm">Vegetable Mix</div>
                            <div className="text-xs text-gray-500">6 hours ago</div>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="text-sm">High Protein Pellets</div>
                            <div className="text-xs text-gray-500">10 hours ago</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={isDataViewerOpen} onOpenChange={setIsDataViewerOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {dataViewType === "operations" && "All Operations Data"}
              {dataViewType === "farmers" && "All Farmers Data"}
              {dataViewType === "collections" && "All Collections Data"}
              {dataViewType === "analytics" && "Detailed Analytics"}
            </DialogTitle>
            <DialogDescription>
              Comprehensive view of {dataViewType} with detailed information and actions
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {dataViewType === "operations" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Operations Overview</h3>
                  <Badge variant="secondary">{operations.length} Total Operations</Badge>
                </div>
                <div className="grid gap-4 max-h-96 overflow-y-auto">
                  {operations.map((operation) => (
                    <div key={operation.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">
                            {operation.type} - {operation.location}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {operation.amount} • {operation.wasteType}
                          </p>
                          <p className="text-xs text-gray-500">{new Date(operation.timestamp).toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <Select
                            value={operation.status}
                            onValueChange={(value) => handleUpdateOperationStatus(operation.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button size="sm" variant="outline" onClick={() => handleViewOperationDetails(operation)}>
                            Details
                          </Button>
                        </div>
                      </div>
                      {operation.notes && (
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{operation.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {dataViewType === "farmers" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Farmers Directory</h3>
                  <Badge variant="secondary">{farmers.length} Active Farmers</Badge>
                </div>
                <div className="grid gap-4 max-h-96 overflow-y-auto">
                  {farmers.map((farmer) => (
                    <div key={farmer.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{farmer.name}</h4>
                          <p className="text-sm text-gray-600">{farmer.location}</p>
                          <p className="text-xs text-gray-500">Contact: {farmer.contact}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={farmer.status === "active" ? "default" : "secondary"}>{farmer.status}</Badge>
                          <Button size="sm" variant="outline" onClick={() => handleViewFarmerDetails(farmer)}>
                            Details
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>Farm Size: {farmer.farmSize}</div>
                        <div>Waste Generated: {farmer.wasteGenerated}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {dataViewType === "collections" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Collection Schedule</h3>
                  <Badge variant="secondary">{collections.length} Scheduled Collections</Badge>
                </div>
                <div className="grid gap-4 max-h-96 overflow-y-auto">
                  {collections.map((collection) => (
                    <div key={collection.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{collection.location}</h4>
                          <p className="text-sm text-gray-600">
                            {collection.wasteType} • {collection.estimatedAmount}
                          </p>
                          <p className="text-xs text-gray-500">
                            {collection.scheduledDate} at {collection.scheduledTime}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={collection.status === "completed" ? "default" : "secondary"}>
                            {collection.status}
                          </Badge>
                          <Button size="sm" variant="outline" onClick={() => handleViewCollectionDetails(collection)}>
                            Details
                          </Button>
                        </div>
                      </div>
                      {collection.notes && (
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{collection.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {dataViewType === "analytics" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-green-600">{metrics.totalProcessed}</div>
                      <p className="text-xs text-gray-500">Total Processed (kg)</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-blue-600">{metrics.activeOperations}</div>
                      <p className="text-xs text-gray-500">Active Operations</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-purple-600">{metrics.totalFarmers}</div>
                      <p className="text-xs text-gray-500">Total Farmers</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-orange-600">{metrics.efficiencyRate}%</div>
                      <p className="text-xs text-gray-500">Efficiency Rate</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Processing Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartWrapper>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={wasteProcessingData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="processed" stroke="#10b981" strokeWidth={2} />
                            <Line type="monotone" dataKey="collected" stroke="#3b82f6" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartWrapper>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Regional Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartWrapper>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={farmerLocationData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="region" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="farmers" fill="#10b981" />
                            <Bar dataKey="wasteProcessed" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartWrapper>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isOperationDetailsOpen} onOpenChange={setIsOperationDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Operation Details</DialogTitle>
            <DialogDescription>Detailed information about the selected operation</DialogDescription>
          </DialogHeader>
          {selectedOperation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Operation Type</Label>
                  <p className="text-sm text-gray-600">{selectedOperation.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <p className="text-sm text-gray-600">{selectedOperation.location}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Amount</Label>
                  <p className="text-sm text-gray-600">{selectedOperation.amount}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Waste Type</Label>
                  <p className="text-sm text-gray-600">{selectedOperation.wasteType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant={selectedOperation.status === "completed" ? "default" : "secondary"}>
                    {selectedOperation.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Assigned To</Label>
                  <p className="text-sm text-gray-600">{selectedOperation.assignedTo || "Unassigned"}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Timestamp</Label>
                <p className="text-sm text-gray-600">{new Date(selectedOperation.timestamp).toLocaleString()}</p>
              </div>
              {selectedOperation.notes && (
                <div>
                  <Label className="text-sm font-medium">Notes</Label>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedOperation.notes}</p>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Select
                  value={selectedOperation.status}
                  onValueChange={(value) => {
                    handleUpdateOperationStatus(selectedOperation.id, value)
                    setSelectedOperation({ ...selectedOperation, status: value })
                  }}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Edit Operation</Button>
                <Button variant="destructive">Delete Operation</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
