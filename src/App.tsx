import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import MissionSection from './components/MissionSection';
import BranchesSection from './components/BranchesSection';
import BrigadeSection from './components/BrigadeSection';
import MediaSection from './components/MediaSection';
import ContactSection from './components/ContactSection';
import CMSPanel from './components/CMSPanel';
import { Bell, X, Calendar, MapPin, Clock } from 'lucide-react';

import { 
  ChurchInfo, ChurchEvent, Branch, Program, GalleryItem, LiveStreamConfig, JoinSubmission, Devotion 
} from './types';
import {
  churchInfo as bundledChurchInfo,
  initialEvents,
  initialBranches,
  initialPrograms,
  initialGallery,
  defaultLiveStream,
  initialDevotions,
} from './initialData';

const PUBLIC_TABS = ['home', 'about', 'mission', 'branches', 'brigade', 'media', 'contact'] as const;

function tabFromPath(pathname: string): string {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/admin') return 'cms';
  const segment = path.slice(1);
  if (!segment) return 'home';
  return (PUBLIC_TABS as readonly string[]).includes(segment) ? segment : 'home';
}

function pathFromTab(tab: string): string {
  if (tab === 'cms') return '/admin';
  if (tab === 'home') return '/';
  return `/${tab}`;
}

/** Apply bundled defaults when API is unavailable (e.g. static Vercel deploy). */
function applyBundledDefaults(setters: {
  setChurchInfo: (v: ChurchInfo) => void;
  setEvents: (v: ChurchEvent[]) => void;
  setBranches: (v: Branch[]) => void;
  setPrograms: (v: Program[]) => void;
  setGallery: (v: GalleryItem[]) => void;
  setLiveStream: (v: LiveStreamConfig) => void;
  setDevotions: (v: Devotion[]) => void;
}) {
  setters.setChurchInfo(bundledChurchInfo);
  setters.setEvents(initialEvents);
  setters.setBranches(initialBranches);
  setters.setPrograms(initialPrograms);
  setters.setGallery(initialGallery);
  setters.setLiveStream(defaultLiveStream);
  setters.setDevotions(initialDevotions);
}

