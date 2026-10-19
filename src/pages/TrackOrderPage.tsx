import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { COMPANY_INFO, createWhatsAppEnquiryUrl } from '../data/companyData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { OrderStatus, OnlineOrder } from '../types';
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  Scissors,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  Printer,
  ChevronRight,
  User,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Edit3,
  Calendar,
  AlertCircle,
  Lock,
} from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';

const STATUS_STAGES: {
  key: OrderStatus;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}[] = [
  {
    key: 'received',
    label: 'Order Received',
    icon: Package,
    description: 'Order logged and specs verified by workshop team',
  },
  {
    key: 'mockup_review',
    label: 'Artwork & Proofing',
    icon: FileCheck,
    description: 'Vector artwork prepared, embroidery DST / film setup',
  },
  {
    key: 'in_production',
    label: 'In Production',
    icon: Scissors,
    description: 'Garment stitching, reflective taping & screen printing',
  },
  {
    key: 'quality_check',
    label: 'Quality Inspection',
    icon: ShieldCheck,
    description: 'Checking seam strength, reflective luminescence & trim',
  },
  {
    key: 'ready_dispatched',
    label: 'Ready / Dispatched',
    icon: Truck,
    description: 'Packed for workshop pickup or courier delivery across Kenya',
  },
];

const getStatusIndex = (status: OrderStatus): number => {
  const index = STATUS_STAGES.findIndex((s) => s.key === status);
  return index >= 0 ? index : 0;
};

