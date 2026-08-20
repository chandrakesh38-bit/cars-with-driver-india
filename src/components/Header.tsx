'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xl shadow-md">
                C
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 block leading-tight">
                  CAR WITH DRIVER
                </span>
                <span className="text-[10px] font-bold tracking-wider text-emerald-600 uppercase">
                  INDIA • SELF DRIVE & CHAUFFEUR
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7">
              <Link href="/" className="text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <Link href="/explore-cars" className="text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors">
                Explore Cars
              </Link>
              <Link href="/faq" className="text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors">
                FAQ
              </Link>
              <Link href="/about" className="text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors">
                Contact
              </Link>
            </nav>

            {/* "Become a Partner" Action */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => setPartnerModalOpen(true)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-full border border-slate-300 transition-all shadow-sm"
              >
                🤝 Become a Partner
              </button>
              <a
                href="https://wa.me/919702988465?text=Hi%2C%20I%20want%20to%20inquire%20about%20a%20car%20booking"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-1.5"
              >
                💬 WhatsApp
              </a>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-700 p-2 rounded-lg hover:bg-slate-100"
                aria-label="Toggle Menu"
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

          {/* Mobile Slide-down Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-100 flex flex-col space-y-3 pb-6">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md font-bold text-slate-800 hover:bg-slate-50">
                Home
              </Link>
              <Link href="/explore-cars" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md font-bold text-slate-800 hover:bg-slate-50">
                Explore Cars
              </Link>
              <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md font-bold text-slate-800 hover:bg-slate-50">
                FAQ
              </Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md font-bold text-slate-800 hover:bg-slate-50">
                About Us
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md font-bold text-slate-800 hover:bg-slate-50">
                Contact
              </Link>
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setPartnerModalOpen(true);
                  }}
                  className="w-full bg-slate-100 text-slate-800 font-bold py-2.5 rounded-xl border border-slate-300 text-xs text-center"
                >
                  🤝 Become a Partner
                </button>
                <a
                  href="https://wa.me/919702988465"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs text-center shadow-sm"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Become a Partner "Coming Soon" Modal */}
      {partnerModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
              🤝
            </div>
            <h3 className="text-xl font-black text-slate-900">Partner Program</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We are currently onboarding fleet and driver partners offline. Our online partner portal is <strong>Coming Soon</strong>.
            </p>
            <p className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
              For direct partnership queries, please contact our support team at <strong>+91 9702988465</strong>.
            </p>
            <button
              onClick={() => setPartnerModalOpen(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
