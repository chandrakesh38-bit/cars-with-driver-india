'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface SelfDriveCar {
  id: string;
  brand: string;
  model: string;
  variant_transmission: string;
  fuel_type: string;
  seating_capacity: number;
  hourly_rate: number;
  security_deposit: number;
  image_url: string | null;
  is_available: boolean;
}

export default function SelfDrivePage() {
  const [cars, setCars] = useState<SelfDriveCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<SelfDriveCar | null>(null);

  // Form State
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccessRef, setBookingSuccessRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const phoneNumber = "9702988465";

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      const { data, error } = await supabase
        .from('self_drive_cars')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCars(data || []);
    } catch (err: any) {
      console.error('Error fetching cars:', err.message);
    } finally {
      setLoading(false);
    }
  }

  // Calculate Duration & Pricing Breakdown
  const calculateEstimate = () => {
    if (!startDateTime || !endDateTime || !selectedCar) {
      return { hours: 0, rentalAmount: 0, deposit: selectedCar ? selectedCar.security_deposit : 0, total: 0 };
    }

    const start = new Date(startDateTime).getTime();
    const end = new Date(endDateTime).getTime();

    if (end <= start) {
      return { hours: 0, rentalAmount: 0, deposit: selectedCar.security_deposit, total: 0, invalid: true };
    }

    const diffHours = Math.ceil((end - start) / (1000 * 60 * 60));
    const rentalAmount = diffHours * Number(selectedCar.hourly_rate);
    const deposit = Number(selectedCar.security_deposit);
    const total = rentalAmount + deposit;

    return { hours: diffHours, rentalAmount, deposit, total, invalid: false };
  };

  const estimate = calculateEstimate();

  // Handle Booking Request Submission with Frozen Snapshots
  async function handleSubmitBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCar) return;

    if (estimate.hours <= 0) {
      setErrorMessage('Please select a valid return date and time after your pickup time.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const carNameSnapshot = `${selectedCar.brand} ${selectedCar.model} (${selectedCar.variant_transmission})`;

      const { data, error } = await supabase
        .from('booking_requests')
        .insert([
          {
            service_type: 'self_drive',
            car_id_self_drive: selectedCar.id,
            car_name_snapshot: carNameSnapshot,
            customer_name: customerName,
            customer_phone: customerPhone,
            alternate_phone: alternatePhone,
            customer_email: customerEmail,
            pickup_datetime: new Date(startDateTime).toISOString(),
            drop_datetime: new Date(endDateTime).toISOString(),
            pickup_location: 'Ghansoli Hub, Navi Mumbai',
            hourly_rate_snapshot: selectedCar.hourly_rate,
            duration_hours_snapshot: estimate.hours,
            estimated_rental_snapshot: estimate.rentalAmount,
            security_deposit_snapshot: estimate.deposit,
            estimated_total_snapshot: estimate.total,
            status: 'pending_confirmation',
          },
        ])
        .select('booking_reference')
        .single();

      if (error) throw error;

      setBookingSuccessRef(data?.booking_reference || 'CWD-REQUEST');
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-4">
        <div className="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
          Pickup Hub: Ghansoli, Navi Mumbai
        </div>
        <h1 className="text-3xl sm:text-5xl font-black">Self Drive Car Fleet</h1>
        <p className="text-slate-300 max-w-2xl text-sm sm:text-base">
          Select a vehicle below to calculate a tentative rental estimate. No advance payment is charged online.
        </p>

        {/* Clear Fuel Rule Notice */}
        <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl text-xs text-amber-300">
          ⚠️ <strong>Important Fuel Policy:</strong> Fuel is NOT included. The car is handed over with recorded fuel level on the inspection sheet and must be returned at the same level.
        </div>
      </div>

      {/* Fleet Listing */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-6">Available Fleet</h2>
        
        {loading ? (
          <div className="text-center py-16 text-slate-500 font-semibold">Loading fleet data...</div>
        ) : cars.length === 0 ? (
          <div className="text-center py-16 text-slate-500">No cars found in fleet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cars.map((car) => {
              const isSelected = selectedCar?.id === car.id;

              return (
                <div
                  key={car.id}
                  className={`bg-white rounded-3xl border transition-all p-6 flex flex-col justify-between shadow-sm hover:shadow-md ${
                    isSelected ? 'border-emerald-600 ring-2 ring-emerald-600/20' : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{car.brand}</span>
                        <h3 className="text-xl font-bold text-slate-900">{car.model}</h3>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          car.is_available
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {car.is_available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>

                    <div className="h-44 bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100">
                      {car.image_url ? (
                        <img src={car.image_url} alt={car.model} className="h-full w-full object-cover" />
                      ) : (
                        <div className="text-slate-400 font-bold text-sm">Vehicle Image</div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                      <span className="bg-slate-100 px-2.5 py-1 rounded-lg">{car.variant_transmission}</span>
                      <span className="bg-slate-100 px-2.5 py-1 rounded-lg">{car.fuel_type}</span>
                      <span className="bg-slate-100 px-2.5 py-1 rounded-lg">{car.seating_capacity} Seats</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex justify-between items-end">
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Hourly Rate</div>
                        <div className="text-2xl font-black text-slate-900">₹{car.hourly_rate}<span className="text-xs font-normal text-slate-500">/hr</span></div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] text-slate-400 font-medium">Security Deposit</div>
                        <div className="text-sm font-bold text-emerald-700">₹{car.security_deposit}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    {car.is_available ? (
                      <button
                        onClick={() => {
                          setSelectedCar(car);
                          setBookingSuccessRef(null);
                          const element = document.getElementById('booking-calculator');
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        {isSelected ? '✓ Selected' : 'Select Car & Calculate'}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-3 rounded-xl font-bold text-sm bg-slate-100 text-slate-400 cursor-not-allowed"
                      >
                        Currently Unavailable
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Estimator & Request Submission Section */}
      {selectedCar && (
        <div id="booking-calculator" className="bg-white border-2 border-emerald-600/30 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
          
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Tentative Estimate & Request</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Selected: {selectedCar.brand} {selectedCar.model}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select pickup and return times to view estimated rental breakdown. No payment is taken online.
            </p>
          </div>

          {bookingSuccessRef ? (
            /* Confirmation Screen */
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Booking Request Received!</h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Reference Code: <strong className="text-emerald-700 font-mono text-base">{bookingSuccessRef}</strong>
              </p>
              <div className="inline-block bg-white px-4 py-2 rounded-xl text-xs font-bold text-amber-800 border border-amber-200">
                Status: Pending Availability Confirmation
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 max-w-md mx-auto space-y-1 text-left">
                <p><strong>What happens next?</strong></p>
                <p>Our team will check availability and contact you for confirmation.</p>
              </div>
              <div className="pt-4 flex justify-center gap-4">
                <a
                  href={`https://wa.me/91${phoneNumber}?text=Hi%2C%20I%20have%20submitted%20request%20${bookingSuccessRef}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs"
                >
                  Confirm on WhatsApp
                </a>
                <button
                  onClick={() => {
                    setSelectedCar(null);
                    setBookingSuccessRef(null);
                  }}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs"
                >
                  Book Another Car
                </button>
              </div>
            </div>
          ) : (
            /* Form & Calculator Grid */
            <form onSubmit={handleSubmitBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Dates & Customer Info */}
              <div className="lg:col-span-7 space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Date & Time (Ghansoli Hub)</label>
                    <input
                      type="datetime-local"
                      required
                      value={startDateTime}
                      onChange={(e) => setStartDateTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Return Date & Time</label>
                    <input
                      type="datetime-local"
                      required
                      value={endDateTime}
                      onChange={(e) => setEndDateTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-emerald-600"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Primary Mobile Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Alternate Contact Number (Mandatory)</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 00000"
                        value={alternatePhone}
                        onChange={(e) => setAlternatePhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1 text-slate-600">
                  <div className="font-bold text-slate-900">Required at Handover:</div>
                  <div>• Original Driving Licence & Aadhaar Card</div>
                  <div>• Fuel recorded on receipt; return at same fuel level</div>
                </div>

              </div>

              {/* Right Column: Live Fare Estimate Card */}
              <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  <h3 className="font-bold text-lg border-b border-slate-800 pb-3">Fare & Deposit Estimate</h3>
                  
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-slate-300">
                      <span>Rate per Hour:</span>
                      <span className="font-mono">₹{selectedCar.hourly_rate}/hr</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Calculated Duration:</span>
                      <span className="font-mono font-bold text-emerald-400">{estimate.hours} Hours</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Estimated Rental:</span>
                      <span className="font-mono font-bold">₹{estimate.rentalAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-medium pt-2 border-t border-slate-800">
                      <span>Refundable Security Deposit:</span>
                      <span className="font-mono font-bold">₹{estimate.deposit.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="bg-slate-800/80 p-4 rounded-xl space-y-1 border border-slate-700">
                    <div className="text-xs text-slate-400 uppercase font-semibold">Tentative Estimated Amount</div>
                    <div className="text-3xl font-black text-white font-mono">
                      ₹{estimate.total.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-amber-300 leading-tight pt-1">
                      * Tentative / Estimated figure. Final booking confirmation is subject to vehicle availability and manual confirmation.
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div className="bg-rose-500/20 border border-rose-500 text-rose-300 p-3 rounded-xl text-xs">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || estimate.hours <= 0}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-slate-950 font-black py-4 rounded-xl text-sm transition-all shadow-lg"
                  >
                    {isSubmitting ? 'Submitting Request...' : 'Submit Booking Request ➔'}
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    No online payment taken • Status: Pending Confirmation
                  </p>
                </div>

              </div>

            </form>
          )}

        </div>
      )}

    </div>
  );
}
