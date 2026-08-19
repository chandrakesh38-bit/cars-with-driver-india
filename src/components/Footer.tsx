import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const phoneNumber = "9702988465";

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Company Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-extrabold">
                C
              </div>
              <span className="text-lg font-bold text-white tracking-wide">
                Car With Driver India
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              India's trusted car rental service offering chauffeur-driven trips and sanitized self-drive fleets with 100% transparent terms.
            </p>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-amber-300">
              ⚡ <strong>Fuel Rule:</strong> Cars are handed over with set fuel. Handover at same fuel level upon return.
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Our Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/with-driver" className="hover:text-emerald-400 transition-colors">Chauffeur Driven Outstation</Link></li>
              <li><Link href="/with-driver" className="hover:text-emerald-400 transition-colors">Local 8 Hours / 80 KM</Link></li>
              <li><Link href="/self-drive" className="hover:text-emerald-400 transition-colors">Self Drive Rental Fleets</Link></li>
              <li><Link href="/with-driver" className="hover:text-emerald-400 transition-colors">Airport Transfers & Sightseeing</Link></li>
            </ul>
          </div>

          {/* Popular Journeys */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Popular Journeys</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-slate-200">Mumbai to Lonavala & Khandala</li>
              <li className="hover:text-slate-200">Mumbai to Shirdi & Trimbakeshwar</li>
              <li className="hover:text-slate-200">Mumbai to Alibaug & Kashid</li>
              <li className="hover:text-slate-200">Mumbai to Mahabaleshwar & Panchgani</li>
              <li className="hover:text-slate-200">Mumbai to Nashik (Wine Tour & Darshan)</li>
              <li className="hover:text-slate-200">Mumbai to Matheran</li>
            </ul>
          </div>

          {/* Direct Support */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">24/7 Booking Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <span className="text-emerald-400 font-bold">Call:</span>
                <a href={`tel:+91${phoneNumber}`} className="text-white hover:underline font-bold">+91 {phoneNumber}</a>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-emerald-400 font-bold">WhatsApp:</span>
                <a href={`https://wa.me/91${phoneNumber}?text=Hi%2C%20I%20want%20to%20book%20a%20car`} target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold">
                  +91 {phoneNumber}
                </a>
              </li>
              <li className="text-xs text-slate-500 pt-2">
                Pickup Points & Fleet Hubs across Mumbai, Pune, Thane & Navi Mumbai.
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Car With Driver India. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Verified Fleet</span>
            <span>•</span>
            <span>Experienced Drivers</span>
            <span>•</span>
            <span>Best Pricing Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
