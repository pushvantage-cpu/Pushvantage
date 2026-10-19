import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { SERVICES_DATA, COMPANY_INFO } from '../data/companyData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CheckCircle2, ArrowRight, Printer, Scissors, ShieldAlert, Sparkles, Shirt, Gift, MessageSquare } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';

export const ServicesPage: React.FC = () => {
  const { openQuoteModal } = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'Printing & Branding', label: 'Printing & Branding' },
    { id: 'Apparel Manufacturing', label: 'Apparel Manufacturing' },
    { id: 'Industrial Workwear', label: 'Reflective Overalls & Workwear' },
    { id: 'Safety & Protection', label: 'PPE & Safety' },
    { id: 'Corporate Uniforms', label: 'Corporate Uniforms' },
    { id: 'Corporate Gifts', label: 'Corporate Gifts & Merchandise' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategory);

  return (
    <div className="pb-16 space-y-12">
      <Breadcrumbs items={[{ label: 'Our Services' }]} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden border border-neutral-800">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="text-xs font-mono uppercase tracking-widest text-[#F95700] font-semibold">
              Specialist Services · Push Vantage Ltd
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Comprehensive Printing, Apparel & Workwear Solutions
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              From heavy-duty reflective boiler suits to executive corporate polos and vibrant merchandise printing, we provide end-to-end production with high-precision customization in Nairobi, Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
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
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Services List Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {filteredServices.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={service.id}
              id={service.id}
              className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow p-6 sm:p-10"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                {/* Visual Image Column (5 cols) */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative rounded-2xl overflow-hidden bg-neutral-100 shadow-inner aspect-4/3">
                    <OptimizedImage
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute top-4 left-4 bg-neutral-900/85 backdrop-blur-xs text-white text-xs font-mono uppercase px-3 py-1 rounded z-10">
                      {service.category}
                    </div>
                  </div>
                </div>

                {/* Details Column (7 cols) */}
                <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-[#F95700] font-bold">
                      Service 0{index + 1}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                    {service.fullDesc}
                  </p>

                  {/* Capabilities List */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2 font-mono">
                      Capabilities & Methods
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                      {service.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-center gap-2 bg-neutral-50 p-2 rounded-lg border border-neutral-150">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F95700]" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2 font-mono">
                      Key Client Benefits
                    </h4>
                    <div className="space-y-1.5">
                      {service.benefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-neutral-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => openQuoteModal(service.title)}
                      className="px-5 py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span>Request a Quote for This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={COMPANY_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom Consultation Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-100 rounded-2xl p-8 border border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-neutral-900">
              Need a custom apparel package or specialized PPE combination?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
              We frequently produce custom bundles combining reflective cargo overalls, branded polos, safety helmets, and reflector vests for corporate tenders and project teams.
            </p>
          </div>
          <button
            onClick={() => openQuoteModal('Custom Multi-Service Package')}
            className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-neutral-900 hover:bg-[#F95700] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Custom Bundle Quote
          </button>
        </div>
      </section>
    </div>
  );
};
