import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setMobile('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="pt-24 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          Contact GYM CORE
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Located right near Mahindra World City SEZ, Kalwada & Neota, Jaipur.
          Reach out for memberships, corporate fitness partnerships, or personal trainer assessments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold text-orange-400 tracking-wider">
                Flagship Arena
              </span>
              <h2 className="text-2xl font-black uppercase text-white mt-1">
                GYM CORE Neota / SEZ
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-bold">Physical Address</p>
                  <p className="text-neutral-400 leading-relaxed mt-0.5">
                    Near Mahindra World City SEZ Campus, Neota / Kalwada Road, Jaipur, Rajasthan 302037
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-bold">Helpline & Reception</p>
                  <a href="tel:+919829011223" className="text-neutral-300 hover:text-orange-400 font-mono">
                    +91 98290 11223
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-bold">Email Support</p>
                  <a href="mailto:support@gymcore.in" className="text-neutral-300 hover:text-orange-400">
                    support@gymcore.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-neutral-900">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-bold">Operating Hours</p>
                  <p className="text-neutral-400">24/7 Digital Turnstile Keycard Access</p>
                  <p className="text-neutral-500 text-[11px]">Staffed Coaching: 05:30 AM – 10:30 PM (All 7 Days)</p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href="https://maps.google.com/?q=Mahindra+World+City+Jaipur+Rajasthan"
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://wa.me/919829011223?text=Hi%20GYM%20CORE%2C%20I%20have%20an%20inquiry%20about%20the%20Neota%20club"
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors border border-neutral-800"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-6">
            <div className="border-b border-neutral-900 pb-4">
              <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                Direct Message
              </span>
              <h3 className="text-xl font-black uppercase text-white mt-1">Send an Inquiry</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Our operations team responds within 2 business hours.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-300 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-300 block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="+91 98290 00000"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vikram@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 block mb-1">Message / Question</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you're looking for (e.g. corporate pass for SEZ employees, powerlifting coaching, personal training)..."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none placeholder:text-neutral-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-3 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-white">Message Dispatched!</h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Thank you, {name}. Our facility manager will call you back on {mobile} shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Google Map Section */}
      <div className="rounded-3xl border border-neutral-800 overflow-hidden bg-neutral-950 shadow-2xl">
        <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>GYM CORE Interactive Location Map • Neota / Mahindra SEZ</span>
          </div>
          <span className="text-[10px] text-neutral-400 font-mono">Jaipur 302037</span>
        </div>
        <div className="h-96 w-full">
          <iframe
            title="GYM CORE Jaipur Facility Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14246.541459423668!2d75.6027581!3d26.8521199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4dca16c026cf%3A0xe5f9227c444f2ff4!2sMahindra%20World%20City%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="w-full h-full border-0 filter grayscale contrast-125 opacity-90"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};
