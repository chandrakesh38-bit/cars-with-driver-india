'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface WithDriverCar {
  id: string;
  car_segment_name: string;
  seating_capacity: number;
  luggage_capacity: string | null;
  package_8hr_80km: number;
  package_12hr_120km: number;
  extra_km_rate: number;
  extra_hour_rate: number;
  driver_allowance: number;
  image_url: string | null;
  is_available: boolean;
}

export default function WithDriverPage() {
  const [cars, setCars] = useState<WithDriverCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<WithDriverCar | null>(null);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [pickupDateTime, setPickupDateTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [tripType, setTripType] = useState('Local City Rental (8Hr / 80KM)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccessRef, setBookingSuccessRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const phoneNumber = "9702988465";

  useEffect(() => {
    fetchWithDriverFleet();
  }, []);

  async function fetchWithDriverFleet() {
    try {
      const { data, error } = await supabase
        .from('with_driver_cars')
        .select('id, display_order, car_segment_name, seating_capacity, luggage_capacity, package_8hr_80km, package_12hr_120km, extra_km_rate, extra_hour_rate, driver_allowance, image_url, is_available')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCars(data || []);
    } catch (err: any) {
      console.error('Error fetching with driver fleet:', err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCar) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase
        .from('booking_requests')
        .insert([
          {
            service_type: 'with_driver',
            car_id_with_driver: selectedCar.id,
            car_name_snapshot: selectedCar.car_segment_name,
            customer_name: customerName,
            customer_phone: customerPhone,
            alternate_phone: alternatePhone,
            customer_email: customerEmail,
            pickup_datetime: new Date(pickupDateTime).toISOString(),
            pickup_location: pickupLocation,
            drop_location: `${tripType} | Destination: ${dropLocation || 'Local Sightseeing'}`,
            estimated_rental_snapshot: selectedCar.package_8hr_80km,
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
          Chauffeur Driven Services
        </div>
        <h1 className="text-3xl sm:text-5xl font-black">Chauffeur Driven Fleet</h1>
        <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
          Local 8hr/80km packages, outstation roundtrips, and airport transfers. Toll and parking charged as per actual receipts.
        </p>
      </div>

      {/* Fleet Cards */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-6">Select Vehicle Segment</h2>

        {loading ? (
          <div className="text-center py-16 text-slate-500 font-semibold">Loading vehicle options...</div>
        ) : cars.length === 0 ? (
          <div className="text-center py-16 text-slate-500">No vehicles available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <h3 className="text-lg font-bold text-slate-900">{car.car_segment_name}</h3>
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
                        <img src={car.image_url} alt={car.car_segment_name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="text-slate-400 font-bold text-sm">Vehicle Image</div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                      <span className="bg-slate-100 px-2.5 py-1 rounded-lg">{car.seating_capacity} Seater</span>
                      <span className="bg-slate-100 px-2.5 py-1 rounded-lg">{car.luggage_capacity || 'AC Cab'}</span>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                      <div className="flex justify-between items-center text-slate-700">
                        <span>Local 8 Hr / 80 KM:</span>
                        <span className="font-bold text-slate-900 text-sm">₹{car.package_8hr_80km}</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-700">
                        <span>Local 12 Hr / 120 KM:</span>
                        <span className="font-bold text-slate-900 text-sm">₹{car.package_12hr_120km}</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-500 pt-1 border-t border-dashed border-slate-200">
                        <span>Extra KM: ₹{car.extra_km_rate}/km</span>
                        <span>Extra Hr: ₹{car.extra_hour_rate}/hr</span>
                      </div>
                      <div className="text-[11px] text-emerald-700 font-medium">
                        • Driver Allowance: ₹{car.driver_allowance}/day (applicable on outstation/extended trips)
                      </div>
                      <div className="text-[11px] text-slate-400">
                        • Toll, parking & state permits payable on actuals
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    {car.is_available ? (
                      <button
                        onClick={() => {
                          setSelectedCar(car);
                          setBookingSuccessRef(null);
                          const element = document.getElementById('with-driver-request-form');
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        {isSelected ? '✓ Vehicle Selected' : 'Request Booking ➔'}
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

      {/* Booking Form */}
      {selectedCar && (
        <div id="with-driver-request-form" className="bg-white border-2 border-emerald-600/30 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
          
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Chauffeur Service Request</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Request: {selectedCar.car_segment_name}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Submit your itinerary. Our team will check availability and contact you for confirmation and final quote.
            </p>
          </div>

          {bookingSuccessRef ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Request Successfully Received!</h3>
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
                  href={`https://wa.me/91${phoneNumber}?text=Hi%2C%20I%20have%20submitted%20chauffeur%20request%20${bookingSuccessRef}`}
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
                  Book Another Ride
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service / Trip Type</label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-emerald-600"
                  >
                    <option value="Local City Rental (8Hr / 80KM)">Local City Rental (8Hr / 80KM)</option>
                    <option value="Local City Rental (12Hr / 120KM)">Local City Rental (12Hr / 120KM)</option>
                    <option value="Airport Pickup / Drop">Airport Pickup / Drop</option>
                    <option value="Outstation Roundtrip">Outstation Roundtrip</option>
                    <option value="Outstation One-Way Drop">Outstation One-Way Drop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={pickupDateTime}
                    onChange={(e) => setPickupDateTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Address / Area</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Andheri, Mumbai / Vashi, Navi Mumbai"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Destination / Drop Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune / Shirdi / Local Sightseeing"
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amit Patel"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600"
                  />
                </div>

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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alternate Phone (Mandatory)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={alternatePhone}
                    onChange={(e) => setAlternatePhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="amit@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="bg-rose-500/10 border border-rose-500 text-rose-700 p-3 rounded-xl text-xs">
                  {errorMessage}
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  ℹ️ Zero advance payment needed. We will contact you to confirm vehicle allocation and final quote.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-400 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-md"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking Request ➔'}
                </button>
              </div>

            </form>
          )}

        </div>
      )}

    </div>
  );
}
