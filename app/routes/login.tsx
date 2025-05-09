import React, { useState } from "react";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 safe-area">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl p-4 sm:p-8 flex flex-col items-center gap-6 sm:gap-8 mx-2">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center shadow-lg">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
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
            placeholder="Phone number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none bg-white dark:bg-gray-800 dark:text-white text-base sm:text-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none bg-white dark:bg-gray-800 dark:text-white text-base sm:text-lg"
          />
          <button
            type="submit"
            className="w-full py-2 sm:py-3 rounded-xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold text-lg shadow-md hover:scale-105 transition-transform"
          >
            Log In
          </button>
        </form>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{' '}
          <a href="/signup" className="text-purple-600 hover:underline font-medium">
            Sign Up
          </a>
        </div>
      </div>
    </main>
  );
} 