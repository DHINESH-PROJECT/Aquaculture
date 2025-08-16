import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Menu, Fish, Droplets, TrendingUp, Phone, Mail, MapPin, Clock, DollarSign, Users, Leaf } from "lucide-react"
import Link from "next/link"

export default function FishFarmingGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Aqua Culture
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Menu className="h-4 w-4 mr-2" />
                    Menu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/" className="w-full cursor-pointer">
                      Home
                    </Link>
                  </DropdownMenuItem>
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
                    <Link href="/fish-farming-guide" className="w-full cursor-pointer text-teal-600 font-medium">
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
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Guide to <span className="text-teal-600">Compact Fish Farming</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Learn how to start profitable fish farming in compact spaces using organic waste-based feed. Maximize your
              gains with sustainable aquaculture practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Fish className="h-4 w-4 mr-2" />
                Sustainable Aquaculture
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Leaf className="h-4 w-4 mr-2" />
                Organic Feed
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                High Profits
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Fish Farming Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compact Fish Farming Methods</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Maximize your fish production in minimal space with these proven compact farming techniques
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Droplets className="h-5 w-5 mr-2 text-teal-600" />
                  Recirculating Aquaculture Systems (RAS)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Closed-loop water systems that filter and reuse water, allowing high-density fish farming in small
                  spaces.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 90% less water usage</li>
                  <li>• 10x higher fish density</li>
                  <li>• Year-round production</li>
                  <li>• Minimal space requirement</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Fish className="h-5 w-5 mr-2 text-teal-600" />
                  Biofloc Technology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Beneficial bacteria convert fish waste into protein-rich feed, creating a self-sustaining ecosystem.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Zero water exchange</li>
                  <li>• Natural protein production</li>
                  <li>• Disease resistance</li>
                  <li>• Reduced feed costs</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-teal-600" />
                  Vertical Aquaponics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Combine fish farming with vertical vegetable growing, maximizing production per square foot.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Dual income streams</li>
                  <li>• Vertical space utilization</li>
                  <li>• Organic vegetables + fish</li>
                  <li>• Symbiotic ecosystem</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits & Gains Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Financial Benefits & Gains</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the impressive returns and benefits of compact fish farming with organic feed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <DollarSign className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">₹2-5 Lakhs</h3>
                <p className="text-gray-600">Annual profit per 1000 sq ft</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">6-8 Months</h3>
                <p className="text-gray-600">Break-even period</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">300-500%</h3>
                <p className="text-gray-600">Return on investment</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Fish className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">2-3 Tons</h3>
                <p className="text-gray-600">Annual fish production per 1000 sq ft</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Fresh Fish Sales</span>
                    <span className="font-semibold">₹200-300/kg</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Live Fish Sales</span>
                    <span className="font-semibold">₹250-350/kg</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Fingerling Sales</span>
                    <span className="font-semibold">₹2-5/piece</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Organic Vegetables (Aquaponics)</span>
                    <span className="font-semibold">₹50-100/kg</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Feed Cost Reduction</span>
                    <span className="font-semibold text-green-600">-60%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Water Usage</span>
                    <span className="font-semibold text-green-600">-90%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Land Requirement</span>
                    <span className="font-semibold text-green-600">-80%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Labor Costs</span>
                    <span className="font-semibold text-green-600">-50%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Start Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Start Your Fish Farm</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow our step-by-step guide to launch your profitable fish farming venture
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Process</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Site Selection & Planning</h4>
                    <p className="text-gray-600">Choose location, design layout, obtain permits and licenses</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Infrastructure Setup</h4>
                    <p className="text-gray-600">
                      Install tanks, filtration systems, aeration, and monitoring equipment
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Water System Preparation</h4>
                    <p className="text-gray-600">Test water quality, establish beneficial bacteria, cycle the system</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Stock Fish & Feed Setup</h4>
                    <p className="text-gray-600">Introduce fingerlings, establish organic feed supply chain</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Monitor & Harvest</h4>
                    <p className="text-gray-600">Daily monitoring, regular harvesting, market your produce</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Investment Requirements</h3>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Infrastructure Setup</span>
                      <span className="font-semibold">₹50,000 - ₹2,00,000</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Equipment & Systems</span>
                      <span className="font-semibold">₹30,000 - ₹1,50,000</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Initial Stock & Feed</span>
                      <span className="font-semibold">₹20,000 - ₹50,000</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Working Capital</span>
                      <span className="font-semibold">₹25,000 - ₹75,000</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total Investment</span>
                      <span className="text-teal-600">₹1,25,000 - ₹4,75,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Government Support Available</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• NABARD subsidies up to 25%</li>
                  <li>• State fisheries department grants</li>
                  <li>• Skill development programs</li>
                  <li>• Low-interest loans available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Expert Guidance</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to start your fish farming journey? Contact our experts for personalized consultation and support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-teal-600" />
                  Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Speak directly with our aquaculture experts</p>
                <div className="space-y-2">
                  <p className="font-semibold">+91 98765 43210</p>
                  <p className="font-semibold">+91 87654 32109</p>
                  <p className="text-sm text-gray-500">Mon-Sat: 9 AM - 7 PM</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-teal-600" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Get detailed responses to your queries</p>
                <div className="space-y-2">
                  <p className="font-semibold">support@aquaculture.com</p>
                  <p className="font-semibold">experts@aquaculture.com</p>
                  <p className="text-sm text-gray-500">Response within 24 hours</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-teal-600" />
                  Visit Our Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">See our demonstration farm in action</p>
                <div className="space-y-2">
                  <p className="font-semibold">Aqua Culture Demo Farm</p>
                  <p className="text-sm">123 Fish Farm Road</p>
                  <p className="text-sm">Bangalore, Karnataka 560001</p>
                  <p className="text-sm text-gray-500">By appointment only</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
              <Users className="h-5 w-5 mr-2" />
              Schedule Free Consultation
            </Button>
            <p className="text-sm text-gray-500 mt-2">Get personalized advice for your fish farming project</p>
          </div>
        </div>
      </section>

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
