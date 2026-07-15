import React from 'react';
import {
  Users,
  Target,
  ListChecks,
  Cross,
  Handshake,
  FolderKanban,
  GraduationCap,
  HeartHandshake,
  Mail,
  Megaphone,
  Music,
  Sparkles,
  Wrench,
  Wallet,
  Heart,
  Monitor,
  Baby,
  FileText,
} from 'lucide-react';

const DEPARTMENTS = [
  { name: 'Evangelism', icon: Megaphone },
  { name: 'Praise & Worship', icon: Music },
  { name: 'Ushers & Cleaners', icon: Sparkles },
  { name: 'Projects', icon: Wrench },
  { name: 'Finance', icon: Wallet },
  { name: 'Welfare', icon: Heart },
  { name: 'ICT', icon: Monitor },
  { name: 'Sunday School & Children Affairs', icon: Baby },
  { name: 'Secretariat & Publicity', icon: FileText },
];

const OBJECTIVES = [
  {
    number: 1,
    title: 'To organize Christians to serve God as individuals, and in groups',
    body: 'As the Brigade we believe in having self-motivated or self-driven individuals and groups to serve the Lord. Our God gave each one of us different gifts, callings, talents, professions, and other capabilities through which we can serve Him. For example, some can serve as evangelists, teachers of the word, ushers and cleaners, project initiators and implementers, in charge of welfare, intercessors, ICT specialists, and specialists in areas of electricity, plumbing, and joinery or carpentry among others. Therefore, the Brigade creates more space or opportunities for each one of us to contribute to the Ministry. Most importantly, this is an opportunity for us to bond as servants of Christ. Everyone should belong to at least one of the departments or groups through which he or she can contribute to this Ministry.',
  },
  {
    number: 2,
    title: 'To carry out and or support evangelization of the gospel of our Lord Jesus Christ to the individuals, families, and communities (Mark 16:15; Matthew 28:19)',
    body: 'We have to carry out evangelism, either directly or indirectly through groups, or as individuals. Whereas there is a group of evangelists who are called to do that task, it is important to note that each one of us has to extend the gospel of our Lord Jesus Christ to others. We, therefore, need to participate either directly or indirectly by supporting those who go out to do that work. The support can be in form of money for transport and meals, gadgets like speakers, and prayers. The support may be extended by either an individual or a group.',
  },
  {
    number: 3,
    title: 'To start church projects',
    body: 'The church projects to be started shall be in three strands: One; is those that will generate money for the church. Two; those that shall provide skills and income to the brethren of this church; and Three, those that can benefit the community.',
  },
  {
    number: 4,
    title: 'To train or groom brethren or Christians',
    body: 'Christians shall be groomed to serve the Almighty God in various capacities and positions, within the country and beyond. Some Christians will have to train fellow Christians within their specialty, and talents, among others to allow continuity of the current work done. This objective is also vital based on the premise that the Ministry is expanding every day, so some Christians after being groomed will have to be deployed to be ministers in the newly instituted churches across the country and beyond.',
  },
  {
    number: 5,
    title: 'To create programmes aimed at creating unity or bringing Christians together',
    body: 'Programmes such as luncheons, conferences, fellowships, and other arrangements shall be organized to bring Christians together given that we are a family. Such programmes shall provide an opportunity for the groups of Christians such as the married, singles, men, women, youths, pupils, and students at various academic levels, among other groups to share the word of God, challenges, experiences, opportunities, and guidance.',
  },
];

export default function BrigadeSection() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-16 text-center text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-950/25 via-slate-950 to-slate-950" />
        <div className="relative z-10 mx-auto max-w-3xl space-y-4 px-6">
          <span className="font-heading text-xs font-bold uppercase tracking-widest text-gold-400">
            Elders&apos; Council Committee
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            The Brigade
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
            The Brigade is one of the committees under the Elders&apos; Council of Trinity Christian Church.
            The chairperson of the Brigade is one of the church elders.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-gold-500 text-slate-950">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-gold-600">
              Who We Are
            </span>
            <h2 className="font-heading mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
              About the Brigade
            </h2>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-600 md:text-base">
          It is made up of several departments including evangelism, praise &amp; worship, ushers &amp; cleaners,
          projects, finance, welfare, ICT, Sunday school &amp; children affairs, and secretariat &amp; publicity,
          among others. Each is headed by two coordinators, who are supervised by church elders.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {DEPARTMENTS.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="flex items-center gap-2.5 border border-slate-200 bg-white px-3 py-3"
            >
              <Icon className="h-4 w-4 shrink-0 text-gold-600" />
              <span className="font-heading text-xs font-semibold text-slate-800">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Aim */}
      <section className="bg-slate-900 py-16 text-white md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-8 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-gold-500 text-slate-950">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-gold-400">
                Our Purpose
              </span>
              <h2 className="font-heading mt-1 text-2xl font-bold md:text-3xl">
                The Aim of the Brigade
              </h2>
            </div>
          </div>
          <p className="border-l-4 border-gold-500 bg-slate-950 p-6 text-sm leading-relaxed text-slate-300 md:text-base">
            To have well-organized Christians, who are self-driven or motivated, and committed to serving God
            or contributing to the Ministry as individuals, and groups using their different gifts, callings,
            talents, professions, skills, interests and other capabilities.
          </p>
        </div>
      </section>

      {/* Objectives */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="mb-10 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-gold-500 text-slate-950">
            <ListChecks className="h-6 w-6" />
          </div>
          <div>
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-gold-600">
              How We Serve
            </span>
            <h2 className="font-heading mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
              The Objectives of the Brigade
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              The operations of the Brigade are organized to fulfil the objectives below:
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {OBJECTIVES.map((objective) => (
            <article
              key={objective.number}
              className="border border-slate-200 bg-white p-6 md:p-8"
            >
              <div className="mb-4 flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-slate-900 font-heading text-sm font-bold text-gold-400">
                  {objective.number}
                </span>
                <h3 className="font-heading text-base font-bold leading-snug text-slate-900 md:text-lg">
                  {objective.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 md:pl-14">
                {objective.body}
              </p>
            </article>
          ))}
        </div>

        {/* Objective themes strip */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {[
            { icon: Cross, label: 'Organize service' },
            { icon: Handshake, label: 'Evangelize' },
            { icon: FolderKanban, label: 'Start projects' },
            { icon: GraduationCap, label: 'Groom Christians' },
            { icon: HeartHandshake, label: 'Build unity' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 border border-slate-200 bg-slate-50 p-4 text-center">
              <Icon className="h-5 w-5 text-gold-600" />
              <span className="font-heading text-[11px] font-semibold text-slate-700">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-slate-200 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center bg-gold-500 text-slate-950">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-slate-900">
            For More Information or Inquiry
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Reach the Brigade team directly — we would love to help you find a department where you can serve.
          </p>
          <a
            href="mailto:brigade@trinitychristianchurch.org.ug"
            className="mt-6 inline-flex items-center gap-2 bg-gold-500 px-6 py-3 font-heading text-sm font-bold text-slate-950 transition-colors hover:bg-gold-400"
          >
            <Mail className="h-4 w-4" />
            brigade@trinitychristianchurch.org.ug
          </a>
        </div>
      </section>
    </div>
  );
}
