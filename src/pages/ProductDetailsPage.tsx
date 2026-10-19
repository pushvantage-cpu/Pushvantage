import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS_CATALOGUE, COMPANY_INFO, createWhatsAppEnquiryUrl } from '../data/companyData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Palette, ShoppingBag, ArrowRight, Check, MessageSquare, Shield, Truck, RotateCcw } from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const { selectedProductId, openStudioWithProduct, openQuoteModal, addToCart, navigateTo } = useRouter();

  // Find product or fallback to the first featured product
  const product = PRODUCTS_CATALOGUE.find((p) => p.id === selectedProductId) || PRODUCTS_CATALOGUE[0];

  const [selectedColor, setSelectedColor] = useState(product.availableColors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedBranding, setSelectedBranding] = useState(product.brandingMethods[0]);
  const [quantity, setQuantity] = useState(25);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: product.name,
      categoryLabel: product.categoryLabel,
      image: product.image,
      color: selectedColor.name,
      size: selectedSize,
      quantity,
      brandingMethod: selectedBranding,
      viewSide: 'front',
      placement: 'Left Chest Crest',
      unitPrice: product.basePrice,
      notes: `Standard order from product details: ${quantity} units`,
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const currentSummary = `${product.name} | ${quantity} pcs | Color: ${selectedColor.name} | Size: ${selectedSize} | Branding: ${selectedBranding}`;
  const whatsAppUrl = createWhatsAppEnquiryUrl(product.name, currentSummary);

  return (
    <div className="pb-16 space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Shop', page: 'shop' },
          { label: product.name },
        ]}
      />

      {/* Main Product Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Product Imagery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-neutral-900/85 backdrop-blur-xs text-white text-xs font-mono uppercase px-3 py-1 rounded">
                {product.categoryLabel}
              </div>

              {/* Tint overlay matching selected color swatch */}
              <div
                className="absolute inset-0 mix-blend-multiply opacity-20 pointer-events-none transition-colors duration-300"
                style={{ backgroundColor: selectedColor.hex }}
              />
            </div>

            {/* Value Trust Strip */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs text-neutral-600 pt-2">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <Shield className="w-4 h-4 text-[#F95700] mx-auto mb-1" />
                <span className="font-semibold text-neutral-900 block">Durable Workwear</span>
                <span>Industrial Twill</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <Palette className="w-4 h-4 text-sky-500 mx-auto mb-1" />
                <span className="font-semibold text-neutral-900 block">Precision Print</span>
                <span>Screen & Embroidery</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <Truck className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                <span className="font-semibold text-neutral-900 block">Kenya Dispatch</span>
                <span>Prompt Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization & Ordering Form (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#F95700] font-bold">
                {product.categoryLabel}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
                {product.name}
              </h1>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing / Quotation Status */}
            <div className="p-4 bg-orange-50/60 border border-orange-200/80 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-500 block">Pricing Structure:</span>
                <span className="text-sm font-bold text-neutral-900">
                  {product.basePrice ? `From KES ${product.basePrice.toLocaleString()} / piece` : 'Tiered Quotation on Request'}
                </span>
              </div>
              <span className="text-xs font-mono text-[#F95700] font-semibold bg-white px-2.5 py-1 rounded shadow-2xs border border-orange-200">
                Volume Discounts Available
              </span>
            </div>

            {/* Color Swatches */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Select Colourway: <span className="text-neutral-900 font-semibold">{selectedColor.name}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.availableColors.map((col) => {
                  const isSelected = col.name === selectedColor.name;
                  return (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-2xs'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-800'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                      {isSelected && <Check className="w-3 h-3 text-[#F95700]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizing Breakdown */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Select Sizing: <span className="text-neutral-900 font-semibold">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const isSelected = s === selectedSize;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer font-mono ${
                        isSelected
                          ? 'border-[#F95700] bg-orange-500 text-white shadow-2xs'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-800'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Branding Method */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Branding Method Preference:
              </label>
              <select
                value={selectedBranding}
                onChange={(e) => setSelectedBranding(e.target.value)}
                className="w-full p-2.5 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F95700]"
              >
                {product.brandingMethods.map((m, i) => (
                  <option key={i} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Estimated Order Quantity:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-28 p-2.5 text-sm font-bold border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700] tabular-nums"
                />
                <span className="text-xs text-neutral-500">
                  (Single or bulk batches welcome)
                </span>
              </div>
            </div>

            {/* Key Features List */}
            <div className="pt-2 border-t border-neutral-100">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Product Specifications
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-600">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Added Notice */}
            {addedNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Added {quantity}x {product.name} to Cart!</span>
                </span>
                <button
                  onClick={() => navigateTo('cart')}
                  className="underline hover:text-emerald-950 font-bold"
                >
                  View Cart →
                </button>
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Customize in Studio */}
                <button
                  onClick={() => openStudioWithProduct(product.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
                >
                  <Palette className="w-4 h-4 text-[#F95700]" />
                  <span>Customize in Design Studio</span>
                </button>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Quotation Cart</span>
                </button>
              </div>

              {/* WhatsApp Direct Enquiry */}
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Discuss on WhatsApp Hotline ({COMPANY_INFO.phoneDisplay})</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
