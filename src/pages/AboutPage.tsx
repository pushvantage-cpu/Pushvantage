import React from 'react';
import { useRouter } from '../context/RouterContext';
import { COMPANY_INFO } from '../data/companyData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Shield, Sparkles, Target, Eye, Users, Scissors, Printer, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo, openQuoteModal } = useRouter();

  return (
    <div className="pb-16 space-y-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden border border-neutral-800">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="text-xs font-mono uppercase tracking-widest text-[#F95700] font-semibold">
              About Push Vantage Ltd · Nairobi, Kenya
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Sew It. Brand It. Print It.
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              Push Vantage Ltd is a dedicated apparel manufacturing, personal protective equipment (PPE), industrial workwear, corporate gifting, and garment printing company based in Nairobi, Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Business Overview & Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-mono uppercase tracking-wider text-[#F95700] font-semibold">
              Business Overview
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Crafting Workwear & Brand Identities That Stand Up to Real-World Demands
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
              <p>
                From industrial construction sites and logistics warehouses to corporate boardrooms and promotional campaigns, what your team wears communicates your standards. Push Vantage Ltd was established to bring exceptional craftsmanship, rugged durability, and crisp branding under one roof.
              </p>
              <p>
                We specialize in manufacturing signature reflective cargo overalls in versatile colourways, high-visibility safety clothing, corporate polo shirts, staff uniforms, and custom gifts. Our integrated production facility combines heavy-duty garment tailoring with precision screen printing, computerized embroidery, and direct-to-film (DTF) technologies.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-neutral-800">
              <div className="flex items-center gap-2 bg-neutral-100 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Nairobi-Based Production Studio</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-100 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Heavy-Duty Industrial Twill</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-100 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Kenya-Wide Courier Dispatch</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-md">
              <img
                src="/src/assets/images/service_apparel_manufacturing_1792390995327.jpg"
                alt="Apparel manufacturing production floor at Push Vantage Ltd"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white border-t border-neutral-200">
                <div className="text-xs font-bold text-neutral-900">Garment Production & Tailoring</div>
                <div className="text-xs text-neutral-500">Precision industrial sewing and cutting lines</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Statements (Proposed copy clearly presented) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-xs relative">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Proposed Company Statement
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F95700] flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">Our Mission</h3>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              "To deliver reliable, high-quality customized apparel, certified industrial safety workwear, and vibrant promotional branding that protects workers on the job and empowers Kenyan organizations to project a distinctive, professional identity."
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-xs relative">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Proposed Company Statement
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">Our Vision</h3>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              "To be East Africa’s most trusted partner for customized apparel production, reflective workwear, and corporate branding—renowned for precision tailoring, durable materials, and uncompromising customer satisfaction."
            </p>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F95700] font-semibold">
            Our Core Principles
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-900 mt-1">
            Values That Guide Every Stitch and Print
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-[#F95700]/10 text-[#F95700] flex items-center justify-center font-bold">
              01
            </div>
            <h4 className="font-bold text-neutral-900 text-base">Uncompromising Quality</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We never cut corners on thread strength, zipper durability, or wash-fast inks. Every piece is constructed to withstand demanding environments.
            </p>
          </div>

          <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold">
              02
            </div>
            <h4 className="font-bold text-neutral-900 text-base">Tailored Customization</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Your organization is unique. We provide flexible sizing, multi-pocket configurations, pantone color matching, and bespoke branding techniques.
            </p>
          </div>

          <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              03
            </div>
            <h4 className="font-bold text-neutral-900 text-base">Reliability & Honesty</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We provide transparent lead times, accurate quotations, and dependable delivery timelines across Nairobi and nationwide.
            </p>
          </div>

          <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold">
              04
            </div>
            <h4 className="font-bold text-neutral-900 text-base">Client Partnership</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We collaborate closely from early sample mockups to bulk production, ensuring your branding vision is realized flawlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Production & Branding Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 border border-neutral-800">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-mono uppercase tracking-widest text-[#F95700] font-semibold">
              Inside Our Facility
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-1">
              The Production & Branding Workflow
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              How raw fabrics and certified safety gear become branded uniforms and protective overalls ready for your team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#F95700] text-xs font-mono font-bold">
                <Scissors className="w-4 h-4" />
                <span>PHASE 1</span>
              </div>
              <h4 className="text-base font-bold text-white">Fabric Selection & Precision Patterning</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                We select durable poly-cotton twill, breathable pique cotton, or technical fabrics, cutting them to graded sizing patterns that maximize mobility and comfort.
              </p>
            </div>

            <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-mono font-bold">
                <Printer className="w-4 h-4" />
                <span>PHASE 2</span>
              </div>
              <h4 className="text-base font-bold text-white">Branding Application & Printing</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Logos and safety stripes are applied using calibrated screen printing carousels, thermal curing heat presses, or high-stitch-count embroidery machines.
              </p>
            </div>

            <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                <Shield className="w-4 h-4" />
                <span>PHASE 3</span>
              </div>
              <h4 className="text-base font-bold text-white">Quality Inspection & Packaging</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Every completed garment undergoes seam stress testing, print adhesion inspection, and size verification before neatly packaged dispatch to your location.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400">
              Need a customized uniform or workwear proposal for your organization?
            </div>
            <button
              onClick={() => openQuoteModal()}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-lg transition-colors cursor-pointer"
            >
              Request a Consultation & Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
