'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'with-driver' | 'self-drive'>('with-driver');
  const [pickupCity, setPickupCity] = useState('Mumbai');
  const [tripType, setTripType] = useState('Outstation');
  const phoneNumber = "9702988465";

  const popularRoutes = [
    { name: "Mumbai to Lonavala", price: "₹2,499", duration: "1-2 Days", tag: "Weekend Getaway" },
    { name: "Mumbai to Shirdi & Trimbakeshwar", price: "₹5,499", duration: "2-3 Days", tag: "Pilgrimage" },
    { name: "Mumbai to Alibaug", price: "₹2,999", duration: "1-2 Days", tag: "Beach Trip" },
    { name: "Mumbai to Mahabaleshwar", price: "₹5,999", duration: "3 Days", tag: "Hill Station" },
    { name: "Mumbai to Nashik", price: "₹3,499", duration: "1-2 Days", tag: "Vineyards & Temples" },
    { name: "Mumbai to Matheran", price: "₹2,799", duration: "1-2 Days", tag: "Nature Tour" },
  ];

  const featuredCars = [
    {
      id: "dzire",
      name: "Maruti Dzire / Etios",
      type: "Sedan",
      seats: "4+1 Seater",
      transmission: "Manual / Auto",
      fuel: "Petrol/Diesel",
      selfDriveRate: "₹1,800/day",
      driverRate: "₹12/km (Outstation) or ₹2,200 (8hr/80km)",
      image: "🚗"
    },
    {
      id: "ertiga",
      name: "Maruti Ertiga / XL6",
      type: "MUV",
      seats: "6+1 Seater",
      transmission: "Manual / Auto",
      fuel: "Petrol/CNG/Diesel",
      selfDriveRate: "₹2,500/day",
      driverRate: "₹15/km (Outstation) or ₹2,800 (8hr/80km)",
      image: "🚙"
    },
    {
      id: "crysta",
      name: "Toyota Innova Crysta",
      type: "Premium SUV",
      seats: "7+1 Seater",
      transmission: "Automatic / Manual",
      fuel: "Diesel",
      selfDriveRate: "₹3,800/day",
      driverRate: "₹19/km (Outstation) or ₹3,800 (8hr/80km)",
      image: "🚐"
    },
    {
      id: "thar",
      name: "Mahindra Thar 4x4",
      type: "Adventure SUV",
      seats: "4 Seater",
      transmission: "Automatic",
      fuel: "Diesel",
      selfDriveRate: "₹4,200/day",
      driverRate: "₹22/km (Outstation)",
      image: "🛻"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 1. HERO SECTION WITH REVV-STYLE SEARCH WIDGET */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Premium Mobility Across India
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Rent a Car with Chauffeur or Drive Yourself
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Clean sanitized cars, transparent pricing, and 24/7 dedicated assistance.
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
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>👨‍✈️</span> Chauffeur Driven (With Driver)
              </button>
              <button
                onClick={() => setActiveTab('self-drive')}
                className={`flex-1 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'self-drive'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🔑</span> Self Drive (Drive Yourself)
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">City / Pickup Location</label>
                <select 
                  value={pickupCity} 
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Mumbai">Mumbai (Airport / All Areas)</option>
                  <option value="Pune">Pune</option>
                  <option value="Thane">Thane & Navi Mumbai</option>
                  <option value="Nashik">Nashik</option>
                  <option value="Shirdi">Shirdi</option>
                </select>
              </div>

              {activeTab === 'with-driver' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Trip Service Type</label>
                  <select 
                    value={tripType} 
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Outstation">Outstation Round Trip</option>
                    <option value="OneWay">Outstation One Way Drop</option>
                    <option value="Local">Local (8 Hours / 80 KMs)</option>
                    <option value="Airport">Airport Pickup / Drop</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Trip Duration</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option>Daily Rental (1 - 6 Days)</option>
                    <option>Weekly Rental (7+ Days)</option>
                    <option>Monthly Subscription</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contact Quick Action</label>
                <a
                  href={`https://wa.me/91${phoneNumber}?text=Hi%20Car%20With%20Driver%20India%2C%20I%20am%20looking%20for%20a%20${activeTab === 'with-driver' ? 'Chauffeur' : 'Self-Drive'}%20car%20in%20${pickupCity}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all h-[46px]"
                >
                  Check Rates & Book ➔
                </a>
              </div>

            </div>

            {/* Revv-Style Features Strip */}
            <div className="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between text-xs font-medium text-slate-600 gap-2">
              <span className="flex items-center gap-1.5">✅ Sanitized & Verified Fleets</span>
              <span className="flex items-center gap-1.5">⚡ Hub Pickup or Doorstep Delivery</span>
              <span className="flex items-center gap-1.5 text-amber-700 font-bold">⛽ Fuel: Return at same level (Self Drive)</span>
              <span className="flex items-center gap-1.5">🛡️ 24/7 Road Assistance</span>
            </div>

          </div>

        </div>
      </section>

      {/* 2. FLEET SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">Top Rated Vehicles</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Available Across Fleets</h2>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <Link href="/with-driver" className="text-sm font-bold text-emerald-600 hover:underline">View All Driver Cars ➔</Link>
            <span className="text-slate-300">|</span>
            <Link href="/self-drive" className="text-sm font-bold text-emerald-600 hover:underline">View All Self-Drive ➔</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full uppercase">{car.type}</span>
                  <span className="text-3xl">{car.image}</span>
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">{car.name}</h3>
                <div className="text-xs text-slate-500 flex flex-wrap gap-2 mt-2">
                  <span>👥 {car.seats}</span>
                  <span>⚙️ {car.transmission}</span>
                  <span>⛽ {car.fuel}</span>
                </div>

                <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Self Drive:</span>
                    <span className="font-bold text-slate-900">{car.selfDriveRate}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">With Driver:</span>
                    <span className="font-bold text-emerald-600">{car.driverRate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/91${phoneNumber}?text=Hi%2C%20I%20am%20interested%20in%20booking%20${encodeURIComponent(car.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full bg-slate-900 group-hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-sm transition-all"
                >
                  Book on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. POPULAR JOURNEYS */}
      <section id="popular-trips" className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">Top Destinations</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Popular Journeys From Mumbai</h2>
            <p className="text-slate-600 mt-2 text-sm">Best routes for family vacations, pilgrimage tours, and weekend escapes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-emerald-500 transition-all">
                <div>
                  <span className="text-[11px] font-extrabold tracking-wider uppercase text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                    {route.tag}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-lg mt-3">{route.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">Typical Duration: {route.duration}</p>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-200">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Starting From</span>
                    <span className="text-lg font-black text-slate-900">{route.price}</span>
                  </div>
                  <a
                    href={`https://wa.me/91${phoneNumber}?text=Hi%2C%20I%20want%20to%20inquire%20about%20${encodeURIComponent(route.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all"
                  >
                    Enquire Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRANSPARENT FUEL & POLICIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Transparent Pricing & Rental Terms</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              No hidden charges. We believe in 100% clarity before you start your journey.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <span className="text-emerald-400 font-bold block mb-1">⛽ Fuel Policy (Self Drive)</span>
                <p className="text-xs text-slate-300">Fuel is not included. Car is given with recorded fuel level and must be returned with the same fuel level.</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <span className="text-emerald-400 font-bold block mb-1">👨‍✈️ Driver Allowance (Chauffeur)</span>
                <p className="text-xs text-slate-300">Includes professional, verified driver. Toll, parking & state permits payable as per actuals.</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <span className="text-emerald-400 font-bold block mb-1">📍 Delivery & Fleet Hubs</span>
                <p className="text-xs text-slate-300">Doorstep delivery available or pickup directly from our authorized fleet points across Mumbai.</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <span className="text-emerald-400 font-bold block mb-1">🛡️ Security Deposit</span>
                <p className="text-xs text-slate-300">Minimal, refundable security deposit for Self-Drive, returned immediately upon trip completion.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
