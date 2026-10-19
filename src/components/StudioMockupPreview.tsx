import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { COMPANY_INFO, createWhatsAppEnquiryUrl } from '../data/companyData';
import { Upload, ArrowRight, MessageSquare, RotateCw, ZoomIn, ZoomOut, Check } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface MockupProduct {
  id: string;
  name: string;
  category: string;
  colors: { name: string; hex: string; textHex: string }[];
  defaultImage: string;
  type: 'overall' | 'polo' | 'tshirt' | 'flask' | 'hoodie';
}

const STUDIO_PRODUCTS: MockupProduct[] = [
  {
    id: 'reflective-overall',
    name: 'Reflective Cargo Boiler Suit',
    category: 'Industrial Workwear',
    type: 'overall',
    defaultImage: '/images/product_reflective_overalls_1792390996791.jpg',
    colors: [
      { name: 'Navy & Hi-Vis Orange', hex: '#1E293B', textHex: '#FFFFFF' },
      { name: 'Fluorescent Orange', hex: '#F97316', textHex: '#000000' },
      { name: 'Royal Blue', hex: '#1D4ED8', textHex: '#FFFFFF' },
      { name: 'All Navy Blue', hex: '#0F172A', textHex: '#FFFFFF' },
      { name: 'Stealth Black', hex: '#18181B', textHex: '#FFFFFF' },
    ],
  },
  {
    id: 'pique-polo',
    name: 'Executive Pique Polo Shirt',
    category: 'Corporate Apparel',
    type: 'polo',
    defaultImage: '/images/service_apparel_manufacturing_1792390995327.jpg',
    colors: [
      { name: 'Navy Blue', hex: '#1E293B', textHex: '#FFFFFF' },
      { name: 'Vibrant Orange', hex: '#F95700', textHex: '#FFFFFF' },
      { name: 'Crisp White', hex: '#F8FAFC', textHex: '#0F172A' },
      { name: 'Charcoal Black', hex: '#111827', textHex: '#FFFFFF' },
      { name: 'Royal Blue', hex: '#2563EB', textHex: '#FFFFFF' },
    ],
  },
  {
    id: 'heavyweight-tee',
    name: 'Heavyweight Custom T-Shirt',
    category: 'Screen Printed Apparel',
    type: 'tshirt',
    defaultImage: '/images/service_screen_printing_1792390996118.jpg',
    colors: [
      { name: 'Solid Black', hex: '#09090B', textHex: '#FFFFFF' },
      { name: 'Studio Orange', hex: '#EA580C', textHex: '#FFFFFF' },
      { name: 'Heather Grey', hex: '#94A3B8', textHex: '#0F172A' },
      { name: 'Pure White', hex: '#FFFFFF', textHex: '#0F172A' },
      { name: 'Forest Green', hex: '#15803D', textHex: '#FFFFFF' },
    ],
  },
  {
    id: 'corporate-flask',
    name: 'Executive Insulated Flask',
    category: 'Corporate Gifts',
    type: 'flask',
    defaultImage: '/images/product_corporate_merchandise_1792390996524.jpg',
    colors: [
      { name: 'Matte Black', hex: '#171717', textHex: '#FFFFFF' },
      { name: 'Navy Blue', hex: '#1E3A8A', textHex: '#FFFFFF' },
      { name: 'Brushed Silver', hex: '#CBD5E1', textHex: '#0F172A' },
    ],
  },
];

