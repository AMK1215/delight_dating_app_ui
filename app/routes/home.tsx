import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import AppLayout from "../components/AppLayout";

const stories = [
  { name: "Your Story", img: "https://randomuser.me/api/portraits/women/44.jpg", active: true },
  { name: "Ben", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Lucie", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Marry", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Tony", img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Anna", img: "https://randomuser.me/api/portraits/women/22.jpg" },
  { name: "Mike", img: "https://randomuser.me/api/portraits/men/23.jpg" },
];

const featuredCards = [
  {
    name: "Noemi Slater",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Ben Harper",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Lucie Green",
    img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Marry Gold",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const navButtons = [
  {
    label: "Home",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12L12 3l9 9"/><path d="M9 21V9h6v12"/></svg>
    ),
    active: true,
  },
  {
    label: "Explore",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
    ),
    active: false,
  },
  {
    label: "Add",
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
    ),
    center: true,
  },
  {
    label: "Chat",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    ),
    active: false,
  },
  {
    label: "Profile",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2"/></svg>
    ),
    active: false,
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <AppLayout>
      <div className="w-full flex flex-col gap-6 pb-36 px-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
        {/* Stories Row */}
        <div className="flex items-center gap-4 overflow-x-auto flex-nowrap py-2 px-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent scrollbar-hide">
          {stories.map((story, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[64px]">
              <div className={`w-14 h-14 rounded-full border-4 ${story.active ? 'border-fuchsia-500' : 'border-gray-300'} flex items-center justify-center shadow-md`}>
                <img src={story.img} alt={story.name} className="w-12 h-12 rounded-full object-cover" />
              </div>
              <span className={`mt-1 text-xs font-bold ${story.active ? 'text-fuchsia-500' : 'text-gray-200 dark:text-gray-200'}`}>{story.name}</span>
            </div>
          ))}
        </div>
        {/* Action Buttons */}
        <div className="flex gap-4 justify-center w-full px-2">
          <button className="flex-1 px-7 py-2 rounded-full bg-white dark:bg-gray-800 shadow-lg text-fuchsia-600 font-bold border border-fuchsia-200 dark:border-gray-700 hover:bg-fuchsia-50 dark:hover:bg-gray-700 transition">Make Friends</button>
          <button className="flex-1 px-7 py-2 rounded-full bg-white dark:bg-gray-800 shadow-lg text-blue-600 font-bold border border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition">Search Partners</button>
        </div>
        {/* Featured Cards */}
        <div className="flex flex-col gap-8 w-full">
          {featuredCards.map((card, idx) => (
            <div key={idx} className="relative rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 mb-2 aspect-[4/3] flex flex-col justify-end w-full">
              <img src={card.img} alt={card.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <img src={card.avatar} alt={card.name} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                <span className="text-white font-semibold drop-shadow-lg text-lg">{card.name}</span>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
                <button className="bg-white/90 hover:bg-white text-fuchsia-500 rounded-full p-2 shadow-lg"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.04 3 12.5 4 13 5.09C13.5 4 14.96 3 16.5 3C19.5 3 22 5.5 22 8.5C22 13.5 12 21 12 21Z"/></svg></button>
                <button className="bg-white/90 hover:bg-white text-blue-500 rounded-full p-2 shadow-lg"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15A7 7 0 1 0 12 19.93"/></svg></button>
                <button className="bg-white/90 hover:bg-white text-gray-500 rounded-full p-2 shadow-lg"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg></button>
              </div>
            </div>
          ))}
        </div>
        {/* Spacer for fixed footer */}
        <div className="h-32" />
      </div>
      {/* Floating Bottom Navigation Bar */}
      <nav className="fixed bottom-4 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-xs mx-auto flex items-center justify-between bg-white/95 dark:bg-gray-900/95 px-2 py-3 rounded-full shadow-2xl border-t border-gray-200 dark:border-gray-800">
          {navButtons.map((btn, idx) =>
            btn.center ? (
              <button
                key={btn.label}
                className="flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white rounded-full p-5 -mt-14 shadow-2xl border-4 border-white dark:border-gray-900 focus:outline-none w-20 h-20 z-10"
                style={{ boxShadow: '0 8px 32px 0 rgba(128,90,213,0.18)' }}
              >
                {btn.icon}
              </button>
            ) : (
              <button
                key={btn.label}
                className={`flex flex-col items-center flex-1 ${btn.active ? 'text-fuchsia-500 font-bold' : 'text-gray-400'} focus:outline-none`}
              >
                {btn.icon}
                <span className="text-xs mt-1">{btn.label}</span>
              </button>
            )
          )}
        </div>
      </nav>
      <style>{`
        /* Hide scrollbar for mobile */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </AppLayout>
  );
}
