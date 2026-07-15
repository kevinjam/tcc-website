import React, { useState } from 'react';
import { Menu, X, Bell, Phone, MapPin, Radio, Tv, Heart } from 'lucide-react';
import { ChurchEvent } from '../types';
import { CHURCH_CONTACT } from '../contactInfo';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  upcomingEvents: ChurchEvent[];
  onOpenNotifications: () => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  upcomingEvents,
  onOpenNotifications,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationCount, setShowNotificationCount] = useState(true);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'branches', label: 'Branches & Programs' },
    { id: 'brigade', label: 'The Brigade' },
    { id: 'media', label: 'Media & Live Stream' },
    { id: 'contact', label: 'Connect' },
  ];

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950 text-white shadow-md">
      {/* Top Banner Contact Line */}
      <div className="hidden w-full bg-slate-900 px-4 py-2 text-xs text-slate-300 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <MapPin className="mr-1.5 h-3.5 w-3.5 text-gold-400" />
              Rubaga Road - Kampala, Uganda
            </span>
            <span className="flex items-center">
              <Phone className="mr-1.5 h-3.5 w-3.5 text-gold-400" />
              Mon - Sun: 24/7 (Voice of the Gospel)
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <a href={CHURCH_CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">Facebook</a>
              <a href="https://www.youtube.com/@tvtcc-ug" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">YouTube</a>
              <a href="#" className="hover:text-gold-400 transition-colors">Instagram</a>
              <a href={CHURCH_CONTACT.whatsappChannelUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">WhatsApp</a>
            </div>
            <button 
              onClick={() => handleTabClick('contact')}
              className="flex items-center space-x-1.5 rounded bg-gold-500 px-3 py-1 font-semibold text-slate-950 hover:bg-gold-400 transition-all active:scale-95"
            >
              <Heart className="h-3.5 w-3.5 fill-current" />
              <span>GIVE / DONATE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo & Title */}
          <div 
            onClick={() => handleTabClick('home')}
            className="flex cursor-pointer items-center space-x-3 select-none"
          >
            <img
              src="/tcc-logo.png"
              alt="Trinity Christian Church"
              className="h-12 w-auto object-contain md:h-14"
            />
            <div className="hidden min-[420px]:block">
              <h1 className="font-heading text-lg font-bold tracking-tight text-white md:text-xl">
                TRINITY <span className="text-gold-400">CHRISTIAN CHURCH</span>
              </h1>
              <p className="text-[9px] uppercase tracking-widest text-slate-400 font-sans">Voice of the Gospel</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`rounded-md px-3.5 py-2 font-heading text-sm font-medium transition-all ${
                  currentTab === item.id
                    ? 'bg-slate-900 text-gold-400 border-b-2 border-gold-500'
                    : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Utility Buttons: Notification bell & Mobile trigger */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                onOpenNotifications();
                setShowNotificationCount(false);
              }}
              className="relative rounded-full p-2 text-slate-300 hover:bg-slate-900 hover:text-gold-400 transition-colors"
              title="Upcoming Events & Notifications"
            >
              <Bell className="h-5 w-5" />
              {upcomingEvents.length > 0 && showNotificationCount && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-slate-950">
                  {upcomingEvents.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-300 hover:bg-slate-900 hover:text-white lg:hidden transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar/Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-slate-950 p-6 shadow-2xl ring-1 ring-white/10 lg:hidden animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading font-bold text-gold-400">TCC Menu</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full rounded-md px-4 py-3 text-left font-heading text-base font-semibold transition-all ${
                  currentTab === item.id
                    ? 'bg-slate-900 text-gold-400 border-l-4 border-gold-500'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => handleTabClick('contact')}
              className="mt-4 flex w-full items-center justify-center space-x-2 rounded-md bg-gold-500 py-3 font-heading font-bold text-slate-950 hover:bg-gold-400 active:scale-95 transition-all"
            >
              <Heart className="h-4 w-4 fill-current" />
              <span>GIVE & DONATE</span>
            </button>

            <div className="mt-8 rounded-lg bg-slate-900 p-4 border border-slate-800">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">Live Broadcasts</h3>
              <div className="space-y-3.5">
                <button
                  onClick={() => handleTabClick('media')}
                  className="flex w-full items-center justify-between text-xs text-slate-200 hover:text-gold-400"
                >
                  <span className="flex items-center"><Tv className="mr-2 h-4 w-4 text-rose-500" /> TV TCC Live</span>
                  <span className="rounded bg-rose-600 px-1.5 py-0.5 text-[9px] font-bold text-white animate-pulse">LIVE</span>
                </button>
                <a
                  href="https://radio.tccug.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-between text-xs text-slate-200 hover:text-gold-400"
                >
                  <span className="flex items-center"><Radio className="mr-2 h-4 w-4 text-amber-500" /> Radio TCC Live</span>
                  <span className="rounded bg-amber-600 px-1.5 py-0.5 text-[9px] font-bold text-white">24/7</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
