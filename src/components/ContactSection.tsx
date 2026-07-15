import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle, Heart, Loader2, Globe } from 'lucide-react';
import { CHURCH_CONTACT, phoneHref } from '../contactInfo';

interface ContactSectionProps {
  onSubmitContact: (submission: { fullName: string; email: string; phone: string; message: string; interestArea: string }) => Promise<boolean>;
}

export default function ContactSection({ onSubmitContact }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interestArea: 'Just Joining as Member',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const interestOptions = [
    'Just Joining as Member',
    'Join Choir Ministry',
    'Join Youth Fellowship',
    'Boys & Girls Brigade Parent',
    'Intercession & Prayer Team',
    'Ushering & Usher Team',
    'Outreach & Welfare Team'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    setSubmitting(true);
    setErrorMessage('');
    try {
      const success = await onSubmitContact(formData);
      if (success) {
        setSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          interestArea: 'Just Joining as Member',
          message: ''
        });
      } else {
        setErrorMessage('Failed to submit. Please check your network connection.');
      }
    } catch (err) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      
      {/* Hero Banner header */}
      <section className="bg-slate-950 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-950 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold font-heading">Get in Touch</span>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Join Our Family &amp; Contact Us
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Ready to find your spiritual home? Fill in our family registration form below, or contact our national headquarters for prayers and counseling.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Block split */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
        
        {/* Left Side: Dynamic Seeker Registration form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-heading">Welcome Home</span>
            <h3 className="font-heading text-xl font-bold text-slate-900">Join our Church Family</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Register as a member of Trinity Christian Church, sign up for a ministry department, or request one-on-one counseling with our pastors.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {submitted ? (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3 text-emerald-800 animate-in fade-in duration-300">
                <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto" />
                <h4 className="font-heading font-bold text-lg">Family Registration Received!</h4>
                <p className="text-xs leading-relaxed max-w-md mx-auto">
                  A sincere welcome to TCC! Our pastoral follow-up team or local home-cell coordinators will reach out to you within 48 hours to welcome you properly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold text-gold-700 hover:underline"
                >
                  Register another person...
                </button>
              </div>
            ) : (
              <>
                {errorMessage && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-3.5 text-xs text-red-700">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Kevin Namuli"
                      className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Your WhatsApp / Phone</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +256 700 000000"
                      className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Your Email (Optional)</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. kevin@example.com"
                      className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Area of Interest / Fellowship</label>
                    <select 
                      value={formData.interestArea}
                      onChange={(e) => setFormData({ ...formData, interestArea: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:border-gold-500 focus:outline-none bg-white"
                    >
                      {interestOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">How can we pray or assist you?</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us a bit about yourself, or share a prayer request..."
                    className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:border-gold-500 focus:outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-gold-500 py-3.5 font-heading text-sm font-bold text-slate-950 hover:bg-gold-400 shadow active:scale-95 transition-all flex items-center justify-center space-x-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-full animate-spin" />
                      <span>Transmitting details...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit Family Membership Details</span>
                    </>
                  )}
                </button>
              </>
            )}
          </form>
        </div>

        {/* Right Side: Official Contact */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-6">
            <h4 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
              Contact
            </h4>

            <div className="space-y-5">
              <div className="flex items-start space-x-3.5">
                <MapPin className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-slate-900 uppercase">Address</h5>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {CHURCH_CONTACT.addressLine1}<br />
                    {CHURCH_CONTACT.addressLine2}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-slate-900 uppercase">Phone</h5>
                  <ul className="mt-1 space-y-1">
                    {CHURCH_CONTACT.phones.map((phone) => (
                      <li key={phone}>
                        <a
                          href={phoneHref(phone)}
                          className="text-xs text-slate-600 hover:text-gold-600 hover:underline"
                        >
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Globe className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-slate-900 uppercase">Website</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    <a
                      href={CHURCH_CONTACT.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold-600 hover:underline"
                    >
                      {CHURCH_CONTACT.website}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Mail className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-slate-900 uppercase">Email</h5>
                  <ul className="mt-1 space-y-1">
                    {CHURCH_CONTACT.emails.map((email) => (
                      <li key={email}>
                        <a
                          href={`mailto:${email}`}
                          className="text-xs text-slate-600 hover:text-gold-600 hover:underline break-all"
                        >
                          {email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Give / Donation details card */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 border border-slate-800 text-white shadow-lg space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-20 w-20 opacity-20">
              <img src="/tcc-logo.png" alt="" className="h-full w-full object-contain" />
            </div>
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-gold-500/10 px-3 py-1 text-[10px] font-bold text-gold-400 border border-gold-500/20 uppercase">
              <Heart className="h-3 w-3 fill-current" />
              <span>Tithes &amp; Missions Offering</span>
            </span>
            <h4 className="font-heading font-bold text-lg text-white">Support God&apos;s Work</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Partner with Trinity Christian Church in evangelism, church planting, and ministry programmes across Uganda and beyond.
            </p>
            <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2.5">
              <p className="text-xs text-slate-400">
                For giving inquiries, email{' '}
                <a href={`mailto:${CHURCH_CONTACT.primaryEmail}`} className="text-gold-400 hover:underline">
                  {CHURCH_CONTACT.primaryEmail}
                </a>
              </p>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
