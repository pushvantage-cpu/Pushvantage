import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS_CATALOGUE, COMPANY_INFO, createWhatsAppEnquiryUrl } from '../data/companyData';
import { ProductItem } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Upload, RotateCw, ZoomIn, ZoomOut, ArrowRight, ShoppingBag, Check, MessageSquare, Trash2, Eye } from 'lucide-react';

export const DesignStudioPage: React.FC = () => {
  const { selectedProductId, addToCart, navigateTo, openQuoteModal } = useRouter();

  // Find preselected product or default to first
  const initialProduct = PRODUCTS_CATALOGUE.find((p) => p.id === selectedProductId) || PRODUCTS_CATALOGUE[0];

  const [currentProduct, setCurrentProduct] = useState<ProductItem>(initialProduct);
  const [selectedColor, setSelectedColor] = useState(initialProduct.availableColors[0]);
  const [selectedSize, setSelectedSize] = useState(initialProduct.sizes[0]);
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [logoPosition, setLogoPosition] = useState<'left-chest' | 'center' | 'back'>('left-chest');
  const [logoScale, setLogoScale] = useState(100);
  const [logoRotation, setLogoRotation] = useState(0);
  const [customArtworkUrl, setCustomArtworkUrl] = useState<string | null>(null);
  const [customArtworkName, setCustomArtworkName] = useState<string | null>(null);
  const [brandingMethod, setBrandingMethod] = useState(initialProduct.brandingMethods[0]);
  const [quantity, setQuantity] = useState(25);
  const [addedAlert, setAddedAlert] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Sync if selectedProductId changes externally
  useEffect(() => {
    if (selectedProductId) {
      const found = PRODUCTS_CATALOGUE.find((p) => p.id === selectedProductId);
      if (found) {
        setCurrentProduct(found);
        setSelectedColor(found.availableColors[0]);
        setSelectedSize(found.sizes[0]);
        setBrandingMethod(found.brandingMethods[0]);
      }
    }
  }, [selectedProductId]);

  const handleProductSelect = (product: ProductItem) => {
    setCurrentProduct(product);
    setSelectedColor(product.availableColors[0]);
    setSelectedSize(product.sizes[0]);
    setBrandingMethod(product.brandingMethods[0]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setFileError('Please upload a valid image file (PNG, JPG, SVG, WebP)');
      return;
    }

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setFileError('File size exceeds 8MB limit. Please provide a smaller image.');
      return;
    }

    setCustomArtworkName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCustomArtworkUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClearArtwork = () => {
    setCustomArtworkUrl(null);
    setCustomArtworkName(null);
    setFileError(null);
  };

  const handleAddToCart = () => {
    addToCart({
      productId: currentProduct.id,
      productName: currentProduct.name,
      categoryLabel: currentProduct.categoryLabel,
      image: currentProduct.image,
      color: selectedColor.name,
      size: selectedSize,
      quantity,
      brandingMethod,
      viewSide,
      placement: logoPosition,
      artworkName: customArtworkName || 'Default Push Vantage Brand Crest',
      artworkDataUrl: customArtworkUrl || undefined,
      unitPrice: currentProduct.basePrice,
      notes: `Studio Customization: ${viewSide.toUpperCase()} view, ${logoPosition} placement, scale ${logoScale}%, ${quantity} units`,
    });

    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 3000);
  };

  const customSummary = `${currentProduct.name} (${selectedColor.name}, Size: ${selectedSize}) with ${brandingMethod} at ${logoPosition} on ${viewSide.toUpperCase()} side. Qty: ${quantity}`;
  const whatsAppUrl = createWhatsAppEnquiryUrl(currentProduct.name, customSummary);

  return (
    <div className="pb-16 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Shop', page: 'shop' },
          { label: 'Interactive Design Studio' },
        ]}
      />

      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-10 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#F95700] font-bold">
              Push Vantage Interactive Design Studio
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              See It Before We Sew & Print It
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-normal">
              Upload your company logo, choose your garment or merchandise, preview front and back positioning, and submit your design directly for quotation or cart checkout.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openQuoteModal(customSummary)}
              className="px-4 py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-lg transition-colors cursor-pointer"
            >
              Request Quote for Design
            </button>
          </div>
        </div>
      </section>

      {/* Studio Workspace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas Column: Visual Mockup (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  {currentProduct.name}
                </span>
                <span className="text-xs text-neutral-400">·</span>
                <span className="text-xs text-neutral-500 font-medium">
                  {selectedColor.name}
                </span>
              </div>

              {/* View Switcher: Front vs Back */}
              <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => {
                    setViewSide('front');
                    if (logoPosition === 'back') setLogoPosition('left-chest');
                  }}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    viewSide === 'front'
                      ? 'bg-white text-neutral-900 shadow-2xs font-bold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Front View
                </button>
                <button
                  onClick={() => {
                    setViewSide('back');
                    setLogoPosition('back');
                  }}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    viewSide === 'back'
                      ? 'bg-white text-neutral-900 shadow-2xs font-bold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Back View
                </button>
              </div>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 flex items-center justify-center select-none">
              {/* Garment Image */}
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-full object-cover transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Tint Overlay for selected color */}
              <div
                className="absolute inset-0 mix-blend-multiply opacity-25 pointer-events-none transition-colors duration-300"
                style={{ backgroundColor: selectedColor.hex }}
              />

              {/* Artwork placement overlay */}
              <div
                className={`absolute transition-all duration-200 ${
                  viewSide === 'back'
                    ? 'top-[25%] left-[34%] w-[32%]'
                    : logoPosition === 'left-chest'
                    ? 'top-[28%] left-[30%] w-[22%]'
                    : logoPosition === 'center'
                    ? 'top-[34%] left-[36%] w-[28%]'
                    : 'top-[25%] left-[34%] w-[32%]'
                }`}
                style={{
                  transform: `scale(${logoScale / 100}) rotate(${logoRotation}deg)`,
                }}
              >
                {customArtworkUrl ? (
                  <div className="p-1.5 rounded bg-black/25 backdrop-blur-[1px] shadow-sm relative group">
                    <img
                      src={customArtworkUrl}
                      alt="Your Custom Logo"
                      className="w-full h-auto object-contain drop-shadow"
                    />
                  </div>
                ) : (
                  /* Default Push Vantage Crest */
                  <div className="p-2.5 rounded bg-black/45 backdrop-blur-xs text-white text-center shadow-lg border border-white/20">
                    <div className="text-[10px] font-extrabold uppercase tracking-tight text-[#F95700]">
                      PUSH VANTAGE
                    </div>
                    <div className="text-[8px] font-bold text-white tracking-widest uppercase">
                      STUDIO LOGO
                    </div>
                    <div className="text-[7px] text-sky-400 font-mono mt-0.5">
                      {brandingMethod}
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Canvas Mode Info */}
              <div className="absolute bottom-3 left-3 bg-neutral-900/80 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedColor.hex }} />
                <span>{viewSide.toUpperCase()} VIEW</span>
                <span className="text-neutral-400">·</span>
                <span className="text-sky-300 capitalize">{logoPosition.replace('-', ' ')}</span>
              </div>
            </div>

            {/* Quick Adjustment Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLogoScale((s) => Math.max(50, s - 10))}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 rounded font-medium"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                  <span>Smaller</span>
                </button>
                <span className="font-mono tabular-nums text-neutral-800 font-semibold">{logoScale}%</span>
                <button
                  onClick={() => setLogoScale((s) => Math.min(150, s + 10))}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 rounded font-medium"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Larger</span>
                </button>
                <button
                  onClick={() => setLogoRotation((r) => (r + 45) % 360)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 rounded font-medium ml-2"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Rotate</span>
                </button>
              </div>

              {customArtworkUrl && (
                <button
                  onClick={handleClearArtwork}
                  className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Artwork</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Configuration Controls (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Design Options & Specifications
            </h3>

            {/* 1. Product Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                1. Selected Garment / Item
              </label>
              <select
                value={currentProduct.id}
                onChange={(e) => {
                  const found = PRODUCTS_CATALOGUE.find((p) => p.id === e.target.value);
                  if (found) handleProductSelect(found);
                }}
                className="w-full p-2.5 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F95700] font-medium"
              >
                {PRODUCTS_CATALOGUE.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name} ({prod.categoryLabel})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Colourway */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                2. Colourway: <span className="text-neutral-900 font-semibold">{selectedColor.name}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {currentProduct.availableColors.map((col) => {
                  const isSelected = col.name === selectedColor.name;
                  return (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-2xs'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-800'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Upload Logo / Artwork */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                3. Upload Your Artwork or Logo
              </label>
              <div className="border border-dashed border-neutral-300 rounded-xl p-3 bg-neutral-50">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#F95700]" />
                    <span className="text-xs text-neutral-700 font-medium">
                      {customArtworkName ? `Uploaded: ${customArtworkName}` : 'Upload PNG, JPG, or SVG'}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded text-xs font-bold text-neutral-800 shadow-2xs">
                    Browse
                  </span>
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.svg,.webp"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
              {fileError && <p className="text-xs text-red-500 font-medium">{fileError}</p>}
            </div>

            {/* 4. Placement Position & Branding Method */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Artwork Position
                </label>
                <select
                  value={logoPosition}
                  onChange={(e) => setLogoPosition(e.target.value as any)}
                  className="w-full p-2 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                >
                  <option value="left-chest">Left Chest Crest</option>
                  <option value="center">Center Front</option>
                  <option value="back">Upper Back Banner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Branding Method
                </label>
                <select
                  value={brandingMethod}
                  onChange={(e) => setBrandingMethod(e.target.value)}
                  className="w-full p-2 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                >
                  {currentProduct.brandingMethods.map((m, i) => (
                    <option key={i} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 5. Size and Quantity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Target Size
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-2 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                >
                  {currentProduct.sizes.map((s, i) => (
                    <option key={i} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2 text-xs font-bold border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700] tabular-nums"
                />
              </div>
            </div>

            {/* Added Notice */}
            {addedAlert && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Customization saved to Cart!</span>
                </span>
                <button
                  onClick={() => navigateTo('cart')}
                  className="underline hover:text-emerald-950 font-bold"
                >
                  View Cart →
                </button>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-neutral-100 space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Save Design & Add to Cart</span>
              </button>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Send Mockup to WhatsApp ({COMPANY_INFO.phoneDisplay})</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
