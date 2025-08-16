import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-gray-900">Aqua Culture</div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/start-recycling">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">Login</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                    <Menu className="h-4 w-4" />
                    <span>Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/about" className="w-full cursor-pointer">
                      About
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/how-it-works" className="w-full cursor-pointer">
                      How It Works
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/resources" className="w-full cursor-pointer">
                      Resources
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/contact" className="w-full cursor-pointer">
                      Contact
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="w-full cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/user-management" className="w-full cursor-pointer">
                      User Management
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/delivery-tracking" className="w-full cursor-pointer">
                      Delivery Tracking
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/payments" className="w-full cursor-pointer">
                      Payments
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/fish-farming-guide" className="w-full cursor-pointer">
                      Fish Farming Guide
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-800 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Transforming Food Waste into Premium Fish Feed</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Aqua Culture connects food waste vendors with fish farmers to create sustainable aquaculture. We convert
            organic food and vegetable waste into high-quality fish feed, creating a profitable circular economy for
            everyone.
          </p>
          {/* Updated Get Started button to link to authentication page */}
          <Link href="/start-recycling">
            <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-full h-48 bg-orange-100 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/waste-sorting-facility.png"
                    alt="Food Waste Vendors"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Food Waste Vendors</h3>
                <p className="text-gray-600">
                  Restaurants, grocery stores, and food processors provide organic food waste including vegetable
                  scraps, expired produce, and food byproducts for conversion.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-full h-48 bg-teal-100 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/urban-waste-management.png"
                    alt="Processing Centers"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Centers</h3>
                <p className="text-gray-600">
                  Our processing facilities transform organic food waste into nutritious, high-protein fish feed through
                  controlled fermentation and drying processes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-full h-48 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/farmer-green-field.png"
                    alt="Fish Farmers"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fish Farmers</h3>
                <p className="text-gray-600">
                  Aquaculture farmers receive premium organic fish feed at competitive prices, improving fish health
                  while reducing feed costs and environmental impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15,750 kg</div>
              <div className="text-gray-600 mb-1">Food Waste Converted to Fish Feed</div>
              <div className="text-green-500 text-sm">+22%</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">180</div>
              <div className="text-gray-600 mb-1">Fish Farms Supplied</div>
              <div className="text-green-500 text-sm">+28%</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">₹2.5M</div>
              <div className="text-gray-600 mb-1">Savings for Fish Farmers</div>
              <div className="text-green-500 text-sm">+35%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Out What Works Best Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join the Aquaculture Revolution</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a food waste vendor looking to monetize waste or a fish farmer seeking sustainable feed
            solutions, we connect you to profitable opportunities.
          </p>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3">Start Your Partnership</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">© 2024 Aqua Culture. All rights reserved.</div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
