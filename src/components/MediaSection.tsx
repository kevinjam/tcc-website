import React, { useState } from 'react';
import { Tv, Radio, Play, Pause, Grid, Filter, Calendar, Camera, Volume2, ShieldCheck, Heart } from 'lucide-react';
import { GalleryItem, LiveStreamConfig } from '../types';

interface MediaSectionProps {
  gallery: GalleryItem[];
  liveStream: LiveStreamConfig;
}

type CategoryFilter = 'All' | 'Worship' | 'Youth' | 'Brigade' | 'Community' | 'Outreach';

export default function MediaSection({ gallery, liveStream }: MediaSectionProps) {
  const [filter, setFilter] = useState<CategoryFilter>('All');
  const [isPlayingRadio, setIsPlayingRadio] = useState(false);
  const [radioVolume, setRadioVolume] = useState(80);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Filter gallery items
  const filteredGallery = filter === 'All' 
    ? gallery 
    : gallery.filter(item => item.category === filter);

  const filterOptions: CategoryFilter[] = ['All', 'Worship', 'Youth', 'Brigade', 'Community', 'Outreach'];

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
              Experience our power-packed Sunday English Celebrations, Luganda ministries, and 24/7 radio broadcasts wherever you are in the world.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            
            {/* TV TCC Stream (Left column - 7 cols) */}
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

              {/* Video Player Wrapper */}
              <div className="relative aspect-video w-full rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
                {/* Standard YouTube Embed matching config */}
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

            {/* Radio TCC Stream (Right column - 5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Radio className="h-5 w-5 text-amber-500" />
                  <h3 className="font-heading font-bold text-base text-white">Radio TCC 104.1 FM</h3>
                </div>
                <span className="rounded-full bg-amber-600/20 px-2.5 py-0.5 text-[9px] font-bold text-amber-400 border border-amber-500/30 tracking-widest uppercase">
                  📡 On-Air 24/7
                </span>
              </div>

              {/* Audio Player Container */}
              <div className="rounded-2xl bg-slate-900 p-8 border border-slate-800 shadow-2xl flex flex-col items-center text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-amber-500 to-yellow-500"></div>

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-400 shadow-inner">
                  <Volume2 className="h-8 w-8 animate-pulse" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-heading font-bold text-lg text-white">{liveStream.radioTitle}</h4>
                  <p className="text-xs text-slate-400">Broadcasting Hope, Deliverance &amp; Luganda Praise</p>
                </div>

                {/* VISUAL EQUALIZER ANIMATION (Only active when playing!) */}
                <div className="flex items-end justify-center space-x-1 h-12 w-full px-8">
                  {isPlayingRadio ? (
                    // Equalizer bouncing bars
                    Array.from({ length: 18 }).map((_, i) => {
                      const delays = ['0s', '0.2s', '0.4s', '0.1s', '0.3s', '0.5s'];
                      const randomDelay = delays[i % delays.length];
                      return (
                        <span 
                          key={i} 
                          className="w-1 bg-amber-500 rounded-t animate-equalizer-bounce"
                          style={{
                            height: `${Math.floor(Math.random() * 80) + 20}%`,
                            animationDelay: randomDelay,
                            animationDuration: `${Math.random() * 0.5 + 0.5}s`
                          }}
                        ></span>
                      );
                    })
                  ) : (
                    // Static flat bars
                    Array.from({ length: 18 }).map((_, i) => (
                      <span key={i} className="w-1 h-1.5 bg-slate-800 rounded-t"></span>
                    ))
                  )}
                </div>

                {/* Radio Controls */}
                <div className="w-full space-y-4">
                  <button
                    onClick={() => setIsPlayingRadio(!isPlayingRadio)}
                    className={`w-full rounded-xl py-3.5 font-heading text-sm font-bold flex items-center justify-center space-x-2.5 transition-all shadow active:scale-95 ${
                      isPlayingRadio
                        ? 'bg-slate-800 text-gold-400 border border-slate-700 hover:bg-slate-750'
                        : 'bg-gold-500 text-slate-950 hover:bg-gold-400'
                    }`}
                  >
                    {isPlayingRadio ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
                    <span>{isPlayingRadio ? 'PAUSE RADIO' : 'LISTEN LIVE ON THIS SITE'}</span>
                  </button>

                  <a
                    href={liveStream.radioSiteUrl || 'https://radio.tccug.org/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center space-x-2 rounded-xl border border-amber-500/40 bg-amber-950/30 py-3 font-heading text-sm font-bold text-amber-300 transition-all hover:border-amber-400 hover:text-amber-200"
                  >
                    <Radio className="h-4 w-4" />
                    <span>Open Radio TCC Website</span>
                  </a>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Stream: RadioJar</span>
                    <span>radio.tccug.org</span>
                  </div>
                </div>

                {/* Audio stream — no native controls; custom Listen/Pause button above */}
                {isPlayingRadio && (
                  <audio
                    src={liveStream.radioUrl}
                    autoPlay
                    hidden
                    onError={() => console.error('Radio TCC stream failed to load')}
                  />
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PHOTO GALLERY (With Filter) */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-heading">Visual Archive</span>
          <h3 className="font-heading text-2xl font-bold text-slate-900 md:text-3xl">
            Church Photo Galleries
          </h3>
          <div className="h-1 w-12 bg-gold-500 mx-auto"></div>
          <p className="text-slate-500 text-xs">
            Browse snapshots from previous Sunday services, Boys&apos; &amp; Girls&apos; Brigade drills, camps, and community outreach.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <Filter className="h-4 w-4 text-slate-400 mr-2" />
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`rounded-full px-4.5 py-1.5 text-xs font-bold transition-all ${
                filter === opt
                  ? 'bg-slate-900 text-gold-400'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGallery.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group cursor-pointer rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="h-[240px] w-full overflow-hidden relative bg-slate-100">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="rounded-full bg-slate-900/90 border border-slate-700 px-4 py-2 text-xs font-bold text-gold-400 backdrop-blur-sm">
                    View Photo Details
                  </span>
                </div>
                <span className="absolute top-4 left-4 rounded bg-slate-900/90 border border-slate-700/50 px-2.5 py-1 text-[9px] font-bold text-gold-400 uppercase tracking-widest">
                  {item.category}
                </span>
              </div>
              <div className="p-4 flex-1 space-y-2">
                <h4 className="font-heading font-bold text-sm text-slate-900 leading-snug group-hover:text-gold-600 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center text-[10px] text-slate-400">
                  <Calendar className="mr-1.5 h-3.5 w-3.5" />
                  <span>Captured: {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGallery.length === 0 && (
          <div className="rounded-2xl bg-white border border-slate-100 p-12 text-center text-slate-400 max-w-sm mx-auto">
            <Camera className="h-10 w-10 mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-semibold">No photos in {filter} category yet</p>
            <p className="text-xs text-slate-500 mt-1">Staff can add photos to this category from the Staff Portal.</p>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 rounded-full bg-slate-950/80 p-2 text-white hover:bg-slate-950"
            >
              ✕
            </button>
            <div className="max-h-[70vh] bg-slate-950 overflow-hidden">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                className="w-full h-auto max-h-[70vh] mx-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 text-white space-y-2">
              <span className="rounded bg-gold-500 text-slate-950 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                {selectedImage.category}
              </span>
              <h4 className="font-heading font-bold text-lg text-white">{selectedImage.title}</h4>
              <p className="text-xs text-slate-400">Captured on: {new Date(selectedImage.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      )}

      {/* Equalizer animation CSS classes */}
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
