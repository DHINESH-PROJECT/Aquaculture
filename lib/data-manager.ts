export interface Operation {
  id: string
  type: "Collection" | "Processing" | "Delivery"
  location: string
  amount: string
  status: "pending" | "in-progress" | "completed" | "cancelled"
  timestamp: string
  assignedTo?: string
  notes?: string
  wasteType?: string
}

export interface Farmer {
  id: string
  name: string
  location: string
  region: string
  contactInfo: {
    phone: string
    email: string
  }
  wasteProcessed: number
  joinDate: string
  status: "active" | "inactive"
  specialization: string[]
}

export interface WasteCollection {
  id: string
  location: string
  scheduledDate: string
  scheduledTime: string
  wasteType: string
  estimatedAmount: string
  actualAmount?: string
  status: "scheduled" | "collected" | "cancelled"
  notes?: string
  collectorId?: string
}

export interface SystemMetrics {
  totalProcessed: number
  activeOperations: number
  totalFarmers: number
  efficiencyRate: number
  lastUpdated: string
}

class DataManager {
  private storageKey = "aquaculture-dashboard-data"

  private getStoredData() {
    if (typeof window === "undefined") return null
    const stored = localStorage.getItem(this.storageKey)
    return stored ? JSON.parse(stored) : null
  }

  private saveData(data: any) {
    if (typeof window === "undefined") return
    localStorage.setItem(this.storageKey, JSON.stringify(data))
  }

  private initializeData() {
    const defaultData = {
      operations: [
        {
          id: "1",
          type: "Collection",
          location: "Downtown Market",
          amount: "150 kg",
          status: "completed",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          wasteType: "food-scraps",
          assignedTo: "John Collector",
        },
        {
          id: "2",
          type: "Processing",
          location: "Green Valley Farm",
          amount: "200 kg",
          status: "in-progress",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          wasteType: "mixed-organic",
          assignedTo: "Sarah Processor",
        },
        {
          id: "3",
          type: "Delivery",
          location: "Sunrise Fishery",
          amount: "80 kg",
          status: "pending",
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          wasteType: "processed-compost",
        },
      ] as Operation[],
      farmers: [
        {
          id: "1",
          name: "Green Valley Fish Farm",
          location: "North District",
          region: "North District",
          contactInfo: { phone: "+1-555-0101", email: "contact@greenvalley.com" },
          wasteProcessed: 850,
          joinDate: "2024-01-15",
          status: "active",
          specialization: ["Tilapia", "Catfish"],
        },
        {
          id: "2",
          name: "Sunrise Aquaculture",
          location: "South District",
          region: "South District",
          contactInfo: { phone: "+1-555-0102", email: "info@sunrise-aqua.com" },
          wasteProcessed: 720,
          joinDate: "2024-02-20",
          status: "active",
          specialization: ["Salmon", "Trout"],
        },
      ] as Farmer[],
      collections: [
        {
          id: "1",
          location: "City Restaurant",
          scheduledDate: "2024-08-17",
          scheduledTime: "09:00",
          wasteType: "food-scraps",
          estimatedAmount: "120 kg",
          status: "scheduled",
          notes: "Regular weekly pickup",
        },
      ] as WasteCollection[],
      metrics: {
        totalProcessed: 10250,
        activeOperations: 12,
        totalFarmers: 78,
        efficiencyRate: 94.2,
        lastUpdated: new Date().toISOString(),
      } as SystemMetrics,
    }

    this.saveData(defaultData)
    return defaultData
  }

  getData() {
    return this.getStoredData() || this.initializeData()
  }

  // Operations Management
  getOperations(): Operation[] {
    const data = this.getData()
    return data.operations || []
  }

  addOperation(operation: Omit<Operation, "id" | "timestamp">): Operation {
    const data = this.getData()
    const newOperation: Operation = {
      ...operation,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    }

    data.operations = [newOperation, ...data.operations]
    this.saveData(data)
    return newOperation
  }

