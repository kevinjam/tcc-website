import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle, Heart, Loader2, Globe, MessageCircle, Laptop } from 'lucide-react';
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
    'Join TCC ICT Hub',
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
    <div className="bg-slate-50 font-sans text-slate-800">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-5 md:py-6 grid grid-cols-1 gap-4 lg:grid-cols-12 items-start">
        {/* Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-100 p-4 md:p-5 shadow-sm space-y-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 font-heading">Connect</span>
            <h2 className="font-heading text-lg font-bold text-slate-900 md:text-xl">Join our Church Family</h2>
            <p className="text-xs text-slate-500 leading-snug">
              Register as a member, join a ministry, or request pastoral counseling.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            {submitted ? (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-5 text-center space-y-2 text-emerald-800">
                <CheckCircle className="h-10 w-10 text-emerald-600 mx-auto" />
                <h4 className="font-heading font-bold text-base">Registration Received!</h4>
                <p className="text-xs leading-relaxed">
                  Our team will reach out within 48 hours to welcome you.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-gold-700 hover:underline"
                >
                  Register another person
                </button>
              </div>
            ) : (
              <>
                {errorMessage && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Brother Joshua "
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mb-1">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +256 705519715"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. luisjoshua2019@gmail.com"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mb-1">Interest / Fellowship</label>
                    <select
                      value={formData.interestArea}
                      onChange={(e) => setFormData({ ...formData, interestArea: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-500 focus:outline-none bg-white"
                    >
                      {interestOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mb-1">Prayer request or message</label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can pray or assist you..."
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-gold-500 py-2.5 font-heading text-sm font-bold text-slate-950 hover:bg-gold-400 active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit</span>
                    </>
                  )}
                </button>
              </>
            )}
          </form>
        </div>

        {/* Compact sidebar */}
        <aside className="lg:col-span-5 space-y-3">
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm space-y-3">
            <h3 className="font-heading font-bold text-sm text-slate-900">Contact</h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold-600 shrink-0 mt-0.5" />
                <p className="text-slate-600 leading-snug">
                  {CHURCH_CONTACT.addressLine1}<br />
                  {CHURCH_CONTACT.addressLine2}
                </p>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="h-3.5 w-3.5 text-gold-600 shrink-0 mt-0.5" />
                <div className="flex flex-wrap gap-x-2.5 gap-y-0.5">
                  {CHURCH_CONTACT.phones.map((phone) => (
                    <a
                      key={phone}
                      href={phoneHref(phone)}
                      className="text-slate-600 hover:text-gold-600 hover:underline"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                <a
                  href={CHURCH_CONTACT.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-gold-600 hover:underline"
                >
                  {CHURCH_CONTACT.website}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="h-3.5 w-3.5 text-gold-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  {CHURCH_CONTACT.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block text-slate-600 hover:text-gold-600 hover:underline break-all"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-2.5 grid grid-cols-2 gap-2">
              <a
                href={CHURCH_CONTACT.whatsappChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50/50 px-2 py-1.5 text-[11px] font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                WhatsApp
              </a>
              <a
                href={CHURCH_CONTACT.ictHubWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-gold-100 bg-gold-50/50 px-2 py-1.5 text-[11px] font-semibold text-gold-800 hover:bg-gold-50 transition-colors"
              >
                <Laptop className="h-3.5 w-3.5 shrink-0" />
                ICT Hub
              </a>
            </div>
          </div>

          <div className="rounded-xl bg-slate-950 px-4 py-3 text-white">
            <p className="font-heading text-sm font-bold flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5 text-gold-400 fill-current shrink-0" />
              Support God&apos;s Work
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Giving:{' '}
              <a href={`mailto:${CHURCH_CONTACT.primaryEmail}`} className="text-gold-400 hover:underline">
                {CHURCH_CONTACT.primaryEmail}
              </a>
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
