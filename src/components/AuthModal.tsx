import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { COMPANY_INFO, createWhatsAppEnquiryUrl } from '../data/companyData';
import {
  X,
  User,
  Mail,
  Phone,
  Building,
  Lock,
  ArrowRight,
  CheckCircle2,
  Package,
  Search,
  PlusCircle,
  Truck,
  LogOut,
  Send,
  Sparkles,
  Eye,
  EyeOff,
  Clock,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    loginWithPassword,
    registerAccount,
    logout,
    currentUser,
    orders,
    placeOrder,
    navigateTo,
    findOrder,
  } = useRouter();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'track' | 'apply'>('signin');

  // Sign In Form state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState(''); // explicitly blank for security
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [signInError, setSignInError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Create Account Form state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpCompany, setSignUpCompany] = useState('');
  const [signUpPassword, setSignUpPassword] = useState(''); // password of user's choice
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Track Order state inside Sign In section
  const [trackQuery, setTrackQuery] = useState('');
  const [trackedOrderResult, setTrackedOrderResult] = useState<any | null>(null);
  const [trackSearchAttempted, setTrackSearchAttempted] = useState(false);

  // Customer Order Application state
  const [applyService, setApplyService] = useState('Reflective Cargo Overalls');
  const [applyQuantity, setApplyQuantity] = useState('20');
  const [applySizesColors, setApplySizesColors] = useState('Large, Navy Blue & Hi-Vis Orange');
  const [applyBranding, setApplyBranding] = useState('Computerized Chest Embroidery');
  const [applyNotes, setApplyNotes] = useState('');
  const [applySuccessId, setApplySuccessId] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  // Handle Public Customer Sign In
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInEmail)) {
      setSignInError('Please enter a valid email address');
      return;
    }
    if (!signInPassword) {
      setSignInError('Please enter your account password');
      return;
    }

    setIsSigningIn(true);
    setSignInError('');

    const res = loginWithPassword(signInEmail, signInPassword);
    setIsSigningIn(false);

    if (!res.success) {
      setSignInError(res.message);
    } else {
      setSignInEmail('');
      setSignInPassword('');
      setActiveTab('apply');
    }
  };

  // Handle Public Account Creation (Customer chooses their password)
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName.trim()) {
      setSignUpError('Full name or organization is required');
      return;
    }
    if (!signUpEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpEmail)) {
      setSignUpError('Please provide a valid email format');
      return;
    }
    if (!signUpPhone.trim()) {
      setSignUpError('Phone / WhatsApp number is required for order coordination');
      return;
    }
    if (!signUpPassword || signUpPassword.length < 4) {
      setSignUpError('Password must be at least 4 characters of your choice');
      return;
    }
    if (signUpPassword !== signUpConfirmPassword) {
      setSignUpError('Passwords do not match. Please verify.');
      return;
    }

    setIsRegistering(true);
    setSignUpError('');

    const res = registerAccount({
      name: signUpName,
      email: signUpEmail,
      phone: signUpPhone,
      company: signUpCompany,
      password: signUpPassword,
    });

    setIsRegistering(false);

    if (!res.success) {
      setSignUpError(res.message);
    } else {
      setSignUpName('');
      setSignUpEmail('');
      setSignUpPhone('');
      setSignUpCompany('');
      setSignUpPassword('');
      setSignUpConfirmPassword('');
      setActiveTab('apply');
    }
  };

  // Handle Track Order Search inside Sign In section
  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;
    setTrackSearchAttempted(true);
    const found = findOrder(trackQuery.trim());
    setTrackedOrderResult(found || null);
  };

  // Handle Customer Order Application Submission
  const handleApplyOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const newOrder = placeOrder({
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerPhone: currentUser.phone || '0725 356 926',
      deliveryNotes: `[Customer Application]: Service: ${applyService} | Quantity: ${applyQuantity} | Specs: ${applySizesColors} | Branding: ${applyBranding} | Notes: ${applyNotes}`,
    });

    setApplySuccessId(newOrder.id);
  };

  // User's existing applications/orders
  const userOrders = currentUser
    ? orders.filter(
        (o) =>
          o.customerEmail.toLowerCase() === currentUser.email.toLowerCase() ||
          (currentUser.phone &&
            o.customerPhone.replace(/\s+/g, '') === currentUser.phone.replace(/\s+/g, ''))
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E8E2D8] overflow-hidden my-8 p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
          <div className="space-y-0.5">
            <h3 className="font-editorial text-xl font-bold text-neutral-900">
              {currentUser ? `Customer Portal: ${currentUser.name}` : 'Public Customer Portal'}
            </h3>
            <p className="text-xs text-neutral-500">
              {currentUser
                ? 'Submit order applications, upload specs, and track production progress'
                : 'Sign in, create an account with your own password, or track existing orders'}
            </p>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NOT LOGGED IN: 3 TABS (Sign In, Create Account, Track Order) */}
        {!currentUser ? (
          <div className="space-y-5">
            {/* Tab Switcher */}
            <div className="flex items-center p-1 bg-neutral-100 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signin');
                  setSignInError('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'signin'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signup');
                  setSignUpError('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'signup'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('track');
                  setTrackedOrderResult(null);
                  setTrackSearchAttempted(false);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'track'
                    ? 'bg-[#F95700] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Track Order</span>
              </button>
            </div>

            {/* TAB 1: Sign In (Public Customers) */}
            {activeTab === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="e.g. client@company.co.ke"
                      className="w-full pl-9 pr-3 py-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Account Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showSignInPassword ? 'text' : 'password'}
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="Enter your account password"
                      className="w-full pl-9 pr-10 py-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                    >
                      {showSignInPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {signInError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{signInError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSigningIn}
                  className="w-full py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs disabled:opacity-50"
                >
                  <span>{isSigningIn ? 'Signing In...' : 'Sign In to Account'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <p className="text-center text-xs text-neutral-500">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('signup')}
                    className="font-bold text-[#F95700] hover:underline cursor-pointer"
                  >
                    Create account with your own password
                  </button>
                </p>
              </form>
            )}

            {/* TAB 2: Create Account (Public members choose their own password) */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Your Full Name / Organization <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="e.g. Dennis Mutua"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        placeholder="e.g. dennis@gmail.com"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Phone (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={signUpPhone}
                        onChange={(e) => setSignUpPhone(e.target.value)}
                        placeholder="e.g. 0712 345 678"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700] tabular-nums"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Company / Organization Name (Optional)
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={signUpCompany}
                      onChange={(e) => setSignUpCompany(e.target.value)}
                      placeholder="e.g. Safari Logistics Ltd"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Password (Your Choice) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showSignUpPassword ? 'text' : 'password'}
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="Choose a password"
                        className="w-full pl-9 pr-8 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                      >
                        {showSignUpPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showSignUpPassword ? 'text' : 'password'}
                        value={signUpConfirmPassword}
                        onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {signUpError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{signUpError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isRegistering}
                  className="w-full py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs mt-2 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isRegistering ? 'Registering...' : 'Register Account & Start Ordering'}</span>
                </button>
              </form>
            )}

            {/* TAB 3: Track Order inside Sign In Section */}
            {activeTab === 'track' && (
              <div className="space-y-4">
                <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-neutral-600 leading-relaxed">
                  Enter your official Order Number (e.g. <strong className="text-neutral-900 font-mono">PV-2026-01</strong>) or the phone number used during checkout to track live tailoring and printing progress.
                </div>

                <form onSubmit={handleTrackSearch} className="space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={trackQuery}
                      onChange={(e) => setTrackQuery(e.target.value)}
                      placeholder="e.g. PV-2026-01 or 0725 356 926"
                      className="w-full pl-9 pr-3 py-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700] font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Search Order Status</span>
                  </button>
                </form>

                {/* Track Results Preview inside Modal */}
                {trackSearchAttempted && (
                  trackedOrderResult ? (
                    <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                            {trackedOrderResult.id}
                          </span>
                          <p className="text-xs font-bold text-neutral-900 mt-1">
                            {trackedOrderResult.customerName}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white text-emerald-800 rounded-lg shadow-2xs border border-emerald-200">
                          {trackedOrderResult.status.replace('_', ' ')}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-700 bg-white p-2.5 rounded-xl border border-emerald-100">
                        {trackedOrderResult.statusNotes}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            closeAuthModal();
                            navigateTo('track', { id: trackedOrderResult.id });
                          }}
                          className="text-xs font-bold text-[#F95700] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>View Full Timeline & Job Card</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-center text-xs text-neutral-600">
                      No order matched "<strong className="text-neutral-900">{trackQuery}</strong>". Please verify your order number or WhatsApp us at <strong>0725 356 926</strong>.
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ) : (
          /* LOGGED IN CUSTOMER DASHBOARD */
          <div className="space-y-5">
            {/* User Info Bar */}
            <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F95700] text-white flex items-center justify-center font-bold">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <span>{currentUser.name}</span>
                    {currentUser.company && (
                      <span className="text-[10px] bg-neutral-200 text-neutral-700 px-1.5 py-0.2 rounded font-normal">
                        {currentUser.company}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    {currentUser.email} {currentUser.phone && `· ${currentUser.phone}`}
                  </div>
                </div>
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-neutral-600 hover:text-red-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Dashboard Sub-tabs */}
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('apply')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'apply'
                    ? 'bg-[#F95700] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Apply for Custom Order</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('track')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'track'
                    ? 'bg-[#F95700] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>My Orders & Applications ({userOrders.length})</span>
              </button>
            </div>

            {/* SUB-TAB 1: Apply for Custom Order */}
            {activeTab === 'apply' && (
              <div className="space-y-4">
                {applySuccessId ? (
                  <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900">
                        Order Application Placed Successfully!
                      </h4>
                      <p className="text-xs text-neutral-600 mt-1">
                        Tracking Reference: <strong className="font-mono text-[#F95700]">{applySuccessId}</strong>
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          closeAuthModal();
                          navigateTo('track', { id: applySuccessId });
                        }}
                        className="px-4 py-2 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl cursor-pointer"
                      >
                        Track Production Status Live
                      </button>
                      <button
                        onClick={() => setApplySuccessId(null)}
                        className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 cursor-pointer"
                      >
                        Apply for Another Order
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleApplyOrder} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Select Apparel / Service
                      </label>
                      <select
                        value={applyService}
                        onChange={(e) => setApplyService(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700] bg-white cursor-pointer"
                      >
                        <option value="Reflective Cargo Overalls">Reflective Cargo Boiler Suits & Overalls</option>
                        <option value="Heavyweight Fleece Hoodies">Heavyweight Fleece Hoodies & Sweatshirts</option>
                        <option value="Premium 100% Cotton T-Shirts">Premium 100% Cotton Branded T-Shirts</option>
                        <option value="Pique Polo Shirts">Corporate Pique Embroidered Polo Shirts</option>
                        <option value="Industrial Workwear & Aprons">Industrial Workwear & Cargo Aprons</option>
                        <option value="Reflective Safety Vests">Hi-Vis Reflective Safety Vests (EN 20471)</option>
                        <option value="Ceramic Mugs & Drinkware">Sublimation Ceramic Mugs & Drinkware</option>
                        <option value="Corporate Gifts & Merchandise">Executive Corporate Gift Sets</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Estimated Quantity
                        </label>
                        <input
                          type="text"
                          value={applyQuantity}
                          onChange={(e) => setApplyQuantity(e.target.value)}
                          placeholder="e.g. 50 units"
                          className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Branding Technique
                        </label>
                        <select
                          value={applyBranding}
                          onChange={(e) => setApplyBranding(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700] bg-white cursor-pointer"
                        >
                          <option value="Computerized Chest Embroidery">Computerized Embroidery</option>
                          <option value="High-Density Screen Printing">High-Density Screen Printing</option>
                          <option value="Direct-to-Film (DTF) Full Color">Direct-to-Film (DTF) Vibrant Print</option>
                          <option value="Reflective Silver Heat Transfer">Reflective Heat Transfer</option>
                          <option value="Sublimation Printing">Sublimation Printing</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Sizes & Color Specifications
                      </label>
                      <input
                        type="text"
                        value={applySizesColors}
                        onChange={(e) => setApplySizesColors(e.target.value)}
                        placeholder="e.g. Navy Blue (15 M, 25 L, 10 XL)"
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Artwork Instructions & Delivery Location
                      </label>
                      <textarea
                        rows={2}
                        value={applyNotes}
                        onChange={(e) => setApplyNotes(e.target.value)}
                        placeholder="e.g. Logo on left breast and back. Delivery to Westlands Office..."
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F95700]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs mt-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Application to Workshop</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* SUB-TAB 2: My Orders & Applications List */}
            {activeTab === 'track' && (
              <div className="space-y-3">
                {userOrders.length === 0 ? (
                  <div className="py-8 text-center space-y-2 bg-neutral-50 rounded-2xl border border-neutral-200 p-4">
                    <Package className="w-8 h-8 text-neutral-400 mx-auto" />
                    <p className="text-xs font-bold text-neutral-800">No active applications yet</p>
                    <p className="text-xs text-neutral-500">
                      Submit an order application above or browse our online shop to place your first custom project.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('apply')}
                      className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-[#F95700] rounded-lg"
                    >
                      <span>Create Application</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {userOrders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-neutral-900 bg-white px-2 py-0.5 rounded border border-neutral-200">
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

                        <p className="text-[11px] text-neutral-600 line-clamp-2">
                          {ord.statusNotes}
                        </p>

                        <div className="flex items-center justify-between pt-1 border-t border-neutral-200/60 text-[11px]">
                          <span className="text-neutral-500">
                            {ord.items.length > 0 ? `${ord.totalItems} pcs` : 'Direct Application'}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              closeAuthModal();
                              navigateTo('track', { id: ord.id });
                            }}
                            className="font-bold text-[#F95700] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Track Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
