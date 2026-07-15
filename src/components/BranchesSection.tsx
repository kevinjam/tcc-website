import React from 'react';
import { MapPin, Phone, Mail, Landmark, MessageCircle, Laptop } from 'lucide-react';
import { Branch, Program } from '../types';
import { CHURCH_CONTACT } from '../contactInfo';

interface BranchesSectionProps {
  branches: Branch[];
  programs: Program[];
}

const DAY_ORDER = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DAY_ACCENT: Record<string, string> = {
  Sunday: 'border-l-violet-500',
  Monday: 'border-l-sky-500',
  Tuesday: 'border-l-rose-700',
  Wednesday: 'border-l-blue-500',
  Thursday: 'border-l-emerald-500',
  Friday: 'border-l-indigo-500',
  Saturday: 'border-l-orange-500',
};

export default function BranchesSection({ branches, programs }: BranchesSectionProps) {
  const sortedPrograms = [...programs].sort((a, b) => {
    const dayDiff = DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      
      {/* Hero Banner header */}
      <section className="bg-slate-950 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold font-heading">Connect Locally</span>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Our Branches &amp; Weekly Programme
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            We warmly welcome you, your family, and friends to worship, fellowship, and grow in the
            knowledge of our Lord Jesus Christ through our weekly services and ministry programmes.
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

      {/* Weekly Programme */}
      <section className="bg-slate-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 font-heading">Weekly Programme</span>
            <h3 className="font-heading text-2xl font-bold tracking-tight md:text-4xl">
              Worship • Grow • Serve • Impact
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Join us throughout the week for worship, fellowship, prayer, and Radio TCC broadcasts.
              Everyone is welcome.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sortedPrograms.map((prg) => (
              <article
                key={prg.id}
                className={`rounded-xl bg-slate-950 border border-slate-800 border-l-4 p-5 space-y-2.5 ${DAY_ACCENT[prg.day] || 'border-l-gold-500'}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 font-heading">
                    {prg.day}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                    {prg.time}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-sm text-white leading-snug">{prg.name}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{prg.description}</p>
                <div className="flex items-center text-[10px] text-slate-500 pt-1">
                  <MapPin className="mr-1 h-3 w-3 shrink-0" />
                  <span>{prg.location || 'Main Sanctuary, Rubaga Road'}</span>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-slate-500 text-xs max-w-xl mx-auto leading-relaxed">
            Come and experience God&apos;s love, the power of His Word, heartfelt worship, and genuine
            fellowship — where lives are transformed through Jesus Christ.
          </p>
        </div>
      </section>

      {/* Stay Connected: WhatsApp + ICT Hub */}
      <section className="bg-slate-50 py-16 md:py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-heading">Stay Connected</span>
            <h3 className="font-heading text-2xl font-bold text-slate-900 md:text-3xl">
              WhatsApp Channel &amp; ICT Hub
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Follow announcements wherever you are, and serve God through technology with the TCC ICT Hub.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <a
              href={CHURCH_CONTACT.whatsappChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all space-y-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h4 className="font-heading font-bold text-base text-slate-900">Official WhatsApp Channel</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive church announcements, daily inspirational messages, sermon highlights, upcoming
                events, prayer updates, and Radio TCC &amp; TV TCC news.
              </p>
              <span className="inline-flex items-center text-xs font-bold text-emerald-700 group-hover:underline">
                Follow the channel →
              </span>
            </a>

            <a
              href={CHURCH_CONTACT.ictHubWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-gold-400 hover:shadow-md transition-all space-y-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 text-gold-700 border border-gold-100 group-hover:bg-gold-100 transition-colors">
                <Laptop className="h-5 w-5" />
              </div>
              <h4 className="font-heading font-bold text-base text-slate-900">Join the TCC ICT Hub</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Learn, grow, and serve through tech — website development, live streaming, graphic design,
                radio broadcasting, cybersecurity, and digital ministry. Beginners and professionals welcome.
              </p>
              <span className="inline-flex items-center text-xs font-bold text-gold-700 group-hover:underline">
                Join on WhatsApp →
              </span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
