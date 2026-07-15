import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight, Sparkles, BookOpen, Calendar, Loader2 } from 'lucide-react';
import { ChurchInfo, ChurchEvent, Devotion, LiveStreamConfig } from '../types';

interface HomeSectionProps {
  churchInfo: ChurchInfo;
  events: ChurchEvent[];
  devotions: Devotion[];
  liveStream: LiveStreamConfig;
  setCurrentTab: (tab: string) => void;
}

export default function HomeSection({
  churchInfo,
  events,
  devotions,
  liveStream,
  setCurrentTab
}: HomeSectionProps) {
  const [aiTopic, setAiTopic] = useState('Hope & Strength');
  const [generatingDevotion, setGeneratingDevotion] = useState(false);
  const [generatedDevotion, setGeneratedDevotion] = useState<Devotion | null>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isVideoMuted;
    if (isVideoPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVideoPlaying, isVideoMuted]);

  // Pre-determined topics for AI devotion
  const aiTopics = [
    'Hope & Strength',
    'Healing & Deliverance',
    'Youth & Leadership',
    'Family Blessings',
    'Faith in Trials'
  ];

  // Find next featured event
  const featuredEvent = events.find(e => e.isFeatured) || events[0];

  const handleGenerateAiDevotion = async () => {
    setGeneratingDevotion(true);
    try {
      const response = await fetch('/api/gemini/devotion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic })
      });
      const data = await response.json();
      setGeneratedDevotion(data);
    } catch (error) {
      console.error('Error generating AI devotion:', error);
    } finally {
      setGeneratingDevotion(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. HERO — full-bleed background video + left media docks */}
      <section className="relative h-[640px] w-full overflow-hidden bg-slate-950 md:h-[720px]">
        {/* Background video */}
        <div className="absolute inset-0 z-0 select-none">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/bacground-video.mp4" type="video/mp4" />
          </video>
          {/* Legibility overlays */}
          <div className="absolute inset-0 z-10 bg-slate-950/55" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/30" />
        </div>

        {/* Hero copy — centered, clear of bottom-left media docks */}
        <div className="relative z-20 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 pb-36 text-center text-white xl:pb-44">
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
              Voice of the Gospel
            </span>
            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Welcome to <span className="text-gold-400">Trinity Christian Church</span>
            </h1>
            <p className="font-heading text-xs font-bold tracking-wider text-slate-200 sm:text-sm">
              PROCLAIMING THE WORD. TRANSFORMING LIVES. REACHING THE WORLD WITH THE GOSPEL.
            </p>
            <p className="mx-auto max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm md:text-base">
              Join us this Sunday to experience the tangible power and presence of God on Rubaga Road.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setCurrentTab('contact')}
                className="w-full rounded-lg bg-gold-500 px-6 py-3 font-heading text-sm font-bold text-slate-950 shadow-lg transition-all hover:bg-gold-400 active:scale-95 sm:w-auto"
              >
                Join Our Church Family
              </button>
              <button
                onClick={() => setCurrentTab('mission')}
                className="w-full rounded-lg border border-white/25 bg-slate-950/40 px-6 py-3 font-heading text-sm font-bold text-white transition-all hover:border-gold-500 hover:text-gold-400 sm:w-auto"
              >
                Our Mission & Story
              </button>
            </div>
          </div>
        </div>

        {/* Ambient video controls — bottom right */}
        <div className="absolute bottom-6 right-6 z-30 flex items-center space-x-3 rounded-full border border-slate-800 bg-slate-950/80 px-4 py-2.5 shadow-2xl backdrop-blur">
          <button
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            className="flex items-center space-x-1 text-[11px] font-bold text-gold-400 transition-colors hover:text-gold-300"
            title={isVideoPlaying ? 'Pause Background Video' : 'Play Background Video'}
          >
            {isVideoPlaying ? (
              <Pause className="h-3.5 w-3.5 text-gold-500" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-current text-slate-400" />
            )}
            <span className="hidden sm:inline">{isVideoPlaying ? 'Playing' : 'Paused'}</span>
          </button>

          <div className="h-4 w-px bg-slate-800" />

          <button
            onClick={() => setIsVideoMuted(!isVideoMuted)}
            className="flex items-center space-x-1.5 text-[11px] font-bold text-gold-400 transition-colors hover:text-gold-300"
            title={isVideoMuted ? 'Unmute Background Audio' : 'Mute Background Audio'}
          >
            {isVideoMuted ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-slate-400" />
                <span className="hidden sm:inline">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 animate-pulse text-gold-500" />
                <span className="hidden sm:inline">Live Audio</span>
              </>
            )}
          </button>
        </div>

        {/* TV & RADIO docks — left side only */}
        <div className="absolute bottom-6 left-4 z-30 hidden w-[min(100%,22rem)] flex-col space-y-3 xl:left-6 xl:flex">
          {/* TV TCC */}
          <div className="flex items-center justify-between border border-slate-700/80 bg-slate-950/90 p-3.5 shadow-xl backdrop-blur-md">
            <div className="flex min-w-0 items-center space-x-3">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center bg-indigo-950 text-indigo-400">
                <Play className="h-5 w-5 fill-current" />
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-rose-500" />
                </span>
              </div>
              <div className="min-w-0 text-left">
                <div className="flex items-center space-x-1.5">
                  <h4 className="font-heading text-sm font-bold text-white">TV TCC</h4>
                  <span className="rounded bg-rose-600 px-1 text-[8px] font-bold text-white">LIVE</span>
                </div>
                <p className="truncate text-[11px] text-slate-400">Watch services live &amp; recorded</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentTab('media')}
              className="ml-3 shrink-0 bg-indigo-800 px-3 py-1.5 text-xs font-semibold text-indigo-50 transition-all hover:bg-indigo-700"
            >
              Watch Now &rsaquo;
            </button>
          </div>

          {/* RADIO TCC */}
          <div className="flex items-center justify-between border border-slate-700/80 bg-slate-950/90 p-3.5 shadow-xl backdrop-blur-md">
            <div className="flex min-w-0 items-center space-x-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-amber-950 text-amber-400">
                <Volume2 className="h-5 w-5" />
              </div>
              <div className="min-w-0 text-left">
                <div className="flex items-center space-x-1.5">
                  <h4 className="font-heading text-sm font-bold text-white">RADIO TCC</h4>
                  <span className="rounded bg-amber-600 px-1 text-[8px] font-bold text-white">LIVE</span>
                </div>
                <p className="truncate text-[11px] text-slate-400">Voice of the Gospel 24/7</p>
              </div>
            </div>
            <a
              href="https://radio.tccug.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 shrink-0 bg-amber-800 px-3 py-1.5 text-xs font-semibold text-amber-50 transition-all hover:bg-amber-700"
            >
              Listen Live &rsaquo;
            </a>
          </div>
        </div>
      </section>

      {/* MOBILE TV & RADIO SHORTCUT TILES */}
      <div className="grid grid-cols-1 gap-4 p-4 bg-slate-950 border-b border-slate-900 xl:hidden md:grid-cols-2">
        <button
          onClick={() => setCurrentTab('media')}
          className="flex items-center justify-between rounded-lg bg-slate-900 p-4 border border-slate-800 text-left hover:border-indigo-500/50 transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-indigo-950 text-indigo-400">
              <Play className="h-5 w-5 fill-current" />
            </div>
            <div>
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-white">
                <span>TV TCC</span>
                <span className="rounded bg-rose-600 px-1 text-[8px] font-bold text-white animate-pulse">LIVE</span>
              </span>
              <p className="text-[10px] text-slate-400">Sermons, Choir & Testimony Broadcasts</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-500" />
        </button>

        <a
          href="https://radio.tccug.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-lg bg-slate-900 p-4 border border-slate-800 text-left hover:border-amber-500/50 transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-amber-950 text-amber-400">
              <Volume2 className="h-5 w-5" />
            </div>
            <div>
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-white">
                <span>RADIO TCC</span>
                <span className="rounded bg-amber-600 px-1 text-[8px] font-bold text-white">LIVE</span>
              </span>
              <p className="text-[10px] text-slate-400">Voice of the Gospel 24/7 — radio.tccug.org</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-500" />
        </a>
      </div>

      {/* 2. UPCOMING EVENT NOTIFICATION ALERTS */}
      {featuredEvent && (
        <section className="bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 px-4 py-4 text-slate-950 shadow-md">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-slate-950 p-2.5 text-gold-400 animate-bounce shadow">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <span className="rounded bg-slate-950 px-2 py-0.5 text-[9px] font-bold tracking-wider text-gold-400 uppercase">Upcoming Notice Alert</span>
                <h3 className="font-heading text-base font-bold tracking-tight">
                  Join Us: {featuredEvent.title}
                </h3>
                <p className="text-xs text-slate-900/80 font-medium">
                  Date: <strong>{new Date(featuredEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong> | Venue: <strong>{featuredEvent.location}</strong>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentTab('branches')}
                className="rounded-lg bg-slate-950 px-4.5 py-2 text-xs font-bold text-white hover:bg-slate-900 transition-all shadow active:scale-95 shrink-0"
              >
                Schedule & Venues
              </button>
              <button
                onClick={() => setCurrentTab('contact')}
                className="rounded-lg border border-slate-900 bg-transparent px-4 py-2 text-xs font-bold text-slate-950 hover:bg-slate-900/10 transition-all shrink-0"
              >
                Register & Inquiry
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 3. WELCOME & ABOUT SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Visual column */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-4 -left-4 h-full w-full rounded-2xl border-2 border-gold-500/20 z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=1200"
              alt="Trinity Sanctuary"
              className="relative z-10 h-[400px] w-full rounded-2xl object-cover shadow-2xl filter brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 z-20 rounded-xl bg-slate-900 p-4 border border-slate-800 text-white shadow-xl max-w-xs">
              <p className="font-display text-2xl font-bold text-gold-400">104.1 FM</p>
              <p className="text-xs text-slate-400">Broadcasting Luganda sermons, and local worship daily across Central Uganda.</p>
            </div>
          </div>

          {/* Copy column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-heading">Our Holy Mandate</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                The Voice Of The Gospel on Rubaga Road
              </h2>
            </div>
            
            <p className="text-slate-600 text-base leading-relaxed">
              {churchInfo.aboutText}
            </p>
            
            <p className="text-slate-600 text-base leading-relaxed">
              {churchInfo.historyText}
            </p>

            {/* Slogan card */}
            <div className="rounded-xl bg-gold-500/5 p-6 border-l-4 border-gold-500/80">
              <p className="font-heading text-sm font-bold uppercase tracking-wider text-gold-800">Our Slogan</p>
              <p className="font-display text-xl font-bold text-slate-900 mt-1 italic">
                &ldquo;Proclaiming the Word. Transforming Lives. Reaching the world with the Gospel.&rdquo;
              </p>
            </div>

            <button 
              onClick={() => setCurrentTab('about')}
              className="inline-flex items-center text-sm font-bold text-gold-700 hover:text-gold-500 transition-colors group"
            >
              <span>Learn more about our founders and statement of faith</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. VISION & MISSION STATEMENT */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 font-heading">Our Spiritual Direction</span>
            <h2 className="font-heading text-2xl font-bold tracking-tight md:text-4xl">
              Vision, Mission &amp; Objectives
            </h2>
            <div className="h-1 w-20 bg-gold-500 mx-auto"></div>
          </div>

          {/* Vision / Mission grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            
            {/* Vision */}
            <div className="relative border border-slate-800 bg-slate-950 p-8 transition-all hover:border-gold-500/30">
              <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center bg-gold-500 font-bold text-slate-950 shadow-lg">
                V
              </div>
              <h3 className="font-heading mb-4 mt-2 text-lg font-bold text-white">
                Vision
              </h3>
              <p className="text-sm leading-relaxed text-slate-300 line-clamp-5">
                {churchInfo.visionText}
              </p>
              <button
                onClick={() => setCurrentTab('mission')}
                className="mt-5 inline-flex items-center gap-1.5 font-heading text-xs font-bold text-gold-400 transition-colors hover:text-gold-300"
              >
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Mission */}
            <div className="relative border border-slate-800 bg-slate-950 p-8 transition-all hover:border-gold-500/30">
              <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center bg-gold-500 font-bold text-slate-950 shadow-lg">
                M
              </div>
              <h3 className="font-heading mb-4 mt-2 text-lg font-bold text-white">
                Mission
              </h3>
              <p className="text-sm leading-relaxed text-slate-300 line-clamp-5">
                {churchInfo.missionText}
              </p>
              <button
                onClick={() => setCurrentTab('mission')}
                className="mt-5 inline-flex items-center gap-1.5 font-heading text-xs font-bold text-gold-400 transition-colors hover:text-gold-300"
              >
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>

          {/* Objectives preview */}
          <div className="mx-auto mt-16 max-w-4xl border border-slate-800 bg-slate-950/50 p-8">
            <h4 className="mb-6 text-center font-heading text-base font-bold uppercase tracking-wider text-gold-400">
              Our Objectives
            </h4>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {churchInfo.aimsText.slice(0, 4).map((aim, idx) => (
                <div key={idx} className="flex items-start space-x-3.5">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10 text-xs font-bold text-gold-400">
                    {idx + 1}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300 line-clamp-3">
                    {aim}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() => setCurrentTab('mission')}
                className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-5 py-2.5 font-heading text-sm font-bold text-slate-950 transition-all hover:bg-gold-400"
              >
                Read full mission &amp; objectives
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. GEMINI AI DAILY WORD DEVOTIONAL */}
      <section className="bg-slate-950 border-t border-slate-900 py-16 md:py-24 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center space-x-2 rounded-full bg-gold-500/10 px-3 py-1 text-xs text-gold-400 border border-gold-500/20">
              <Sparkles className="h-3 w-3 animate-pulse text-gold-400" />
              <span>AI Biblical Guidance Panel</span>
            </div>
            <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl text-white">
              Trinity <span className="text-gold-400">Pastor AI</span> Devotional Generator
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Facing challenges in faith, family, or health? Select a topic below and let our church AI generate a biblical scripture and customized devotional sermon to encourage you.
            </p>
          </div>

          {/* Devotion selection buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {aiTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setAiTopic(topic)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  aiTopic === topic
                    ? 'bg-gold-500 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Generating Loading Block */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-10 relative overflow-hidden shadow-2xl">
            {generatingDevotion ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <Loader2 className="h-10 w-10 text-gold-400 animate-spin" />
                <p className="font-heading font-medium text-slate-300 text-sm">Composing scripture and seeking revelation...</p>
                <p className="text-[11px] text-slate-500 max-w-xs text-center">Using Gemini 3.5-flash to write a customized sermon reflecting the Trinity Voice of the Gospel values.</p>
              </div>
            ) : generatedDevotion ? (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-gold-500/15 px-3 py-1 text-[10px] font-bold text-gold-400 border border-gold-500/30 uppercase tracking-widest">
                    Custom AI Revelation
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Topic: {aiTopic}</span>
                </div>
                
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                    {generatedDevotion.title}
                  </h3>
                  <div className="mt-2.5 flex items-center text-xs text-gold-400 italic">
                    <BookOpen className="mr-2 h-4 w-4 shrink-0 text-amber-500" />
                    <span>Scripture Ref: {generatedDevotion.scripture}</span>
                  </div>
                </div>

                <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                  {generatedDevotion.content.split("\n\n").map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Sermon written on: <strong>{new Date().toLocaleDateString()}</strong></span>
                  <span className="font-heading font-semibold text-slate-300">Signed: {generatedDevotion.author}</span>
                </div>
              </div>
            ) : (
              // Default pre-loaded pastor's devotion shown
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-[10px] font-bold text-slate-400 border border-slate-800 uppercase tracking-widest">
                    Pastor&apos;s Weekly Word
                  </span>
                  <span className="text-xs text-slate-500 font-mono">July 2026</span>
                </div>

                <div className="border-b border-slate-800 pb-4">
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                    {devotions[0]?.title || "The Voice of Deliverance"}
                  </h3>
                  <div className="mt-2.5 flex items-center text-xs text-gold-400 italic">
                    <BookOpen className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Scripture Ref: {devotions[0]?.scripture || "Luke 4:18-19"}</span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {devotions[0]?.content || "Our theme 'Proclaiming the Word. Transforming Lives. Reaching the world' is not a mere statement, but an active divine call. The Word of God possesses the supernatural power to shift heavy situations, break addictions, and heal sick bodies. Take 5 minutes today to declare scriptures over your family."}
                </p>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Author: <strong>{devotions[0]?.author || "Bishop John Mukisa"}</strong></span>
                  <button
                    onClick={handleGenerateAiDevotion}
                    className="flex items-center space-x-1.5 rounded-lg bg-gold-500 px-4 py-2 font-heading font-bold text-slate-950 hover:bg-gold-400 active:scale-95 transition-all"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Get Custom AI Devotion</span>
                  </button>
                </div>
              </div>
            )}

            {generatedDevotion && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleGenerateAiDevotion}
                  className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-950 py-2 px-4 font-heading text-xs font-bold text-slate-200 hover:border-gold-500 hover:text-gold-400 transition-all active:scale-95"
                >
                  <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                  <span>Try another topic</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
