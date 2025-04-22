import React from 'react';
import { Sun, Battery, Leaf, ArrowRight, Phone, Shield, Clock, PenTool as Tool, Home, Building2, Factory, Zap } from 'lucide-react';
import FranchisePage from './FranchisePage';

function App() {
  const [showFranchise, setShowFranchise] = React.useState(false);

  if (showFranchise) {
    return (
      <>
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowFranchise(false)}>
                <Sun className="h-8 w-8 text-yellow-400" />
                <span className="text-2xl font-bold">SandhyaSolar</span>
              </div>
            </div>
          </div>
        </nav>
        <FranchisePage />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-screen">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <nav className="relative z-10 container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sun className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">SandhyaSolar</span>
            </div>
            <div className="hidden md:flex space-x-8 text-white">
              <a href="#solar-guide" className="hover:text-yellow-400 transition">Solar Guide</a>
              <a href="#services" className="hover:text-yellow-400 transition">Services</a>
              <a href="#benefits" className="hover:text-yellow-400 transition">Benefits</a>
              <a href="#contact" className="hover:text-yellow-400 transition">Contact</a>
              <button 
                onClick={() => setShowFranchise(true)}
                className="text-yellow-400 hover:text-yellow-300 transition"
              >
                Franchise
              </button>
            </div>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 h-[calc(100vh-120px)] flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Powering Tomorrow with Solar Energy Today
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Transform your energy consumption with sustainable solar solutions tailored for your home or business.
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Solar Guide Section */}
      <section id="solar-guide" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Find Your Perfect Solar Solution</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Every property has unique energy needs. Discover which solar system is right for you based on your requirements.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-black font-semibold px-4 py-1 rounded-full shadow-md">
                Most Popular
              </div>
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Home className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Residential Solar</h3>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center">
                  <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                  3-8 kW system size
                </li>
                <li>Perfect for single-family homes</li>
                <li>Roof or ground mounting options</li>
                <li>Smart home integration ready</li>
              </ul>
              <p className="text-sm text-gray-500 italic">
                Ideal if your monthly electricity bill is ₹500-4000
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Building2 className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Commercial Solar</h3>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center">
                  <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                  10-50 kW system size
                </li>
                <li>Suitable for offices & retail</li>
                <li>Flat roof optimization</li>
                <li>Peak demand management</li>
              </ul>
              <p className="text-sm text-gray-500 italic">
                Ideal if your monthly electricity bill is ₹4000-10,000
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Factory className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Industrial Solar</h3>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center">
                  <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                  100+ kW system size
                </li>
                <li>Custom solutions for factories</li>
                <li>High-volume power generation</li>
                <li>Advanced monitoring systems</li>
              </ul>
              <p className="text-sm text-gray-500 italic">
                Ideal if your monthly electricity bill exceeds ₹10,000
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <a 
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition"
            >
              Get Expert Recommendation
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Our Premium Service Package</h2>
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-center mb-8">
              <Shield className="h-12 w-12 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-6">1-Year Comprehensive Solar Care</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Quarterly Inspections</h4>
                    <p className="text-gray-600">Regular system performance checks and optimization</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Tool className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Maintenance & Repairs</h4>
                    <p className="text-gray-600">Priority service for any repairs or maintenance needs</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Sun className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Performance Monitoring</h4>
                    <p className="text-gray-600">24/7 system monitoring and efficiency reports</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Extended Warranty</h4>
                    <p className="text-gray-600">Full coverage for parts and labor</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <a 
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Solar Energy?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Battery className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Energy Independence</h3>
              <p className="text-gray-600">Free yourself from rising energy costs and gain control over your power consumption.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Eco-Friendly</h3>
              <p className="text-gray-600">Reduce your carbon footprint and contribute to a sustainable future for generations.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sun className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Cost Savings</h3>
              <p className="text-gray-600">Significant long-term savings on electricity bills with minimal maintenance costs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Ready to Make the Switch?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent" rows={4}></textarea>
                  </div>
                  <button className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition">
                    Send Message
                  </button>
                </form>
              </div>
              <div className="flex items-center justify-center">  
                <div className="text-center">
                  <Phone className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                  <p className="text-gray-600 mb-4">We're here to answer your questions</p>
                  <p className="text-xl font-semibold text-yellow-500">+91-9201717269</p>
                  <p className="text-xl font-semibold text-yellow-500">sandhyasolarmp@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sun className="h-6 w-6 text-yellow-400" />
              <span className="text-xl font-bold">SandhyaSolar</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">© Copyright 2025 SandhyaSolar. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;