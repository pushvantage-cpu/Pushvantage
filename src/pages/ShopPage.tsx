import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS_CATALOGUE } from '../data/companyData';
import { ProductCategory, ProductItem } from '../types';
import { Search, X, Palette, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';

interface CategoryFilter {
  id: 'all' | ProductCategory;
  label: string;
}

const CATEGORIES: CategoryFilter[] = [
  { id: 'all', label: 'All Products' },
  { id: 't-shirts-apparel', label: 'T-Shirts & Apparel' },
  { id: 'hoodies-sweatshirts', label: 'Hoodies & Sweatshirts' },
  { id: 'reflective-overalls', label: 'Reflective Overalls' },
  { id: 'uniforms-workwear', label: 'Uniforms & Workwear' },
  { id: 'ppe-safety', label: 'PPE & Safety' },
  { id: 'mugs-drinkware', label: 'Mugs & Drinkware' },
  { id: 'corporate-gifts', label: 'Corporate Gifts' },
  { id: 'promotional-merchandise', label: 'Promotional Merchandise' },
];

export const ShopPage: React.FC = () => {
  const { openStudioWithProduct, openProductDetails } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOGUE.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pb-24 pt-6 space-y-12">
      {/* Editorial Header Section — Exact layout from reference with soft writings */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        <div className="max-w-2xl space-y-3">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase text-[#F95700]">
            <span className="w-5 h-[1.5px] bg-[#F95700]" />
            <span>SHOP</span>
          </div>

          {/* Main Editorial Headline with Soft Writings */}
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.1]">
            Pick a product, <em className="font-serif italic font-bold text-[#F95700]">make it yours</em>
          </h1>

          {/* Soft Subtitle */}
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal pt-1">
            Choose a product to open it in the Design Studio — upload your artwork, position it on a live mockup, and order in minutes.
          </p>
        </div>

        {/* Minimalist Search & Category Filter Pills */}
        <div className="mt-8 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-[#E8E2D8]/70">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-2xs'
                      : 'bg-white/80 hover:bg-white text-neutral-600 border border-[#E8E2D8]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Clean Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-[#E8E2D8] rounded-lg bg-white/90 focus:outline-none focus:ring-1 focus:ring-[#F95700]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Product Cards Grid — Clean white rounded-2xl cards with bottom bar pricing */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        {filteredProducts.length === 0 ? (
          <div className="bg-white/90 rounded-2xl border border-[#E8E2D8] p-12 text-center space-y-3">
            <p className="text-base font-editorial font-bold text-neutral-900">
              No products found matching "{searchQuery}"
            </p>
            <p className="text-xs text-neutral-500">
              Try choosing another category or clearing your search.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-1.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg"
            >
              Reset View
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              // Format soft display price or quote label
              const displayPrice = product.basePrice 
                ? `KSh ${product.basePrice.toLocaleString()}`
                : product.priceNote 
                ? 'Request Quote'
                : 'Request Quote';

              return (
                <div
                  key={product.id}
                  onClick={() => openStudioWithProduct(product.id)}
                  className="group bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
                >
                  {/* Clean Product Visual Container */}
                  <div className="aspect-square bg-white relative p-4 flex items-center justify-center overflow-hidden">
                    <OptimizedImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      containerClassName="w-full h-full"
                    />

                    {/* Subtle Category Pill Tag on Top Left */}
                    <span className="absolute top-3 left-3 bg-white/95 border border-[#E8E2D8] text-neutral-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow-2xs z-10">
                      {product.categoryLabel}
                    </span>

                    {/* Quick Studio Overlay Prompt */}
                    <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 bg-neutral-900/90 text-white text-xs font-semibold rounded-lg shadow-md flex items-center gap-1.5 backdrop-blur-xs">
                        <Palette className="w-3.5 h-3.5 text-[#F95700]" />
                        <span>Open in Studio</span>
                      </span>
                    </div>
                  </div>

                  {/* Bottom Bar — Exact reference design: Bold Name on Left, Italic Serif Price on Right */}
                  <div className="flex items-center justify-between border-t border-[#E8E2D8] px-4 py-3 bg-white">
                    <span className="font-sans text-sm font-bold text-[#111827] group-hover:text-[#F95700] transition-colors truncate pr-2">
                      {product.name}
                    </span>
                    <span className="font-editorial text-sm font-bold italic text-[#F95700] shrink-0 whitespace-nowrap">
                      {displayPrice}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-center text-xs text-neutral-500 font-normal">
          <span>Prices and quotations depend on volume, fabric specification, and branding method. No minimum order on standard digital prints.</span>
        </div>
      </section>
    </div>
  );
};