export const TrackOrderPage: React.FC = () => {
  const {
    orders,
    currentUser,
    openAuthModal,
    updateOrderStatus,
    routeParams,
    navigateTo,
  } = useRouter();

  const [searchQuery, setSearchQuery] = useState(routeParams.id || '');
  const [activeOrder, setActiveOrder] = useState<OnlineOrder | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [isEditingNote, setIsEditingNote] = useState(false);

  // If URL has ?id=PV-..., initialize search
  useEffect(() => {
    if (routeParams.id) {
      const match = orders.find(
        (o) => o.id.toLowerCase() === routeParams.id.toLowerCase()
      );
      if (match) {
        setActiveOrder(match);
        setSearchQuery(match.id);
      }
    } else if (orders.length > 0 && !activeOrder) {
      // Default to the first order for instant preview
      setActiveOrder(orders[0]);
      setSearchQuery(orders[0].id);
    }
  }, [routeParams.id, orders]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === query ||
        o.customerPhone.replace(/\s+/g, '').includes(query.replace(/\s+/g, '')) ||
        o.customerEmail.toLowerCase() === query ||
        o.customerName.toLowerCase().includes(query)
    );

    if (found) {
      setActiveOrder(found);
      setIsEditingNote(false);
    } else {
      setActiveOrder(null);
    }
  };

  const handleStatusChange = (newStatus: OrderStatus) => {
    if (!activeOrder) return;
    const note =
      adminNoteInput.trim() ||
      `Status updated to ${newStatus.replace('_', ' ')} by workshop supervisor.`;
    updateOrderStatus(activeOrder.id, newStatus, note);
    setActiveOrder((prev) =>
      prev
        ? {
            ...prev,
            status: newStatus,
            statusNotes: note,
            updatedAt: new Date().toISOString(),
          }
        : null
    );
    setIsEditingNote(false);
  };

  const handleSaveCustomNote = () => {
    if (!activeOrder || !adminNoteInput.trim()) return;
    updateOrderStatus(activeOrder.id, activeOrder.status, adminNoteInput.trim());
    setActiveOrder((prev) =>
      prev
        ? {
            ...prev,
            statusNotes: adminNoteInput.trim(),
            updatedAt: new Date().toISOString(),
          }
        : null
    );
    setIsEditingNote(false);
  };

  const isAdmin = currentUser?.isAdmin || currentUser?.email === 'pushvantage@gmail.com';

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.status === filterStatus;
  });

  const orderStageIndex = activeOrder ? getStatusIndex(activeOrder.status) : 0;

  return (
    <div className="pb-16 space-y-10">
      <Breadcrumbs items={[{ label: 'Track Order' }]} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#111827] text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 z-10 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#F95700] font-bold">
                Push Vantage Order Tracking
              </span>
              {isAdmin && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F95700] text-white flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Admin Mode (pushvantage@gmail.com)
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Track Your Production & Delivery Status
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              Follow your order in real time—from initial cutting and stitching to embroidery, screen printing, reflective safety taping, and dispatch across Nairobi or Kenya.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 z-10 shrink-0">
            {!currentUser ? (
              <button
                onClick={openAuthModal}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl border border-neutral-700 transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-[#F95700]" />
                <span>Sign In to View Orders</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-neutral-800/80 px-3.5 py-2 rounded-xl border border-neutral-700 text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-neutral-300">Signed in as:</span>
                <span className="font-semibold text-white truncate max-w-[150px]">
                  {currentUser.email}
                </span>
              </div>
            )}
            <a
              href={`mailto:${COMPANY_INFO.email}?subject=Order%20Inquiry`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900/60 rounded-xl border border-neutral-800 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#F95700]" />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-6 shadow-xs">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. PV-2026-01), Phone number, or Email..."
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700] text-neutral-900 font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl transition-colors cursor-pointer shrink-0 shadow-2xs flex items-center justify-center gap-2"
            >
              <span>Track Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Order Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            <span className="font-medium text-neutral-400">Sample Live Orders:</span>
            {orders.slice(0, 3).map((ord) => (
              <button
                key={ord.id}
                type="button"
                onClick={() => {
                  setSearchQuery(ord.id);
                  setActiveOrder(ord);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border cursor-pointer transition-colors ${
                  activeOrder?.id === ord.id
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border-neutral-200'
                }`}
              >
                {ord.id} ({ord.customerName.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Admin Orders Management Strip (Visible if Admin) */}
        {isAdmin && (
          <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#F95700]" />
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">
                    Workshop Production Queue (Admin Management)
                  </h3>
                  <p className="text-xs text-neutral-600">
                    Logged in as official workshop administrator: <span className="font-semibold text-neutral-900">pushvantage@gmail.com</span>
                  </p>
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
                <span className="text-neutral-500 shrink-0 font-medium mr-1">Filter:</span>
                {[
                  { key: 'all', label: 'All Orders' },
                  { key: 'received', label: 'Received' },
                  { key: 'in_production', label: 'Production' },
                  { key: 'ready_dispatched', label: 'Dispatched' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilterStatus(tab.key)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      filterStatus === tab.key
                        ? 'bg-[#F95700] text-white font-bold'
                        : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Grid / Mini Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredOrders.map((ord) => {
                const isSelected = activeOrder?.id === ord.id;
                return (
                  <div
                    key={ord.id}
                    onClick={() => {
                      setActiveOrder(ord);
                      setSearchQuery(ord.id);
                    }}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all bg-white ${
                      isSelected
                        ? 'border-[#F95700] ring-2 ring-[#F95700]/20 shadow-sm'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-neutral-900">
                        {ord.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ord.status === 'ready_dispatched'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.status === 'in_production'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {ord.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-neutral-800 mt-1 truncate">
                      {ord.customerName}
                    </div>
                    <div className="text-[11px] text-neutral-500 truncate">
                      {ord.customerPhone} · {ord.totalItems} items
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Order Details */}
        {activeOrder ? (
          <div className="space-y-8">
            {/* Order Status & Progress Card */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-xs space-y-8">
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                      {activeOrder.id}
                    </span>
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                        activeOrder.status === 'ready_dispatched'
                          ? 'bg-emerald-100 text-emerald-800'
                          : activeOrder.status === 'in_production'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {activeOrder.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>
                      Placed on: <strong className="text-neutral-700">{new Date(activeOrder.createdAt).toLocaleDateString()}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Last workshop update: <strong className="text-neutral-700">{new Date(activeOrder.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                    </span>
                  </div>
                </div>

                {/* Quick actions for customer */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={createWhatsAppEnquiryUrl(
                      `Order ${activeOrder.id}`,
                      `Inquiring about current status for Order ${activeOrder.id} placed by ${activeOrder.customerName}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Workshop</span>
                  </a>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Order Sheet</span>
                  </button>
                </div>
              </div>

              {/* Visual 5-Stage Stepper */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Production & Delivery Journey
                </h3>

                <div className="relative">
                  {/* Progress Line */}
                  <div className="hidden md:block absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-neutral-200 z-0">
                    <div
                      className="h-full bg-[#F95700] transition-all duration-500"
                      style={{
                        width: `${(orderStageIndex / (STATUS_STAGES.length - 1)) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                    {STATUS_STAGES.map((stage, idx) => {
                      const isCompleted = idx < orderStageIndex;
                      const isCurrent = idx === orderStageIndex;
                      const isUpcoming = idx > orderStageIndex;
                      const IconComponent = stage.icon;

                      return (
                        <div
                          key={stage.key}
                          className={`p-4 rounded-2xl border transition-all ${
                            isCurrent
                              ? 'bg-orange-50/80 border-[#F95700] ring-2 ring-[#F95700]/20'
                              : isCompleted
                              ? 'bg-neutral-50 border-neutral-200'
                              : 'bg-white border-neutral-100 opacity-60'
                          }`}
                        >
                          <div className="flex items-center md:flex-col md:items-start gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isCompleted
                                  ? 'bg-emerald-600 text-white'
                                  : isCurrent
                                  ? 'bg-[#F95700] text-white shadow-md'
                                  : 'bg-neutral-100 text-neutral-400'
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <IconComponent className="w-5 h-5" />
                              )}
                            </div>
                            <div className="space-y-0.5">
                              <div className="text-[11px] font-mono font-bold text-neutral-400 uppercase">
                                Step 0{idx + 1}
                              </div>
                              <h4
                                className={`text-xs font-bold ${
                                  isCurrent
                                    ? 'text-[#F95700]'
                                    : isCompleted
                                    ? 'text-neutral-900'
                                    : 'text-neutral-600'
                                }`}
                              >
                                {stage.label}
                              </h4>
                              <p className="text-[11px] text-neutral-500 hidden sm:block leading-snug">
                                {stage.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Status Note Box */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#F95700] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900">
                      Live Workshop Memo:
                    </div>
                    <div className="text-xs text-neutral-700 mt-0.5 leading-relaxed">
                      {activeOrder.statusNotes || 'Production team actively working on this order according to approved specifications.'}
                    </div>
                  </div>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => {
                      setIsEditingNote(!isEditingNote);
                      setAdminNoteInput(activeOrder.statusNotes || '');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-lg cursor-pointer shrink-0"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#F95700]" />
                    <span>Edit Memo</span>
                  </button>
                )}
              </div>

              {/* Admin Status Modifier Bar */}
              {isAdmin && (
                <div className="pt-2 border-t border-dashed border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                      Supervisor Controls (Advance Order Status):
                    </span>
                    <span className="text-[11px] text-[#F95700] font-mono font-medium">
                      Admin: pushvantage@gmail.com
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {STATUS_STAGES.map((stage) => {
                      const isActive = activeOrder.status === stage.key;
                      return (
                        <button
                          key={stage.key}
                          type="button"
                          onClick={() => handleStatusChange(stage.key)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl cursor-pointer transition-all ${
                            isActive
                              ? 'bg-[#F95700] text-white shadow-sm ring-2 ring-orange-300'
                              : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                          }`}
                        >
                          Mark: {stage.label}
                        </button>
                      );
                    })}
                  </div>

                  {isEditingNote && (
                    <div className="pt-2 flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={adminNoteInput}
                        onChange={(e) => setAdminNoteInput(e.target.value)}
                        placeholder="Enter custom workshop progress note for customer..."
                        className="flex-1 p-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                      />
                      <button
                        onClick={handleSaveCustomNote}
                        className="px-4 py-2 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-lg"
                      >
                        Save Note
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Order Items & Customer Details Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Items in Order (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <h3 className="text-base font-bold text-neutral-900">
                    Customized Items ({activeOrder.totalItems} pieces)
                  </h3>
                  <span className="text-xs text-neutral-500">
                    {activeOrder.items.length} configuration{activeOrder.items.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="space-y-4">
                  {activeOrder.items.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-white border border-neutral-200 overflow-hidden shrink-0">
                          <OptimizedImage
                            src={item.image}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                            containerClassName="w-full h-full"
                          />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
                            {item.productName}
                          </h4>
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-600">
                            <span className="font-semibold text-neutral-800">{item.color}</span>
                            <span>•</span>
                            <span>Size: <strong>{item.size}</strong></span>
                            <span>•</span>
                            <span className="text-[#F95700] font-medium">{item.brandingMethod}</span>
                          </div>
                          {item.placement && (
                            <div className="text-[10px] text-neutral-500">
                              Placement: {item.placement} ({item.viewSide} view)
                            </div>
                          )}
                          {item.artworkName && (
                            <div className="text-[10px] text-neutral-500 font-mono">
                              Artwork: {item.artworkName}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right sm:text-right shrink-0">
                        <div className="text-sm font-extrabold text-neutral-900 tabular-nums">
                          {item.quantity} pcs
                        </div>
                        {item.unitPrice && (
                          <div className="text-xs text-neutral-500 tabular-nums">
                            @ KES {item.unitPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {activeOrder.totalAmountKes && (
                  <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-sm">
                    <span className="font-bold text-neutral-700">Estimated Total:</span>
                    <span className="font-extrabold text-[#F95700] text-base tabular-nums">
                      KES {activeOrder.totalAmountKes.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Customer & Delivery Information (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 space-y-5 shadow-xs">
                  <h3 className="text-base font-bold text-neutral-900 pb-3 border-b border-neutral-200">
                    Client & Delivery Summary
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div className="flex items-start gap-3">
                      <User className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-neutral-500 font-medium">Customer / Company</div>
                        <div className="text-neutral-900 font-bold text-sm">
                          {activeOrder.customerName}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-neutral-500 font-medium">Contact Phone</div>
                        <a
                          href={`tel:${activeOrder.customerPhone}`}
                          className="text-neutral-900 font-bold hover:text-[#F95700] transition-colors tabular-nums"
                        >
                          {activeOrder.customerPhone}
                        </a>
                      </div>
                    </div>

                    {activeOrder.customerEmail && (
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-neutral-500 font-medium">Email Address</div>
                          <a
                            href={`mailto:${activeOrder.customerEmail}`}
                            className="text-neutral-900 font-bold hover:text-[#F95700] transition-colors break-all"
                          >
                            {activeOrder.customerEmail}
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-neutral-500 font-medium">Delivery Destination / Notes</div>
                        <div className="text-neutral-800 font-normal leading-relaxed mt-0.5">
                          {activeOrder.deliveryNotes || 'Standard delivery in Nairobi / nationwide courier dispatch.'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200 space-y-3">
                    <div className="text-[11px] text-neutral-500 leading-relaxed">
                      Need updates or wish to add more pieces to this batch? Contact our Nairobi dispatch manager:
                    </div>
                    <div className="space-y-2">
                      <a
                        href={`tel:${COMPANY_INFO.phoneRaw}`}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#F95700]" />
                        <span>Call Workshop: {COMPANY_INFO.phoneDisplay}</span>
                      </a>
                      <a
                        href={`mailto:${COMPANY_INFO.email}?subject=Inquiry%20regarding%20Order%20${activeOrder.id}`}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-colors border border-neutral-200"
                      >
                        <Mail className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Email: {COMPANY_INFO.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* No order found state */
          <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center max-w-xl mx-auto space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-[#F95700] flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">
              No Order Found with &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
              Please double check the Order ID (e.g. <span className="font-mono font-bold">PV-2026-01</span>) or the phone number used when submitting your order or quotation.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (orders.length > 0) {
                    setActiveOrder(orders[0]);
                    setSearchQuery(orders[0].id);
                  }
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-colors"
              >
                View Sample Order ({orders[0]?.id})
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className="px-4 py-2 text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
              >
                Browse Shop
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
