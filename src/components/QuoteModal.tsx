import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { COMPANY_INFO, createWhatsAppEnquiryUrl } from '../data/companyData';
import { QuoteFormData } from '../types';
import { X, CheckCircle, Upload, MessageSquare, Send, Paperclip } from 'lucide-react';

export const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, closeQuoteModal, quoteModalInitialItem, submitQuotation } = useRouter();

  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    serviceOrProduct: quoteModalInitialItem || 'Reflective Cargo Overalls',
    quantity: '25',
    customizationType: 'Screen Printing & Embroidery',
    colorsSizes: 'Navy Blue & Hi-Vis Orange (Assorted Sizes: M, L, XL)',
    projectDescription: '',
    attachmentName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedQuoteId, setSubmittedQuoteId] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  useEffect(() => {
    if (quoteModalInitialItem) {
      setFormData((prev) => ({ ...prev, serviceOrProduct: quoteModalInitialItem }));
    }
  }, [quoteModalInitialItem]);

  if (!isQuoteModalOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.serviceOrProduct.trim()) errs.serviceOrProduct = 'Please select a product or service';
    if (!formData.quantity.trim()) errs.quantity = 'Estimated quantity is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const newQuote = submitQuotation({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      serviceOrProduct: formData.serviceOrProduct,
      quantity: formData.quantity,
      customizationType: formData.customizationType,
      colorsSizes: formData.colorsSizes,
      projectDescription: formData.projectDescription,
      attachmentName: formData.attachmentName,
      attachmentSize: formData.attachmentSize,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedQuoteId(newQuote.id);
      setIsSubmitted(true);
    }, 400);
  };


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setFormData((prev) => ({
        ...prev,
        attachmentName: file.name,
        attachmentSize: `${(file.size / 1024).toFixed(1)} KB`,
      }));
    }
  };

  // Build WhatsApp pre-filled message from the user's specific inputs
  const whatsAppSummary = `Service/Product: ${formData.serviceOrProduct} | Qty: ${formData.quantity} | Branding: ${formData.customizationType} | Specs: ${formData.colorsSizes} | Client: ${formData.name} (${formData.phone})`;
  const dynamicWhatsAppUrl = createWhatsAppEnquiryUrl(formData.serviceOrProduct, whatsAppSummary);

  const resetForm = () => {
    setIsSubmitted(false);
    setUploadedFileName(null);
    closeQuoteModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 text-white border-b border-neutral-800">
          <div>
            <h2 id="quote-modal-title" className="text-lg font-bold">
              Request an Official Quotation
            </h2>
            <p className="text-xs text-neutral-400">
              Push Vantage Ltd · Sew It. Brand It. Print It. · Nairobi, Kenya
            </p>
          </div>
          <button
            onClick={resetForm}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900">
                  Quotation Request Prepared!
                </h3>
                <p className="text-sm text-neutral-600 mt-2 max-w-md mx-auto">
                  Thank you, <strong className="text-neutral-900">{formData.name}</strong>. Your quotation details for <strong className="text-neutral-900">{formData.serviceOrProduct}</strong> ({formData.quantity} units) have been recorded.
                </p>
                {submittedQuoteId && (
                  <div className="inline-block px-3 py-1 bg-neutral-100 border border-neutral-200 rounded-lg text-xs font-mono font-bold text-neutral-800">
                    Quote Reference: <span className="text-[#F95700]">{submittedQuoteId}</span>
                  </div>
                )}
              </div>

              {/* Instant WhatsApp Priority Connect */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-left max-w-lg mx-auto space-y-3">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900">
                      Send Directly to our Nairobi Workshop via WhatsApp
                    </h4>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Get immediate answers, artwork verification, and instant pricing from our team at <strong>0725 356 926</strong>.
                    </p>
                  </div>
                </div>
                <a
                  href={dynamicWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Quotation to WhatsApp (0725 356 926)</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                >
                  Close & Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Your Name / Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Samuel Kariuki / Acme Logistics"
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700] ${
                      errors.name ? 'border-red-500 bg-red-50/50' : 'border-neutral-300'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Phone Number (or WhatsApp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 07XX XXX XXX"
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700] ${
                      errors.phone ? 'border-red-500 bg-red-50/50' : 'border-neutral-300'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. samuel@company.co.ke"
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700] ${
                      errors.email ? 'border-red-500 bg-red-50/50' : 'border-neutral-300'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Estimated Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g. 50 pieces, 100 sets"
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700] tabular-nums ${
                      errors.quantity ? 'border-red-500 bg-red-50/50' : 'border-neutral-300'
                    }`}
                  />
                  {errors.quantity && <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Product / Service */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Service or Product <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.serviceOrProduct}
                    onChange={(e) => setFormData({ ...formData, serviceOrProduct: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700] bg-white"
                  >
                    <option value="Reflective Cargo Overalls">Reflective Cargo Overalls (One-Piece Boiler Suits)</option>
                    <option value="Two-Piece Workwear (Jacket & Cargo Trousers)">Two-Piece Workwear (Jacket & Cargo Trousers)</option>
                    <option value="Personal Protective Equipment (PPE)">Personal Protective Equipment (PPE)</option>
                    <option value="Executive Branded Polo Shirts">Executive Branded Polo Shirts</option>
                    <option value="Custom Heavyweight T-Shirts">Custom Heavyweight T-Shirts</option>
                    <option value="Corporate Staff Uniforms & Office Apparel">Corporate Staff Uniforms & Office Apparel</option>
                    <option value="Custom Printing & Screen Branding">Custom Printing & Screen Branding</option>
                    <option value="Corporate Gifts & Promotional Merchandise">Corporate Gifts & Promotional Merchandise</option>
                    <option value="Other Custom Apparel / Inquiries">Other Custom Apparel / Inquiries</option>
                  </select>
                </div>

                {/* Customization Type */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Branding / Customization Preference
                  </label>
                  <select
                    value={formData.customizationType}
                    onChange={(e) => setFormData({ ...formData, customizationType: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700] bg-white"
                  >
                    <option value="Screen Printing (Single or Multi-Color)">Silk Screen Printing</option>
                    <option value="Computerized Embroidery">Computerized Logo Embroidery</option>
                    <option value="DTF / Full-Color Heat Transfer">DTF / Full-Color Heat Transfer</option>
                    <option value="Screen Printing & Embroidery Combo">Screen Printing & Embroidery Combo</option>
                    <option value="Laser Engraving / Debossing (Gifts)">Laser Engraving / Debossing (Gifts)</option>
                    <option value="Plain / Unbranded (Blank Garments/PPE)">Plain / Unbranded (Blank Garments/PPE)</option>
                  </select>
                </div>
              </div>

              {/* Sizes and Colours */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Sizes, Colours & Fabric Specifications
                </label>
                <input
                  type="text"
                  value={formData.colorsSizes}
                  onChange={(e) => setFormData({ ...formData, colorsSizes: e.target.value })}
                  placeholder="e.g. Navy Blue with Orange Panels; S (10), M (20), L (15), XL (5)"
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                />
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Project Notes & Timeline Requirements
                </label>
                <textarea
                  rows={2}
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Share any special instructions, delivery timeline, or brand notes..."
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                />
              </div>

              {/* Logo / Artwork File Attachment */}
              <div className="border border-dashed border-neutral-300 rounded-xl p-3 bg-neutral-50/70">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <Paperclip className="w-4 h-4 text-[#F95700]" />
                    <span className="text-xs font-semibold text-neutral-700">
                      {uploadedFileName ? (
                        <span className="text-emerald-700 font-bold">Attached: {uploadedFileName}</span>
                      ) : (
                        <span>Attach logo or design reference (PDF, PNG, JPG, EPS)</span>
                      )}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-neutral-200 rounded text-xs font-medium text-neutral-700 shadow-2xs hover:bg-neutral-100">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Browse File</span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.eps,.ai,.svg"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                <a
                  href={dynamicWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Instant WhatsApp Enquiry</span>
                </a>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-lg shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Preparing Quote...' : 'Submit Quotation Request'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
