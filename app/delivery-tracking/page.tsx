"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, MapPin, Clock, Phone, User, CreditCard, Wallet, Package, Truck } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  useEffect(() => {
    const loadMap = async () => {
      if (typeof window === "undefined" || !mapRef.current) return

      try {
        // Dynamic import of Leaflet
        const L = await import("leaflet")
        await import("leaflet/dist/leaflet.css")

        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        })

        // Initialize map
        const map = L.map(mapRef.current).setView([40.7128, -74.006], 13)
        mapInstanceRef.current = map

        // Add tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map)

        // Pickup location (Restaurant)
        const pickupMarker = L.marker([40.7589, -73.9851])
          .addTo(map)
          .bindPopup("<b>Pickup Location</b><br>Green Valley Restaurant<br>456 Eco Street")

        // Current delivery vehicle location
        const deliveryMarker = L.marker([40.7505, -73.9934])
          .addTo(map)
          .bindPopup("<b>Delivery Vehicle</b><br>Michael Johnson<br>Currently in transit")

        // Destination (Processing Center)
        const destinationMarker = L.marker([40.7282, -74.0776])
          .addTo(map)
          .bindPopup("<b>Destination</b><br>EcoFarm Processing Center<br>Final delivery point")

        // Create route line
        const routeCoordinates = [
          [40.7589, -73.9851], // Pickup
          [40.7505, -73.9934], // Current location
          [40.74, -74.02], // Waypoint
          [40.7282, -74.0776], // Destination
        ]

        // Completed route (green)
        const completedRoute = L.polyline(
          [
            [40.7589, -73.9851],
            [40.7505, -73.9934],
          ],
          { color: "green", weight: 4, opacity: 0.8 },
        ).addTo(map)

        // Remaining route (blue dashed)
        const remainingRoute = L.polyline(
          [
            [40.7505, -73.9934],
            [40.74, -74.02],
            [40.7282, -74.0776],
          ],
          {
            color: "blue",
            weight: 3,
            opacity: 0.6,
            dashArray: "10, 10",
          },
        ).addTo(map)

        // Fit map to show all markers
        const group = new L.FeatureGroup([pickupMarker, deliveryMarker, destinationMarker])
        map.fitBounds(group.getBounds().pad(0.1))

        // Simulate real-time movement
        let currentPosition = 0
        const moveVehicle = () => {
          const positions = [
            [40.7505, -73.9934],
            [40.749, -73.995],
            [40.7475, -73.997],
            [40.746, -74.0],
            [40.744, -74.005],
            [40.742, -74.01],
            [40.74, -74.015],
            [40.738, -74.02],
          ]

          if (currentPosition < positions.length - 1) {
            currentPosition++
            deliveryMarker.setLatLng(positions[currentPosition])

            // Update completed route
            completedRoute.setLatLngs([[40.7589, -73.9851], ...positions.slice(0, currentPosition + 1)])

            // Update remaining route
            remainingRoute.setLatLngs([
              positions[currentPosition],
              ...positions.slice(currentPosition + 1),
              [40.7282, -74.0776],
            ])
          }
        }

        // Move vehicle every 3 seconds
        const interval = setInterval(moveVehicle, 3000)

        setIsMapLoaded(true)

        // Cleanup
        return () => {
          clearInterval(interval)
          if (mapInstanceRef.current) {
            mapInstanceRef.current.remove()
            mapInstanceRef.current = null
          }
        }
      } catch (error) {
        console.error("Error loading map:", error)
      }
    }

    loadMap()
  }, [])

  return (
    <div ref={mapRef} className="w-full h-64 rounded-lg border" style={{ minHeight: "256px" }}>
      {!isMapLoaded && (
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading interactive map...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function DeliveryTracking() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Dropdown Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-teal-600">
              Aqua Culture
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/" className="w-full">
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about" className="w-full">
                    About
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/how-it-works" className="w-full">
                    How It Works
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/resources" className="w-full">
                    Resources
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact" className="w-full">
                    Contact
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user-management" className="w-full">
                    User Management
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/delivery-tracking" className="w-full text-teal-600 font-medium">
                    Delivery Tracking
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Tracking</h1>
          <p className="text-gray-600">Track your waste collection and delivery in real-time</p>
        </div>

        {/* Delivery Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-teal-600" />
              Delivery Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Tracking ID</p>
                <p className="font-semibold">#ECO-2024-001234</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-semibold">March 15, 2024 - 2:30 PM</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge className="bg-green-100 text-green-800">In Transit</Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Waste Type</p>
                <p className="font-semibold">Organic Food Waste</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Weight</p>
                <p className="font-semibold">45.2 kg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-teal-600" />
              Live Tracking Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MapComponent />
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Completed Route</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Remaining Route</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Current Location</span>
                </div>
              </div>
              <div className="text-gray-600">ETA: 15 minutes</div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Person Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-teal-600" />
              Delivery Person Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/delivery-person-portrait.png" alt="Delivery Person" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div>
                  <p className="font-semibold text-lg">Michael Johnson</p>
                  <p className="text-gray-600">Senior Collection Specialist</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Experience:</span>
                    <span className="ml-1 font-medium">3 years</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Rating:</span>
                    <span className="ml-1 font-medium">4.8/5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pickup Location Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-teal-600" />
              Pickup Location Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-semibold">123 Green Valley Restaurant</p>
                <p className="text-gray-600">456 Eco Street, Downtown</p>
                <p className="text-gray-600">City, State 12345</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pickup Time</p>
                <p className="font-semibold">2:00 PM - 2:15 PM</p>
                <p className="text-sm text-gray-600">Scheduled pickup window</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Contact Person</p>
                <p className="font-semibold">Sarah Chen - Kitchen Manager</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Special Instructions</p>
                <p className="text-gray-600">Use rear entrance, containers ready at loading dock</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sender and Receiver Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-teal-600" />
                Sender Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Business Name</p>
                <p className="font-semibold">Green Valley Restaurant</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Person</p>
                <p className="font-semibold">Sarah Chen</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-700">+1 (555) 987-6543</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-700">sarah@greenvalley.com</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Business Type</p>
                <p className="text-gray-700">Restaurant</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-teal-600" />
                Receiver Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Facility Name</p>
                <p className="font-semibold">EcoFarm Processing Center</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Person</p>
                <p className="font-semibold">David Rodriguez</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-700">+1 (555) 456-7890</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-700">david@ecofarm.com</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Facility Type</p>
                <p className="text-gray-700">Composting Facility</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-teal-600" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Service Fee</p>
                <p className="font-semibold text-lg">$45.00</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-semibold">Credit Card (**** 4567)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <Badge className="bg-green-100 text-green-800">Paid</Badge>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Payment Breakdown</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Collection Service</span>
                  <span>$35.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span>$8.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Environmental Tax</span>
                  <span>$2.00</span>
                </div>
                <div className="border-t pt-1 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$45.00</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Person Wages Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-teal-600" />
              Delivery Person Wages Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Base Rate</p>
                <p className="font-semibold">$15.00/hour</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time Spent</p>
                <p className="font-semibold">1.5 hours</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Distance Bonus</p>
                <p className="font-semibold">$5.00</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Wage Breakdown</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Base Pay (1.5 hrs × $15.00)</span>
                  <span>$22.50</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance Bonus</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Performance Bonus</span>
                  <span>$3.00</span>
                </div>
                <div className="border-t pt-1 flex justify-between font-semibold">
                  <span>Total Earnings</span>
                  <span>$30.50</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                <p>
                  Payment Status: <span className="text-green-600 font-medium">Processed</span>
                </p>
                <p>Payment Date: March 15, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center pt-6">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Clock className="h-4 w-4 mr-2" />
            Update Delivery Status
          </Button>
          <Button variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Contact Delivery Person
          </Button>
          <Button variant="outline">Download Receipt</Button>
        </div>
      </main>

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
