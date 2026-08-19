'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                CAR WITH DRIVER
              </span>
              <span className="text-xs font-semibold tracking-widest text-emerald-600 uppercase">
                INDIA • PREMIUM RENTALS
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <Link href="/with-driver" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
              Chauffeur Driven
            </Link>
            <Link href="/self-drive" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
              Self Drive
            </Link>
            <Link href="/#why-us" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
              Why Us
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="tel:+917303123786" 
              className="text-slate-700 font-semibold text-sm hover:text-emerald-600 transition-colors"
            >
              +91 73031 23786
            </a>
            <a
              href="https://wa.me/917303123786?text=Hi%2C%20I%20want%20to%20book%20a%20car"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-sm transition-all"
            >
              Book on WhatsApp
            </a>
          </div>

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

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 flex flex-col space-y-3 pb-6">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md font-semibold text-slate-800">Home</Link>
            <Link href="/with-driver" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md font-semibold text-slate-800">With Driver</Link>
            <Link href="/self-drive" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md font-semibold text-slate-800">Self Drive</Link>
          </div>
        )}
      </div>
    </header>
  );
}
