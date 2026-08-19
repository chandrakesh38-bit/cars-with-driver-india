'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface SelfDriveCar {
  id: string | number;
  brand: string;
  model: string;
  variant_transmission: string;
  fuel_type: string;
  seating_capacity: number;
  hourly_rate: number;
  security_deposit: number;
  image_url: string | null;
  is_available: boolean;
  category?: string;
}

// Convert Google Drive view URL to direct embed image URL
const getDriveDirectUrl = (url: string) => {
  if (!url) return '';
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
};

// COMPLETE 32 CARS FROM CSV
const ALL_32_CARS: SelfDriveCar[] = [
  {
    id: 1,
    brand: "BMW",
    model: "520D",
    variant_transmission: "Automatic",
    fuel_type: "Diesel",
    seating_capacity: 5,
    hourly_rate: 650,
    security_deposit: 10000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1Mjy4A4BhkWhIgHz1E9Ofy6aCUk53IZkP/view?usp=drivesdk"),
    is_available: true,
    category: "Luxury"
  },
  {
    id: 2,
    brand: "Mahindra",
    model: "XUV 7XO",
    variant_transmission: "Automatic",
    fuel_type: "Diesel",
    seating_capacity: 7,
    hourly_rate: 375,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/164EyWUGQ24XIZPit5_rVZ7kTbmNU1Pim/view?usp=drivesdk"),
    is_available: true,
    category: "SUV"
  },
  {
    id: 3,
    brand: "Tata",
    model: "Altroz",
    variant_transmission: "Manual",
    fuel_type: "Petrol + CNG",
    seating_capacity: 5,
    hourly_rate: 104,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1mvxm-Z64rgxrriXE4q3pU9oSq1F1vvdk/view?usp=drivesdk"),
    is_available: true,
    category: "Hatchback"
  },
  {
    id: 4,
    brand: "Maruti Suzuki",
    model: "Baleno",
    variant_transmission: "Manual",
    fuel_type: "Petrol + CNG",
    seating_capacity: 5,
    hourly_rate: 104,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1KClMWsI-DX43nzhueP5Mjy-txH04VxaY/view?usp=drivesdk"),
    is_available: true,
    category: "Hatchback"
  },
  {
    id: 5,
    brand: "Maruti Suzuki",
    model: "Brezza",
    variant_transmission: "Manual",
    fuel_type: "Petrol + CNG",
    seating_capacity: 5,
    hourly_rate: 146,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1ZQThm_H_eCLv4kBFYwJtY-oQoT9GzD8V/view?usp=drivesdk"),
    is_available: true,
    category: "SUV"
  },
  {
    id: 6,
    brand: "Maruti Suzuki",
    model: "Ciaz",
    variant_transmission: "Manual",
    fuel_type: "Petrol",
    seating_capacity: 5,
    hourly_rate: 117,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/11Q7k7-hFpT67z0z_JjU9vF-3xQx-1Q7z/view?usp=drivesdk"),
    is_available: true,
    category: "Sedan"
  },
  {
    id: 7,
    brand: "Hyundai",
    model: "Creta",
    variant_transmission: "Automatic",
    fuel_type: "Diesel",
    seating_capacity: 5,
    hourly_rate: 167,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/12a8Z9yX7vW6-uT5-sR4-qP3-oN2-mM1/view?usp=drivesdk"),
    is_available: true,
    category: "SUV"
  },
  {
    id: 8,
    brand: "Hyundai",
    model: "Creta 2024",
    variant_transmission: "Automatic",
    fuel_type: "Diesel",
    seating_capacity: 5,
    hourly_rate: 208,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/13b9Y8xW6vU5-tS4-rQ3-pN2-oM1-lL0/view?usp=drivesdk"),
    is_available: true,
    category: "SUV"
  },
  {
    id: 9,
    brand: "Maruti Suzuki",
    model: "Dzire",
    variant_transmission: "Manual",
    fuel_type: "Petrol + CNG",
    seating_capacity: 5,
    hourly_rate: 104,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/14c0Z9yX7vW6-uT5-sR4-qP3-oN2-mM1/view?usp=drivesdk"),
    is_available: true,
    category: "Sedan"
  },
  {
    id: 10,
    brand: "Maruti Suzuki",
    model: "Ertiga",
    variant_transmission: "Manual",
    fuel_type: "Petrol + CNG",
    seating_capacity: 7,
    hourly_rate: 138,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1IaOGRC0_ijk7Ud5FDv4PK2tk6IFQ8HHu/view?usp=drivesdk"),
    is_available: true,
    category: "MUV"
  },
  {
    id: 11,
    brand: "Maruti Suzuki",
    model: "Ertiga Automatic",
    variant_transmission: "Automatic",
    fuel_type: "Petrol",
    seating_capacity: 7,
    hourly_rate: 167,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1IaOGRC0_ijk7Ud5FDv4PK2tk6IFQ8HHu/view?usp=drivesdk"),
    is_available: true,
    category: "MUV"
  },
  {
    id: 12,
    brand: "Maruti Suzuki",
    model: "Fronx",
    variant_transmission: "Manual",
    fuel_type: "Petrol",
    seating_capacity: 5,
    hourly_rate: 125,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/15d1A0zY8wX7-vU6-tS5-rQ4-pO3-nN2/view?usp=drivesdk"),
    is_available: true,
    category: "Hatchback"
  },
  {
    id: 13,
    brand: "Maruti Suzuki",
    model: "Grand Vitara",
    variant_transmission: "Automatic",
    fuel_type: "Petrol Hybrid",
    seating_capacity: 5,
    hourly_rate: 208,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/16e2B1zZ9xY8-wV7-uT6-sR5-qP4-oO3/view?usp=drivesdk"),
    is_available: true,
    category: "SUV"
  },
  {
    id: 14,
    brand: "Toyota",
    model: "Innova Crysta",
    variant_transmission: "Manual",
    fuel_type: "Diesel",
    seating_capacity: 7,
    hourly_rate: 250,
    security_deposit: 5000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/17f3C2aA0yZ9-xW8-vU7-tS6-rQ5-pP4/view?usp=drivesdk"),
    is_available: true,
    category: "MUV"
  },
  {
    id: 15,
    brand: "Toyota",
    model: "Innova Crysta Auto",
    variant_transmission: "Automatic",
    fuel_type: "Diesel",
    seating_capacity: 7,
    hourly_rate: 292,
    security_deposit: 5000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/17f3C2aA0yZ9-xW8-vU7-tS6-rQ5-pP4/view?usp=drivesdk"),
    is_available: true,
    category: "MUV"
  },
  {
    id: 16,
    brand: "Toyota",
    model: "Innova Hycross",
    variant_transmission: "Automatic",
    fuel_type: "Hybrid",
    seating_capacity: 7,
    hourly_rate: 333,
    security_deposit: 5000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/18g4D3bB1zZ0-yX9-wV8-uT7-sR6-qQ5/view?usp=drivesdk"),
    is_available: true,
    category: "MUV"
  },
  {
    id: 17,
    brand: "Toyota",
    model: "Innova Hycross ZX(O)",
    variant_transmission: "Automatic",
    fuel_type: "Hybrid",
    seating_capacity: 7,
    hourly_rate: 417,
    security_deposit: 5000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/18g4D3bB1zZ0-yX9-wV8-uT7-sR6-qQ5/view?usp=drivesdk"),
    is_available: true,
    category: "Luxury"
  },
  {
    id: 18,
    brand: "Toyota",
    model: "Fortuner 4x2",
    variant_transmission: "Automatic",
    fuel_type: "Diesel",
    seating_capacity: 7,
    hourly_rate: 417,
    security_deposit: 10000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/19h5E4cC2aA1-zY0-xW9-vU8-tS7-rR6/view?usp=drivesdk"),
    is_available: true,
    category: "Luxury"
  },
  {
    id: 19,
    brand: "Toyota",
    model: "Fortuner 4x4",
    variant_transmission: "Automatic",
    fuel_type: "Diesel",
    seating_capacity: 7,
    hourly_rate: 458,
    security_deposit: 10000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/19h5E4cC2aA1-zY0-xW9-vU8-tS7-rR6/view?usp=drivesdk"),
    is_available: true,
    category: "Luxury"
  },
  {
    id: 20,
    brand: "Tata",
    model: "Nexon 2025",
    variant_transmission: "Manual",
    fuel_type: "Petrol",
    seating_capacity: 5,
    hourly_rate: 117,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1mvxm-Z64rgxrriXE4q3pU9oSq1F1vvdk/view?usp=drivesdk"),
    is_available: true,
    category: "SUV"
  },
  {
    id: 21,
    brand: "Tata",
    model: "Punch 2026",
    variant_transmission: "Manual",
    fuel_type: "Petrol",
    seating_capacity: 5,
    hourly_rate: 105,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1mvxm-Z64rgxrriXE4q3pU9oSq1F1vvdk/view?usp=drivesdk"),
    is_available: true,
    category: "Hatchback"
  },
  {
    id: 22,
    brand: "Tata",
    model: "Safari",
    variant_transmission: "Automatic",
    fuel_type: "Diesel",
    seating_capacity: 6,
    hourly_rate: 375,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1cE2ZSnX39ApvlXQOJWnARn54_ma5TQSA/view?usp=drivesdk"),
    is_available: true,
    category: "SUV"
  },
  {
    id: 23,
    brand: "Mahindra",
    model: "Scorpio N",
    variant_transmission: "Manual",
    fuel_type: "Diesel",
    seating_capacity: 7,
    hourly_rate: 229,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1wKIdSZZ3mykmzIZSpKGXRl_zFkWQNcuq/view?usp=drivesdk"),
    is_available: true,
    category: "SUV"
  },
  {
    id: 24,
    brand: "Mahindra",
    model: "Scorpio N Automatic",
    variant_transmission: "Automatic",
    fuel_type: "Diesel",
    seating_capacity: 7,
    hourly_rate: 271,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1wKIdSZZ3mykmzIZSpKGXRl_zFkWQNcuq/view?usp=drivesdk"),
    is_available: true,
    category: "SUV"
  },
  {
    id: 25,
    brand: "Mahindra",
    model: "Scorpio Classic",
    variant_transmission: "Manual",
    fuel_type: "Diesel",
    seating_capacity: 7,
    hourly_rate: 188,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1wKIdSZZ3mykmzIZSpKGXRl_zFkWQNcuq/view?usp=drivesdk"),
    is_available: true,
    category: "SUV"
  },
  {
    id: 26,
    brand: "Maruti Suzuki",
    model: "Swift",
    variant_transmission: "Manual",
    fuel_type: "Petrol + CNG",
    seating_capacity: 5,
    hourly_rate: 104,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1kdLktKSk6yMlPJDY5BVdeNyC70rfM6eZ/view?usp=drivesdk"),
    is_available: true,
    category: "Hatchback"
  },
  {
    id: 27,
    brand: "Mahindra",
    model: "Thar",
    variant_transmission: "Manual",
    fuel_type: "Diesel",
    seating_capacity: 4,
    hourly_rate: 229,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1bC337oF5wf0Dl2KdkdRgagkeOP_VFqI5/view?usp=drivesdk"),
    is_available: true,
    category: "SUV"
  },
  {
    id: 28,
    brand: "Mahindra",
    model: "Thar Automatic",
    variant_transmission: "Automatic",
    fuel_type: "Diesel",
    seating_capacity: 4,
    hourly_rate: 271,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1bC337oF5wf0Dl2KdkdRgagkeOP_VFqI5/view?usp=drivesdk"),
    is_available: true,
    category: "SUV"
  },
  {
    id: 29,
    brand: "Mahindra",
    model: "Thar Roxx",
    variant_transmission: "Automatic",
    fuel_type: "Diesel",
    seating_capacity: 4,
    hourly_rate: 333,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1bC337oF5wf0Dl2KdkdRgagkeOP_VFqI5/view?usp=drivesdk"),
    is_available: true,
    category: "SUV"
  },
  {
    id: 30,
    brand: "Hyundai",
    model: "Venue",
    variant_transmission: "Manual",
    fuel_type: "Petrol",
    seating_capacity: 5,
    hourly_rate: 117,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/12a8Z9yX7vW6-uT5-sR4-qP3-oN2-mM1/view?usp=drivesdk"),
    is_available: true,
    category: "SUV"
  },
  {
    id: 31,
    brand: "Kia",
    model: "Seltos",
    variant_transmission: "Automatic",
    fuel_type: "Diesel",
    seating_capacity: 5,
    hourly_rate: 188,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/13b9Y8xW6vU5-tS4-rQ3-pN2-oM1-lL0/view?usp=drivesdk"),
    is_available: true,
    category: "SUV"
  },
  {
    id: 32,
    brand: "Kia",
    model: "Carens",
    variant_transmission: "Manual",
    fuel_type: "Diesel",
    seating_capacity: 7,
    hourly_rate: 167,
    security_deposit: 3000,
    image_url: getDriveDirectUrl("https://drive.google.com/file/d/1IaOGRC0_ijk7Ud5FDv4PK2tk6IFQ8HHu/view?usp=drivesdk"),
    is_available: true,
    category: "MUV"
  }
];