export default function App() {
  const [currentTab, setCurrentTabState] = useState<string>(() =>
    typeof window !== 'undefined' ? tabFromPath(window.location.pathname) : 'home'
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  
  // Start with bundled data so gallery/branches photos work without the Express API
  const [churchInfo, setChurchInfo] = useState<ChurchInfo>(bundledChurchInfo);
  const [events, setEvents] = useState<ChurchEvent[]>(initialEvents);
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [liveStream, setLiveStream] = useState<LiveStreamConfig>(defaultLiveStream);
  const [devotions, setDevotions] = useState<Devotion[]>(initialDevotions);
  const [submissions, setSubmissions] = useState<JoinSubmission[]>([]);

  // Admin Portal Auth States
  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(false);

  const setCurrentTab = (tab: string) => {
    setCurrentTabState(tab);
    const nextPath = pathFromTab(tab);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ tab }, '', nextPath);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  useEffect(() => {
    const onPopState = () => {
      setCurrentTabState(tabFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    // Normalize URL on first load if needed
    const initialTab = tabFromPath(window.location.pathname);
    const expectedPath = pathFromTab(initialTab);
    if (window.location.pathname !== expectedPath) {
      window.history.replaceState({ tab: initialTab }, '', expectedPath);
    }
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Prefer API when available; fall back to bundled data on static hosts (Vercel)
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/church-info');

      if (!res.ok) {
        applyBundledDefaults({
          setChurchInfo, setEvents, setBranches, setPrograms, setGallery, setLiveStream, setDevotions,
        });
        return;
      }

      const data = await res.json();
      if (data && data.info) {
        setChurchInfo(data.info || bundledChurchInfo);
        setEvents(data.events?.length ? data.events : initialEvents);
        setBranches(data.branches?.length ? data.branches : initialBranches);
        setPrograms(data.programs?.length ? data.programs : initialPrograms);
        setGallery(data.gallery?.length ? data.gallery : initialGallery);
        setLiveStream(data.liveStream || defaultLiveStream);
        setDevotions(data.devotions?.length ? data.devotions : initialDevotions);
      } else {
        applyBundledDefaults({
          setChurchInfo, setEvents, setBranches, setPrograms, setGallery, setLiveStream, setDevotions,
        });
      }

      const subRes = await fetch('/api/submissions');
      if (subRes.ok) {
        const subData = await subRes.json();
        setSubmissions(Array.isArray(subData) ? subData : []);
      }
    } catch (error) {
      console.error("API unavailable — using bundled church data:", error);
      applyBundledDefaults({
        setChurchInfo, setEvents, setBranches, setPrograms, setGallery, setLiveStream, setDevotions,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // API SYNC TRIGGER (PUT)
  const syncWithBackend = async (updatedPayload: any) => {
    try {
      const response = await fetch('/api/church-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayload)
      });
      if (response.ok) {
        console.log("Database synchronized successfully on filesystem!");
      }
    } catch (error) {
      console.error("Failed to sync state to Express server:", error);
    }
  };

  // HANDLERS FOR UPDATING CMS PARTS
  const handleUpdateChurchInfo = (info: ChurchInfo) => {
    setChurchInfo(info);
    syncWithBackend({ info, events, branches, programs, gallery, liveStream, devotions });
  };

  const handleUpdateEvents = (updatedEvents: ChurchEvent[]) => {
    setEvents(updatedEvents);
    syncWithBackend({ info: churchInfo, events: updatedEvents, branches, programs, gallery, liveStream, devotions });
  };

  const handleUpdateBranches = (updatedBranches: Branch[]) => {
    setBranches(updatedBranches);
    syncWithBackend({ info: churchInfo, events, branches: updatedBranches, programs, gallery, liveStream, devotions });
  };

  const handleUpdatePrograms = (updatedPrograms: Program[]) => {
    setPrograms(updatedPrograms);
    syncWithBackend({ info: churchInfo, events, branches, programs: updatedPrograms, gallery, liveStream, devotions });
  };

  const handleUpdateGallery = (updatedGallery: GalleryItem[]) => {
    setGallery(updatedGallery);
    syncWithBackend({ info: churchInfo, events, branches, programs, gallery: updatedGallery, liveStream, devotions });
  };

  const handleUpdateLiveStream = (updatedStream: LiveStreamConfig) => {
    setLiveStream(updatedStream);
    syncWithBackend({ info: churchInfo, events, branches, programs, gallery, liveStream: updatedStream, devotions });
  };

  const handleUpdateSubmissions = async (updatedSubs: JoinSubmission[]) => {
    setSubmissions(updatedSubs);
    try {
      await fetch('/api/submissions/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSubs)
      });
    } catch (error) {
      console.error("Failed to update submissions in file-system:", error);
    }
  };

  // RESET SYSTEM STATE
  const handleResetToDefaults = async () => {
    try {
      const res = await fetch('/api/reset', { method: 'POST' });
      if (res.ok) {
        fetchAllData();
      }
    } catch (error) {
      console.error("Error during master reset:", error);
    }
  };

  // ADMIN LOGIN — refresh submissions from disk so Family Sign-Ups is current
  const handleLoginAdmin = (pass: string): boolean => {
    if (pass === 'tcc123') {
      setAdminLoggedIn(true);
      fetch('/api/submissions')
        .then((r) => (r.ok ? r.json() : []))
        .then((subs) => setSubmissions(Array.isArray(subs) ? subs : []))
        .catch(() => {});
      return true;
    }
    return false;
  };

  const handleLogoutAdmin = () => {
    setAdminLoggedIn(false);
  };

  // CONTACT SUBMIT → saved to data/submissions.json for /admin
  const handleSubmitContact = async (seeker: { fullName: string; email: string; phone: string; message: string; interestArea: string }): Promise<boolean> => {
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: seeker.fullName,
          email: seeker.email,
          phone: seeker.phone,
          interestArea: seeker.interestArea,
          message: seeker.message,
        })
      });

      if (!res.ok) return false;

      const data = await res.json();
      const saved: JoinSubmission = data.submission;
      if (saved) {
        setSubmissions((prev) => [saved, ...prev.filter((s) => s.id !== saved.id)]);
      }
      return true;
    } catch (err) {
      console.error("Error submitting contact info:", err);
      return false;
    }
  };

  // Dynamic body view router
  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomeSection 
            churchInfo={churchInfo} 
            events={events} 
            liveStream={liveStream} 
            setCurrentTab={setCurrentTab} 
          />
        );
      case 'about':
        return (
          <AboutSection 
            churchInfo={churchInfo} 
            setCurrentTab={setCurrentTab} 
          />
        );
      case 'mission':
        return (
          <MissionSection
            churchInfo={churchInfo}
            setCurrentTab={setCurrentTab}
          />
        );
      case 'branches':
        return (
          <BranchesSection 
            branches={branches} 
            programs={programs} 
          />
        );
      case 'brigade':
        return (
          <BrigadeSection />
        );
      case 'media':
        return (
          <MediaSection 
            gallery={gallery} 
            liveStream={liveStream} 
          />
        );
      case 'contact':
        return (
          <ContactSection 
            onSubmitContact={handleSubmitContact} 
          />
        );
      case 'cms':
        return (
          <CMSPanel
            churchInfo={churchInfo}
            events={events}
            branches={branches}
            programs={programs}
            gallery={gallery}
            liveStream={liveStream}
            submissions={submissions}
            adminLoggedIn={adminLoggedIn}
            onLoginAdmin={handleLoginAdmin}
            onLogoutAdmin={handleLogoutAdmin}
            onUpdateChurchInfo={handleUpdateChurchInfo}
            onUpdateEvents={handleUpdateEvents}
            onUpdateBranches={handleUpdateBranches}
            onUpdatePrograms={handleUpdatePrograms}
            onUpdateGallery={handleUpdateGallery}
            onUpdateLiveStream={handleUpdateLiveStream}
            onUpdateSubmissions={handleUpdateSubmissions}
            onResetToDefaults={handleResetToDefaults}
          />
        );
      default:
        return (
          <HomeSection 
            churchInfo={churchInfo} 
            events={events} 
            liveStream={liveStream} 
            setCurrentTab={setCurrentTab} 
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
        <div className="h-10 w-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-heading font-bold text-sm tracking-widest text-gold-400 uppercase">Trinity Christian Church</p>
        <p className="text-xs text-slate-500">Retrieving official datasets and syncing database...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans relative">
      
      {/* 1. CHURCH HEADER NAVIGATION */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        upcomingEvents={events} 
        onOpenNotifications={() => setIsNotificationOpen(true)} 
      />
      
      {/* 2. DYNAMIC MAIN BODY */}
      <main className={currentTab === 'contact' ? undefined : 'flex-1'}>
        {renderTabContent()}
      </main>

      {/* 3. CHURCH FOOTER COORDINATES */}
      <Footer 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        branches={branches} 
      />

      {/* 4. DYNAMIC NOTIFICATION SLIDEOVER MODAL */}
      {isNotificationOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 p-4 animate-in fade-in duration-300"
          onClick={() => setIsNotificationOpen(false)}
        >
          <div 
            className="h-full max-w-md w-full bg-slate-900 border-l border-slate-800 p-6 shadow-2xl flex flex-col justify-between text-white animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gold-400 animate-bounce" />
                <h3 className="font-heading font-bold text-lg text-white">Ministry Notifications</h3>
              </div>
              <button 
                onClick={() => setIsNotificationOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 py-6 overflow-y-auto space-y-4">
              {events.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  <Bell className="h-8 w-8 mx-auto text-slate-700 mb-2" />
                  <p>No active announcements or events.</p>
                </div>
              ) : (
                events.map((evt) => (
                  <div key={evt.id} className="rounded-xl bg-slate-950 p-4 border border-slate-850 space-y-2.5">
                    <div className="flex items-start justify-between">
                      <span className="rounded bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 text-[9px] font-bold text-gold-400 uppercase tracking-wider">
                        {evt.category}
                      </span>
                      {evt.isFeatured && (
                        <span className="text-[10px] text-amber-400 font-semibold">★ Featured</span>
                      )}
                    </div>
                    
                    <h4 className="font-heading font-bold text-sm text-white leading-tight">{evt.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{evt.description}</p>
                    
                    <div className="pt-2 border-t border-slate-900 flex flex-col space-y-1 text-[10px] text-slate-500">
                      <span className="flex items-center"><Calendar className="mr-1.5 h-3.5 w-3.5 text-slate-600" /> Date: {new Date(evt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="flex items-center"><Clock className="mr-1.5 h-3.5 w-3.5 text-slate-600" /> Time: {evt.time}</span>
                      <span className="flex items-center"><MapPin className="mr-1.5 h-3.5 w-3.5 text-slate-600" /> Venue: {evt.location}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Actions */}
            <div className="border-t border-slate-800 pt-4 space-y-3">
              <button
                onClick={() => {
                  setCurrentTab('branches');
                  setIsNotificationOpen(false);
                }}
                className="w-full rounded-lg bg-gold-500 py-3 text-center text-xs font-bold text-slate-950 hover:bg-gold-400 transition-all active:scale-95 shadow"
              >
                View Sunday & Mid-Week Services
              </button>
              <button
                onClick={() => setIsNotificationOpen(false)}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-200"
              >
                Dismiss notifications
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
