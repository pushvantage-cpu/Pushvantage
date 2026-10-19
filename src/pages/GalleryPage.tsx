import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { GALLERY_PROJECTS, COMPANY_INFO } from '../data/companyData';
import { GalleryProject } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { X, ZoomIn, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';

export const GalleryPage: React.FC = () => {
  const { openQuoteModal } = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'apparel', label: 'Apparel & Uniforms' },
    { id: 'reflective', label: 'Reflective Overalls & PPE' },
    { id: 'printing', label: 'Custom Printing & Screen' },
    { id: 'gifts', label: 'Corporate Gifts & Branding' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? GALLERY_PROJECTS
    : GALLERY_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="pb-16 space-y-12">
      <Breadcrumbs items={[{ label: 'Our Work & Gallery' }]} />

      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden border border-neutral-800">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="text-xs font-mono uppercase tracking-widest text-[#F95700] font-semibold">
              Project Showcase · Push Vantage Ltd
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Our Work & Production Gallery
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              Explore completed garments, industrial reflective overalls, precision screen printing, executive embroidery, and corporate gift packages crafted for organizations in Nairobi and across Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-2xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Visual Image */}
                <div
                  onClick={() => setSelectedProject(project)}
                  className="aspect-4/3 overflow-hidden relative cursor-pointer bg-neutral-100"
                >
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-neutral-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/80 text-white text-xs font-medium rounded-lg backdrop-blur-xs">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Inspect Details</span>
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 bg-neutral-900/85 backdrop-blur-xs text-white text-[10px] font-mono uppercase px-2.5 py-0.5 rounded">
                    {project.categoryLabel}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="font-bold text-base text-neutral-900 group-hover:text-[#F95700] transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-2 space-y-1">
                    {project.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-neutral-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => openQuoteModal(project.title)}
                  className="w-full py-2.5 px-4 text-xs font-bold text-neutral-900 bg-neutral-100 hover:bg-[#F95700] hover:text-white rounded-lg transition-colors cursor-pointer text-center"
                >
                  Request Similar Project Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8">
            <div className="flex items-center justify-between p-4 bg-neutral-900 text-white border-b border-neutral-800">
              <span className="text-xs font-mono uppercase tracking-wider text-[#F95700] font-bold">
                {selectedProject.categoryLabel}
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="aspect-16/10 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                <OptimizedImage
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  priority={true}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-neutral-900">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-mono mb-2">
                    Production Highlights:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                    {selectedProject.details.map((d, i) => (
                      <div key={i} className="flex items-center gap-2 bg-neutral-50 p-2.5 rounded-lg border border-neutral-150">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F95700]" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-end gap-3">
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    openQuoteModal(title);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-lg transition-colors cursor-pointer"
                >
                  <span>Request Quote for This Quality</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
