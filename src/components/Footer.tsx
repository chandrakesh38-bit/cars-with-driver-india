import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="text-lg font-bold text-white tracking-wide">
                Car With Driver India
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              India's premier car rental service offering transparent pricing, professional chauffeurs, and sanitized self-drive fleets.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/with-driver" className="hover:text-white transition-colors">Chauffeur Outstation</Link></li>
              <li><Link href="/with-driver" className="hover:text-white transition-colors">Local 8Hr / 80KM</Link></li>
              <li><Link href="/self-drive" className="hover:text-white transition-colors">Self Drive Fleet</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Popular Journeys</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition-colors">Mumbai to Pune / Lonavala</li>
              <li className="hover:text-white transition-colors">Mumbai to Shirdi / Nashik</li>
              <li className="hover:text-white transition-colors">Local Sightseeing & Airport Drop</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">24/7 Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <span className="text-emerald-500 font-bold">Phone:</span>
                <a href="tel:+917303123786" className="text-white hover:underline font-medium">+91 73031 23786</a>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-emerald-500 font-bold">WhatsApp:</span>
                <a href="https://wa.me/917303123786" className="text-white hover:underline font-medium">Instant Chat</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Car With Driver India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
