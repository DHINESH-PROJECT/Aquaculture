import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
                  <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                    <Menu className="h-4 w-4" />
                    <span>Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/about" className="w-full cursor-pointer text-teal-600 font-medium">
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
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Aqua Culture</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing aqua farming by transforming food waste into premium organic fish feed
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Aqua Culture is dedicated to revolutionizing sustainable aqua farming by converting food and vegetable
                waste into high-quality organic fish feed. We connect waste vendors, processing centers, and fish
                farmers to create a circular economy that benefits everyone.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through our innovative platform, we're transforming how organic waste is utilized in aquaculture,
                turning kitchen scraps and vegetable waste into nutritious fish food that reduces costs for farmers
                while promoting sustainable fish farming practices.
              </p>
            </div>
            <div className="bg-green-100 rounded-lg p-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">2024</div>
                <div className="text-gray-600 mb-4">Founded</div>
                <div className="text-4xl font-bold text-green-600 mb-2">150+</div>
                <div className="text-gray-600 mb-4">Fish Farms Served</div>
                <div className="text-4xl font-bold text-green-600 mb-2">80+</div>
                <div className="text-gray-600">Waste Vendors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  We believe in creating sustainable aquaculture solutions that reduce waste and promote healthy fish
                  farming practices for future generations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-teal-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We leverage cutting-edge technology to transform food waste into high-quality organic fish feed,
                  creating efficient and scalable aquaculture solutions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-600">
                  We foster collaboration between waste vendors, processing centers, and fish farmers to create a
                  thriving aquaculture community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Environmental Benefits</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Reduced food waste by converting kitchen scraps into valuable fish feed
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Lower carbon emissions through local waste-to-feed processing
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Improved water quality in fish farms through organic feed practices
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Sustainable aquaculture that reduces pressure on wild fish stocks
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Economic Benefits</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  Reduced feed costs for fish farmers through affordable organic alternatives
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  New revenue streams for restaurants and vendors through waste monetization
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  Job creation in waste processing and aquaculture support services
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  Higher profit margins for fish farmers using premium organic feed
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Aquaculture Revolution</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of the sustainable aquaculture movement. Transform waste into premium fish feed today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3">Start Fish Farming</Button>
            <Button
              variant="outline"
              className="border-teal-500 text-teal-600 hover:bg-teal-50 px-8 py-3 bg-transparent"
            >
              Learn More
            </Button>
          </div>
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