export const StudioMockupPreview: React.FC = () => {
  const { openQuoteModal } = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<MockupProduct>(STUDIO_PRODUCTS[0]);
  const [selectedColor, setSelectedColor] = useState(STUDIO_PRODUCTS[0].colors[0]);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState<'left-chest' | 'center' | 'back'>('left-chest');
  const [logoScale, setLogoScale] = useState<number>(100);
  const [logoRotation, setLogoRotation] = useState<number>(0);
  const [printMethod, setPrintMethod] = useState<'Embroidery' | 'Screen Print' | 'DTF Transfer' | 'Laser Engraving'>('Screen Print');

  const handleProductChange = (prod: MockupProduct) => {
    setSelectedProduct(prod);
    setSelectedColor(prod.colors[0]);
    if (prod.type === 'flask') {
      setPrintMethod('Laser Engraving');
    } else if (prod.type === 'polo') {
      setPrintMethod('Embroidery');
    } else {
      setPrintMethod('Screen Print');
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomLogoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const currentSummary = `${selectedProduct.name} in ${selectedColor.name} with ${printMethod} at ${logoPosition} position`;
  const whatsAppUrl = createWhatsAppEnquiryUrl(selectedProduct.name, currentSummary);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-md overflow-hidden">
      {/* Studio Header */}
      <div className="p-6 sm:p-8 border-b border-neutral-200 bg-neutral-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F95700] font-semibold mb-1">
            <span>Push Vantage Interactive Studio</span>
            <span aria-hidden="true">·</span>
            <span>Live Visualizer</span>
          </div>
          <h3 className="text-2xl font-extrabold tracking-tight">
            See your branding before we sew & print
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1">
            Test placement, select fabric colourways, preview embroidery or screen printing, and request an accurate quotation.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={() => openQuoteModal(selectedProduct.name)}
            className="px-4 py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-lg transition-colors cursor-pointer"
          >
            Quote This Setup
          </button>
        </div>
      </div>

      {/* Main Studio Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Left Column: Visual Mockup Canvas (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-neutral-100 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-neutral-200">
          {/* Garment / Product Display Frame */}
          <div className="relative w-full max-w-md aspect-4/3 rounded-xl overflow-hidden bg-white shadow-sm border border-neutral-200 flex items-center justify-center">
            {/* Base Product Real Photo */}
            <OptimizedImage
              src={selectedProduct.defaultImage}
              alt={selectedProduct.name}
              priority={true}
              className="w-full h-full object-cover transition-opacity duration-300"
              containerClassName="w-full h-full"
            />

            {/* Tint Overlay corresponding to selected color swatch */}
            <div
              className="absolute inset-0 mix-blend-multiply opacity-25 pointer-events-none transition-colors duration-300"
              style={{ backgroundColor: selectedColor.hex }}
            />

            {/* Logo Placement Container */}
            <div
              className={`absolute transition-all duration-200 pointer-events-none ${
                logoPosition === 'left-chest'
                  ? 'top-[28%] left-[32%] w-[22%]'
                  : logoPosition === 'center'
                  ? 'top-[35%] left-[38%] w-[26%]'
                  : 'top-[30%] left-[35%] w-[32%]'
              }`}
              style={{
                transform: `scale(${logoScale / 100}) rotate(${logoRotation}deg)`,
              }}
            >
              {customLogoUrl ? (
                <div className="p-1 rounded bg-black/20 backdrop-blur-[1px] shadow-sm">
                  <img
                    src={customLogoUrl}
                    alt="Custom Logo Preview"
                    className="w-full h-auto object-contain drop-shadow"
                  />
                </div>
              ) : (
                /* Default Push Vantage Sample Crest */
                <div className="p-2 rounded bg-black/40 backdrop-blur-xs text-white text-center shadow-lg border border-white/20">
                  <div className="text-[10px] font-extrabold uppercase tracking-tight text-[#F95700]">
                    YOUR LOGO
                  </div>
                  <div className="text-[8px] font-bold text-white tracking-widest uppercase">
                    HERE
                  </div>
                  <div className="text-[6px] text-neutral-300 font-mono mt-0.5">
                    {printMethod}
                  </div>
                </div>
              )}
            </div>

            {/* Canvas Badge */}
            <div className="absolute bottom-3 left-3 bg-neutral-900/85 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedColor.hex }} />
              <span className="font-semibold">{selectedProduct.name}</span>
              <span className="text-neutral-400">({selectedColor.name})</span>
            </div>
          </div>

          {/* Quick Mockup Controls Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-600">
            <button
              onClick={() => setLogoScale((s) => Math.max(60, s - 10))}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-neutral-300 rounded hover:bg-neutral-50 transition-colors"
              title="Scale down"
            >
              <ZoomOut className="w-3.5 h-3.5" />
              <span>Smaller</span>
            </button>
            <span className="tabular-nums font-mono text-neutral-500">{logoScale}%</span>
            <button
              onClick={() => setLogoScale((s) => Math.min(160, s + 10))}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-neutral-300 rounded hover:bg-neutral-50 transition-colors"
              title="Scale up"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Larger</span>
            </button>
            <button
              onClick={() => setLogoRotation((r) => (r + 45) % 360)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-neutral-300 rounded hover:bg-neutral-50 transition-colors"
              title="Rotate logo"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Rotate</span>
            </button>
          </div>
        </div>

        {/* Right Column: Customization Controls (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* 1. Pick Product */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                1. Select Garment or Gear
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STUDIO_PRODUCTS.map((prod) => {
                  const isCurrent = prod.id === selectedProduct.id;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => handleProductChange(prod)}
                      className={`p-2.5 rounded-lg border text-left text-xs font-semibold transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-[#F95700] bg-orange-50/50 text-[#F95700] shadow-2xs'
                          : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
                      }`}
                    >
                      <div className="font-bold">{prod.name}</div>
                      <div className="text-[10px] text-neutral-500 font-normal">{prod.category}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Pick Colorway */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                2. Choose Fabric / Swatch Colour
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.colors.map((color) => {
                  const isSelected = color.name === selectedColor.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-2xs'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-800'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                      {isSelected && <Check className="w-3 h-3 text-[#F95700]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Upload Artwork / Logo */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                3. Your Artwork or Company Logo
              </label>
              <div className="border border-dashed border-neutral-300 rounded-xl p-3 bg-neutral-50">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#F95700]" />
                    <span className="text-xs text-neutral-700 font-medium">
                      {customLogoUrl ? 'Logo Uploaded (Click to change)' : 'Upload your logo file (PNG, JPG, SVG)'}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded text-xs font-semibold text-neutral-800 shadow-2xs">
                    Browse
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                </label>
              </div>
            </div>

            {/* 4. Branding Method & Position */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Branding Method
                </label>
                <select
                  value={printMethod}
                  onChange={(e) => setPrintMethod(e.target.value as any)}
                  className="w-full p-2 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                >
                  <option value="Screen Print">Silk Screen Printing</option>
                  <option value="Embroidery">Computerized Embroidery</option>
                  <option value="DTF Transfer">Direct-to-Film (DTF)</option>
                  <option value="Laser Engraving">Laser Engraving</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Placement Area
                </label>
                <select
                  value={logoPosition}
                  onChange={(e) => setLogoPosition(e.target.value as any)}
                  className="w-full p-2 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                >
                  <option value="left-chest">Left Chest Crest</option>
                  <option value="center">Center Torso / Front</option>
                  <option value="back">Upper Back Banner</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Callouts */}
          <div className="pt-4 border-t border-neutral-200 space-y-2.5">
            <button
              onClick={() => openQuoteModal(currentSummary)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <span>Get Quotation for this Setup</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Discuss this Mockup on WhatsApp ({COMPANY_INFO.phoneDisplay})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
