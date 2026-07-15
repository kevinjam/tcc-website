import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Bookmark, Landmark, ChevronRight, MessageSquare } from 'lucide-react';
import { Branch, Program } from '../types';

interface BranchesSectionProps {
  branches: Branch[];
  programs: Program[];
}

export default function BranchesSection({ branches, programs }: BranchesSectionProps) {
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);

  // Split programs into Sunday vs Mid-week
  const sundayPrograms = programs.filter(p => p.day === 'Sunday');
  const weekdayPrograms = programs.filter(p => p.day !== 'Sunday');

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      
      {/* Hero Banner header */}
      <section className="bg-slate-950 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold font-heading">Connect Locally</span>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Our Branches &amp; Weekly Altars
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Trinity Christian Church aims to establish self-governing, self-propagating, and self-supporting
            local churches across Uganda under the supervision of the main branch — in fulfilment of
            Christ&apos;s command to preach the Gospel to every creature (Mark 16:15; Matthew 28:19).
          </p>
        </div>
      </section>

      {/* Grid of Regional Branches */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-heading">Find a Local TCC</span>
          <h3 className="font-heading text-2xl font-bold text-slate-900 md:text-3xl">
            Our Congregations in Uganda
          </h3>
          <div className="h-1 w-12 bg-gold-500 mx-auto"></div>
          <p className="text-slate-500 text-xs">
            Since the inception of the Ministry, TCC has strategically expanded through branches within
            the country, with plans underway to go beyond borders.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((br) => (
            <div 
              key={br.id}
              className={`rounded-2xl border bg-white p-6 transition-all relative flex flex-col justify-between ${
                br.isHeadquarters 
                  ? 'border-gold-500/80 shadow-md ring-1 ring-gold-500/20' 
                  : 'border-slate-100 shadow-sm hover:shadow-md'
              }`}
            >
              {br.isHeadquarters && (
                <span className="absolute -top-3 right-6 rounded-full bg-gold-500 px-3 py-1 font-heading text-[9px] font-bold tracking-wider text-slate-950 uppercase shadow-sm">
                  ★ National Headquarters
                </span>
              )}

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className={`rounded-xl p-2.5 shrink-0 ${br.isHeadquarters ? 'bg-gold-50 text-gold-600 border border-gold-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                    <Landmark className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-slate-900">{br.name}</h4>
                    {br.isHeadquarters ? (
                      <p className="text-xs text-slate-500 font-medium mt-0.5">Leadership: {br.pastor}</p>
                    ) : br.pastor !== 'Contact Headquarters' ? (
                      <p className="text-xs text-slate-500 font-medium mt-0.5">Leader: {br.pastor}</p>
                    ) : null}
                  </div>
                </div>

                {br.description && (
                  <p className="text-xs leading-relaxed text-slate-600">{br.description}</p>
                )}

                <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <div className="flex items-start">
                    <MapPin className="mr-2 h-4 w-4 shrink-0 text-slate-400" />
                    <span>{br.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-slate-400" />
                    <a href={`tel:${br.phone}`} className="hover:text-gold-600 font-medium transition-colors">
                      {br.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-slate-400" />
                    <a href={`mailto:${br.email}`} className="hover:text-gold-600 font-medium transition-colors break-all">
                      {br.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex gap-2">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(br.name + ' ' + br.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-700 hover:border-gold-500 hover:text-gold-700 transition-all"
                >
                  Get Directions
                </a>
                <a 
                  href={`tel:${br.phone}`}
                  className="rounded-lg bg-slate-950 px-3 py-2 text-white hover:bg-slate-900 transition-all flex items-center justify-center"
                  title="Call Pastor"
                >
                  <Phone className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Programs (Altars) Schedule */}
      <section className="bg-slate-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 font-heading">Our Service Schedule</span>
            <h3 className="font-heading text-2xl font-bold tracking-tight md:text-4xl">
              Weekly Altars &amp; Fellowships
            </h3>
            <p className="text-slate-400 text-xs">
              Never miss an opportunity to seek the presence of God. Mark these weekly programs on your calendar.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            
            {/* Column A: Sunday Glory Services */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Calendar className="h-5 w-5 text-gold-400" />
                <h4 className="font-heading font-bold text-lg text-white">Sunday Worship Services</h4>
              </div>

              <div className="space-y-4">
                {sundayPrograms.map((prg) => (
                  <div key={prg.id} className="rounded-xl bg-slate-950 p-5 border border-slate-800 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <h5 className="font-heading font-bold text-sm text-gold-400">{prg.name}</h5>
                      <span className="rounded bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 text-[9px] font-bold text-gold-400 uppercase">
                        {prg.time}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs mt-2.5 leading-relaxed">{prg.description}</p>
                    <div className="mt-4 flex items-center text-[10px] text-slate-500 font-medium">
                      <MapPin className="mr-1 h-3.5 w-3.5" />
                      <span>Location: {prg.location || 'Main Sanctuary'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column B: Mid-week Devotional Altars */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Clock className="h-5 w-5 text-gold-400" />
                <h4 className="font-heading font-bold text-lg text-white">Mid-Week Altars &amp; Overnights</h4>
              </div>

              <div className="space-y-4">
                {weekdayPrograms.map((prg) => (
                  <div key={prg.id} className="rounded-xl bg-slate-950 p-5 border border-slate-800 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <h5 className="font-heading font-bold text-sm text-slate-200">{prg.name}</h5>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[9px] font-bold text-slate-300 uppercase shrink-0 ml-2">
                        {prg.day} | {prg.time}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs mt-2.5 leading-relaxed">{prg.description}</p>
                    <div className="mt-4 flex items-center text-[10px] text-slate-500 font-medium">
                      <MapPin className="mr-1 h-3.5 w-3.5" />
                      <span>Location: {prg.location || 'Main Sanctuary'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
