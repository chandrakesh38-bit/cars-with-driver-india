'use client';

import React from 'react';

export default function WithDriverPage() {
  const phoneNumber = "9702988465";

  const chauffeurFleets = [
    {
      name: "Maruti Dzire / Toyota Etios",
      type: "Sedan",
      capacity: "4 Passengers + 1 Chauffeur",
      localPrice: "₹2,200 (8 Hrs / 80 KM)",
      outstationPrice: "₹12 / KM (Min 300 KM/Day)",
      driverAllowance: "₹400 / Day",
      features: ["AC & Clean Seats", "Uniformed Driver", "Luggage Boot Space"]
    },
    {
      name: "Maruti Ertiga / XL6",
      type: "Family MUV",
      capacity: "6 Passengers + 1 Chauffeur",
      localPrice: "₹2,800 (8 Hrs / 80 KM)",
      outstationPrice: "₹15 / KM (Min 300 KM/Day)",
      driverAllowance: "₹450 / Day",
      features: ["Spacious 3-Row Seating", "Comfortable Suspension", "Rear AC Vents"]
    },
    {
      name: "Toyota Innova Crysta",
      type: "Executive SUV",
      capacity: "7 Passengers + 1 Chauffeur",
      localPrice: "₹3,800 (8 Hrs / 80 KM)",
      outstationPrice: "₹19 / KM (Min 300 KM/Day)",
      driverAllowance: "₹500 / Day",
      features: ["Luxury Leather Seats", "Highway Stability", "VIP Comfort"]
    },
    {
      name: "Urbania / Tempo Traveller (13-20 Seater)",
      type: "Group Van",
      capacity: "13 to 20 Passengers",
      localPrice: "₹6,500 (8 Hrs / 80 KM)",
      outstationPrice: "₹26 / KM (Min 300 KM/Day)",
      driverAllowance: "₹600 / Day",
      features: ["Reclining Pushback Seats", "Ample Luggage Space", "Family & Corporate Tours"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Chauffeur Driven Cars
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
            Outstation & Local Cab Rental with Professional Drivers
          </h1>
          <p className="mt-3 text-slate-600 text-base">
            Verified, punctual, and courteous chauffeurs for stress-free business and family trips.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {chauffeurFleets.map((car, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase">{car.type}</span>
                  <span className="text-xs text-slate-500 font-bold">{car.capacity}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">{car.name}</h3>

                <div className="mt-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 font-medium">Local Package:</span>
                    <span className="font-bold text-slate-900">{car.localPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 font-medium">Outstation Rate:</span>
                    <span className="font-bold text-emerald-600">{car.outstationPrice}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
                    <span>Driver Batta / Allowance:</span>
                    <span className="font-semibold text-slate-800">{car.driverAllowance}</span>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Highlights:</span>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {car.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-1.5">
                        <span className="text-emerald-500">✔</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href={`https://wa.me/91${phoneNumber}?text=Hi%2C%20I%20want%20to%20book%20${encodeURIComponent(car.name)}%20with%20driver`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md transition-all"
                >
                  Book with Driver on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
