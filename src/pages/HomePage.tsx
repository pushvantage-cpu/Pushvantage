import React from 'react';
import { useRouter } from '../context/RouterContext';
import { COMPANY_INFO, PRODUCTS_CATALOGUE } from '../data/companyData';
import { ArrowRight, Palette, ShoppingBag, Shield, Clock, Truck, MessageSquare } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, openStudioWithProduct } = useRouter();

  // Take the 6 key catalogue products for the clean grid
  const featured = PRODUCTS_CATALOGUE.slice(0, 6);

  return (
    <div className="pb-24 pt-4 space-y-16">
      {/* 1. HERO SECTION — Warm, human, soft writings, clean aesthetic */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20">
        {/* Soft atmospheric gradient glow */}
        <div className="pointer-events-none absolute -left-20 top-10 w-96 h-96 rounded-full bg-orange-100/60 blur-3xl opacity-60" />
        <div className="pointer-events-none absolute -right-20 top-32 w-96 h-96 rounded-full bg-sky-100/50 blur-3xl opacity-50" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Soft Editorial Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/70 px-3.5 py-1 text-xs font-semibold text-neutral-800 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#F95700]" />
                <span>Nairobi print, workwear & apparel studio</span>
              </div>

              <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#111827] tracking-tight leading-[1.05]">
                You think it,{' '}
                <em className="font-serif italic text-[#F95700] whitespace-nowrap font-bold">
                  we sew & brand it.
                </em>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-xl">
                Design custom reflective cargo overalls, company polos, heavyweight hoodies, PPE gear, and gifts in your browser — see your logo on a live mockup, and get it delivered across Kenya.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('studio')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl shadow-md transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  <Palette className="w-4 h-4" />
                  <span>Start Designing in Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('shop')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-50 border border-[#E8E2D8] rounded-xl shadow-2xs transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-neutral-600" />
                  <span>Browse Shop</span>
                </button>
              </div>

              <p className="text-xs text-neutral-500 pt-1">
                Reflective overalls · Custom staff uniforms · Corporate gifts · Delivered prompt in Kenya
              </p>
            </div>

            {/* Right Column: Clean Floating Mockups (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto aspect-square w-full max-w-md">
                {/* Overall card */}
                <div
                  onClick={() => openStudioWithProduct('reflective-cargo-overall')}
                  className="absolute left-[3%] top-0 w-[48%] -rotate-6 aspect-square overflow-hidden rounded-2xl bg-white shadow-md border border-[#E8E2D8] p-3 transition-transform hover:scale-105 hover:rotate-0 cursor-pointer"
                >
                  <img
                    src="/src/assets/images/product_reflective_overalls_1792390996791.jpg"
                    alt="Reflective Cargo Overalls"
                    className="w-full h-full object-contain"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded bg-white/95 px-2 py-0.5 text-[9px] font-bold text-neutral-800 border border-neutral-200">
                    Overalls
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 rounded bg-neutral-900 px-2 py-0.5 font-editorial text-[11px] font-bold italic text-white">
                    Quote
                  </span>
                </div>

                {/* Hoodie card */}
                <div
                  onClick={() => openStudioWithProduct('heavyweight-corporate-hoodie')}
                  className="absolute right-0 top-[12%] w-[50%] rotate-3 aspect-square overflow-hidden rounded-2xl bg-white shadow-md border border-[#E8E2D8] p-3 transition-transform hover:scale-105 hover:rotate-0 cursor-pointer"
                >
                  <img
                    src="/src/assets/images/shop_hoodies_sweatshirts_1792391772659.jpg"
                    alt="Corporate Hoodie"
                    className="w-full h-full object-contain"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded bg-white/95 px-2 py-0.5 text-[9px] font-bold text-neutral-800 border border-neutral-200">
                    Hoodie
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 rounded bg-neutral-900 px-2 py-0.5 font-editorial text-[11px] font-bold italic text-white">
                    Custom
                  </span>
                </div>

                {/* Mug card */}
                <div
                  onClick={() => openStudioWithProduct('ceramic-mugs-drinkware')}
                  className="absolute bottom-2 left-[14%] w-[44%] -rotate-3 aspect-square overflow-hidden rounded-2xl bg-white shadow-md border border-[#E8E2D8] p-3 transition-transform hover:scale-105 hover:rotate-0 cursor-pointer"
                >
                  <img
                    src="/src/assets/images/shop_branded_mugs_drinkware_1792391771954.jpg"
                    alt="Drinkware"
                    className="w-full h-full object-contain"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded bg-white/95 px-2 py-0.5 text-[9px] font-bold text-neutral-800 border border-neutral-200">
                    Drinkware
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 rounded bg-neutral-900 px-2 py-0.5 font-editorial text-[11px] font-bold italic text-white">
                    Branded
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE DESIGN STUDIO STEPS — Simple 4-Step Process */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-t border-[#E8E2D8] pt-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase text-[#F95700] mb-2">
            <span className="w-5 h-[1.5px] bg-[#F95700]" />
            <span>THE DESIGN STUDIO</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#111827]">
            See it before we sew & print it
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-xl">
            Our browser studio renders your logo directly on the real garment — what you see on screen is exactly how we tailor, print, and embroider.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative rounded-2xl border border-[#E8E2D8] bg-white p-6 shadow-2xs">
              <span className="absolute right-4 top-4 font-editorial text-2xl italic text-neutral-300">1</span>
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#F95700] flex items-center justify-center font-bold text-base">
                👕
              </div>
              <h3 className="mt-4 font-bold text-neutral-900 text-sm">Pick your product</h3>
              <p className="mt-1 text-xs text-neutral-500">Overalls, polos, hoodies, PPE gear & drinkware</p>
            </div>

            <div className="relative rounded-2xl border border-[#E8E2D8] bg-white p-6 shadow-2xs">
              <span className="absolute right-4 top-4 font-editorial text-2xl italic text-neutral-300">2</span>
              <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-base">
                📤
              </div>
              <h3 className="mt-4 font-bold text-neutral-900 text-sm">Upload artwork</h3>
              <p className="mt-1 text-xs text-neutral-500">PNG, JPG or SVG — we check sharpness & scale</p>
            </div>

            <div className="relative rounded-2xl border border-[#E8E2D8] bg-white p-6 shadow-2xs">
              <span className="absolute right-4 top-4 font-editorial text-2xl italic text-neutral-300">3</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-base">
                🎨
              </div>
              <h3 className="mt-4 font-bold text-neutral-900 text-sm">Position & preview</h3>
              <p className="mt-1 text-xs text-neutral-500">Scale, rotate, and switch front/back views</p>
            </div>

            <div className="relative rounded-2xl border border-[#E8E2D8] bg-white p-6 shadow-2xs">
              <span className="absolute right-4 top-4 font-editorial text-2xl italic text-neutral-300">4</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base">
                🚚
              </div>
              <h3 className="mt-4 font-bold text-neutral-900 text-sm">Order & relax</h3>
              <p className="mt-1 text-xs text-neutral-500">Fast Kenyan dispatch with zero hidden fees</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigateTo('studio')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              <span>Open the Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. STRAIGHT-UP CATALOGUE CARDS — Exact styling matching the reference */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-t border-[#E8E2D8] pt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase text-[#F95700] mb-2">
                <span className="w-5 h-[1.5px] bg-[#F95700]" />
                <span>POPULAR GEAR & MERCHANDISE</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#111827]">
                Featured in Nairobi
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs font-bold text-[#F95700] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All Products in Shop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <div
                key={product.id}
                onClick={() => openStudioWithProduct(product.id)}
                className="group bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
                <div className="aspect-square bg-white relative p-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 border border-[#E8E2D8] text-neutral-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow-2xs">
                    {product.categoryLabel}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-[#E8E2D8] px-4 py-3 bg-white">
                  <span className="font-sans text-sm font-bold text-[#111827] group-hover:text-[#F95700] transition-colors truncate pr-2">
                    {product.name}
                  </span>
                  <span className="font-editorial text-sm font-bold italic text-[#F95700] shrink-0 whitespace-nowrap">
                    {product.basePrice ? `KSh ${product.basePrice.toLocaleString()}` : 'Request Quote'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SOFT CALL TO ACTION BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-[#E8E2D8] bg-white p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-editorial text-2xl sm:text-3xl font-extrabold text-[#111827]">
              Need a custom quote or physical fabric sample?
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We work with corporate brands, schools, construction contractors, and creative teams across Nairobi and nationwide.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Talk to Us on WhatsApp</span>
            </a>
            <button
              onClick={() => navigateTo('contact')}
              className="px-5 py-3 text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
            >
              Contact Office
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
