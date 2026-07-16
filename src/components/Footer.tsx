import React from 'react';
import { Phone, Mail, MapPin, Heart, Radio, Flame, Globe } from 'lucide-react';
import { Branch } from '../types';
import { CHURCH_CONTACT, phoneHref } from '../contactInfo';

interface FooterProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  branches: Branch[];
}

export default function Footer({ currentTab, setCurrentTab, branches }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 font-sans">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Church Brand Block */}
          <div className="space-y-4">
            <div className="flex flex-col items-start gap-2">
              <img
                src="/tcc-logo.png"
                alt="Trinity Christian Church"
                className="h-16 w-auto object-contain"
              />
              <p className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold">Voice of the Gospel</p>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Proclaiming the pure Word of God, transforming precious lives, and reaching the ends of the earth with the love of Jesus Christ. Join our loving family!
            </p>

            <div className="flex items-center space-x-2 text-xs text-gold-400/80 italic">
              <Flame className="h-4 w-4 animate-pulse text-amber-500 fill-amber-500" />
              <span>&ldquo;The fire shall ever be burning on the altar.&rdquo; &ndash; Lev 6:13</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold uppercase tracking-wider text-white border-b-2 border-gold-500/20 pb-2 mb-4 text-sm">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'Our Story & Vision' },
                { id: 'mission', label: 'Mission & Objectives' },
                { id: 'branches', label: 'Branches & Weekly Altars' },
                { id: 'brigade', label: 'The Brigade' },
                { id: 'media', label: 'TV & Radio Broadcasts' },
                { id: 'contact', label: 'Join Our Family / Contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => setCurrentTab(link.id)}
                    className={`hover:text-gold-400 transition-colors text-left ${
                      currentTab === link.id ? 'text-gold-400 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    &rsaquo; {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Branches list summary */}
          <div>
            <h4 className="font-heading font-bold uppercase tracking-wider text-white border-b-2 border-gold-500/20 pb-2 mb-4 text-sm">
              TCC Branches (Uganda)
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {branches.slice(0, 4).map((br) => (
                <li key={br.id} className="group">
                  <button 
                    onClick={() => setCurrentTab('branches')}
                    className="text-left hover:text-white transition-colors"
                  >
                    <p className="font-semibold text-slate-300 group-hover:text-gold-400">&rsaquo; {br.name}</p>
                    <p className="text-xs text-slate-500 truncate max-w-[240px]">{br.pastor}</p>
                  </button>
                </li>
              ))}
              {branches.length > 4 && (
                <li>
                  <button 
                    onClick={() => setCurrentTab('branches')}
                    className="text-xs text-gold-400 hover:underline"
                  >
                    View all {branches.length} branches...
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading font-bold uppercase tracking-wider text-white border-b-2 border-gold-500/20 pb-2 mb-4 text-sm">
              Contact
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start">
                <MapPin className="mr-2.5 h-5 w-5 shrink-0 text-gold-400" />
                <span>
                  {CHURCH_CONTACT.addressLine1}<br />
                  {CHURCH_CONTACT.addressLine2}
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2.5 mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span className="space-y-0.5">
                  {CHURCH_CONTACT.phones.map((phone) => (
                    <a
                      key={phone}
                      href={phoneHref(phone)}
                      className="block hover:text-white transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex items-start">
                <Globe className="mr-2.5 mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={CHURCH_CONTACT.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {CHURCH_CONTACT.website}
                </a>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2.5 mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span className="space-y-0.5">
                  {CHURCH_CONTACT.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block break-all hover:text-white transition-colors"
                    >
                      {email}
                    </a>
                  ))}
                </span>
              </li>
              
              {/* Call to Give */}
              <li>
                <button
                  onClick={() => setCurrentTab('contact')}
                  className="flex w-full items-center justify-center space-x-1.5 rounded-lg border border-gold-500/30 bg-gold-950/20 py-2 font-heading font-bold text-gold-400 hover:bg-gold-950/40 transition-all text-xs"
                >
                  <Heart className="h-3.5 w-3.5 fill-current" />
                  <span>SUPPORT OUR MISSIONS</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="my-10 border-t border-slate-900"></div>

        {/* Bottom copyright */}
        <div className="flex flex-col items-center justify-between space-y-4 text-xs text-slate-500 md:flex-row md:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} Trinity Christian Church (TCC) Uganda. All rights reserved.{' '}
            <span className="text-slate-400">Design by joshtechserver</span>
          </p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-slate-600">
              <Radio className="mr-1 h-3 w-3" />
              Voice of the Gospel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