  updateOperation(id: string, updates: Partial<Operation>): Operation | null {
    const data = this.getData()
    const operationIndex = data.operations.findIndex((op: Operation) => op.id === id)

    if (operationIndex === -1) return null

    data.operations[operationIndex] = { ...data.operations[operationIndex], ...updates }
    this.saveData(data)
    return data.operations[operationIndex]
  }

  deleteOperation(id: string): boolean {
    const data = this.getData()
    const initialLength = data.operations.length
    data.operations = data.operations.filter((op: Operation) => op.id !== id)

    if (data.operations.length < initialLength) {
      this.saveData(data)
      return true
    }
    return false
  }

  // Farmers Management
  getFarmers(): Farmer[] {
    const data = this.getData()
    return data.farmers || []
  }

  addFarmer(farmer: Omit<Farmer, "id" | "joinDate">): Farmer {
    const data = this.getData()
    const newFarmer: Farmer = {
      ...farmer,
      id: Date.now().toString(),
      joinDate: new Date().toISOString().split("T")[0],
    }

    data.farmers = [...data.farmers, newFarmer]
    this.saveData(data)
    return newFarmer
  }

  updateFarmer(id: string, updates: Partial<Farmer>): Farmer | null {
    const data = this.getData()
    const farmerIndex = data.farmers.findIndex((farmer: Farmer) => farmer.id === id)

    if (farmerIndex === -1) return null

    data.farmers[farmerIndex] = { ...data.farmers[farmerIndex], ...updates }
    this.saveData(data)
    return data.farmers[farmerIndex]
  }

  // Collections Management
  getCollections(): WasteCollection[] {
    const data = this.getData()
    return data.collections || []
  }

  addCollection(collection: Omit<WasteCollection, "id">): WasteCollection {
    const data = this.getData()
    const newCollection: WasteCollection = {
      ...collection,
      id: Date.now().toString(),
    }

    data.collections = [...data.collections, newCollection]
    this.saveData(data)
    return newCollection
  }

  updateCollection(id: string, updates: Partial<WasteCollection>): WasteCollection | null {
    const data = this.getData()
    const collectionIndex = data.collections.findIndex((col: WasteCollection) => col.id === id)

    if (collectionIndex === -1) return null

    data.collections[collectionIndex] = { ...data.collections[collectionIndex], ...updates }
    this.saveData(data)
    return data.collections[collectionIndex]
  }

  // Metrics Management
  getMetrics(): SystemMetrics {
    const data = this.getData()
    return (
      data.metrics || {
        totalProcessed: 0,
        activeOperations: 0,
        totalFarmers: 0,
        efficiencyRate: 0,
        lastUpdated: new Date().toISOString(),
      }
    )
  }

  updateMetrics(updates: Partial<SystemMetrics>): SystemMetrics {
    const data = this.getData()
    data.metrics = {
      ...data.metrics,
      ...updates,
      lastUpdated: new Date().toISOString(),
    }
    this.saveData(data)
    return data.metrics
  }

  // Data Export/Import
  exportData(): string {
    const data = this.getData()
    return JSON.stringify(data, null, 2)
  }

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData)
      this.saveData(data)
      return true
    } catch (error) {
      console.error("Failed to import data:", error)
      return false
    }
  }

  // Analytics
  getOperationsByStatus() {
    const operations = this.getOperations()
    return operations.reduce(
      (acc, op) => {
        acc[op.status] = (acc[op.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  }

  getWasteByType() {
    const operations = this.getOperations()
    return operations.reduce(
      (acc, op) => {
        if (op.wasteType) {
          acc[op.wasteType] = (acc[op.wasteType] || 0) + Number.parseInt(op.amount.replace(/\D/g, ""))
        }
        return acc
      },
      {} as Record<string, number>,
    )
  }

  getFarmersByRegion() {
    const farmers = this.getFarmers()
    return farmers.reduce(
      (acc, farmer) => {
        acc[farmer.region] = (acc[farmer.region] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  }

  // Clear all data (for testing/reset)
  clearAllData(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.storageKey)
    }
  }
}

export const dataManager = new DataManager()
