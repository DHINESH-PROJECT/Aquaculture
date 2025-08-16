import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function HowItWorksPage() {
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
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/how-it-works" className="text-teal-600 font-medium">
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
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How Aqua Culture Fish Feed Works</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our innovative platform transforms food and vegetable waste into premium organic fish feed, connecting waste
            vendors with fish farmers for sustainable aquaculture
          </p>
        </div>
      </section>

      {/* Detailed Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-full h-48 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/farmer-green-field.png"
                    alt="Fish Farmers"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Fish Farmers</h3>
                <div className="text-left space-y-2 text-gray-600">
                  <p>• Register fish farm details</p>
                  <p>• Order organic fish feed</p>
                  <p>• Schedule feed deliveries</p>
                  <p>• Monitor fish health & growth</p>
                  <p>• Track cost savings & sustainability</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-full h-48 bg-teal-100 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/waste-sorting-facility.png"
                    alt="Processing Centers"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Processing Centers</h3>
                <div className="text-left space-y-2 text-gray-600">
                  <p>• Collect food & vegetable waste</p>
                  <p>• Process into organic fish feed</p>
                  <p>• Ensure nutritional quality</p>
                  <p>• Package & distribute feed</p>
                  <p>• Maintain safety standards</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-full h-48 bg-yellow-100 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/urban-waste-management.png"
                    alt="Waste Vendors"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Food Waste Vendors</h3>
                <div className="text-left space-y-2 text-gray-600">
                  <p>• Register as waste supplier</p>
                  <p>• Schedule waste pickups</p>
                  <p>• Sort food & vegetable waste</p>
                  <p>• Earn revenue from waste</p>
                  <p>• Track environmental impact</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Step by Step Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Fish Feed Production Process</h2>
          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Aqua Farming Registration</h3>
                <p className="text-gray-600">
                  Fish farmers, food waste vendors, and processing centers register on the platform with their specific
                  requirements for sustainable fish feed production.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Food Waste Collection</h3>
                <p className="text-gray-600">
                  Our smart matching system connects food waste vendors with processing centers based on waste type,
                  location, and fish feed requirements.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Organic Fish Feed Processing</h3>
                <p className="text-gray-600">
                  Food and vegetable waste is processed using advanced techniques to create nutritious, organic fish
                  feed with optimal protein and nutrient content.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fish Feed Quality Assurance</h3>
                <p className="text-gray-600">
                  All organic fish feed undergoes rigorous testing for nutritional content, safety, and quality to
                  ensure optimal fish health and growth.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fish Farm Delivery & Impact Tracking</h3>
                <p className="text-gray-600">
                  Organic fish feed is delivered to fish farms, and we track fish growth, health improvements, cost
                  savings, and environmental impact throughout the aquaculture cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Aquaculture?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our sustainable fish farming ecosystem and turn food waste into premium organic fish feed today.
          </p>
          <Link href="/fish-farming-guide">
            <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3">
              Start Fish Farming
            </Button>
          </Link>
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
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
