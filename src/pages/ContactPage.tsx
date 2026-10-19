import React, { useState } from 'react';
import { COMPANY_INFO, createWhatsAppEnquiryUrl } from '../data/companyData';
import { useRouter } from '../context/RouterContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, Clock, ArrowUpRight, Copy, Check } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { submitQuotation } = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceRequired: 'Reflective Cargo Overalls',
    estimatedQuantity: '25',
    projectDescription: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name or company';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format';
    }
    if (!formData.projectDescription.trim()) {
      errs.projectDescription = 'Please describe your project or requirements';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    submitQuotation({
      name: formData.name.trim(),
      email: formData.email.trim() || 'Not specified',
      phone: formData.phone.trim(),
      serviceOrProduct: formData.serviceRequired,
      quantity: `${formData.estimatedQuantity} units`,
      customizationType: 'Contact Form Inquiry',
      projectDescription: formData.projectDescription,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };


  const copyContactSummary = () => {
    const text = `Push Vantage Ltd Enquiry\nClient: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nService: ${formData.serviceRequired}\nQuantity: ${formData.estimatedQuantity}\nDetails: ${formData.projectDescription}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const dynamicWhatsAppUrl = createWhatsAppEnquiryUrl(
    formData.serviceRequired,
    `Name: ${formData.name} | Phone: ${formData.phone} | Qty: ${formData.estimatedQuantity} | Notes: ${formData.projectDescription}`
  );

  return (
    <div className="pb-16 space-y-12">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden border border-neutral-800">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="text-xs font-mono uppercase tracking-widest text-[#F95700] font-semibold">
              Get in Touch · Push Vantage Ltd
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Contact Push Vantage Ltd
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              Whether you need reflective cargo overalls for a major project, executive corporate staff uniforms, or bulk screen printing, our Nairobi team is ready to assist.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards & Form Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Details & WhatsApp Button (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Direct Communication Channels
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Connect with our team directly for immediate assistance.
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-[#F95700] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 font-medium">Telephone & Calls</div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="text-base font-bold text-neutral-900 hover:text-[#F95700] transition-colors tabular-nums"
                  >
                    {COMPANY_INFO.phoneDisplay}
                  </a>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Direct workshop inquiries and quotation requests.
                  </p>
                </div>
              </div>

              {/* WhatsApp Quick Link */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-emerald-800 font-semibold">WhatsApp Chat Hotline</div>
                    <div className="text-base font-bold text-emerald-950 tabular-nums">
                      {COMPANY_INFO.phoneDisplay}
                    </div>
                  </div>
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-2xs"
                  >
                    <span>Open WhatsApp Chat</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-50/60 border border-orange-200">
                <div className="w-10 h-10 rounded-lg bg-[#F95700] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-orange-950 font-bold">Official Company Email</span>
                    <span className="text-[10px] uppercase font-mono font-bold text-[#F95700] bg-white px-2 py-0.5 rounded border border-orange-200">
                      Primary
                    </span>
                  </div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-sm font-bold text-neutral-900 hover:text-[#F95700] transition-colors break-all block"
                  >
                    {COMPANY_INFO.email}
                  </a>
                  <p className="text-[11px] text-neutral-600 leading-normal">
                    Direct workshop inbox for quotation requests, PO documents, and high-res vector logos.
                  </p>
                  <div className="pt-1 flex items-center gap-2">
                    <a
                      href={`mailto:${COMPANY_INFO.email}?subject=Quotation%20Request%20-%20Push%20Vantage%20Ltd`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-lg transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Compose Email</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(COMPANY_INFO.email);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-lg transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy Email'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Location & Coverage */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 font-medium">Location & Dispatch</div>
                  <div className="text-sm font-bold text-neutral-900">
                    {COMPANY_INFO.location}
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                    Centrally located in Nairobi for convenient local order collection and reliable parcel courier delivery across all 47 counties of Kenya.
                  </p>
                </div>
              </div>

              {/* TikTok Channel */}
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-500">TikTok Video Showcase:</span>
                <a
                  href={COMPANY_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#F95700] hover:underline flex items-center gap-1"
                >
                  <span>{COMPANY_INFO.tiktokUsername}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Operating Hours Note */}
            <div className="bg-neutral-900 text-neutral-300 rounded-xl p-5 border border-neutral-800 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-white font-bold">
                <Clock className="w-4 h-4 text-[#F95700]" />
                <span>Operating Hours (East Africa Time):</span>
              </div>
              <p>{COMPANY_INFO.workingHours}</p>
              <p className="text-neutral-400 text-[11px]">
                Closed on Sundays & Kenyan public holidays (WhatsApp messages reviewed on next business morning).
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-neutral-900">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Fill in your project requirements below. We typically respond with a detailed quotation within the same business day.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-10 text-center space-y-6">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-neutral-900">
                      Message Prepared Successfully!
                    </h4>
                    <p className="text-sm text-neutral-600 mt-2 max-w-md mx-auto">
                      Thank you, <strong className="text-neutral-900">{formData.name}</strong>. Your enquiry regarding <strong className="text-neutral-900">{formData.serviceRequired}</strong> ({formData.estimatedQuantity} units) has been recorded.
                    </p>
                  </div>

                  {/* Priority WhatsApp Connect */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-left max-w-lg mx-auto space-y-3">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-sm font-bold text-emerald-900">
                          Instant WhatsApp Dispatch
                        </h5>
                        <p className="text-xs text-emerald-700 mt-0.5">
                          Tap below to open WhatsApp with your prefilled project notes and get an immediate reply from our team.
                        </p>
                      </div>
                    </div>
                    <a
                      href={dynamicWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Forward to WhatsApp Hotline (0725 356 926)</span>
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={copyContactSummary}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied Summary to Clipboard' : 'Copy Summary'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          serviceRequired: 'Reflective Cargo Overalls',
                          estimatedQuantity: '25',
                          projectDescription: '',
                        });
                      }}
                      className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Your Full Name or Company <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Mwangi / Kenya Power Contractors"
                        className={`w-full px-3 py-2.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700] ${
                          errors.name ? 'border-red-500 bg-red-50/50' : 'border-neutral-300'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Phone / WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 07XX XXX XXX"
                        className={`w-full px-3 py-2.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700] tabular-nums ${
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
                        placeholder="e.g. john@company.co.ke"
                        className={`w-full px-3 py-2.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700] ${
                          errors.email ? 'border-red-500 bg-red-50/50' : 'border-neutral-300'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Estimated Quantity
                      </label>
                      <input
                        type="text"
                        value={formData.estimatedQuantity}
                        onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                        placeholder="e.g. 20 pieces, 100 sets"
                        className="w-full px-3 py-2.5 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700] tabular-nums"
                      />
                    </div>
                  </div>

                  {/* Service Required */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Service or Product Required <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                    >
                      <option value="Reflective Cargo Overalls">Reflective Cargo Overalls (Boiler Suits)</option>
                      <option value="Custom Apparel Production">Custom Apparel Production (Polo shirts, T-shirts, Hoodies)</option>
                      <option value="Personal Protective Equipment (PPE)">Personal Protective Equipment (PPE & Safety Gear)</option>
                      <option value="Industrial Workwear & Reflective Safety Clothing">Industrial Workwear & Reflective Safety Clothing</option>
                      <option value="Corporate Uniforms & Branded Workwear">Corporate Uniforms & Branded Workwear</option>
                      <option value="Corporate Gifts & Promotional Merchandise">Corporate Gifts & Promotional Merchandise</option>
                      <option value="Custom Printing & Garment Branding">Custom Printing & Screen Branding</option>
                    </select>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Project Description & Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.projectDescription}
                      onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                      placeholder="Please specify colours, sizing requirements, delivery location, whether you need printing/embroidery, or any special requests..."
                      className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700] ${
                        errors.projectDescription ? 'border-red-500 bg-red-50/50' : 'border-neutral-300'
                      }`}
                    />
                    {errors.projectDescription && (
                      <p className="text-xs text-red-500 mt-1">{errors.projectDescription}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                    <a
                      href={COMPANY_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Chat on WhatsApp Directly</span>
                    </a>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-lg shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                    </button>
                  </div>

                  {/* Backend Integration Note */}
                  <div className="pt-4 border-t border-neutral-100 text-[11px] text-neutral-400 leading-normal">
                    <span className="font-semibold text-neutral-600">Note:</span> Form submissions are processed locally with immediate confirmation and direct WhatsApp transfer option. Direct email delivery is targeted to <code className="text-neutral-700 bg-neutral-100 px-1 py-0.5 rounded font-mono">{COMPANY_INFO.email}</code>.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Nairobi & Kenya Delivery Coverage Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-10 border border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#F95700] font-bold">
                Nairobi Metro
              </div>
              <h4 className="text-base font-bold text-white mt-1">
                Same-Day Workshop Collection & Local Courier
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Orders ready for convenient collection in Nairobi or direct dispatch to your office or construction site via localized rider or van courier.
              </p>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Upcountry Kenya
              </div>
              <h4 className="text-base font-bold text-white mt-1">
                Nationwide 24-48 Hour Parcel Dispatch
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Reliable parcel dispatch to Mombasa, Kisumu, Nakuru, Eldoret, Thika, Naivasha, Machakos, Nyeri, and all regional commercial centers.
              </p>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Corporate Tenders
              </div>
              <h4 className="text-base font-bold text-white mt-1">
                Bulk Logistics & Project Shipments
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Palletized and individually-sized box packaging for bulk safety workwear distributions and corporate employee rollouts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
