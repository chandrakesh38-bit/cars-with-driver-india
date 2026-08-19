import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide">
            <span>✨ Premium & Reliable Fleet in Mumbai & Pan-India</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Choose Your Way To Travel
          </h1>
          
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Professional chauffeur-driven outstation cabs or sanitized self-drive cars with unlimited kilometers. Zero hidden charges.
          </p>

          {/* Core Dual Service Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-6 text-left">
            
            {/* Card 1: With Driver */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:border-emerald-400/60 transition-all group flex flex-col justify-between shadow-2xl">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Most Relaxing</span>
                  <h2 className="text-2xl font-bold text-white mt-1">Chauffeur Driven</h2>
                  <p className="text-sm text-slate-300 mt-2">
                    Professional, verified drivers for local city 8hr/80km packages, airport transfers, and outstation trips.
                  </p>
                </div>
                <ul className="text-xs space-y-2 text-slate-200 pt-2 border-t border-white/10">
                  <li className="flex items-center gap-2">✓ Verified background-checked chauffeurs</li>
                  <li className="flex items-center gap-2">✓ Standard driver allowance (₹500/day)</li>
                  <li className="flex items-center gap-2">✓ Clean AC sedans, Ertiga, Crysta & Hycross</li>
                </ul>
              </div>

              <div className="pt-6">
                <Link
                  href="/with-driver"
                  className="block text-center w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-6 rounded-2xl shadow-md transition-colors"
                >
                  Explore With Driver Fleet →
                </Link>
              </div>
            </div>

            {/* Card 2: Self Drive */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:border-emerald-400/60 transition-all group flex flex-col justify-between shadow-2xl">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-300">Total Freedom</span>
                  <h2 className="text-2xl font-bold text-white mt-1">Self Drive Cars</h2>
                  <p className="text-sm text-slate-300 mt-2">
                    Rent top-condition cars starting from ₹100/hr. Pickup from our Ghansoli warehouse with unlimited KM.
                  </p>
                </div>
                <ul className="text-xs space-y-2 text-slate-200 pt-2 border-t border-white/10">
                  <li className="flex items-center gap-2">✓ <strong>Unlimited Kilometers</strong> on all cars</li>
                  <li className="flex items-center gap-2">✓ Pickup from Ghansoli Warehouse</li>
                  <li className="flex items-center gap-2">✓ Transparent refundable security deposit</li>
                </ul>
              </div>

              <div className="pt-6">
                <Link
                  href="/self-drive"
                  className="block text-center w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-3.5 px-6 rounded-2xl shadow-md transition-colors"
                >
                  Explore Self Drive Cars →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">The Car With Driver India Advantage</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Why Travel With Us?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-lg">No Hidden Charges</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Transparent per-hour and package rates. Toll and parking are charged at actual government receipts.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Sanitized & Inspected</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every vehicle undergoes a 25-point mechanical and cleanliness inspection before every trip.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Unlimited Kilometers</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Drive wherever your heart desires on Self Drive without watching the odometer every minute.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-lg">24/7 Roadside Assistance</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Always by your side. Our dedicated support helpline is active 24 hours a day for uninterrupted journeys.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Location Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Self Drive Pickup Hub
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">Warehouse at Ghansoli, Navi Mumbai</h3>
            <p className="text-slate-100 text-sm leading-relaxed">
              Easy access from Mumbai, Thane, and Navi Mumbai. Bring your valid Driving Licence & Aadhaar card for instant document verification and pickup.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a
              href="https://wa.me/917303123786?text=Hi%2C%20I%20have%20an%20inquiry%20about%20car%20booking"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-emerald-800 font-bold px-6 py-3.5 rounded-xl text-center shadow hover:bg-slate-100 transition-colors"
            >
              Chat on WhatsApp
            </a>
            <a
              href="tel:+917303123786"
              className="bg-emerald-900/40 border border-white/30 text-white font-bold px-6 py-3.5 rounded-xl text-center hover:bg-emerald-900/60 transition-colors"
            >
              Call Helpline
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
