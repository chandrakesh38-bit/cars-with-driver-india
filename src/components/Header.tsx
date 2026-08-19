'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const phoneNumber = "9702988465";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Business Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md font-extrabold text-xl">
              C
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                CAR WITH DRIVER
              </span>
              <span className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                INDIA • SELF DRIVE & CHAUFFEUR
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <Link href="/with-driver" className="text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors">
              With Driver (Chauffeur)
            </Link>
            <Link href="/self-drive" className="text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors">
              Self Drive Fleet
            </Link>
            <Link href="/#popular-trips" className="text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors">
              Popular Routes
            </Link>
          </nav>

          {/* Contact & WhatsApp CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href={`tel:+91${phoneNumber}`}
              className="text-slate-800 font-bold text-sm hover:text-emerald-600 transition-colors flex items-center gap-1.5"
            >
              📞 +91 {phoneNumber}
            </a>
            <a
              href={`https://wa.me/91${phoneNumber}?text=Hi%2C%20I%20want%20to%20book%20a%20car`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-2"
            >
              💬 WhatsApp Booking
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 p-2 rounded-lg hover:bg-slate-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 flex flex-col space-y-3 pb-6">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md font-bold text-slate-800">Home</Link>
            <Link href="/with-driver" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md font-bold text-slate-800">With Driver (Local & Outstation)</Link>
            <Link href="/self-drive" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md font-bold text-slate-800">Self Drive</Link>
            <a href={`tel:+91${phoneNumber}`} className="px-3 py-2 text-emerald-700 font-bold">📞 Call: +91 {phoneNumber}</a>
            <a href={`https://wa.me/91${phoneNumber}?text=Hi%2C%20I%20want%20to%20book%20a%20car`} className="bg-emerald-600 text-white text-center py-2.5 rounded-xl font-bold">Book on WhatsApp</a>
          </div>
        )}
      </div>
    </header>
  );
}
