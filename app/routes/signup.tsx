import React, { useState } from "react";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const maritalStatusOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "widow", label: "Widow" },
];

function calculateAge(dateString: string) {
  if (!dateString) return "";
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function SignUp() {
  const [form, setForm] = useState({
    phone: "",
    password: "",
    city: "",
    address1: "",
    address2: "",
    gender: "male",
    dob: "",
    maritalStatus: "single",
  });

  const age = calculateAge(form.dob);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 safe-area">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl p-4 sm:p-8 flex flex-col items-center gap-6 sm:gap-8 mx-2">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center shadow-lg">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white object-cover"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white text-center">
            Let's meet new people around you
          </h1>
        </div>
        <form className="w-full flex flex-col gap-3 sm:gap-4">
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none bg-white dark:bg-gray-800 dark:text-white text-base sm:text-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none bg-white dark:bg-gray-800 dark:text-white text-base sm:text-lg"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none bg-white dark:bg-gray-800 dark:text-white text-base sm:text-lg"
          />
          <input
            type="text"
            name="address1"
            placeholder="Address Line 1"
            value={form.address1}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none bg-white dark:bg-gray-800 dark:text-white text-base sm:text-lg"
          />
          <input
            type="text"
            name="address2"
            placeholder="Address Line 2"
            value={form.address2}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none bg-white dark:bg-gray-800 dark:text-white text-base sm:text-lg"
          />
          <div className="flex gap-4 flex-col sm:flex-row">
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none bg-white dark:bg-gray-800 dark:text-white text-base sm:text-lg"
            >
              {genderOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <select
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleChange}
              className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none bg-white dark:bg-gray-800 dark:text-white text-base sm:text-lg"
            >
              {maritalStatusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none bg-white dark:bg-gray-800 dark:text-white text-base sm:text-lg"
            />
            <span className="text-gray-700 dark:text-gray-200 min-w-[40px] text-center text-base sm:text-lg">{age ? `${age} yrs` : ""}</span>
          </div>
          <button
            type="submit"
            className="w-full py-2 sm:py-3 rounded-xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold text-lg shadow-md hover:scale-105 transition-transform"
          >
            Sign Up
          </button>
        </form>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <a href="/login" className="text-purple-600 hover:underline font-medium">
            Log In
          </a>
        </div>
      </div>
    </main>
  );
} 