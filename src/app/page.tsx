'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'with-driver' | 'self-drive'>('with-driver');
  const [pickupCity, setPickupCity] = useState('Mumbai');
  const [tripType, setTripType] = useState('Outstation Roundtrip');
  const phoneNumber = "9702988465";

  const popularRoutes = [
    { name: "Mumbai to Lonavala", price: "₹2,499", duration: "1-2 Days", tag: "Getaway" },
    { name: "Mumbai to Shirdi & Trimbakeshwar", price: "₹5,499", duration: "2-3 Days", tag: "Pilgrimage" },
    { name: "Mumbai to Alibaug", price: "₹2,999", duration: "1-2 Days", tag: "Coastal" },
    { name: "Mumbai to Mahabaleshwar", price: "₹5,999", duration: "3 Days", tag: "Hill Station" },
    { name: "Mumbai to Nashik", price: "₹3,499", duration: "1-2 Days", tag: "Darshan & Tour" },
    { name: "Mumbai to Matheran", price: "₹2,799", duration: "1-2 Days", tag: "Scenic" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 space-y-16 pb-20">
      
      {/* 1. HERO SEARCH / EXPLORATION WIDGET */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Car Rental Services in Mumbai & Maharashtra
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Rent a Car with Chauffeur or Drive Yourself
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Clear rates, verified vehicles, and manual phone confirmation for all trips.
            </p>
          </div>

          {/* Revv-Style Booking Card */}
          <div className="bg-white text-slate-900 rounded-3xl shadow-2xl p-4 sm:p-8 border border-slate-100 max-w-4xl mx-auto">
            
            {/* Top Switcher Tabs */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6">
              <button
                onClick={() => setActiveTab('with-driver')}
                className={`flex-1 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'with-driver'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>👨‍✈️</span> Chauffeur Driven (With Driver)
              </button>
              <button
                onClick={() => setActiveTab('self-drive')}
                className={`flex-1 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'self-drive'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🔑</span> Self Drive (Drive Yourself)
              </button>
            </div>

            {/* Selection Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">City / Region</label>
                <select 
                  value={pickupCity} 
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Mumbai">Mumbai (Airport / All Areas)</option>
                  <option value="Navi Mumbai">Navi Mumbai (Ghansoli Hub)</option>
                  <option value="Thane">Thane</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>

              {activeTab === 'with-driver' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Service Type</label>
                  <select 
                    value={tripType} 
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Outstation Roundtrip">Outstation Roundtrip</option>
                    <option value="Outstation One Way Drop">Outstation One Way Drop</option>
                    <option value="Local 8hr/80km">Local (8 Hours / 80 KMs)</option>
                    <option value="Local 12hr/120km">Local (12 Hours / 120 KMs)</option>
                    <option value="Airport Transfer">Airport Transfer</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Pickup Hub</label>
                  <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-800 text-sm">
                    Ghansoli Hub, Navi Mumbai
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Action</label>
                <Link
                  href={activeTab === 'with-driver' ? '/with-driver' : '/self-drive'}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all h-[46px]"
                >
                  View Available Fleet ➔
                </Link>
              </div>
            </div>

            {/* Neutral Operational Points */}
            <div className="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between text-xs font-medium text-slate-600 gap-2">
              <span>• Zero Online Advance Payment Required</span>
              <span>• Phone Confirmation on All Requests</span>
              <span className="text-amber-800 font-bold">• Fuel: Return at same level (Self Drive)</span>
              <span>• Toll & Parking as per actuals (With Driver)</span>
            </div>

          </div>

        </div>
      </section>

      {/* 2. DUAL SERVICE EXPLORATION CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Chauffeur Service</span>
              <h2 className="text-2xl font-black text-slate-900">With Driver Rentals</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Local city packages (8hr/80km & 12hr/120km), outstation roundtrips, and airport transfers. Driver allowance and per-km tariffs listed upfront.
              </p>
              <ul className="text-xs space-y-2 text-slate-600 pt-2 border-t border-slate-100">
                <li>✓ Standard Driver Allowance structure</li>
                <li>✓ Toll, parking & state permits payable on actuals</li>
                <li>✓ Final quote confirmed over phone call</li>
              </ul>
            </div>
            <Link
              href="/with-driver"
              className="block text-center w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-2xl transition-colors"
            >
              Explore With Driver Cars ➔
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-600">Drive Yourself</span>
              <h2 className="text-2xl font-black text-slate-900">Self Drive Cars</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Rent hatchbacks, sedans, and SUVs. Pickup from Ghansoli hub with clear duration calculation and minimal refundable security deposit.
              </p>
              <ul className="text-xs space-y-2 text-slate-600 pt-2 border-t border-slate-100">
                <li>✓ Tentative instant duration & rental calculator</li>
                <li>✓ Refundable security deposit collected offline</li>
                <li>✓ Handover & return at same recorded fuel level</li>
              </ul>
            </div>
            <Link
              href="/self-drive"
              className="block text-center w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-colors"
            >
              Explore Self Drive Fleet ➔
            </Link>
          </div>

        </div>
      </section>

      {/* 3. POPULAR JOURNEYS */}
      <section id="popular-trips" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Top Routes From Mumbai</span>
          <h2 className="text-3xl font-black text-slate-900 mt-1">Popular Journeys</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRoutes.map((route, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {route.tag}
                </span>
                <h3 className="font-bold text-slate-900 text-lg mt-3">{route.name}</h3>
                <p className="text-xs text-slate-500 mt-1">Typical Duration: {route.duration}</p>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <span className="text-[11px] text-slate-400 block">Baseline Starting</span>
                  <span className="text-lg font-black text-slate-900">{route.price}</span>
                </div>
                <a
                  href={`https://wa.me/91${phoneNumber}?text=Hi%2C%20I%20want%20to%20inquire%20about%20${encodeURIComponent(route.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
                >
                  Inquire Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TERMS & POLICIES SUMMARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
          <div>
            <h3 className="text-2xl font-black">Operational Terms & Conditions</h3>
            <p className="text-xs text-slate-400 mt-1">Clear guidelines for transparent rental operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <strong className="text-white block text-sm">⛽ Fuel Policy (Self Drive)</strong>
              <p>Fuel is strictly NOT included. The car is handed over with recorded fuel level and must be returned with the same fuel level.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <strong className="text-white block text-sm">👨‍✈️ Driver Allowance (Chauffeur)</strong>
              <p>Driver allowance is applicable per day for outstation/extended trips. Tolls, parking, and state entry taxes are charged at actuals.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <strong className="text-white block text-sm">📍 Hub Pickup & Documents</strong>
              <p>Self Drive pickup at Ghansoli Hub. Valid original Driving Licence and Aadhaar card required at vehicle handover.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
