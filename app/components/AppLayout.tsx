import React, { useState } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { label: "Setting", icon: "⚙️" },
  { label: "Your Activity", icon: "📊" },
  { label: "Archive", icon: "🗄️" },
  { label: "Saved", icon: "💾" },
  { label: "Close Friends", icon: "👥" },
  { label: "Favorites", icon: "⭐" },
  { label: "Group profiles", icon: "👤" },
  { label: "Discover people", icon: "🔍" },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar Drawer for mobile/tablet, static for desktop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-72 bg-gradient-to-br from-purple-200 to-blue-100 dark:from-gray-800 dark:to-gray-900 shadow-xl transform transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:block`}
      >
        <div className="flex items-center gap-3 p-6 pb-2">
          <button
            className="text-2xl mr-2 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User"
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />
          <div>
            <div className="font-semibold text-gray-800 dark:text-white">Sarah Payne</div>
            <div className="text-xs text-gray-500 dark:text-gray-300">Show Profile</div>
          </div>
        </div>
        <nav className="flex-1 px-4 py-2">
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.label}>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-6 left-0 w-full flex justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-3 shadow-md">
            <span className="text-2xl font-bold text-purple-600">M</span>
          </div>
        </div>
      </aside>
      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full lg:max-w-lg lg:mx-auto">
        {/* Top bar */}
        <header className="flex items-center h-16 px-4 bg-white/80 dark:bg-gray-900/80 shadow-sm w-full">
          <button
            className="text-2xl mr-4 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Explore</h1>
        </header>
        <main className="flex-1 w-full px-0">{children}</main>
      </div>
    </div>
  );
} 