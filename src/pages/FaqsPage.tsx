import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { FAQS_DATA, COMPANY_INFO } from '../data/companyData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ChevronDown, Search, X, MessageSquare, Phone, HelpCircle } from 'lucide-react';

export const FaqsPage: React.FC = () => {
  const { openQuoteModal } = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'printing', label: 'Printing & Branding' },
    { id: 'apparel', label: 'Apparel & Uniforms' },
    { id: 'ppe', label: 'PPE & Reflective Overalls' },
    { id: 'orders', label: 'Orders & Quotations' },
    { id: 'delivery', label: 'Delivery & Collection' },
  ];

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pb-16 space-y-12">
      <Breadcrumbs items={[{ label: 'FAQs' }]} />

      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden border border-neutral-800">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="text-xs font-mono uppercase tracking-widest text-[#F95700] font-semibold">
              Frequently Asked Questions · Push Vantage Ltd
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Everything You Need to Know
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              Find clear answers about our apparel customization, screen printing methods, reflective safety overalls, quotation turnaround, and delivery throughout Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Category Filters */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., reflective overalls, MOQs, artwork, delivery)..."
            className="w-full pl-10 pr-4 py-3 text-sm border border-neutral-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#F95700] shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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

      {/* Accordion List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center space-y-3">
            <HelpCircle className="w-8 h-8 text-neutral-400 mx-auto" />
            <p className="text-sm font-semibold text-neutral-800">
              No questions found matching "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-xs text-[#F95700] font-bold hover:underline"
            >
              Clear search filter
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm sm:text-base text-neutral-900 leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#F95700]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 mt-1">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Support Callout Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-100 rounded-2xl p-6 sm:p-8 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Have a specific question about your project?
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              Speak directly with our team in Nairobi or send us your artwork for review.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-lg transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp (0725 356 926)</span>
            </a>
            <button
              onClick={() => openQuoteModal()}
              className="px-4 py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-lg transition-colors cursor-pointer"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
