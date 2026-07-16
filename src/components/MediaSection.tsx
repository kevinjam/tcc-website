import React, { useEffect, useState } from 'react';
import { Tv, Radio, Play, Pause, Filter, Camera, Volume2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryItem, LiveStreamConfig } from '../types';

interface MediaSectionProps {
  gallery: GalleryItem[];
  liveStream: LiveStreamConfig;
}

type CategoryFilter = 'All' | GalleryItem['category'];

const PAGE_SIZE = 12;

export default function MediaSection({ gallery, liveStream }: MediaSectionProps) {
  const [filter, setFilter] = useState<CategoryFilter>('All');
  const [page, setPage] = useState(0);
  const [isPlayingRadio, setIsPlayingRadio] = useState(false);
  const [radioVolume, setRadioVolume] = useState(80);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredGallery = filter === 'All'
    ? gallery
    : gallery.filter((item) => item.category === filter);

  const categoriesInGallery = Array.from(new Set(gallery.map((g) => g.category)));
  const filterOptions: CategoryFilter[] = ['All', ...categoriesInGallery];

  const totalPages = Math.max(1, Math.ceil(filteredGallery.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const pageStart = safePage * PAGE_SIZE;
  const pageItems = filteredGallery.slice(pageStart, pageStart + PAGE_SIZE);

  const selectedImage = selectedIndex !== null ? filteredGallery[selectedIndex] : null;

  const openLightbox = (indexInFilter: number) => setSelectedIndex(indexInFilter);
  const closeLightbox = () => setSelectedIndex(null);

  const showPrev = () => {
    if (selectedIndex === null || filteredGallery.length === 0) return;
    setSelectedIndex((selectedIndex - 1 + filteredGallery.length) % filteredGallery.length);
  };

  const showNext = () => {
    if (selectedIndex === null || filteredGallery.length === 0) return;
    setSelectedIndex((selectedIndex + 1) % filteredGallery.length);
  };

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((i) =>
          i === null || filteredGallery.length === 0
            ? i
            : (i - 1 + filteredGallery.length) % filteredGallery.length
        );
      }
      if (e.key === 'ArrowRight') {
        setSelectedIndex((i) =>
          i === null || filteredGallery.length === 0
            ? i
            : (i + 1) % filteredGallery.length
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIndex, filteredGallery.length]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      
      {/* 1. LIVE BROADCAST CENTER */}
      <section className="bg-slate-950 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-slate-950 to-slate-950 z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-bold font-heading">Voice of the Gospel Network</span>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
              Live TV &amp; Radio Streaming
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Experience our Sunday celebrations and 24/7 Radio TCC broadcasts wherever you are.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            
            {/* TV TCC Stream */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Tv className="h-5 w-5 text-rose-500 animate-pulse" />
                  <h3 className="font-heading font-bold text-base text-white">TV TCC Broadcast</h3>
                </div>
                {liveStream.isLiveVideo && (
                  <span className="rounded-full bg-rose-600 px-2.5 py-0.5 text-[9px] font-bold text-white tracking-widest animate-pulse uppercase">
                    ● Live Service
                  </span>
                )}
              </div>

              <div className="relative aspect-video w-full rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
                <iframe 
                  src={liveStream.videoUrl} 
                  title={liveStream.videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0 z-10"
                ></iframe>
              </div>

              <div className="rounded-xl bg-slate-900 p-5 border border-slate-800 space-y-3">
                <h4 className="font-heading font-bold text-base text-white">{liveStream.videoTitle}</h4>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
                  <span>Channel: <strong className="text-gold-400">@tvtcc-ug</strong></span>
                  <span>Speaker: <strong className="text-gold-400">{liveStream.activeSpeaker}</strong></span>
                  <span>Location: <strong>TCC Rubaga Road, Kampala</strong></span>
                </div>
                <a
                  href="https://www.youtube.com/@tvtcc-ug"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 font-heading text-xs font-bold text-white transition-colors hover:bg-rose-500"
                >
                  <Tv className="h-3.5 w-3.5" />
                  Open TV TCC on YouTube
                </a>
              </div>
            </div>

            {/* Radio TCC Stream */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Radio className="h-5 w-5 text-amber-500" />
                  <h3 className="font-heading font-bold text-base text-white">Radio TCC</h3>
                </div>
                <span className="rounded-full bg-amber-600/20 px-2.5 py-0.5 text-[9px] font-bold text-amber-400 border border-amber-500/30 tracking-widest uppercase">
                  📡 On-Air 24/7
                </span>
              </div>

              <div className="rounded-2xl bg-slate-900 p-8 border border-slate-800 shadow-2xl flex flex-col items-center text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-amber-500 to-yellow-500"></div>

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-400 shadow-inner">
                  <Volume2 className="h-8 w-8 animate-pulse" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-heading font-bold text-lg text-white">{liveStream.radioTitle}</h4>
                  <p className="text-xs text-slate-400">Broadcasting Hope, Deliverance &amp; Praise</p>
                </div>

                <div className="flex items-end justify-center space-x-1 h-12 w-full px-8">
                  {isPlayingRadio ? (
                    Array.from({ length: 18 }).map((_, i) => {
                      const delays = ['0s', '0.2s', '0.4s', '0.1s', '0.3s', '0.5s'];
                      const heights = ['40%', '70%', '100%', '55%', '85%', '45%', '90%', '60%'];
                      return (
                        <div
                          key={i}
                          className="w-1.5 rounded-full bg-amber-400 animate-equalizer-bounce"
                          style={{
                            height: heights[i % heights.length],
                            animationDelay: delays[i % delays.length],
                          }}
                        />
                      );
                    })
                  ) : (
                    Array.from({ length: 18 }).map((_, i) => (
                      <div key={i} className="w-1.5 h-2 rounded-full bg-slate-700" />
                    ))
                  )}
                </div>

                <div className="flex items-center gap-4 w-full justify-center">
                  <button
                    onClick={() => setIsPlayingRadio(!isPlayingRadio)}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all active:scale-95 shadow-lg"
                  >
                    {isPlayingRadio ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current ml-0.5" />}
                  </button>
                  <a
                    href={liveStream.radioSiteUrl || 'https://radio.tccug.org/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-bold text-slate-300 hover:border-amber-500 hover:text-amber-400 transition-colors"
                  >
                    Open Radio TCC site
                  </a>
                </div>

                <div className="w-full px-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={radioVolume}
                    onChange={(e) => setRadioVolume(Number(e.target.value))}
                    className="w-full accent-amber-500"
                    aria-label="Radio volume"
                  />
                </div>

                {isPlayingRadio && (
                  <audio
                    key="radio-stream"
                    src={liveStream.radioUrl}
                    autoPlay
                    hidden
                    ref={(el) => {
                      if (el) el.volume = radioVolume / 100;
                    }}
                    onError={() => console.error('Radio TCC stream failed to load')}
                  />
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PHOTO GALLERY — dense grid + pagination */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 font-heading">From Rubaga Road</span>
            <h3 className="font-heading text-xl font-bold text-slate-900 md:text-2xl">
              Church Media Gallery
            </h3>
            <p className="text-slate-500 text-xs">
              {filteredGallery.length} photo{filteredGallery.length === 1 ? '' : 's'}
              {totalPages > 1 ? ` · page ${safePage + 1} of ${totalPages}` : ''}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-slate-400 hidden sm:block mr-1" />
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setFilter(opt);
                  setPage(0);
                  setSelectedIndex(null);
                }}
                className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all ${
                  filter === opt
                    ? 'bg-slate-900 text-gold-400'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {filteredGallery.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-400 max-w-sm mx-auto">
            <Camera className="h-9 w-9 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold">No photos in {filter} yet</p>
          </div>
        ) : (
          <>
            {/* Uniform dense grid — fits ~12 thumbs per viewport */}
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1.5 sm:gap-2">
              {pageItems.map((item, i) => {
                const absoluteIndex = pageStart + i;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => openLightbox(absoluteIndex)}
                    className="group relative aspect-square overflow-hidden rounded-md bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-1"
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-950/0 transition-colors group-hover:bg-slate-950/45" />
                    <div className="absolute inset-x-0 bottom-0 translate-y-full p-2 transition-transform duration-300 group-hover:translate-y-0 bg-gradient-to-t from-slate-950/90 to-transparent">
                      <p className="truncate text-[10px] font-semibold text-white leading-tight">{item.title}</p>
                      <p className="text-[9px] uppercase tracking-wider text-gold-400">{item.category}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={safePage === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-gold-400 disabled:opacity-40 disabled:pointer-events-none"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPage(i)}
                      className={`h-8 w-8 rounded-lg text-xs font-bold transition-colors ${
                        i === safePage
                          ? 'bg-slate-900 text-gold-400'
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-gold-400'
                      }`}
                      aria-label={`Go to page ${i + 1}`}
                      aria-current={i === safePage ? 'page' : undefined}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={safePage >= totalPages - 1}
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-gold-400 disabled:opacity-40 disabled:pointer-events-none"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Lightbox + filmstrip */}
      {selectedImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-slate-950/96"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
        >
          <div className="flex items-center justify-between px-4 py-3 shrink-0" onClick={(e) => e.stopPropagation()}>
            <div className="min-w-0 pr-4">
              <p className="truncate font-heading text-sm font-bold text-white">{selectedImage.title}</p>
              <p className="text-[10px] uppercase tracking-wider text-gold-400">
                {selectedImage.category} · {selectedIndex + 1} / {filteredGallery.length}
              </p>
            </div>
            <button
              type="button"
              onClick={closeLightbox}
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 shrink-0"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 md:px-16" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={showPrev}
              className="absolute left-2 md:left-4 z-30 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-h-full max-w-full object-contain shadow-2xl"
            />

            <button
              type="button"
              onClick={showNext}
              className="absolute right-2 md:right-4 z-30 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Filmstrip for quick jump across all photos */}
          <div
            className="shrink-0 border-t border-white/10 bg-slate-950/80 px-3 py-2.5 overflow-x-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-1.5 min-w-min mx-auto justify-center">
              {filteredGallery.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedIndex(i)}
                  className={`relative h-12 w-12 shrink-0 overflow-hidden rounded transition-all ${
                    i === selectedIndex
                      ? 'ring-2 ring-gold-400 opacity-100 scale-105'
                      : 'opacity-50 hover:opacity-90'
                  }`}
                  aria-label={`View ${item.title}`}
                >
                  <img src={item.url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes equalizer-bounce {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        .animate-equalizer-bounce {
          animation: equalizer-bounce 1s ease-in-out infinite;
          transform-origin: bottom;
        }
      `}</style>

    </div>
  );
}
