'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 space-y-16 pb-20">
      
      {/* HOMEPAGE HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span>Car Rental Services in Mumbai & Surrounding Regions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            How Would You Like To Travel?
          </h1>
          
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Choose between driving yourself with our flexible Self Drive fleet or relaxing with a professional Chauffeur.
          </p>

          {/* DUAL CORE SERVICE SELECTION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-6 text-left">
            
            {/* 1. SELF DRIVE CARD */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 hover:border-emerald-400/60 transition-all flex flex-col justify-between shadow-2xl group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg">
                  🔑
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">Total Freedom & Privacy</span>
                  <h2 className="text-2xl font-black text-white mt-1">SELF DRIVE</h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    Rent hatchbacks, sedans, and SUVs. Pickup from Ghansoli or Vikhroli hubs with flexible hourly and daily rates.
                  </p>
                </div>
                
                <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs text-slate-200 font-medium">
                  <div className="flex items-center gap-2">✓ Pickup Hubs: Ghansoli & Vikhroli</div>
                  <div className="flex items-center gap-2">✓ Transparent refundable security deposit</div>
                  <div className="flex items-center gap-2 text-amber-300">✓ Fuel: Return at same recorded level</div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/explore-cars"
                  className="block text-center w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 px-6 rounded-2xl shadow-md transition-all text-sm uppercase tracking-wider"
                >
                  Book Self Drive ➔
                </Link>
              </div>
            </div>

            {/* 2. WITH DRIVER CARD */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 hover:border-emerald-400/60 transition-all flex flex-col justify-between shadow-2xl group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg">
                  👨‍✈️
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">Relaxed Travel</span>
                  <h2 className="text-2xl font-black text-white mt-1">WITH DRIVER</h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    Chauffeur-driven cars for local 8hr/80km city trips, outstation roundtrips, and one-way transfers.
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs text-slate-200 font-medium">
                  <div className="flex items-center gap-2">✓ Local packages & Outstation roundtrips</div>
                  <div className="flex items-center gap-2">✓ Standard driver allowance structure</div>
                  <div className="flex items-center gap-2">✓ Toll & Parking payable on actual receipts</div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/with-driver"
                  className="block text-center w-full bg-white hover:bg-slate-100 text-slate-900 font-black py-3.5 px-6 rounded-2xl shadow-md transition-all text-sm uppercase tracking-wider"
                >
                  Book With Driver ➔
                </Link>
              </div>
            </div>

          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span>🛡️ No Online Payment Required</span>
            <span>•</span>
            <span>📋 Manual Phone Confirmation</span>
            <span>•</span>
            <span>📍 Pickup Across Mumbai Hubs</span>
          </div>

        </div>
      </section>

      {/* QUICK FLEET PREVIEW CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-emerald-600">Browse Full Catalog</span>
            <h3 className="text-xl font-black text-slate-900">Looking for specific car models & rates?</h3>
            <p className="text-xs text-slate-500">Explore all available hatchbacks, sedans, SUVs, and luxury cars.</p>
          </div>
          <Link
            href="/explore-cars"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-xs text-center transition-all whitespace-nowrap"
          >
            Explore Complete Fleet ➔
          </Link>
        </div>
      </section>

    </div>
  );
}
