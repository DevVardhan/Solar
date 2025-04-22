import React from 'react';
import { Building2, ArrowRight, Phone, MapPin, Users, TrendingUp, Briefcase, DollarSign } from 'lucide-react';

function FranchisePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-20">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Become a SandhyaSolar Franchise Partner</h1>
            <p className="text-xl mb-8">Join India's fastest-growing solar energy network and build a sustainable future while growing your business</p>
            <a 
              href="#franchise-form"
              className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Why Partner With SandhyaSolar?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">High Growth Market</h3>
              <p className="text-gray-600">Access to India's rapidly expanding solar energy market with consistent growth potential.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="h-7 w-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Support</h3>
              <p className="text-gray-600">Comprehensive training, marketing materials, and ongoing operational support.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <DollarSign className="h-7 w-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Strong ROI</h3>
              <p className="text-gray-600">Attractive profit margins with multiple revenue streams and recurring income.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Established Brand</h3>
              <p className="text-gray-600">Leverage our trusted brand name and proven business model.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Investment Overview</h2>
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Initial Investment</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center text-gray-700">
                      <Building2 className="h-5 w-5 text-yellow-500 mr-3" />
                      Showroom Setup: ₹10-15 Lakhs
                    </li>
                    <li className="flex items-center text-gray-700">
                      <MapPin className="h-5 w-5 text-yellow-500 mr-3" />
                      Territory Rights: ₹5 Lakhs
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Users className="h-5 w-5 text-yellow-500 mr-3" />
                      Training & Support: Included
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Expected Returns</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center text-gray-700">
                      <TrendingUp className="h-5 w-5 text-yellow-500 mr-3" />
                      ROI: 25-35% per annum
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Briefcase className="h-5 w-5 text-yellow-500 mr-3" />
                      Break-even: 12-18 months
                    </li>
                    <li className="flex items-center text-gray-700">
                      <DollarSign className="h-5 w-5 text-yellow-500 mr-3" />
                      Recurring Revenue: Service contracts
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="franchise-form" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Start Your Franchise Journey</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                    <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City of Interest*</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Budget</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
                      <option>₹15-20 Lakhs</option>
                      <option>₹20-25 Lakhs</option>
                      <option>₹25+ Lakhs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
                    <textarea className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent" rows={4}></textarea>
                  </div>
                  <button className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition">
                    Submit Application
                  </button>
                </form>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <Phone className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Direct Contact</h3>
                  <p className="text-gray-600 mb-4">Speak with our franchise development team</p>
                  <p className="text-xl font-semibold text-yellow-500">+91-9201717269</p>
                  <p className="text-xl font-semibold text-yellow-500">sandhyasolarmp@gmail.com</p>
                  <p className="text-gray-600 mt-2">Mon-Sat: 9AM to 6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FranchisePage;