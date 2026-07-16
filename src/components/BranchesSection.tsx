import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Laptop, X, ChevronRight } from 'lucide-react';
import { Branch, Program } from '../types';
import { CHURCH_CONTACT } from '../contactInfo';
import { branchExcerpt, getBranchPhotoUrl } from '../branchPhotos';

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
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const sortedPrograms = [...programs].sort((a, b) => {
    const dayDiff = DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return a.time.localeCompare(b.time);
  });

  useEffect(() => {
    if (!selectedBranch) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedBranch(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedBranch]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">

      {/* Hero */}
      <section className="bg-slate-950 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 z-0" />
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

      {/* Branch photo cards */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-heading">Find a Local TCC</span>
          <h3 className="font-heading text-2xl font-bold text-slate-900 md:text-3xl">
            Our Congregations in Uganda
          </h3>
          <div className="h-1 w-12 bg-gold-500 mx-auto" />
          <p className="text-slate-500 text-xs">
            Since the inception of the Ministry, TCC has strategically expanded through branches within
            the country, with plans underway to go beyond borders.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {branches.map((br) => (
            <article
              key={br.id}
              className={`group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg ${
                br.isHeadquarters
                  ? 'border-gold-500/60 ring-1 ring-gold-500/20'
                  : 'border-slate-100'
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <img
                  src={getBranchPhotoUrl(br)}
                  alt={br.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                {br.isHeadquarters && (
                  <span className="absolute top-3 left-3 rounded-full bg-gold-500 px-3 py-1 font-heading text-[9px] font-bold tracking-wider text-slate-950 uppercase shadow">
                    ★ Headquarters
                  </span>
                )}
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <h4 className="font-heading font-bold text-lg text-white leading-tight">{br.name}</h4>
                  <p className="mt-1 flex items-start gap-1.5 text-[11px] text-slate-200/90 line-clamp-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    {br.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 space-y-4">
                {br.isHeadquarters ? (
                  <p className="text-xs text-slate-500 font-medium">Leadership: {br.pastor}</p>
                ) : br.pastor !== 'Contact Headquarters' ? (
                  <p className="text-xs text-slate-500 font-medium">Leader: {br.pastor}</p>
                ) : null}

                {br.description && (
                  <p className="text-xs leading-relaxed text-slate-600">
                    {branchExcerpt(br.description, 140)}
                  </p>
                )}

                <div className="mt-auto flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBranch(br)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-950 py-2.5 text-xs font-bold text-white hover:bg-slate-900 transition-colors"
                  >
                    Read more
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                  <a
                    href={`tel:${br.phone}`}
                    className="rounded-lg border border-slate-200 px-3 py-2.5 text-slate-700 hover:border-gold-500 hover:text-gold-700 transition-colors flex items-center justify-center"
                    title="Call branch"
                  >
                    <Phone className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Branch detail modal */}
      {selectedBranch && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/80 p-0 sm:p-6"
          onClick={() => setSelectedBranch(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedBranch.name}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedBranch(null)}
              className="absolute top-3 right-3 z-10 rounded-full bg-slate-950/70 p-2 text-white hover:bg-slate-950"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-[16/9] shrink-0 bg-slate-200">
              <img
                src={getBranchPhotoUrl(selectedBranch)}
                alt={selectedBranch.name}
                className="h-full w-full object-cover"
              />
              {selectedBranch.isHeadquarters && (
                <span className="absolute top-3 left-3 rounded-full bg-gold-500 px-3 py-1 font-heading text-[9px] font-bold tracking-wider text-slate-950 uppercase">
                  ★ National Headquarters
                </span>
              )}
            </div>

            <div className="overflow-y-auto p-6 space-y-5">
              <div>
                <h3 className="font-heading text-xl font-bold text-slate-900">{selectedBranch.name}</h3>
                {selectedBranch.isHeadquarters ? (
                  <p className="text-sm text-slate-500 mt-1">Leadership: {selectedBranch.pastor}</p>
                ) : selectedBranch.pastor !== 'Contact Headquarters' ? (
                  <p className="text-sm text-slate-500 mt-1">Leader: {selectedBranch.pastor}</p>
                ) : null}
              </div>

              {selectedBranch.description && (
                <p className="text-sm leading-relaxed text-slate-600">{selectedBranch.description}</p>
              )}

              <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-gold-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{selectedBranch.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gold-600 shrink-0" />
                  <a href={`tel:${selectedBranch.phone}`} className="text-slate-700 hover:text-gold-600 hover:underline">
                    {selectedBranch.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gold-600 shrink-0" />
                  <a href={`mailto:${selectedBranch.email}`} className="text-slate-700 hover:text-gold-600 hover:underline break-all">
                    {selectedBranch.email}
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedBranch.name + ' ' + selectedBranch.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center rounded-lg bg-gold-500 py-3 text-xs font-bold text-slate-950 hover:bg-gold-400 transition-colors"
                >
                  Get Directions
                </a>
                <a
                  href={`tel:${selectedBranch.phone}`}
                  className="flex-1 text-center rounded-lg border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:border-gold-500 hover:text-gold-700 transition-colors"
                >
                  Call Branch
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Stay Connected */}
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
