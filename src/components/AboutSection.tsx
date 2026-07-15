import React from 'react';
import { ChurchInfo } from '../types';
import { ArrowRight, ShieldCheck, Heart, Users, Award, Star } from 'lucide-react';

interface AboutSectionProps {
  churchInfo: ChurchInfo;
  setCurrentTab: (tab: string) => void;
}

export default function AboutSection({ churchInfo, setCurrentTab }: AboutSectionProps) {
  const faithStatements = [
    {
      title: "The Holy Bible",
      description: "We believe the Bible is the inspired, infallible, and absolute authoritative Word of God, serving as the ultimate guide for faith, doctrine, and daily life."
    },
    {
      title: "The Triune God",
      description: "We believe in one God, eternally existent in three persons: God the Father, God the Son, and God the Holy Spirit."
    },
    {
      title: "Salvation by Grace",
      description: "We believe that salvation is received through faith alone in the precious blood of Jesus Christ, who died on the cross as a complete sacrifice for our sins."
    },
    {
      title: "Baptism & Communion",
      description: "We believe in water baptism by full immersion in the name of the Father, Son, and Holy Spirit, and the commemoration of the Lord's Supper."
    },
    {
      title: "Infilling of the Holy Spirit",
      description: "We believe in the active, current work of the Holy Spirit, empowering believers with spiritual gifts, speaking in new tongues, and working miracles."
    },
    {
      title: "The Second Coming",
      description: "We believe in the personal, imminent, and glorious return of our Lord Jesus Christ, and the resurrection of both the saved and the lost."
    }
  ];

  const leaders = [
    {
      name: "Senior Bishop John Mukisa",
      role: "Founder & Spiritual Director",
      bio: "Bishop John Mukisa has been in active ministry for over 35 years. Birthed with an apostolic commission, he coordinates TCC regional networks and oversees the Voice of the Gospel Radio program, bringing healing to thousands across East Africa.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400"
    },
    {
      name: "Reverend Sarah Mukisa",
      role: "Co-Founder & Director of Women's Ministries",
      bio: "Reverend Sarah Mukisa co-founded TCC and directs the 'Sisters of Grace' women fellowship. She is an ordained counselor who works directly with marital support, orphan aids, and directs local church developmental projects.",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400"
    },
    {
      name: "Pastor David Serwadda",
      role: "Regional Overseer & Pastor (Mukono)",
      bio: "Pastor David has served in the TCC leadership team for 12 years. He is currently the head pastor of Mukono Branch and organizes regional outreaches and the annual Youth & Brigade national camps.",
      imageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      
      {/* Hero Banner header */}
      <section className="bg-slate-950 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-950/20 via-slate-950 to-slate-950 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold font-heading">Our Identity & Heritage</span>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Our Story & Statement of Faith
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Discover the rich spiritual legacy of Trinity Christian Church, our leadership team, and the foundational biblical truths that govern our ministries.
          </p>
        </div>
      </section>

      {/* Narrative History Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
        
        {/* Left narrative content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-heading">A Beacon of Revival</span>
            <h3 className="font-heading text-2xl font-bold text-slate-900 md:text-3xl">
              The Call of Prophet Israel Mukama
            </h3>
            <div className="h-1 w-16 bg-gold-500"></div>
          </div>
          
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            {churchInfo.historyText}
          </p>

          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            Trinity Christian Church is a Prophetic Ministry under Prophet Israel Mukama as the Vision bearer
            and Pastor Omoding Jacob as the church pastor. As a Ministry, we follow a divinely called and
            scripturally ordained ministry for the evangelization of the world, edifying of the Body of Christ,
            and the oversight and shepherding of the Church.
          </p>

          <button
            onClick={() => setCurrentTab('mission')}
            className="inline-flex items-center gap-2 font-heading text-sm font-bold text-gold-700 transition-colors hover:text-gold-500"
          >
            Read our full mission &amp; objectives
            <ArrowRight className="ml-0 h-4 w-4" />
          </button>

          {/* Fact items */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-4">
            <div className="rounded-xl bg-white p-4 border border-slate-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-gold-600">1993</p>
              <p className="text-xs text-slate-500 font-heading font-semibold uppercase mt-1">Founding Call</p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-slate-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-gold-600">Rubaga</p>
              <p className="text-xs text-slate-500 font-heading font-semibold uppercase mt-1">Road Home</p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-slate-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-gold-600">7+</p>
              <p className="text-xs text-slate-500 font-heading font-semibold uppercase mt-1">Active Branches</p>
            </div>
          </div>
        </div>

        {/* Right side founders visual */}
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/10 to-transparent rounded-2xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1531844251246-9a1bfaae0d76?q=80&w=800" 
            alt="Bishop John Mukisa preaching" 
            className="rounded-2xl object-cover h-[380px] w-full shadow-lg border border-slate-200"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-slate-950/95 border border-slate-800 text-white rounded-xl p-5 shadow-2xl backdrop-blur-md">
            <h4 className="font-heading font-bold text-sm text-gold-400">Bishop John preaching on Radio TCC</h4>
            <p className="text-slate-400 text-xs mt-1">Broadcasting the Voice of the Gospel across Rubaga, Makindye, Mukono, and Wakiso Districts.</p>
          </div>
        </div>

      </section>

      {/* Statement of Faith (Grid of 6 Cards) */}
      <section className="bg-slate-900 py-16 text-white md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 font-heading">What We Stand On</span>
            <h3 className="font-heading text-2xl font-bold tracking-tight md:text-4xl">
              Our Statement of Faith
            </h3>
            <p className="text-slate-400 text-xs">
              We stand firm on these immutable, fundamental biblical truths as taught by Christ and His Apostles.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {faithStatements.map((stmt, idx) => (
              <div 
                key={idx} 
                className="rounded-xl bg-slate-950 p-6 border border-slate-800 hover:border-gold-500/30 transition-all shadow-inner"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 mb-4 font-bold font-heading">
                  {idx + 1}
                </div>
                <h4 className="font-heading font-bold text-base text-white mb-2">{stmt.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{stmt.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pastoral Team Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-heading">Our Shepherds</span>
          <h3 className="font-heading text-2xl font-bold text-slate-900 md:text-3xl">
            Pastoral Leadership & Ministry Staff
          </h3>
          <div className="h-1 w-12 bg-gold-500 mx-auto"></div>
          <p className="text-slate-500 text-xs">
            Meet the faithful pastors and leadership team dedicated to discipling and caring for families at TCC.
          </p>
        </div>

        {/* Leaders cards layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {leaders.map((leader, idx) => (
            <div 
              key={idx} 
              className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col"
            >
              <div className="h-[260px] bg-slate-100 relative">
                <img 
                  src={leader.imageUrl} 
                  alt={leader.name} 
                  className="h-full w-full object-cover grayscale brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 rounded bg-gold-500 px-3 py-1 font-heading text-xs font-bold text-slate-950">
                  {leader.role}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-heading font-bold text-lg text-slate-900">{leader.name}</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{leader.bio}</p>
                </div>
                <button
                  onClick={() => setCurrentTab('contact')}
                  className="w-full mt-4 rounded-lg border border-slate-200 py-2 text-xs font-bold text-slate-700 hover:border-gold-500 hover:text-gold-700 transition-colors"
                >
                  Request Consultation / Prayer
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
