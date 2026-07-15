import React from 'react';
import { ChurchInfo } from '../types';
import { ArrowRight, Cross, Eye, Target, ListChecks, Network } from 'lucide-react';

interface MissionSectionProps {
  churchInfo: ChurchInfo;
  setCurrentTab: (tab: string) => void;
}

const OBJECTIVES = [
  'To conduct religious services, namely church services including marriage ceremonies, funeral services, baptism services, gospel crusades, conferences and conventions, seminars, dedication and ordination services, and holy communion services, among others (Ephesians 1:22, Matthew 28:19-20, 2 Timothy 2:2).',
  'To establish churches that are self-governing, self-propagating, and self-supporting bodies known as local churches, all under the supervision of the headquarters of Trinity Christian Church.',
  'To promote evangelism to fulfill Christ\'s command: "Go ye into all the world and preach the Gospel to every creature" (Mark 16:15; Matthew 28:19).',
  'To establish and maintain programs, schemes, or projects which will contribute to the evangelism of the population of Uganda and beyond.',
  'To initiate, support, and sustain activities that are particularly designed to bear Christian witness to all people. To adopt such means of making known the activities and services of TCC as may seem expedient and in particular by circular, advertising by newsletters, periodicals, sound broadcasting, cinematograph films, among others.',
  'To undertake and execute any charitable agencies which may seem directly or indirectly conducive to the objects of the Church.',
  'To operate institutions of charity such as orphanages, old age homes, guest houses, secular schools, Bible schools, health centers, literacy programs, primary health care, and vocational schools, among others.',
  'To provide for the spiritual growth and fellowship of the children, the youth, and the flock at large through seminars, classes, and conferences.',
];

export default function MissionSection({ churchInfo, setCurrentTab }: MissionSectionProps) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Page hero */}
      <section className="relative overflow-hidden bg-slate-950 py-16 text-center text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-950/25 via-slate-950 to-slate-950" />
        <div className="relative z-10 mx-auto max-w-3xl space-y-3 px-6">
          <span className="font-heading text-xs font-bold uppercase tracking-widest text-gold-400">
            About TCC
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Our Mission &amp; Calling
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-400">
            Vision, mission, objectives, and the prophetic call that established Trinity Christian Church on Rubaga Road, Kampala.
          </p>
        </div>
      </section>

      {/* The Call of Prophet Israel Mukama */}
      <section id="call" className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-gold-500 text-slate-950">
            <Cross className="h-6 w-6" />
          </div>
          <div>
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-gold-600">
              Our Heritage
            </span>
            <h2 className="font-heading mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
              The Call of Prophet Israel Mukama
            </h2>
          </div>
        </div>

        <div className="space-y-5 text-sm leading-relaxed text-slate-600 md:text-base">
          <p>
            Trinity Christian Church is a Prophetic Ministry under Prophet Israel Mukama as the Vision bearer
            and Pastor Omoding Jacob as the church pastor. The Ministry began with the call of Prophet Israel
            on the 28th November 1993. The church began in his house when he was still staying along Rashid
            Khamis Road. It later moved along Rubaga Road under a mango tree. The church now has a permanent
            home along Rubaga Road after Tosha Petrol Station, a few meters (approximately 10 meters) off the
            main road.
          </p>
          <p>
            The church is the body of Christ, the habitation of God through the Spirit with Divine appointments
            for the fulfillment of her great commission. All believers who are indeed baptized by the Holy Spirit
            into the Body of Christ can be an integral part of Trinity Christian Church.
          </p>
          <p>
            As a Ministry, we follow a divinely called and scripturally ordained ministry provided by our Lord
            for the evangelization of the world (Mark 16:15-20); edifying of the Body of Christ (Ephesians 4:11-13);
            and the oversight and shepherding of the Church following scriptural church governance
            (1 Corinthians 12:28; Hebrews 13:7, 17; 1 Peter 5:1-4).
          </p>
        </div>
      </section>

      {/* Vision + Mission */}
      <section className="bg-slate-900 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">
          <div id="vision" className="space-y-4 border border-slate-800 bg-slate-950 p-8">
            <div className="flex h-10 w-10 items-center justify-center bg-gold-500 text-slate-950">
              <Eye className="h-5 w-5" />
            </div>
            <h2 className="font-heading text-xl font-bold md:text-2xl">Vision</h2>
            <p className="text-sm leading-relaxed text-slate-300 md:text-base">
              {churchInfo.visionText}
            </p>
          </div>

          <div id="mission" className="space-y-4 border border-slate-800 bg-slate-950 p-8">
            <div className="flex h-10 w-10 items-center justify-center bg-gold-500 text-slate-950">
              <Target className="h-5 w-5" />
            </div>
            <h2 className="font-heading text-xl font-bold md:text-2xl">Mission</h2>
            <p className="text-sm leading-relaxed text-slate-300 md:text-base">
              {churchInfo.missionText}
            </p>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section id="objectives" className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="mb-10 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-gold-500 text-slate-950">
            <ListChecks className="h-6 w-6" />
          </div>
          <div>
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-gold-600">
              What We Pursue
            </span>
            <h2 className="font-heading mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
              Our Objectives
            </h2>
          </div>
        </div>

        <ol className="space-y-5">
          {(churchInfo.aimsText?.length ? churchInfo.aimsText : OBJECTIVES).map((objective, idx) => (
            <li key={idx} className="flex gap-4 border-b border-slate-200 pb-5 last:border-0">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-slate-900 font-heading text-sm font-bold text-gold-400">
                {idx + 1}
              </span>
              <p className="text-sm leading-relaxed text-slate-600 md:text-base">{objective}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Organization */}
      <section id="organization" className="border-t border-slate-200 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-8 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-gold-500 text-slate-950">
              <Network className="h-6 w-6" />
            </div>
            <div>
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-gold-600">
                Church Governance
              </span>
              <h2 className="font-heading mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
                Organization and Administration of the Church
              </h2>
            </div>
          </div>

          <div className="border border-slate-200 bg-slate-50 p-8">
            <h3 className="font-heading text-lg font-bold text-slate-900">
              The Trinity Christian Church Administrative Structure
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              TCC operates under scriptural church governance with Prophet Israel Mukama as Vision bearer
              and Pastor Omoding Jacob as church pastor, together with oversight for local congregations that
              are self-governing, self-propagating, and self-supporting under the headquarters of Trinity
              Christian Church.
            </p>
            <button
              onClick={() => setCurrentTab('branches')}
              className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-bold text-gold-700 transition-colors hover:text-gold-500"
            >
              <span>View our branches &amp; local churches</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-12 text-center">
        <div className="mx-auto max-w-2xl px-6 space-y-4">
          <p className="font-heading text-sm text-slate-300">
            Want to know more about our story and statement of faith?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setCurrentTab('about')}
              className="rounded-lg bg-gold-500 px-5 py-2.5 font-heading text-sm font-bold text-slate-950 transition-all hover:bg-gold-400"
            >
              Read Our Full Story
            </button>
            <button
              onClick={() => setCurrentTab('contact')}
              className="rounded-lg border border-slate-700 px-5 py-2.5 font-heading text-sm font-bold text-white transition-all hover:border-gold-500 hover:text-gold-400"
            >
              Connect With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
