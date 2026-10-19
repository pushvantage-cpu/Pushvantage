import React from 'react';
import { useRouter } from '../context/RouterContext';
import { HOW_IT_WORKS_STEPS, COMPANY_INFO } from '../data/companyData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArrowRight, MessageSquare, CheckCircle, FileText, Sparkles, Truck, Check } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { openQuoteModal } = useRouter();

  return (
    <div className="pb-16 space-y-12">
      <Breadcrumbs items={[{ label: 'How It Works' }]} />

      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden border border-neutral-800">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="text-xs font-mono uppercase tracking-widest text-[#F95700] font-semibold">
              Client Journey · Push Vantage Ltd
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              From Concept to Delivery: How It Works
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              A transparent, dependable six-step workflow designed to ensure your corporate uniforms, reflective safety gear, and printed merchandise meet your exact specifications.
            </p>
          </div>
        </div>
      </section>

      {/* Six Step Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded">
            Proposed Workflow · Subject to order requirements
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-3">
            Our 6-Step Order & Production Process
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold font-mono text-[#F95700]">
                    {step.step}
                  </span>
                  <span className="text-xs font-mono font-semibold text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded">
                    {step.actionText}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-medium">Step {idx + 1} of 6</span>
                <button
                  onClick={() => openQuoteModal(step.title)}
                  className="text-[#F95700] hover:text-[#E04D00] font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Start Step {idx + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artwork & Specifications Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-50 rounded-3xl border border-neutral-200 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-[#F95700] font-bold">
                Artwork & Order Guidelines
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                What to Prepare for the Fastest Turnaround
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Having your brand assets and sizing breakdown ready allows us to generate a final quotation and production proof swiftly.
              </p>

              <div className="pt-2 space-y-2.5 text-xs text-neutral-700">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Vector Logo Files:</strong> PDF, Adobe Illustrator (.ai), or EPS format preserve crisp lines at any print or embroidery scale.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>High-Resolution Raster:</strong> 300 DPI PNG or JPEG files for digital and DTF transfers.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Sizing & Quantities:</strong> A breakdown of quantities per size (e.g. Small to 4XL for cargo overalls).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Colourways:</strong> Specific pantone numbers or preferred corporate colour match.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-5">
              <h4 className="text-base font-bold text-neutral-900">
                Ready to initiate your order with Push Vantage Ltd?
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                You can submit your requirements online or connect with our Nairobi team directly on WhatsApp for real-time consultation.
              </p>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => openQuoteModal('New Project Workflow')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  <span>Start Step 1: Request a Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Send Requirements on WhatsApp ({COMPANY_INFO.phoneDisplay})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
