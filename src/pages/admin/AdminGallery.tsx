import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useGymData } from '../../context/GymDataContext';
import {
  Image as ImageIcon,
  PlusCircle,
  Trash2,
  CheckCircle2,
  Filter,
  Eye,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminGallery: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = useGymData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New item form
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<'interior' | 'equipment' | 'trainers' | 'members' | 'events'>('interior');
  const [caption, setCaption] = useState('');

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'interior', label: 'Interior & Floor' },
    { id: 'equipment', label: 'Machines & Racks' },
    { id: 'trainers', label: 'Coaches' },
    { id: 'members', label: 'Members' },
    { id: 'events', label: 'Workshops & Events' },
  ];

  const filtered = gallery.filter(
    (g) => activeCategory === 'all' || g.category === activeCategory
  );

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    addGalleryItem({
      title,
      imageUrl,
      category,
      caption: caption || title,
    });

    confetti({ particleCount: 35, spread: 50, colors: ['#ff5500', '#10b981'] });
    setIsModalOpen(false);
    setTitle('');
    setImageUrl('');
    setCaption('');
  };

  return (
    <DashboardLayout
      activeRole="admin"
      title="Media & Facility Gallery Curator"
      subtitle="Upload and manage high-resolution photography showcasing GYM CORE campus in Neota / Mahindra SEZ."
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === c.id
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>ADD MEDIA ASSET</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 relative flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-orange-400 border border-white/10">
                  {item.category}
                </span>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => deleteGalleryItem(item.id)}
                    className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer shadow-lg"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">{item.caption}</p>
                </div>
                <div className="text-[10px] text-neutral-500 font-mono mt-2">ID: {item.id}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Media Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-neutral-950 border border-neutral-800 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-black text-lg text-white">Add Gallery Asset</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1 font-bold">Image Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Olympic Lifting Platform Area"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-bold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                >
                  <option value="interior">Interior & Floor</option>
                  <option value="equipment">Equipment & Machines</option>
                  <option value="trainers">Trainers & Coaches</option>
                  <option value="members">Members In Action</option>
                  <option value="events">Workshops & Events</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-bold">Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-bold">Caption / Description</label>
                <textarea
                  rows={2}
                  placeholder="Highlight key equipment or zone features..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish to Media Stream</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
