import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'full' | 'mark';
  size?: 'sm' | 'md' | 'lg';
  linkToHome?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  linkToHome = true,
  className = '',
}) => {
  const iconSize = size === 'sm' ? 26 : size === 'lg' ? 44 : 34;

  const logoMark = (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Athletic Hexagonal Core & Barbells Mark */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="gymCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7700" />
            <stop offset="50%" stopColor="#FF5500" />
            <stop offset="100%" stopColor="#E03E00" />
          </linearGradient>
          <filter id="coreGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FF5500" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Outer Heavy Hexagon Frame */}
        <polygon
          points="50,4 90,26 90,74 50,96 10,74 10,26"
          stroke="url(#gymCoreGrad)"
          strokeWidth="6"
          fill="#11141E"
          filter="url(#coreGlow)"
        />

        {/* Inner Diamond Core */}
        <polygon
          points="50,22 75,50 50,78 25,50"
          fill="#FF5500"
          opacity="0.9"
        />

        {/* Center Iron Barbell Line */}
        <line
          x1="22"
          y1="50"
          x2="78"
          y2="50"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Left & Right Plate Weights */}
        <rect x="30" y="36" width="6" height="28" rx="2" fill="#FFFFFF" />
        <rect x="64" y="36" width="6" height="28" rx="2" fill="#FFFFFF" />
      </svg>
    </div>
  );

  if (variant === 'mark') {
    if (linkToHome) {
      return (
        <Link to="/" className="inline-flex items-center group" aria-label="GYM CORE Home">
          {logoMark}
        </Link>
      );
    }
    return logoMark;
  }

  const content = (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {logoMark}
      <div className="flex flex-col">
        <div className="flex items-center tracking-tighter">
          <span className="font-black text-xl lg:text-2xl text-white dark:text-white group-hover:text-white transition-colors tracking-tight font-sans">
            GYM
          </span>
          <span className="font-black text-xl lg:text-2xl text-orange-500 ml-1.5 tracking-wider">
            CORE
          </span>
        </div>
        <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-semibold -mt-1 hidden sm:block">
          BUILD STRONG • LIVE STRONGER
        </span>
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="inline-flex items-center" aria-label="GYM CORE Home">
        {content}
      </Link>
    );
  }

  return content;
};
