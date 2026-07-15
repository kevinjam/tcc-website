import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, Landmark, Calendar, Clock, Tv, Image, Users, Save, Trash2, Plus, 
  Check, AlertTriangle, Download, RefreshCw, LogOut, CheckSquare 
} from 'lucide-react';
import { 
  ChurchInfo, ChurchEvent, Branch, Program, GalleryItem, LiveStreamConfig, JoinSubmission 
} from '../types';

interface CMSPanelProps {
  churchInfo: ChurchInfo;
  events: ChurchEvent[];
  branches: Branch[];
  programs: Program[];
  gallery: GalleryItem[];
  liveStream: LiveStreamConfig;
  submissions: JoinSubmission[];
  adminLoggedIn: boolean;
  onLoginAdmin: (passcode: string) => boolean;
  onLogoutAdmin: () => void;
  onUpdateChurchInfo: (info: ChurchInfo) => void;
  onUpdateEvents: (events: ChurchEvent[]) => void;
  onUpdateBranches: (branches: Branch[]) => void;
  onUpdatePrograms: (programs: Program[]) => void;
  onUpdateGallery: (gallery: GalleryItem[]) => void;
  onUpdateLiveStream: (live: LiveStreamConfig) => void;
  onUpdateSubmissions: (subs: JoinSubmission[]) => void;
  onResetToDefaults: () => void;
}

type CMSTab = 'info' | 'events' | 'programs' | 'branches' | 'stream' | 'gallery' | 'submissions';

