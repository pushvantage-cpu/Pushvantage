import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { COMPANY_INFO, createWhatsAppEnquiryUrl } from '../data/companyData';
import { OrderStatus, QuotationRecord } from '../types';
import {
  X,
  ShieldCheck,
  Lock,
  PlusCircle,
  Truck,
  CheckCircle2,
  ArrowRight,
  LogOut,
  Send,
  User,
  Phone,
  Mail,
  AlertCircle,
  FileText,
  Search,
  MessageSquare,
  Clock,
  Printer,
  ChevronDown,
  Eye,
  EyeOff,
  Filter,
  Check,
  Building,
} from 'lucide-react';

export const AdminModal: React.FC = () => {
  const {
    isAdminModalOpen,
    closeAdminModal,
    currentUser,
    loginWithPassword,
    logout,
    orders,
    placeOrder,
    updateOrderStatus,
    quotations,
    updateQuoteStatus,
    navigateTo,
    findOrder,
  } = useRouter();

  // Admin Login state - BLANK password for security reasons as instructed by user
  const [adminEmail, setAdminEmail] = useState('pushvantage@gmail.com');
  const [adminPassword, setAdminPassword] = useState(''); // STRICTLY BLANK by default!
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Admin Dashboard Tabs: 'orders' | 'quotes' | 'tracking' | 'new_order'
  const [adminActiveTab, setAdminActiveTab] = useState<'orders' | 'quotes' | 'tracking' | 'new_order'>('orders');

  // Orders Tab filters
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [editingNotesOrderId, setEditingNotesOrderId] = useState<string | null>(null);
  const [customStatusNotes, setCustomStatusNotes] = useState('');

  // Quotations Tab filters
  const [quoteSearchQuery, setQuoteSearchQuery] = useState('');
  const [quoteStatusFilter, setQuoteStatusFilter] = useState<string>('all');

  // Track Order Control state
  const [adminTrackQuery, setAdminTrackQuery] = useState('');
  const [adminTrackResult, setAdminTrackResult] = useState<any | null>(null);

  // Manual Offline Order Entry state
  const [manualClientName, setManualClientName] = useState('');
  const [manualClientPhone, setManualClientPhone] = useState('');
  const [manualClientEmail, setManualClientEmail] = useState('');
  const [manualService, setManualService] = useState('Reflective Cargo Overalls (Bulk)');
  const [manualQuantity, setManualQuantity] = useState('50');
  const [manualSpecs, setManualSpecs] = useState('25 Navy Blue / Hi-Vis Orange, 25 Royal Blue');
  const [manualBranding, setManualBranding] = useState('Computerized Chest Embroidery + Back Screen Print');
  const [manualNotes, setManualNotes] = useState('');
  const [manualCreatedOrderId, setManualCreatedOrderId] = useState<string | null>(null);

  if (!isAdminModalOpen) return null;

  const isAdmin = currentUser?.isAdmin || currentUser?.email.toLowerCase() === 'pushvantage@gmail.com';

  // Handle Admin Verification
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPassword) {
      setAdminLoginError('Password is required. Please enter the supervisor password.');
      return;
    }

    setIsLoggingIn(true);
    setAdminLoginError('');

    const res = loginWithPassword(adminEmail, adminPassword);
    setIsLoggingIn(false);

    if (!res.success) {
      setAdminLoginError(res.message);
    } else {
      setAdminPassword(''); // reset for security
    }
  };

  // Filtered Orders
  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      ord.customerPhone.includes(orderSearchQuery) ||
      ord.customerEmail.toLowerCase().includes(orderSearchQuery.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || ord.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Quotations
  const filteredQuotes = quotations.filter((q) => {
    const matchesSearch =
      q.id.toLowerCase().includes(quoteSearchQuery.toLowerCase()) ||
      q.name.toLowerCase().includes(quoteSearchQuery.toLowerCase()) ||
      q.phone.includes(quoteSearchQuery) ||
      q.serviceOrProduct.toLowerCase().includes(quoteSearchQuery.toLowerCase());
    const matchesStatus = quoteStatusFilter === 'all' || q.status === quoteStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle updating order notes
  const handleSaveOrderNotes = (orderId: string, currentStatus: OrderStatus) => {
    updateOrderStatus(orderId, currentStatus, customStatusNotes);
    setEditingNotesOrderId(null);
    setCustomStatusNotes('');
  };

  // Handle Manual Offline Order Creation
  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualClientName.trim() || !manualClientPhone.trim()) return;

    const newOrder = placeOrder({
      customerName: manualClientName.trim(),
      customerEmail: manualClientEmail.trim() || 'client@pushvantage.co.ke',
      customerPhone: manualClientPhone.trim(),
      deliveryNotes: `[Admin Entry]: ${manualService} | Qty: ${manualQuantity} | Specs: ${manualSpecs} | Branding: ${manualBranding} | Notes: ${manualNotes}`,
    });

    setManualCreatedOrderId(newOrder.id);
  };

  // Print Job Card Helper
  const handlePrintJobCard = (ord: any) => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-300 overflow-hidden my-6 p-5 sm:p-7 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F95700] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-neutral-900">
                  Push Vantage Command & Backend Portal
                </h3>
                <span className="text-[10px] font-mono font-bold bg-[#F95700] text-white px-2 py-0.5 rounded-full">
                  Admin
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-mono">
                Official Admin Email: <strong className="text-neutral-800">pushvantage@gmail.com</strong> · Nairobi, Kenya
              </p>
            </div>
          </div>
          <button
            onClick={closeAdminModal}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NOT LOGGED IN AS ADMIN: SECURE LOGIN FORM */}
        {!isAdmin ? (
          <div className="max-w-md mx-auto space-y-5 py-4">
            <div className="p-4 bg-orange-50/70 border border-orange-200 rounded-2xl text-xs text-neutral-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-neutral-900">
                <Lock className="w-4 h-4 text-[#F95700]" />
                <span>Supervisor Access Authentication</span>
              </div>
              <p>
                This backend portal gives authorized Push Vantage management full access to <strong>orders placed</strong>, <strong>quotations sent</strong>, and the <strong>track order workshop system</strong>.
              </p>
            </div>

            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Administrator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-mono font-bold text-neutral-900 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700] bg-neutral-50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Admin Password <span className="text-neutral-400 font-normal">(Password field is blank for security)</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showAdminPassword ? 'text' : 'password'}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter admin password (blank by default)"
                    className="w-full pl-9 pr-10 py-2.5 text-xs font-mono border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                    autoFocus
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                  >
                    {showAdminPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {adminLoginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{adminLoginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-2xs disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isLoggingIn ? 'Verifying Credentials...' : 'Unlock Admin Workshop Portal'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* LOGGED IN ADMIN BACKEND DASHBOARD */
          <div className="space-y-5">
            {/* Admin Session Strip */}
            <div className="p-3 bg-neutral-900 text-white rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold">Logged In: Push Vantage Administrator</span>
                <span className="font-mono text-orange-400 text-[11px]">pushvantage@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    closeAdminModal();
                    navigateTo('track');
                  }}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Full Screen Workshop View
                </button>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* 4 Major Admin Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 pb-2">
              <button
                type="button"
                onClick={() => setAdminActiveTab('orders')}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  adminActiveTab === 'orders'
                    ? 'bg-[#F95700] text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Orders Placed ({orders.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminActiveTab('quotes')}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  adminActiveTab === 'quotes'
                    ? 'bg-[#F95700] text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Quotations Sent ({quotations.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminActiveTab('tracking')}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  adminActiveTab === 'tracking'
                    ? 'bg-[#F95700] text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track Order System</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAdminActiveTab('new_order');
                  setManualCreatedOrderId(null);
                }}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  adminActiveTab === 'new_order'
                    ? 'bg-[#F95700] text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Offline Order</span>
              </button>
            </div>

            {/* TAB 1: ORDERS PLACED */}
            {adminActiveTab === 'orders' && (
              <div className="space-y-4">
                {/* Search & Filter Header */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-50 p-3 rounded-2xl border border-neutral-200">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={orderSearchQuery}
                      onChange={(e) => setOrderSearchQuery(e.target.value)}
                      placeholder="Search by Order ID, client name, phone..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                    />
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Filter className="w-3.5 h-3.5 text-neutral-500" />
                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="px-2.5 py-1.5 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700] cursor-pointer"
                    >
                      <option value="all">All Statuses ({orders.length})</option>
                      <option value="received">Received</option>
                      <option value="mockup_review">Mockup Review</option>
                      <option value="in_production">In Production</option>
                      <option value="quality_check">Quality Check</option>
                      <option value="ready_dispatched">Ready / Dispatched</option>
                    </select>
                  </div>
                </div>

                {/* Orders List Table / Cards */}
                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  {filteredOrders.length === 0 ? (
                    <div className="p-8 text-center text-xs text-neutral-500 bg-neutral-50 rounded-2xl border border-neutral-200">
                      No orders matching your search or status filter.
                    </div>
                  ) : (
                    filteredOrders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-2xs space-y-3 text-xs hover:border-neutral-300 transition-colors"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs bg-orange-100 text-[#F95700] px-2.5 py-1 rounded-lg">
                              {ord.id}
                            </span>
                            <div>
                              <strong className="text-neutral-900 text-sm">{ord.customerName}</strong>
                              <span className="text-[11px] text-neutral-500 block font-mono">
                                {new Date(ord.createdAt).toLocaleDateString()} at{' '}
                                {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>

                          {/* Status Dropdown */}
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-neutral-500 font-medium">Status:</span>
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border cursor-pointer ${
                                ord.status === 'ready_dispatched'
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                  : ord.status === 'in_production'
                                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                                  : 'bg-blue-100 text-blue-800 border-blue-300'
                              }`}
                            >
                              <option value="received">Received</option>
                              <option value="mockup_review">Mockup Review</option>
                              <option value="in_production">In Production</option>
                              <option value="quality_check">Quality Check</option>
                              <option value="ready_dispatched">Ready / Dispatched</option>
                            </select>
                          </div>
                        </div>

                        {/* Customer Contact & Items Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                          <div className="space-y-1 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                            <p className="font-bold text-neutral-700">Client Contact:</p>
                            <div className="flex items-center gap-1.5 text-neutral-600">
                              <Phone className="w-3.5 h-3.5 text-neutral-400" />
                              <span className="font-mono">{ord.customerPhone}</span>
                              <a
                                href={`https://wa.me/${ord.customerPhone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-emerald-600 hover:underline font-bold flex items-center gap-0.5"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>
                            </div>
                            <div className="flex items-center gap-1.5 text-neutral-600">
                              <Mail className="w-3.5 h-3.5 text-neutral-400" />
                              <span className="font-mono">{ord.customerEmail}</span>
                            </div>
                          </div>

                          <div className="space-y-1 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                            <p className="font-bold text-neutral-700">Order Summary:</p>
                            <p className="text-neutral-600">
                              Total Units: <strong>{ord.totalItems} pcs</strong>
                              {ord.totalAmountKes ? ` · KES ${ord.totalAmountKes.toLocaleString()}` : ' · Custom Quote Pricing'}
                            </p>
                            {ord.deliveryNotes && (
                              <p className="text-neutral-500 italic line-clamp-2">
                                Note: {ord.deliveryNotes}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Live Workshop Status Note for Customer */}
                        <div className="bg-orange-50/60 p-2.5 rounded-xl border border-orange-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px]">
                          <div>
                            <span className="font-bold text-neutral-800">Current Progress Note: </span>
                            <span className="text-neutral-700">{ord.statusNotes}</span>
                          </div>

                          {editingNotesOrderId === ord.id ? (
                            <div className="flex items-center gap-1.5 w-full sm:w-auto">
                              <input
                                type="text"
                                value={customStatusNotes}
                                onChange={(e) => setCustomStatusNotes(e.target.value)}
                                placeholder="Type new update note for customer..."
                                className="px-2 py-1 text-xs border border-orange-300 rounded-lg bg-white focus:outline-none"
                              />
                              <button
                                onClick={() => handleSaveOrderNotes(ord.id, ord.status)}
                                className="px-2 py-1 text-xs font-bold bg-[#F95700] text-white rounded-lg cursor-pointer"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingNotesOrderId(null)}
                                className="px-2 py-1 text-xs text-neutral-500 hover:text-neutral-800"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingNotesOrderId(ord.id);
                                setCustomStatusNotes(ord.statusNotes || '');
                              }}
                              className="text-xs font-bold text-[#F95700] hover:underline shrink-0 cursor-pointer"
                            >
                              Update Workshop Note
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: QUOTATIONS SENT */}
            {adminActiveTab === 'quotes' && (
              <div className="space-y-4">
                {/* Search & Filter Header */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-50 p-3 rounded-2xl border border-neutral-200">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={quoteSearchQuery}
                      onChange={(e) => setQuoteSearchQuery(e.target.value)}
                      placeholder="Search by quote reference, client name, service..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                    />
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Filter className="w-3.5 h-3.5 text-neutral-500" />
                    <select
                      value={quoteStatusFilter}
                      onChange={(e) => setQuoteStatusFilter(e.target.value)}
                      className="px-2.5 py-1.5 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700] cursor-pointer"
                    >
                      <option value="all">All Quotations ({quotations.length})</option>
                      <option value="new">New Inquiries</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="quoted">Quoted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                {/* Quotations List */}
                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  {filteredQuotes.length === 0 ? (
                    <div className="p-8 text-center text-xs text-neutral-500 bg-neutral-50 rounded-2xl border border-neutral-200">
                      No quotation inquiries matching your search.
                    </div>
                  ) : (
                    filteredQuotes.map((q) => (
                      <div
                        key={q.id}
                        className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-2xs space-y-3 text-xs hover:border-neutral-300 transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs bg-blue-100 text-blue-800 px-2.5 py-1 rounded-lg">
                              {q.id}
                            </span>
                            <div>
                              <strong className="text-neutral-900 text-sm">{q.name}</strong>
                              <span className="text-[11px] text-neutral-500 block font-mono">
                                {new Date(q.createdAt).toLocaleDateString()} · {q.phone} · {q.email}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-neutral-500 font-medium">Status:</span>
                            <select
                              value={q.status}
                              onChange={(e) => updateQuoteStatus(q.id, e.target.value as QuotationRecord['status'])}
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border cursor-pointer ${
                                q.status === 'new'
                                  ? 'bg-red-100 text-red-800 border-red-300'
                                  : q.status === 'reviewed'
                                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                                  : q.status === 'quoted'
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                  : 'bg-neutral-100 text-neutral-700 border-neutral-300'
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="quoted">Quoted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </div>
                        </div>

                        {/* Quotation Specs */}
                        <div className="p-3 bg-neutral-50 rounded-xl space-y-1.5 text-[11px]">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-bold text-neutral-900 text-xs">
                              {q.serviceOrProduct} · Qty: {q.quantity}
                            </span>
                            <span className="text-neutral-600 bg-white px-2 py-0.5 rounded border border-neutral-200">
                              Branding: {q.customizationType}
                            </span>
                          </div>

                          {q.colorsSizes && (
                            <p className="text-neutral-700">
                              <strong>Sizes/Colors:</strong> {q.colorsSizes}
                            </p>
                          )}

                          {q.projectDescription && (
                            <p className="text-neutral-600 italic">
                              "{q.projectDescription}"
                            </p>
                          )}

                          {q.attachmentName && (
                            <div className="flex items-center gap-1.5 text-neutral-700 bg-white p-1.5 rounded-lg border border-neutral-200 text-[10px] font-mono">
                              <FileText className="w-3.5 h-3.5 text-[#F95700]" />
                              <span>Attachment: {q.attachmentName} {q.attachmentSize && `(${q.attachmentSize})`}</span>
                            </div>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center justify-end gap-2 pt-1">
                          <a
                            href={`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${q.name}, this is Push Vantage Ltd responding to your quote request ${q.id} for ${q.serviceOrProduct} (${q.quantity}).`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Reply via WhatsApp</span>
                          </a>

                          {q.email && q.email !== 'Not specified' && (
                            <a
                              href={`mailto:${q.email}?subject=${encodeURIComponent(
                                `Push Vantage Ltd Quotation Reference ${q.id}`
                              )}&body=${encodeURIComponent(
                                `Dear ${q.name},\n\nThank you for requesting a quotation with Push Vantage Ltd for ${q.serviceOrProduct} (${q.quantity}).\n\nKind regards,\nPush Vantage Ltd\n0725 356 926`
                              )}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-semibold cursor-pointer"
                            >
                              <Mail className="w-3.5 h-3.5 text-neutral-500" />
                              <span>Send Email</span>
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: TRACK ORDER SYSTEM & WORKSHOP CONTROLS */}
            {adminActiveTab === 'tracking' && (
              <div className="space-y-4">
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                  <h4 className="text-xs font-bold text-neutral-900">
                    Live Workshop Tracking Inspection & Stage Control
                  </h4>
                  <p className="text-xs text-neutral-600">
                    Search any order tracking number to inspect its current status, update production steps, or generate customer progress reports.
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={adminTrackQuery}
                        onChange={(e) => setAdminTrackQuery(e.target.value)}
                        placeholder="Enter Order ID (e.g. PV-2026-01) or Client Phone..."
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700] font-mono"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const res = findOrder(adminTrackQuery.trim());
                        setAdminTrackResult(res || null);
                      }}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl cursor-pointer"
                    >
                      Inspect Order
                    </button>
                  </div>
                </div>

                {adminTrackResult && (
                  <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-sm space-y-4 text-xs animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-sm text-[#F95700] bg-orange-100 px-2.5 py-1 rounded-lg">
                          {adminTrackResult.id}
                        </span>
                        <h4 className="text-base font-bold text-neutral-900 mt-1">
                          {adminTrackResult.customerName}
                        </h4>
                        <p className="text-[11px] text-neutral-500 font-mono">
                          {adminTrackResult.customerPhone} · {adminTrackResult.customerEmail}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase bg-emerald-100 text-emerald-800">
                          {adminTrackResult.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    {/* Stage Advancer Buttons */}
                    <div className="space-y-2 pt-2 border-t border-neutral-100">
                      <p className="font-bold text-neutral-800 text-xs">Advance Workshop Stage:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {[
                          { id: 'received', label: '1. Received' },
                          { id: 'mockup_review', label: '2. Mockup' },
                          { id: 'in_production', label: '3. Production' },
                          { id: 'quality_check', label: '4. QA Check' },
                          { id: 'ready_dispatched', label: '5. Dispatched' },
                        ].map((st) => (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => {
                              updateOrderStatus(adminTrackResult.id, st.id as OrderStatus);
                              setAdminTrackResult({ ...adminTrackResult, status: st.id });
                            }}
                            className={`py-2 px-1 text-[11px] font-bold rounded-xl border text-center transition-all cursor-pointer ${
                              adminTrackResult.status === st.id
                                ? 'bg-[#F95700] text-white border-[#F95700] shadow-xs'
                                : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border-neutral-200'
                            }`}
                          >
                            {st.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                      <button
                        onClick={() => {
                          closeAdminModal();
                          navigateTo('track', { id: adminTrackResult.id });
                        }}
                        className="text-xs font-bold text-[#F95700] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Public Tracking View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handlePrintJobCard(adminTrackResult)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Job Sheet</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: ADD OFFLINE ORDER (ADMIN ENTRY) */}
            {adminActiveTab === 'new_order' && (
              <div className="space-y-4">
                {manualCreatedOrderId ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <div>
                      <h4 className="text-base font-bold text-neutral-900">
                        Offline Order Registered Successfully!
                      </h4>
                      <p className="text-xs text-neutral-600 mt-1">
                        Assigned Tracking ID: <strong className="font-mono text-[#F95700]">{manualCreatedOrderId}</strong>
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          closeAdminModal();
                          navigateTo('track', { id: manualCreatedOrderId });
                        }}
                        className="px-4 py-2 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl cursor-pointer"
                      >
                        Track This Order
                      </button>
                      <button
                        onClick={() => setManualCreatedOrderId(null)}
                        className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 cursor-pointer"
                      >
                        Create Another Entry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleCreateManualOrder} className="space-y-3.5">
                    <div className="p-3 bg-neutral-50 rounded-xl text-xs text-neutral-600">
                      Use this form to register walk-in clients, phone call orders, or direct corporate tenders into the Push Vantage tracking system.
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Client / Organization Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={manualClientName}
                          onChange={(e) => setManualClientName(e.target.value)}
                          placeholder="e.g. Kenya Power Logistics"
                          className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Client Phone / WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={manualClientPhone}
                          onChange={(e) => setManualClientPhone(e.target.value)}
                          placeholder="e.g. 0725 356 926"
                          className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700] font-mono"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Product / Service
                        </label>
                        <input
                          type="text"
                          value={manualService}
                          onChange={(e) => setManualService(e.target.value)}
                          placeholder="e.g. Reflective Cargo Overalls (Bulk)"
                          className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Quantity
                        </label>
                        <input
                          type="text"
                          value={manualQuantity}
                          onChange={(e) => setManualQuantity(e.target.value)}
                          placeholder="e.g. 100 pcs"
                          className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Branding Technique
                      </label>
                      <input
                        type="text"
                        value={manualBranding}
                        onChange={(e) => setManualBranding(e.target.value)}
                        placeholder="e.g. Computerized Chest Embroidery + Back Screen Print"
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Sizes, Colors & Delivery Location
                      </label>
                      <textarea
                        rows={2}
                        value={manualNotes}
                        onChange={(e) => setManualNotes(e.target.value)}
                        placeholder="e.g. 50 Navy Blue, 50 Hi-Vis Orange. Deliver to Industrial Area Gate 2..."
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs mt-2"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Save Order & Generate Tracking Code</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
