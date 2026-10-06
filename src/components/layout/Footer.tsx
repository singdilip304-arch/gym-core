import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-sm">
      {/* Upper highlight banner */}
      <div className="border-b border-neutral-900 bg-neutral-900/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <span className="w-3 h-3 rounded-full bg-orange-500 animate-ping shrink-0" />
            <div>
              <p className="text-white font-extrabold text-sm sm:text-base">
                Ready to Experience Jaipur’s Most Elite Strength & Fitness Club?
              </p>
              <p className="text-xs text-neutral-400">
                Located right at Neota / Mahindra SEZ / Kalwada. 24/7 High-Tech Facility.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/free-trial"
              className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20"
            >
              Book Free Trial
            </Link>
            <a
              href="https://wa.me/919829011223?text=Hi%20GYM%20CORE%2C%20I%20am%20interested%20in%20joining%20the%20gym%20at%20Neota%20Jaipur"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-xs leading-relaxed text-neutral-400 max-w-sm">
              GYM CORE is Jaipur’s benchmark premium fitness, bodybuilding, and athletic conditioning facility.
              Engineered with world-class biomechanical equipment, certified elite coaches, and a disciplined
              performance-driven community.
            </p>

            <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-1">
              <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
                Brand Creed
              </span>
              <p className="text-xs font-semibold text-white">
                Strength. Discipline. Consistency. Results.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-colors text-neutral-400"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-colors text-neutral-400"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-colors text-neutral-400"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Explore GYM CORE
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'About Facility', path: '/about' },
                { label: 'Workout Programs', path: '/programs' },
                { label: 'Membership Tiers', path: '/membership' },
                { label: 'Elite Coaches', path: '/trainers' },
                { label: 'Fitness Calculators', path: '/calculators' },
                { label: 'Gym Visual Gallery', path: '/gallery' },
                { label: 'Transformations', path: '/transformations' },
                { label: 'Member Reviews', path: '/reviews' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-orange-400 transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 text-neutral-600 group-hover:text-orange-500 transition-colors" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Training Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Elite Programs
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                'Heavy Hypertrophy Split',
                'Hardcore Bodybuilding',
                'Powerlifting & 1RM Prep',
                'Rapid Metabolic Fat Loss',
                'Athletic VO2 & Turf Sprints',
                'Women Tone & Strength',
                'Postural Rehabilitation',
                'Beginner Iron Foundation',
              ].map((prog) => (
                <li key={prog} className="flex items-center gap-1.5 text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/60 shrink-0" />
                  <Link to="/programs" className="hover:text-white transition-colors">
                    {prog}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Facility Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Facility & Location
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">GYM CORE Flagship</p>
                  <p className="text-neutral-400 text-[11px]">
                    Near Mahindra World City SEZ, Neota / Kalwada Road, Jaipur, Rajasthan 302037
                  </p>
                  <a
                    href="https://maps.google.com/?q=Mahindra+World+City+Jaipur+Rajasthan"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-orange-400 hover:underline inline-flex items-center gap-0.5 mt-1"
                  >
                    View on Google Maps <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="tel:+919829011223" className="text-neutral-300 hover:text-white font-mono">
                  +91 98290 11223
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="mailto:support@gymcore.in" className="text-neutral-300 hover:text-white">
                  support@gymcore.in
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1 border-t border-neutral-900">
                <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <p className="text-white font-semibold">24/7 Digital RFID Access</p>
                  <p className="text-neutral-400">Staffed Hours: 05:30 AM – 10:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} GYM CORE. All Rights Reserved. Engineered for Peak Performance.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-neutral-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/contact" className="hover:text-neutral-300 transition-colors">
              Gym Safety Rules
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