export default function CMSPanel({
  churchInfo,
  events,
  branches,
  programs,
  gallery,
  liveStream,
  submissions,
  adminLoggedIn,
  onLoginAdmin,
  onLogoutAdmin,
  onUpdateChurchInfo,
  onUpdateEvents,
  onUpdateBranches,
  onUpdatePrograms,
  onUpdateGallery,
  onUpdateLiveStream,
  onUpdateSubmissions,
  onResetToDefaults
}: CMSPanelProps) {
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<CMSTab>('submissions');
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Form states for adding new items
  const [newEvent, setNewEvent] = useState<Partial<ChurchEvent>>({
    title: '', date: '', time: '', location: '', description: '', category: 'Service', isFeatured: false
  });
  const [newProgram, setNewProgram] = useState<Partial<Program>>({
    name: '', day: 'Sunday', time: '', description: '', location: 'Main Sanctuary'
  });
  const [newBranch, setNewBranch] = useState<Partial<Branch>>({
    name: '', location: '', pastor: '', phone: '', email: '', isHeadquarters: false
  });
  const [newGalleryItem, setNewGalleryItem] = useState<Partial<GalleryItem>>({
    url: '', title: '', category: 'Worship'
  });

  // Local editable copies of general text
  const [editableInfo, setEditableInfo] = useState<ChurchInfo>({ ...churchInfo });
  const [editableStream, setEditableStream] = useState<LiveStreamConfig>({ ...liveStream });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLoginAdmin(passcode);
    if (success) {
      setLoginError(false);
      setPasscode('');
      // Sync local edits
      setEditableInfo({ ...churchInfo });
      setEditableStream({ ...liveStream });
    } else {
      setLoginError(true);
    }
  };

  const triggerToast = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  // GENERAL SAVE HELPERS
  const handleSaveInfo = () => {
    onUpdateChurchInfo(editableInfo);
    triggerToast();
  };

  const handleSaveStream = () => {
    onUpdateLiveStream(editableStream);
    triggerToast();
  };

  // ADD HELPERS
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date || !newEvent.time) return;
    
    const createdEvent: ChurchEvent = {
      id: `evt-${Date.now()}`,
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location || 'Main Sanctuary',
      description: newEvent.description || '',
      category: newEvent.category as ChurchEvent['category'] || 'Service',
      isFeatured: !!newEvent.isFeatured
    };

    onUpdateEvents([createdEvent, ...events]);
    setNewEvent({ title: '', date: '', time: '', location: '', description: '', category: 'Service', isFeatured: false });
    triggerToast();
  };

  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgram.name || !newProgram.time) return;

    const createdProgram: Program = {
      id: `prg-${Date.now()}`,
      name: newProgram.name,
      day: newProgram.day || 'Sunday',
      time: newProgram.time,
      description: newProgram.description || '',
      location: newProgram.location || 'Main Sanctuary'
    };

    onUpdatePrograms([...programs, createdProgram]);
    setNewProgram({ name: '', day: 'Sunday', time: '', description: '', location: 'Main Sanctuary' });
    triggerToast();
  };

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranch.name || !newBranch.location || !newBranch.pastor) return;

    const createdBranch: Branch = {
      id: `br-${Date.now()}`,
      name: newBranch.name,
      location: newBranch.location,
      pastor: newBranch.pastor,
      phone: newBranch.phone || '+256 700 000000',
      email: newBranch.email || 'info@trinitychristianchurch.org.ug',
      isHeadquarters: !!newBranch.isHeadquarters
    };

    onUpdateBranches([...branches, createdBranch]);
    setNewBranch({ name: '', location: '', pastor: '', phone: '', email: '', isHeadquarters: false });
    triggerToast();
  };

  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.url || !newGalleryItem.title) return;

    const createdGallery: GalleryItem = {
      id: `gal-${Date.now()}`,
      url: newGalleryItem.url,
      title: newGalleryItem.title,
      category: newGalleryItem.category as GalleryItem['category'] || 'Worship',
      date: new Date().toISOString().split('T')[0]
    };

    onUpdateGallery([createdGallery, ...gallery]);
    setNewGalleryItem({ url: '', title: '', category: 'Worship' });
    triggerToast();
  };

  // DELETE HELPERS
  const handleDeleteEvent = (id: string) => {
    onUpdateEvents(events.filter(e => e.id !== id));
    triggerToast();
  };

  const handleDeleteProgram = (id: string) => {
    onUpdatePrograms(programs.filter(p => p.id !== id));
    triggerToast();
  };

  const handleDeleteBranch = (id: string) => {
    onUpdateBranches(branches.filter(b => b.id !== id));
    triggerToast();
  };

  const handleDeleteGallery = (id: string) => {
    onUpdateGallery(gallery.filter(g => g.id !== id));
    triggerToast();
  };

  // SUBMISSION CONTROLLERS
  const handleMarkContacted = (id: string) => {
    onUpdateSubmissions(submissions.map(sub => {
      if (sub.id === id) {
        return { ...sub, status: sub.status === 'Contacted' ? 'New' : 'Contacted' };
      }
      return sub;
    }));
  };

  const handleDeleteSubmission = (id: string) => {
    onUpdateSubmissions(submissions.filter(s => s.id !== id));
  };

  // CSV EXPORT HELPER
  const exportSubmissionsToCSV = () => {
    if (submissions.length === 0) return;
    const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Interest Area', 'Seeker Message', 'Submitted At', 'Status'];
    const rows = submissions.map(s => [
      s.id,
      s.fullName,
      s.email || 'N/A',
      s.phone,
      s.interestArea,
      s.message.replace(/"/g, '""'),
      s.submittedAt,
      s.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tcc_family_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // RESET SYSTEM STATE
  const handleSystemReset = () => {
    if (window.confirm("Are you sure you want to restore the entire church website to its initial default state? All customized events, text changes, and streams will be reset!")) {
      onResetToDefaults();
      triggerToast();
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  // 1. LOGIN SCREEN (If not logged in)
  if (!adminLoggedIn) {
    return (
      <div className="bg-slate-900 min-h-[75vh] flex items-center justify-center p-6 text-white font-sans">
        <div className="max-w-md w-full bg-slate-950 rounded-2xl border border-slate-800 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center">
              <Lock className="h-6 w-6 animate-pulse" />
            </div>
            <h3 className="font-heading font-bold text-xl">Ministry Staff Login</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Authenticate using the church access passcode to manage weekly services, gallery photos, live broadcasts, and view registered family members.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Passkey Access Code</label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (Demo: tcc123)"
                className="w-full rounded-lg bg-slate-900 border border-slate-800 p-3.5 text-sm text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
              {loginError && (
                <span className="text-[11px] text-red-400 mt-1.5 flex items-center">
                  <AlertTriangle className="mr-1 h-3.5 w-3.5" /> Invalid passcode. Try again.
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gold-500 py-3.5 font-heading text-sm font-bold text-slate-950 hover:bg-gold-400 active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-lg"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Authenticate Credentials</span>
            </button>
          </form>

          <div className="text-center border-t border-slate-900 pt-4 text-[10px] text-slate-500">
            Authorized Personnel Only. Logins are encrypted.
          </div>
        </div>
      </div>
    );
  }

  // 2. MAIN CMS CONTROL DASHBOARD (If logged in)
  const menuItems = [
    { id: 'submissions', label: 'Family Sign-Ups', count: submissions.length, icon: <Users className="h-4 w-4" /> },
    { id: 'info', label: 'Church Text', icon: <Landmark className="h-4 w-4" /> },
    { id: 'events', label: 'Calendar Events', count: events.length, icon: <Calendar className="h-4 w-4" /> },
    { id: 'programs', label: 'Weekly Altars', count: programs.length, icon: <Clock className="h-4 w-4" /> },
    { id: 'branches', label: 'Uganda Branches', count: branches.length, icon: <Landmark className="h-4 w-4" /> },
    { id: 'stream', label: 'Live Streams', icon: <Tv className="h-4 w-4" /> },
    { id: 'gallery', label: 'Photo Gallery', count: gallery.length, icon: <Image className="h-4 w-4" /> },
  ];

  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans border-t border-slate-800">
      
      {/* CMS Toolbar */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-sm tracking-tight text-white uppercase">TCC CMS Staff Portal</h2>
            <p className="text-[10px] text-slate-400">Authentication Level: Full Admin Access</p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleSystemReset}
            className="rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-all flex items-center space-x-1"
            title="Wipe database to factory default"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Reset Factory</span>
          </button>
          
          <button
            onClick={onLogoutAdmin}
            className="rounded bg-red-950 border border-red-900/50 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-900 hover:text-white transition-all flex items-center space-x-1"
          >
            <LogOut className="h-3 w-3" />
            <span>Lock Panel</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        
        {/* Left side: Sidebar (3 cols) */}
        <div className="lg:col-span-3 space-y-2.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-2">CMS Modules</p>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as CMSTab)}
                className={`w-full rounded-lg px-4 py-3 text-left font-heading text-xs font-bold transition-all flex items-center justify-between ${
                  activeTab === item.id
                    ? 'bg-gold-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:bg-slate-950 hover:text-white'
                }`}
              >
                <span className="flex items-center space-x-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
                {item.count !== undefined && (
                  <span className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold ${activeTab === item.id ? 'bg-slate-950 text-gold-400' : 'bg-slate-800 text-slate-400'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Right side: Active Content Block (9 cols) */}
        <div className="lg:col-span-9 bg-slate-950 rounded-2xl border border-slate-800 p-6 md:p-8 space-y-6">
          
          {/* TOAST NOTIFICATION ON SAVE */}
          {showSavedToast && (
            <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-2xl flex items-center space-x-2 animate-bounce">
              <Check className="h-4 w-4" />
              <span>Church Database Synchronized!</span>
            </div>
          )}

          {/* TAB A: GENERAL INFO */}
          {activeTab === 'info' && (
            <div className="space-y-5">
              <h3 className="font-heading text-lg font-bold border-b border-slate-800 pb-3 text-gold-400">General Church Info</h3>
              
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-400 block mb-1">About TCC text (Homepage)</label>
                  <textarea 
                    rows={4}
                    value={editableInfo.aboutText}
                    onChange={(e) => setEditableInfo({ ...editableInfo, aboutText: e.target.value })}
                    className="w-full rounded bg-slate-900 border border-slate-850 p-3 font-sans focus:outline-none resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="font-bold text-slate-400 block mb-1">Church Detailed History (About Us page)</label>
                  <textarea 
                    rows={5}
                    value={editableInfo.historyText}
                    onChange={(e) => setEditableInfo({ ...editableInfo, historyText: e.target.value })}
                    className="w-full rounded bg-slate-900 border border-slate-850 p-3 font-sans focus:outline-none resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Our Vision</label>
                    <textarea 
                      rows={3}
                      value={editableInfo.visionText}
                      onChange={(e) => setEditableInfo({ ...editableInfo, visionText: e.target.value })}
                      className="w-full rounded bg-slate-900 border border-slate-850 p-3 font-sans focus:outline-none resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Our Mission</label>
                    <textarea 
                      rows={3}
                      value={editableInfo.missionText}
                      onChange={(e) => setEditableInfo({ ...editableInfo, missionText: e.target.value })}
                      className="w-full rounded bg-slate-900 border border-slate-850 p-3 font-sans focus:outline-none resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Boys Brigade details</label>
                    <textarea 
                      rows={3}
                      value={editableInfo.brigadeBoysText}
                      onChange={(e) => setEditableInfo({ ...editableInfo, brigadeBoysText: e.target.value })}
                      className="w-full rounded bg-slate-900 border border-slate-850 p-3 font-sans focus:outline-none resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Girls Brigade details</label>
                    <textarea 
                      rows={3}
                      value={editableInfo.brigadeGirlsText}
                      onChange={(e) => setEditableInfo({ ...editableInfo, brigadeGirlsText: e.target.value })}
                      className="w-full rounded bg-slate-900 border border-slate-850 p-3 font-sans focus:outline-none resize-none"
                    ></textarea>
                  </div>
                </div>

                <button
                  onClick={handleSaveInfo}
                  className="rounded bg-gold-500 text-slate-950 font-bold px-6 py-2.5 hover:bg-gold-400 transition-all flex items-center space-x-1.5 active:scale-95"
                >
                  <Save className="h-4 w-4" />
                  <span>Update Church Info</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB B: CALENDAR EVENTS */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <h3 className="font-heading text-lg font-bold border-b border-slate-800 pb-3 text-gold-400">Events Management</h3>

              {/* Add Event Form */}
              <form onSubmit={handleAddEvent} className="bg-slate-900 rounded-xl p-5 border border-slate-800 text-xs space-y-4">
                <h4 className="font-heading font-bold text-slate-300">Create New Event / Notice</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Event Title</label>
                    <input 
                      type="text" required
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="e.g. Marriage Seminar"
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Event Date</label>
                    <input 
                      type="date" required
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Event Time</label>
                    <input 
                      type="text" required
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      placeholder="e.g. 10:00 PM - 05:00 AM"
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Location / Compound</label>
                    <input 
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      placeholder="e.g. Main Sanctuary"
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Event Category</label>
                    <select
                      value={newEvent.category}
                      onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as ChurchEvent['category'] })}
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    >
                      <option value="Service">Service</option>
                      <option value="Youth">Youth</option>
                      <option value="Prayer">Prayer</option>
                      <option value="Community">Community</option>
                      <option value="Brigade">Brigade</option>
                      <option value="Outreach">Outreach</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2 pt-5">
                    <input 
                      type="checkbox"
                      id="evtFeatured"
                      checked={newEvent.isFeatured}
                      onChange={(e) => setNewEvent({ ...newEvent, isFeatured: e.target.checked })}
                      className="rounded bg-slate-950 text-gold-500 focus:ring-0"
                    />
                    <label htmlFor="evtFeatured" className="font-bold text-slate-400">Feature this on banner</label>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-400 block mb-1">Short Description</label>
                  <textarea 
                    rows={2}
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Short summary of event details..."
                    className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="rounded bg-gold-500 text-slate-950 font-bold px-5 py-2 hover:bg-gold-400 flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Publish New Event</span>
                </button>
              </form>

              {/* List of active events */}
              <div className="space-y-2 text-xs">
                <p className="font-bold uppercase tracking-wider text-slate-500">Active Published Events ({events.length})</p>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {events.map((evt) => (
                    <div key={evt.id} className="rounded bg-slate-900 p-4 border border-slate-850 flex justify-between items-center">
                      <div>
                        <h5 className="font-heading font-bold text-white text-sm">{evt.title}</h5>
                        <p className="text-[10px] text-slate-400 mt-0.5">Date: {evt.date} | Time: {evt.time} | Category: {evt.category}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(evt.id)}
                        className="rounded p-2 text-red-400 hover:bg-red-950 hover:text-white transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB C: WEEKLY PROGRAMS */}
          {activeTab === 'programs' && (
            <div className="space-y-6">
              <h3 className="font-heading text-lg font-bold border-b border-slate-800 pb-3 text-gold-400">Manage Weekly Services</h3>

              <form onSubmit={handleAddProgram} className="bg-slate-900 rounded-xl p-5 border border-slate-800 text-xs space-y-4">
                <h4 className="font-heading font-bold text-slate-300">Create New Service Altar</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Service Name</label>
                    <input 
                      type="text" required
                      value={newProgram.name}
                      onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                      placeholder="e.g. Wednesday Deliverance Altar"
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Service Day</label>
                    <select
                      value={newProgram.day}
                      onChange={(e) => setNewProgram({ ...newProgram, day: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    >
                      <option value="Sunday">Sunday</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Service Hours</label>
                    <input 
                      type="text" required
                      value={newProgram.time}
                      onChange={(e) => setNewProgram({ ...newProgram, time: e.target.value })}
                      placeholder="e.g. 05:00 PM - 07:30 PM"
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Location</label>
                    <input 
                      type="text"
                      value={newProgram.location}
                      onChange={(e) => setNewProgram({ ...newProgram, location: e.target.value })}
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Brief Description</label>
                    <input 
                      type="text"
                      value={newProgram.description}
                      onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                      placeholder="What happens in this service..."
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="rounded bg-gold-500 text-slate-950 font-bold px-5 py-2 hover:bg-gold-400 flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Publish Weekly Altar</span>
                </button>
              </form>

              <div className="space-y-2 text-xs">
                <p className="font-bold uppercase tracking-wider text-slate-500">Service Programs ({programs.length})</p>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {programs.map((p) => (
                    <div key={p.id} className="rounded bg-slate-900 p-4 border border-slate-850 flex justify-between items-center">
                      <div>
                        <h5 className="font-heading font-bold text-white text-sm">{p.name}</h5>
                        <p className="text-[10px] text-slate-400 mt-0.5">Day: {p.day} | Time: {p.time} | Location: {p.location}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteProgram(p.id)}
                        className="rounded p-2 text-red-400 hover:bg-red-950 hover:text-white transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB D: UGANDA BRANCHES */}
          {activeTab === 'branches' && (
            <div className="space-y-6">
              <h3 className="font-heading text-lg font-bold border-b border-slate-800 pb-3 text-gold-400">Manage Uganda Branches</h3>

              <form onSubmit={handleAddBranch} className="bg-slate-900 rounded-xl p-5 border border-slate-800 text-xs space-y-4">
                <h4 className="font-heading font-bold text-slate-300">Register New Assembly Branch</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Branch Name</label>
                    <input 
                      type="text" required
                      value={newBranch.name}
                      onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                      placeholder="e.g. Luweero Branch"
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Branch Pastor Name</label>
                    <input 
                      type="text" required
                      value={newBranch.pastor}
                      onChange={(e) => setNewBranch({ ...newBranch, pastor: e.target.value })}
                      placeholder="e.g. Pastor Moses"
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Branch Phone Contact</label>
                    <input 
                      type="tel"
                      value={newBranch.phone}
                      onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
                      placeholder="e.g. +256 700 000"
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-400 block mb-1">Branch Physical Address</label>
                    <input 
                      type="text" required
                      value={newBranch.location}
                      onChange={(e) => setNewBranch({ ...newBranch, location: e.target.value })}
                      placeholder="Address coordinates or landmark..."
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-5">
                    <input 
                      type="checkbox"
                      id="branchHQ"
                      checked={newBranch.isHeadquarters}
                      onChange={(e) => setNewBranch({ ...newBranch, isHeadquarters: e.target.checked })}
                      className="rounded bg-slate-950 text-gold-500 focus:ring-0"
                    />
                    <label htmlFor="branchHQ" className="font-bold text-slate-400">Headquarters status</label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="rounded bg-gold-500 text-slate-950 font-bold px-5 py-2 hover:bg-gold-400 flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Register TCC Branch</span>
                </button>
              </form>

              <div className="space-y-2 text-xs">
                <p className="font-bold uppercase tracking-wider text-slate-500">Registered Assemblies ({branches.length})</p>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {branches.map((b) => (
                    <div key={b.id} className="rounded bg-slate-900 p-4 border border-slate-850 flex justify-between items-center">
                      <div>
                        <h5 className="font-heading font-bold text-white text-sm">{b.name}</h5>
                        <p className="text-[10px] text-slate-400 mt-0.5">Pastor: {b.pastor} | Address: {b.location} | HQ: {b.isHeadquarters ? 'Yes' : 'No'}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteBranch(b.id)}
                        className="rounded p-2 text-red-400 hover:bg-red-950 hover:text-white transition-colors"
                        disabled={b.isHeadquarters} // Keep HQ safe from random deletes
                        title={b.isHeadquarters ? "Headquarters cannot be deleted" : "Delete Branch"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB E: LIVE STREAM SETTINGS */}
          {activeTab === 'stream' && (
            <div className="space-y-5">
              <h3 className="font-heading text-lg font-bold border-b border-slate-800 pb-3 text-gold-400">Manage Live Streams</h3>
              
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">YouTube Video embed URL</label>
                    <input 
                      type="text"
                      value={editableStream.videoUrl}
                      onChange={(e) => setEditableStream({ ...editableStream, videoUrl: e.target.value })}
                      className="w-full rounded bg-slate-900 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500">Must be an iframe source e.g. https://www.youtube.com/embed/&lt;id&gt;</span>
                  </div>
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Sermon Video Broadcast Title</label>
                    <input 
                      type="text"
                      value={editableStream.videoTitle}
                      onChange={(e) => setEditableStream({ ...editableStream, videoTitle: e.target.value })}
                      className="w-full rounded bg-slate-900 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Radio Broadcast Streaming URL</label>
                    <input 
                      type="text"
                      value={editableStream.radioUrl}
                      onChange={(e) => setEditableStream({ ...editableStream, radioUrl: e.target.value })}
                      className="w-full rounded bg-slate-900 border border-slate-850 p-2.5 text-white focus:outline-none"
                      placeholder="http://stream.radiojar.com/..."
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Radio Website (redirect)</label>
                    <input 
                      type="text"
                      value={editableStream.radioSiteUrl || ''}
                      onChange={(e) => setEditableStream({ ...editableStream, radioSiteUrl: e.target.value })}
                      className="w-full rounded bg-slate-900 border border-slate-850 p-2.5 text-white focus:outline-none"
                      placeholder="https://radio.tccug.org/"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Sermon Active Speaker Name</label>
                    <input 
                      type="text"
                      value={editableStream.activeSpeaker}
                      onChange={(e) => setEditableStream({ ...editableStream, activeSpeaker: e.target.value })}
                      className="w-full rounded bg-slate-900 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 bg-slate-900 p-4 rounded border border-slate-850">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      id="videoLiveBadge"
                      checked={editableStream.isLiveVideo}
                      onChange={(e) => setEditableStream({ ...editableStream, isLiveVideo: e.target.checked })}
                      className="rounded bg-slate-950 text-gold-500 focus:ring-0 animate-pulse"
                    />
                    <label htmlFor="videoLiveBadge" className="font-bold text-slate-300">TV TCC is currently LIVE now</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      id="radioLiveBadge"
                      checked={editableStream.isLiveRadio}
                      onChange={(e) => setEditableStream({ ...editableStream, isLiveRadio: e.target.checked })}
                      className="rounded bg-slate-950 text-gold-500 focus:ring-0"
                    />
                    <label htmlFor="radioLiveBadge" className="font-bold text-slate-300">Radio TCC is On-Air now</label>
                  </div>
                </div>

                <button
                  onClick={handleSaveStream}
                  className="rounded bg-gold-500 text-slate-950 font-bold px-6 py-2.5 hover:bg-gold-400 transition-all flex items-center space-x-1.5 active:scale-95"
                >
                  <Save className="h-4 w-4" />
                  <span>Update Stream Settings</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB F: PHOTO GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <h3 className="font-heading text-lg font-bold border-b border-slate-800 pb-3 text-gold-400">Curate Photo Gallery</h3>

              <form onSubmit={handleAddGallery} className="bg-slate-900 rounded-xl p-5 border border-slate-800 text-xs space-y-4">
                <h4 className="font-heading font-bold text-slate-300">Add Image to Church Gallery</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-400 block mb-1">Unsplash / Image URL</label>
                    <input 
                      type="text" required
                      value={newGalleryItem.url}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, url: e.target.value })}
                      placeholder="Paste picture URL here..."
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-400 block mb-1">Category</label>
                    <select
                      value={newGalleryItem.category}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value as GalleryItem['category'] })}
                      className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                    >
                      <option value="Worship">Worship</option>
                      <option value="Youth">Youth</option>
                      <option value="Brigade">Brigade</option>
                      <option value="Community">Community</option>
                      <option value="Outreach">Outreach</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-400 block mb-1">Image Captive Title</label>
                  <input 
                    type="text" required
                    value={newGalleryItem.title}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                    placeholder="Describe what is happening in the photo..."
                    className="w-full rounded bg-slate-950 border border-slate-850 p-2.5 text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded bg-gold-500 text-slate-950 font-bold px-5 py-2 hover:bg-gold-400 flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Curate Photo</span>
                </button>
              </form>

              <div className="space-y-2 text-xs">
                <p className="font-bold uppercase tracking-wider text-slate-500">Curated Photos ({gallery.length})</p>
                <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-1 sm:grid-cols-3">
                  {gallery.map((g) => (
                    <div key={g.id} className="rounded bg-slate-900 border border-slate-850 p-2 relative group overflow-hidden">
                      <img 
                        src={g.url} 
                        alt={g.title} 
                        className="h-20 w-full object-cover rounded"
                        referrerPolicy="no-referrer"
                      />
                      <p className="text-[10px] text-slate-300 font-medium mt-1 truncate max-w-[150px]">{g.title}</p>
                      <button
                        onClick={() => handleDeleteGallery(g.id)}
                        className="absolute top-1 right-1 rounded-full bg-slate-950/85 p-1.5 text-red-400 hover:text-white hover:bg-slate-950 transition-all"
                        title="Delete curated photo"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB G: SECULAR FAMILY SUBMISSIONS */}
          {activeTab === 'submissions' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
                <h3 className="font-heading text-lg font-bold text-gold-400">Registered Seekers &amp; Church Family Sign-ups</h3>
                {submissions.length > 0 && (
                  <button
                    onClick={exportSubmissionsToCSV}
                    className="rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-bold text-gold-400 hover:text-gold-300 transition-all flex items-center space-x-1.5"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export Sign-Ups to CSV</span>
                  </button>
                )}
              </div>

              {submissions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-800 p-12 text-center text-slate-500 space-y-2 text-xs max-w-sm mx-auto">
                  <Users className="h-10 w-10 mx-auto text-slate-600 mb-2" />
                  <p className="font-semibold text-slate-400">No member sign-ups registered yet</p>
                  <p className="text-slate-500">When visitors fill the &ldquo;Join our Church Family&rdquo; form, their contact details will populate here in real-time.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {submissions.map((sub) => (
                    <div 
                      key={sub.id} 
                      className={`rounded-xl border p-5 space-y-3.5 text-xs transition-all ${
                        sub.status === 'Contacted' 
                          ? 'bg-slate-900/40 border-slate-900 opacity-60' 
                          : 'bg-slate-900 border-slate-800 shadow-inner'
                      }`}
                    >
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <h4 className="font-heading font-bold text-white text-base flex items-center space-x-2">
                            <span>{sub.fullName}</span>
                            {sub.status === 'Contacted' && (
                              <span className="rounded bg-emerald-950/80 border border-emerald-900 text-emerald-400 px-2 py-0.2 text-[8px] font-bold uppercase tracking-wider">
                                ✓ Contacted
                              </span>
                            )}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-1">
                            Registered on: {new Date(sub.submittedAt).toLocaleDateString()} | Area: <strong className="text-gold-400">{sub.interestArea}</strong>
                          </p>
                        </div>

                        {/* Submission checklist controls */}
                        <div className="flex items-center space-x-2.5">
                          <button
                            onClick={() => handleMarkContacted(sub.id)}
                            className={`rounded px-2.5 py-1.5 font-semibold text-[10px] flex items-center space-x-1 border transition-all ${
                              sub.status === 'Contacted'
                                ? 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                                : 'bg-emerald-950/40 border-emerald-900/60 text-emerald-400 hover:bg-emerald-900 hover:text-white'
                            }`}
                          >
                            <CheckSquare className="h-3 w-3" />
                            <span>{sub.status === 'Contacted' ? 'Mark New' : 'Mark Contacted'}</span>
                          </button>
                          
                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
                            className="rounded bg-slate-950 border border-slate-850 p-1.5 text-red-400 hover:text-white hover:bg-red-950 transition-all"
                            title="Delete Signup"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-950 rounded p-3 border border-slate-900/80 text-slate-300 leading-relaxed italic">
                        &ldquo;{sub.message || 'No specific prayers or comments provided.'}&rdquo;
                      </div>

                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-slate-400 font-mono text-[10px]">
                        <div>Phone/WhatsApp: <strong className="text-white">{sub.phone}</strong></div>
                        <div>Email address: <strong className="text-white break-all">{sub.email || 'None'}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
