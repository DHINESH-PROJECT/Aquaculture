"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, ChevronLeft, ChevronRight, CreditCard, Building2, Smartphone } from "lucide-react"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"

export default function PaymentsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [paymentMode, setPaymentMode] = useState("bank")
  const [selectedBank, setSelectedBank] = useState("hdfc")

  const transactionsPerPage = 5

  // Sample transaction data
  const allTransactions = [
    { id: 1, date: "2024-01-15", description: "Waste Collection - Farm #001", amount: 2500, status: "completed" },
    { id: 2, date: "2024-01-14", description: "Organic Waste Processing", amount: 1800, status: "completed" },
    { id: 3, date: "2024-01-13", description: "Delivery Commission", amount: 450, status: "pending" },
    { id: 4, date: "2024-01-12", description: "Fish Feed Supply", amount: 3200, status: "completed" },
    { id: 5, date: "2024-01-11", description: "Water Quality Monitoring", amount: 750, status: "completed" },
    { id: 6, date: "2024-01-10", description: "Waste Collection - Farm #002", amount: 2100, status: "failed" },
    { id: 7, date: "2024-01-09", description: "Organic Fertilizer Sale", amount: 1650, status: "completed" },
    { id: 8, date: "2024-01-08", description: "Equipment Maintenance", amount: 890, status: "pending" },
    { id: 9, date: "2024-01-07", description: "Fish Harvest Revenue", amount: 4200, status: "completed" },
    { id: 10, date: "2024-01-06", description: "Waste Processing Fee", amount: 320, status: "completed" },
    { id: 11, date: "2024-01-05", description: "Delivery Service", amount: 680, status: "completed" },
    { id: 12, date: "2024-01-04", description: "Quality Testing", amount: 450, status: "pending" },
  ]

  const totalPages = Math.ceil(allTransactions.length / transactionsPerPage)
  const startIndex = (currentPage - 1) * transactionsPerPage
  const currentTransactions = allTransactions.slice(startIndex, startIndex + transactionsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Aqua Culture
            </Link>

            {/* Navigation Dropdown */}
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/">Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/about">About</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/how-it-works">How It Works</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/resources">Resources</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/contact">Contact</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/user-management">User Management</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/delivery-tracking">Delivery Tracking</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/payments" className="text-teal-600 font-medium">
                      Payments
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments</h1>
          <p className="text-gray-600">Manage your earnings and payment settings</p>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">₹15,420</div>
              <p className="text-sm text-gray-500 mt-1">Ready for withdrawal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">₹2,890</div>
              <p className="text-sm text-gray-500 mt-1">Processing payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">₹48,750</div>
              <p className="text-sm text-gray-500 mt-1">All-time earnings</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Description</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Amount</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {new Date(transaction.date).toLocaleDateString("en-IN")}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{transaction.description}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right font-medium">
                        ₹{transaction.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge className={`${getStatusColor(transaction.status)} capitalize`}>
                          {transaction.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + transactionsPerPage, allTransactions.length)} of{" "}
                {allTransactions.length} transactions
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-teal-600 hover:bg-teal-700" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Payment Mode Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Mode of Payment</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMode === "bank" ? "border-teal-500 bg-teal-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setPaymentMode("bank")}
                >
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-6 w-6 text-teal-600" />
                    <div>
                      <div className="font-medium">Bank Transfer</div>
                      <div className="text-sm text-gray-500">Direct to bank account</div>
                    </div>
                  </div>
                </div>

                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMode === "upi" ? "border-teal-500 bg-teal-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setPaymentMode("upi")}
                >
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-6 w-6 text-teal-600" />
                    <div>
                      <div className="font-medium">UPI</div>
                      <div className="text-sm text-gray-500">Instant transfer</div>
                    </div>
                  </div>
                </div>

                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMode === "wallet" ? "border-teal-500 bg-teal-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setPaymentMode("wallet")}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-6 w-6 text-teal-600" />
                    <div>
                      <div className="font-medium">Digital Wallet</div>
                      <div className="text-sm text-gray-500">Paytm, PhonePe, etc.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Details Selection */}
            {paymentMode === "bank" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Bank Account</label>
                <Select value={selectedBank} onValueChange={setSelectedBank}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your bank account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hdfc">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-medium">HDFC Bank</div>
                          <div className="text-sm text-gray-500">****1234 - Savings</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="sbi">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-medium">State Bank of India</div>
                          <div className="text-sm text-gray-500">****5678 - Current</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="icici">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-medium">ICICI Bank</div>
                          <div className="text-sm text-gray-500">****9012 - Savings</div>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* UPI Details */}
            {paymentMode === "upi" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">UPI ID</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select UPI ID" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">farmer@paytm</SelectItem>
                    <SelectItem value="secondary">farmer@phonepe</SelectItem>
                    <SelectItem value="tertiary">farmer@gpay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Digital Wallet */}
            {paymentMode === "wallet" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Digital Wallet</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paytm">Paytm Wallet</SelectItem>
                    <SelectItem value="phonepe">PhonePe Wallet</SelectItem>
                    <SelectItem value="amazonpay">Amazon Pay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-teal-600 hover:bg-teal-700">Save Settings</Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer Section */}
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
