import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { COMPANY_INFO, createWhatsAppEnquiryUrl } from '../data/companyData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { OnlineOrder } from '../types';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, MessageSquare, Send, CheckCircle2, ShieldCheck, CreditCard, X, Truck, Copy, Check } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, navigateTo, openQuoteModal, placeOrder } = useRouter();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [mpesaInfoOpen, setMpesaInfoOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<OnlineOrder | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Check if any items have priced amounts
  const pricedItems = cart.filter((i) => i.unitPrice && i.unitPrice > 0);
  const totalAmountKes = pricedItems.reduce((sum, item) => sum + (item.unitPrice || 0) * item.quantity, 0);

  // Form validation
  const validateCheckout = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.name = 'Full name is required';
    if (!customerPhone.trim()) errs.phone = 'Phone number is required';
    if (customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      errs.email = 'Please provide a valid email format';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCheckout()) return;

    const order = placeOrder({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim(),
      deliveryNotes: deliveryNotes.trim(),
    });
    setCreatedOrder(order);
    setIsSubmitted(true);
  };

  // Generate WhatsApp order summary string
  const cartSummaryForWhatsApp = cart
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.productName} (${item.color}, Size: ${item.size}) x ${item.quantity} pcs [${item.brandingMethod} - ${item.placement}]`
    )
    .join('\n');

  const whatsAppOrderUrl = createWhatsAppEnquiryUrl(
    `Order Quotation (${totalItems} items)`,
    `Client: ${customerName || 'Customer'} (${customerPhone || 'Via Web'})\n\nItems in Cart:\n${cartSummaryForWhatsApp}\n\nDelivery/Notes: ${deliveryNotes || 'Standard delivery in Nairobi/Kenya'}`
  );

  return (
    <div className="pb-16 space-y-10">
      <Breadcrumbs items={[{ label: 'Quotation Cart' }]} />

      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#F95700] font-bold">
              Push Vantage Quotation & Order Cart
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Review Selected Items & Customizations
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
              Check your garment specs, artwork positions, and quantities. Request an official itemized quotation with zero obligation.
            </p>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="px-4 py-2.5 text-xs font-bold text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors cursor-pointer"
          >
            ← Continue Shopping
          </button>
        </div>
      </section>

      {/* Cart Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center max-w-2xl mx-auto space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">
              Your Quotation Cart is Empty
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
              Explore our catalogue for reflective cargo overalls, corporate polos, heavyweight hoodies, PPE gear, and branded gifts.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => navigateTo('shop')}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl transition-colors cursor-pointer"
              >
                Browse Product Catalogue
              </button>
              <button
                onClick={() => navigateTo('studio')}
                className="px-5 py-2.5 text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
              >
                Open Design Studio
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200 text-xs text-neutral-500 font-medium">
                <span>Items ({totalItems} pieces across {cart.length} configuration{cart.length > 1 ? 's' : ''})</span>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0 relative">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {item.artworkDataUrl && (
                        <div className="absolute bottom-1 right-1 w-6 h-6 rounded bg-black/50 p-0.5">
                          <img
                            src={item.artworkDataUrl}
                            alt="Logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#F95700] font-bold">
                        {item.categoryLabel}
                      </span>
                      <h3 className="text-sm font-bold text-neutral-900 leading-snug">
                        {item.productName}
                      </h3>
                      <div className="text-xs text-neutral-600 flex flex-wrap gap-x-3 gap-y-0.5 pt-0.5">
                        <span><strong>Color:</strong> {item.color}</span>
                        <span><strong>Size:</strong> {item.size}</span>
                        <span><strong>Branding:</strong> {item.brandingMethod}</span>
                        <span><strong>Side:</strong> {item.viewSide.toUpperCase()}</span>
                      </div>
                      {item.artworkName && (
                        <div className="text-[11px] text-neutral-500 pt-0.5">
                          Logo: <span className="font-semibold text-neutral-700">{item.artworkName}</span> ({item.placement})
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 5)}
                        className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer"
                        title="Reduce by 5"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateCartQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-14 p-1 text-xs font-bold text-center border border-neutral-300 rounded-lg tabular-nums"
                      />
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 5)}
                        className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer"
                        title="Increase by 5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Actions (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                Quotation Summary
              </h3>

              <div className="space-y-3 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Total Garments / Pieces:</span>
                  <span className="font-bold text-neutral-900 font-mono tabular-nums">{totalItems} pcs</span>
                </div>
                <div className="flex justify-between">
                  <span>Customization Setup:</span>
                  <span className="text-emerald-700 font-semibold">Included in Quotation</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery in Nairobi:</span>
                  <span className="text-neutral-900 font-medium">Calculated upon dispatch</span>
                </div>

                {totalAmountKes > 0 && (
                  <div className="pt-2 border-t border-neutral-100 flex justify-between text-sm font-extrabold text-neutral-900">
                    <span>Configured Total (KES):</span>
                    <span className="font-mono text-[#F95700]">KES {totalAmountKes.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-3">
                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Official Quotation Request</span>
                </button>

                <a
                  href={whatsAppOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Send Cart Directly to WhatsApp</span>
                </a>

                {/* M-Pesa Payment Info Toggle */}
                <button
                  onClick={() => setMpesaInfoOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                  <span>M-Pesa & Payment Architecture Info</span>
                </button>
              </div>

              <div className="pt-4 border-t border-neutral-100 text-[11px] text-neutral-500 space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero Obligation Quotation</span>
                </div>
                <p>
                  We verify mockup scaling and print details before any payment is requested.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Checkout Quotation Modal */}
      {checkoutModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8">
            <div className="flex items-center justify-between p-4 bg-neutral-900 text-white">
              <h3 className="text-sm font-bold">
                Submit Quotation Request ({totalItems} Items)
              </h3>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {isSubmitted && createdOrder ? (
                <div className="py-4 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-neutral-900">
                      Order Logged & Received!
                    </h4>
                    <p className="text-xs text-neutral-600 mt-1 max-w-sm mx-auto">
                      Thank you, <strong className="text-neutral-900">{customerName}</strong>. Your custom apparel and branding order has been logged into our Nairobi workshop queue.
                    </p>
                  </div>

                  {/* Order Tracking Badge */}
                  <div className="p-3.5 bg-neutral-900 text-white rounded-2xl space-y-2">
                    <div className="text-[10px] uppercase font-mono tracking-widest text-[#F95700] font-semibold">
                      Your Official Tracking ID
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-mono text-xl font-black text-white tracking-wider">
                        {createdOrder.id}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(createdOrder.id);
                          setCopiedId(true);
                          setTimeout(() => setCopiedId(false), 2000);
                        }}
                        className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                        title="Copy Order ID"
                      >
                        {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-400">
                      Keep this reference number to track live tailoring, printing, and delivery stages.
                    </p>
                  </div>

                  {/* Action Buttons: Track Now & WhatsApp */}
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCheckoutModalOpen(false);
                        setIsSubmitted(false);
                        navigateTo('track', { id: createdOrder.id });
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl shadow-sm transition-colors cursor-pointer"
                    >
                      <Truck className="w-4 h-4" />
                      <span>Track Order Status Live ({createdOrder.id})</span>
                    </button>

                    <a
                      href={createWhatsAppEnquiryUrl(
                        `New Order ${createdOrder.id}`,
                        `Hello Push Vantage, I have just submitted Order *${createdOrder.id}* on your website.\nClient: ${customerName}\nPhone: ${customerPhone}\nItems: ${createdOrder.totalItems} pcs\nDelivery Notes: ${deliveryNotes || 'Nairobi/Kenya'}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>Forward to WhatsApp (0725 356 926)</span>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setCheckoutModalOpen(false);
                      setIsSubmitted(false);
                      setCreatedOrder(null);
                    }}
                    className="text-xs font-semibold text-neutral-500 hover:text-neutral-800 pt-1"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Full Name / Organization <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Grace Wambui / Logistics Kenya"
                      className="w-full p-2.5 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                    />
                    {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Phone Number (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 0725 356 926"
                      className="w-full p-2.5 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700] tabular-nums"
                    />
                    {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="e.g. grace@company.co.ke"
                      className="w-full p-2.5 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                    />
                    {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Delivery / Special Production Notes
                    </label>
                    <textarea
                      rows={2}
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="Delivery location in Nairobi, deadline, or special instructions..."
                      className="w-full p-2.5 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutModalOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-lg shadow-sm"
                    >
                      Submit Quotation
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* M-Pesa Payment Architecture Modal */}
      {mpesaInfoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  M
                </div>
                <h3 className="text-sm font-bold text-neutral-900">
                  M-Pesa Integration Architecture
                </h3>
              </div>
              <button
                onClick={() => setMpesaInfoOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-neutral-600 space-y-3 leading-relaxed">
              <p>
                Push Vantage Ltd supports payments via Safaricom M-Pesa Paybill / Buy Goods Till and Bank Transfer for approved production runs.
              </p>
              <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 space-y-1.5 font-mono text-[11px]">
                <div className="text-neutral-500 uppercase font-semibold text-[10px]">Production Payment Steps:</div>
                <div>1. Receive official digital mockup & invoice</div>
                <div>2. Authorize 50% production deposit via M-Pesa</div>
                <div>3. Inspection & balance clearance upon collection/dispatch</div>
              </div>
              <p className="text-[11px] text-neutral-500">
                To automate direct STK Push prompt on your backend, configure your Safaricom Daraja API credentials (Consumer Key, Consumer Secret, Shortcode, and Passkey) in server environment variables.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setMpesaInfoOpen(false)}
                className="w-full py-2.5 text-xs font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
