import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { Image, X, ZoomIn, MapPin } from 'lucide-react';
import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const { gallery } = useGymData();
  const [filter, setFilter] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filtered =
    filter === 'all' ? gallery : gallery.filter((item) => item.category === filter);

  return (
    <div className="pt-24 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block">
          Visual Showcase
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          Gym Core Gallery
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Explore our 12,000 sq.ft high-performance arena, Eleiko calibrated platforms,
          panoramic cardio mezzanines, and brotherhood atmosphere at Neota, Jaipur.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-neutral-950 border border-neutral-800 max-w-fit mx-auto">
        {[
          { id: 'all', label: 'All Media' },
          { id: 'equipment', label: 'Heavy Equipment & Bars' },
          { id: 'interior', label: 'Interior & Recovery' },
          { id: 'trainers', label: 'Coaching in Action' },
          { id: 'members', label: 'Athletes & Members' },
          { id: 'events', label: 'Tournaments & Bootcamps' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === tab.id
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 cursor-pointer shadow-xl"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
              <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
                {item.category}
              </span>
              <h3 className="text-base font-bold text-white group-hover:text-orange-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-300 mt-1 line-clamp-2">{item.caption}</p>
            </div>

            <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>

            <div className="p-6 bg-neutral-900 border-t border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono font-bold text-orange-400">
                  {activeItem.category} • GYM CORE Neota
                </span>
                <span className="text-xs text-neutral-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  Mahindra SEZ, Jaipur
                </span>
              </div>
              <h3 className="text-xl font-black text-white">{activeItem.title}</h3>
              <p className="text-xs text-neutral-300">{activeItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
