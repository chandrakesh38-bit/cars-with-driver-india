'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Tab State: 'bookings' | 'self_drive' | 'with_driver'
  const [activeTab, setActiveTab] = useState<'bookings' | 'self_drive' | 'with_driver'>('bookings');

  // Data States
  const [bookings, setBookings] = useState<any[]>([]);
  const [selfDriveFleet, setSelfDriveFleet] = useState<any[]>([]);
  const [withDriverFleet, setWithDriverFleet] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    // Check Active Session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchAllData();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchAllData();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
    } else {
      setSession(data.session);
    }
    setAuthLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
  }

  async function fetchAllData() {
    setLoadingData(true);
    try {
      // 1. Fetch Bookings
      const { data: bData } = await supabase
        .from('booking_requests')
        .select('*')
        .order('created_at', { ascending: false });
      setBookings(bData || []);

      // 2. Fetch Self Drive Fleet
      const { data: sdData } = await supabase
        .from('self_drive_cars')
        .select('*')
        .order('display_order', { ascending: true });
      setSelfDriveFleet(sdData || []);

      // 3. Fetch With Driver Fleet
      const { data: wdData } = await supabase
        .from('with_driver_cars')
        .select('*')
        .order('display_order', { ascending: true });
      setWithDriverFleet(wdData || []);
    } catch (err: any) {
      console.error('Error fetching admin data:', err.message);
    } finally {
      setLoadingData(false);
    }
  }

  // Update Self Drive Car
  async function handleUpdateSelfDrive(carId: string, updates: any) {
    setSaveStatus('Saving changes...');
    const { error } = await supabase
      .from('self_drive_cars')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', carId);

    if (error) {
      alert('Error updating: ' + error.message);
    } else {
      setSaveStatus('Saved successfully!');
      fetchAllData();
      setTimeout(() => setSaveStatus(null), 3000);
    }
  }

  // Update With Driver Car
  async function handleUpdateWithDriver(carId: string, updates: any) {
    setSaveStatus('Saving changes...');
    const { error } = await supabase
      .from('with_driver_cars')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', carId);

    if (error) {
      alert('Error updating: ' + error.message);
    } else {
      setSaveStatus('Saved successfully!');
      fetchAllData();
      setTimeout(() => setSaveStatus(null), 3000);
    }
  }

  // Update Booking Status & Internal Notes
  async function handleUpdateBooking(bookingId: string, updates: any) {
    setSaveStatus('Updating booking...');
    const { error } = await supabase
      .from('booking_requests')
      .update(updates)
      .eq('id', bookingId);

    if (error) {
      alert('Error updating booking: ' + error.message);
    } else {
      setSaveStatus('Booking updated!');
      fetchAllData();
      setTimeout(() => setSaveStatus(null), 3000);
    }
  }

  // --- LOGIN SCREEN ---
  if (!session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-xl space-y-6">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto font-black text-xl mb-3">
              🔒
            </div>
            <h1 className="text-2xl font-black text-slate-900">Admin Login</h1>
            <p className="text-xs text-slate-500">Sign in to manage cars, pricing and booking requests.</p>
          </div>

          {authError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-semibold">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="carswithdriverindia@gmail.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-500 text-white font-bold py-3 rounded-xl text-sm transition-all"
            >
              {authLoading ? 'Signing In...' : 'Sign In to Admin Portal →'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- LOGGED IN DASHBOARD ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 text-white p-6 rounded-3xl">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Secure Operations Portal</span>
          <h1 className="text-2xl font-black">Car With Driver India • Admin</h1>
          <p className="text-xs text-slate-400 mt-0.5">Logged in as: {session.user.email}</p>
        </div>

        <div className="flex items-center gap-3">
          {saveStatus && (
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs px-3 py-1.5 rounded-full font-bold animate-pulse">
              {saveStatus}
            </span>
          )}
          <button
            onClick={fetchAllData}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2 rounded-xl"
          >
            ↻ Refresh
          </button>
          <button
            onClick={handleLogout}
            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'bookings'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Booking Requests ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('self_drive')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'self_drive'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Self Drive Fleet ({selfDriveFleet.length})
        </button>

        <button
          onClick={() => setActiveTab('with_driver')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'with_driver'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          With Driver Fleet ({withDriverFleet.length})
        </button>
      </div>

      {/* TAB 1: BOOKINGS MANAGEMENT */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Incoming Customer Requests</h2>

          {loadingData ? (
            <div className="py-12 text-center text-slate-500 font-semibold">Loading requests...</div>
          ) : bookings.length === 0 ? (
            <div className="py-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
              No booking requests received yet.
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  
                  {/* Header Line */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-black bg-slate-100 px-3 py-1 rounded-lg text-slate-800">
                        {b.booking_reference}
                      </span>
                      <span className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        b.service_type === 'self_drive' ? 'bg-teal-50 text-teal-700' : 'bg-indigo-50 text-indigo-700'
                      }`}>
                        {b.service_type === 'self_drive' ? 'Self Drive' : 'With Driver'}
                      </span>
                      <span className="text-xs text-slate-400">
                        Received: {new Date(b.created_at).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">Status:</span>
                      <select
                        value={b.status}
                        onChange={(e) => handleUpdateBooking(b.id, { status: e.target.value })}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : b.status === 'rejected'
                            ? 'bg-rose-50 text-rose-700 border-rose-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="pending_confirmation">Pending Confirmation</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="rejected">Rejected</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  {/* Booking Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    
                    {/* Customer Contact */}
                    <div className="space-y-1 bg-slate-50 p-4 rounded-xl">
                      <div className="font-bold text-slate-900 text-sm">{b.customer_name}</div>
                      <div>📞 <strong>Primary:</strong> <a href={`tel:${b.customer_phone}`} className="text-emerald-700 font-bold hover:underline">{b.customer_phone}</a></div>
                      <div>📱 <strong>Alternate:</strong> <a href={`tel:${b.alternate_phone}`} className="text-slate-700 hover:underline">{b.alternate_phone}</a></div>
                      <div>✉️ <strong>Email:</strong> {b.customer_email}</div>
                    </div>

                    {/* Trip & Vehicle Snapshot */}
                    <div className="space-y-1 bg-slate-50 p-4 rounded-xl">
                      <div className="font-bold text-slate-900 text-sm">🚗 {b.car_name_snapshot}</div>
                      <div><strong>Pickup:</strong> {new Date(b.pickup_datetime).toLocaleString('en-IN')}</div>
                      {b.drop_datetime && <div><strong>Drop:</strong> {new Date(b.drop_datetime).toLocaleString('en-IN')}</div>}
                      <div><strong>Location:</strong> {b.pickup_location}</div>
                      {b.drop_location && <div><strong>Destination:</strong> {b.drop_location}</div>}
                    </div>

                    {/* Financial Snapshot */}
                    <div className="space-y-1 bg-slate-50 p-4 rounded-xl">
                      <div className="font-bold text-slate-900 text-sm">💰 Price Snapshot</div>
                      {b.hourly_rate_snapshot && <div>Rate at booking: ₹{b.hourly_rate_snapshot}/hr ({b.duration_hours_snapshot} hrs)</div>}
                      {b.estimated_rental_snapshot && <div>Estimated Rental: ₹{b.estimated_rental_snapshot}</div>}
                      {b.security_deposit_snapshot && <div>Security Deposit: ₹{b.security_deposit_snapshot}</div>}
                      {b.estimated_total_snapshot && (
                        <div className="font-bold text-emerald-800 text-sm pt-1">
                          Total Estimate: ₹{b.estimated_total_snapshot}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Admin Offline Notes & Quoted Fare */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Final Agreed Quoted Fare (₹)</label>
                      <input
                        type="number"
                        defaultValue={b.final_quoted_fare || ''}
                        placeholder="e.g. 5500"
                        onBlur={(e) => handleUpdateBooking(b.id, { final_quoted_fare: e.target.value ? Number(e.target.value) : null })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Internal Admin Notes (Private)</label>
                      <input
                        type="text"
                        defaultValue={b.internal_admin_notes || ''}
                        placeholder="e.g. Called customer, assigned Driver Rajesh, trip to Pune"
                        onBlur={(e) => handleUpdateBooking(b.id, { internal_admin_notes: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900"
                      />
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SELF DRIVE FLEET MANAGEMENT */}
      {activeTab === 'self_drive' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Manage Self Drive Fleet & Rates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selfDriveFleet.map((car) => (
              <div key={car.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">{car.brand}</span>
                    <h3 className="text-lg font-bold text-slate-900">{car.model}</h3>
                  </div>
                  
                  {/* Availability Toggle */}
                  <button
                    onClick={() => handleUpdateSelfDrive(car.id, { is_available: !car.is_available })}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                      car.is_available
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                    }`}
                  >
                    {car.is_available ? '● Available' : '○ Unavailable'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1">Hourly Rate (₹/hr)</label>
                    <input
                      type="number"
                      defaultValue={car.hourly_rate}
                      onBlur={(e) => handleUpdateSelfDrive(car.id, { hourly_rate: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-bold mb-1">Security Deposit (₹)</label>
                    <input
                      type="number"
                      defaultValue={car.security_deposit}
                      onBlur={(e) => handleUpdateSelfDrive(car.id, { security_deposit: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-emerald-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-bold mb-1">Car Image URL</label>
                  <input
                    type="text"
                    defaultValue={car.image_url || ''}
                    placeholder="https://..."
                    onBlur={(e) => handleUpdateSelfDrive(car.id, { image_url: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700"
                  />
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WITH DRIVER FLEET MANAGEMENT */}
      {activeTab === 'with_driver' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Manage With Driver Packages & Vendor Info</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {withDriverFleet.map((car) => (
              <div key={car.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-slate-900">{car.car_segment_name}</h3>
                  <button
                    onClick={() => handleUpdateWithDriver(car.id, { is_available: !car.is_available })}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                      car.is_available
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                    }`}
                  >
                    {car.is_available ? '● Available' : '○ Unavailable'}
                  </button>
                </div>

                {/* Customer-Facing Rates */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1">8Hr / 80KM Package (₹)</label>
                    <input
                      type="number"
                      defaultValue={car.package_8hr_80km}
                      onBlur={(e) => handleUpdateWithDriver(car.id, { package_8hr_80km: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-bold mb-1">12Hr / 120KM Package (₹)</label>
                    <input
                      type="number"
                      defaultValue={car.package_12hr_120km}
                      onBlur={(e) => handleUpdateWithDriver(car.id, { package_12hr_120km: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-bold mb-1">Extra KM Rate (₹/km)</label>
                    <input
                      type="number"
                      defaultValue={car.extra_km_rate}
                      onBlur={(e) => handleUpdateWithDriver(car.id, { extra_km_rate: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-bold mb-1">Extra Hour Rate (₹/hr)</label>
                    <input
                      type="number"
                      defaultValue={car.extra_hour_rate}
                      onBlur={(e) => handleUpdateWithDriver(car.id, { extra_hour_rate: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-700"
                    />
                  </div>
                </div>

                {/* Private Vendor Information (Admin Only) */}
                <div className="bg-amber-50/50 border border-amber-200/80 p-4 rounded-xl space-y-2 text-xs">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <span>🔒 Private Partner / Vendor Details (Never shown publicly)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-500 font-medium mb-0.5">Vendor Name</label>
                      <input
                        type="text"
                        defaultValue={car.internal_vendor_name || ''}
                        onBlur={(e) => handleUpdateWithDriver(car.id, { internal_vendor_name: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-medium mb-0.5">Vendor Contact</label>
                      <input
                        type="text"
                        defaultValue={car.internal_vendor_contact || ''}
                        onBlur={(e) => handleUpdateWithDriver(car.id, { internal_vendor_contact: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs"
                      />
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
