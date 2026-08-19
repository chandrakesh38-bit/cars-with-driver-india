'use client';

import React from 'react';

export default function SelfDrivePage() {
  const phoneNumber = "9702988465";

  const selfDriveCars = [
    {
      name: "Maruti Swift / Baleno",
      type: "Hatchback",
      seats: "5 Seater",
      transmission: "Manual / AMT",
      fuel: "Petrol",
      dailyRate: "₹1,500 / 24 Hours",
      deposit: "₹3,000 (Refundable)",
      kmCap: "Unlimited / 300 KM per day plan"
    },
    {
      name: "Hyundai Creta / Kia Seltos",
      type: "Compact SUV",
      seats: "5 Seater",
      transmission: "Automatic",
      fuel: "Diesel / Petrol",
      dailyRate: "₹2,800 / 24 Hours",
      deposit: "₹5,000 (Refundable)",
      kmCap: "Unlimited / 300 KM per day plan"
    },
    {
      name: "Mahindra Thar 4x4",
      type: "Lifestyle SUV",
      seats: "4 Seater",
      transmission: "Automatic / Convertible",
      fuel: "Diesel",
      dailyRate: "₹4,200 / 24 Hours",
      deposit: "₹6,000 (Refundable)",
      kmCap: "300 KM per day plan"
    },
    {
      name: "Toyota Fortuner 4x4",
      type: "Full Luxury SUV",
      seats: "7 Seater",
      transmission: "Automatic",
      fuel: "Diesel",
      dailyRate: "₹6,500 / 24 Hours",
      deposit: "₹10,000 (Refundable)",
      kmCap: "300 KM per day plan"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Self Drive Cars
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
            Sanitized Self-Drive Fleets at Lowest Daily Rates
          </h1>
          <p className="mt-3 text-slate-600 text-base">
            Drive with privacy and freedom. Doorstep delivery and Fleet Hub pickups across Mumbai.
          </p>
        </div>

        {/* Fuel Rule Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 mb-10 max-w-3xl mx-auto flex items-center gap-3">
          <span className="text-2xl">⛽</span>
          <div className="text-xs sm:text-sm text-amber-900">
            <strong>Clear Fuel Policy:</strong> Cars do not include fuel. Cars are handed over with a recorded fuel level on the receipt; you must return the car at the same fuel level.
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {selfDriveCars.map((car, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">{car.type}</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">{car.name}</h3>
                
                <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                  <p>👥 <strong>Capacity:</strong> {car.seats}</p>
                  <p>⚙️ <strong>Transmission:</strong> {car.transmission}</p>
                  <p>⛽ <strong>Fuel:</strong> {car.fuel}</p>
                  <p>🛡️ <strong>Deposit:</strong> {car.deposit}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-500 block">Tariff:</span>
                  <span className="text-xl font-extrabold text-emerald-600">{car.dailyRate}</span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={`https://wa.me/91${phoneNumber}?text=Hi%2C%20I%20want%20to%20rent%20self-drive%20${encodeURIComponent(car.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center bg-slate-900 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-sm transition-all"
                >
                  Book Self Drive
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
