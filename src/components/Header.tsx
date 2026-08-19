'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <Link href="/with-driver" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors flex items-center gap-1.5">
              <span>Chauffeur Driven</span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Popular
              </span>
            </Link>
            <Link href="/self-drive" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
              Self Drive
            </Link>
            <Link href="/#why-us" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
              Why Us
            </Link>
            <Link href="/#reviews" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
              Reviews
            </Link>
          </nav>

          {/* Direct CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="tel:+917303123786" 
              className="flex items-center space-x-2 text-slate-700 font-semibold text-sm hover:text-emerald-600 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span>+91 73031 23786</span>
            </a>

            <a
              href="https://wa.me/917303123786?text=Hi%2C%20I%20want%20to%20book%20a%20cab"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all flex items-center space-x-2"
            >
              <span>Book on WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 p-2 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 flex flex-col space-y-3 pb-6 animate-fadeIn">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Home
            </Link>
            <Link 
              href="/with-driver" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
            >
              With Driver (Chauffeur)
            </Link>
            <Link 
              href="/self-drive" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Self Drive Cars
            </Link>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="https://wa.me/917303123786"
                className="w-full text-center bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-sm"
              >
                Chat on WhatsApp
              </a>
              <a
                href="tel:+917303123786"
                className="w-full text-center bg-slate-100 text-slate-800 font-semibold py-2.5 rounded-xl"
              >
                Call Support
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