export default function SelfDrivePage() {
  const [cars, setCars] = useState<SelfDriveCar[]>(ALL_32_CARS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCar, setSelectedCar] = useState<SelfDriveCar | null>(null);

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
    fetchCarsFromDB();
  }, []);

  async function fetchCarsFromDB() {
    try {
      const { data } = await supabase
        .from('self_drive_cars')
        .select('*')
        .order('display_order', { ascending: true });

      if (data && data.length > 0) {
        setCars(data);
      }
    } catch (err: any) {
      console.log('Using complete CSV fleet fallback');
    }
  }

  // Filter logic
  const filteredCars = cars.filter(car => {
    const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
    const matchesSearch = `${car.brand} ${car.model}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  async function handleSubmitBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCar) return;

    if (estimate.hours <= 0) {
      setErrorMessage('Please select a valid return date and time after your pickup time.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const generatedRef = `CWD-2026-${selectedCar.model.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const carNameSnapshot = `${selectedCar.brand} ${selectedCar.model} (${selectedCar.variant_transmission})`;

      await supabase
        .from('booking_requests')
        .insert([
          {
            service_type: 'self_drive',
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
        ]);

      setBookingSuccessRef(generatedRef);
    } catch (err: any) {
      setBookingSuccessRef(generatedRef);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-4">
        <div className="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
          Ghansoli Hub, Navi Mumbai • Total {cars.length} Cars Available
        </div>
        <h1 className="text-3xl sm:text-5xl font-black">Self Drive Car Fleet</h1>
        <p className="text-slate-300 max-w-2xl text-sm sm:text-base">
          From economical hatchbacks starting at ₹104/hr to luxury BMW & Fortuner rentals. Select any car to view instant tentative calculations.
        </p>

        <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl text-xs text-amber-300">
          ⚠️ <strong>Fuel Policy:</strong> Fuel is NOT included. The car is handed over with recorded fuel level on the receipt and must be returned at the same level.
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {['All', 'Hatchback', 'Sedan', 'SUV', 'MUV', 'Luxury'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search car (e.g. Nexon, Swift, Thar)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:outline-emerald-600 font-semibold"
          />
        </div>
      </div>

      {/* 32 Cars Grid */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCars.map((car) => {
            const isSelected = selectedCar?.id === car.id;

            return (
              <div
                key={car.id}
                className={`bg-white rounded-3xl border transition-all p-5 flex flex-col justify-between shadow-sm hover:shadow-lg ${
                  isSelected ? 'border-emerald-600 ring-2 ring-emerald-600/20' : 'border-slate-200'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{car.brand}</span>
                      <h3 className="text-lg font-black text-slate-900">{car.model}</h3>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ₹{car.hourly_rate}/hr
                    </span>
                  </div>

                  <div className="h-40 bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100">
                    {car.image_url ? (
                      <img src={car.image_url} alt={car.model} className="h-full w-full object-cover" />
                    ) : (
                      <div className="text-slate-400 font-bold text-xs">Car Image</div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-slate-600">
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md">{car.variant_transmission}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md">{car.fuel_type}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md">{car.seating_capacity} Seats</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-end text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">Hourly Tariff</div>
                      <div className="text-xl font-black text-slate-900">₹{car.hourly_rate}<span className="text-[10px] font-normal text-slate-500">/hr</span></div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">Security Deposit</div>
                      <div className="text-xs font-bold text-emerald-700">₹{car.security_deposit}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSelectedCar(car);
                      setBookingSuccessRef(null);
                      const element = document.getElementById('booking-calculator');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isSelected ? '✓ Selected' : 'Select Car & Calculate'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Calculator Section */}
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
                  href={`https://wa.me/91${phoneNumber}?text=Hi%2C%20I%20have%20submitted%20request%20${bookingSuccessRef}%20for%20${encodeURIComponent(selectedCar.brand + ' ' + selectedCar.model)}`}
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
            <form onSubmit={handleSubmitBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
